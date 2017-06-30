App.interlace = function(options) {
  options = options || {};

  var $container           = options.el;
  var $cloneWrapper;
  var $clones;
  var $cloneItems;

  // params
  var $original      = $container.find('.interlace-item'); // original that's hidden on the page
  var fontSize       = parseInt( $original.css('font-size') ); // change in css
  var lineHeight     = parseInt( $original.css('line-height') ); // change in css
  var fontHeight     = $original.height() * lineHeight / fontSize; // height of the type container
  var originalHeight = $original.outerHeight( true ); // height of the type container
  var prevMouseX     = 0;
  var prevMouseY     = 0;
  var a              = 0;
  var inc            = (Math.PI*2)/200.0;
  var mouseY         = $(window).height()/3;
  var slices = [];


  // The number of times an interlaced element is divided into separate cells.
  // A lower slice ratio results in more cells.
  var sliceRatio = fontSize / 12;

  var sliceNum       = Math.round( originalHeight / sliceRatio ); // number of slices
  var sliceHeight    = Math.ceil( fontHeight / sliceNum ); // round up to have whole px, FIX flicker
  // var intervalTime   = 1000; // time for each shift

  var maxShift       = 0; // percentage to calculate shift in px
  var minShift       = -maxShift; // percentage to calculate shift in px
  var minShiftPx     = fontSize * minShift / 100; // calculate shift in px based on font size
  var maxShiftPx     = fontSize * maxShift / 100; // calculate shift in px based on font size
  var baseShift      = 0;
  var influence      = 0.0;
  var noiseYOff      = 0.0;


  // helper functions
  Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
  };

  function dist(x1, y1, x2, y2){
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt( a*a + b*b );
    return c;
  }

  // start
  function createDivs() {
    noise.seed(Math.random());

    var typeOriginal = $original.html();

    $container.find('.interlace-clone-wrapper').remove();
    $container.append('<div class="interlace-clone-wrapper"></div>');

    for ( var i = 0; i < sliceNum; i++ ) {
      var top = -i * sliceHeight + 'px';
      var html = '<div class="interlace-clone" data-index="' + i + '"><div class="interlace-clone__content" style="top: ' + top + ';">' + typeOriginal + '</div></div>';

      $container.find('.interlace-clone-wrapper').append( html );
    }

    $cloneWrapper = $container.find('.interlace-clone-wrapper');
    $clones = $cloneWrapper.find('.interlace-clone');
    $cloneItems = $cloneWrapper.find('.interlace-clone__content');

    // sliceDivs( startInterval );
    sliceDivs();
  }


  // This is where we kick everything off
   function sliceDivs(startInt) {
    // change height according to number of slices
    $clones.css( 'height', sliceHeight + 'px' );
    // if ( startInt ) startInt();

  // save all slices in an array so we don't have to use find() anymore
 for ( var i = 0; i < sliceNum; i++ ) {
      var $item = $clones.eq( i ).find('.interlace-clone__content');
      slices.push($item);
    }
    startAnimating(20);
  }

   var fps, fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps) {
      fpsInterval = fps;
      then = Date.now();
      startTime = then;
      animate();
    }

    function animate() {
      // if ( stopAnimating ) return;
      requestAnimationFrame( animate );
      now = Date.now();
      elapsed = now - then;
      if (elapsed > fpsInterval) {
        // console.log('animation frame');
        then = now - (elapsed % fpsInterval);
        // timerIncrement();
        loop();
      }
    }


// Main animation loop
function loop(){
  var noiseXOff = 0.0;

 for ( var i = 0; i < slices.length; i++ ) {
      var leftShift = noise.simplex2(noiseYOff, noiseXOff).map(-1, 1,minShiftPx, maxShiftPx);
      slices[i].css("left", leftShift + 'px');
      noiseXOff +=0.08;
 }
  noiseYOff+=0.01;

  // influence grows over time, so it starts with clean type
  if(influence<=1.0)influence+=0.002;

  // var mouseMapped = mouseY.map(0, $(window).height(), 20, 200);
  var mouseMapped = mouseY.map(0, $(window).height(), 20, 200);
  baseShift = mouseMapped*influence;

    maxShift = baseShift+ Math.sin(a)*(50*influence);
    minShift       = -maxShift; // percentage to calculate shift in px
    minShiftPx     = fontSize * minShift / 100; // calculate shift in px based on font size
    maxShiftPx     = fontSize * maxShift / 100; // cal

  a = a+inc;
}
  // mouse interaction
 $(window).mousemove(function(e) {
      mouseY = e.clientY;
    });

  createDivs();

  $original.addClass('active');
};

$(function() {
  $('.interlace').each(function() {
    App.interlace({
      el: $(this)
    });
  });

  $(window).resize( $.debounce( 250, resizeEvents ) );

  // Tear down all slices on resize
  function resizeEvents() {
    var $slices = $('.interlace');

    $slices.each(function() {
      var $slice = $(this);
      var originalHTML = $slice.find('.interlace-item').html();

      $slice.find('.interlace-item').removeClass('active');
      $slice.find('.interlace-clone-wrapper').remove();
    });

    $('.interlace').each(function() {
      App.interlace({
        el: $(this)
      });
    });
  }
});
