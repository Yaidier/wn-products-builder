

jQuery(document).ready(function($){
    wn_pb_fe_object.init($, 0);

    // WnPbFrontEnd.instance().init($, 0);

});

class WnPbFrontEnd {

    active_section = 0;
    number_of_sections = 0;
    number_of_editable_sections = 0;

    static instance() {

        if( !WnPbFrontEnd.instance_obj ){

            WnPbFrontEnd.instance_obj = this;

        }
        return WnPbFrontEnd.instance_obj;
    }

    static init($, move_to_section) {

        let self = this;
        this.$ = $;

        this.number_of_sections = 0;
        this.number_of_editable_sections = 0;
        this.sections_height;
        this.lastScrollTop = 0;
        this.window_width = $(window).width();
        this.previous_active_section = -1;
        this.resume_wrapper_height;
        this.is_safari = false;
        this.total_value = 0;
        this.previous_total_value = 0;
        this.animate_numbers = true;
        this.editor_active = false;

        //Initializing the script
        self.detect_browser_type();
        self.regenerate_resume_container();
        self.adding_numeric_attr_to_sections();
        self.get_sections_height();
        setTimeout(() => {
            self.adjust_index_element_height();
        }, 100);
        
        //Registering Events 
        self.register_buttons_events();
        self.register_edit_links_events();
        self.register_windows_resize_event();
        self.register_scroll_event();
        self.register_index_links_event();
        self.register_modal_window_event();
        self.register_modal_trigger_event();
        // register_redirect_to_resume_ext();
        self.register_reset_button_event();
        self.register_submit_button_event();
        self.register_dropdown_select_event();
        self.register_move_to_next_section_btn();
        self.register_update_file_input_filename();

        //Running functions after Events register
        self.recalculate();

        //Move to first section on page reload
        self.move_to_specific_section(move_to_section);

        //Modifying the Resume secton
        setTimeout(() => {
            self.modify_resume_section();
        }, 100);
        
        //Slplit the resume secton into two on mobile view (<= 600px)
        // split_resume_on_mobile();

        window.addEventListener('resize', function(){

            self.appHeight();
            
        });
        self.appHeight();
        

    }

    static regenerate_resume_container( is_doing_reset = false ) {

        let $ = this.$;
        let self = this;

        var resume_container = $('.wn_pb_resume_wrapper');

        var old_resume_container = $( resume_container ).clone();
        
        //Updating the old resume container with the proper old (preovious) total value (total price)
        $( old_resume_container ).find('#wn_pb_resume_total_row_price').text(self.previous_total_value);

        resume_container.empty();

        var sections_counter = 0;

        $('.wn_pb_container > section').each(function(){

            const section_title = $(this).attr('section-title');

            const active_buttons = $(this).find('.wn_pb_selector_button__active');
            var section_total_cost = 0;
            let selection_value; 

            if ( active_buttons.length ) {

                active_buttons.each(function(){

                    const text = $(this).find('.wn_pb_selector_price').text();
                    selection_value = $(this).find('.wn_pb_selector_title_text').text();
                    const value = parseInt( text );

                    if ( !isNaN(value) ) {

                        section_total_cost += value;

                    }
                });
            }

            let resume_section = '';

            if( selection_value ) {

                resume_section += '<section class="wn_selected_option" index="' + sections_counter + '"><div class="wn_pb_selected_option_row_one"><span class="wn_pb_selected_option_title">' + section_title + '</span><span class="wn_pb_selected_option_total_price">$' + section_total_cost + '</span></div><div class="wn_pb_selected_option_row_two"><span class="wn_pb_selected_option_selection">Selection: ' + selection_value + '</span><a href="#" index="' + (sections_counter) +'" class="wn_pb_selected_option_edit">Edit</a></div></section>';

            }

            if( $(this).find('.wn_pb_e_dropdown_content').length ) {

                let title = $(this).find('.wn_pb_e_dropdown_content_wrapper').attr('title');
                let value = $(this).find('option').filter(':selected').text();

                resume_section += '<section class="wn_selected_option" index="' + sections_counter + '"><div class="wn_pb_selected_option_row_one"><span class="wn_pb_selected_option_title">' + section_title + '</span><span class="wn_pb_selected_option_total_price">' + value + '</span></div><div class="wn_pb_selected_option_row_two"><span class="wn_pb_selected_option_selection">Selection: ' + title + '</span><a href="#" index="' + (sections_counter) +'" class="wn_pb_selected_option_edit">Edit</a></div></section>';

            }

            resume_container.append(resume_section);

            if( is_doing_reset && self.animate_numbers ) {

                var old_resume_section = $(old_resume_container).find('.wn_selected_option[index="' + sections_counter + '"]');
                self.animate_price_resume_container(sections_counter, section_total_cost, old_resume_section);

            }

            sections_counter++;

        });

        let resume_total_row = '<section class="wn_selected_option wn_pb_resume_total_row" index="last"><div class="wn_pb_selected_option_row_one"><span class="wn_pb_selected_option_title wn_pb_resume_total_row_title">Total</span><span id="wn_pb_resume_total_row_price" class="wn_pb_selected_option_total_price wn_pb_resume_total_row_price">$' + self.total_value + '</span></div><div class="wn_pb_selected_option_row_two"></div></section>';

        resume_container.append(resume_total_row);

        if( is_doing_reset && self.animate_numbers ) {

            var last_old_resume_section = $(old_resume_container).find('.wn_selected_option[index="' + 'last' + '"]');
            self.animate_price_resume_container('last', self.total_value, last_old_resume_section);

        }

        self.register_edit_links_events();

    }

