<?php

require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';

class WnResumeTableWidget extends WnWidgets {


    public static $styles =[];

    private function __construct() {

    }

    public static function styles() {


    }

    public static function generate_html_controls() {

        self::$styles = [
            'resume_table_margins' => [
                'type'   => 'dimensions',
                'label'  => 'Margin',
                'target' => [
                    'selectors' => '.wn_pb_e_headline_content',
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

        <div class="wn_pb_e_picker wn_pb_picker_text">
            <i class="wn_pb_picker_resume__icon"></i>
            <span>Resume Table</span>
            <div class="wn_pb_e_widget_content">
                <div widget-id="" widget-type="resume-table" class="wn_pb_resume_wrapper">
                    <!-- ELements Generated in JS -->
                </div>
            </div>
        </div>

        <?php

    }



    public static function editor() {

        ?>
            <div class="wn_pb_e_editors wn_pb_editor_type__resume-table">

                <h3>Text Editor</h3>
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