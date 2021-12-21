<?php

require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';

class WnButtonWidget extends WnWidgets {

    public static $styles =[];

    private function __construct() {

    }

    public static function init() {



    }

    public static function generate_html_controls() {

        self::$styles = [
            'button_margin' => [
                'type'   => 'dimensions',
                'label'  => 'Margin',
                'target' => [
                    'selectors' => '.wn_pb_selector_button',
                    'values'    => [
                        'margin-top'    => '0px',
                        'margin-right'  => '0px',
                        'margin-bottom' => '0px',
                        'margin-left'   => '0px',
                    ]
                ]
            ]
        ];

        return Controls::return_html_controls(self::$styles);

    }

    public static function editor() {
        ?>
        <div class="wn_pb_e_editors wn_pb_editor_type__button">
            <h3>Button Editor</h3>
            <div class="wn_pb_hle_tabs">
                <div class="wn_pb_e_tab wn_pb_e_tab__content wn_pb_e_tab__active">
                    <!-- Icon Generated in CSS -->
                </div>
                <div class="wn_pb_e_tab wn_pb_e_tab__style">
                    <!-- Icon Generated in CSS -->
                </div>
            </div>
            <div class="wn_pb_e_content">
                <div class="wn_pb_e_content__content wn_pb_e_content__active">
                    <label for="wn_pb_e_button_title">Title</label>
                    <input type="text" id="wn_pb_e_button_title" class="wn_pb_e_input_text" targets="wn_pb_selector_title_text">
                    <label for="wn_pb_e_button_price">Price</label>
                    <input type="number" min="0" value="0" step="0.01" id="wn_pb_e_button_price" class="wn_pb_e_input_text" targets="wn_pb_selector_price_text">
                </div>
                <div class="wn_pb_e_content__style">
                    <?php echo self::generate_html_controls(); ?>
                </div>
            </div>
            <div class="en_pb_e_remove_element">Delete Element</div>
        </div>
        <?php
    }


    public static function picker() {

        ?>

        <div class="wn_pb_e_picker wn_pb_picker_button">
            <i class="wn_pb_picker_simple_button__icon"></i>
            <span>Button</span>
            <div class="wn_pb_e_widget_content">
                <button widget-id="" widget-type="button" class="wn_pb_selector_button">
                    <div class="wn_pb_selector_price">
                        <span class="wn_pb_selector_price_text" >60</span>
                    </div>
                    <div class="wn_pb_selector_value">
                        <span class="wn_pb_selector_value_text" ></span>
                    </div>                                
                    <div class="wn_pb_selector_name">
                        <span class="wn_pb_selector_title_text" >2 Bathrooms</span>
                    </div>                            
                </button>
            </div>
        </div>
        <?php

    }

    
}