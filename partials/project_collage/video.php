<?php
  $width = get_sub_field( 'aspect_ratio_width' );
  $height = get_sub_field( 'aspect_ratio_height' );

  $style = '';

  if ( $width && $height ):
    $ratio = $height / $width * 100;
    $style = 'padding-bottom: ' . $ratio . '%;';
  endif;
?>

<div class="project-collage__video responsive-embed-wrapper" style="<?php echo $style; ?>">
  <?php
    $video_embed_url = get_sub_field('video');
    preg_match( '/src=".*?vimeo.com\/video\/(\d*)("|\?)?/', $video_embed_url, $matches );
    if ( array_key_exists( 1, $matches ) ):
      $video_id = $matches[1];
      if ( !empty( $video_id ) ):
        echo '<iframe src="https://player.vimeo.com/video/' . $video_id . '?background=1&autoplay=0" width="640" height="360" class="project-collage__video__iframe" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="allowfullscreen"></iframe>';
      endif;
    endif;
  ?>
</div>
