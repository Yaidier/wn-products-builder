<?php

require_once WN_PB_DIR . '/templates/widgets/wn-widgets.php';

class WnSimpleVideoImgWidget extends WnWidgets {

    public static $styles =[];

    private function __construct() {

    }

    public static function generate_html_controls() {
        self::$styles = [
            'simple_video_margin' => [
                'type'   => 'dimensions',
                'label'  => 'Margin',
                'target' => [
                    'selectors' => '.wn_pb_video_content',
                    'values'    => [
                        'margin-top'    => '0px',
                        'margin-right'  => '0px',
                        'margin-bottom' => '0px',
                        'margin-left'   => '0px',
                    ]
                ]
            ],
            'simple_video_hide_label' => [
                'type'   => 'checkbox',
                'label'  => 'Hide Label',
                'target' => [
                    'selectors' => '.wn_pb_send_trigger',
                    'property'  => 'display',
                    'status' => [
                        '0' => 'flex',
                        '1' => 'none',
                    ],
                    'default' => false,
                ]
            ],
            'simple_video_hide_overlay_icon' => [
                'type'   => 'checkbox',
                'label'  => 'Hide Overlay Icon',
                'target' => [
                    'selectors' => '.wn_pb_play_video_overlay_icon',
                    'property'  => 'display',
                    'status' => [
                        '0' => 'block',
                        '1' => 'none',
                    ],
                    'default' => false,
                ]
            ],
        ];

        return Controls::return_html_controls( self::$styles );

    }

    public static function picker() {

        ?>

        <div class="wn_pb_e_picker wn_pb_picker_simple_video">
            <i class="wn_pb_picker_simple_video__icon"></i>
            <span>Simple Video</span>
            <div class="wn_pb_e_widget_content">
                <div class="wn_pb_video_content" widget-id="" widget-type="simple-video">
                    <i class="wn_pb_play_video_overlay_icon wn_pb_video_send_to_modal_event"></i>
                    <img class="wn_pb_video_img_preview" src="" default-preview-img="<?php echo WN_PB_URL . 'editor/assets/img/default-img.svg' ?>" alt="">

                    <div class="wn_pb_send_to_modal_wrapper wn_pb_send_to_modal_video_media">
                        <div id="modal_trigger" class="wn_pb_send_trigger">
                            <i class="wn_pb_play_video_icon"></i>
                            <span class="wn_pb_send_trigger_text">Send this to modal</span>
                        </div>
                        <div class="wn_pb_modal_content_to_send">
                            <video value="0" class="wn_pb_video_element" width="100%" height="auto" controls>
                                <source class="wn_pb_video_src" src="" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <iframe class="wn_pb_video_element wn_pb_video_element_iframe" src="" value="1" style="display:none;" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="auto" frameborder="0"></iframe>
                            <!-- <iframe value="1" class="wn_pb_video_element wn_pb_video_element_iframe" style="display:none;" width="100%" height="auto" src="https://www.youtube.com/embed/tgbNymZ7vqY"> -->
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php

    }

    public static function editor() {

        ?>
            <div class="wn_pb_e_editors wn_pb_simple_video_editor">

                <h3>Simple Video</h3>
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

                        <label for="wn_pb_e_sv_title">Title</label>
                        <input type="text" id="wn_pb_e_sv_title" class="wn_pb_e_input_text" targets="wn_pb_e_headline_content">

                        <label for="wn_pb_e_headline">Choose the cover image</label>
                        <div class="wn_pb_e_si_wrapper">
                            <div class="wn_pb_e_si_preview ">
                                <img class="wn_pb_e_sv_img_p" src="<?php echo WN_PB_URL . 'editor/assets/img/default-img.svg' ?>" alt="">
                                <span class="wn_pb_e_si_select">Choose an image</span>
                                <!-- <i class="wn_pb_e_trash__icon" ></i> -->
                            </div>
                        </div>

                        <div class="wn_pb_e_select">
                            
                            <div class="wn_pb_e_select_index">

                                <label for="wn_pb_e_headline">Source</label>

                                <select>
                                    <option value="0">Media Library</option>
                                    <option value="1" selected="selected" >Youtube</option>
                                </select>

                            </div>

                        
                            <div class="wn_pb_e_select_content wn_pb_e_select_content__active" value="0">
                                <label for="wn_pb_e_headline">Choose a video</label>
                                <div class="wn_pb_e_si_wrapper">
                                    <div class="wn_pb_e_si_preview ">
                                        <video class="wn_pb_video_element wn_pb_e_sv_video_p" width="100%" height="auto" controls>
                                            <source class="wn_pb_video_src" src="" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                        <span class="wn_pb_e_sv_select">Choose a Video</span>
                                        <!-- <i class="wn_pb_e_trash__icon" ></i> -->
                                    </div>
                                </div>
                            </div>
                            <div class="wn_pb_e_select_content" value="1">
                                <label for="wn_pb_e_sv_url_input">Youtube Video ID</label>
                                <input type="text" id="wn_pb_e_sv_url_input" class="wn_pb_e_video_url_input">
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