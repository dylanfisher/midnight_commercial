<?php the_post(); ?>
<div class="row">
  <div class="col-sm-10 col-sm-offset-1">
    <div class="content">
      <div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
        <?php
          if ( have_rows( 'modules' ) ):
            while ( have_rows( 'modules' ) ) : the_row();
              echo '<div class="module module-type--' . get_row_layout() . '">';
                get_template_part( 'partials/page_modules/' . get_row_layout() );
              echo '</div>';
            endwhile;
          endif;
        ?>
      </div><!-- .post -->
    </div><!-- .content -->
  </div>
</div>
