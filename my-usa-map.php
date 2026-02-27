<?php
/**
 * Plugin Name: USA Map Template
 * Plugin URI: https://example.com
 * Description: A reusable procedural plugin template for WordPress.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * Text Domain: usa-map
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('USA_Map_VERSION', '1.0.0');
define('USA_MAP_PATH', plugin_dir_path(__FILE__));
define('USA_MAP_URL', plugin_dir_url(__FILE__));

// Include necessary files
require_once USA_MAP_PATH . 'includes/db.php';
require_once USA_MAP_PATH . 'includes/admin.php';
require_once USA_MAP_PATH . 'includes/frontend.php';
require_once USA_MAP_PATH . 'includes/helpers.php';


// Register activation and deactivation hooks
register_activation_hook(__FILE__, 'my_usa_map_activate');
register_deactivation_hook(__FILE__, 'my_usa_map_deactivate');

/**
 * Plugin Activation
 */
function my_usa_map_activate() {
    my_usa_map_create_table();
}
register_activation_hook(__FILE__, 'my_usa_map_activate');

/**
 * Plugin deactivation callback
 */
function my_usa_map_deactivate() {
    flush_rewrite_rules();
}

/**
 * Init hooks
 */
add_action('init', 'my_usa_map_frontend_init');
add_action('admin_init', 'my_usa_map_admin_init');
