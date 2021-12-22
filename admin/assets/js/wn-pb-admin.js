jQuery(document).ready( function($) {

    function register_btns_click_evt() {

        $( 'button' ).off('click');

        $( 'button' ).on( 'click', function(){  

            const product_id    = $(this).parents('tr').children('td:first-child').text();
            const action        = $(this).attr('action');
    
            switch (action) {

                case 'clone_product':   manage_products_ajax_call( 'clone_product', product_id  );  
                    break;
    
                case 'export_product':  manage_products_ajax_call( 'export_product', product_id  );  
                    break;

                case 'import_product':  import_product_get_file_data( product_id );  
                    break;
    
                case 'edit_product':    open_products_editor( product_id );  
                    break;

                case 'remove_product':  manage_products_ajax_call( 'remove_product', product_id );  
                    break;

                case 'add_new':         manage_products_ajax_call('add_new_product');  
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

    function import_product_get_file_data( product_id ) {

        let input_file_field = '<input type="file" id="wn_pb_import_file" class="wn_pb_import_file">';
        $('body').append( input_file_field );

        $('.wn_pb_import_file').click();
        $('.wn_pb_import_file').on('change', function(){

            let file_to_read = this.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                const raw_content = e.target.result;
                const content = JSON.parse(raw_content); // parse json 

                $('.wn_pb_import_file').remove();
                manage_products_ajax_call( 'import_product', product_id, content )
            };
            reader.readAsText(file_to_read);
        });
    }

    function manage_products_ajax_call( command, product_id, content = null ) {

        //Calling Ajax
        $.ajax({

            type : 'post',
            url : wp_ajax_tets_vars.ajax_url, // Pon aquí tu URL
            data : {

                action: 'manage_products', 
                command: command,
                product_id: product_id,
                content: content,

            },
            error: function( response ){

                console.log( response );
            },
            success: function( response ) {

                switch (response['from']) {
    
                    case 'render_products_table': { 
                        update_element('.wn_pb_products_table', response['data']); 
                        alert_notification( response['status'], response['message'] );
                    }
                        break;
                        
                    case 'export_product': {
                        download_product( response['data'] ); 
                        alert_notification( response['status'], response['message'] );
                    }
                        break;

                    case 'import_product': alert_notification( response['status'], response['message'] );
                        break;
    
                    default: ;
                        break;
                }
            }
        });
    }

    function download_product( download_url ) {

        var a = document.createElement('a');
        a.href = download_url;
        a.download = '';
        document.body.append(a);
        a.click();
        a.remove();

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

    function alert_notification( status = 'success',  message = '' ) {

        $('.wn_pb_not').removeClass('wn_pb_not__success');
        $('.wn_pb_not').removeClass('wn_pb_not__fail');

        switch ( status ) {

            case 'success': {
                $('.wn_pb_not_content h4').text( 'SUCCESS' );
                $('.wn_pb_not').addClass('wn_pb_not__success');
            }
                break;

            case 'fail': {
                $('.wn_pb_not_content h4').text( 'FAIL' );
                $('.wn_pb_not').addClass('wn_pb_not__fail');
            }
                break;

        }

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