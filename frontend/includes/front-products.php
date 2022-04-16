<?php 



class FrontProducts {

    public static $general_options;
    public static $product_data;
    public static $is_editor;

    private function __construct() {

    }

    public static function register() {

        self::$is_editor = true;
        self::$product_data = [

            'header' => [

                'logo_img_url'      => 'https://wirenomads.com/wp-content/plugins/wn-products-builder/temp/images/WN Logo.png',
                'reset_button_txt' => 'Reset Selectio',

            ],
            'index'  => [ 'Bathroooms', 'Resume', 'Resume Extension' ],
            'sections' => [

                [
                    'section-id' => '0',
  
                    'media_content' => [

                        'wid_id'  => 's0-m-1',
                        'type'    => 'simple_img',
                        'img_url' => '',

                    ],
                    'options_content' => [

                        [
                            'wid_id'  => 's0-c-1',
                            'type'    => 'heading',
                            'content' => 'Number of Bathrooms',
                        ],
                        [
                            'wid_id'  => 's0-c-2',
                            'type'    => 'buttons',
                            'content' => [

                                [
                                    'sub_wid_id'   => 's0-c-2-1',
                                    'type'         => 'button',
                                    'button_name'  => '1 Bathroom',
                                    'button_price' => '45',
                                    'button_value' => '',
                                ],
                                [
                                    'sub_wid_id'   => 's0-c-2-2',
                                    'type'         => 'button',
                                    'button_name'  => '2 Bathrooms',
                                    'button_price' => '60',
                                    'button_value' => '',
                                ],
                                [
                                    'sub_wid_id'   => 's0-c-2-3',
                                    'type'         => 'button',
                                    'button_name'  => '3 Bathrooms',
                                    'button_price' => '80',
                                    'button_value' => '',
    
                                ],
    
                            ],

                        ],
                        [
                            'wid_id'       => 's0-c-3',
                            'type'         => 'p',
                            'content'      => 'Iy is prevented by the installation of a sacrificial anode rod. The anode rod attracts rust and decay to itself. When the anode rod has been completely decayed it can no longer protect the tank.roughly 8 years being that it is made out of steel and will eventually leak. Water heater decay is prevented by the installation of a sacrificial anode rod. The anode rod attracts rust and decay to itself. When the anode rod has been completely decayed it can no longer protect the tank.',
                        ]

                    ]
                ],

            ],
            'resume_section' => [

                'title' => 'Resume',
                'options_content' => [

                    'options_heading'     => 'Schedule your Installation',
                    'options_description' => 'Your water heater has a useful life of roughly',
                    'contact_form'        => [

                        'inputs' => [

                            [ 
                                'type'        => 'text',
                                'name'        => 'name',
                                'id'          => '',
                                'placeholder' => 'Name',
                                'value'       => '',
                            ],
                            [ 
                                'type'        => 'text',
                                'name'        => 'last-name',
                                'id'          => '',
                                'placeholder' => 'Last Name',
                                'value'       => '',
                            ],
                            [ 
                                'type'        => 'email',
                                'name'        => 'email',
                                'id'          => '',
                                'placeholder' => 'Email',
                                'value'       => '',
                            ],
                            [ 
                                'type'        => 'text',
                                'name'        => 'phone',
                                'id'          => '',
                                'placeholder' => 'Phone',
                                'value'       => '',
                            ],
                            [ 
                                'type'        => 'submit',
                                'name'        => '',
                                'id'          => '',
                                'placeholder' => '',
                                'value'       => 'Schedule Now',
                            ],

                        ]

                    ]
                ]
            ],
            'footer' => [

                'help_button'    => [

                    'help_btn_rul' => '',
                    'help_btn_txt' => 'Need help?'

                ],
                'est_cost' => [

                    'est_cost_txt' => 'Estimated Cost'

                ]
            ]
        ];

    }

