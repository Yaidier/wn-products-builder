<?php

class Utils {

    private static function connect_fs($url, $method, $context, $fields = null) {

        global $wp_filesystem;

        if(false === ($credentials = request_filesystem_credentials($url, $method, false, $context, $fields))) {
            return false;
        }

        //check if credentials are correct or not.
        if(!WP_Filesystem($credentials)) {
            request_filesystem_credentials($url, $method, true, $context);
            return false;
        }

        return true;
    }

    public static function write_file( $data, $filename ) {
       
        global $wp_filesystem;

        $filename = $filename . '__' . current_time( 'Y-m-d-H-i-s' ) . '.json';

        $url = wp_nonce_url("admin.php?page=wn_products_builder", "filesystem-nonce");
        $form_fields = array("file-data");

        if( self::connect_fs($url, "", WN_PB_DIR . '/downloads' , $form_fields ))
        {
            $dir = $wp_filesystem->find_folder(WN_PB_DIR . '/downloads');
            $file = trailingslashit($dir) . $filename;
            $wp_filesystem->put_contents($file, $data, FS_CHMOD_FILE);

            $download_url = WN_PB_URL . 'downloads/' . $filename;

            return $download_url;
        }
        else
        {
            return new WP_Error("filesystem_error", "Cannot initialize filesystem");
        }

    }

}