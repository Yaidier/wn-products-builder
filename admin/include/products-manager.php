<?php 



require_once WN_PB_DIR . '/admin/include/products-builder.php';

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


}