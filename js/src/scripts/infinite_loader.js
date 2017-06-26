$(function() {
  var loadingInProgress = false;

  loadNextProjectCollagePage();

  function loadNextProjectCollagePage() {
    var $projectCollage = $('.project-collage-wrapper');
    var $nextPageWrapper = $('.next-page-wrapper');
    var $nextPageLink = $nextPageWrapper.find('a');

    if ( $projectCollage.length && $nextPageLink.length ) {
      var infiniteLoadPoint = App.documentHeight - ( App.windowHeight * 2 );
      var url = $nextPageLink.attr('href');

      $(window).resize(function() {
        infiniteLoadPoint = App.documentHeight - ( App.windowHeight * 2 );
      });

      $(window).on('scroll.infiniteLoaderEvents mc:infiniteLoaderInit', function() {
        if ( !loadingInProgress && App.scrollTop > infiniteLoadPoint ) {
          loadingInProgress = true;

          $.ajax({
            method: 'GET',
            url: url
          }).done(function(data) {
            var $newProjectCollage = $(data).find('.project-collage-wrapper');

            turnOffEvents();
            $nextPageWrapper.remove();

            $projectCollage.append( $newProjectCollage.html() );

            loadingInProgress = false;

            $(document).trigger('mc:projectCollageInit');

            loadNextProjectCollagePage();
          });
        }
      });

      $(window).trigger('mc:infiniteLoaderInit');
    } else {
      turnOffEvents();
    }
  }

  function turnOffEvents() {
    $(window).off('scroll.infiniteLoaderEvents mc:infiniteLoaderInit');
  }
});
