<?php

namespace JFB_Collapsible_Repeater;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Additional_Block_Attributes {

	public $script_enqueued = false;

	public function __construct() {

		add_action( 'jet-form-builder/before-start-form-row', array( $this, 'add_attributes' ) );	
		
		add_action( 'wp_enqueue_scripts', array( $this, 'register_script' ) );
		
	}

	public function add_class( $attrs ) {

		return in_array( $attrs['type'] ?? '', array( 'radio-field', 'checkbox-field' ) );

	}

	public function add_attributes( $block ) {

		$attrs = $block->block_attrs;
		
		if ( empty( $attrs['jfb_collapsible_repeater_enabled'] ) ) {
			return;
		}
		
		$block->add_attribute( 'data-is-collapsible', $attrs['name'] );

		$this->enqueue_script();

	}

	public function register_script() {

		wp_register_script(
			'jfb-collapsible-repeater',
			plugins_url( 'assets/js/frontend.js', __FILE__ ),
			array( 'jquery' ),
			Plugin::instance()->version,
			true
		);

		wp_register_style(
			'jfb-collapsible-repeater',
			plugins_url( 'assets/css/frontend.css', __FILE__ ),
			array(),
			Plugin::instance()->version,
			false
		);

	}

	public function enqueue_script() {
		wp_enqueue_script( 'jfb-collapsible-repeater' );
		wp_enqueue_style( 'jfb-collapsible-repeater' );
	}

}
