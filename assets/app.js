var TIB=TIB||{};!function(){"use strict";for(var t=document,s=["iPhone","iPad","MQQBrowser","Android","MicroMessenger"],i=navigator.userAgent,e=t.getElementsByTagName("html")[0],n=0;n<s.length;n++){var r=new RegExp(s[n]);i.match(r)&&e.classList.add("ua-"+s[n])}-1!==i.indexOf("Safari")&&-1===i.indexOf("Chrome")&&e.classList.add("ua-Safari"),"ontouchstart"in window||e.classList.add("ua-Pointer"),t.getElementsByTagName("main")[0].addEventListener("touchstart",function(){}),t.getElementsByTagName("html")[0].setAttribute("lang","en"),setTimeout(function(){},0)}(),function(){"use strict";TIB.Slideshow=function(){function t(t){this.$el=document.querySelector(t.el),this.$list=this.$el.querySelector(t.list),this.$prev=this.$el.querySelector(t.prev),this.$next=this.$el.querySelector(t.next),this.index=0,this.startX=-1,this.startY=-1,this.lastX=-1,this.lastY=-1,this.distX=0,this.distY=0,this.isMove=!1,this.isSlide=!1,this.isScroll=!1}return t.prototype._initList=function(){var t=this._getIndexes(),s=t.currIdx,i=t.nextIdx,e=t.prevIdx,n=this.$list.children;n[s].classList.add("is-center"),n[e].classList.add("is-left"),n[i].classList.add("is-right")},t.prototype._initPager=function(){this._listenPagerClick()},t.prototype._initTouch=function(){this._listenTouchEvent()},t.prototype._listenPagerClick=function(){this.$prev.addEventListener("click",this._navPrev.bind(this)),this.$next.addEventListener("click",this._navNext.bind(this))},t.prototype._listenTouchEvent=function(){this.$el.addEventListener("touchstart",this._handleTouchStart.bind(this)),this.$el.addEventListener("touchmove",this._handleTouchMove.bind(this)),this.$el.addEventListener("touchend",this._handleTouchEnd.bind(this)),this.$el.addEventListener("touchcancel",this._handleTouchEnd.bind(this))},t.prototype._getIndexes=function(){var t=this.$list.children.length,s=this.index%t,i=(this.index+1)%t,e=(this.index-1)%t,n=(this.index+2)%t,r=(this.index-2)%t;return{currIdx:s<0?s+t:s,prevIdx:e<0?e+t:e,nextIdx:i<0?i+t:i,newPrev:r<0?r+t:r,newNext:n<0?n+t:n}},t.prototype._navPrev=function(){var t=this._getIndexes(),s=t.currIdx,i=t.nextIdx,e=t.prevIdx,n=t.newPrev;this.index--;var r=this.$el,h=this.$list.children;r.classList.remove("is-next"),r.classList.add("is-prev"),h[i].classList.remove("is-left","is-right"),h[s].classList.remove("is-center"),h[s].classList.add("is-right"),h[e].classList.remove("is-left"),h[e].classList.add("is-center"),h[n].classList.remove("is-right","is-center"),h[n].classList.add("is-left")},t.prototype._navNext=function(){var t=this._getIndexes(),s=t.currIdx,i=t.prevIdx,e=t.nextIdx,n=t.newNext;this.index++;var r=this.$el,h=this.$list.children;r.classList.remove("is-prev"),r.classList.add("is-next"),h[i].classList.remove("is-left","is-right"),h[s].classList.remove("is-center"),h[s].classList.add("is-left"),h[e].classList.remove("is-right"),h[e].classList.add("is-center"),h[n].classList.remove("is-left","is-center"),h[n].classList.add("is-right")},t.prototype._handleTouchStart=function(t){this.$el.classList.add("is-move"),this.$list.style.transition="none",this.lastX=this.startX=t.touches[0].clientX,this.lastY=this.startY=t.touches[0].clientY,this.isMove=!0},t.prototype._handleTouchMove=function(t){this.isScroll||(this.isSlide&&t.preventDefault(),this.isMove&&(this.lastX=t.touches[0].clientX,this.distX=this.lastX-this.startX,this.lastY=t.touches[0].clientY,this.distY=this.lastY-this.startY,requestAnimationFrame(this._moveSlide.bind(this,t))))},t.prototype._handleTouchEnd=function(){this.$el.classList.remove("is-move"),this.isMove&&requestAnimationFrame(this._endSlide.bind(this))},t.prototype._moveSlide=function(t){this.isScroll||(this.isSlide?this.$list.style.transform="translate3d("+this.distX+"px,0,0)":Math.abs(this.distY)<Math.abs(this.distX)?(t.preventDefault(),this.$list.style.transform="translate3d("+this.distX+"px,0,0)",this.isSlide=!0):this.isScroll=!0)},t.prototype._endSlide=function(){this.$list.style.transition="transform .75s ease",this.$list.style.transform="translate3d(0,0,0)",Math.abs(this.distX)>=60&&(this.distX<0?this._navNext():this._navPrev()),this.isMove=this.isScroll=this.isSlide=!1,this.distX=this.distY=0},t.prototype.init=function(){this._initList(),document.querySelector(".ua-Pointer")?this._initPager():this._initTouch()},t}()}(),function(){"use strict";if(document.querySelector(".home")){new TIB.Slideshow({el:".slideshow",list:".slideshow-list",prev:".slideshow-pager--prev",next:".slideshow-pager--next"}).init()}}(),System.register("_app",["_define.js","_misc.js","./class/slideshow.js","./view/home.js"],function(t,s){"use strict";var i=s&&s.id;return{setters:[function(t){},function(t){},function(t){},function(t){}],execute:function(){}}});