<?php
/**
 * Plugin Name:				Postbox to Tab
 * Description: 			Convert the sortable post boxes into a tabbed menu.
 * Author: 						Felipe Paul Martins - Opus Magnum
 * Version: 					1.0.1
 * Author URI:				http://opusmagnum.ch
 * License:     			GPL-2.0+
 * License URI: 			http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU
 * General Public License version 2, as published by the Free Software Foundation.  You may NOT assume
 * that you can use any other version of the GPL.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * @package   postbox-to-tab
 * @author    Felipe Paul Martins <fpmpusmagnum.ch>
 * @license   GPL-2.0+
 * @link      http://opusmagnum.ch
 */

/* Prevent loading this file directly */
defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'Postbox_to_tab' ) ) {

	/**
   * Class Postbox_to_tab
   * @since 1.0
   */
	class Postbox_to_tab {

		/**
		 * Class Constructor.
		 * @since  1.0
		 */
		public function __construct() {
			add_action( 'plugins_loaded', array( $this, 'postbox_to_tab_setup' ), 1 );
			add_action( 'plugins_loaded', array( $this, 'postbox_to_tab_init' ), 10 );
		}

		/**
		 * Setup ID, Version, Directory path, and URI
		 * @since  1.0
		 */
		public function postbox_to_tab_setup() {
			$this->id = 'postbox_to_tab';
			$this->version = '1.0.1';
			$this->directory_path = trailingslashit( plugin_dir_path( __FILE__ ) );
			$this->directory_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );
		}

		/**
		 * Init the plugin functions
		 * @since  1.0
		 */
		public function postbox_to_tab_init() {

			add_action('admin_enqueue_scripts', array( $this, 'postbox_to_tab_enqueue_files') );
		}

		/**
		 * Enqueuing js/css files only in edition page
		 * @since  1.0
		 * @param string $hook Hook suffix for the current admin page.
		 */
		public function postbox_to_tab_enqueue_files( $hook ) {

			if ( 'post.php' != $hook && 'post-new.php' != $hook ) return;

			wp_enqueue_script( 'postbox_to_tab_js', $this->directory_uri . 'js/postbox-to-tab.js', array('jquery'), $this->version );
			wp_enqueue_style( 'postbox_to_tab_css', $this->directory_uri . 'css/postbox-to-tab.css', false, $this->version );
		}
	}
}

new Postbox_to_tab();
