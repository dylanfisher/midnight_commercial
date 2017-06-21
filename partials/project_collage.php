<?php
  $collage_data = json_decode ( get_field( 'collage' ), true );
  $collage_height = isset( $collage_data['canvasHeightRatio'] ) ? $collage_data['canvasHeightRatio'] : 60;
?>

<?php ob_start(); ?>
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
<?php $collage_description = ob_get_clean(); ?>

<div class="project-collage">
  <div class="row">
    <div class="project-collage__title-area project-collage__title-area--mobile col-xs-12">
      <?php echo $collage_description; ?>
    </div>
    <div class="project-collage__media" style="height: <?php echo $collage_height; ?>vw;">
      <?php
        // var_dump($collage_data);
        $index = 0;
        $collage_data_for_item = $collage_data['items'][$index];

        $columns = $collage_data_for_item['columns'];
        $column_offset = $collage_data_for_item['columnOffset'];
        $vertical_offset = $collage_data_for_item['positionTop'];
        $z_index = $collage_data_for_item['zIndex'];
      ?>

      <?php echo '<div class="project-collage__title-area project-collage__title-area--desktop project-collage-column col-xs-12 col-sm-' . $columns  . ' col-sm-offset-' . $column_offset . '" style="top: ' . $vertical_offset . '%; z-index: ' . $z_index . ';">'; ?>
        <?php echo $collage_description; ?>
      <?php echo '</div>'; ?>

      <?php
        if ( have_rows( 'collage_items' ) ):
          // Intentionally start the index at 1 because we add the custom description row first
          $index = 1;
          while ( have_rows( 'collage_items' ) ): the_row();
            $collage_data_for_item = $collage_data['items'][$index];

            $columns = $collage_data_for_item['columns'];
            $column_offset = $collage_data_for_item['columnOffset'];
            $vertical_offset = $collage_data_for_item['positionTop'];
            $z_index = $collage_data_for_item['zIndex'];

            echo '<div class="project-collage-column project-collage-column--' . $index . ' col-xs-' . $columns . ' col-xs-offset-' . $column_offset . '" style="top: ' . $vertical_offset . '%; z-index: ' . $z_index . ';">';
              echo '<a href="' . get_permalink() . '" class="blank-link">';
                sandbox_get_template_part( 'partials/project_collage/' . get_row_layout(), array( 'columns' => $columns ) );
              echo '</a>';
            echo '</div>';
            $index++;
          endwhile;
        endif;
      ?>
    </div>
  </div>
</div>
