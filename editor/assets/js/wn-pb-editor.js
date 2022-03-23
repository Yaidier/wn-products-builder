let product_data_2 = {};

jQuery(document).ready(function($){

   
    let is_editor_disabled = false;
    let is_float_editor_first_run = true;


    function get_the_trigger(this_widget, trigger) {

        let widget_wrapper_extra_classes = ''; 
        let widget_type = $(this_widget).attr('widget-type');
        let index_draggable = '';
        const cube_id = $(this_widget).attr('cube-id');
        let cube_properties_and_values = StylesConstructor.instance().get_styles_object(cube_id);

        if( widget_type == 'simple-img' || widget_type == 'simple-video' ) {
            widget_wrapper_extra_classes = 'wn_pb_e_widget_wrapper_img ';
        }

        if( cube_properties_and_values ) {

            let BreakException = {};

            try {
            
                Object.keys(cube_properties_and_values).forEach(function(display, index) {
        
                    Object.keys(this[display]).forEach(function(property, index) {
        
                        if( property == 'display' && this[property] == 'none' ) {
        
                            widget_wrapper_extra_classes += 'wn_pb_e_widget_hidden ';
                            throw BreakException;
        
                        }
        
                    }, this[display]);
        
                }, cube_properties_and_values);
                
                // console.log(el);
                
            } catch (e) {
                if (e !== BreakException) throw e;
            }
            
        }
        
        if( $(this_widget).closest('.wn_pb_section_index').length && !$(this_widget).closest('.wn_pb_index_resume').length && !$(this_widget).closest('.wn_pb_index_resume_ext').length ) {

            index_draggable = '<div class="wn_pb_e_index_wrapper"></div>';

        }

        if ( !$(this_widget).parent().hasClass('wn_pb_e_widget_wrapper') ) {

            $(this_widget).wrap('<div class="wn_pb_e_widget_wrapper ' + widget_wrapper_extra_classes + '"></div>');

            $(this_widget).parent().prepend('<div class="wn_pb_e_edit_btn"></div>');
            $(this_widget).parent().prepend(index_draggable);

            trigger = $(this_widget).parent().find('.wn_pb_e_edit_btn');

        }

        return trigger;

    }

    function register_all_editors() {

        if(is_editor_disabled) {
            return;
        }

        $('.wn_pb_wrapper').find('*').each( function() {

            let widget_type = $(this).attr('widget-type');
            let current_widget = $(this);
            let trigger = current_widget;

            if (typeof widget_type == 'undefined' || widget_type == false) {
                return;
            }

            if( $(this).attr('cube-id') == undefined || $(this).attr('cube-id') == '' ) {

                //Assigning a random id
                $(this).attr('cube-id', 'wn_cb_' + get_radom_int(10, 50000));

            }

            if ( widget_type == 'next-section-btn' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    generic_editor(current_widget);

                });

            }

            if ( widget_type == 'resume-table' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    resume_table_editor(current_widget);

                });

            }

            if ( widget_type == 'dropdown' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    dropdown_editor(current_widget);

                });

            }
            
            if ( widget_type == 'heading' || widget_type == 'span' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    generic_editor(current_widget);

                });

            }

            if ( widget_type == 'p' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    generic_editor(current_widget);

                });

            }

            if ( widget_type == 'button' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    generic_editor(current_widget);

                });

            }

            if ( widget_type == 'form' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    generic_editor(current_widget);

                });

            }

            if ( widget_type == 'simple-img' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    simple_img_editor(current_widget);

                });


            }

            if ( widget_type == 'simple-video' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    simple_video_editor(current_widget);

                });


            }

            if ( widget_type == 'extra-cont' ) {

                trigger = get_the_trigger(current_widget, trigger);

                $(trigger).on('click', function(event){

                    event.preventDefault();
                    extra_cont_editor(current_widget);

                });

            }

        });
    }

 

    function extra_cont_editor(element) {

        clean_float_editor();
        
        let widget_editor           = $('.wn_pb_extra_cont_editor').clone();
        let is_text_p = false;

        let cube_id = $(element).attr('cube-id');
        $(widget_editor).attr('widget-editor-for', cube_id);

        let editor_input_title      = $(widget_editor).find('#wn_pb_e_extra_cont_title');
        let title_value             = $(element).find('.wn_pb_link_text').text();
        $(editor_input_title).val(title_value);

        let editor_input_headline   = $(widget_editor).find('#wn_pb_e_extra_cont_headline');
        let headline_value          = $(element).find('.wn_pb_extra_content > h3').text();
        $(editor_input_headline).val(headline_value);


        let editor_input_textarea   = $(widget_editor).find('#wn_pb_e_extra_cont_textarea');

        let textarea_value;

        if($(element).find('.wn_pb_extra_content > p').length){
            is_text_p = true;
        }


        if(is_text_p){
            textarea_value = $(element).find('.wn_pb_extra_content > p').html();
        }
        else {
            textarea_value = $(element).find('.wn_pb_extra_content .wn_pb_extra_content_text').html();
        }

        $(editor_input_textarea).val(textarea_value);

        const img_url = $(element).find('.wn_pb_extra_info_bck_img').attr('img-url');

        $(widget_editor).find('.wn_pb_e_si_preview > img').attr('src', img_url);

        $('.wn_pb_f_editor_content').append(widget_editor);

        register_this_widget_all_controls(widget_editor);
        register_tab_selector();

        float_editor_animation_in();


        //Registering Delete Button Event
        $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {

            $(element).remove();
            float_editor_animation_out()

        });

        start_listening(editor_input_title, $(element).find('.wn_pb_link_text'));

        start_listening(editor_input_headline, $(element).find('.wn_pb_extra_content > h3'));
        

        //Updating the modal
        start_listening(editor_input_headline, $('#myModal').find('.wn_pb_extra_content > h3'));
        

         if(is_text_p){
            start_listening(editor_input_textarea, $(element).find('.wn_pb_extra_content > p'), 'html');
            start_listening(editor_input_textarea, $('#myModal').find('.wn_pb_extra_content > p'), 'html');
        }
        else {
            start_listening(editor_input_textarea, $(element).find('.wn_pb_extra_content .wn_pb_extra_content_text'), 'html');
            start_listening(editor_input_textarea, $('#myModal').find('.wn_pb_extra_content .wn_pb_extra_content_text'), 'html');
        }

        const media_lib_trigger = $(widget_editor).find('.wn_pb_e_si_select');

        image_picker(media_lib_trigger, $(element).find('.wn_pb_extra_info_bck_img'), true);

    }

    function simple_video_editor(element) {

        clean_float_editor();
        
        let widget_editor   = $('.wn_pb_e_widgets__editors').find('.wn_pb_simple_video_editor').clone();

        let cube_id = $(element).attr('cube-id');
        $(widget_editor).attr('widget-editor-for', cube_id);

        $('.wn_pb_f_editor_content').append(widget_editor);

        register_this_widget_all_controls(widget_editor);
        register_tab_selector();
        
        float_editor_animation_in();
        

        let img_element     = $(element).find('.wn_pb_video_img_preview'),
            video_element   = $(element).find('.wn_pb_video_src'),
            text_element    = $(element).find('.wn_pb_send_trigger_text'),
            img_src         = null;

        if ( !$(img_element).attr('src') ) {
            img_src = $(img_element).attr('default-preview-img');
        }
        else {
            img_src = $(img_element).attr('src');
        }

        
        const video_src     = $(video_element).attr('src'),
        video_iframe_src    = $(element).find('.wn_pb_video_element_iframe').attr('src'),
        text_src            = $(text_element).text();

        $(widget_editor).find('.wn_pb_e_sv_img_p').attr('src', img_src);
        $(widget_editor).find('.wn_pb_e_sv_video_p').attr('src', video_src);
        $(widget_editor).find('.wn_pb_e_video_url_input').val(video_iframe_src);
        $(widget_editor).find('.wn_pb_e_input_text').val(text_src);

        //Registering Delete Button Event
        $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {

            $(element).remove();
            float_editor_animation_out()

        });

        let media_lib_img_trigger = $(widget_editor).find('.wn_pb_e_si_select');
        let media_lib_video_trigger = $(widget_editor).find('.wn_pb_e_sv_select');

        start_listening($(widget_editor).find('.wn_pb_e_input_text'), text_element);

        image_picker(media_lib_img_trigger, img_element);
        video_picker(media_lib_video_trigger, video_element, widget_editor);

        register_source_selector(widget_editor, element);

        $(widget_editor).find('.wn_pb_e_video_url_input').on('input', function(){

            let value   = $(this).val();
            value       = 'https://www.youtube.com/embed/' + value;

            $(element).find('.wn_pb_video_element[value="1"]').attr('src', value);

        });

        $(element).find('.wn_pb_video_element').each(function(){

            if($(this).css('display') == 'block') {

                const value = $(this).attr('value');
                $(widget_editor).find('.wn_pb_e_select_index select').val(value);
                let select =  $(widget_editor).find('.wn_pb_e_select_index select');
                $(select).trigger('input');

            }

        });

    }

    function register_source_selector(widget_editor, element){

        $(widget_editor).find('.wn_pb_e_select select').each(function(){

            $(this).on('input', function(){

                let selected_option = $(this).find(':selected');

                let index_value = $(selected_option).attr('value');
                let select_content_divs = $(selected_option).closest('.wn_pb_e_select').find('.wn_pb_e_select_content');

                $(select_content_divs).removeClass('wn_pb_e_select_content__active');
                $(select_content_divs).filter('[value="' + index_value + '"]').addClass('wn_pb_e_select_content__active');

                $(element).find('.wn_pb_video_element').css('display', 'none');
                $(element).find('.wn_pb_video_element').filter('[value="' + index_value + '"]').css('display', 'block');

            });

        });

    }

    function simple_img_editor(element) {

        clean_float_editor();
        
        let widget_editor   = $('.wn_pb_simple_img_editor').clone();
        let cube_id = $(element).attr('cube-id');

        $(widget_editor).attr('widget-editor-for', cube_id);

        $('.wn_pb_f_editor_content').append(widget_editor);

        register_this_widget_all_controls(widget_editor);
        register_tab_selector();

        float_editor_animation_in();

        const element_src = $(element).attr('src');

        $(widget_editor).find('.wn_pb_e_si_preview > img').attr('src', element_src);

        //Registering Delete Button Event
        $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {

            $(element).remove();
            float_editor_animation_out()

        });

        const media_lib_trigger = $(widget_editor).find('.wn_pb_e_si_select');

        image_picker(media_lib_trigger, element);

    }

    function resume_table_editor(element) {

        clean_float_editor();
        
        let cube_id = $(element).attr('cube-id');
        let widget_type = $(element).attr('widget-type');
        let widget_editor = $('.wn_pb_editor_type__' + widget_type ).clone();

        $(widget_editor).attr('widget-editor-for', cube_id);

        $('.wn_pb_f_editor_content').append(widget_editor);

        register_this_widget_all_controls(widget_editor);
        register_tab_selector();

        register_responsivenes_checkboxes(widget_editor);

        float_editor_animation_in();

        //Registering Delete Button Event
        $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {

            $(element).remove();
            float_editor_animation_out();

        });

    }

    function dropdown_editor(element) {

        clean_float_editor();
        
        let cube_id = $(element).attr('cube-id');
        let widget_type = $(element).attr('widget-type');
        let widget_editor = $('.wn_pb_editor_type__' + widget_type ).clone();

        $(widget_editor).attr('widget-editor-for', cube_id);

        let options_chain = '';
        let title = '';
        let label = '';

        title = $(element).attr('title');
        $(widget_editor).find('.wn_pb_e_input_dropdown_title').val(title);

        label = $(element).find('.wn_pb_e_dropdown_label').text();
        $(widget_editor).find('.wn_pb_e_input_dropdown_label').val(label);

        $(element).find('.wn_pb_e_dropdown_content option').each(function(){

            options_chain += $(this).text() + '|';

        });

        options_chain = options_chain.substring(0, options_chain.length - 1);

        $(widget_editor).find('.wn_pb_e_input_dropdown').val(options_chain);

        $('.wn_pb_f_editor_content').append(widget_editor);

        register_this_widget_all_controls(widget_editor);
        register_tab_selector();

        register_responsivenes_checkboxes(widget_editor);
        float_editor_animation_in();

        $(widget_editor).find('.wn_pb_e_input_dropdown').on('change', function(){

            options_chain = $(this).val();

            let options_array = options_chain.split('|');
            let options_html = '';

            options_array.forEach(function(item, index, self){

                options_html += '<option>' + item + '</option>';

            });

            $(element).find('.wn_pb_e_dropdown_content').empty();
            $(element).find('.wn_pb_e_dropdown_content').html(options_html);

            WnPbFrontEnd.instance().init($, 0);

        });

        $(widget_editor).find('.wn_pb_e_input_dropdown_title').on('change', function(){

            let new_title = $(this).val();
            $(element).attr('title', new_title);
            
            WnPbFrontEnd.instance().init($, 0);

        });

        $(widget_editor).find('.wn_pb_e_input_dropdown_label').on('input', function(){

            let new_label = $(this).val();
            $(element).find('.wn_pb_e_dropdown_label').text(new_label);

        });

        //Registering Delete Button Event
        $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {
            $(element).remove();
            float_editor_animation_out();

        });
        
    }

    function generic_editor(element) {

        let cube_id = $(element).attr('cube-id');
        let widgets_type_for_single_text = ['span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'];

        clean_float_editor();

        //Checking if is index element
        let is_index_element;
        if ( $(element).closest('.wn_pb_section_index').length ) {
            is_index_element = true;
        }
        else {
            is_index_element = false;
        }
    
        let widget_type = $(element).attr('widget-type');

        if(jQuery.inArray(widget_type, widgets_type_for_single_text) !== -1) {
            widget_type = 'heading';
        }
        
        let widget_editor = $('.wn_pb_editor_type__' + widget_type ).clone();

        if ( is_index_element ) {
            $(widget_editor).find('.en_pb_e_remove_element').text('Delete Section');
        }

        
        $(widget_editor).attr('widget-editor-for', cube_id);

        $(widget_editor).find('[targets]').each(function(){

            let this_input_targets = ($(this).attr('targets')).split(' ');
            let this_input = $(this);

            $.each(this_input_targets, function(index, value){

                if (value == '') {
                    return;
                }

                let target_element;

                if ($(element).hasClass(value)){
                    target_element = $(element);
                }
                else {
                    target_element = $(element).find('.' + value);
                }

                let element_type = $(target_element).prop('nodeName');

                let collect_text_elements_type = ['SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LABEL', 'P', 'BUTTON'];

                if(jQuery.inArray(element_type, collect_text_elements_type) !== -1) {
                    set_text(this_input, target_element, is_index_element);
                }
                if( element_type == 'INPUT' ) {
                    set_val(this_input, target_element);
                }
            
                remove_element_event(widget_type, widget_editor, element, is_index_element);

            });

        });
        
        $('.wn_pb_f_editor_content').append(widget_editor);

        register_this_widget_all_controls(widget_editor);
        register_tab_selector();
        register_responsivenes_checkboxes(widget_editor);
        float_editor_animation_in();
    }

    function register_responsivenes_checkboxes(widget_editor) {

        const cube_id = $(widget_editor).attr('widget-editor-for');
        let cube_properties_and_values = StylesConstructor.instance().get_styles_object(cube_id);

        function check_for_any_active_checkbox(){
            let is_true = false;
            $(widget_editor).find('.wn_pb_e_responsivenes_checkboxes input').each(function(){
                if( $(this).is(":checked") ){
                    is_true = true;
                }
            });
            return is_true;
        }


        $(widget_editor).find('.wn_pb_e_responsivenes_checkboxes input').each(function(){

            const device_to_hide = $(this).attr('device-to-hide');

            if(cube_properties_and_values) {
                if( cube_properties_and_values[device_to_hide]['display'] == 'none' ) {
                    $(this).attr('checked', true);
                }
                else {
                    $(this).attr('checked', false);
                }
            }
      
            $(this).on('input', function(){

                let display_none = [];
                display_none['display'] = 'none';

                if($(this).is(":checked")){

                    $('[cube-id="' + cube_id + '"]').closest('.wn_pb_e_widget_wrapper').addClass('wn_pb_e_widget_hidden');

                    StylesConstructor.instance().add_style(cube_id, display_none, device_to_hide);
                    StylesConstructor.instance().render_styles(cube_id);

                }
                else {

                    if( !check_for_any_active_checkbox() ) {
                        $('[cube-id="' + cube_id + '"]').closest('.wn_pb_e_widget_wrapper').removeClass('wn_pb_e_widget_hidden');
                    }
 
                    StylesConstructor.instance().remove_style(cube_id, display_none, device_to_hide);
                    StylesConstructor.instance().render_styles(cube_id);
                    
                }
            })
        });
    }

    function register_tab_selector() {

        $('.wn_pb_f_editor_content').find('.wn_pb_e_tab').each(function(){

            $(this).off('click');

            $(this).on('click', function() {

                $(this).closest('.wn_pb_hle_tabs').find('.wn_pb_e_tab').removeClass('wn_pb_e_tab__active');

                let editor = $(this).closest('.wn_pb_e_editors');
                let current_content_height = $(editor).find('.wn_pb_e_content').height();

                $(editor).find('.wn_pb_e_content').css('height', current_content_height + 'px');

                $(editor).find('.wn_pb_e_content').children().each(function(){
                    $(this).removeClass('wn_pb_e_content__active');
                });

                let content_height;

                if( $(this).hasClass('wn_pb_e_tab__content') ) {

                    content_height = $(editor).find('.wn_pb_e_content__content').height();

                    $(this).addClass('wn_pb_e_tab__active');
                    $(editor).find('.wn_pb_e_content__content').addClass('wn_pb_e_content__active');

                }
                if( $(this).hasClass('wn_pb_e_tab__style') ) {

                    content_height = $(editor).find('.wn_pb_e_content__style').height();

                    $(this).addClass('wn_pb_e_tab__active');
                    $(editor).find('.wn_pb_e_content__style').addClass('wn_pb_e_content__active');

                }

                if( $(this).hasClass('wn_pb_e_tab__advance') ) {

                    content_height = $(editor).find('.wn_pb_e_content__advance').height();

                    $(this).addClass('wn_pb_e_tab__active');
                    $(editor).find('.wn_pb_e_content__advance').addClass('wn_pb_e_content__active');

                }

                $(editor).find('.wn_pb_e_content').css('height', content_height + 'px');
            });
        });
    }

    function remove_element_event(widget_type, widget_editor, element, is_index_element) {

        if(widget_type == 'button') {

            //Registering Delete Button Event
            $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {

                let buttons_wrapper = $(element).closest('.wn_pb_selectors_wrapper');

                $(element).remove();

                if( !$(buttons_wrapper).find('.wn_pb_selector_button').length ) {

                    $(buttons_wrapper).remove();

                }
                float_editor_animation_out()
            });

        }
        else {
            $(widget_editor).find('.en_pb_e_remove_element').on('click', function() {

                let coming_from = 'delete_element';

                if( is_index_element ) {

                    //Getting index number 
                    const index_number = $(element).closest('li').attr('index');
                    $('.wn_pb_wrapper > .wn_pb_container > section[index="' + index_number + '"]').remove();

                    coming_from = 'delete_section';
    
                }

                $(element).remove();
                float_editor_animation_out()

                restart(coming_from);
    
            });

        }
         
    }

    function set_text(this_input, target_element, is_index = false) {

        const text = $(target_element).text();
        $(this_input).val(text);
        start_listening(this_input, target_element);
        
        if( is_index ) {
        
            //Getting the section that correspond to the index
            const current_index = $(target_element).closest('li').attr('index');
            let index_section = $('.wn_pb_wrapper > .wn_pb_container > section[index="' + current_index + '"]');
            
            $(this_input).on('input', function(){

                const data = $(this).val();
                $(index_section).attr('section-title', data);

            });
        }

    }
    function set_val(this_input, target_element) {

        const text = $(target_element).val();
        $(this_input).val(text);

        start_listening_input(this_input, target_element);

    }


    function start_listening(editor_input, element, format = 'text') {

        $(editor_input).on('input', function(){

            let data = $(this).val();

            if( data == '' ) {
                data = 'Enter some text here...';
            }

            //Updating the content on the page
            if(format == 'html') {
                $(element).html(data);
            }
            else {
                $(element).text(data);
            }
            

        });

    }
    function start_listening_input(editor_input, element) {

        $(editor_input).on('input', function(){

            $data = $(this).val();

            //Updating the content on the page
            $(element).val($data);

        });

    }

    function clean_float_editor() {

        $('.wn_pb_f_editor_content').empty();

    }

    function register_float_editor() {

        $('.wn_pb_f_editor_close_icon').on('click', function(){

            // $('.wn_pb_f_editor').removeClass('wn_pb_f_editor__active');
            float_editor_animation_out();

        });

        $(window).on('click', function(e){

            const courtain = $('.wn_pb_e_click_courtain')[0];
            if (e.target == courtain) {
                float_editor_animation_out()
            }
        });
    }


    function editor_ajax_call( command, product_id ) {

        console.log('BEFORE AJAX');
        console.log( product_data_2 );
     
        //Calling Ajax
        $.ajax({

            beforeSend: function (qXHR, settings) {
                $('.wn_pb_editor').addClass('wn_pb_e__onajax');
            },
            complete: function () {
                $('.wn_pb_editor').removeClass('wn_pb_e__onajax');
            },

            type : 'post',
            url : ajax_url, // Pon aquí tu URL
            dataType : 'json',
            data : {

                action: 'wn_pb_editor', 
                command: command,
                product_id: product_id,
                product_data: product_data_2

            },
            error: function( response ){
                // console.log('error');
                // console.log( response );
            },
            success: function( response ) {

                // Update the table
                // console.log( 'new response' );
                // console.log( response );

                $('.wn_pb_wrapper').remove();
                $('.wn_pb_editor').prepend(response);

                alert_notification('Changes Saved');

                restart();
                // wn_pb_fe_main_function($);
                // register_all_editors();
            
            }

        });
    }

    function register_save_data_evt() {
        $('.wn_pb_save_data').on('click', function(){

            console.log('saving data');
            build_json_from_html(true);
            console.log('before calling ajax');

            // setTimeout(() => {
            //     console.log('calling ajax now');
            //     editor_ajax_call( 'save', product_id, product_data_2 );
            // }, 5000);
            editor_ajax_call( 'save', product_id );

        });
    }

    function alert_notification( message ) {

        $('.wn_pb_not_content p').text( message );

        setTimeout(() => {
            $('.wn_pb_not').addClass('wn_pb_not--active');
        }, 1000);

        setTimeout(() => {
            $('.wn_pb_not').removeClass('wn_pb_not--active'); 
        }, 3500);

    }

    function register_notification_event() {
        $('.wn_pb_close_icon').on('click', function() {
            $('.wn_pb_not').removeClass('wn_pb_not--active');
        });
    }

    function register_add_new_section_btn() {

        $('.wn_pb_e_add_new_section').on('click', function(){

            // let resume_section              = $('.wn_pb_wrapper .wn_pb_resume_section').detach();
            // let resume_section_extension    = $('.wn_pb_wrapper .wn_pb_resume_section--extension').detach();
            let new_section_template        = $('.wn_pb_e_new_section_template > section').clone();

            $('.wn_pb_container').append(new_section_template);
            let number_of_sections = $('.wn_pb_container > section').length;

            // $('.wn_pb_container').append(resume_section);
            // $('.wn_pb_container').append(resume_section_extension);

            restart('new_section');

        });

    }

    function update_index() {

        // let resume_index_section              = $('.wn_pb_index_resume').detach();
        // let resume_index_section_extension    = $('.wn_pb_index_resume_ext').detach();

        $('.wn_pb_section_index > ul').empty();

        let cont = 0;

        $('.wn_pb_container > section').each(function(){

            if( $(this).hasClass('wn_pb_resume_section') || $(this).hasClass('wn_pb_resume_section--extension') ) {
                return;
            }

            let active_li;
            if (cont == WnPbFrontEnd.instance().active_section) {
                active_li = 'wn_pb_index__active';
            }
            else {
                active_li = '';
            }

            let section_id = $(this).attr('section-id');
            let section_title = $(this).attr('section-title');

            let new_li = '<li section-id="' + section_id + '" class="' + active_li + '"><a href="#"><i class="wn_pb_index_icon"></i><span class="wn_pb_e_headline_content" cube-id="" widget-id="" widget-type="span" >' + section_title + '</span></a></li>';

            $('.wn_pb_section_index > ul').append(new_li);

            cont++;

        });

        // $('.wn_pb_section_index > ul').append(resume_index_section);
        // $('.wn_pb_section_index > ul').append(resume_index_section_extension);


    }

    function restart_the_frontend_script(coming_from) {

        let move_to_section;

        switch (coming_from) {
            case 'new_widget': move_to_section = WnPbFrontEnd.instance().active_section;
                break;
            case 'new_section': move_to_section = WnPbFrontEnd.instance().number_of_editable_sections;
                break;
            case 'delete_element': move_to_section = WnPbFrontEnd.instance().active_section;
                break;
            case 'delete_section': move_to_section = 0;
                break;
        
            default: move_to_section = 0;
                break;
        }

        WnPbFrontEnd.instance().init($, move_to_section );

    }

    function restart(coming_from) {

        reasign_secions_id();
        update_index();
        restart_the_frontend_script(coming_from);
        register_all_editors();
        build_json_from_html();
        register_add_new_wdiget_element();
        register_draggable_index();

    }

    function reasign_secions_id() {

        let cont = 0;

        $('.wn_pb_container > section').each(function() {

            $(this).attr('section-id', cont);

            cont++;

        });

    }

    function build_json_from_html( is_saving_data = false ) {

        //Info
        product_data_2['info'] = {};
        product_data_2['info']['product_name'] = $('#wn_pb_produc_name_input').val();

        product_data_2['info']['disable_snap_effect_on_mobile'] = $('#wn_pb_disable_snap_effect__mobile').is(":checked") ? 'true' : '';

        //Header
        product_data_2['header'] = {};

        let logo_data = collect_from_widget_type('simple-image', $('.wn_pb_logo img'));


        product_data_2['header']['logo_widget'] = logo_data;
        product_data_2['header']['reset_button_txt'] = $('.wn_pb_header_content span[widget-id="h-reset_button_txt"]').text();

        //Footer
        product_data_2['footer'] = {};
        product_data_2['footer']['est_cost_txt'] = $('.wn_pb_total_cost_txt').text();
        product_data_2['footer']['help_btn'] = {};
        product_data_2['footer']['help_btn']['help_btn_txt'] = $('.wn_pb_help_button').text();
        product_data_2['footer']['help_btn']['help_btn_url'] = 'https://test.com';

        //Index
        let index_cont = 0;
        product_data_2['index'] = {};
        $('.wn_pb_wrapper > .wn_pb_section_index > ul > li').each(function(){

            product_data_2['index'][index_cont] = $(this).find('span').text();
            index_cont++;

        });

        //Sections 
        product_data_2['sections'] = {};
        
        let section_cont = 0;
        let this_section_id = $(this).attr('section-id');
        let cont = 0;

        function extract_widgets_info(element, column) {

            let current_this = $(element);

            if ($(current_this).hasClass('wn_pb_e_widget_wrapper')) {
                current_this = $(current_this).children('[widget-type]');
            } 

            //Removing all children elements wrapped before saving if they exists
            if( is_saving_data ) {

                $(current_this).find('.wn_pb_e_widget_wrapper').each(function(){

                    let wrapper_editor_parent = $(this).parent();
                    let the_widget = $(this).find('[widget-type]');
                    $(wrapper_editor_parent).append(the_widget);

                });

            }

            attr        = $(current_this).attr('widget-id');
            widget_type = $(current_this).attr('widget-type');

            if ((typeof attr !== 'undefined' && attr !== false) && (typeof widget_type !== 'undefined' && widget_type !== false) ) {
                let data;
                product_data_2['sections'][this_section_id][column][cont] = {}; 

                data = collect_from_widget_type(widget_type, $(current_this));

                product_data_2['sections'][this_section_id][column][cont] = data;

                cont++; 
            }
        }

        $('.wn_pb_container > section').each(function(){


            this_section_id = $(this).attr('section-id');

            product_data_2['sections'][this_section_id] = {};

            //Title
            product_data_2['sections'][this_section_id]['title'] = product_data_2['index'][section_cont];

            product_data_2['sections'][this_section_id]['media_content'] = {};
            product_data_2['sections'][this_section_id]['options_content'] = {};

            cont = 0;

            $(this).find('.wn_pb_media_wrapper').children().each( function(){

                
                if($(this).hasClass('wn_pb_selectors_wrapper')){

                    $(this).children().each(function(){

                        extract_widgets_info(this, 'media_content');

                    });

                }
                else {
                    extract_widgets_info(this, 'media_content');
                }
                
            } );

            cont = 0;

            $(this).find('.wn_pb_options').children().each( function(){


                if($(this).hasClass('wn_pb_selectors_wrapper')){

                    $(this).children().each(function(){

                        extract_widgets_info(this, 'options_content');

                    });

                }
                else {
                    extract_widgets_info(this, 'options_content');
                }

            } );

            section_cont++;

        });

        console.log('inside build json');
        console.log(product_data_2);

    }

    function collect_from_widget_type(widget_type, element) {

        let data;

        if( widget_type == 'form' ) {

            
            data = {};
            const cf7_shortcode = $(element).find('.cf7_shortcode_content').text();

            data['type'] = widget_type;
            data['cube_id'] =  $(element).attr('cube-id');
            data['content'] = cf7_shortcode;

            data['styles'] = StylesConstructor.instance().get_html_styles(data['cube_id']);

            let styles_array = StylesConstructor.instance().get_styles_object(data['cube_id']);

            if( styles_array !== undefined ) {
    
                let output = {
                    desktop: {},
                    tablet: {},
                    mobile: {},
                };
    
                Object.assign(output.desktop, styles_array['desktop']);
                Object.assign(output.tablet, styles_array['tablet']);
                Object.assign(output.mobile, styles_array['mobile']);
    
                data['object_styles'] = output;
    
            }

        }
        else {
            data = collect_html_data(element, widget_type);
        }

        console.log('before returning Data');
        console.log(data);
        return data;
    }

    function split_the_cube_id( cube_id ) {
        let subtarget = null;
            
        console.log('cubeid');
        console.log(cube_id);

        if( cube_id.includes('.') ){
            console.log('it includes a DOT ');
            subtarget   = cube_id.substring( cube_id.indexOf('.') );
        }

        if( cube_id.includes('#') ){
            subtarget   = cube_id.substring( cube_id.indexOf('#') );
        }

        if( subtarget != null ) {
            cube_id     = cube_id.replace( subtarget, '' );
        }

        return { 'cube_id': cube_id, 'subtarget': subtarget };
    }

    function collect_html_data(element, type) {

        let data = {};

        const element_with_its_html = $(element).wrap('</p>').parent().html();
        data['content'] = element_with_its_html;
        $(element).unwrap();

        data['type'] = type;
        data['cube_id'] =  $(element).attr('cube-id');


    

        let all_styles_selectors_for_given_cube_id = StylesConstructor.instance().get_all_cube_styles_id(data['cube_id']);
        data['styles'] = [];
        data['object_styles'] = {};

        console.log('all_styles_selectors_for_given_cube_id');
        console.log(all_styles_selectors_for_given_cube_id);

        if( all_styles_selectors_for_given_cube_id != null ) {
            $.each( all_styles_selectors_for_given_cube_id, function( index, cube_id  ) {
                let cube_id_splitted_array  = split_the_cube_id( cube_id ),
                    just_cube_id            = cube_id_splitted_array.cube_id,
                    just_subtarget          = cube_id_splitted_array.subtarget,
                    styles_array            = undefined;

                console.log('Cube id');

                console.log(cube_id);

                console.log('Just Cube Id');
                console.log(just_cube_id);
                console.log('Subtarget');
                console.log(just_subtarget);
                
                data['styles'].push( StylesConstructor.instance().get_html_styles(just_cube_id, just_subtarget) );

                styles_array = StylesConstructor.instance().get_styles_object( cube_id );

                if( styles_array !== undefined ) {

                    let output = {
                        desktop: {},
                        tablet: {},
                        mobile: {},
                    };
        
                    Object.assign(output.desktop, styles_array['desktop']);
                    Object.assign(output.tablet, styles_array['tablet']);
                    Object.assign(output.mobile, styles_array['mobile']);

                    console.log( 'cube id' );
                    console.log( cube_id );
                    // console.log( 'output' );
                    // console.log( output );
                    // console.log( 'object_style' );
                    // console.log( data['object_styles'] );
        
                    data['object_styles'][cube_id] =  output ;
                }

            } );
        }

        console.log( 'the styles object' );
        console.log( data['object_styles'] );

        console.log('The DAta STyles');
        console.log(data['styles']);

        // data['styles'] = StylesConstructor.instance().get_html_styles(data['cube_id']);

        // let styles_array = StylesConstructor.instance().get_styles_object(data['cube_id']);

        // if( styles_array !== undefined ) {

        //     let output = {
        //         desktop: {},
        //         tablet: {},
        //         mobile: {},
        //     };

        //     Object.assign(output.desktop, styles_array['desktop']);
        //     Object.assign(output.tablet, styles_array['tablet']);
        //     Object.assign(output.mobile, styles_array['mobile']);

        //     data['object_styles'] = output;

        // }

        return data;

    }

    function video_picker(media_lib_trigger, element, widget_editor) {

        $(media_lib_trigger).on('click', function (e) {
          
            e.preventDefault();
    
          let selected_id = e.target.id;
    
          let image_frame;
    
          if (image_frame) {
            image_frame.open();
          }

          // Define image_frame as wp.media objec
          image_frame = wp.media({
            title: "Select Media",
    
            multiple: false,
    
            library: {
              type: "video",
            },
          });
    
          image_frame.on("select", function () {

            let datos_imagen = image_frame.state().get("selection").first().toJSON();
            $(widget_editor).find('.wn_pb_e_sv_video_p').attr('src', datos_imagen["url"]);
            jQuery(element).attr("src", datos_imagen["url"]);
        
          });
    
          image_frame.open();
        });
    }

    function image_picker(media_lib_trigger, element, bck_img = false, type_media = false) {

        type_media = type_media ? type_media : 'image';

        $(media_lib_trigger).on('click', function (e) {
          
            e.preventDefault();
    
          let image_frame;
    
          if (image_frame) {
            image_frame.open();
          }

          // Define image_frame as wp.media objec
          image_frame = wp.media({
            title: "Select Media",
    
            multiple: false,
    
            library: {
              type: type_media,
            },
          });
    
          image_frame.on("select", function () {

            let datos_imagen = image_frame.state().get("selection").first().toJSON();

            jQuery(".wn_pb_e_si_preview > img").attr("src", datos_imagen["url"]);

            if(bck_img){
                $('#myModal').find('.wn_pb_extra_info_bck_img').attr('style', 'background-image: url(' + datos_imagen["url"] + ')');
                $(element).attr('style', 'background-image: url(' + datos_imagen["url"] + ')');
            } 
            else {
                jQuery(element).attr("src", datos_imagen["url"]);
            }

          });
    
          image_frame.open();

        });
    }

    function float_editor_animation_in() {

        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_out_first_run');
        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_out');
        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_in_firs_run');
        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_in');

        if(is_float_editor_first_run == true) {
            $('.wn_pb_f_editor').addClass('wn_pb_e_animate_in_firs_run');
        }
        else {
            $('.wn_pb_f_editor').addClass('wn_pb_e_animate_in');
        }

        $('.wn_pb_f_editor').addClass('wn_pb_f_editor__active');
        
    }

    function float_editor_animation_out() {

        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_out_first_run');
        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_out');
        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_in_firs_run');
        $('.wn_pb_f_editor').removeClass('wn_pb_e_animate_in');

        if(is_float_editor_first_run == true) {
            $('.wn_pb_f_editor').addClass('wn_pb_e_animate_out_first_run');
            // console.log('enteres animation out');
        }
        else {
            $('.wn_pb_f_editor').addClass('wn_pb_e_animate_out');
        }

        setTimeout(() => {
            $('.wn_pb_f_editor').removeClass('wn_pb_f_editor__active');
        }, 300);

    }

    function register_add_new_wdiget_element() {

        $('.wn_pb_wrapper .wn_pb_options').each(function(){

            let add_widget_btn = '<div class="wn_pb_e_add_new_widget wn_pb_e_add_new_widget__options"><span>Add Widget</span></div>';
            $(this).append(add_widget_btn);

        });

        $('.wn_pb_wrapper .wn_pb_media_wrapper').each(function(){

            let add_widget_btn = '<div class="wn_pb_e_add_new_widget wn_pb_e_add_new_widget__media"><span>Add Widget</span></div>';
            $(this).append(add_widget_btn);

        });

        $('.wn_pb_e_add_new_widget').on('click', function(){

            clean_float_editor();

            let widget_pickers  = $('.wn_pb_e_widgets__lib').children().clone();

            $('.wn_pb_f_editor_content').append(widget_pickers);
            
            float_editor_animation_in();

            //Getting the Column 
            let column = $(this).closest('.wn_pb_options');

            if( !column.length ) {
                column = $(this).closest('.wn_pb_media_wrapper');
            }

            $(widget_pickers).find('.wn_pb_e_picker').each(function(){

                $(this).on('click', function(){

                    //Getting the widget content
                    let widget_content = $(this).find('.wn_pb_e_widget_content').children();

                    //Assigning a random id
                    $(widget_content).attr('cube-id', 'wn_cb_' + get_radom_int(10, 50000));

                    let widget_type = $(widget_content).attr('widget-type');

                    if( widget_type == 'button' ) {
                        append_button_widget( column, widget_content );
                    }
                    else {
                        $(column).append(widget_content);
                    }
                    
                    float_editor_animation_out()
                    restart('new_widget');

                });
            });
        });  
    }

    function get_radom_int(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);

        let random_int;

        do {
            random_int = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        while( jQuery('[wn_cb_' + random_int + ']').length ); 

        return random_int
    }

    function append_button_widget(column, widget_content) {

        let buttons_wrapper = $(column).find('.wn_pb_selectors_wrapper');

        if( buttons_wrapper.length ) {

            $(buttons_wrapper).append(widget_content);

        }
        else {

            buttons_wrapper = '<div class="wn_pb_selectors_wrapper wn_pb_two_col_layout"></div>';
            $(column).append(buttons_wrapper);
            buttons_wrapper = $(column).find('.wn_pb_selectors_wrapper');
            $(buttons_wrapper).append(widget_content);

        }

    }

    function register_draggable_function() {

        let click_down = false;

        $('.wn_pb_f_editor_draggable').on('mousedown', function(){

            click_down = true;
            is_float_editor_first_run = false;

        });

        $('.wn_pb_f_editor_draggable').on('mouseup', function(){

            click_down = false;

        });

        let x;
        let y;
        $(document).on('mousemove', function(event) {

            x = event.pageX + 'px';
            y = event.pageY + 'px';

            $('.x_pos').text(x);
            $('.y_pos').text(y);

            if (click_down) {
                
                $('.wn_pb_f_editor').css('transform', 'none');
                $('.wn_pb_f_editor').css('left', x);
                $('.wn_pb_f_editor').css('top', y);
            }
        });

    }

    function register_this_widget_all_controls(widget_editor) {

        let cube_id = $(widget_editor).attr('widget-editor-for');
        let controls = [];

        $(widget_editor).find('.wn_cb_controls').each(function(){

            if( $(this).hasClass('wn_cb_dimensions') ) {
                controls.push( new DimensionsControl( $(this), cube_id ) );
            }

            if( $(this).hasClass('wn_cb_controls_range_slider') ) {
                controls.push( new SilderRangeControl( $(this), cube_id ) );
            }

            if( $(this).hasClass('wn_cb_controls_cehckbox') ) {
                controls.push( new CheckboxControl( $(this), cube_id ) );
            }

        });

    }


    function reorganize_sections(move_this_section_index, right_after_this_section_index) {

        build_json_from_html(true);

        move_this_section_index = parseInt(move_this_section_index);
        right_after_this_section_index = parseInt(right_after_this_section_index);

        let new_sections = {};
        let arr = Object.values(product_data_2['sections']);
        let temp_object = arr[move_this_section_index];

        if( right_after_this_section_index < move_this_section_index ) {
            right_after_this_section_index = right_after_this_section_index + 1;
        }

        arr.splice(move_this_section_index, 1);
        arr.splice(right_after_this_section_index, 0, temp_object);

        $('.wn_pb_section_index ul li').each(function(i){

            if( $(this).hasClass('wn_pb_index_resume') || $(this).hasClass('wn_pb_index_resume_ext') ) {
                return;
            }

            let headline_content = $(this).find('.wn_pb_e_headline_content').text();
            arr[i]['title'] = headline_content;

        });

        Object.assign(new_sections, arr);
        product_data_2['sections'] = new_sections;

        editor_ajax_call( 'save', product_id );
        
    }

    function register_draggable_index() {

        $('.wn_pb_section_index .wn_pb_e_index_wrapper').each(function(){

            let click_down = false;
            let this_li = $(this).closest('li');
            let this_li_two;
            let relY;
            let relX;
            let parentOffset;
            let ul = $(this_li).parent();
            
            $(this).on('mousedown', function(e){

                $(this_li).detach().appendTo(ul);
                $(this_li).addClass('wn_pb_e_floating_index_li');

                parentOffset = $(this_li).parent().offset(); 
                relY = e.pageY - parentOffset.top;

                $(this_li).css('top', relY + 'px');

                click_down = true;
                already_inserted = false;
 
            });

            $(this).on('mouseup', function(e){

                click_down = false;
                $(this_li).removeClass('wn_pb_e_floating_index_li');
                $(this_li).css('top', 0 + 'px');
                $(this_li).css('left', 0 + 'px');

                let move_this_section_index = $(this_li).attr('index');
                let right_after_this_section_index = $(ul).find('li[move-below-this]').attr('index');
                let move_below_this = $(ul).find('li[move-below-this]');
                let no_length = false;
                let prev_li_index;

                if( !$(move_below_this).length ) {

                    no_length = true;
                    prev_li_index = parseInt($(this_li).attr('index')) - 1;

                    if( prev_li_index < 0 ) {
                        move_below_this = $(ul).find('li[index="' + 1 + '"]');
                    }
                    else {
                        move_below_this = $(ul).find('li[index="' + prev_li_index + '"]');  
                    }
                }

                if(prev_li_index < 0){
                    $(this_li).insertBefore(move_below_this);
                }
                else {
                    $(this_li).insertAfter(move_below_this);
                }

                $(move_below_this).css('padding-bottom', '0px');
                $(move_below_this).removeAttr('move-below-this');

                if(!no_length){
                    reorganize_sections(move_this_section_index, right_after_this_section_index);
                }

            });

            $(document).on('mousemove', function(e) {

                if(click_down) {

                    parentOffset = $(this_li).parent().offset(); 
                    relY = e.pageY - parentOffset.top;
                    relX = e.pageX - parentOffset.left + 10;

                    $(this_li).css('top', relY + 'px');
                    $(this_li).css('left', relX + 'px');

                    $('.wn_pb_section_index .wn_pb_e_index_wrapper').each(function(){

                        this_li_two = $(this).closest('li');

                        if( $(this_li_two).is(this_li) ) {
                            return;
                        }

                        let other_li_y_pos = $(this_li_two).position().top;
                        let li_index = $(this_li_two).attr('index');

                        let top_margin = parseInt($(this_li_two).css('margin-top'));
                        let evaluate_closeure = relY - other_li_y_pos - top_margin - 20;

                        if( Math.abs(evaluate_closeure) <= 15 ) {
                            $(this_li_two).css('padding-bottom', '20px');
                            $(this_li_two).attr('move-below-this', li_index);
                        }
                        else {
                            $(this_li_two).css('padding-bottom', '0px');
                            $(this_li_two).removeAttr('move-below-this');
                        }
                       
                    });
                }
            });
        });
    }

    function updating_to_version_1_0() {

        $('.wn_pb_wrapper .wn_pb_container').find('.wn_pb_extra_content').each(function(){

            if( $(this).find('.wn_pb_extra_content_text').length == 1 ) {
                return;
            }

            if( $(this).find('.wn_pb_extra_content_text').length > 1 ) {

                let cont = 0;

                let h3 = $(this).children('h3');
                let text = $(this).find('.wn_pb_extra_content_text')[0];

                $(this).empty();


                $(this).append(h3);
                $(this).append(text);

                return;
            }

            

            let current_content = $(this).children('p').html();

            $(this).children('p').remove();

            let new_div_element = '<div class="wn_pb_extra_content_text">' + current_content + '</div>';

            $(this).append(new_div_element);

        });

        $('.wn_pb_wrapper .wn_pb_container').find('.wn_pb_video_content .wn_pb_modal_content_to_send').each(function(){

            if( $(this).find('.wn_pb_video_element_iframe').length ) {
                return;
            }

            $(this).find('video').attr('value', '0');

            // let new_iframe_video_element = '<iframe value="1" class="wn_pb_video_element wn_pb_video_element_iframe" style="display:none;" width="100%" height="auto" src="https://www.youtube.com/embed/tgbNymZ7vqY" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0"></iframe>';
            let new_iframe_video_element = '<iframe class="wn_pb_video_element wn_pb_video_element_iframe" src="" value="1" style="display:none;" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="auto" frameborder="0"></iframe>';

            $(this).append(new_iframe_video_element);

        });

    }

    function updating_to_version_2_0() {

        let all_options_descriptions = $('.wn_pb_wrapper').find('.wm_pb_options_description');

        all_options_descriptions.each( function( i, description_widget ) {
            
            if( description_widget.textContent == ''  ) {
                console.log( description_widget );
                $(description_widget).parent().remove();
            }
        });
    }

    StylesConstructor.instance().update_object_style();

    register_all_editors();
    register_add_new_wdiget_element();

    register_float_editor();
    register_save_data_evt();
    register_notification_event();
    register_add_new_section_btn();
    build_json_from_html();
    register_draggable_function();
    register_draggable_index();

    updating_to_version_1_0();
    updating_to_version_2_0();
    StylesConstructor.instance().render_all_styles();


});

