
<div class="wrap">
    <h1>Uninstall Settings</h1>
    <form method="post" action="">
        <?php wp_nonce_field('my_usa_map_uninstall_action', 'my_usa_map_uninstall_nonce'); ?>
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="my_plugin_uninstall_option">Delete Data on Uninstall?</label>
                </th>
                <td>
                    <input type="checkbox" name="my_plugin_uninstall_option" id="my_plugin_uninstall_option" value="1" 
                           <?php checked(1, $uninstall_option); ?> />
                    <span class="description">Check this to delete data upon plugin uninstall.</span>
                </td>
            </tr>
        </table>

        <p class="submit">
            <input type="submit" name="my_plugin_save_uninstall_option" class="button button-primary" value="Save Settings">
        </p>
    </form>
</div>
