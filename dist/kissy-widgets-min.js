/*
Copyright 2010, KISSY UI Library v1.0dev
MIT Licensed
build: 411 Jan 17 13:27
*/
KISSY.add("widget",function(l){function k(o,m){var j=this;if(!(j instanceof k))return new k(o,m);j.container=YAHOO.util.Dom.get(o);j.config=m||{}}l.Widget=k});
KISSY.add("switchable",function(l){function k(){}var o=YAHOO.util,m=o.Dom,j=o.Event,h=YAHOO.lang;k.Config={mackupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",panelCls:"ks-switchable-panel",triggers:[],panels:[],hasTriggers:true,triggerType:"mouse",delay:0.1,activeIndex:0,activeTriggerCls:"active",steps:1,viewSize:[]};l.Widget.prototype.switchable=function(b){var e=this;b=b||{};if(!("mackupType"in b))if(b.panelCls)b.mackupType=1;else if(b.panels)b.mackupType=
2;e.config.switchable=l.merge(k.Config,b||{});e.triggers=e.triggers||[];e.panels=e.panels||[];if(typeof e.activeIndex==="undefined")e.activeIndex=e.config.switchable.activeIndex;l.mix(e,k.prototype,false);e._initSwitchable();return e};l.mix(k.prototype,{_initSwitchable:function(){var b=this,e=b.config.switchable;b.panels.length===0&&b._parseSwitchableMackup();b.createEvent("beforeSwitch");b.createEvent("onSwitch");e.hasTriggers&&b._bindTriggers()},_parseSwitchableMackup:function(){var b=this,e=b.container,
c=b.config.switchable,f=c.hasTriggers,g,a=[],d=[],i=m.getElementsByClassName;switch(c.mackupType){case 0:if(g=i(c.navCls,"*",e)[0])a=m.getChildren(g);g=i(c.contentCls,"*",e)[0];d=m.getChildren(g);break;case 1:a=i(c.triggerCls,"*",e);d=i(c.panelCls,"*",e);break;case 2:a=c.triggers;d=c.panels;break}e=d.length;b.length=e/c.steps;if(f&&e>0&&a.length===0)a=b._generateTriggersMackup(b.length);if(f){c=0;for(f=a.length;c<f;c++)b.triggers.push(a[c])}for(c=0;c<e;c++)b.panels.push(d[c]);b.content=g||d[0].parentNode},
_generateTriggersMackup:function(b){var e=this,c=e.config.switchable,f=document.createElement("UL"),g,a;f.className=c.navCls;for(a=0;a<b;a++){g=document.createElement("LI");if(a===e.activeIndex)g.className=c.activeTriggerCls;g.innerHTML=a+1;f.appendChild(g)}e.container.appendChild(f);return m.getChildren(f)},_bindTriggers:function(){var b=this,e=b.config.switchable,c=b.triggers,f,g,a=c.length;for(g=0;g<a;g++)(function(d){f=c[d];j.on(f,"click",function(){b._onFocusTrigger(d)});j.on(f,"focus",function(){b._onFocusTrigger(d)});
if(e.triggerType==="mouse"){j.on(f,"mouseenter",function(){b._onMouseEnterTrigger(d)});j.on(f,"mouseleave",function(){b._onMouseLeaveTrigger(d)})}})(g)},_onFocusTrigger:function(b){var e=this;if(e.activeIndex!==b){e.switchTimer&&e.switchTimer.cancel();e.switchTo(b)}},_onMouseEnterTrigger:function(b){var e=this;if(e.activeIndex!==b)e.switchTimer=h.later(e.config.switchable.delay*1E3,e,function(){e.switchTo(b)})},_onMouseLeaveTrigger:function(){var b=this;b.switchTimer&&b.switchTimer.cancel()},switchTo:function(b,
e){var c=this,f=c.config.switchable,g=c.triggers,a=c.panels,d=c.activeIndex,i=f.steps,p=d*i,n=b*i;if(b===d)return c;if(!c.fireEvent("beforeSwitch",b))return c;if(f.hasTriggers)c._switchTrigger(d>-1?g[d]:null,g[b]);if(typeof e==="undefined")e=b>d?"forward":"forward";c._switchView(a.slice(p,p+i),a.slice(n,n+i),b,e);c.activeIndex=b;return c},_switchTrigger:function(b,e){var c=this.config.switchable.activeTriggerCls;b&&m.removeClass(b,c);m.addClass(e,c)},_switchView:function(b,e,c){m.setStyle(b,"display",
"none");m.setStyle(e,"display","block");this.fireEvent("onSwitch",c)},prev:function(){var b=this,e=b.activeIndex;b.switchTo(e>0?e-1:b.length-1,"backward")},next:function(){var b=this,e=b.activeIndex;b.switchTo(e<b.length-1?e+1:0,"forward")}});l.augment(k,o.EventProvider);l.Switchable=k});
KISSY.add("switchable-autoplay",function(l){var k=YAHOO.util.Event,o=YAHOO.lang,m=l.Switchable;l.mix(m.Config,{autoplay:false,interval:5,pauseOnHover:true});l.weave(function(){var j=this,h=j.config.switchable;if(h.autoplay){if(h.pauseOnHover){k.on(j.container,"mouseenter",function(){j.paused=true});k.on(j.container,"mouseleave",function(){setTimeout(function(){j.paused=false},h.interval*1E3)})}j.autoplayTimer=o.later(h.interval*1E3,j,function(){j.paused||j.switchTo(j.activeIndex<j.length-1?j.activeIndex+
1:0)},null,true)}},"after",m.prototype,"_initSwitchable")});
KISSY.add("switchable-effect",function(l){var k=YAHOO.util,o=k.Dom,m=l.Switchable,j;l.mix(m.Config,{effect:"none",duration:0.5,easing:k.Easing.easeNone});m.Effects={none:function(h,b,e){o.setStyle(h,"display","none");o.setStyle(b,"display","block");e()},fade:function(h,b,e){if(h.length!==1)throw new Error("fade effect only supports steps == 1.");var c=this,f=c.config.switchable,g=h[0],a=b[0];c.anim&&c.anim.stop();o.setStyle(a,"opacity",1);c.anim=new k.Anim(g,{opacity:{to:0}},f.duration,f.easing);
c.anim.onComplete.subscribe(function(){c.anim=null;o.setStyle(a,"z-index",9);o.setStyle(g,"z-index",1);e()});c.anim.animate()},scroll:function(h,b,e,c){var f=this;h=f.config.switchable;b=h.effect==="scrollx";var g={};g[b?"left":"top"]={to:-(f.viewSize[b?0:1]*c)};f.anim&&f.anim.stop();f.anim=new k.Anim(f.content,g,h.duration,h.easing);f.anim.onComplete.subscribe(function(){f.anim=null;e()});f.anim.animate()}};j=m.Effects;j.scrollx=j.scrolly=j.scroll;l.weave(function(){var h=this,b=h.config.switchable,
e=b.effect,c=h.panels,f=b.steps,g=h.activeIndex*f,a=g+f-1,d=c.length;h.viewSize=[b.viewSize[0]||c[0].offsetWidth*f,b.viewSize[0]||c[0].offsetHeight*f];if(e!=="none"){for(b=0;b<d;b++)c[b].style.display="block";switch(e){case "scrollx":case "scrolly":h.content.style.position="absolute";h.content.parentNode.style.position="relative";if(e==="scrollx"){o.setStyle(c,"float","left");this.content.style.width=h.viewSize[0]*(d/f)+"px"}break;case "fade":for(b=0;b<d;b++){o.setStyle(c[b],"opacity",b>=g&&b<=a?
1:0);c[b].style.position="absolute";c[b].style.zIndex=b>=g&&b<=a?9:1}break}}},"after",m.prototype,"_initSwitchable");l.mix(m.prototype,{_switchView:function(h,b,e,c){var f=this,g=f.config.switchable.effect;(typeof g==="function"?g:j[g]).call(f,h,b,function(){f.fireEvent("onSwitch",e)},e,c)}})});
KISSY.add("switchable-circular",function(l){function k(n,r,u,s,v){var q=this;n=q.config[h];r=q.length;var w=q.activeIndex,t=n.scrollType===i,x=t?e:c,y=q.viewSize[t?0:1];t=-y*s;var A={},B,z=v===d;if(B=z&&w===0&&s===r-1||v===a&&w===r-1&&s===0)t=o.call(q,q.panels,s,z,x,y);A[x]={to:t};q.anim&&q.anim.stop();q.anim=new j.Anim(q.content,A,n.duration,n.easing);q.anim.onComplete.subscribe(function(){B&&m.call(q,q.panels,s,z,x,y);q.anim=null;u()});q.anim.animate()}function o(n,r,u,s,v){var q=this;r=q.config[h].steps;
q=q.length;var w=u?q-1:0,t=(w+1)*r;for(r=w*r;r<t;r++){n[r].style.position=b;n[r].style[s]=(u?"-":g)+v*q+f}return u?v:-v*q}function m(n,r,u,s,v){r=this;var q=r.config[h].steps,w=r.length,t=u?w-1:0,x=(t+1)*q;for(q=t*q;q<x;q++){n[q].style.position=g;n[q].style[s]=g}r.content.style[s]=u?-v*(w-1)+f:g}var j=YAHOO.util,h="switchable",b="relative",e="left",c="top",f="px",g="",a="forward",d="backward",i="scrollx",p=l.Switchable;l.mix(p.Config,{circular:false});l.weave(function(){var n=this.config[h];if(n.circular&&
(n.effect===i||n.effect==="scrolly")){n.scrollType=n.effect;n.effect=k}},"after",p.prototype,"_initSwitchable")});
KISSY.add("switchable-lazyload",function(l){var k=YAHOO.util.Dom,o="beforeSwitch",m="img-src",j="textarea-data",h={},b=l.Switchable,e=l.DataLazyload;h[m]="data-lazyload-src-custom";h[j]="ks-datalazyload-custom";l.mix(b.Config,{lazyDataType:"",lazyDataFlag:""});l.weave(function(){function c(p){var n=a.steps;p=p*n;e.loadCustomLazyData(g.panels.slice(p,p+n),d,i);f()&&g.unsubscribe(o,c)}function f(){var p,n,r;if(d===m){p=g.container.getElementsByTagName("img");n=0;for(r=p.length;n<r;n++)if(p[n].getAttribute(i))return false}else if(d===
j){p=g.container.getElementsByTagName("textarea");n=0;for(r=p.length;n<r;n++)if(k.hasClass(p[n],i))return false}return true}var g=this,a=g.config.switchable,d=a.lazyDataType,i=a.lazyDataFlag||h[d];!e||!d||!i||g.subscribe(o,c)},"after",b.prototype,"_initSwitchable")});
KISSY.add("tabs",function(l){function k(m,j){var h=this;if(!(h instanceof k))return new k(m,j);k.superclass.constructor.call(h,m,j);h.switchable(h.config);h.config=h.config[o];h.config[o]=h.config}var o="switchable";l.extend(k,l.Widget);l.Tabs=k});
KISSY.add("slide",function(l){function k(j,h){var b=this;if(!(b instanceof k))return new k(j,h);h=l.merge(m,h||{});k.superclass.constructor.call(b,j,h);b.switchable(b.config);b.config=b.config[o];b.config[o]=b.config}var o="switchable",m={autoplay:true,circular:true};l.extend(k,l.Widget);l.Slide=k});
KISSY.add("carousel",function(l){function k(j,h){var b=this;if(!(b instanceof k))return new k(j,h);h=l.merge(m,h||{});k.superclass.constructor.call(b,j,h);b.switchable(b.config);b.config=b.config[o];b.config[o]=b.config}var o="switchable",m={circular:true};l.extend(k,l.Widget);l.Carousel=k});
KISSY.add("megamenu",function(l){function k(c,f){var g=this;if(!(g instanceof k))return new k(c,f);f=l.merge(e,f||{});k.superclass.constructor.call(g,c,f);g.switchable(g.config);g.config=g.config[b];g.config[b]=g.config;g._init()}var o=YAHOO.util,m=o.Dom,j=o.Event,h=YAHOO.lang,b="switchable",e={hideDelay:0.5,viewCls:"ks-megamenu-view",closeBtnCls:"ks-megamenu-closebtn",showCloseBtn:true,activeIndex:-1};l.extend(k,l.Widget);l.mix(k.prototype,{_init:function(){var c=this;c._initView();c.config.showCloseBtn&&
c._initCloseBtn()},_onFocusTrigger:function(c){var f=this;if(f.activeIndex!==c){f.switchTimer&&f.switchTimer.cancel();f.hideTimer&&f.hideTimer.cancel();f.switchTo(c)}},_onMouseEnterTrigger:function(c){var f=this;f.hideTimer&&f.hideTimer.cancel();f.switchTimer=h.later(f.config.delay*1E3,f,function(){f.switchTo(c)})},_onMouseLeaveTrigger:function(){var c=this;c.switchTimer&&c.switchTimer.cancel();c.hideTimer=h.later(c.config.hideDelay*1E3,c,function(){c.hide()})},_initView:function(){var c=this,f=c.config,
g=m.getElementsByClassName(f.viewCls,"*",c.container)[0];if(!g){g=document.createElement("DIV");g.className=f.viewCls;c.container.appendChild(g)}j.on(g,"mouseenter",function(){c.hideTimer&&c.hideTimer.cancel()});j.on(g,"mouseleave",function(){c.hideTimer=h.later(f.hideDelay*1E3,c,"hide")});c.viewContent=g;c.view=g},_initCloseBtn:function(){var c=this,f,g=c.view;g.innerHTML='<span class="{hook_cls}"></span>'.replace("{hook_cls}",c.config.closeBtnCls);j.on(g.firstChild,"click",function(){c.hide()});
f=document.createElement("div");g.appendChild(f);c.viewContent=f},_switchView:function(c,f,g){c=this;c.view.style.display="block";c.viewContent.innerHTML=f[0].innerHTML;c.fireEvent("onSwitch",g)},hide:function(){var c=this;m.removeClass(c.triggers[c.activeIndex],c.config.activeTriggerCls);c.view.style.display="none";c.activeIndex=-1}});l.MegaMenu=k});
KISSY.add("suggest",function(l){l.Suggest=KISSY.Suggest?KISSY.Suggest:(KISSY.Suggest=function(){function k(a,d,i){if(!(this instanceof arguments.callee))return new arguments.callee(a,d,i);this.textInput=m.get(a);this.dataSource=d;this.JSONDataSource=h.isObject(d)?d:null;this.returnedData=null;this.config=h.merge(g,i||{});this.container=null;this.queryParams=this.query="";this._timer=null;this._isRunning=false;this.dataScript=null;this._dataCache={};this._latestScriptTime="";this._onKeyboardSelecting=
this._scriptDataIsOut=false;this.selectedItem=null;this._init()}var o=YAHOO.util,m=o.Dom,j=o.Event,h=YAHOO.lang,b=window,e=document,c=e.getElementsByTagName("head")[0],f=YAHOO.env.ua.ie,g={containerClass:"",containerWidth:"auto",resultFormat:"\u7ea6%result%\u6761\u7ed3\u679c",showCloseBtn:false,closeBtnText:"\u5173\u95ed",useShim:f===6,timerDelay:200,autoFocus:false,submitFormOnClickSelect:true};l.mix(k.prototype,{_init:function(){this._initTextInput();this._initContainer();this.config.useShim&&this._initShim();this._initStyle();
this.createEvent("beforeDataRequest");this.createEvent("onDataReturn");this.createEvent("beforeShow");this.createEvent("onItemSelect");this._initResizeEvent()},_initTextInput:function(){var a=this;this.textInput.setAttribute("autocomplete","off");j.on(this.textInput,"blur",function(){a.stop();a.hide()});this.config.autoFocus&&this.textInput.focus();var d=0;j.on(this.textInput,"keydown",function(i){i=i.keyCode;switch(i){case 27:a.hide();a.textInput.value=a.query;break;case 13:a.textInput.blur();a._onKeyboardSelecting&&
a.textInput.value==a._getSelectedItemKey()&&a.fireEvent("onItemSelect",a.textInput.value);a._submitForm();break;case 40:case 38:if(d++==0){a._isRunning&&a.stop();a._onKeyboardSelecting=true;a.selectItem(i==40)}else if(d==3)d=0;break}if(i!=40&&i!=38){a._isRunning||a.start();a._onKeyboardSelecting=false}});j.on(this.textInput,"keyup",function(){d=0})},_initContainer:function(){var a=e.createElement("div"),d=this.config.containerClass;a.className="suggest-container";if(d)a.className+=" "+d;a.style.position=
"absolute";a.style.visibility="hidden";this.container=a;this._setContainerRegion();this._initContainerEvent();e.body.insertBefore(a,e.body.firstChild)},_setContainerRegion:function(){var a=m.getRegion(this.textInput),d=a.left,i=a.right-d-2;i=i>0?i:0;if(e.documentMode===7&&(f===7||f===8))d-=2;else YAHOO.env.ua.gecko&&d++;this.container.style.left=d+"px";this.container.style.top=a.bottom+"px";this.container.style.width=this.config.containerWidth=="auto"?i+"px":this.config.containerWidth},_initContainerEvent:function(){var a=
this;j.on(this.container,"mousemove",function(i){i=j.getTarget(i);if(i.nodeName!="LI")i=m.getAncestorByTagName(i,"li");if(m.isAncestor(a.container,i))if(i!=a.selectedItem){a._removeSelectedItem();a._setSelectedItem(i)}});var d=null;this.container.onmousedown=function(i){i=i||b.event;d=i.target||i.srcElement;a.textInput.onbeforedeactivate=function(){b.event.returnValue=false;a.textInput.onbeforedeactivate=null};return false};j.on(this.container,"mouseup",function(i){if(a._isInContainer(j.getXY(i))){i=
j.getTarget(i);if(i==d)if(i.className=="suggest-close-btn")a.hide();else{if(i.nodeName!="LI")i=m.getAncestorByTagName(i,"li");if(m.isAncestor(a.container,i)){a._updateInputFromSelectItem(i);a.fireEvent("onItemSelect",a.textInput.value);a.textInput.blur();a._submitForm()}}}})},_submitForm:function(){if(this.config.submitFormOnClickSelect){var a=this.textInput.form;if(a){if(e.createEvent){var d=e.createEvent("MouseEvents");d.initEvent("submit",true,false);a.dispatchEvent(d)}else e.createEventObject&&
a.fireEvent("onsubmit");a.submit()}}},_isInContainer:function(a){var d=m.getRegion(this.container);return a[0]>=d.left&&a[0]<=d.right&&a[1]>=d.top&&a[1]<=d.bottom},_initShim:function(){var a=e.createElement("iframe");a.src="about:blank";a.className="suggest-shim";a.style.position="absolute";a.style.visibility="hidden";a.style.border="none";this.container.shim=a;this._setShimRegion();e.body.insertBefore(a,e.body.firstChild)},_setShimRegion:function(){var a=this.container,d=a.shim;if(d){d.style.left=
parseInt(a.style.left)-2+"px";d.style.top=a.style.top;d.style.width=parseInt(a.style.width)+2+"px"}},_initStyle:function(){var a=m.get("suggest-style");if(!a){a=e.createElement("style");a.id="suggest-style";a.type="text/css";c.appendChild(a);if(a.styleSheet)a.styleSheet.cssText=".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}";
else a.appendChild(e.createTextNode(".suggest-container{background:white;border:1px solid #999;z-index:99999}.suggest-shim{z-index:99998}.suggest-container li{color:#404040;padding:1px 0 2px;font-size:12px;line-height:18px;float:left;width:100%}.suggest-container li.selected{background-color:#39F;cursor:default}.suggest-key{float:left;text-align:left;padding-left:5px}.suggest-result{float:right;text-align:right;padding-right:5px;color:green}.suggest-container li.selected span{color:#FFF;cursor:default}.suggest-bottom{padding:0 5px 5px}.suggest-close-btn{float:right}.suggest-container li,.suggest-bottom{overflow:hidden;zoom:1;clear:both}.suggest-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}"))}},
_initResizeEvent:function(){var a=this,d;j.on(b,"resize",function(){d&&clearTimeout(d);d=setTimeout(function(){a._setContainerRegion();a._setShimRegion()},50)})},start:function(){k.focusInstance=this;var a=this;a._timer=setTimeout(function(){a.updateContent();a._timer=setTimeout(arguments.callee,a.config.timerDelay)},a.config.timerDelay);this._isRunning=true},stop:function(){k.focusInstance=null;clearTimeout(this._timer);this._isRunning=false},show:function(){if(!this.isVisible()){var a=this.container,
d=a.shim;a.style.visibility="";if(d){if(!d.style.height){a=m.getRegion(a);d.style.height=a.bottom-a.top-2+"px"}d.style.visibility=""}}},hide:function(){if(this.isVisible()){var a=this.container,d=a.shim;if(d)d.style.visibility="hidden";a.style.visibility="hidden"}},isVisible:function(){return this.container.style.visibility!="hidden"},updateContent:function(){if(this._needUpdate()){this._updateQueryValueFromInput();var a=this.query;if(h.trim(a).length)if(typeof this._dataCache[a]!="undefined"){this.returnedData=
"using cache";this._fillContainer(this._dataCache[a]);this._displayContainer()}else this.JSONDataSource?this.handleResponse(this.JSONDataSource[a]):this.requestData();else{this._fillContainer("");this.hide()}}},_needUpdate:function(){return this.textInput.value!=this.query},requestData:function(){if(!f)this.dataScript=null;if(!this.dataScript){var a=e.createElement("script");a.type="text/javascript";a.charset="utf-8";c.insertBefore(a,c.firstChild);this.dataScript=a;if(!f){var d=(new Date).getTime();
this._latestScriptTime=d;a.setAttribute("time",d);j.on(a,"load",function(){this._scriptDataIsOut=a.getAttribute("time")!=this._latestScriptTime},this,true)}}this.queryParams="q="+encodeURIComponent(this.query)+"&code=utf-8&callback=g_ks_suggest_callback";this.fireEvent("beforeDataRequest",this.query);this.dataScript.src=this.dataSource+"?"+this.queryParams},handleResponse:function(a){if(!this._scriptDataIsOut){this.returnedData=a;this.fireEvent("onDataReturn",a);this.returnedData=this.formatData(this.returnedData);
var d="";a=this.returnedData.length;if(a>0){d=e.createElement("ol");for(var i=0;i<a;++i){var p=this.returnedData[i],n=this.formatItem(p.key,p.result);n.setAttribute("key",p.key);d.appendChild(n)}d=d}this._fillContainer(d);a>0&&this.appendBottom();h.trim(this.container.innerHTML)&&this.fireEvent("beforeShow",this.container);this._dataCache[this.query]=this.container.innerHTML;this._displayContainer()}},formatData:function(a){var d=[];if(!a)return d;if(h.isArray(a.result))a=a.result;var i=a.length;
if(!i)return d;for(var p,n=0;n<i;++n){p=a[n];d[n]=h.isString(p)?{key:p}:h.isArray(p)&&p.length>=2?{key:p[0],result:p[1]}:p}return d},formatItem:function(a,d){var i=e.createElement("li"),p=e.createElement("span");p.className="suggest-key";p.appendChild(e.createTextNode(a));i.appendChild(p);if(typeof d!="undefined"){a=this.config.resultFormat.replace("%result%",d);if(h.trim(a)){d=e.createElement("span");d.className="suggest-result";d.appendChild(e.createTextNode(a));i.appendChild(d)}}return i},appendBottom:function(){var a=
e.createElement("div");a.className="suggest-bottom";if(this.config.showCloseBtn){var d=e.createElement("a");d.href="javascript: void(0)";d.setAttribute("target","_self");d.className="suggest-close-btn";d.appendChild(e.createTextNode(this.config.closeBtnText));a.appendChild(d)}h.trim(a.innerHTML)&&this.container.appendChild(a)},_fillContainer:function(a){if(a.nodeType==1){this.container.innerHTML="";this.container.appendChild(a)}else this.container.innerHTML=a;this.selectedItem=null},_displayContainer:function(){h.trim(this.container.innerHTML)?
this.show():this.hide()},selectItem:function(a){var d=this.container.getElementsByTagName("li");if(d.length!=0)if(this.isVisible()){if(this.selectedItem){a=m[a?"getNextSibling":"getPreviousSibling"](this.selectedItem);if(!a)this.textInput.value=this.query}else a=d[a?0:d.length-1];this._removeSelectedItem();if(a){this._setSelectedItem(a);this._updateInputFromSelectItem()}}else this.show()},_removeSelectedItem:function(){m.removeClass(this.selectedItem,"selected");this.selectedItem=null},_setSelectedItem:function(a){m.addClass(a,
"selected");this.selectedItem=a},_getSelectedItemKey:function(){if(!this.selectedItem)return"";return this.selectedItem.getAttribute("key")},_updateQueryValueFromInput:function(){this.query=this.textInput.value},_updateInputFromSelectItem:function(){this.textInput.value=this._getSelectedItemKey(this.selectedItem)}});l.augment(k,o.EventProvider);b.g_ks_suggest_callback=function(a){k.focusInstance&&setTimeout(function(){k.focusInstance.handleResponse(a)},0)};return k}())});
