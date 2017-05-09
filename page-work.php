<?php the_post(); ?>
<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
  <h2 class="entry-title">All Works</h2>
  <div class="row small-gutters">
    <?php
      $args = array(
        'post_type' => array( 'project' ),
        'posts_per_page' => 12, // TODO: infinite scroll pagination
        'orderby' => 'date'
      );

      $the_query = new WP_Query( $args );

      if ( $the_query->have_posts() ):
        while ( $the_query->have_posts() ):
          $the_query->the_post();
          get_template_part( 'partials/project_thumb' );
        endwhile;
        wp_reset_postdata();
      else:
        echo '<p>No works are available.</p>';
      endif;
    ?>
  </div>
</div>
