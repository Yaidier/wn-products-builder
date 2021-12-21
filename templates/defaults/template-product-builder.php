<?php
/**
 * Template Name: Product Builder
 *
 * This template display just the content of the page without neither header not footer 
 *
 */
?>
<!doctype html>
<html <?php language_attributes(); ?> style="margin:0 !important; padding:0 !important; box-sizing:border-box !important">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php wp_head(); ?>
    </head>

    <body>

        <?php the_content(); ?>

        <?php wp_footer(); ?>
    </body>
</html>

