<?php
  $styles = array();
  $image = get_field( 'featured_image' );
  if ( $image ):
    $image_url = $image['sizes']['large'];
    array_push( $styles, 'background-image: url(' . $image_url . ')' );
  endif;
?>
<div class="col-sm-6">
  <div class="project-thumbnail" style="<?php echo join( ' ', $styles ); ?>">
    <a href="<?php the_permalink(); ?>" class="project-thumbnail__content">
      <div class="project-thumbnail__content__centered">
        <?php the_title(); ?>
        <?php if ( get_field( 'subtitle' ) ): ?>
          <div class="font-small">
            <?php the_field( 'subtitle' ); ?>
          </div>
        <?php endif; ?>
      </div>
    </a>
  </div>
</div>
