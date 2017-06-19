<?php $collage_data = json_decode ( get_field( 'collage' ) ); ?>

<?php $title_position = 'col-xs-offset-0 col-md-offset-0' ?>

<div class="project-collage">
  <div class="row">
    <div class="project-collage__title-area col-xs-12 col-md-4 <?php echo $title_position; ?>">
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
        if ( have_rows( 'collage_items' ) ):
          $index = -1;
          while ( have_rows( 'collage_items' ) ): the_row(); $index++;
            $collage_data_for_item = $collage_data->$index;

            $columns = $collage_data_for_item->columns;
            $column_offset = $collage_data_for_item->columnOffset;
            $vertical_offset = $collage_data_for_item->positionTop;
            $z_index = $collage_data_for_item->zIndex;

            echo '<div class="project-collage-column project-collage-column--' . $index . ' col-xs-' . $columns . ' col-xs-offset-' . $column_offset . '" style="top: ' . $vertical_offset . '%; z-index: ' . $z_index . ';">';
              echo '<a href="' . get_permalink() . '" class="blank-link">';
                sandbox_get_template_part( 'partials/project_collage/' . get_row_layout(), array( 'columns' => $columns ) );
              echo '</a>';
            echo '</div>';
          endwhile;
        endif;
      ?>
    </div>
  </div>
</div>
