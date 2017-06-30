<div class="row">
  <div class="col-sm-12">
    <?php
      $width = get_sub_field( 'aspect_ratio_width' );
      $height = get_sub_field( 'aspect_ratio_height' );

      $style = '';

      if ( $width && $height ):
        $ratio = $height / $width * 100;
        $style = 'padding-bottom: ' . $ratio . '%;';
      endif;
    ?>
    <div class="responsive-embed-wrapper" style="<?php echo $style; ?>">
      <?php the_sub_field( 'video' ); ?>
    </div>

    <?php
      if ( get_sub_field( 'caption' ) ):
        echo '<div class="image-caption ta-l">' . get_sub_field( 'caption' ) . '</div>';
      endif;
    ?>
  </div>
</div>
