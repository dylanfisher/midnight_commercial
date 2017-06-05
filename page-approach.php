<?php the_post(); ?>
<div class="row">
  <div class="col-sm-10 col-sm-offset-1">
    <div class="content">
      <div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
        <div class="entry-content">
          <?php the_content(); ?>
        </div>
      </div><!-- .post -->
    </div><!-- .content -->
  </div>
</div>

<?php if ( have_rows( 'approaches' ) ): $index = 0; ?>
  <div class="row">
    <div class="col-sm-8 col-sm-offset-2">
      <div class="approaches">
        <?php while ( have_rows( 'approaches' ) ): the_row(); $index++; ?>
          <div class="approach">
            <div class="approach__index">
              <div class="approach__index__number">
                <?php echo integerToRoman( $index ); ?>
              </div>
            </div>
            <div class="approach__title">
              <?php the_sub_field( 'title' ); ?>
            </div>
            <div class="approach__description">
              <?php the_sub_field( 'description' ); ?>
            </div>
          </div>
        <?php endwhile; ?>
      </div>
    </div>
  </div>
<?php endif; ?>
