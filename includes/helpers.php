<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Sample helper function
 */
function my_usa_map_get_option($option_name, $default = '') {
    return get_option($option_name, $default);
}
