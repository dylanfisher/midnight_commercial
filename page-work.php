<?php // This is the work page, and also the home page ?>
<?php the_post(); ?>
<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
  <div class="home-page-splash-area">
    <div class="home-page-tagline-logo-area">
      <div class="interlaced-logo-wrapper">
        <div class="interlace">
          <div class="interlace-item">
            <div class="interlaced-logo">Midnight Commercial</div>
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
      <div class="home-page-see-more__arrow">V</div>
    </div>
  </div>

  <?php
    // Project collages
    $post_status = 'publish';

    if ( current_user_can( 'editor' ) || current_user_can( 'administrator' ) ) {
      $post_status = array( 'publish', 'pending', 'draft', 'private' );
    }

    $args = array(
      'post_type' => array( 'project' ),
      'posts_per_page' => 12, // TODO: infinite scroll pagination
      'orderby' => 'date',
      'post_status' => $post_status
    );

    $the_query = new WP_Query( $args );

    if ( $the_query->have_posts() ):
      echo '<div class="work-anchor-link" id="work"></div>';
      while ( $the_query->have_posts() ):
        $the_query->the_post();
        get_template_part( 'partials/project_collage' );
      endwhile;
    wp_reset_postdata();
    else:
      echo '<p>No works are available.</p>';
    endif;
  ?>
</div>