    static animate_price_resume_container( resume_section_index, section_total_cost, old_resume_section ) {

        let $ = this.$;
        let self = this;

        var old_resume_section_price = $( old_resume_section ).find('.wn_pb_selected_option_total_price').text();

        old_resume_section_price = parseInt( old_resume_section_price );

        if( section_total_cost == old_resume_section_price ) {
            return;
        }

        const step = parseInt(( old_resume_section_price - section_total_cost ) / 10) ;

        if ( isNaN(old_resume_section_price) ) {
            return;
        }

        var current_section = $('.wn_selected_option[index="' + resume_section_index + '"]');

        var i = setInterval(() => {

            if( old_resume_section_price <= section_total_cost ) {

                $(current_section).find('.wn_pb_selected_option_total_price').text( section_total_cost );
                clearInterval( i );

            }
            else {

                old_resume_section_price -= step;
                $(current_section).find('.wn_pb_selected_option_total_price').text( old_resume_section_price );

            }
            
        }, 40);

    }

    static recalculate() {

        let $ = this.$;
        let self = this;

        self.previous_total_value = self.total_value;        
        self.total_value = 0;
        $('.wn_pb_selector_button__active').each(function(){

            const price_field = $(this).find('.wn_pb_selector_price').text();
            let value = parseInt(price_field);

            if( !isNaN( value ) ) {
                self.total_value += value;
            }
            
        });

        self.update_total_value(self.total_value);

    }

    static animate_numbers_shift(element, new_value) {

        let $ = this.$;
        let self = this;

        //Getting current element value;
        var current_value = parseInt($(element).text());
        // console.log('current value', current_value);
        // console.log('new value', new_value);

        let step = 10;

        if ( new_value == current_value ) {
            return;
        }

        if ( new_value > current_value ) {

            step = parseInt((new_value - current_value) / 10) ;

            var i = setInterval(() => {

                if( current_value >= new_value ) {

                    $(element).text( new_value );
                    clearInterval(i);
                    
                }
                else {
                    current_value += step;
                    $(element).text( current_value );
                }

            
                
            }, 40);

        }
        else {

            step = parseInt(( current_value - new_value ) / 10) ;

            var i = setInterval(() => {

                if( current_value <= new_value ) {

                    $(element).text( new_value );
                    clearInterval(i);
    
                }
                else {

                    current_value -= step;
                    $(element).text( current_value );

                }

            }, 40);

        }

    }

    static update_total_value(total_value) {

        let $ = this.$;
        let self = this;

        if( self.animate_numbers ) {
            self.animate_numbers_shift($('#wn_pb_total_cost'), self.total_value);
        }
        else {
            $('#wn_pb_total_cost').text(self.total_value);
        }

        //Not need to animate this is element as it is not in viewport when updating its value
        $('#wn_pb_resume_total_row_price').text( '$' + self.total_value);

    }

    static move_to_specific_section(section_index) {

        let $ = this.$;
        let self = this;

        if (section_index === false) {
            return;
        }

        // console.log('moving to section ' + section_index);

        //Removing scroll-snap-align property to get a smooth transition
        if ( !self.is_safari ) {
            $('.wn_pb_container > section').css('scroll-snap-align', 'unset');
        }
        
        // const current_section_index = $(current_section).attr('index');
        const offset = self.sections_height * section_index;

        //Updating these values for adjust_index_element_height() the  just in case the scroll event doesn't work fast enough as it is off
        self.previous_active_section = self.active_section;
        self.active_section = section_index;

        //Adjusting teh element height for the new active section
        self.adjust_index_element_height();

        $(".wn_pb_container").animate(  {

            scrollTop: offset

            },

            800, //speed

            function() {

                //Restoring scroll-snap-align property
                if( !self.is_safari ) {

                    $('.wn_pb_container > section').css('scroll-snap-align', 'start');

                }

                //Restoring the scroll event if it was uninded previously
                self.register_scroll_event();

            } 
            
        );
    }
    
    static get_sections_height() {

        let $ = this.$;
        let self = this;

        //Getting the sections height + the top and bottom padding (60px and 90px)
        const one_section = $('.wn_pb_container > section')[0];

        var padding_top = $(one_section).css('padding-top');
        padding_top = parseInt( padding_top );

        var padding_bottom = $(one_section).css('padding-bottom');
        padding_bottom = parseInt( padding_bottom );

        self.sections_height = $(one_section).height() + padding_bottom + padding_top;

        let full_height = ($('.wn_pb_container > section').length * self.sections_height) - self.sections_height;

    }


    static adding_numeric_attr_to_sections() {

        let $ = this.$;
        let self = this;

        var index = 0;
        $('.wn_pb_container > section').each(function(){

            $(this).attr('index', index++);
            self.number_of_sections++;

        });

        index = 0;
        $('.wn_pb_section_index > ul > li').each(function(){

            $(this).attr('index', index++);

        });

        self.number_of_editable_sections = self.number_of_sections;

    }

    static register_windows_resize_event () {

        let $ = this.$;
        let self = this;

        $(window).resize(function(){

            self.get_sections_height();

            self.window_width = $(window).width();

            self.adjust_index_element_height();
            self.modify_resume_section();
            // split_resume_on_mobile();
    
        });
    }

    static register_edit_links_events () {

        let $ = this.$;
        let self = this;

        $('.wn_pb_selected_option_edit').on('click', function(e){

            if (self.editor_active) {
                return;
            }
    
            e.preventDefault();    

            const edit_index = $(this).attr('index');
    
            self.move_to_specific_section( edit_index );
    
        });

    }

