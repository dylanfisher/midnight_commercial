/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});
// Global namespace, window variables, etc.

$ = jQuery;

var App = {
  windowWidth: $(window).width(),
  windowHeight: $(window).height(),
  documentWidth: $(document).width(),
  documentHeight: $(document).height(),
  scrollTop: $(window).scrollTop(),
  homeUrl: $('html').attr('data-home-url'),
  ajaxUrl: $('html').attr('data-ajax-url'),
};

$(window).resize(function() {
  App.windowWidth    = $(window).width();
  App.windowHeight   = $(window).height();
  App.documentWidth  = $(document).width();
  App.documentHeight = $(document).height();
});

$(window).scroll(function() {
  App.scrollTop = $(window).scrollTop();
});

App.breakpoint = function(checkIfSize) {
  var xs = 480;
  var sm = 768;
  var md = 992;
  var lg = 1200;
  var breakpoint;

  if(App.windowWidth < xs) {
    breakpoint = 'xs';
  } else if(App.windowWidth >= md) {
    breakpoint = 'lg';
  } else if(App.windowWidth >= sm) {
    breakpoint = 'md';
  } else {
    breakpoint = 'sm';
  }

  if(checkIfSize !== undefined) {
    if(checkIfSize == 'xs') {
      return App.windowWidth < xs;
    } else if(checkIfSize == 'sm') {
      return (App.windowWidth >= xs && App.windowWidth < sm);
    } else if(checkIfSize == 'md') {
      return (App.windowWidth >= sm && App.windowWidth < md);
    } else if(checkIfSize == 'lg') {
      return App.windowWidth >= md;
    }
  } else {
    return breakpoint;
  }
};

App.breakpoint.isMobile = function() {
  return ( App.breakpoint('xs') || App.breakpoint('sm') );
};

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
  var sliceRatio = 4.2;

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
        // animDuration = 0;
        break;
      }

      var css = {
        // move text/img, so it visually stays in same place
        left: leftShift + 'px'
      };

      if (mode == 'mouse') {
        if ( $item.data('mouseInterventionComplete') ) {
          $item.animate(css, animDuration / 1000, easing, mouseAnimationComplete( $item ));
        } else {
          $item.stop(true).animate(css, animDuration, easing, mouseAnimationComplete( $item ));
        }
      } else {
        // delay random so every slice starts at a different time
        $item.data('mouseInterventionComplete', false);
        $item.delay(getRandomInt(100, 800)).animate(css, animDuration, easing);
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

$(function() {
  var $singleProject = $('body.single-project');

  if ( $singleProject.length ) {
    $singleProject.addClass('transition-is-ready');

    window.setTimeout(function() {
      $singleProject.addClass('transition-is-complete');
    }, 1000); // This timeout should match the single_project.scss CSS transition
  }
});
