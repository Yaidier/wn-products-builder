<?php
/**
 * @package WN Products Builder
 */
/*
Plugin Name: WN Products Builder
Plugin URI: https://wirenomads.com
Description: 
Author: Yaidier Perez
Version: 1.0 
Author URI: 
License: GPLv2 or later
*/
/*
Copyright ( C ) 2020  Yaidier Perez
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or ( at your option ) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

if ( !defined( 'ABSPATH' ) ) {

    exit;

}

require_once( ABSPATH . 'wp-admin/includes/plugin.php' );

// ... Your plugin's main file logic ...
define( 'WN_PB_DIR', __DIR__ );
define( 'WN_PB_URL', plugin_dir_url( __FILE__ ) );
define( 'WN_PB_VERSION', 0.9 );

require_once WN_PB_DIR . '/admin/include/products-builder.php';
require_once WN_PB_DIR . '/admin/include/products-manager.php';
require_once WN_PB_DIR . '/admin/include/ajax-handler.php';

class WnProductsBuilder {

    public $plugin_name;

    function __construct() {

        $this->plugin_name = plugin_basename( __FILE__ );
        ProductsBuilder::register();

    }

    function register() {  

        add_action( 'admin_enqueue_scripts', array( $this, 'wn_pb_admin_scripts' ) );
        add_action( 'admin_menu', array( $this, 'add_admin_pages' ) );
        add_filter( "plugin_action_links_{$this->plugin_name}", array( $this, 'settings_link' ) );

        //Admin Ajax Call
        add_action( 'wp_ajax_manage_products', array( 'AjaxHandler', 'manage_products_requests') );
        add_action( 'wp_ajax_wn_pb_editor', array( 'AjaxHandler', 'editor_requests') );

        add_shortcode( 'wn-pb', array( $this, 'includeme_call' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'wn_pb_fe_scripts' ) );

        $this->setting_backup();
    }

    function setting_backup() {

        if( !get_option('wn_pb_backup_21_12_21') ) {

            $general_options = ProductsBuilder::$general_options;
            $products = $general_options['products'];
            $backup_data = [];

            foreach( $products as $key => $value ) {

                $current_product = get_option('wn_pb_product_' . $key);
                update_option('wn_pb_product__backup_' . $key, $current_product);

            }

            update_option('wn_pb_backup_21_12_21', 'true');

        }
    }
    
    function wn_pb_fe_scripts() {

        wp_enqueue_style( 'wn_pb_fe_style', WN_PB_URL . 'frontend/assets/css/wn-pb-fe.css', array(), time() );
        wp_enqueue_script( 'wn_pb_fe_script', WN_PB_URL . 'frontend/assets/js/wn-pb-fe.js', array('jquery'), time() );

    }

    function includeme_call($atts = array(), $content = null)
    {
         
        $shortcode = $atts['id'];
        $product_data = get_option( 'wn_pb_product_' . $shortcode );

        ob_start();
        FrontProducts::render( $product_data, false );
        $buffer = ob_get_clean();

        $options = get_option( 'includeme', array() );

        if ( isset( $options[ 'shortcode' ] ) ) {

            $buffer = do_shortcode( $buffer );

        }

        return $buffer;

    }

    public function wn_pb_admin_scripts( $hook ) {

        //Enqueing scripts for the Table Products page
        if ( 'toplevel_page_wn_products_builder' === $hook ) {

            wp_enqueue_style( 'wn_pb_admin_style', WN_PB_URL . 'admin/assets/css/wn-pb-admin.css', array(), time() );
            wp_enqueue_script( 'wn_pb_admin_script', WN_PB_URL . 'admin/assets/js/wn-pb-admin.js', array('jquery'), time() );

            wp_localize_script('wn_pb_admin_script', 'wp_ajax_tets_vars', array(

                'ajax_url'    => admin_url( 'admin-ajax.php' ),

            ));
        }
    }

    public function settings_link( $links ) {

        $settings_link = '<a href="admin.php?page=wn_products_builder">Products Builder Plugin</a>';
        array_push( $links, $settings_link );

        return $links;

    }

    public function add_admin_pages() {
        
        add_menu_page( 
            'Products Builder',
            'Products Builder',
            'manage_options',
            'wn_products_builder',
            array( $this, 'admin_index' ),
            'dashicons-align-full-width',
            110
       );

    }

    public function admin_index() {

        include_once plugin_dir_path( __FILE__ ) . '/templates/admin-dashboard.php';  
          
    }
    public function products_editor() {

        include_once plugin_dir_path( __FILE__ ) . '/templates/products-editor.php';  
          
    }

    function activate() {

        $current_theme_path = get_stylesheet_directory();

        if( !file_exists( $current_theme_path . '/template-product-builder.php' ) ) {

            var_dump(copy( WN_PB_DIR . '/templates/defaults/template-product-builder.php',  get_stylesheet_directory() . '/template-product-builder.php' ));

        }

    }

    function deactivate() {

    }

}

if ( class_exists( 'WnProductsBuilder' ) ) {

    $wn_products_builder = new WnProductsBuilder();
    $wn_products_builder->register();

}

//activation
register_activation_hook( __FILE__, array( $wn_products_builder, 'activate' ) );

//deactivation
register_deactivation_hook( __FILE__, array( $wn_products_builder, 'deactivate' ) );