class StylesConstructor {

    static instance(){

        if( !StylesConstructor.instance_obj ){

            this.styles = [];
            StylesConstructor.instance_obj = this;

        }
        return StylesConstructor.instance_obj;
    }

    static get_all_styles() {
        return this.styles;
    }

    static update_object_style() {
        let self = this;

        console.log( 'UPDATING THE OBJECT STYLES' );

        let products_sections = product_data_1['sections'];

        console.log( products_sections );



        for (let section_index in products_sections) {

            if (Object.prototype.hasOwnProperty.call(products_sections, section_index)) {

                let section = products_sections[section_index];

                for (let column_index in section) {

                    if (Object.prototype.hasOwnProperty.call(section, column_index)) {

                        let column = section[column_index];

                        for (let column_i = 0; column_i < column.length; column_i++) { 

                            let widget = column[column_i];

                            if( widget['cube_id'] === undefined || widget['object_styles'] === undefined ) {
                                continue;
                            }


                            const widget_id = widget['cube_id'];
                            const object_styles = widget['object_styles'];


                            console.log( widget_id );
                            console.log( object_styles );

                            if( typeof object_styles['desktop'] === 'undefined' ) {
                                console.log('DESKTOP UNDEFINED');
                                jQuery.each( object_styles, function(subtarget, properties){
                                    let array_styles = [];
                                    array_styles['desktop'] = [];
                                    array_styles['tablet'] = [];
                                    array_styles['mobile'] = [];
                                    
                                    for (let property in properties['desktop']) {
                                        array_styles['desktop'][property] = properties['desktop'][property];
                                    }
                                    for (let property in properties['tablet']) {
                                        array_styles['tablet'][property] = properties['tablet'][property];
                                    }
                                    for (let property in properties['mobile']) {
                                        array_styles['mobile'][property] = properties['mobile'][property];
                                    }

                                    console.log(subtarget);
                                    console.log(array_styles);
        
                                    self.set_styles_object(subtarget, array_styles);
                                });
                            }
                            else {
                                console.log('DESKTOP DEFINED');

                                let array_styles = [];
                                array_styles['desktop'] = [];
                                array_styles['tablet'] = [];
                                array_styles['mobile'] = [];
                                
                                for (let property in object_styles['desktop']) {
                                    array_styles['desktop'][property] = object_styles['desktop'][property];
                                }
                                for (let property in object_styles['tablet']) {
                                    array_styles['tablet'][property] = object_styles['tablet'][property];
                                }
                                for (let property in object_styles['mobile']) {
                                    array_styles['mobile'][property] = object_styles['mobile'][property];
                                }

                                console.log(widget_id);
                                console.log(array_styles);
    
                                self.set_styles_object(widget_id, array_styles);
                            }

                        }
                    }
                }
            }
        }
    }

