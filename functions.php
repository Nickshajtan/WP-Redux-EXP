<?php
/*
 * Vars
 *
 *
 */
if( !defined('PATH') ) {
    define( 'PATH', wp_normalize_path( str_replace( '\\', '/', dirname(dirname(dirname(__FILE__))) ) ) );
}
if( !defined( 'PARENT_THEME_URI' ) ) {
    define( 'PARENT_THEME_URI', get_template_directory_uri() );
}
if( !defined( 'THEME_URI' ) ) {
    define( 'THEME_URI', get_stylesheet_directory_uri() );
}

/*
 * Include parent theme styles
 *
 *
 */
add_action( 'wp_enqueue_scripts', 'hcc_enqueue_parent_styles' );    
function hcc_enqueue_parent_styles() {
    wp_enqueue_style( 'parent-style', PARENT_THEME_URI . '/style.css' );
}

/*
 * Head theme styles
 *
 *
 */
add_action( 'wp_enqueue_scripts', 'hcc_add_head_styles' );
function hcc_add_head_styles() {
    $path     = '/app/public/css/head-styles.min.css';
    $filename =  wp_normalize_path( PATH . $path );
    if( is_admin() || file_exists($filename) && filesize($filename) > 0 ){
        wp_register_style( 'base', THEME_URI . $path, array(), '' );
        wp_enqueue_style( 'base' );
    }
}

/*
 * Footer theme styles
 *
 *
 */
add_action( 'wp_enqueue_scripts', 'hcc_add_footer_styles' );
function hcc_add_footer_styles() {
    //Compile vendor styles
    $path     = '/app/public/css/vendor-styles.min.css';
    $filename =  wp_normalize_path( PATH . $path );
    if( is_admin() || file_exists($filename) && filesize($filename) > 0 ){
        wp_register_style( 'vendor-styles', THEME_URI . $path );
        wp_enqueue_style( 'vendor-styles' );
    }
  
    //Compile theme styles
    $path     = '/app/public/css/theme-styles.min.css';
    $filename =  wp_normalize_path( PATH . $path );
    if( is_admin() || file_exists($filename) && filesize($filename) > 0 ){
        wp_register_style( 'theme-styles', THEME_URI . $path );
        wp_enqueue_style( 'theme-styles' );
    }
}

/*
 * Override WP jQuery
 * Main sripts
 *
 */
add_action( 'wp_enqueue_scripts', 'hcc_add_scripts' );
function hcc_add_scripts(){
    
    // jQuery
    wp_deregister_script( 'jquery-core' );
    wp_deregister_script( 'jquery' );
    /*** If CDN available ***/
    $url = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    $response = wp_remote_get( wp_normalize_path( $url ) );
    $code = wp_remote_retrieve_response_code( $response );
    if ( !is_wp_error( $response ) && isset( $url ) && !empty( $url) && ( $code == '200') ){
	        wp_register_script( 'jquery', $url ,array(), null, true);
	        wp_enqueue_script( 'jquery' );
    }
    /*** Else ***/
    else{
            wp_register_script( 'jquery', THEME_URI . '/assets/public/libs/jquery/jquery.min.js', array(), null, true);
	        wp_enqueue_script( 'jquery');
    }	
  
    $path     = '/app/public/js/head.min.js';
    $filename =  wp_normalize_path( PATH . $path );
    if( is_admin() || file_exists($filename) && filesize($filename) > 0 ){
      wp_register_script( 'head-js', THEME_URI . $path, array('jquery'), '', true );
      wp_enqueue_script( 'head-js' );
    }
}

/*
 * Footer scripts
 *
 */
add_action( 'wp_footer', 'hcc_add_footer_scripts' );
function hcc_add_footer_scripts() {
    // Compile vendor scripts
    $path     = '/app/public/js/vendor.min.js';
    $filename =  wp_normalize_path( PATH . $path );
    if( is_admin() || file_exists($filename) && filesize($filename) > 0 ){
      wp_register_script( 'theme-js', THEME_URI . $path, array('jquery'), '', true );
      wp_enqueue_script( 'theme-js' );
    }
  
    // Compile theme scripts
    $path     = '/app/public/js/theme.min.js';
    $filename =  wp_normalize_path( PATH . $path );
    if( is_admin() || file_exists($filename) && filesize($filename) > 0 ){
      wp_register_script( 'vendor-js', THEME_URI . $path, array('jquery'), '', true );
      wp_enqueue_script( 'vendor-js' );
    }
}

