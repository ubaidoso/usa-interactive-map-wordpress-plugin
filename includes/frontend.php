<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Initialize the frontend
 */
function my_usa_map_frontend_init() {
    add_action('wp_enqueue_scripts', 'my_usa_map_enqueue_frontend_scripts');
    add_shortcode('cst_usa_map', 'my_usa_map_shortcode');
}

/**
 * Enqueue AJAX Script for Frontend
 */
function my_usa_map_enqueue_frontend_scripts() {
    wp_enqueue_style('my-usa-map-frontend-css',  USA_MAP_URL . 'assets/css/main-style.css');
    wp_enqueue_script('my-usa-map-frontend-js', USA_MAP_URL . 'assets/js/main-script.js', ['jquery'], MY_PLUGIN_VERSION , true);

}

/**
 * Shortcode
 */
function my_usa_map_shortcode() {

    $svg_file = USA_MAP_PATH . 'assets/images/usamap-2.svg';

    if (!file_exists($svg_file)) {
        return '<p>USA Map SVG file not found.</p>';
    }

    $usa_map_svg = file_get_contents($svg_file);

    global $wpdb;
    $table_name = $wpdb->prefix . 'my_usa_map';
    $pins = $wpdb->get_results("SELECT * FROM $table_name");

    ob_start();
    ?>

    <div class="cst_usa_map_wrapper">
        <?php echo $usa_map_svg; ?>

        <?php if (!empty($pins)) : ?>
            <div class="cst_pins_wrapper">

                <?php foreach ($pins as $pin) : ?>
                    <div class="cst_pin cst_properties" data-name="<?php echo esc_attr($pin->pin_state); ?>" data-location="<?php echo esc_attr($pin->pin_state); ?>">

                        <div class="cst_pin_icon" data-name="<?php echo esc_attr($pin->pin_state); ?>"></div>

                        <div class="modal-card-popup">
                            <div class="modal-card">
                                <div class="action-panel">
                                    <div class="popup-cross-btn">
                                        <span class="hidden">Close</span>
                                    </div>
                                </div>

                                <div class="cst_property_img">
                                    <img src="<?php echo esc_url($pin->pin_image); ?>" />
                                </div>

                                <div class="info">
                                    <div class="title">
                                        <?php echo esc_html($pin->pin_data); ?>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                <?php endforeach; ?>

            </div>
        <?php endif; ?>

    </div>

    <?php
    return ob_get_clean();
}