    static add_style(target, properties, media = false) {
        console.log( 'este es el target: ' );

        console.log( target );

        let self                    = this,
            properties_and_values   = [],
            devices                 = ['desktop', 'tablet', 'mobile'],
            subtarget               = null,
            cube_id                 = null;

        if( typeof(target) === 'object' ) {
            subtarget   = target.subtarget;
            cube_id     = target.cube_id + subtarget;
        }
        else {
            cube_id = target;
        }

        if( !this.styles[cube_id] ) {

            console.log( 'no existe asi que tenemos que crearlo' );

            properties_and_values['desktop']    = [];
            properties_and_values['tablet']     = [];
            properties_and_values['mobile']     = [];

            this.styles[cube_id] = properties_and_values;
        }

        console.log('si existe? Mhhhh show it to me');

        console.log( cube_id );
        console.log( this.styles[cube_id] );

        if( !media ) {
            jQuery.each(devices, function( index, device ) {
                for (let key in properties) {
                    self.styles[cube_id][device][key] = properties[key];

                }
            });
        }
        else {
            for (let key in properties) {
                self.styles[cube_id][media][key] = properties[key];

            }
        }
    }

    static remove_style(cube_id, properties, media = null) {

        if( !this.styles[cube_id] ) {

            return;
        
        }

        for (let key in properties) {

            delete this.styles[cube_id][media][key];
            
        }

    }