    public static function render_new() {

        ?>
        <div class="wn_pb_wrapper">
            <div class="wn_pb_sticky_header">
                <div class="wn_pb_header_content">
                    <div class="wn_pb_logo">
                        <a href="<?php echo get_home_url(); ?>">
                            <img widget-type="simple-img" widget-id="" src="<?php echo WN_PB_URL . 'editor/assets/img/default-img.svg' ?>" alt="">
                        </a>
                    </div>
                    <div class="wn_pb_reset">
                        <i class="wn_pb_reset_icon">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 92.33 92.33" style="enable-background:new 0 0 92.33 92.33;" xml:space="preserve">
                                <g>
                                    <path d="M70.598,16.753c-1.722-1.24-4.113-0.852-5.349,0.866c-1.242,1.716-0.853,4.113,0.865,5.35c13.613,9.818,18.021,27.857,10.482,42.89c-4.082,8.138-11.088,14.202-19.726,17.066c-8.636,2.871-17.877,2.2-26.013-1.879c-8.134-4.083-14.197-11.088-17.066-19.722c-2.866-8.642-2.197-17.877,1.886-26.014c4.958-9.89,14.458-16.779,25.413-18.429c0.074-0.008,0.137-0.036,0.211-0.053l0.157,7.571c0.021,0.839,0.542,1.585,1.321,1.889c0.782,0.305,1.672,0.11,2.25-0.496l10.904-11.379c0.794-0.828,0.764-2.142-0.062-2.933L44.492,0.577c-0.606-0.582-1.499-0.739-2.267-0.399c-0.251,0.108-0.476,0.269-0.662,0.462c-0.372,0.389-0.585,0.919-0.579,1.479l0.151,7.212c-0.385-0.063-0.78-0.087-1.188-0.027c-13.418,2.021-25.052,10.46-31.125,22.571C-1.499,52.451,6.85,77.584,27.424,87.901c5.989,3.005,12.362,4.429,18.646,4.429c15.306,0,30.065-8.439,37.382-23.028C92.688,50.884,87.284,28.782,70.598,16.753z"/>
                                </g>
                            </svg>
                        </i>
                        <span widget-id="h-reset_button_txt" widget-type="heading" class="wn_pb_e_headline_content" >Reset Selection</span>
                    </div>
                </div>
            </div>

            <div class="wn_pb_section_index">
                <ul>

                    <li class="wn_pb_index__active">
                        <a href="#">
                            <i class="wn_pb_index_icon"></i>
                            <span class="wn_pb_e_headline_content" widget-id="" widget-type="span">New Section 0</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="#">
                            <i class="wn_pb_index_icon"></i>
                            <span class="wn_pb_e_headline_content" widget-id="" widget-type="span">New Section 1</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="#">
                            <i class="wn_pb_index_icon"></i>
                            <span class="wn_pb_e_headline_content" widget-id="" widget-type="span">New Section 2</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="#">
                            <i class="wn_pb_index_icon"></i>
                            <span class="wn_pb_e_headline_content" widget-id="" widget-type="span">New Section 3</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="#">
                            <i class="wn_pb_index_icon"></i>
                            <span class="wn_pb_e_headline_content" widget-id="" widget-type="span">New Section 4</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="wn_pb_container">

                <section section-id="0" section-title="New Section 0" class="wn_pb_section">
                    <div class="wn_pb_section_content">
                        <div class="wn_pb_main_columns wn_pb_index_column">
                            <div id="first_reference" class="wn_index_reference">

                            </div>
                        </div>
                        <div class="wn_pb_main_columns wn_pb_media_wrapper">
                            
                        </div>
                        <div class="wn_pb_main_columns wn_pb_options">
                            <h2 widget-id="" widget-type="heading" class="wn_pb_e_headline_content">Headline 0</h2>
                        </div>
                    </div>            
                </section>
                <section section-id="1" section-title="New Section 1" class="wn_pb_section">
                    <div class="wn_pb_section_content">
                        <div class="wn_pb_main_columns wn_pb_index_column">
                            <div id="first_reference" class="wn_index_reference">

                            </div>
                        </div>
                        <div class="wn_pb_main_columns wn_pb_media_wrapper">
                            
                        </div>
                        <div class="wn_pb_main_columns wn_pb_options">
                            <h2 widget-id="" widget-type="heading" class="wn_pb_e_headline_content">Headline 1</h2>
                        </div>
                    </div>            
                </section>
                <section section-id="2" section-title="New Section 2" class="wn_pb_section">
                    <div class="wn_pb_section_content">
                        <div class="wn_pb_main_columns wn_pb_index_column">
                            <div id="first_reference" class="wn_index_reference">

                            </div>
                        </div>
                        <div class="wn_pb_main_columns wn_pb_media_wrapper">
                            
                        </div>
                        <div class="wn_pb_main_columns wn_pb_options">
                            <h2 widget-id="" widget-type="heading" class="wn_pb_e_headline_content">Headline 2</h2>
                        </div>
                    </div>            
                </section>
                <section section-id="3" section-title="New Section 3" class="wn_pb_section">
                    <div class="wn_pb_section_content">
                        <div class="wn_pb_main_columns wn_pb_index_column">
                            <div id="first_reference" class="wn_index_reference">

                            </div>
                        </div>
                        <div class="wn_pb_main_columns wn_pb_media_wrapper">
                            
                        </div>
                        <div class="wn_pb_main_columns wn_pb_options">
                            <h2 widget-id="" widget-type="heading" class="wn_pb_e_headline_content">Headline 3</h2>
                        </div>
                    </div>            
                </section>
                <section section-id="4" section-title="New Section 4" class="wn_pb_section">
                    <div class="wn_pb_section_content">
                        <div class="wn_pb_main_columns wn_pb_index_column">
                            <div id="first_reference" class="wn_index_reference">

                            </div>
                        </div>
                        <div class="wn_pb_main_columns wn_pb_media_wrapper">
                            
                        </div>
                        <div class="wn_pb_main_columns wn_pb_options">
                            <h2 widget-id="" widget-type="heading" class="wn_pb_e_headline_content">Headline 4</h2>
                        </div>
                    </div>            
                </section>

            </div>

            <div class="wn_pb_sticky_footer">
                <div class="wn_pb_footer_content">
                    <button class="wn_pb_help_button">Need Help?</button>
                    <div class="wn_pb_total_cost_wrapper">
                        <span class="wn_pb_total_cost_txt" >Estimated Cost</span>
                        <span id="wn_pb_total_cost" class="wn_pb_total_cost_calc">0</span>
                    </div>
                </div>
            </div>

            <!-- The Modal -->
            <div id="myModal" class="modal">
                <span class="close">
                    <i class="wn_pb_reset_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </i>
                </span>

                <!-- Modal content -->
                <div class="wn_pb_modal_content">
                    <div class="modal-body">
                        
                    </div>
                </div>
            </div>
        </div>

    <?php
    }

