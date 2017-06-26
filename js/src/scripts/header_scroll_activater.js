$(function() {
  var $homeSplashArea = $('.home-page-splash-area');
  var $header = $('.header');
  var $seeMore = $('.home-page-see-more');

  if ( $homeSplashArea.length ) {
    var splashHeight = $homeSplashArea.height();
    var seeMoreOffset = $seeMore.offset().top / 2;

    $(window).resize(function() {
      splashHeight = $homeSplashArea.height();
      seeMoreOffset = $seeMore.offset().top / 2;
    });

    $(window).on('scroll mc:headerScrollActivater', function() {
      if ( App.scrollTop > splashHeight ) {
        $header.addClass('active');
      } else {
        $header.removeClass('active');
      }

      if ( App.scrollTop > seeMoreOffset ) {
        $seeMore.addClass('active');
      } else {
        $seeMore.removeClass('active');
      }
    });

    $(window).trigger('mc:headerScrollActivater');
  }

});