    static get_styles_object(cube_id) {

        let styles_object = this.styles[cube_id];

        if(styles_object == null) {
            return;
        }

        return styles_object;

    }

    static set_styles_object(cube_id, array_styles) {

        this.styles[cube_id] = array_styles;

    }

    static get_all_cube_styles_id( cube_id ) {
        console.log('get_all_cube_styles_id');
        console.log( cube_id );
        let all_given_styles_id = [];

        console.log( this.styles );
        
        for( let style in this.styles) {
            console.log( 'the style' );
            console.log( style );
            if( style.includes( cube_id ) ) {
                console.log('it does exists');
                all_given_styles_id.push( style );
            }
        }

        console.log(all_given_styles_id);

        return all_given_styles_id;
    }

    static get_html_styles(cube_id, subtarget = null) {

        console.log('the cube id: ');
        console.log(cube_id);

        if( !subtarget || subtarget === null ) {
            subtarget = '';
        }

        let styles_selector = cube_id + subtarget;

        console.log( styles_selector );

        let styles_object   = this.styles[styles_selector];

        console.log('Styles Object: ');
        console.log(styles_object);

        if(styles_object == null) {
            return;
        }

        console.log('Before the check: ');
        console.log(styles_object);



        let html = '';
        let rules = {};
        let current_media_selector;
        let css_selector;

        Object.keys(styles_object).forEach(function(key,index) {

            let media_properties = styles_object[key];

            current_media_selector = key;

            if(!rules[current_media_selector]){
                rules[current_media_selector] = '';
            }

            Object.keys(media_properties).forEach(function(key,index) {

                rules[current_media_selector] += key + ': ' + media_properties[key] + '; ';

            });

        });

        css_selector = '[cube-id="' + cube_id + '"]' + ' ' + subtarget;


        console.log('the cube element selector');
        console.log('[cube-id="' + cube_id + '"]');

        //Adding specificity to the css selector
        let cube_element = jQuery('[cube-id="' + cube_id + '"]');
        let cube_element_ansestors = '';
        let ansestor = jQuery(cube_element).parent();

        console.log('the cube element');
        console.log(cube_element);

        for(let i = 0; i < 3; i++){
            if(!jQuery(ansestor).hasClass('wn_pb_e_widget_wrapper')) {
                console.log('ansestor');
                console.log( jQuery( ansestor ) );
                let ancestor_classes_array = jQuery(ansestor).attr('class').split(' ');

                if (ancestor_classes_array[0] !== undefined) {
                    cube_element_ansestors = '.' +ancestor_classes_array[0] + ' ' + cube_element_ansestors;
                }
                
            }
            
            ansestor = jQuery(ansestor).parent();
        }

        css_selector = cube_element_ansestors + ' ' + css_selector;

        html = '<style cube-style-id="' + styles_selector + '">';
        html += '@media only screen and (min-width: 851px){ ' + css_selector + '{' + rules['desktop'] + '} }';
        html += '@media only screen and (max-width: 850px) and (min-width: 601px){ ' + css_selector + ' { ' + rules['tablet'] + ' } }';
        html += '@media only screen and (max-width: 600px) and (min-width: 0px){ ' + css_selector + ' { ' + rules['mobile'] + ' } }';
        html += '</style>';

        return html;

    }

