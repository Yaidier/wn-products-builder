<?php 

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    isset( $_POST['product_id'] ) ? $product_id = $_POST['product_id'] :  $product_id = '';
    isset( $_POST['site_path'] ) ? $site_path = $_POST['site_path'] :  $site_path = false;

    //Running WP
    define( 'WP_USE_THEMES', false );  
    require_once( $site_path . 'wp-blog-header.php' ); 
    require_once( $site_path . 'wp-includes/media.php' ); 
    require_once WN_PB_DIR . '/frontend/includes/front-products.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-text.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-textarea.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-button.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-simple-img.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-extra-cont.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-form.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-simple-video.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-resume.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-dropdown.php';
    require_once WN_PB_DIR . '/templates/widgets/wn-wid-next-section-btn.php';

    FrontProducts::register();

    $product_data = get_option('wn_pb_product_' . $product_id);
    $product_name = isset( $product_data['info']['product_name'] ) ? $product_data['info']['product_name'] : 'noname';

    $new_section_json_template = [

        'section-id' => '',
        'media_content' => [
        ],
        'options_content' => [
            [
                'wid_id'  => '',
                'type'    => 'heading',
                'content' => 'Heading',
            ]
        ]
    ];

    $scripts_version = time();

    ?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Products Editor</title>

        <link rel="stylesheet" href="<?php // echo WN_PB_URL . 'frontend/assets/css/wn-pb-fe.css?v=' . $scripts_version; ?>">
        <link rel="stylesheet" href="<?php echo WN_PB_URL . 'editor/assets/css/wn-pb-editor.css?v=' . $scripts_version; ?>">

        <?php
            //Loading WP scripts in order to make the WP Media LIbrary to work
            wp_head();
            wp_enqueue_media();
            wp_footer();
        ?>

    </head>

    <body>
        <div class="wn_pb_editor">

            <?php 
            if( $product_data == false ) {

                FrontProducts::render_new();

            }
            else {

                FrontProducts::render( $product_data );

            }
            ?>

            <div class="wn_pb_f_editor">
                <i class="wn_pb_f_editor_draggable"></i>
                <div class="wn_pb_e_click_courtain">
                    <!--Courtain created to register the click outside of the editor-->
                </div>
                <div class="wn_pb_f_editor_relative_wrapper">
                    
                    <i class="wn_pb_f_editor_close_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </i>
                    <div class="wn_pb_f_editor_content">

                    </div>
                </div>
                
            </div>

            <div class="wn_pb_e_widgets__lib">
                <div class="wn_pb_e_widgets_bundle">
                    <h2>Widgets Picker</h2>
                    <div class="wn_pb_e_widgets_container">
                        <?php WnHeadlineWidget::picker(); ?>
                        <?php WnTextareaWidget::picker(); ?>
                        <?php WnSimpleImgWidget::picker(); ?>
                        <?php WnButtonWidget::picker(); ?>
                        <?php WnExtraContWidget::picker(); ?>
                        <?php WnFormWidget::picker(); ?>
                        <?php WnSimpleVideoImgWidget::picker(); ?>
                        <?php WnResumeTableWidget::picker(); ?>
                        <?php WnDropdownWidget::picker(); ?>
                        <?php WnNextSectionBtnWidget::picker(); ?>
                    </div>
                </div>
            </div>
            

            <div class="wn_pb_e_widgets__editors">
                <?php WnHeadlineWidget::editor(); ?>
                <?php WnTextareaWidget::editor(); ?>
                <?php WnButtonWidget::editor(); ?>
                <?php WnSimpleImgWidget::editor(); ?>
                <?php WnExtraContWidget::editor(); ?>
                <?php WnFormWidget::editor(); ?>
                <?php WnSimpleVideoImgWidget::editor(); ?>
                <?php WnResumeTableWidget::editor(); ?>
                <?php WnDropdownWidget::editor(); ?>
                <?php WnNextSectionBtnWidget::editor(); ?>
            </div>

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

            <div class="wn_pb_e_exitwp">
                <a href="<?php echo esc_url( admin_url('admin.php?page=wn_products_builder') ); ?>"><span>Exit to Wordpress</span></a>
                <i class="wn_pb_icon_wp"></i>
            </div>

            <div class="wn_pb_e_lpanel">
                <div class="wn_pb_e_lpanel_relative">
                    <h3>Products Editor</h3>
                    <div class="wn_pb_e_lpanel_id">
                        <span>ID: </span>
                        <span class="wn_pb_e_value"><?php echo esc_attr( $product_id ); ?></span>
                    </div>
                    <div class="wn_pb_e_lpanel_sc">
                        <label>Shortcode: </label>
                        <input type="text" class="wn_pb_e_input_text" value='<?php echo '[wn-pb id="' . esc_attr( $product_id ) . '"]'; ?>'>
                    </div>
                    <div class="wn_pb_e_lpanel_sc">
                        <label>Product Name: </label>
                        <input id="wn_pb_produc_name_input" type="text" class="wn_pb_e_input_text" value='<?php echo esc_attr( $product_name ); ?>'>
                    </div>
                    <div class="wn_pb_e_lpanel_sc">
                        <label>Disable snap effect on mobile: </label>

                        <label class="wn_pb_e_checkbox wn_pb_e_checkbox_switch">
                            <input id="wn_pb_disable_snap_effect__mobile" type="checkbox" <?php if (isset($product_data['info']['disable_snap_effect_on_mobile']) && $product_data['info']['disable_snap_effect_on_mobile'] === 'true' ) { echo 'checked'; }?>>
                            <span class="wn_pb_e_checkbox_slider round"></span>
                        </label>

                    </div>
                    <div class="wn_pb_e_lpanel_scwrapper">
                        <button class="wn_pb_save_data">Save Changes</button>
                    </div>
                    <div class="wn_pb_e_lpanel__tab">

                    </div>
                </div>
            </div>

            <div class="wn_pb_e_add_new_section">
                <span>Add New Section</span>
            </div>

            <div class="wn_pb_e_new_section_template">
                <?php require_once WN_PB_DIR . '/templates/defaults/new-section.php'; ?>
            </div>

            <div class="wn_pb_e_new_resume_template">
                <?php require_once WN_PB_DIR . '/templates/defaults/resume-section.php'; ?>
            </div>

            <div class="wn_pb_e_new_resume_ext_template">
                <?php require_once WN_PB_DIR . '/templates/defaults/resume-ext-section.php'; ?>
            </div>

            <div class="wn_pb_mouse_position">
                <div class="x_pos_wrap">
                    <span>X --> </span>
                    <span class="x_pos"></span>
                </div>
                <div class="y_pos_wrap">
                    <span>Y --> </span>
                    <span class="y_pos"></span>
                </div>
            </div>
        </div>

        <script type="text/javascript">

            var product_data_1 = <?php echo json_encode( $product_data ); ?>;
            var product_id   = '<?php echo $product_id; ?>';
            const ajax_url   = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
            var new_section_json_template = <?php echo json_encode( $new_section_json_template ); ?>;

        </script>

        <script src="<?php  echo includes_url() . 'js/jquery/jquery.js' ?>" ></script>
        <script src="<?php // echo WN_PB_URL . 'frontend/assets/js/wn-pb-fe.js?v=' . $scripts_version; ?>"></script>
        <script src="<?php echo WN_PB_URL . 'editor/assets/js/wn-pb-editor.js?v=' . $scripts_version; ?>"></script>
        
    </body>
</html>









