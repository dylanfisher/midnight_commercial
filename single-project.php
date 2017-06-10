<?php the_post(); ?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <div class="ta-c">
    <div class="project__featured-image">
      <div class="interlace interlace-large">
        <div class="interlace-item">
          <?php sandbox_image( 'featured_image', 'large' ); ?>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10 col-sm-offset-1">
      <div class="project__description-area">
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <?php the_field( 'description' ); ?>
        <div class="project__metadata-wrapper">
          <div class="row">
            <div class="col-sm-6">
              <?php
                $types = get_the_terms( $post, 'project-type' );
                $keywords = get_the_terms( $post, 'project-keyword' );

                if ( !empty( $types ) ):
                  echo 'Type';
                  $term_links = array();
                  foreach ( $types as $key => $term ):
                    array_push( $term_links, '<a href="' . get_term_link( $term ) . '">' . $term->name . '</a>' );
                  endforeach;
                  echo '<p>';
                    echo join( ', ', $term_links );
                  echo '</p>';
                endif;

                if ( !empty( $keywords ) ):
                  echo 'Keyword';
                  $term_links = array();
                  foreach ( $keywords as $key => $term ):
                    array_push( $term_links, '<a href="' . get_term_link( $term ) . '">' . $term->name . '</a>' );
                  endforeach;
                  echo '<p>';
                    echo join( ', ', $term_links );
                  echo '</p>';
                endif;
              ?>
            </div>
            <div class="col-sm-6">
              <?php the_field( 'metadata' ); ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php
    if ( have_rows( 'modules' ) ):
      while ( have_rows( 'modules' ) ) : the_row();
        echo '<div class="module module-type--' . get_row_layout() . '">';
          get_template_part( 'partials/modules/' . get_row_layout() );
        echo '</div>';
      endwhile;
    endif;
  ?>
</div><!-- .post -->