    static render_all_styles(){
        console.log('!!!!!RENDER ALL STYLES!!!!!!!');
        //Getting all styles
        let self            = this,
            styles          = this.styles,
            subtarget       = null,
            style_selector  = null;

        console.log(styles);

        Object.keys(styles).forEach(function(cube_id, index) {

            console.log( '!!!!STYLE!!!!' );

            console.log( cube_id );

            style_selector = self.split_the_cube_id(cube_id);

            console.log(style_selector);

            StylesConstructor.render_styles(style_selector);

        }, styles);
    }

    static split_the_cube_id( cube_id ) {
        let subtarget = null;
            
        console.log('cubeid');
        console.log(cube_id);

        if( cube_id.includes('.') ){
            console.log('it includes a DOT ');
            subtarget   = cube_id.substring( cube_id.indexOf('.') );
        }

        if( cube_id.includes('#') ){
            subtarget   = cube_id.substring( cube_id.indexOf('#') );
        }

        if( subtarget != null ) {
            cube_id     = cube_id.replace( subtarget, '' );

            return { 'cube_id': cube_id, 'subtarget': subtarget };
        }

        return cube_id;
    }

    static render_styles(target) {
        console.log('render styles');
        console.log(target);

        let subtarget = null,
            cube_id = null,
            style_selector = target;

        if( typeof(target) === 'object' ) {
            subtarget   = target.subtarget;
            cube_id     = target.cube_id;
            style_selector = cube_id + subtarget;
        }
        else {
            style_selector = target;
            cube_id = target;
        }

        console.log(style_selector);


        let current_style = jQuery('head').find('[cube-style-id="' + style_selector + '"]');
        let html;
        
        //Removing current styles
        jQuery(current_style).remove();

        html = this.get_html_styles(cube_id, subtarget);

        jQuery('head').append(html);

    }

}

