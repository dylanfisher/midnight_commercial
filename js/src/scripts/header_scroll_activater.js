$(function() {
  var $homeSplashArea = $('.home-page-splash-area');
  var $header = $('.header');

  if ( $homeSplashArea.length ) {
    var splashHeight = $homeSplashArea.height();

    $(window).resize(function() {
      splashHeight = $homeSplashArea.height();
    });

    $(window).scroll(function() {
      if ( App.scrollTop > splashHeight ) {
        $header.addClass('active');
      } else {
        $header.removeClass('active');
      }
    });

    $(window).trigger('scroll');
  }

});
