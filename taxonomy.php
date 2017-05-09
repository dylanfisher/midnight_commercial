<?php

function project_keyword_init() {
	register_taxonomy( 'project_keyword', array( 'project' ), array(
		'hierarchical'      => false,
		'public'            => true,
		'show_in_nav_menus' => true,
		'show_ui'           => true,
		'show_admin_column' => false,
		'query_var'         => true,
		'rewrite'           => true,
		'capabilities'      => array(
			'manage_terms'  => 'edit_posts',
			'edit_terms'    => 'edit_posts',
			'delete_terms'  => 'edit_posts',
			'assign_terms'  => 'edit_posts'
		),
		'labels'            => array(
			'name'                       => __( 'Project keywords', 'YOUR-TEXTDOMAIN' ),
			'singular_name'              => _x( 'Project keyword', 'taxonomy general name', 'YOUR-TEXTDOMAIN' ),
			'search_items'               => __( 'Search project keywords', 'YOUR-TEXTDOMAIN' ),
			'popular_items'              => __( 'Popular project keywords', 'YOUR-TEXTDOMAIN' ),
			'all_items'                  => __( 'All project keywords', 'YOUR-TEXTDOMAIN' ),
			'parent_item'                => __( 'Parent project keyword', 'YOUR-TEXTDOMAIN' ),
			'parent_item_colon'          => __( 'Parent project keyword:', 'YOUR-TEXTDOMAIN' ),
			'edit_item'                  => __( 'Edit project keyword', 'YOUR-TEXTDOMAIN' ),
			'update_item'                => __( 'Update project keyword', 'YOUR-TEXTDOMAIN' ),
			'add_new_item'               => __( 'New project keyword', 'YOUR-TEXTDOMAIN' ),
			'new_item_name'              => __( 'New project keyword', 'YOUR-TEXTDOMAIN' ),
			'separate_items_with_commas' => __( 'Project keywords separated by comma', 'YOUR-TEXTDOMAIN' ),
			'add_or_remove_items'        => __( 'Add or remove project keywords', 'YOUR-TEXTDOMAIN' ),
			'choose_from_most_used'      => __( 'Choose from the most used project keywords', 'YOUR-TEXTDOMAIN' ),
			'not_found'                  => __( 'No project keywords found.', 'YOUR-TEXTDOMAIN' ),
			'menu_name'                  => __( 'Project keywords', 'YOUR-TEXTDOMAIN' ),
		),
		'show_in_rest'      => true,
		'rest_base'         => 'project_keyword',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	) );

}
add_action( 'init', 'project_keyword_init' );