    static register_buttons_events () {

        let $ = this.$;
        let self = this;

        $('.wn_pb_selector_button').on('click', function(){

            if (self.editor_active) {
                return;
            }

            var current_section = $(this).closest('.wn_pb_section');
            // var next_section_index = parseInt(current_section.attr('index')) + 1;
        
            if ( !$(this).hasClass('wn_pb_selector_button__active') ) {
    
                $(current_section).find('.wn_pb_selector_button').removeClass('wn_pb_selector_button__active');
                $(this).addClass('wn_pb_selector_button__active');
    
            }
    
            self.regenerate_resume_container();            
            self.recalculate();       
    
        });  

    }

    static register_index_links_event() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_section_index > ul > li > a').on('click', function(e){

            if (self.editor_active) {
                return;
            }
    
            e.preventDefault();    
            const edit_index = $(this).parent().attr('index');

            $('.wn_pb_container').off('scroll');

            $('.wn_pb_section_index > ul > li').removeClass('wn_pb_index__active');
            $(this).parent().addClass('wn_pb_index__active');
    
            self.move_to_specific_section( edit_index );
    
        });

    }

    static register_scroll_event() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_container').on('scroll', function(e) {

            var scroll = $(this).scrollTop();
            if(scroll > self.lastScrollTop) {

                self.active_section = Math.ceil(scroll / self.sections_height);
                
            } else {

                if ( scroll < self.lastScrollTop ) {

                    self.active_section = Math.floor(scroll / self.sections_height);
                    
                }
            }
            self.lastScrollTop = scroll;

            // console.log('Number of Sections:', self.number_of_sections);

            //Prevent Active Section to be the last (Resume Extension) on Desktop view
            // if( self.window_width > 600 && ( self.active_section == ( self.number_of_sections - 1 ) ) ) {
            //     return;
            // }
        
            console.log('Active Section: ', + self.active_section);

            if (self.active_section != self.previous_active_section) {

                self.adjust_index_element_height();
                $('.wn_pb_section_index > ul > li').removeClass('wn_pb_index__active');
                $('.wn_pb_section_index > ul > li[index="' + self.active_section + '"]').addClass('wn_pb_index__active');

            }

            self.previous_active_section = self.active_section;

        });


    }

    static adjust_index_element_height() {

        let $ = this.$;
        let self = this;

        if ( self.window_width < 850 ) {
            $('.wn_pb_section_index').css('transform', 'translateY(-50%) translateY(-30px)');
            return;
        }
        else {
            $('.wn_pb_section_index').css('transform', 'none');
        }

        const current_section = $('.wn_pb_container > section')[self.active_section];

        const section_content_height = $(current_section).children('.wn_pb_section_content').height();

        var value = (section_content_height/2);

        value += 31; //Difference between header and footer height

        value -= 75; //Manual Offset

        $('.wn_pb_section_index').css('top',  'calc( 50% - ' + value + 'px )');

    }

    static register_modal_window_event() {

        let $ = this.$;
        let self = this;

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        // var span = $('.close');
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {

            self.exit_the_modal(modal);

        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {

            if (event.target == modal) {

                self.exit_the_modal(modal);

            }

        }
    }

    static exit_the_modal(modal) {

        let $ = this.$;
        let self = this;

        modal.style.display = "none";

        //stopping the video
        let video_element = $('.modal .wn_pb_modal_content').find('video');
        let video_youtube_element = $('.modal .wn_pb_modal_content').find('.wn_pb_video_element_iframe');
        if( $(video_element).length ) {
            $(video_element).trigger('pause');
        }

        $(video_youtube_element).remove();

    }

    static register_modal_trigger_event() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_send_trigger').on('click', function(){

            if (self.editor_active) {
                return;
            }

            // Get the modal
            var modal = document.getElementById("myModal");

            //Getting the modal content
            var modal_body = $('.modal-body');

            //Getting the content to send to the modal
            const content_to_send = $(this).parent().children('.wn_pb_modal_content_to_send').html();

            //Cleaning the modal content
            $(modal_body).empty();

            //Updating the modal content with the new content
            $(modal_body).append(content_to_send);

            let is_video_content;
            let video_element = $('.modal .wn_pb_modal_content').find('video');
            let video_youtube_element = $('.modal .wn_pb_modal_content').find('.wn_pb_video_element_iframe');
            if( $(video_element).length ) {
                is_video_content = true;
            }
            else {
                is_video_content = false;
            }

            //Opening the modal window
            modal.style.display = "block";

            if(is_video_content){
                $(video_element).trigger('play');

                let video_url = $(video_youtube_element).attr('src');
                video_url += '?autoplay=1';
                $(video_youtube_element).attr('src', video_url);

            }


        });

    }

    static modify_resume_section() {

        let $ = this.$;
        let self = this;

        if ( !self.resume_wrapper_height ) {
            self.resume_wrapper_height = $('.wn_pb_resume_wrapper').height(); 
        }
        
        var document_height = $(document).height() - 91 - 61 - 80; // header height, footer height, content top and bottom padding

        if ( self.resume_wrapper_height >= document_height  ) {
            if ( !$('.wn_pb_resume_wrapper').closest('section').hasClass('wn_pb_set_inner_scroll') ) {
                $('.wn_pb_resume_wrapper').closest('section').addClass('wn_pb_set_inner_scroll');                
            } 
        }
        else {
            if ( $('.wn_pb_resume_wrapper').closest('section').hasClass('wn_pb_set_inner_scroll') ) {
                $('.wn_pb_resume_wrapper').closest('section').removeClass('wn_pb_set_inner_scroll');                
            }
        }
    }

    static split_resume_on_mobile() {

        let $ = this.$;
        let self = this;

        // console.log('number of sections -> ', self.number_of_sections);

        if( self.window_width <= 600 ) {

            if( $('.wn_pb_resume_section').hasClass('wn_pb_set_inner_scroll') ) {
                // console.log('si tiene la clase');
                $('.wn_pb_resume_section .wn_pb_media_wrapper').css('height', '65%');
            }

            var contact_form_wrapper = $('.wn_pb_resume_section--extension .wn_pb_contanct_form_wrapper');

            if( !$(contact_form_wrapper).length ){

                //Getting the contact form
                var contact_form = $('.wn_pb_resume_section .wn_pb_contanct_form_wrapper').detach();

                // Moving the CF to the extended section
                $('.wn_pb_resume_section--extension .wn_pb_media_wrapper').append(contact_form);

                $('.wn_pb_schedule_redirect').css('display', 'inline');
                
                // console.log( 'just moved' );

                //Displaying the section
                $('.wn_pb_resume_section--extension').css('display', 'block');
                $('.wn_pb_index_resume_ext').css('display', 'block');

            }

        }
        else {

            $('.wn_pb_resume_section .wn_pb_media_wrapper').css('height', '100%');

            var contact_form_wrapper = $('.wn_pb_resume_section .wn_pb_contanct_form_wrapper');

            if( !$(contact_form_wrapper).length ){

                //Getting the contact form
                var contact_form = $('.wn_pb_resume_section--extension .wn_pb_contanct_form_wrapper').detach();

                //Moving the CF to the extended section
                $('.wn_pb_resume_section .wn_pb_options').append(contact_form);

                $('.wn_pb_schedule_redirect').css('display', 'none');
                
                // console.log( 'just moved back' );

                //Hidding the section
                $('.wn_pb_resume_section--extension').css('display', 'none');
                $('.wn_pb_index_resume_ext').css('display', 'none');

            }

        }

    }

    static register_redirect_to_resume_ext() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_schedule_redirect').on('click', function(){

            if (self.editor_active) {
                return;
            }

            var resume_ext_index_value = $('.wn_pb_resume_section--extension').attr('index');

            self.move_to_specific_section(resume_ext_index_value);

        })

    }

    static register_reset_button_event() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_reset').on('click', function(){

            if (self.editor_active) {
                return;
            }

            $('.wn_pb_selectors_wrapper').each(function(){

                $(this).children('button').removeClass('wn_pb_selector_button__active');
                $($(this).children('button')['0']).addClass('wn_pb_selector_button__active');
    
            });

            self.recalculate();
            self.regenerate_resume_container( true );
            
            
        });

    }

    static register_dropdown_select_event() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_e_dropdown_content').on('change', function(){

            self.regenerate_resume_container( true );
            
        });

    }

    static appHeight() {

        let $ = this.$;
        let self = this;

        let y_offset;
        if( $('#wpadminbar').length && $('#wpadminbar').css('display') != 'none') {
            y_offset = 32;
            $('.wn_pb_wrapper').css('height', 'calc(100vh - ' + y_offset + 'px)');
            $('.wn_pb_wrapper').css('margin-top', y_offset + 'px');
        }
        else {
            y_offset = 0;
        }

        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight - y_offset }px`)
    }

    
    
    static detect_browser_type() {

        let $ = this.$;
        let self = this;

        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        
            self.is_safari = true;

        }

    }

    static register_submit_button_event() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_contanct_form_wrapper input[type="submit"]').on('click.submit', function(e){

            e.preventDefault();

            var resume = '';

            $('.wn_pb_resume_wrapper > section').each(function(){

                if( $(this).hasClass('wn_pb_resume_total_row') ) {
                    resume += '=======================================================================';
                }

                resume += '&#013;&#010;';
                resume += 'Selected Option: ' + $(this).find('.wn_pb_selected_option_title').text();
                resume += '&#013;&#010;';
                resume += 'Price: ' + $(this).find('.wn_pb_selected_option_total_price').text();
                resume += '&#013;&#010;';
                if( $(this).hasClass('wn_pb_resume_total_row') ) {
                    resume += '=======================================================================';
                }
                resume += '&#013;&#010;';
            });


            var text_area = '<textarea name="pb-content">' + resume + '</textarea>';

            var html = $('.wn_pb_contanct_form_wrapper form > div').html();

            html += text_area;

            $('.wn_pb_contanct_form_wrapper form > div').html(html);

            $('.wn_pb_contanct_form_wrapper input[type="submit"]').off('click.submit');
            $('.wn_pb_contanct_form_wrapper input[type="submit"]').click();

            // $('.wn_pb_contanct_form_wrapper form').submit();

        })

    }

    static register_move_to_next_section_btn() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_wrapper').find('.wn_pb_e_next_section_btn').each(function(){

            $(this).on('click', function(){

                let current_section = parseInt($(this).closest('section').attr('index'));
                
                self.move_to_specific_section((current_section + 1));

            });

        });
    }

    static register_update_file_input_filename() {

        let $ = this.$;
        let self = this;

        $('.wn_pb_e_custom_file_input').each(function(){

            $(this).find('input[type="file"').each(function(){

                $(this).on('input', function(){

                    let filename_span_element;
                    let filename = $(this).val();
                    filename = filename.substring(filename.lastIndexOf('\\') + 1);
                    filename_span_element = $(this).closest('.wn_pb_e_custom_file_input').find('.wn_pb_e_filename');
                    $(filename_span_element).text(filename);

                })
            });
        });
    }
}

// var wn_pb_fe_object = {

//     active_section: 0,
//     number_of_sections: 0,
//     number_of_editable_sections: 0,

//     init: function ($, move_to_section) {

//         let self_init = this;

//         self.number_of_sections = 0;
//         self.number_of_editable_sections = 0;

//         var sections_height;
//         var lastScrollTop = 0;
//         var window_width = $(window).width();
//         var previous_active_section = -1;
//         var resume_wrapper_height;
//         var is_safari = false;
//         var total_value = 0;
//         var previous_total_value = 0;
//         var animate_numbers = true;
//         var editor_active = false;


//         this.regenerate_resume_container = function( is_doing_reset = false ) {

//             var resume_container = $('.wn_pb_resume_wrapper');

//             var old_resume_container = $( resume_container ).clone();
            
//             //Updating the old resume container with the proper old (preovious) total value (total price)
//             $( old_resume_container ).find('#wn_pb_resume_total_row_price').text(previous_total_value);

//             resume_container.empty();

//             var sections_counter = 0;

//             $('.wn_pb_container > section').each(function(){

//                 const section_title = $(this).attr('section-title');

//                 const active_buttons = $(this).find('.wn_pb_selector_button__active');
//                 var section_total_cost = 0;
//                 let selection_value; 

//                 if ( active_buttons.length ) {

//                     active_buttons.each(function(){

//                         const text = $(this).find('.wn_pb_selector_price').text();
//                         selection_value = $(this).find('.wn_pb_selector_title_text').text();
//                         const value = parseInt( text );

//                         if ( !isNaN(value) ) {

//                             section_total_cost += value;

//                         }
//                     });
//                 }

//                 let resume_section = '';

//                 if( selection_value ) {

//                     resume_section += '<section class="wn_selected_option" index="' + sections_counter + '"><div class="wn_pb_selected_option_row_one"><span class="wn_pb_selected_option_title">' + section_title + '</span><span class="wn_pb_selected_option_total_price">$' + section_total_cost + '</span></div><div class="wn_pb_selected_option_row_two"><span class="wn_pb_selected_option_selection">Selection: ' + selection_value + '</span><a href="#" index="' + (sections_counter) +'" class="wn_pb_selected_option_edit">Edit</a></div></section>';

//                 }

//                 if( $(this).find('.wn_pb_e_dropdown_content').length ) {

//                     let title = $(this).find('.wn_pb_e_dropdown_content_wrapper').attr('title');
//                     let value = $(this).find('option').filter(':selected').text();

//                     resume_section += '<section class="wn_selected_option" index="' + sections_counter + '"><div class="wn_pb_selected_option_row_one"><span class="wn_pb_selected_option_title">' + section_title + '</span><span class="wn_pb_selected_option_total_price">' + value + '</span></div><div class="wn_pb_selected_option_row_two"><span class="wn_pb_selected_option_selection">Selection: ' + title + '</span><a href="#" index="' + (sections_counter) +'" class="wn_pb_selected_option_edit">Edit</a></div></section>';

//                 }

//                 resume_container.append(resume_section);

//                 if( is_doing_reset && animate_numbers ) {

//                     var old_resume_section = $(old_resume_container).find('.wn_selected_option[index="' + sections_counter + '"]');
//                     animate_price_resume_container(sections_counter, section_total_cost, old_resume_section);

//                 }

//                 sections_counter++;

//             });

//             resume_total_row = '<section class="wn_selected_option wn_pb_resume_total_row" index="last"><div class="wn_pb_selected_option_row_one"><span class="wn_pb_selected_option_title wn_pb_resume_total_row_title">Total</span><span id="wn_pb_resume_total_row_price" class="wn_pb_selected_option_total_price wn_pb_resume_total_row_price">$' + total_value + '</span></div><div class="wn_pb_selected_option_row_two"></div></section>';

//             resume_container.append(resume_total_row);

//             if( is_doing_reset && animate_numbers ) {

//                 var last_old_resume_section = $(old_resume_container).find('.wn_selected_option[index="' + 'last' + '"]');
//                 animate_price_resume_container('last', total_value, last_old_resume_section);

//             }

//             register_edit_links_events();

//         }



//         function animate_price_resume_container( resume_section_index, section_total_cost, old_resume_section ) {

//             var old_resume_section_price = $( old_resume_section ).find('.wn_pb_selected_option_total_price').text();

//             old_resume_section_price = parseInt( old_resume_section_price );

//             if( section_total_cost == old_resume_section_price ) {
//                 return;
//             }

//             const step = parseInt(( old_resume_section_price - section_total_cost ) / 10) ;

//             if ( isNaN(old_resume_section_price) ) {
//                 return;
//             }

//             var current_section = $('.wn_selected_option[index="' + resume_section_index + '"]');

//             var i = setInterval(() => {

//                 if( old_resume_section_price <= section_total_cost ) {

//                     $(current_section).find('.wn_pb_selected_option_total_price').text( section_total_cost );
//                     clearInterval( i );

//                 }
//                 else {

//                     old_resume_section_price -= step;
//                     $(current_section).find('.wn_pb_selected_option_total_price').text( old_resume_section_price );

//                 }
                
//             }, 40);
    
//         }

//         function recalculate() {

//             previous_total_value = total_value;        
//             total_value = 0;
//             $('.wn_pb_selector_button__active').each(function(){

//                 const price_field = $(this).find('.wn_pb_selector_price').text();
//                 value = parseInt(price_field);

//                 if( !isNaN( value ) ) {
//                     total_value += value;
//                 }
                
//             });

//             update_total_value(total_value);

//         }

//         function animate_numbers_shift(element, new_value) {

//             //Getting current element value;
//             var current_value = parseInt($(element).text());
//             // console.log('current value', current_value);
//             // console.log('new value', new_value);

//             step = 10;

//             if ( new_value == current_value ) {
//                 return;
//             }

//             if ( new_value > current_value ) {

//                 step = parseInt((new_value - current_value) / 10) ;

//                 var i = setInterval(() => {

//                     if( current_value >= new_value ) {

//                         $(element).text( new_value );
//                         clearInterval(i);
                        
//                     }
//                     else {
//                         current_value += step;
//                         $(element).text( current_value );
//                     }

                
                    
//                 }, 40);

//             }
//             else {

//                 step = parseInt(( current_value - new_value ) / 10) ;

//                 var i = setInterval(() => {

//                     if( current_value <= new_value ) {

//                         $(element).text( new_value );
//                         clearInterval(i);
        
//                     }
//                     else {

//                         current_value -= step;
//                         $(element).text( current_value );

//                     }

//                 }, 40);

//             }

//         }

//         function update_total_value(total_value) {

//             if( animate_numbers ) {
//                 animate_numbers_shift($('#wn_pb_total_cost'), total_value);
//             }
//             else {
//                 $('#wn_pb_total_cost').text(total_value);
//             }

//             //Not need to animate this is element as it is not in viewport when updating its value
//             $('#wn_pb_resume_total_row_price').text( '$' + total_value);

//         }

//         function move_to_specific_section(section_index) {

//             if (section_index === false) {
//                 return;
//             }

//             // console.log('moving to section ' + section_index);

//             //Removing scroll-snap-align property to get a smooth transition
//             if ( !is_safari ) {
//                 $('.wn_pb_container > section').css('scroll-snap-align', 'unset');
//             }
            
//             // const current_section_index = $(current_section).attr('index');
//             const offset = sections_height * section_index;

//             //Updating these values for adjust_index_element_height() the  just in case the scroll event doesn't work fast enough as it is off
//             previous_active_section = wn_pb_fe_object.active_section;
//             wn_pb_fe_object.active_section = section_index;

//             //Adjusting teh element height for the new active section
//             adjust_index_element_height();

//             $(".wn_pb_container").animate(  {

//                 scrollTop: offset

//                 },

//                 800, //speed

//                 function() {

//                     //Restoring scroll-snap-align property
//                     if( !is_safari ) {

//                         $('.wn_pb_container > section').css('scroll-snap-align', 'start');

//                     }

//                     //Restoring the scroll event if it was uninded previously
//                     register_scroll_event();

//                 } 
                
//             );
//         }
        
//         function get_sections_height() {

//             //Getting the sections height + the top and bottom padding (60px and 90px)
//             const one_section = $('.wn_pb_container > section')[0];

//             var padding_top = $(one_section).css('padding-top');
//             padding_top = parseInt( padding_top );

//             var padding_bottom = $(one_section).css('padding-bottom');
//             padding_bottom = parseInt( padding_bottom );

//             sections_height = $(one_section).height() + padding_bottom + padding_top;

//             full_height = ($('.wn_pb_container > section').length * sections_height) - sections_height;

//         }


//         function adding_numeric_attr_to_sections() {

//             var index = 0;
//             $('.wn_pb_container > section').each(function(){

//                 $(this).attr('index', index++);
//                 wn_pb_fe_object.number_of_sections++;

//             });

//             index = 0;
//             $('.wn_pb_section_index > ul > li').each(function(){

//                 $(this).attr('index', index++);

//             });

//             wn_pb_fe_object.number_of_editable_sections = wn_pb_fe_object.number_of_sections;

//         }

//         function register_windows_resize_event () {

//             $(window).resize(function(){

//                 get_sections_height();
//                 window_width = $(window).width();
//                 adjust_index_element_height();
//                 modify_resume_section();
//                 // split_resume_on_mobile();
        
//             });
//         }

//         function register_edit_links_events () {

//             $('.wn_pb_selected_option_edit').on('click', function(e){

//                 if (editor_active) {
//                     return;
//                 }
        
//                 e.preventDefault();    

//                 const edit_index = $(this).attr('index');
        
//                 move_to_specific_section( edit_index );
        
//             });

//         }

//         function register_buttons_events () {

//             $('.wn_pb_selector_button').on('click', function(){

//                 if (editor_active) {
//                     return;
//                 }

//                 var current_section = $(this).closest('.wn_pb_section');
//                 // var next_section_index = parseInt(current_section.attr('index')) + 1;
            
//                 if ( !$(this).hasClass('wn_pb_selector_button__active') ) {
        
//                     $(current_section).find('.wn_pb_selector_button').removeClass('wn_pb_selector_button__active');
//                     $(this).addClass('wn_pb_selector_button__active');
        
//                 }
        
//                 self_init.regenerate_resume_container();            
//                 recalculate();       
        
//             });  

//         }

//         function register_index_links_event() {

//             $('.wn_pb_section_index > ul > li > a').on('click', function(e){

//                 if (editor_active) {
//                     return;
//                 }
        
//                 e.preventDefault();    
//                 const edit_index = $(this).parent().attr('index');

//                 $('.wn_pb_container').off('scroll');

//                 $('.wn_pb_section_index > ul > li').removeClass('wn_pb_index__active');
//                 $(this).parent().addClass('wn_pb_index__active');
        
//                 move_to_specific_section( edit_index );
        
//             });

//         }

//         function register_scroll_event() {

//             $('.wn_pb_container').on('scroll', function(e) {

//                 var scroll = $(this).scrollTop();
//                 if(scroll > lastScrollTop) {

//                     wn_pb_fe_object.active_section = Math.ceil(scroll / sections_height);
                    
//                 } else {

//                     if ( scroll < lastScrollTop ) {

//                         wn_pb_fe_object.active_section = Math.floor(scroll / sections_height);
                        
//                     }
//                 }
//                 lastScrollTop = scroll;

//                 // console.log('Number of Sections:', wn_pb_fe_object.number_of_sections);

//                 //Prevent Active Section to be the last (Resume Extension) on Desktop view
//                 // if( window_width > 600 && ( wn_pb_fe_object.active_section == ( wn_pb_fe_object.number_of_sections - 1 ) ) ) {
//                 //     return;
//                 // }
            
//                 console.log('Active Section: ', + wn_pb_fe_object.active_section);

//                 if (wn_pb_fe_object.active_section != previous_active_section) {

//                     adjust_index_element_height();
//                     $('.wn_pb_section_index > ul > li').removeClass('wn_pb_index__active');
//                     $('.wn_pb_section_index > ul > li[index="' + wn_pb_fe_object.active_section + '"]').addClass('wn_pb_index__active');

//                 }

//                 previous_active_section = wn_pb_fe_object.active_section;

//             });


//         }

//         function adjust_index_element_height() {

//             if ( window_width < 850 ) {
//                 $('.wn_pb_section_index').css('transform', 'translateY(-50%) translateY(-30px)');
//                 return;
//             }
//             else {
//                 $('.wn_pb_section_index').css('transform', 'none');
//             }

//             const current_section = $('.wn_pb_container > section')[wn_pb_fe_object.active_section];

//             const section_content_height = $(current_section).children('.wn_pb_section_content').height();

//             var value = (section_content_height/2);

//             value += 31; //Difference between header and footer height

//             value -= 75; //Manual Offset

//             $('.wn_pb_section_index').css('top',  'calc( 50% - ' + value + 'px )');

//         }

//         function register_modal_window_event() {

//             // Get the modal
//             var modal = document.getElementById("myModal");

//             // Get the <span> element that closes the modal
//             // var span = $('.close');
//             var span = document.getElementsByClassName("close")[0];

//             // When the user clicks on <span> (x), close the modal
//             span.onclick = function() {

//                 exit_the_modal(modal);

//             }

//             // When the user clicks anywhere outside of the modal, close it
//             window.onclick = function(event) {

//                 if (event.target == modal) {

//                     exit_the_modal(modal);

//                 }

//             }
//         }

//         function exit_the_modal(modal) {
//             modal.style.display = "none";

//             //stopping the video
//             let video_element = $('.modal .wn_pb_modal_content').find('video');
//             let video_youtube_element = $('.modal .wn_pb_modal_content').find('.wn_pb_video_element_iframe');
//             if( $(video_element).length ) {
//                 $(video_element).trigger('pause');
//             }

//             $(video_youtube_element).remove();

//         }

//         function register_modal_trigger_event() {

//             $('.wn_pb_send_trigger').on('click', function(){

//                 if (editor_active) {
//                     return;
//                 }

//                 // Get the modal
//                 var modal = document.getElementById("myModal");

//                 //Getting the modal content
//                 var modal_body = $('.modal-body');

//                 //Getting the content to send to the modal
//                 const content_to_send = $(this).parent().children('.wn_pb_modal_content_to_send').html();

//                 //Cleaning the modal content
//                 $(modal_body).empty();

//                 //Updating the modal content with the new content
//                 $(modal_body).append(content_to_send);

//                 let is_video_content;
//                 let video_element = $('.modal .wn_pb_modal_content').find('video');
//                 let video_youtube_element = $('.modal .wn_pb_modal_content').find('.wn_pb_video_element_iframe');
//                 if( $(video_element).length ) {
//                     is_video_content = true;
//                 }
//                 else {
//                     is_video_content = false;
//                 }

//                 //Opening the modal window
//                 modal.style.display = "block";

//                 if(is_video_content){
//                     $(video_element).trigger('play');

//                     let video_url = $(video_youtube_element).attr('src');
//                     video_url += '?autoplay=1';
//                     $(video_youtube_element).attr('src', video_url);

//                 }


//             });

//         }

//         function modify_resume_section() {

//             if ( !resume_wrapper_height ) {
//                 resume_wrapper_height = $('.wn_pb_resume_wrapper').height(); 
//             }
            
//             var document_height = $(document).height() - 91 - 61 - 80; // header height, footer height, content top and bottom padding

//             if ( resume_wrapper_height >= document_height  ) {
//                 if ( !$('.wn_pb_resume_wrapper').closest('section').hasClass('wn_pb_set_inner_scroll') ) {
//                     $('.wn_pb_resume_wrapper').closest('section').addClass('wn_pb_set_inner_scroll');                
//                 } 
//             }
//             else {
//                 if ( $('.wn_pb_resume_wrapper').closest('section').hasClass('wn_pb_set_inner_scroll') ) {
//                     $('.wn_pb_resume_wrapper').closest('section').removeClass('wn_pb_set_inner_scroll');                
//                 }
//             }
//         }

//         function split_resume_on_mobile() {

//             // console.log('number of sections -> ', wn_pb_fe_object.number_of_sections);

//             if( window_width <= 600 ) {

//                 if( $('.wn_pb_resume_section').hasClass('wn_pb_set_inner_scroll') ) {
//                     // console.log('si tiene la clase');
//                     $('.wn_pb_resume_section .wn_pb_media_wrapper').css('height', '65%');
//                 }

//                 var contact_form_wrapper = $('.wn_pb_resume_section--extension .wn_pb_contanct_form_wrapper');

//                 if( !$(contact_form_wrapper).length ){

//                     //Getting the contact form
//                     var contact_form = $('.wn_pb_resume_section .wn_pb_contanct_form_wrapper').detach();

//                     // Moving the CF to the extended section
//                     $('.wn_pb_resume_section--extension .wn_pb_media_wrapper').append(contact_form);

//                     $('.wn_pb_schedule_redirect').css('display', 'inline');
                    
//                     // console.log( 'just moved' );

//                     //Displaying the section
//                     $('.wn_pb_resume_section--extension').css('display', 'block');
//                     $('.wn_pb_index_resume_ext').css('display', 'block');

//                 }

//             }
//             else {

//                 $('.wn_pb_resume_section .wn_pb_media_wrapper').css('height', '100%');

//                 var contact_form_wrapper = $('.wn_pb_resume_section .wn_pb_contanct_form_wrapper');

//                 if( !$(contact_form_wrapper).length ){

//                     //Getting the contact form
//                     var contact_form = $('.wn_pb_resume_section--extension .wn_pb_contanct_form_wrapper').detach();

//                     //Moving the CF to the extended section
//                     $('.wn_pb_resume_section .wn_pb_options').append(contact_form);

//                     $('.wn_pb_schedule_redirect').css('display', 'none');
                    
//                     // console.log( 'just moved back' );

//                     //Hidding the section
//                     $('.wn_pb_resume_section--extension').css('display', 'none');
//                     $('.wn_pb_index_resume_ext').css('display', 'none');

//                 }

//             }

//         }

//         function register_redirect_to_resume_ext() {

//             $('.wn_pb_schedule_redirect').on('click', function(){

//                 if (editor_active) {
//                     return;
//                 }

//                 var resume_ext_index_value = $('.wn_pb_resume_section--extension').attr('index');

//                 move_to_specific_section(resume_ext_index_value);

//             })

//         }

//         function register_reset_button_event() {

//             $('.wn_pb_reset').on('click', function(){

//                 if (editor_active) {
//                     return;
//                 }

//                 $('.wn_pb_selectors_wrapper').each(function(){

//                     $(this).children('button').removeClass('wn_pb_selector_button__active');
//                     $($(this).children('button')['0']).addClass('wn_pb_selector_button__active');
        
//                 });

//                 recalculate();
//                 self_init.regenerate_resume_container( true );
                
                
//             });

//         }

//         function register_dropdown_select_event() {

//             $('.wn_pb_e_dropdown_content').on('change', function(){

//                 self_init.regenerate_resume_container( true );
                
//             });

//         }

//         const appHeight = () => {

//             let y_offset;
//             if( $('#wpadminbar').length && $('#wpadminbar').css('display') != 'none') {
//                 y_offset = 32;
//                 $('.wn_pb_wrapper').css('height', 'calc(100vh - ' + y_offset + 'px)');
//                 $('.wn_pb_wrapper').css('margin-top', y_offset + 'px');
//             }
//             else {
//                 y_offset = 0;
//             }

//             const doc = document.documentElement
//             doc.style.setProperty('--app-height', `${window.innerHeight - y_offset }px`)
//         }
//         window.addEventListener('resize', appHeight)
//         appHeight();
        
//         function detect_browser_type() {

//             if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            
//                 is_safari = true;

//             }

//         }

//         function register_submit_button_event() {

//             $('.wn_pb_contanct_form_wrapper input[type="submit"]').on('click.submit', function(e){

//                 e.preventDefault();

//                 var resume = '';

//                 $('.wn_pb_resume_wrapper > section').each(function(){

//                     if( $(this).hasClass('wn_pb_resume_total_row') ) {
//                         resume += '=======================================================================';
//                     }

//                     resume += '&#013;&#010;';
//                     resume += 'Selected Option: ' + $(this).find('.wn_pb_selected_option_title').text();
//                     resume += '&#013;&#010;';
//                     resume += 'Price: ' + $(this).find('.wn_pb_selected_option_total_price').text();
//                     resume += '&#013;&#010;';
//                     if( $(this).hasClass('wn_pb_resume_total_row') ) {
//                         resume += '=======================================================================';
//                     }
//                     resume += '&#013;&#010;';
//                 });


//                 var text_area = '<textarea name="pb-content">' + resume + '</textarea>';

//                 var html = $('.wn_pb_contanct_form_wrapper form > div').html();

//                 html += text_area;

//                 $('.wn_pb_contanct_form_wrapper form > div').html(html);

//                 $('.wn_pb_contanct_form_wrapper input[type="submit"]').off('click.submit');
//                 $('.wn_pb_contanct_form_wrapper input[type="submit"]').click();

//                 // $('.wn_pb_contanct_form_wrapper form').submit();

//             })

//         }

//         function register_move_to_next_section_btn() {

//             $('.wn_pb_wrapper').find('.wn_pb_e_next_section_btn').each(function(){

//                 $(this).on('click', function(){

//                     let current_section = parseInt($(this).closest('section').attr('index'));
                    
//                     move_to_specific_section((current_section + 1));

//                 });

//             });
//         }

//         function register_update_file_input_filename() {

//             $('.wn_pb_e_custom_file_input').each(function(){

//                 $(this).find('input[type="file"').each(function(){

//                     $(this).on('input', function(){

//                         let filename_span_element;
//                         let filename = $(this).val();
//                         filename = filename.substring(filename.lastIndexOf('\\') + 1);
//                         filename_span_element = $(this).closest('.wn_pb_e_custom_file_input').find('.wn_pb_e_filename');
//                         $(filename_span_element).text(filename);

//                     })

//                 });

//             });

//         }

//         //Initializing the script
//         detect_browser_type();
//         self_init.regenerate_resume_container();
//         adding_numeric_attr_to_sections();
//         get_sections_height();
//         setTimeout(() => {
//             adjust_index_element_height();
//         }, 100);
        
//         //Registering Events 
//         register_buttons_events();
//         register_edit_links_events();
//         register_windows_resize_event();
//         register_scroll_event();
//         register_index_links_event();
//         register_modal_window_event();
//         register_modal_trigger_event();
//         // register_redirect_to_resume_ext();
//         register_reset_button_event();
//         register_submit_button_event();
//         register_dropdown_select_event();
//         register_move_to_next_section_btn();
//         register_update_file_input_filename();

//         //Running functions after Events register
//         recalculate();

//         //Move to first section on page reload
//         move_to_specific_section(move_to_section);

//         //Modifying the Resume secton
//         setTimeout(() => {
//             modify_resume_section();
//         }, 100);
        
//         //Slplit the resume secton into two on mobile view (<= 600px)
//         // split_resume_on_mobile();
//     }

// };

