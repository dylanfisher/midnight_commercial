<div class="row">
  <div class="col-sm-12">
    <div class="responsive-embed-wrapper">
      <?php the_sub_field( 'video' ); ?>
    </div>

    <?php
      if ( get_sub_field( 'caption' ) ):
        echo '<div class="image-caption ta-l">' . get_sub_field( 'caption' ) . '</div>';
      endif;
    ?>
  </div>
</div>
