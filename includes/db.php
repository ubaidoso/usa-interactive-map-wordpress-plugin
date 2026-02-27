<?php
if (!defined('ABSPATH')) exit;

function my_usa_map_create_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'my_usa_map';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        pin_state VARCHAR(100) NOT NULL,
        pin_data TEXT NOT NULL,
        pin_image TEXT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}
