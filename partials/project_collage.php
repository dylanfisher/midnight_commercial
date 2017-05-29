<?php $title_position = get_field( 'title_position' ) == 'left' ? '' : 'col-sm-offset-6' ?>
<div class="project-collage">
  <div class="row">
    <div class="project-collage__title-area project-collage__title-area--<?php the_field( 'title_position' ); ?> col-sm-4 <?php echo $title_position; ?>">
      <h2>
        <?php echo '<a href="' . get_permalink() . '" class="blank-link-hover">'; ?>
          <?php the_title(); ?>
        <?php echo '</a>'; ?>
      </h2>
      <p><?php the_field( 'year' ); ?></p>
      <p><?php the_field( 'subtitle' ); ?></p>
    </div>

    <?php
      if ( have_rows( 'featured_media' ) ):
        $index = -1;
        while ( have_rows( 'featured_media' ) ): the_row(); $index++;
          $columns = get_sub_field( 'columns' );
          $column_offset = get_sub_field( 'column_offset' );
          $vertical_offset = get_sub_field( 'vertical_offset' );

          ob_start();
            echo '<div class="project-collage-column project-collage-column--' . $index . ' col-sm-' . $columns . ' col-sm-offset-' . $column_offset . '" style="margin-top: -' . ($vertical_offset / 3) . '%; z-index: ' . get_sub_field( 'z_index' ) . ';">';
              echo '<a href="' . get_permalink() . '" class="blank-link">';
                sandbox_get_template_part( 'partials/project_collage/' . get_row_layout(), array( 'columns' => $columns ) );
              echo '</a>';
            echo '</div>';
          $content = ob_get_clean();

          if ( $columns <= 8 && $index >= 1 ) {
            echo '<div class="col-sm-12 project-collage-row">';
              echo '<div class="row">';
                echo $content;
              echo '</div>';
            echo '</div>';
          } else {
            echo $content;
          }
        endwhile;
      endif;
    ?>
  </div>
</div>