class Controls {

    cube_id;
    control;
    properties_and_values;
    current_resp_selector;
    current_unit_selector;
    property_targets;

    constructor(control, cube_id) {

        this.control = control;
        this.cube_id = cube_id;
        this.set_property_targets();

    }

    set_property_targets() {

        let self = this;
        let property_target;
        self.property_targets = [];

        jQuery(self.control).find('.wn_cb_controls_inputs > input:not([mirror])').each(function(){

            property_target = jQuery(this).attr('prop-target');
            self.property_targets.push(property_target);

        });

    }

    setting_inital_values() {

        let self = this;
        let cube_properties_and_values = StylesConstructor.instance().get_styles_object(self.cube_id);

        if( cube_properties_and_values != null ) {

            self.properties_and_values = self.filter_taget_property( cube_properties_and_values );

            console.log('Checking array returned');
            console.log(self.properties_and_values);

            if( typeof self.properties_and_values['desktop'] === 'undefined' && typeof self.properties_and_values['tablet'] === 'undefined' && typeof self.properties_and_values['mobile'] === 'undefined' ) {

                console.log('entramos aqui?');
                self.settings_values_to_zero();

            }
            else {

                console.log('INSERTING THE VALUES');
                self.update_the_inputs_values();
                
            }

        }
        else {

            self.settings_values_to_zero();

        }

    }

