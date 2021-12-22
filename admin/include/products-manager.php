<?php 



require_once WN_PB_DIR . '/admin/include/products-builder.php';
require_once WN_PB_DIR . '/admin/include/utils.php';

class ProductsManager extends ProductsBuilder {


    private function __construct() {

    }

    public static function add_new_product() {

        $products = parent::$general_options['products'];

        $product_template = [
            'name'  => 'product-name',
            'data'  => [],
            'css'   => [],
        ];

        if ( empty( $products ) ) {
            
            $products[1] = $product_template;
            
        }
        else {

            end( $products );
            $last_product_key = key( $products );
            $last_product_key++;
            $products[ $last_product_key ] = $product_template;
            
        }

        parent::$general_options['products'] = $products;
        return;

    }

    public static function remove_product( $product_id ) {

        $product_id = (string)$product_id;
        $products = parent::$general_options['products'];

        delete_option('wn_pb_product_' . $product_id);
        unset( $products[ $product_id ] );

        parent::$general_options['products'] = $products;
        return;

    }

    public static function export_product( $product_id ) {

        $product_id = (string)$product_id;
        $products = parent::$general_options['products'];

        $product_data = get_option('wn_pb_product_' . $product_id);

        $json_data = json_encode( $product_data );
        $json_data = str_replace( '\\\\', '', $json_data );

        $download_url = Utils::write_file( $json_data, 'product_id_' . $product_id );

        wp_send_json( [
            'from'      => 'export_product',
            'status'    => 'success',
            'message'   => 'Product exported',
            'data'      => $download_url,
        ] );
    }

    public static function import_product( $product_id, $content ) {

        $product_id = (string)$product_id;
        $products = parent::$general_options['products'];

        $current_value = get_option( 'wn_pb_product_' . $product_id );

        if( $current_value == $content ) {
    
            /**
             * if content to update is equal to the content stored in the db,
             * theres is no need to update, just return success;
             */
            //
            $result = true;

        }
        else {
            $result = update_option( 'wn_pb_product_' . $product_id, $content );
        }

        if( $result ) {
            wp_send_json( [
                'from'      => 'import_product',
                'status'    => 'success',
                'message'   => 'Product imported',
            ]);
        }
        else {
            wp_send_json( [
                'from'      => 'import_product',
                'status'    => 'fail',
                'message'   => 'Something went wrong :(',
            ]);
        }
    }

    public static function clone_product( $product_id ) {

        $products = parent::$general_options['products'];

        $product_template = [
            'name'  => 'cloned from product id ' . $product_id,
            'data'  => [],
            'css'   => [],
        ];

        end( $products );
        $last_product_key = key( $products );
        $last_product_key++;
        $products[ $last_product_key ] = $product_template;

        $product_data = get_option('wn_pb_product_' . $product_id);
        update_option( 'wn_pb_product_' . $last_product_key, $product_data );

        parent::$general_options['products'] = $products;
        return;

    }
}