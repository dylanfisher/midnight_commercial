App.interlace = function(options) {
  options = options || {};

  var $container           = options.el;
  var myintervals          = [];
  var intIndex             = 0;
  var shiftVals            = [];
  var processShiftsOrig    = [];
  var processShifts        = [];
  var shiftFactor          = 1;
  var toFromChaosDirection = 'to';
  var mouseIdle            = 200;
  var idleTime             = 0;
  var genSpot              = randomZeroMouseSpot();
  var $cloneWrapper;
  var $clones;
  var $cloneItems;
  var finishedMouseIntervention = false;
  var stopAnimating = false;
  var previousShiftMode;

  // The number of times an interlaced element is divided into separate cells.
  // A lower slice ratio results in more cells.
  // var sliceRatio = 4.2;
  var sliceRatio = App.windowWidth / 18 / 10;
  console.log('sliceRatio', sliceRatio);

  if ( $container.hasClass('interlace-large') ) {
    sliceRatio = 12;
  }

  // params
  var $original      = $container.find('.interlace-item'); // original that's hidden on the page
  var fontSize       = parseInt( $original.css('font-size').replace('px', '') ); // change in css
  var lineHeight     = parseInt( $original.css('line-height').replace('px', '') ); // change in css
  var fontHeight     = $original.height() * lineHeight / fontSize; // height of the type container
  var originalHeight = $original.outerHeight( true ); // height of the type container
  var sliceNum       = Math.round( originalHeight / sliceRatio ); // number of slices
  var sliceHeight    = Math.ceil( fontHeight / sliceNum ); // round up to have whole px, FIX flicker
  var intervalTime   = 1200; // time for each shift

  var maxShift       = 40; // percentage to calculate shift in px
  var minShift       = -maxShift; // percentage to calculate shift in px
  var minShiftPx     = fontSize * minShift / 100; // calculate shift in px based on font size
  var maxShiftPx     = fontSize * maxShift / 100; // calculate shift in px based on font size
  var mode           = 'toFromChaos';

  // helper functions
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function toFromChaos(elIndex, intervalIndex, stopThresh) {
    var steps = shiftVals[elIndex].steps;
      // overshoot, so shift is not just going in one direction towards 0
    var shift = easeOutBack( intervalIndex / steps, 0, 1, 1 );
    var actualShift = Math.floor( shiftVals[elIndex].px / shift );

    if ( Math.abs( actualShift ) < maxShiftPx * stopThresh ) {
      actualShift = 0;
    }

    processShifts[elIndex] = actualShift;

    if (toFromChaosDirection === 'to') {
      return shiftVals[elIndex].px - actualShift;
    } else {
      return actualShift;
    }
  }


  function easeOutBack(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;

    return b + c * ( 4 * tc + -9 * ts + 6 * t );
  }

  Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
  };

  function onlyUnique(value, index, self) {
    return self.indexOf( value ) === index;
  }


  // start
  function createDivs() {
    var typeOriginal = $original.html();

    makeNewShiftVals();
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

    sliceDivs( startInterval );
  }

  function makeNewShiftVals() {
    // Don't repeat shift modes
    var shiftModes = ['random', 'asc', 'desc'];
    var uniqueShiftModes = shiftModes;
    var shiftMode = shiftModes[ Math.floor( Math.random() * shiftModes.length ) ];
    var leftOrRightSeed = Math.random();

    if ( shiftMode == previousShiftMode ) {
      var index = shiftModes.indexOf( shiftMode );
      if (index > -1) {
        uniqueShiftModes.splice( index, 1 );
      }
      shiftMode = uniqueShiftModes[ Math.floor( Math.random() * uniqueShiftModes.length ) ];
    }
    previousShiftMode = shiftMode;
    // var shiftMode = 'random';
    console.log('shiftMode', shiftMode);

    shiftVals = [];

    for ( var i = 0; i < sliceNum; i++ ) {
      shiftVals[i] = {};
      var leftOrRight = getLeftOrRightVal(leftOrRightSeed, i);
      // setup the shift values
      if ( shiftMode == 'random' ) {
        shiftVals[i].px = maxShiftPx * leftOrRight;
      } else if ( shiftMode == 'asc' ) {
        shiftVals[i].px = Math.round( ( maxShiftPx / sliceNum ) * (i + 1) ) * leftOrRight;
      } else if ( shiftMode == 'desc' ) {
        shiftVals[i].px = ( maxShiftPx - Math.round( ( maxShiftPx / sliceNum ) * (i + 1) ) ) * leftOrRight;
      }

      shiftVals[i].steps = getRandomInt(1, 3); // the more steps the longer the animation takes
      processShiftsOrig[i] = shiftVals[i].px;
    }
  }

  function getLeftOrRightVal(seed, i) {
    // getLeftOrRightVal determines which shift method to use for
    // this animation.

    var choices = 5;

    if ( seed < 1 / choices ) {
      // random
      console.log('shift method', 'random');
      leftOrRight = ( Math.random() < 0.5 ) ? -1 : 1;
    } else if ( seed < 2 / choices ) {
      // first right, then left
      console.log('shift method', 'first right, then left');
      leftOrRight = ( i <= sliceNum / 2 ) ? -1 : 1;
    } else if ( seed < 3 / choices ) {
      // first left, then right
      console.log('shift method', 'first left, then right');
      leftOrRight = ( i >= sliceNum / 2 ) ? -1 : 1;
    } else if ( seed < 4 / choices ) {
      // all in one direction
      console.log('shift method', 'all in one direction');
      leftOrRight = seed < 0.5 ? -1 : 1;
    } else {
      // alternating left, then right
      console.log('shift method', 'alternating left, then right');
      leftOrRight = ( i % 2 === 0 ) ? -1 : 1;
    }

    return leftOrRight;
  }

  function sliceDivs(startInt) {
    // change height according to number of slices
    $clones.css( 'height', sliceHeight + 'px' );

    if ( startInt ) startInt();
  }

  function moveDivs() {
    var moveDivCompletions = 0;

    if ( mode != 'mouse' ) {
      intIndex++;
      $cloneItems.data('mouseInterventionComplete', false);
    }

    for ( var i = 0; i < sliceNum; i++ ) {
      var $item = $clones.eq( i ).find('.interlace-clone__content');
      var leftShift = getRandomInt( minShiftPx, maxShiftPx ) + 'px'; // default, just random shifting
      var easing = 'easeOutQuad';
      var animDuration = getRandomInt( intervalTime / 4, intervalTime / 2 );

      switch (mode) {
      case 'toFromChaos':
        leftShift = toFromChaos(i, intIndex, 0.2);
        break;
      case 'mouse':
        leftShift = shiftVals[i].px * shiftFactor;
        easing = 'easeInCirc';
        break;
      }

      var css = {
        // move text/img, so it visually stays in same place
        left: leftShift + 'px'
      };

      if (mode == 'mouse') {
        if ( $item.data('mouseInterventionComplete') ) {
          $item.animate(css, 1, easing, mouseAnimationComplete( $item ));
        } else {
          $item.stop(true).animate(css, animDuration, easing, mouseAnimationComplete( $item ));
        }
      } else {
        // delay random so every slice starts at a different time
        $item.data('mouseInterventionComplete', false);
        $item.delay(getRandomInt(100, 800)).velocity(css, animDuration, easing);
      }
    }

    var uniqueShifts = processShifts.filter( onlyUnique );

    if ( uniqueShifts.length == 1 && intIndex > 1 ) {
      // shifts are all 0
      if ( toFromChaosDirection == 'to' ) {
        // go to other direction
        startInterval( 'from' );
      } else {
        // reset
        makeNewShiftVals();
        startInterval( 'to' );
      }
    }

    function mouseAnimationComplete($item) {
      $item.data('mouseInterventionComplete', true);
    }
  }

  function startInterval(direction) {
    stopInterval();
    intIndex = 0;
    toFromChaosDirection = direction !== undefined ? direction : toFromChaosDirection;
    processShifts = processShiftsOrig; // hack so uniqueshifts != 1
    var newInterval = setInterval(moveDivs, intervalTime);
    myintervals.push(newInterval);
  }

  function stopInterval() {
    for ( var i = 0; i < myintervals.length; i++ ) {
      clearInterval(myintervals[i]);
      myintervals.splice(i, 1);
    }
  }

  function randomZeroMouseSpot() {
    var w = window.innerWidth;
    // var l = Math.floor( Math.random() * w * 0.5 );
    // var r = Math.floor( Math.random() * w * 0.5 );
    var l = 0;
    var r = 1;
    // console.log(0 + l, w - r);
    return [l, r];
  }

  function timerIncrement() {
    idleTime++;

    if ( idleTime > 1 ) {
      mode = 'toFromChaos';
      finishedMouseIntervention = false;
    }

    if ( idleTime > 1 && idleTime < 2 ) {
      if ( Math.abs( shiftFactor ) > 0.3 ) {
        intIndex = 0;
        toFromChaosDirection = 'from';
      } else {
        intIndex = 0;
        toFromChaosDirection = 'to';
      }
      genSpot = randomZeroMouseSpot();
    }
  }

  function listeners() {
    startAnimating(mouseIdle);

    // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    var fps, fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps) {
      fpsInterval = fps;
      then = Date.now();
      startTime = then;
      animate();
    }

    function animate() {
      if ( stopAnimating ) return;
      requestAnimationFrame( animate );
      now = Date.now();
      elapsed = now - then;
      if (elapsed > fpsInterval) {
        // console.log('animation frame');
        then = now - (elapsed % fpsInterval);
        timerIncrement();
      }
    }

    $(window).mousemove(function(e) {
      // Stop all running animations when mouse movement starts
      // $clones.find('.interlace-clone__content').finish();
      idleTime = 0;
      mode = 'mouse';
      moveDivs();
      var w = window.innerWidth;
      // mapping 0,window.innerWidth to -1, 1
      // so 0 is the center of the page
      // that's when there will be no shift in the slices
      // shiftFactor = e.clientX.map(0, w, -1, 1);
      // modify so that 0 sweet spot is somewhere else
      var mouseMapped = e.clientX.map(0 + genSpot[0], w - genSpot[1], -1, 1);
      if (mouseMapped < -1.5) {
        shiftFactor = -1.5;
      } else if (mouseMapped > 1.5) {
        shiftFactor = 1.5;
      } else {
        shiftFactor = mouseMapped;
      }
    });
  }

  listeners();
  createDivs();

  $original.addClass('active');
};

$(function() {
  $('.interlace').each(function() {
    App.interlace({
      el: $(this)
    });
  });
});