    update_the_inputs_values() {

        let self = this;
        let values = self.properties_and_values[self.current_resp_selector];

        jQuery(self.control).find('.wn_cb_controls_inputs > input').each(function(){

            if( values == undefined ) {
                jQuery(this).val('');
            }
            else {

                let value;
                let property;
                let mirror_to_element;
                let mirror = jQuery(this).attr('mirror');
                
                if (typeof mirror !== typeof undefined && mirror !== false) {

                    mirror_to_element = jQuery(self.control).find(mirror);
                    value = jQuery(mirror_to_element).val();
                    jQuery(this).val(value);
                
                }
                else {

                    property = jQuery(this).attr('prop-target');
                    value = parseInt(values[property]);
                    jQuery(this).val(value);

                }
            }
            
        });
        
    }

    filter_taget_property( cube_properties_and_values ) {

        let self = this;
        let temp_array = [];
    
        Object.keys(cube_properties_and_values).forEach(function(display, index) {

            // console.log(display);

            Object.keys(this[display]).forEach(function(property, index) {

                if( self.property_targets.includes(property) ) {

                    if( temp_array[display] == null ) {
                        temp_array[display] = [];
                    }

                    temp_array[display][property] = this[property];

                }

            }, this[display]);

        }, cube_properties_and_values);

        return temp_array;

    }

