<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Admin Initialization
 */
function my_usa_map_admin_init() {
    add_action('admin_menu', 'my_usa_map_add_admin_menu');
    add_action('admin_enqueue_scripts', 'my_usa_map_enqueue_admin_scripts');
}

/**
 * Admin Enqueue
 */
function my_usa_map_enqueue_admin_scripts() {
    wp_enqueue_style('my-usa-map-admin-css',  USA_MAP_URL . 'assets/css/admin-style.css');
    wp_enqueue_script('my-usa-map-admin-js', USA_MAP_URL . 'assets/js/admin-script.js', ['jquery'], MY_PLUGIN_VERSION , true);
}

/**
 * Admin Pages
 */
function my_usa_map_add_admin_menu() {

    // ✅ Google Map as Main Menu
    add_menu_page(
        'Google Map Settings',        // Page Title
        'Google Map',                 // Menu Title
        'manage_options',
        'my-google-map-settings',     // Main Slug
        'my_plugin_google_map_settings_page',
        'dashicons-location-alt',
        25
    );

    // ✅ Uninstall Submenu
    add_submenu_page(
        'my-google-map-settings',     // Parent slug (same as main)
        'Uninstall Settings',
        'Uninstall Settings',
        'manage_options',
        'my-plugin-uninstall',
        'my_plugin_uninstall_settings_page'
    );
}
add_action('admin_menu', 'my_usa_map_add_admin_menu');


/**
 * Google Map
 */
function my_plugin_google_map_settings_page() {

    if (!current_user_can('manage_options')) {
        return;
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'my_usa_map';

    // ✅ Handle Form Submit
    if (isset($_POST['my_usa_map_submit'])) {

        if (!isset($_POST['my_usa_map_nonce']) ||
            !wp_verify_nonce($_POST['my_usa_map_nonce'], 'my_usa_map_action')) {
            wp_die('Security check failed');
        }

        $pin_state = sanitize_text_field($_POST['pin_state']);
        $pin_data  = sanitize_text_field($_POST['pin_data']);
        $pin_image = esc_url_raw($_POST['pin_image']);

        $wpdb->insert(
            $table_name,
            [
                'pin_state' => $pin_state,
                'pin_data'  => $pin_data,
                'pin_image' => $pin_image
            ],
            ['%s','%s','%s']
        );

        echo '<div class="updated"><p>Pin added successfully!</p></div>';
    }

    // ✅ Fetch Existing Pins
    $pins = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
    ?>

    <div class="wrap">
        <h1>Google Map Settings</h1>

        <!-- Add New Pin Form -->
        <h2>Add New Pin</h2>

        <form method="post">
            <?php wp_nonce_field('my_usa_map_action', 'my_usa_map_nonce'); ?>

            <table class="form-table">
                <tr>
                    <th>State Name</th>
                    <td>
                        <input type="text" name="pin_state" class="regular-text" required>
                    </td>
                </tr>

                <tr>
                    <th>Pin Title</th>
                    <td>
                        <input type="text" name="pin_data" class="regular-text" required>
                    </td>
                </tr>

                <tr>
                    <th>Image URL</th>
                    <td>
                        <input type="text" name="pin_image" class="regular-text" required>
                        <p class="description">Paste image URL here.</p>
                    </td>
                </tr>
            </table>

            <p>
                <input type="submit" name="my_usa_map_submit" class="button button-primary" value="Add Pin">
            </p>
        </form>

        <hr>

        <!-- Existing Pins -->
        <h2>Existing Pins</h2>

        <table class="widefat striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>State</th>
                    <th>Title</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($pins)) : ?>
                    <?php foreach ($pins as $pin) : ?>
                        <tr>
                            <td><?php echo $pin->id; ?></td>
                            <td><?php echo esc_html($pin->pin_state); ?></td>
                            <td><?php echo esc_html($pin->pin_data); ?></td>
                            <td>
                                <img src="<?php echo esc_url($pin->pin_image); ?>" width="60">
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else : ?>
                    <tr>
                        <td colspan="4">No pins found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>

    </div>
    <?php
}


/**
 * Uninstall Settings Subpage
 */
function my_usa_map_uninstall_settings_page() {
    if (!current_user_can('manage_options')) {
        wp_die('You do not have sufficient permissions to access this page.');
    }

    if (isset($_POST['my_usa_map_save_uninstall_option'])) {

        // Verify nonce before processing the form
        if (!isset($_POST['my_usa_map_uninstall_nonce']) || 
            !wp_verify_nonce($_POST['my_usa_map_uninstall_nonce'], 'my_usa_map_uninstall_action')) {
            wp_die('Security check failed.');
        }

        $uninstall_option = isset($_POST['my_usa_map_uninstall_option']) ? 1 : 0;
        update_option('my_usa_map_uninstall_option', $uninstall_option);
        echo '<div class="updated"><p>Settings saved successfully.</p></div>';
    }

    $uninstall_option = get_option('my_usa_map_uninstall_option', 0);

    include USA_MAP_PATH . 'templates/uninstall-settings.php';
}
