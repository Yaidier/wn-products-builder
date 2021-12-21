jQuery(document).ready( function($) {

    function register_btns_click_evt() {

        $( 'button' ).off('click');

        $( 'button' ).on( 'click', function(){  

            const product_id    = $(this).parents('tr').children('td:first-child').text();
            const action        = $(this).attr('action');
    
            console.log( 'new click' );
    
            switch (action) {
    
                case 'add_new': manage_products_ajax_call('add_new_product');  
                    break;
    
                case 'remove_product': manage_products_ajax_call( 'remove_product', product_id );  
                    break;

                case 'edit_product': open_products_editor( product_id );  
                    break;
            
                default:
                    break;
            }
    
        });
    }

    function open_products_editor( product_id ) {

        $('#wn_pb_products_editor > input[name="product_id"]').val( product_id );
        $('#wn_pb_products_editor').submit();
        
    }

    function manage_products_ajax_call( command, product_id ) {

        console.log( product_id );

        //Calling Ajax
        $.ajax({

            type : 'post',
            url : wp_ajax_tets_vars.ajax_url, // Pon aquí tu URL
            data : {

                action: 'manage_products', 
                command: command,
                product_id: product_id,

            },
            error: function( response ){

                console.log( response );
            },
            success: function( response ) {

                // Update the table
                console.log( 'new response' );
                update_element('.wn_pb_products_table', response);
                alert_notification('Changes Saved');

            }

        });
    }

    function update_element( element, data ) {

        $(element).empty();
        $(element).append(data);
        register_btns_click_evt();

    }

    function register_admin_panel_tabs() {

        $('.wn_pb_admin_tabs li').on('click', function() {

            const clicked_index = $(this).attr('index');

            $('.wn_pb_admin_tabs li').removeClass('wn_pb--active_index');
            $('.wn_pb_tabs_content').removeClass('wn_pb--active_content');

            $(this).addClass('wn_pb--active_index');
            $('.wn_pb_tabs_content[index="' + clicked_index + '"]').addClass('wn_pb--active_content');

        });

    }

    function alert_notification( message ) {

        $('.wn_pb_not_content p').text( message );
        $('.wn_pb_not').addClass('wn_pb_not--active');

        setTimeout(() => {

            $('.wn_pb_not').removeClass('wn_pb_not--active');
            
        }, 2500);

    }

    function register_notification_event() {
        $('.wn_pb_close_icon').on('click', function() {
            $('.wn_pb_not').removeClass('wn_pb_not--active');
        });
    }




    register_btns_click_evt();
    register_admin_panel_tabs();
    register_notification_event();


    


});