    private static function rendering_widgets( $product_data, $column, $is_editor, $i ) {

        if ( !isset( $product_data['sections'][$i][$column . '_content'] ) ) {
            return;
        }

        $wrapping_buttons = false;
        for( $w_i = 0; $w_i < count($product_data['sections'][$i][$column . '_content'] ); $w_i++ ) {

            if( !$is_editor && isset($product_data['sections'][$i][$column . '_content'][$w_i]['styles']) ) {

                $widget_styles = $product_data['sections'][$i][$column . '_content'][$w_i]['styles'];

                if( is_array( $widget_styles ) ) {
                    foreach( $widget_styles as $widget_style ) {
                        echo (stripslashes($widget_style));
                    }
                }
                else {
                    echo (stripslashes($widget_styles));
                }

            }

            $widget_content = $product_data['sections'][$i][$column . '_content'][$w_i]['content'];
            $cube_id = $product_data['sections'][$i][$column . '_content'][$w_i]['cube_id'];

            //check if widget_content is a cf7 shortcode
            if (strpos( stripslashes($widget_content), 'contact-form' ) !== false) {

                echo '<div class="wn_pb_contanct_form_wrapper" cube-id="' . $cube_id . '" widget-id="ping" widget-type="form" >';
                echo '<span class="cf7_shortcode_content" style="display: none">' . stripslashes($widget_content) .'</span>';
                echo do_shortcode(stripslashes($widget_content));
                echo '</div>';

            }
            else if( strpos( stripslashes($widget_content), 'wn_pb_selector_button' ) !== false ) {

                if($wrapping_buttons == false) {
                    echo '<div class="wn_pb_selectors_wrapper wn_pb_two_col_layout">';
                }

                $wrapping_buttons = true;
                echo (stripslashes($widget_content));

                if( isset( $product_data['sections'][$i][$column . '_content'][$w_i + 1]['content'] ) ) {

                    $check_next_widget = $product_data['sections'][$i][$column . '_content'][$w_i + 1]['content'];

                    if( strpos( stripslashes($check_next_widget), 'wn_pb_selector_button' ) === false ) {

                        $wrapping_buttons = false;                                            
                        echo '</div>';

                    }
                }
                else {

                    $wrapping_buttons = false;                                            
                    echo '</div>';

                }

            }
            else {

                echo (stripslashes($widget_content));

            }

        }

    }

