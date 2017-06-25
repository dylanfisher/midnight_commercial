$(document).on('click', '.hamburger', function() {
  var $hamburger = $(this);
  var $nav = $('.nav');

  $nav.css({ opacity: 0, height: 'auto', overflow: 'hidden' }).show();

  var height = $nav.outerHeight(true);

  $nav.css({ opacity: 1, height: 0 });

  $('html').addClass('mobile-nav-activating');

  $(document).trigger('mc:mobileNavOpen');
  $nav.transition({ height: height }, function() {
    $('html').addClass('mobile-nav-active');
  }, 'easeOutQuint');
});

$(document).on('click', '.mobile-nav-close', function() {
  var $hamburger = $(this);
  var $nav = $('.nav');

  $('html').addClass('mobile-nav-deactivating');

  $nav.transition({ height: 0 }, function() {
    $nav.hide();
    $(document).trigger('mc:mobileNavClose');
    $('html').removeClass('mobile-nav-active mobile-nav-activating mobile-nav-deactivating');
  }, 'easeOutQuint');
});
