<?php

class ProductsBuilder {

    public static $general_options;

    private function __construct() {

    }

    public static function register() {

        if ( false === get_option( 'wn_pb_options' ) ) {

            self::$general_options = [ 
    
                'global_settings' => [],
                'products' => [], 
            ];
    
            update_option( 'wn_pb_options', self::$general_options );
    
        }
        else {
    
            self::$general_options = get_option( 'wn_pb_options' );
    
        }

    }

    public function render_products_table() {
        
    ?>
    <table class="wn_pb_table">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Shortcode</th>
            <th>Options</th>
        </tr>

        <?php if ( isset( self::$general_options['products'] ) ) { ?>

            <?php foreach ( self::$general_options['products'] as $product_id => $product ) { ?>
                <?php 
                    $product_name = $product['name'];
                ?>

                <tr>
                    <td><?php echo esc_attr( $product_id ); ?></td>
                    <td><?php echo esc_attr( $product_name );  ?></td>
                    <td><?php echo esc_attr( '[wn-pb id="' . $product_id . '"]' ); ?></td>

                    <td>
                        <button class="wn_pb_table_btn_edit"    action="edit_product"></button>
                        <button class="wn_pb_table_btn_remove"  action="remove_product"></button>
                    </td>
                </tr>

            <?php } ?>

        <?php } ?>

    </table>
    <?php

    }

    public static function render_products_builder() {

        return self::render_2();

    }
}