<?php
  $columns = $template_args['columns'];
  $image_size = $columns > 8 ? 'large' : 'medium';
  sandbox_image( 'image', $image_size );
?>
