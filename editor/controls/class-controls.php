<?php

class Controls {


    public static function return_html_controls( $controls ) {
        $html = '';

        foreach ( $controls as $control => $control_properties ) {
            ob_start();
            $values = compact( 'control', 'control_properties' );

            if ( $control_properties['type'] == 'dimensions' ) {
                self::dimensions_control( $values );
            }

            if ( $control_properties['type'] == 'range_slider' ) {
                self::range_slider_control( $values );
            }
            if ( $control_properties['type'] == 'checkbox' ) {
                self::checkbox_control( $values );
            }

            $buffer = ob_get_clean();
            $html .= $buffer;
        }

        return $html;
    }

    public static function checkbox_control( $values ) {
        $json_values = json_encode( $values );
        extract( $values );
        unset( $values );

        $is_checked = $control_properties['target']['default'] ?? true;

        ?>
        <div class="wn_cb_controls wn_cb_controls_cehckbox" control-targets="<?php echo $control_properties['target']['selectors']; ?>" data-params="<?php echo htmlspecialchars( $json_values, ENT_QUOTES, 'UTF-8' ); ?>">

            <label class="wn_pb_e_control_label"><?php echo $control_properties['label'] ?></label>
            <div class="wn_cb_controls_inputs">
                <?php
                
                ?>
                <label class="wn_pb_e_checkbox wn_pb_e_checkbox_switch">
                    <input id="wn_pb_e_hide_desktop" type="checkbox" <?php if( $is_checked ) : ?> checked="checked" <?php endif; ?>>
                    <span class="wn_pb_e_checkbox_slider round"></span>
                </label>

            </div>
        </div>
        <?php
    }

    public static function range_slider_control( $values ) {
        extract( $values );
        unset( $values );

        ?>
        <div class="wn_cb_controls wn_cb_controls_range_slider" control-targets="<?php echo $control_properties['target']['selectors']; ?>">

            <label class="wn_pb_e_control_label"><?php echo $control_properties['label'] ?></label>
            <div class="wn_cb_controls_selectors">
                <div class="wn_cb_controls_resp">
                    <i selector-value="desktop" class="wn_cb_controls_icon_desktop wn_cb_controls_resp_icon__active"></i>
                    <i selector-value="tablet" class="wn_cb_controls_icon_tablet"></i>
                    <i selector-value="mobile" class="wn_cb_controls_icon_phone"></i>
                </div>
                <div class="wn_cb_controls_units_selector">
                    <span class="wn_cb_controls_units__active">PX</span>
                    <span>%</span>
                    <span>EM</span>
                </div>
            </div>
            <div class="wn_cb_controls_inputs wn_cb_controls_range_slider_inputs">

                <?php

                $array_keys = array_keys( $control_properties['target']['value'] );
                $array_values = array_values( $control_properties['target']['value'] );

                ?>
                <input prop-target="<?php echo $array_keys[0]; ?>" class="wn_cb_controls_range_slider_input" type="range" min="<?php echo esc_attr( $control_properties['min-value'] ); ?>" max="<?php echo esc_attr( $control_properties['max-value'] ); ?>" value="<?php echo $array_values[0]; ?>">
                <input mirror=".wn_cb_controls_range_slider_input" class="wn_cb_controls_range_slider_input_number" type="number" step="1">

            </div>
        </div>
        <?php
    }

    public static function dimensions_control( $values ) {
        extract( $values );
        unset( $values );

        ?>
        <div class="wn_cb_controls wn_cb_dimensions" control-targets="<?php echo $control_properties['target']['selectors']; ?>">

            <label class="wn_pb_e_control_label"><?php echo $control_properties['label'] ?></label>
            <div class="wn_cb_controls_selectors">
                <div class="wn_cb_controls_resp">
                    <i selector-value="desktop" class="wn_cb_controls_icon_desktop wn_cb_controls_resp_icon__active"></i>
                    <i selector-value="tablet" class="wn_cb_controls_icon_tablet"></i>
                    <i selector-value="mobile" class="wn_cb_controls_icon_phone"></i>
                </div>
                <div class="wn_cb_controls_units_selector">
                    <span class="wn_cb_controls_units__active">PX</span>
                    <span>%</span>
                    <span>EM</span>
                </div>
            </div>
            <div class="wn_cb_controls_inputs wn_cb_controls_dimensions_inputs">

                <?php

                $array_keys = array_keys( $control_properties['target']['values'] );
                $array_values = array_values( $control_properties['target']['values'] );

                for ( $i = 0; $i < 4; $i++ ) {

                    $array_key = $array_keys[$i];

                    if ( !array_key_exists( $i, $array_keys ) ) {
                        $array_key = '';
                    }
                    if ( !array_key_exists( $i, $array_values ) ) {
                        $array_value = '0';
                    }

                ?>
                    <input prop-target="<?php echo $array_key; ?>" class="wn_cb_dimensions_input" type="number" step="1">
                <?php
                }

                ?>

                <div class="wn_cb_controls_anchor_select wn_cb_controls_anchor__linked">
                    <i class="wn_cb_dimensions_linked"></i>
                    <i class="wn_cb_dimensions_unlinked"></i>
                </div>
            </div>

        </div>
        <?php
    }

}
