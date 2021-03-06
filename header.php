<!DOCTYPE html>
<html data-home-url="<?php echo home_url('/'); ?>" data-ajax-url="<?php echo admin_url('admin-ajax.php'); ?>" class="<?php echo is_admin_bar_showing() ? 'is-showing-admin-bar' : ''; ?>">
<head>
  <title><?php wp_title( '-', true, 'right' ); echo esc_html( get_bloginfo('name'), 1 ); ?></title>

  <!-- 🌴 This website was developed by https://github.com/dylanfisher 🌴 -->

  <?php
    $meta_description = get_bloginfo('description');
    if ( get_field( 'seo_description' ) ):
      $meta_description = get_field( 'seo_description' );
    endif;
  ?>
  <!-- Basic meta tags -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <?php // TODO: unique description for each page ?>
  <meta name="description" content="<?php echo $meta_description; ?>">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width">

  <!-- Facebook meta tags -->
  <meta property="og:url" content="<?php the_permalink(); ?>">
  <!-- <meta property="og:image" content="{{imageUrl}}"> -->
  <meta property="og:description" content="<?php echo $meta_description; ?>">
  <meta property="og:title" content="<?php the_title(); ?>">
  <meta property="og:site_name" content="<?php echo get_bloginfo('name'); ?>">
  <meta property="og:see_also" content="<?php echo home_url('/'); ?>">

  <!-- Google meta tags -->
  <meta itemprop="name" content="<?php the_title(); ?>">
  <meta itemprop="description" content="<?php echo $meta_description; ?>">
  <!-- <meta itemprop="image" content="{{imageUrl}}"> -->

  <!-- Twitter meta tags -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:url" content="<?php the_permalink(); ?>">
  <meta name="twitter:title" content="<?php the_title(); ?>">
  <meta name="twitter:description" content="<?php echo $meta_description; ?>">
  <!-- <meta name="twitter:image" content="{{imageUrl}}"> -->

  <link rel="icon" type="image/png" href="<?php echo get_bloginfo('template_url'); ?>/images/favicon.png">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <div class="footer-push-wrapper">
    <header class="header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="site-title">
              <a href="<?php bloginfo('url'); ?>/" rel="home"><?php bloginfo('name'); ?></a>
            </div>
            <nav class="nav">
              <?php wp_nav_menu(); ?>
            </nav>
          </div>
        </div>
      </div>
      <div class="hamburger">
        <?php get_template_part( 'images/svg/hamburger.svg' ); ?>
      </div>
      <div class="mobile-nav-close">
        <?php get_template_part( 'images/svg/nav_close.svg' ); ?>
      </div>
    </header>
    <div class="header-push"></div>
    <div class="container-fluid">
