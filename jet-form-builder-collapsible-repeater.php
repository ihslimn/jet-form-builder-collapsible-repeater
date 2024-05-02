<?php
/**
 * Plugin Name: JetFormBuilder - Collapsible Repeater
 * Plugin URI:
 * Description: 
 * Version:     1.0.0
 * Author:      
 * Author URI:  
 * Text Domain: 
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

namespace JFB_Collapsible_Repeater;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

if ( ! class_exists( '\JFB_Collapsible_Repeater\Plugin' ) ) {

	class Plugin {

		private $path = null;

		private static $instance = null;

		public $version = '1.0.0';

		public function __construct() {
			add_action( 'plugins_loaded', array( $this, 'jec_init' ) );
		}

		public function jec_init() {

			if ( ! function_exists( 'jet_form_builder' ) ) {

				add_action( 'admin_notices', function() {
					$class = 'notice notice-error';
					$message = '<b>WARNING!</b> <b>JetFormBuilder - Collapsible Repeater</b> plugin requires <b>JetFormBuilder</b> plugin to be installed and activated.';
					printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), wp_kses_post( $message ) );
				} );

				return;

			}

			add_action( 'after_setup_theme', array( $this, 'init_components' ), 0 );

		}

		public function init_components() {
			$this->path = plugin_dir_path( __FILE__ );

			require $this->path . 'additional-block-attributes.php';
			new Additional_Block_Attributes();

			add_action( 'enqueue_block_editor_assets', array( $this, 'block_assets' ), 100 );
		}

		public function block_assets() {

			wp_enqueue_script(
				'jfb-collapsible-repeater',
				plugins_url( 'assets/js/blocks.js', __FILE__ ),
				array( 'wp-components', 'wp-element', 'wp-blocks', 'wp-block-editor', 'wp-edit-post' ),
				$this->version,
				false
			);

		}

		public static function instance() {
		
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

	}

}

Plugin::instance();
