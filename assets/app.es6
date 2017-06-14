/* global doT, wx */

// const ENV = ENV || 'production';

// Global namespace for the New Money Selected app
const TIB = TIB || {};

/*
TIB.API_DOMAIN =
	ENV === 'production'
	? 'http://thetype.com'
	: 'http://test.thetype.com';
*/


(function() {
	'use strict';
	
	let doc = document;
	
	// UA marking
	const UA_LIST = ['iPhone', 'iPad', 'MQQBrowser', 'Android', 'MicroMessenger'];
	let ua = navigator.userAgent;
	let $html = doc.getElementsByTagName('html')[0];
	for (let i = 0; i < UA_LIST.length; i++) {
		var uaRegExp = new RegExp(UA_LIST[i]);
		
		if (ua.match(uaRegExp)) {
			$html.classList.add('ua-' + UA_LIST[i]);
		}
	}
	if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) {
		$html.classList.add('ua-Safari');
	}
	if (!('ontouchstart' in window)) {
		$html.classList.add('ua-Pointer');
	}
	
	// Enable the CSS `:active` interactions
	doc.getElementsByTagName('main')[0].addEventListener('touchstart', function(){});
	
	// Twist HTML language
	doc.getElementsByTagName('html')[0].setAttribute('lang', 'en');
	
	// Add statistics
	setTimeout(function() {
		
	}, 0);

})();


