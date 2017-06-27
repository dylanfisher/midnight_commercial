<?php // This is the work page, and also the home page ?>
<?php the_post(); ?>
<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
  <div class="home-page-splash-area">
    <div class="home-page-tagline-logo-area">
      <div class="interlaced-logo-wrapper">
        <div class="interlace">
          <div class="interlace-item">
            <div class="interlaced-logo">
              <div class="interlaced-logo__desktop">
                <?php get_template_part( 'images/svg/midnight_commercial_logo.svg' ); ?>
              </div>
              <div class="interlaced-logo__mobile">
                <?php get_template_part( 'images/svg/midnight_commercial_logo_mobile.svg' ); ?>
              </div>
            </div>
          </div>
        </div>
      </div>

      <?php
        if ( get_field( 'tagline' ) ):
          echo '<div class="home-page-tagline">';
            the_field( 'tagline' );
          echo '</div>';
        endif;
      ?>
    </div>
    <div class="home-page-see-more">
      <div class="home-page-see-more__text">See our work</div>
      <div class="home-page-see-more__arrow"></div>
    </div>
  </div>

  <?php
    // Project collages
    $post_status = 'publish';

    if ( current_user_can( 'editor' ) || current_user_can( 'administrator' ) ) {
      $post_status = array( 'publish', 'pending', 'draft', 'private' );
    }

    $paged = 1;
    $request_url = $_SERVER['REQUEST_URI'];
    preg_match( '/page\/(\d*)\/?/', $request_url, $matches );
    if ( array_key_exists( 1, $matches ) ):
      $paged = intval( $matches[1] );
    endif;

    $args = array(
      'post_type' => array( 'project' ),
      'posts_per_page' => 6,
      'orderby' => 'date',
      'post_status' => $post_status,
      'paged' => $paged
    );

    $the_query = new WP_Query( $args );

    if ( $the_query->have_posts() ):
      echo '<div class="work-anchor-link" id="work"></div>';
        echo '<div class="project-collage-wrapper">';
        while ( $the_query->have_posts() ):
          $the_query->the_post();
          get_template_part( 'partials/project_collage' );
        endwhile;
        echo '<div class="next-page-wrapper">';
          echo get_next_posts_link( 'Loading...', $the_query->max_num_pages );
        echo '</div>';
      echo '</div>';
    wp_reset_postdata();
    else:
      echo '<p>No works are available.</p>';
    endif;
  ?>
</div>
