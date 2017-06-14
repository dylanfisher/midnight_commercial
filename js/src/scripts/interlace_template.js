// Interlace link hack, hopefully temporary
// $(function() {
//     var $links = $('a');

//     $links.each(function() {
//         console.log('replacing link');
//         var $link = $(this);

//         if ( $link.find('img').length ) return;

//         console.log( "$link[0].outerHTML", $link[0].outerHTML );

//         var linkSliceHTML = '<div class="offon-slice" data-offset="0" data-maxshift="15" data-slices="16" easing="easeInSine" data-minduration="20" data-maxduration="60">' +
//           '<div class="sl-container">' +
//             $link.addClass('sl-content')[0].outerHTML +
//           '</div>' +
//         '</div>';

//         $link.replaceWith( linkSliceHTML );
//     });
// });


// Global Variables
//
//
var mousePosX = window.innerWidth/2;

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

function fromToChaos(frame, startshift) {
    // var shift = Math.floor(easeOutBack(Math.sin(frame), 0, 1, 1)) * startshift;
    // var shift = Math.floor(easeOutBack(frame, 0, 1, 1)) * Math.sin(frame);
    // return shift;
    // return getRandomInt(0, startshift);
    return Math.sin(frame) * startshift;
}

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

// Slices
//
//

function createDivs(className) {
    var allSlicedTyped = $(className);
    allSlicedTyped.each(function() {
        var $this = $(this);

        $this.imagesLoaded(function() {
            var hasImg = $this.find("img").length > 0 ? true : false;
            // required parameters
            var sliceNum = $this.attr("data-slices");
            var yOffset = $this.attr("data-offset");
            var xShift = $this.attr("data-maxshift");
            // optional parameters
            var minDur = $this.attr("data-minduration") || 100;
            var maxDur = $this.attr("data-maxduration") || 150;
            var easing = $this.attr("data-easing") || 'easeInQuad';
            // var fontSize = $this.css('font-size');
            var original = $this.html();
            var containerwidth = $this.width();
            var containerheight = $this.height();
            // make sure the height stays the same / to avoid that with images there will be added space at bottom
            // since slices will be rounded up to whole pixels
            var newW = hasImg ? containerwidth - xShift * 4 : containerwidth;
            var newH = newW * containerheight / containerwidth;
            var sliceHeight = Math.ceil((newH - yOffset) / sliceNum);
            var first = $this.children().first(); // original container is used for yOffset
            $this.css({
                height: newH,
                overflow: "hidden"
            });
            first.css({
                height: yOffset + "px"
            });
            for (var i = 0; i < sliceNum; i++) {
                var html = $(original);
                var startShift = getRandomInt(-xShift, xShift); // start position/shift for that slice
                html.attr({
                    "data-shift": startShift,
                    "data-duration": getRandomInt(minDur, maxDur),
                    "data-easing": easing,
                    "data-id": "item-" + i
                });
                html.css({
                    height: sliceHeight + "px"
                });
                var left = className.indexOf("onoff") > -1 ? startShift : 0; // if onoff, i.e. sliced at the beginning
                html.find(".sl-content").css({
                    top: (-i * sliceHeight - yOffset) + "px",
                    left: left + "px"
                });
                $this.append(html);
            }
            $this.addClass('interlace-initialized').find(".sl-content").css({
                position: "absolute",
                padding: "0px " + xShift + "px",
                // maxWidth: newW + "px"
            });
        }); // imagesLoaded
    });
}

function moveIndiv(frame, el, fromTo) {
    var duration = parseInt(el.attr("data-duration")) || 0,
        shift = parseInt(el.attr("data-shift")) || 0,
        easing = el.attr("data-easing"),
        left = fromTo === "from" ? fromChaos(frame, shift) : toChaos(frame, shift);
    el.find(".sl-content").animate({
        left: left + "px"
    }, duration, easing);
    frame++;
    if ((left !== 0 && fromTo === "from") ||
        (left !== shift && fromTo === "to")) {
        requestAnimationFrame(function() {
            moveIndiv(frame, el, fromTo);
        });
    }

}

function moveDivs(target, className, mode) {
    var parent = $(target).closest(className);
    var allcontainers = parent.find(".sl-container");
    allcontainers.each(function() {
        var $slice = $(this);
        if (mode === "to") {
            // shuffle left position / starting shift
            var maxShiftPx = parent.attr("data-maxshift");
            var newStartShift = getRandomInt(-maxShiftPx, maxShiftPx);
            $slice.attr("data-shift", newStartShift);
        }
        moveIndiv(0, $slice, mode);
    });
}

// function moveDivsConstant(frame, parent, sliceNum, duration, easing) {
//     var mouseMapped = mousePosX.map(0, window.innerWidth, 0, 100);

//     for (var i = 0; i < sliceNum; i++) {
//         var slice = parent.find("div[data-id='item-" + i + "']");
//         var shift = slice.attr("data-shift");
//         console.log(mouseMapped);
//         slice.find(".sl-content").animate({
//             left: mouseMapped + "px"
//         }, duration, easing);
//     }
//     requestAnimationFrame(function() {
//         frame++;
//         moveDivsConstant(frame, parent, sliceNum, duration, easing);
//     });
// }

function startOnOff() {
    createDivs(".onoff-slice");
    createDivs(".offon-slice");
    $(".onoff-slice").mouseenter(function(e) {
        moveDivs(e.target, ".onoff-slice", "from");
    });
    $(".onoff-slice").mouseleave(function(e) {
        moveDivs(e.target, ".onoff-slice", "to");
    });
    $(".offon-slice").mouseenter(function(e) {
        moveDivs(e.target, ".offon-slice", "to");
    });
    $(".offon-slice").mouseleave(function(e) {
        moveDivs(e.target, ".offon-slice", "from");
    });
}

function startConstant() {
    createDivs(".constant-slice");
    $(".constant-slice").mouseenter(function(e) {
        var parent = $(e.target).closest(".constant-slice");
        var sliceNum = parent.attr("data-slices");
        var minDur = parent.attr("data-minduration") || 100;
        var maxDur = parent.attr("data-maxduration") || 150;
        var duration = getRandomInt(minDur, maxDur);
        var easing = parent.attr("data-easing") || 'easeInQuad';
        // moveDivsConstant(0, parent, sliceNum, duration, easing);
    });
    $(window).mousemove(function(e) {
        mousePosX = e.clientX;
    });
}

$(document).ready(function() {
    startOnOff();
    // startConstant();
});
