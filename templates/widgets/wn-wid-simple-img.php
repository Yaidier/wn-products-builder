<?php

require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';

class WnSimpleImgWidget extends WnWidgets {

    public static $styles =[];

    private function __construct() {

    }

    public static function generate_html_controls() {

        self::$styles = [
            'simple_img_margin' => [
                'type'   => 'dimensions',
                'label'  => 'Margin',
                'target' => [
                    'selectors' => '.wn_pb_e_simple_img',
                    'values'    => [
                        'margin-top'    => '0px',
                        'margin-right'  => '0px',
                        'margin-bottom' => '0px',
                        'margin-left'   => '0px',
                    ]
                ]
            ],
            'simple_img_border_radius' => [
                'type'   => 'range_slider',
                'label'  => 'Border Radius',
                'target' => [
                    'selectors' => '.wn_pb_e_simple_img',
                    'value'     => [
                        'border-radius'    => '100',
                    ],
                ],
                'min-value' => '0',
                'max-value' => '200',
            ],
        ];

        return Controls::return_html_controls(self::$styles);

    }

    public static function picker() {

        ?>
        <div class="wn_pb_e_picker wn_pb_picker_simple_img">
            <i class="wn_pb_picker_simple_img__icon"></i>
            <span>Simple Image</span>
            <div class="wn_pb_e_widget_content">
                <img widget-id="" widget-type="simple-img" class="wn_pb_e_simple_img wne_text" src="<?php echo WN_PB_URL . 'editor/assets/img/default-img.svg' ?>" alt="">
            </div>
        </div>
        <?php

    }

    public static function editor() {

        ?>
        <div class="wn_pb_e_editors wn_pb_simple_img_editor">

            <h3>Simple Image</h3>
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
                    <label for="wn_pb_e_headline">Media Library</label>

                    <div class="wn_pb_e_si_wrapper">
                        <div class="wn_pb_e_si_preview">
                            <img src="<?php echo WN_PB_URL . 'editor/assets/img/default-img.svg' ?>" alt="">
                            <span class="wn_pb_e_si_select">Choose Image</span>
                            <!-- <i class="wn_pb_e_trash__icon" ></i> -->
                        </div>
                    </div>

                </div>
                <div class="wn_pb_e_content__style">
                    <?php echo self::generate_html_controls(); ?>
                </div>
            </div>
            <div class="en_pb_e_remove_element">Delete Element</div>
        </div>
        <?php
    }
}