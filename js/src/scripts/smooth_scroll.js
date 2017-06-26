$(document).on('ready', function() {
  // if ( location.hash.length > 1 ) {
  //   var hash = location.hash.substr(1);
  //   var $el = $('[name="' + hash + '"], #' + hash);

  //   setTimeout(function() {
  //     $el = $('[name="' + hash + '"], #' + hash);
  //     if($el.length) App.scrollTo($el);
  //   }, 1);
  // }

  // App.smoothScrollOffset = $('.header').height() + 20;
  App.smoothScrollOffset = 0;
});

$(document).on('click.smoothScrollEvents', 'a[href*="#"]:not([href="#"])', function(e) {
  // If you want to disable the call to `e.preventDefault()` you can add a ` data-default-jump-link` attribute to the link.
  // This is good if e.g. you want to enable the default history behavior for jump links.
  // <a href="#jump-link" data-default-jump-link>the hash in this jump link get's added to the current URL as usual</a>

  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && location.search == this.search) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      App.scrollTo(target);
      if( $(this).attr('data-default-jump-link') === undefined ) {
        e.preventDefault();
      }
    }
  }
});

// Allow a user's scroll to override the App.scrollTo function
// $(document).on('scroll mousedown DOMMouseScroll mousewheel keyup', 'html, body', function(e) {
//   if ( e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel' ||  e.type === 'touchstart' ) {
//     $('html, body').stop();
//   }
// });

App.scrollTo = function($target, duration) {
  var durationToUse = duration !== undefined ? duration : 1000;

  if($('html').hasClass('record') || $('html').hasClass('edit')) {
    return;
  }

  if(!$target.length) {
    console.warn('Can\'t find target to scroll to.', $target);
    return;
  }

  $('html,body').animate({
    scrollTop: $target.offset().top - App.smoothScrollOffset
  }, {
    duration: durationToUse,
    easing: 'easeInOutQuart'
  });
};