(function() { 'use strict';

TIB.Slideshow = class _Slideshow {
	constructor(selector) {
		this.$el    = document.querySelector(selector.el);
		this.$list  = this.$el.querySelector(selector.list);
		this.$prev  = this.$el.querySelector(selector.prev);
		this.$next  = this.$el.querySelector(selector.next);
		this.index  = 0;
		// this.slideW = this.$list.children[0].offsetWidth;
		// this.slideH = this.$list.children[0].offsetHeight;
		
		this.startX = -1;
		this.startY = -1;
		this.lastX  = -1;
		this.lastY  = -1;
		this.distX  = 0;
		this.distY  = 0;
		this.isMove   = false;
		this.isSlide  = false;
		this.isScroll = false;
	}
	
	
	
	/**
	 * @private
	 * Inits
	 */
	
	_initList() {
		let indexes = this._getIndexes();
		let currIdx = indexes.currIdx;
		let nextIdx = indexes.nextIdx;
		let prevIdx = indexes.prevIdx;
		
		let $items = this.$list.children;
		$items[currIdx].classList.add('is-center');
		$items[prevIdx].classList.add('is-left');
		$items[nextIdx].classList.add('is-right');
	}
	
	_initPager() {
		this._listenPagerClick();
	}
	
	_initTouch() {
		console.log('touch:', this.slideW, this.slideH);
		this._listenTouchEvent();
	}
	
	
	
	/**
	 * @private
	 * Listeners
	 */
	
	_listenPagerClick() {
		this.$prev.addEventListener('click', this._navPrev.bind(this));
		this.$next.addEventListener('click', this._navNext.bind(this));
	}
	_listenTouchEvent() {
		this.$el.addEventListener('touchstart',  this._handleTouchStart.bind(this));
		this.$el.addEventListener('touchmove',   this._handleTouchMove.bind(this));
		this.$el.addEventListener('touchend',    this._handleTouchEnd.bind(this));
		this.$el.addEventListener('touchcancel', this._handleTouchEnd.bind(this));
	}
	
	
	
	/**
	 * @private
	 * Actions
	 */
	
	_getIndexes() {
		let len = this.$list.children.length;
		let currIdx =  this.index      % len;
		let nextIdx = (this.index + 1) % len;
		let prevIdx = (this.index - 1) % len;
		let newNext = (this.index + 2) % len;
		let newPrev = (this.index - 2) % len;
		
		return {
			currIdx: currIdx < 0 ? currIdx + len : currIdx,
			prevIdx: prevIdx < 0 ? prevIdx + len : prevIdx,
			nextIdx: nextIdx < 0 ? nextIdx + len : nextIdx,
			newPrev: newPrev < 0 ? newPrev + len : newPrev,
			newNext: newNext < 0 ? newNext + len : newNext
		};
	}
	
	_navPrev() {
		let indexes = this._getIndexes();
		let currIdx = indexes.currIdx;
		let nextIdx = indexes.nextIdx;
		let prevIdx = indexes.prevIdx;
		let newPrev = indexes.newPrev;
		
		this.index--;
		console.log('curr:' + currIdx, 'prev:' + prevIdx, 'newPrev:' + newPrev);
		
		let $el    = this.$el;
		let $items = this.$list.children;
		
		$el.classList.remove('is-next');
		$el.classList.add('is-prev');
		
		$items[nextIdx].classList.remove('is-left', 'is-right');
		$items[currIdx].classList.remove('is-center');
		$items[currIdx].classList.add('is-right');
		$items[prevIdx].classList.remove('is-left');
		$items[prevIdx].classList.add('is-center');
		$items[newPrev].classList.remove('is-right', 'is-center');
		$items[newPrev].classList.add('is-left');
	}
	
	_navNext() {
		let indexes = this._getIndexes();
		let currIdx = indexes.currIdx;
		let prevIdx = indexes.prevIdx;
		let nextIdx = indexes.nextIdx;
		let newNext = indexes.newNext;
		
		this.index++;
		console.log('curr:' + currIdx, 'next:' + nextIdx, 'newNext:' + newNext);
		
		let $el    = this.$el;
		let $items = this.$list.children;
		
		$el.classList.remove('is-prev');
		$el.classList.add('is-next');
		
		$items[prevIdx].classList.remove('is-left', 'is-right');
		$items[currIdx].classList.remove('is-center');
		$items[currIdx].classList.add('is-left');
		$items[nextIdx].classList.remove('is-right');
		$items[nextIdx].classList.add('is-center');
		$items[newNext].classList.remove('is-left', 'is-center');
		$items[newNext].classList.add('is-right');
	}
	
	_handleTouchStart(e) {
		this.$el.classList.add('is-move');
		this.$list.style.transition = 'none';
		
		this.lastX  = this.startX = e.touches[0].clientX;
		this.lastY  = this.startY = e.touches[0].clientY;
		this.isMove = true;
	}
	
	_handleTouchMove(e) {
		// e.preventDefault();
		if (this.isScroll) { return; }
		if (this.isSlide) { e.preventDefault(); }
		
		if (this.isMove) {
			this.lastX = e.touches[0].clientX;
			this.distX = this.lastX - this.startX;
			this.lastY = e.touches[0].clientY;
			this.distY = this.lastY - this.startY;
			// console.log(this.distX, this.distY);
			requestAnimationFrame(this._moveSlide.bind(this, e));
		}
	}
	
	_handleTouchEnd() {
		this.$el.classList.remove('is-move');
		
		if (this.isMove) {
			requestAnimationFrame(this._endSlide.bind(this));
		}
	}
	
	_moveSlide(e) {
		if (this.isScroll) { return; }
		
		if (this.isSlide) {
			this.$list.style.transform = 'translate3d(' + this.distX + 'px,0,0)';
		} else if (Math.abs(this.distY) < Math.abs(this.distX)) {
			e.preventDefault();
			this.$list.style.transform = 'translate3d(' + this.distX + 'px,0,0)';
			this.isSlide = true;
		} else {
			this.isScroll = true;
		}
	}
	
	_endSlide() {
		this.$list.style.transition = 'transform .75s ease';
		this.$list.style.transform  = 'translate3d(0,0,0)';
		
		if (Math.abs(this.distX) >= 60) {
			if (this.distX < 0) {
				this._navNext();
			} else {
				this._navPrev();
			}
		}
		
		this.isMove = this.isScroll = this.isSlide = false;
		this.distX = this.distY = 0;
	}
	
	
	
	/**
	 * @public
	 */
	
	init() {
		this._initList();
		if (document.querySelector('.ua-Pointer')) {
			this._initPager();
		} else {
			this._initTouch();
		}
	}
};

})();