    public static function render( $product_data, $is_editor = true ) {
        $snap_effect_on_mobile = ($product_data['info']['disable_snap_effect_on_mobile']) ? 'none' : 'y mandatory';
        ?>

        <?php if ( $snap_effect_on_mobile == 'none' ) : ?>
            <style>
                /** General Styles */
                @media only screen and (max-width: 600px)  {
                
                    body .wn_pb_wrapper .wn_pb_container > .wn_pb_section {
                        height: auto;
                        padding-left: 20px !important;
                        padding-right: 20px !important;
                    }

                    body  .wn_pb_wrapper .wn_pb_section_index {
                        display: none;
                    }

                    body .wn_pb_wrapper .wn_pb_container {
                        scroll-snap-type: <?php echo $snap_effect_on_mobile . ';'; ?>
                    }
                }
            </style>

        <?php endif; ?>


        

        <div class="wn_pb_wrapper" version="<?php echo WN_PB_VERSION; ?>" snap-effect-mobile="<?php echo $snap_effect_on_mobile; ?>">
            <div class="wn_pb_sticky_header">
                <div class="wn_pb_header_content">
                    <div class="wn_pb_logo">
                        <a href="<?php echo get_home_url(); ?>">
                            <?php
                            $widget_content = $product_data['header']['logo_widget']['content'];
                            echo (stripslashes($widget_content));
                            ?>
                        </a>
                    </div>
                    <div class="wn_pb_reset">
                        <i class="wn_pb_reset_icon">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 92.33 92.33" style="enable-background:new 0 0 92.33 92.33;" xml:space="preserve">
                                <g>
                                    <path d="M70.598,16.753c-1.722-1.24-4.113-0.852-5.349,0.866c-1.242,1.716-0.853,4.113,0.865,5.35c13.613,9.818,18.021,27.857,10.482,42.89c-4.082,8.138-11.088,14.202-19.726,17.066c-8.636,2.871-17.877,2.2-26.013-1.879c-8.134-4.083-14.197-11.088-17.066-19.722c-2.866-8.642-2.197-17.877,1.886-26.014c4.958-9.89,14.458-16.779,25.413-18.429c0.074-0.008,0.137-0.036,0.211-0.053l0.157,7.571c0.021,0.839,0.542,1.585,1.321,1.889c0.782,0.305,1.672,0.11,2.25-0.496l10.904-11.379c0.794-0.828,0.764-2.142-0.062-2.933L44.492,0.577c-0.606-0.582-1.499-0.739-2.267-0.399c-0.251,0.108-0.476,0.269-0.662,0.462c-0.372,0.389-0.585,0.919-0.579,1.479l0.151,7.212c-0.385-0.063-0.78-0.087-1.188-0.027c-13.418,2.021-25.052,10.46-31.125,22.571C-1.499,52.451,6.85,77.584,27.424,87.901c5.989,3.005,12.362,4.429,18.646,4.429c15.306,0,30.065-8.439,37.382-23.028C92.688,50.884,87.284,28.782,70.598,16.753z"/>
                                </g>
                            </svg>
                        </i>
                        <span widget-id="h-reset_button_txt" widget-type="heading" class="wn_pb_e_headline_content" ><?php echo esc_attr( $product_data['header']['reset_button_txt'] ); ?></span>
                    </div>
                </div>
            </div>

            <div class="wn_pb_section_index">
                <ul>
                    <?php
                    for( $i = 0; $i < count( $product_data['index'] ); $i++ ) {

                        $classes = '';

                        if ( $i == 0 ) {

                            $classes .= 'wn_pb_index__active ';

                        }
                        ?>

                        <li class="<?php echo esc_attr( $classes ); ?>">
                            <a href="#">
                                <i class="wn_pb_index_icon"></i>
                                <span class="wn_pb_e_headline_content" widget-id="" widget-type="span"><?php echo esc_attr( $product_data['index'][$i] ); ?></span>
                            </a>
                        </li>

                    <?php
                    }
                    ?>
                </ul>
            </div>

            <div class="wn_pb_container">

                <?php 

                for ( $i = 0; $i < (count( $product_data['sections'] ) ); $i++ ) {

                    $classes = 'wn_pb_section ';

                ?>

                <section section-id="<?php echo esc_attr( $i ); ?>" section-title="<?php echo esc_attr( $product_data['sections'][$i]['title'] ) ?>" class="<?php echo esc_attr( $classes ); ?>">
                    <div class="wn_pb_section_content">
                        <div class="wn_pb_main_columns wn_pb_index_column">
                            <div id="first_reference" class="wn_index_reference">

                            </div>
                        </div>
                        <div class="wn_pb_main_columns wn_pb_media_wrapper">

                            <?php self::rendering_widgets( $product_data, 'media', $is_editor, $i); ?>
                            
                        </div>
                        <div class="wn_pb_main_columns wn_pb_options">

                            <?php self::rendering_widgets( $product_data, 'options', $is_editor, $i); ?>

                        </div>
                    </div>            
                </section>

                <?php
                }
                ?>

            </div>

            <div class="wn_pb_sticky_footer">
                <div class="wn_pb_footer_content">
                    <button class="wn_pb_help_button">Need Help?</button>
                    <div class="wn_pb_total_cost_wrapper">
                        <span class="wn_pb_total_cost_txt" >Estimated Cost</span>
                        <span id="wn_pb_total_cost" class="wn_pb_total_cost_calc">0</span>
                    </div>
                </div>
            </div>
]
            <!-- The Modal -->
            <div id="myModal" class="modal">
                <span class="close">
                    <i class="wn_pb_reset_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </i>
                </span>

                <!-- Modal content -->
                <div class="wn_pb_modal_content">
                    <div class="modal-body">
                        
                    </div>
                </div>
            </div>
        </div>
    <?php
    }

}