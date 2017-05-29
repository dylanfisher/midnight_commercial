<div class="ta-c">
  <?php sandbox_image( 'image', 'large' ); ?>
  <?php
    $image = get_sub_field( 'image' );
    if ( !empty( $image['caption'] ) ):
      echo '<div class="image-caption font-small">' . $image['caption'] . '</div>';
    endif;
  ?>
</div>
