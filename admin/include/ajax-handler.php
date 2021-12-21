<?php

require_once WN_PB_DIR . '/admin/include/products-builder.php';
require_once WN_PB_DIR . '/frontend/includes/front-products.php';

class AjaxHandler extends ProductsBuilder {

    private function __construct() {

    }
    
    public static function manage_products_requests(){

        // Check parameters
        $command        = isset( $_POST['command'] ) ? $_POST['command'] : false;
        $product_id     = isset( $_POST['product_id'] ) ? $_POST['product_id'] : false;

        if ( !$command ) {

            wp_send_json( array('message' => 'Command not Received :(' ) );

        }

        switch ( $command ) {

            case 'add_new_product': {

                $message_from_server = ProductsManager::add_new_product();

            }
            break;

            case 'remove_product': {

                $message_from_server = ProductsManager::remove_product( $product_id );

            }
            break;

        }

        update_option( 'wn_pb_options', ProductsBuilder::$general_options );

        ProductsBuilder::render_products_table();
        die();

    }

    public static function editor_requests() {

        // Check parameters
        $command = isset( $_POST['command'] ) ? $_POST['command'] : false;
        $product_id = isset( $_POST['product_id'] ) ? $_POST['product_id'] : false;
        $product_data = isset( $_POST['product_data'] ) ? $_POST['product_data'] : false;

        //Updating the Product Data
        update_option('wn_pb_product_' . $product_id, $product_data);

        //Updating the product name 
        $general_options = get_option( 'wn_pb_options' );
        $products = $general_options['products'];
        $products[$product_id]['name'] = $product_data['info']['product_name'];
        $general_options['products'] = $products;
        update_option( 'wn_pb_options', $general_options );

        //Getting ready to Render the Product page again
        FrontProducts::register();

        ob_start();
        FrontProducts::render($product_data);
        $html = ob_get_clean();
        
        wp_send_json($html);

    }
    
}