Interlace = {};

Interlace.initialize = function(options) {
    if ( App.breakpoint.isMobile() ) {
      return;
    }

    options = options || {};

    var selector = options.selector;

    createDivs(selector);

    $(document).on('mouseenter', selector, function(e) {
        moveDivs(e.target, selector, 'to');
    });

    $(document).on('mouseleave', selector, function(e) {
        moveDivs(e.target, selector, 'from');
    });

    // Helper functions
    //
    //

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function easeOutBack(t, b, c, d) {
        var ts = (t /= d) * t,
            tc = ts * t;
        return b + c * (4 * tc + -9 * ts + 6 * t);
    }

    function fromChaos(frame, startshift) {
        var shift = startshift - Math.floor(easeOutBack(frame, 0, 1, 1));
        return shift < 0 ? 0 : shift;
    }

    function toChaos(frame, startshift) {
        var shift = Math.floor(easeOutBack(frame, 0, 1, 1));
        return shift > startshift ? startshift : shift;
    }

    // Slices
    //
    //

    function constructHTML($el) {
        $el.wrap('<div class="slice-wrapper"></div>');

        var $sliceWrapper = $el.closest('.slice-wrapper');

        $el.wrap('<div class="slice-original-item"></div>');
        $sliceWrapper.append('<div class="slice-clone-wrapper"></div>');
    }

    function createDivs(className) {
        var allSlicedTyped = $(className);
        allSlicedTyped.each(function() {
            var $this = $(this);
            $this.imagesLoaded(function() {
                var hasImg = ( $this.find('img').length || $this.is('img') ) ? true : false;
                var yOffset = 0;
                var xShift = hasImg ? 50 : 15;
                var minDur = 20;
                var maxDur = 60;
                var fontSize = parseInt($this.css('font-size'));
                var containerwidth = $this.width();
                var containerheight = $this.height();
                // make sure the height stays the same / to avoid that with images there will be added space at bottom
                // since slices will be rounded up to whole pixels
                var newW = hasImg ? (containerwidth + xShift) : (containerwidth + xShift * 2);
                var newH = newW * containerheight / containerwidth;
                // var sliceHeight = Math.ceil((newH - yOffset) / sliceNum);
                var fontSliceHeight = fontSize > 20 ? 2 : 1;
                var sliceHeight = hasImg ? 10 : fontSliceHeight;
                var sliceNum = Math.ceil((newH - yOffset)/sliceHeight);

                constructHTML($this);

                var $sliceWrapper = $this.closest('.slice-wrapper');
                var $cloneWrapper = $sliceWrapper.find('.slice-clone-wrapper');

                if ( hasImg ) {
                    $sliceWrapper.addClass('slice-wrapper--has-image');
                }

                for (var i = 0; i < sliceNum; i++) {
                    $cloneWrapper.append('<div class="slice-clone"><div class="slice-clone__content">' + $this[0].outerHTML + '</div></div>');

                    var $cloneItem = $cloneWrapper.find('.slice-clone').eq(i);
                    var $cloneContent = $cloneItem.find('.slice-clone__content');
                    var startShift = getRandomInt(-xShift, xShift); // start position/shift for that slice
                    var left = className.indexOf('onoff') > -1 ? startShift : 0; // if onoff, i.e. sliced at the beginning

                    $cloneItem.data({
                        'data-shift': startShift,
                        'data-duration': getRandomInt(minDur, maxDur)
                    }).css({
                        height: sliceHeight
                    });

                    $cloneContent.css({
                        top: (-i * sliceHeight - yOffset),
                        left: left
                    });
                }

                $sliceWrapper.addClass('active');
            });
        });
    }

    function moveIndiv(frame, el, fromTo) {
        var duration = parseInt(el.data('data-duration')) || 0,
            shift = parseInt(el.data('data-shift')) || 0,
            left = fromTo === 'from' ? fromChaos(frame, shift) : toChaos(frame, shift);

        el.find('.slice-clone__content').stop(true).animate({
            left: left
        }, duration, 'easeInSine');

        if ((left !== 0 && fromTo === 'from') ||
            (left !== shift && fromTo === 'to')) {
            requestAnimationFrame(function() {
                moveIndiv(frame, el, fromTo);
            });
        }

        frame++;
    }

    function moveDivs(target, className, mode) {
        var $sliceWrapper = $(target).closest('.slice-wrapper');
        var $clones = $sliceWrapper.find('.slice-clone');

        $clones.each(function() {
            var $cloneItem = $(this);
            if (mode === 'to') {
                // shuffle left position / starting shift
                var maxShiftPx = $cloneItem.find('img').length > 0 ? 50 : 15;
                var newStartShift = getRandomInt(-maxShiftPx, maxShiftPx);
                $cloneItem.data('data-shift', newStartShift);
            }
            moveIndiv(0, $cloneItem, mode);
        });
    }
};

$(function() {
    var interlaceSelectors = [
        'header a',
        '.blank-link-hover',
        '.entry-content a',
        '.sl-container',
        '.project-collage-column img',
        '.module a',
        '.collage-link'
    ];

    Interlace.initialize({
        selector: interlaceSelectors.join(',')
    });
});
