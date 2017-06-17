$(document).on('click', '.hamburger', function() {
  var $hamburger = $(this);
  var $nav = $('.nav');

  $nav.css({ opacity: 0, height: 'auto', overflow: 'hidden' }).show();

  var height = $nav.outerHeight(true);

  $nav.css({ opacity: 1, height: 0 });
  $nav.transition({ height: height }, function() {
    $('html').addClass('mobile-nav-active');
  }, 'easeOutQuint');
});

$(document).on('click', '.mobile-nav-close', function() {
  var $hamburger = $(this);
  var $nav = $('.nav');

  $nav.transition({ height: 0 }, function() {
    $nav.hide();
    $('html').removeClass('mobile-nav-active');
  }, 'easeOutQuint');
});
