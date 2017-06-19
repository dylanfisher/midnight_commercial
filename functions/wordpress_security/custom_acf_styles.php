<?php

//
// Custom ACF styles
//

function sandbox_custom_admin_styles() {
  if ( get_post_type() == 'project' || get_post_type() == 'page' ):
?>
    <style>
      [data-name='modules'] [data-name="caption"] .acf-editor-wrap iframe {
        height: 100px !important;
        min-height: 100px;
      }
    </style>
<?php
  endif;
}
add_action('admin_head', 'sandbox_custom_admin_styles');
