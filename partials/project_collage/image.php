<?php
  $columns = $template_args['columns'];
  $image_size = $columns > 8 ? 'large' : 'medium';
  $image = get_sub_field( 'image' );

  if ( $image['mime_type'] == 'image/gif' ) {
    $image_size = 'full';
  }

  sandbox_image( 'image', $image_size );
?>
