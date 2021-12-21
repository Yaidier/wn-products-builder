<?php

require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';

class WnTextareaWidget extends WnWidgets {

    public static $styles =[];

    private function __construct() {

    }

    public static function generate_html_controls() {

        self::$styles = [
            'text_area_margin' => [
                'type'   => 'dimensions',
                'label'  => 'Margin',
                'target' => [
                    'selectors' => '.wm_pb_options_description',
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

    public static function picker() {

        ?>

        <div class="wn_pb_e_picker wn_pb_picker_textarea">
            <i class="wn_pb_picker_p__icon"></i>
            <span>Textarea</span>
            <div class="wn_pb_e_widget_content">
                <p widget-id="" widget-type="p" class="wm_pb_options_description">This a text, just replace it...</p>
            </div>
        </div>


        <?php


    }

    public static function editor() {

        ?>
            <div class="wn_pb_e_editors wn_pb_editor_type__p">

                <h3>Textarea Editor</h3>
                <div class="wn_pb_hle_tabs">
                    <div class="wn_pb_e_tab wn_pb_e_tab__content wn_pb_e_tab__active">
                        <!-- Icon Generated in CSS -->
                    </div>
                    <div class="wn_pb_e_tab wn_pb_e_tab__style">
                        <!-- Icon Generated in CSS -->
                    </div>
                    <div class="wn_pb_e_tab wn_pb_e_tab__advance">
                        <!-- Icon Generated in CSS -->
                    </div>
                </div>
                <div class="wn_pb_e_content">
                    <div class="wn_pb_e_content__content wn_pb_e_content__active">
                        <label for="wn_pb_e_headline">Text</label>
                        <textarea id="wn_pb_e_input" class="wn_pb_e_textarea_input" targets="wm_pb_options_description" ></textarea>
                        
                    </div>
                    <div class="wn_pb_e_content__style">
                        <?php echo self::generate_html_controls(); ?>
                    </div>
                    <div class="wn_pb_e_content__advance">
                        <div class="wn_pb_e_responsivenes_checkboxes">
                            <br><br>
                            <label>Hide on Desktop</label>
                            <br>
                            <label class="wn_pb_e_checkbox wn_pb_e_checkbox_switch">
                                <input id="wn_pb_e_hide_desktop" device-to-hide="desktop" type="checkbox">
                                <span class="wn_pb_e_checkbox_slider round"></span>
                            </label>
                            <br>
                            <label>Hide on Tablet</label>
                            <br>
                            <label class="wn_pb_e_checkbox wn_pb_e_checkbox_switch">
                                <input id="wn_pb_e_hide_desktop" device-to-hide="tablet" type="checkbox">
                                <span class="wn_pb_e_checkbox_slider round"></span>
                            </label>
                            <br>
                            <label>Hide on Mobile</label>
                            <br>
                            <label class="wn_pb_e_checkbox wn_pb_e_checkbox_switch">
                                <input id="wn_pb_e_hide_desktop" device-to-hide="mobile" type="checkbox">
                                <span class="wn_pb_e_checkbox_slider round"></span>
                            </label>
                        </div>
                    </div> 
                </div>
                <div class="en_pb_e_remove_element">Delete Element</div>
            </div>
        <?php
    }
}