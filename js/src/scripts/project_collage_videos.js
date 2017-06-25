$(function() {
  initVideos();

  function initVideos() {
    if ( App.breakpoint.isMobile() ) return;

    var $videos = $('.project-collage__video__iframe');

    if ( $videos.length ) {
      var players = [];

      $videos.each(function() {
        var $video = $(this);
        var iframe = $video.get(0);
        var player = new Vimeo.Player(iframe);

        players.push( player );

        player.play().then(function() {
          player.pause();
          $(window).trigger('scroll');
        });
      });

      $(window).scroll(function() {
        $videos.each(function(index) {
          var $video = $(this);

          if ( $video.visible(true) ) {
            players[index].play();
          } else {
            players[index].pause();
          }
        });
      });

      $(window).trigger('scroll');
    }
  }
});
