<?php

require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';

class WnExtraContWidget extends WnWidgets {

    public static $styles =[];

    private function __construct() {

    }

    public static function generate_html_controls() {

        self::$styles = [
            'extra_cont_margin' => [
                'type'   => 'dimensions',
                'label'  => 'Margin',
                'target' => [
                    'selectors' => '.wn_pb_send_to_modal_wrapper',
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

        <div class="wn_pb_e_picker wn_pb_picker_extra_cont">
            <i class="wn_pb_picker_simple_extra_cont__icon"></i>
            <span>Extra Content</span>
            <div class="wn_pb_e_widget_content">
                <div widget-id="" widget-type="extra-cont" class="wn_pb_send_to_modal_wrapper">
                    <div id="modal_trigger" class="wn_pb_send_trigger">
                        <i class="wn_pb_play_tag_icon"></i>
                        <span class="wn_pb_link_text" >Estimated Cost</span>
                    </div>
                    <div class="wn_pb_modal_content_to_send">
                        <div class="wn_pb_extra_info_card">
                            <div class="wn_pb_extra_info_bck_img" img-url="<?php echo WN_PB_URL . 'temp/images/pressure-regulator.png'; ?>" style="background-image: url('<?php echo WN_PB_URL ?>temp/images/pressure-regulator.png');">
                                <!--Background Image-->
                            </div>
                            <div class="wn_pb_extra_content">
                                <h3>Estimated Cost</h3>
                                <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque vitae architecto, deserunt porro consectetur adipisci veritatis sed exercitationem excepturi autem! Laboriosam iusto amet quibusdam saepe mollitia soluta error asperiores laborum?</p> -->
                                <div class="wn_pb_extra_content_text" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque necessitatibus quas voluptatibus. Illum sequi officiis ab obcaecati, harum dolores minus. Repellendus, cumque tempore vel in voluptatibus sapiente amet quae totam?<br><br>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, laborum quisquam unde quia recusandae<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo vitae natus optio, aliquam, unde distinctio Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim dolores eos reiciendis sapiente architecto error maxime excepturi nisi! Vero ullam totam illo modi aut? Inventore optio laudantium esse odio tempora?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <?php

    }

    public static function editor() {

        ?>
            <div class="wn_pb_e_editors wn_pb_extra_cont_editor">

                <h3>Extra Content Editor</h3>
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
                        <label for="wn_pb_e_extra_cont_title">Title</label>
                        <input type="text" id="wn_pb_e_extra_cont_title" class="wn_pb_e_input_text" >
                        <label for="wn_pb_e_extra_cont_headline">Headline</label>
                        <input type="text" id="wn_pb_e_extra_cont_headline" class="wn_pb_e_input_text" >
                        <label for="wn_pb_e_extra_cont_textarea">Text</label>
                        <textarea id="wn_pb_e_extra_cont_textarea" class="wn_pb_e_textarea_input"></textarea>
                        <label for="wn_pb_e_headline">Background Image</label>

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