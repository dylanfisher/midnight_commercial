<?php

// Get an <img> at size from an ACF image field
function sandbox_image($acf_image_field_name='image', $image_size='large', $classes='') {
  $image = get_field($acf_image_field_name); // check for a top level field
  if(empty($image)) $image = get_sub_field($acf_image_field_name); // check for a sub-field
  $alt = $image['alt'];
  if(empty($alt)) $alt = $image['title'];
  $size = $image_size;
  if ( $size == 'full' ):
    $url = $image['url'];
    $width = $image['width'];
    $height = $image['height'];
  else:
    $url = $image['sizes'][$size];
    $width = $image['sizes'][$size.'-width'];
    $height = $image['sizes'][$size.'-height'];
  endif;

  echo '<img src="'.$url.'" width="'.$width.'" height="'.$height.'" alt="'.$alt.'" class="sandbox-image '.$classes.'">';
}

// Get <img> tags from a ACF repeater
function sandbox_images($acf_repeater='images', $acf_image_field_name='image', $image_size='large', $classes='') {
  if(have_rows($acf_repeater)):
    while (have_rows($acf_repeater)): the_row();
      sandbox_image($acf_image_field_name, $image_size, $classes);
    endwhile;
  endif;
}
