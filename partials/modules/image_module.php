<div class="row">
  <div class="col-sm-12">
    <div class="ta-c">
      <?php sandbox_image( 'image', 'large' ); ?>
      <?php
        if ( get_sub_field( 'caption' ) ):
          echo '<div class="image-caption ta-l">' . get_sub_field( 'caption' ) . '</div>';
        endif;
      ?>
    </div>
  </div>
</div>
