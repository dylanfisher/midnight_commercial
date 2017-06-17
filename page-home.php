<?php the_post(); ?>
<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
  <div class="interlaced-logo-wrapper">
    <a href="<?php echo get_permalink( get_page_by_path( 'work' ) ); ?>" class="blank-link">
      <div class="interlace">
        <div class="interlace-item">
          <div class="interlaced-logo">Midnight Commercial</div>
        </div>
      </div>
    </a>
  </div>
</div>
