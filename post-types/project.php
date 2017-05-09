<?php

function project_init() {
	register_post_type( 'project', array(
		'labels'            => array(
			'name'                => __( 'Projects', 'midnight_commercial' ),
			'singular_name'       => __( 'Project', 'midnight_commercial' ),
			'all_items'           => __( 'All Projects', 'midnight_commercial' ),
			'new_item'            => __( 'New Project', 'midnight_commercial' ),
			'add_new'             => __( 'Add New', 'midnight_commercial' ),
			'add_new_item'        => __( 'Add New Project', 'midnight_commercial' ),
			'edit_item'           => __( 'Edit Project', 'midnight_commercial' ),
			'view_item'           => __( 'View Project', 'midnight_commercial' ),
			'search_items'        => __( 'Search Projects', 'midnight_commercial' ),
			'not_found'           => __( 'No Projects found', 'midnight_commercial' ),
			'not_found_in_trash'  => __( 'No Projects found in trash', 'midnight_commercial' ),
			'parent_item_colon'   => __( 'Parent Project', 'midnight_commercial' ),
			'menu_name'           => __( 'Projects', 'midnight_commercial' ),
		),
		'public'            => true,
		'hierarchical'      => false,
		'show_ui'           => true,
		'show_in_nav_menus' => true,
		'supports'          => array( 'title', 'editor' ),
		'has_archive'       => true,
		'rewrite'           => true,
		'query_var'         => true,
		'menu_icon'         => 'dashicons-admin-post',
		'show_in_rest'      => true,
		'rest_base'         => 'project',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'project_init' );

function project_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['project'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => sprintf( __('Project updated. <a target="_blank" href="%s">View Project</a>', 'midnight_commercial'), esc_url( $permalink ) ),
		2 => __('Custom field updated.', 'midnight_commercial'),
		3 => __('Custom field deleted.', 'midnight_commercial'),
		4 => __('Project updated.', 'midnight_commercial'),
		/* translators: %s: date and time of the revision */
		5 => isset($_GET['revision']) ? sprintf( __('Project restored to revision from %s', 'midnight_commercial'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Project published. <a href="%s">View Project</a>', 'midnight_commercial'), esc_url( $permalink ) ),
		7 => __('Project saved.', 'midnight_commercial'),
		8 => sprintf( __('Project submitted. <a target="_blank" href="%s">Preview Project</a>', 'midnight_commercial'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		9 => sprintf( __('Project scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Project</a>', 'midnight_commercial'),
		// translators: Publish box date format, see http://php.net/date
		date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		10 => sprintf( __('Project draft updated. <a target="_blank" href="%s">Preview Project</a>', 'midnight_commercial'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'project_updated_messages' );
