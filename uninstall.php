<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

global $wpdb;
$table_name = $wpdb->prefix . 'pws_online_client';

// Check the uninstall option setting
$delete_data = get_option('my_usa_map_uninstall_option', 0);

if ($delete_data) {
    // Drop the table
    $wpdb->query("DROP TABLE IF EXISTS $table_name");

    // Delete the uninstall option itself
    delete_option('my_usa_map_uninstall_option');
}
