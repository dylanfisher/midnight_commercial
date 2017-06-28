$(function() {
  var $homeSplashArea = $('.home-page-splash-area');
  var $homeTaglineArea = $('.home-page-tagline-logo-area');
  var $header = $('.header');
  var $seeMore = $('.home-page-see-more');

  if ( $homeSplashArea.length ) {
    var headerActivationPoint = $homeTaglineArea.offset().top + $homeTaglineArea.height() + 20;
    var seeMoreActivationPoint = App.windowHeight / 3;

    $(window).resize(function() {
      headerActivationPoint = $homeTaglineArea.offset().top + $homeTaglineArea.height() + 20;
      seeMoreActivationPoint = App.windowHeight / 3;
    });

    $(window).on('scroll mc:headerScrollActivater', function() {
      if ( App.scrollTop > headerActivationPoint ) {
        $header.addClass('active');
      } else {
        $header.removeClass('active');
      }

      if ( App.scrollTop > seeMoreActivationPoint ) {
        $seeMore.addClass('active');
      } else {
        $seeMore.removeClass('active');
      }
    });

    $(window).trigger('mc:headerScrollActivater');
  }

});
