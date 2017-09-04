<?php the_post(); ?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <div class="ta-c">
    <div class="project__featured-image">
      <?php sandbox_image( 'featured_image', 'large' ); ?>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10 col-sm-offset-1">
      <div class="entry-content">
        <h1 class="entry-title">
          <?php the_title(); ?>
          <?php if ( get_field( 'client' ) ): ?>
            <p>
              Client: <?php the_field( 'client' ); ?>
            </p>
          <?php endif; ?>
        </h1>
      </div>
    </div>
  </div>
  <?php
    if ( have_rows( 'modules' ) ):
      echo '<div class="modules">';
        while ( have_rows( 'modules' ) ) : the_row();
          echo '<div class="module module-type--' . get_row_layout() . '">';
            get_template_part( 'partials/modules/' . get_row_layout() );
          echo '</div>';
        endwhile;
      echo '</div>';
    endif;
  ?>
</div><!-- .post -->
