<?php $title_position = get_field( 'title_position' ) == 'left' ? '' : 'col-xs-offset-4 col-md-offset-6' ?>
<div class="project-collage">
  <div class="row">
    <div class="project-collage__title-area project-collage__title-area--<?php the_field( 'title_position' ); ?> col-xs-8 col-md-4 <?php echo $title_position; ?>">
      <a href="<?php the_permalink(); ?>" class="collage-link">
        <h2><?php the_title(); ?></h2>
        <?php if ( get_field( 'year' ) ): ?>
          <p>
            <?php the_field( 'year' ); ?>
          </p>
        <?php endif; ?>
        <?php if ( get_field( 'one_sentence_description' ) ): ?>
          <p>
            <?php the_field( 'one_sentence_description' ); ?>
          </p>
        <?php endif; ?>
      </a>
    </div>

    <div class="project-collage__media">
      <?php
        if ( have_rows( 'featured_media' ) ):
          $index = -1;
          while ( have_rows( 'featured_media' ) ): the_row(); $index++;
            $columns = get_sub_field( 'columns' );
            $column_offset = get_sub_field( 'column_offset' );
            $vertical_offset = get_sub_field( 'vertical_offset' );

            ob_start();
              echo '<div class="project-collage-column project-collage-column--' . $index . ' col-xs-' . $columns . ' col-xs-offset-' . $column_offset . '" style="margin-top: -' . ($vertical_offset / 3) . '%; z-index: ' . get_sub_field( 'z_index' ) . ';">';
                echo '<a href="' . get_permalink() . '" class="blank-link">';
                  sandbox_get_template_part( 'partials/project_collage/' . get_row_layout(), array( 'columns' => $columns ) );
                echo '</a>';
              echo '</div>';
            $content = ob_get_clean();

            if ( $columns <= 8 && $index >= 1 ) {
              echo '<div class="col-xs-12 project-collage-row">';
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
</div>