    settings_values_to_zero() {

        let self = this;
        let targets = [];

        self.properties_and_values = [];
        
        jQuery(self.control).find('.wn_cb_controls_inputs > [prop-target]').each(function(){

            let property_target = jQuery(this).attr('prop-target');
            targets[property_target] = '0';

        });

        self.properties_and_values['desktop'] = targets;
        self.properties_and_values['tablet'] = targets;
        self.properties_and_values['mobile'] = targets;

        jQuery(self.control).find('.wn_cb_controls_inputs > input').each(function(this_input){

            let property_name;
            let value;
            let attr_mirror = jQuery(this).attr('mirror');

            if( typeof attr_mirror !== typeof undefined && attr_mirror !== false ) {

                let mirror_target = jQuery(this).attr('mirror');
                property_name = jQuery(self.control).find(mirror_target).attr('prop-target');

            }
            else {

                property_name = jQuery(this).attr('prop-target');
                
            }

            value = parseInt(self.properties_and_values['desktop'][property_name]);
            jQuery(this).val(value);

        });
    }


    register_responsive_selector() {

        
        let self = this;

        jQuery(self.control).find('.wn_cb_controls_resp i').on('click', function(){

            jQuery(self.control).find('.wn_cb_controls_resp i').removeClass('wn_cb_controls_resp_icon__active');
            jQuery(this).addClass('wn_cb_controls_resp_icon__active');

            self.current_resp_selector = jQuery(this).attr('selector-value');

            self.update_the_inputs_values();

        });
    }

    register_unit_selector() {

        let self = this;

        jQuery(self.control).find('.wn_cb_controls_units_selector > span').on('click', function(){

            jQuery(self.control).find('.wn_cb_controls_units_selector > span').removeClass('wn_cb_controls_units__active');
            jQuery(this).addClass('wn_cb_controls_units__active');
            self.current_unit_selector = jQuery(this).text();

            jQuery(self.control).find('.wn_cb_controls_dimensions_inputs > input').first().trigger('input');

        });

    }

}

class CheckboxControl extends Controls {
    
    constructor(control, cube_id) {
        super(control, cube_id);

        console.log('Checkbox Control');
        console.log(control);
        console.log(cube_id);

        let data            = jQuery(control).data('params');

        this.target             = data.control_properties.target.selectors;
        this.status             = data.control_properties.target.status;
        this.default_value      = data.control_properties.target.default;
        this.property           = data.control_properties.target.property;

        console.log( data );
        console.log( this.target );
        console.log( this.status );
        console.log( this.default_value );
        console.log( this.property );
        
        // this.setting_inital_values();

        this.setting_inital_value();
        this.register_checkbox_control(control);

        // this.register_slider_range_control();
        // this.register_mirrors();
    }

    register_checkbox_control( control ) {
        let self = this;

        let checkbox_swtich = jQuery(control).find('.wn_pb_e_checkbox_switch > input');
        let selected_status;

        jQuery(checkbox_swtich).on( 'click', function(){
            if( jQuery(this).is(":checked") ) {
                console.log( 'is checked' );
                selected_status = self.status[1];
            }
            else {
                console.log( 'not checked' );
                selected_status = self.status[0];
            }

            let styles_to_add = [];
            styles_to_add[self.property] = selected_status;

            console.log('Before Adding the styles');

            let target = {
                'cube_id': self.cube_id,
                'subtarget': self.target ,
            };

            StylesConstructor.instance().add_style(target, styles_to_add );
            StylesConstructor.instance().render_styles(target);
    
        } );
    }

    setting_inital_value() {



        let self = this;
        let cube_properties_and_values = StylesConstructor.instance().get_styles_object(self.cube_id + self.target);

        if( cube_properties_and_values != null ) {
            if( cube_properties_and_values['desktop'][self.property] == this.status[0] ){
                jQuery(self.control).find('.wn_pb_e_checkbox_switch > input').attr('checked', false);
            }
            else {
                jQuery(self.control).find('.wn_pb_e_checkbox_switch > input').attr('checked', true);
            }
        }
    }

}

class SilderRangeControl extends Controls {

    constructor(control, cube_id) {

        console.log('Range Slider Control');

        super(control, cube_id);

        this.current_resp_selector = jQuery(this.control).find('.wn_cb_controls_resp > i').first().attr('selector-value');
        this.current_unit_selector = jQuery(this.control).find('.wn_cb_controls_units_selector > span').first().text();
        
        this.setting_inital_values();
        this.register_responsive_selector();
        this.register_unit_selector();

        this.register_slider_range_control();
        this.register_mirrors();

    }

    register_mirrors() {

        let self = this;

        jQuery(self.control).find('[mirror]').each(function(){

            let this_mirror = this;
            let mirror_target = jQuery(this).attr('mirror');
            let value;

            //Input to mirror
            jQuery(self.control).find(mirror_target).on('input', function(){

                value = jQuery(this).val();
                jQuery(this_mirror).val(value);

            });

            //Mirror to input 
            jQuery(this_mirror).on('input', function(){

                value = jQuery(this).val();
                jQuery(mirror_target).val(value);
                jQuery(mirror_target).trigger('input');

            });
        });
    }

    register_slider_range_control() {

        let self = this;
        let target_selector = jQuery(self.control).attr('control-targets');
        let targets = target_selector.split(' ');

        jQuery.each(targets, function( key, value ){

            let current_targets = jQuery('[cube-id="' + self.cube_id + '"]');

            jQuery(current_targets).each(function() {

                 //Filling the inputs with target's propoerties
                jQuery(self.control).find('[prop-target]').each(function(){
                    
                    //Watching the input
                    self.watching_cahnges(this);

                });
            });
        });
    }

    watching_cahnges(input) {

        let self = this;

        jQuery(input).on('input', function(){

            //Checking if it is anchor linked
            self.properties_and_values[self.current_resp_selector] = [];

            let properties = [];

            jQuery(self.control).find('[prop-target]').not('[mirror]').each(function(){

                let current_target_property_target = jQuery(this).attr('prop-target');
                properties[current_target_property_target] = jQuery(this).val() + self.current_unit_selector;
                
            });

            self.properties_and_values[self.current_resp_selector] = properties;
            StylesConstructor.instance().add_style(self.cube_id, self.properties_and_values[self.current_resp_selector], self.current_resp_selector);
            StylesConstructor.instance().render_styles(self.cube_id);
            
        });
    }

}

class DimensionsControl extends Controls  {

    constructor(control, cube_id) {

        console.log( 'Dimensions Control Constructor' );

        super(control, cube_id);

        this.current_resp_selector = jQuery(this.control).find('.wn_cb_controls_resp > i').first().attr('selector-value');
        this.current_unit_selector = jQuery(this.control).find('.wn_cb_controls_units_selector > span').first().text();
        
        this.setting_inital_values();
        this.register_dimensions_control();

    }

    watching_cahnges(input, current_target) {

        let self = this;

        jQuery(input).on('input', function(){

            //Checking if it is anchor linked
            self.properties_and_values[self.current_resp_selector] = [];
    
            let linked_selector = jQuery(self.control).find('.wn_cb_controls_anchor_select');
            let properties = [];

            jQuery(self.control).find('[prop-target]').each(function(){

                let current_target_property_target = jQuery(this).attr('prop-target');

                if( jQuery(linked_selector).hasClass('wn_cb_controls_anchor__linked') ) {
                    jQuery(this).val(jQuery(input).val());
                }

                properties[current_target_property_target] = jQuery(this).val() + self.current_unit_selector;
                
            });

            self.properties_and_values[self.current_resp_selector] = properties;

            StylesConstructor.instance().add_style(self.cube_id, self.properties_and_values[self.current_resp_selector], self.current_resp_selector);
            StylesConstructor.instance().render_styles(self.cube_id);
            
        });
    }

    register_anchor_selector() {

        //Getting the selector
        let anchor_selector = jQuery(this.control).find('.wn_cb_controls_anchor_select');
        jQuery(anchor_selector).on('click', function(){

            if( jQuery(this).hasClass('wn_cb_controls_anchor__linked') ) {
                jQuery(this).removeClass('wn_cb_controls_anchor__linked');
            }
            else {

                jQuery(this).addClass('wn_cb_controls_anchor__linked');
            }
        });
    }

    register_dimensions_control() {

        let self = this;

        this.register_anchor_selector();
        this.register_responsive_selector();
        this.register_unit_selector();

        let target_selector = jQuery(self.control).attr('control-targets');
        let targets = target_selector.split(' ');
        jQuery.each(targets, function( key, value ){

            let current_targets = jQuery('[cube-id="' + self.cube_id + '"]');

            jQuery(current_targets).each(function() {

                let current_target = jQuery(this);

                 //Filling the inputs with target's propoerties
                jQuery(self.control).find('[prop-target]').each(function(){
                    
                    //Watching the input
                    self.watching_cahnges(this, current_target);

                });
            });
        });
    }
}
