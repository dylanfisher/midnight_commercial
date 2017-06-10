<?php the_post(); ?>
<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
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
</div>