TIB.Util = class _Util {
	static delegate(event, targSelector, wrapSelector, callback) {
		let $wrap = document.querySelector(wrapSelector);
		
		$wrap.addEventListener(event, function(e) {
			let $target = e.target;
			
			while ( $target && !$target.matches(targSelector + ',' + wrapSelector) ) {
				$target = $target.parentNode;
			}
			if ($target && $target.matches(targSelector)) {
				callback(e, $target);
			}
		});
	}
	
	
	/**
	 * Ref: https://gist.github.com/gf3/132080/110d1b68d7328d7bfe7e36617f7df85679a08968
	 */
	static fetchJSONP(url, param) {
		let unique = 0;
		
		return new Promise(rs => {
			const script = document.createElement('script');
			const name = `_jsonp_${unique++}`;
			
			let query = '';
			if (param) {
				query = '?';
				for (let key in param) {
					query += key + '=' + param[key] + '&';
				}
				query = query.slice(0, -1);
			}
			
			url = TIB.API_DOMAIN + url + query;
			
			if (url.match(/\?/)) {
				url += `&callback=${name}`;
			} else {
				url += `?callback=${name}`;
			}
			
			script.src = url;
			window[name] = json => {
				rs(new Response(JSON.stringify(json)));
				script.remove();
				delete window[name];
			};
			
			document.body.appendChild(script);
		}).then(function(res) {
			return res.json();
		});
	}
	
	static fixSafariFlexBasis() {
		let doc = document;
		
		let $html = doc.getElementsByTagName('html')[0];
		if (!$html.classList.contains('ua-Safari') &&
			!$html.classList.contains('ua-iPhone') &&
			!$html.classList.contains('ua-iPad')) {
			return;
		}
		
		let options = doc.querySelectorAll('.nmf-option');
		if (!options.length) return;
		
		let lineHeight = parseInt(getComputedStyle(options[0], null).getPropertyValue('line-height'));
		for (let i = 0; i < options.length; i++) {
			if (options[i].clientHeight > lineHeight) {
				options[i].style.flexBasis = '100%';
				options[i].style.webkitFlexBais = '100%';
			}
		}
	}
	
	/**
	 * Smoothy scrolling
	 * Ref: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
	 * @param {Object} element - The scrolled element
	 * @param {Number} target - Target `scrollTop` value
	 * @param {Number} duration - Scrolling duration
	 * @returns {Promise} A Promise object after scroll ending
	 */
	static scroll(element, target, duration) {
		target = Math.round(target);
		duration = Math.round(duration);
		/*if (duration < 0) {
			return Promise.reject("bad duration");
		}*/
		if (duration === 0) {
			element.scrollTop = target;
			return Promise.resolve();
		}
		
		var start_time = Date.now();
		var end_time = start_time + duration;
		
		var start_top = element.scrollTop;
		var distance = target - start_top;
		
		// based on http://en.wikipedia.org/wiki/Smoothstep
		var smooth_step = function (start, end, point) {
			if (point <= start) { return 0; }
			if (point >= end) { return 1; }
			var x = (point - start) / (end - start); // interpolation
			return x * x * (3 - 2 * x);
		}
		
		return new Promise(function (resolve/*, reject*/) {
			// This is to keep track of where the element's scrollTop is
			// supposed to be, based on what we're doing
			var previous_top = element.scrollTop;
			
			// This is like a think function from a game loop
			var scroll_frame = function () {
				/*if (element.scrollTop != previous_top) {
					reject("interrupted");
					return;
				}*/
				
				// set the scrollTop for this frame
				var now = Date.now();
				var point = smooth_step(start_time, end_time, now);
				var frameTop = Math.round(start_top + (distance * point));
				element.scrollTop = frameTop;
				
				// check if we're done!
				if (now >= end_time) {
					resolve();
					return;
				}
				
				// If we were supposed to scroll but didn't, then we
				// probably hit the limit, so consider it done; not
				// interrupted.
				if (element.scrollTop === previous_top
					&& element.scrollTop !== frameTop) {
					resolve();
					return;
				}
				previous_top = element.scrollTop;
				
				// schedule next frame for execution
				setTimeout(scroll_frame, 0);
			}
			
			// boostrap the animation process
			setTimeout(scroll_frame, 0);
		});
	}
	
	static template(tmplId, tmplData) {
		let tmplText = document.getElementById(tmplId).text;
		let tmplFunc = doT.template(tmplText);
		return tmplFunc(tmplData);
	}
	
	
	/**
	 * Configure WeChat JS-SDK
	 * Ref: http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS%E6%8E%A5%E5%8F%A3
	 * @param {Object}  options
	 * @param {boolean} options.debug     - 开启调试模式，调用的所有api的返回值会在客户端alert出来
	 * @param {string}  options.appId     - 必填，企业号的唯一标识，此处填写企业号corpid
	 * @param {string}  options.timestamp - 必填，生成签名的时间戳
	 * @param {string}  options.nonceStr  - 必填，生成签名的随机串
	 * @param {string}  options.signature - 必填，签名，见附录1
	 * @param {Array}   options.jsApiList - 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	 */
	static wxConfig(options) {
		wx.config({
			debug:     options.debug,
			appId:     options.appId,
			timestamp: options.timestamp,
			nonceStr:  options.nonceStr,
			signature: options.signature,
			jsApiList: options.jsApiList
		});
	}
	
	static wxOnMenuShare(options) {
		wx.onMenuShareTimeline({
			title:   options.title,
			link:    options.link,
			imgUrl:  options.imgUrl,
			success: options.successCallback || function(){},
			cancel:  options.cancelCallback  || function(){}
		});
		wx.onMenuShareAppMessage({
			title:   options.title,
			desc:    options.desc,
			link:    options.link,
			imgUrl:  options.imgUrl,
			type:    options.type || 'link',
			dataUrl: options.dataUrl || '',
			success: options.successCallback || function(){},
			cancel:  options.cancelCallback  || function(){}
		});
		wx.onMenuShareQQ({
			title:   options.title,
			desc:    options.desc,
			link:    options.link,
			imgUrl:  options.imgUrl,
			success: options.successCallback || function(){},
			cancel:  options.cancelCallback  || function(){}
		});
		wx.onMenuShareWeibo({
			title:   options.title,
			desc:    options.desc,
			link:    options.link,
			imgUrl:  options.imgUrl,
			success: options.successCallback || function(){},
			cancel:  options.cancelCallback  || function(){}
		});
		wx.onMenuShareQZone({
			title:   options.title,
			desc:    options.desc,
			link:    options.link,
			imgUrl:  options.imgUrl,
			success: options.successCallback || function(){},
			cancel:  options.cancelCallback  || function(){}
		});
	}
};


/*=== Prepend ===*/

/*--- Polyfill ---*/
// @	codekit-prepend "polyfill/fetch.js";

/*--- Define ---*/
// @codekit-prepend "_define.js";

/*--- Misc ---*/
// @codekit-prepend "_misc.js";

/*--- Class ---*/
// @	codekit-prepend "class/ajax.js";
// @codekit-prepend "class/slideshow.js";
// @codekit-prepend "class/util.js";



/*=== Append  ===*/

/*--- View ---*/
// @codekit-append "view/home.js";


(function() { 'use strict';

if (document.querySelector('.home')) {
	let hero = new TIB.Slideshow({
		el:    '.slideshow',
		list:  '.slideshow-list',
		prev:  '.slideshow-pager--prev',
		next:  '.slideshow-pager--next'
	});
	hero.init();
}

})();


