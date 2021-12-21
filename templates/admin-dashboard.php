<?php

?>
<div class="wn_pb">

    <div class="wn_pb_not">
        <div class="wn_pb_not_left">
            <i></i>
        </div>
        <div class="wn_pb_not_content">
            <h4>SUCCESS</h4>
            <p>Lorem ipsum dolor.</p>
        </div>
        <i class="wn_pb_close_icon"></i>
    </div>

    <h1>Admin Dashboard.</h1>

    <ul class="wn_pb_admin_tabs">
        <li index="1" class="wn_pb--active_index">Products Builds</li>
        <li index="2">Global Settings</li>
    </ul>

    <div class="wn_pb_tabs_content wn_pb--active_content" index="1">

        <div class="wn_pb_products_table">
            <?php ProductsBuilder::render_products_table(); ?>
        </div>

        <!-- Redirect to Editor -->
        <form id="wn_pb_products_editor" action="<?php echo WN_PB_URL . 'templates/products-editor.php' ?>" method="POST">

            <!-- Value Generated in JS -->
            <input id="form_product_id" type="hidden" name="product_id" value="">

            <!-- Sending site path -->
            <input type="hidden" name="site_path" value="<?php echo get_home_path(); ?>">

        </form>

        <button id="add_new" action="add_new" class="wn_pb_btn_sav_chg">Add New</button>

    </div>

    <div class="wn_pb_tabs_content" index="2">
        <span>General Options</span>
    </div>
</div>




