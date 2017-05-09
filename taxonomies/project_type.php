<?php

function project_type_init() {
	register_taxonomy( 'project-type', array( 'project' ), array(
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
			'name'                       => __( 'Project types', 'YOUR-TEXTDOMAIN' ),
			'singular_name'              => _x( 'Project type', 'taxonomy general name', 'YOUR-TEXTDOMAIN' ),
			'search_items'               => __( 'Search project types', 'YOUR-TEXTDOMAIN' ),
			'popular_items'              => __( 'Popular project types', 'YOUR-TEXTDOMAIN' ),
			'all_items'                  => __( 'All project types', 'YOUR-TEXTDOMAIN' ),
			'parent_item'                => __( 'Parent project type', 'YOUR-TEXTDOMAIN' ),
			'parent_item_colon'          => __( 'Parent project type:', 'YOUR-TEXTDOMAIN' ),
			'edit_item'                  => __( 'Edit project type', 'YOUR-TEXTDOMAIN' ),
			'update_item'                => __( 'Update project type', 'YOUR-TEXTDOMAIN' ),
			'add_new_item'               => __( 'New project type', 'YOUR-TEXTDOMAIN' ),
			'new_item_name'              => __( 'New project type', 'YOUR-TEXTDOMAIN' ),
			'separate_items_with_commas' => __( 'Project types separated by comma', 'YOUR-TEXTDOMAIN' ),
			'add_or_remove_items'        => __( 'Add or remove project types', 'YOUR-TEXTDOMAIN' ),
			'choose_from_most_used'      => __( 'Choose from the most used project types', 'YOUR-TEXTDOMAIN' ),
			'not_found'                  => __( 'No project types found.', 'YOUR-TEXTDOMAIN' ),
			'menu_name'                  => __( 'Project types', 'YOUR-TEXTDOMAIN' ),
		),
		'show_in_rest'      => true,
		'rest_base'         => 'project-type',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	) );

}
add_action( 'init', 'project_type_init' );
