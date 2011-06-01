if (!window.VK) window.VK = {};

/*
 * easyXDM 
 * http://easyxdm.net/
 * Copyright(c) 2009, Oyvind Sean Kinsey, oyvind@kinsey.no.
 * 
 * MIT Licensed - http://easyxdm.net/license/mit.txt
 * 
 */
easyXDM={version:"2.0.1.77",apply:function(d,b,c){if(!b){return}for(var a in b){if(b.hasOwnProperty(a)&&(!c||!d[a])){d[a]=b[a]}}},prepareTransportStack:function(a){var e=easyXDM.Url.Query(),j=a.protocol,h;a.isHost=a.isHost||(typeof e.xdm_p==="undefined");if(!a.isHost){a.channel=e.xdm_c;a.remote=decodeURIComponent(e.xdm_e);j=e.xdm_p}else{if(typeof j==="undefined"){a.remote=easyXDM.Url.resolveUrl(a.remote);if(window.postMessage){j="1"}else{if(a.remoteHelper){a.remoteHelper=easyXDM.Url.resolveUrl(a.remoteHelper);j="2"}else{j="0"}}a.channel=a.channel||"default"}}switch(j){case"0":a.interval=a.interval||300;a.delay=a.delay||2000;a.useResize=true;a.useParent=false;a.usePolling=false;if(a.isHost){var g={xdm_c:a.channel,xdm_p:0};if(!a.local){var c=location.protocol+"//"+location.host,f=document.body.getElementsByTagName("img"),d=f.length,b;while(d--){b=f[d];if(b.src.substring(0,c.length)===c){a.local=b.src;break}}if(!a.local){a.local=window}}if(a.local===window){a.usePolling=true;a.useParent=true;g.xdm_e=encodeURIComponent(a.local=location.protocol+"//"+location.host+location.pathname+location.search);g.xdm_pa=1}else{g.xdm_e=easyXDM.Url.resolveUrl(a.local)}if(a.container){a.useResize=false;g.xdm_po=1}a.remote=easyXDM.Url.appendQueryParameters(a.remote,g)}else{a.channel=e.xdm_c;a.remote=decodeURIComponent(e.xdm_e);a.useParent=(typeof e.xdm_pa!=="undefined");if(a.useParent){a.useResize=false}a.usePolling=(typeof e.xdm_po!=="undefined")}h=[new easyXDM.stack.HashTransport(a),new easyXDM.stack.ReliableBehavior({timeout:((a.useResize?50:a.interval*1.5)+(a.usePolling?a.interval*1.5:50))}),new easyXDM.stack.QueueBehavior({encode:true,maxLength:4000-a.remote.length}),new easyXDM.stack.VerifyBehavior({initiate:a.isHost})];break;case"1":h=[new easyXDM.stack.PostMessageTransport(a)];break;case"2":h=[new easyXDM.stack.NameTransport(a),new easyXDM.stack.QueueBehavior(),new easyXDM.stack.VerifyBehavior({initiate:a.isHost})];break}return h},createStack:function(d){var e,c={incoming:function(g,f){this.up.incoming(g,f)},outgoing:function(f,g){this.down.outgoing(f,g)},callback:function(f){this.up.callback(f)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var b=0,a=d.length;b<a;b++){e=d[b];this.apply(e,c,true);if(b!==0){e.down=d[b-1]}if(b!==a-1){e.up=d[b+1]}}return e}};easyXDM.stack={};easyXDM.DomHelper={createFrame:function(c,a,e,b){var g;function f(){e(g.contentWindow)}if(b&&window.attachEvent){var d=document.createElement("span");document.body.appendChild(d);if(a){d.innerHTML='<iframe src="'+c+'" id="'+b+'" name="'+b+'"></iframe>';g=d.firstChild;a.appendChild(g);document.body.removeChild(d)}else{d.innerHTML='<iframe style="position:absolute;left:-2000px;" src="'+c+'" id="'+b+'" name="'+b+'"></iframe>';g=d.firstChild}if(e){g.loadFn=f;this.on(g,"load",f)}}else{g=document.createElement("IFRAME");g.src=c;if(e){g.loadFn=f;this.on(g,"load",f)}if(a){a.appendChild(g)}else{g.style.position="absolute";g.style.left="-2000px";document.body.appendChild(g)}}if(b){g.id=g.name=b}return g},on:function(d,b,c,a){if(window.addEventListener){easyXDM.DomHelper.on=function(g,e,f){g.addEventListener(e,f,false)}}else{easyXDM.DomHelper.on=function(e,g,f){e.attachEvent("on"+g,f)}}easyXDM.DomHelper.on(d,b,c)},un:function(e,c,d,a){var b;if(window.removeEventListener){b=function(i,g,h,f){i.removeEventListener(g,h,f)}}else{b=function(f,h,g){f.detachEvent("on"+h,g)}}b(e,c,d);easyXDM.DomHelper.un=b},requiresJSON:function(a){if(typeof JSON=="undefined"||!JSON){document.write('<script type="text/javascript" src="'+a+'"><\/script>')}}};easyXDM.Fn={map:{},set:function(a,b){this.map[a]=b},get:function(b,a){var c=this.map[b];if(a){delete this.map[b]}return c}};easyXDM.Url={Query:function(){if(this._query){return this._query}this._query={};var f,d,e,c=location.search.substring(1).split("&");for(var b=0,a=c.length;b<a;b++){f=c[b];d=f.substring(0,f.indexOf("="));e=f.substring(d.length+1);this._query[d]=e}return this._query},getDomainName:function(a){var c=a.substring(a.indexOf("//")+2);c=c.substring(0,c.indexOf("/"));var b=c.indexOf(":");if(b!=-1){c=c.substring(0,b)}return c},getLocation:function(a){var b=a.indexOf("//");var c=a.substring(b+2);if(c.indexOf("/")==-1){return a}c=c.substring(0,c.indexOf("/"));return a.substring(0,b+2)+c},resolveUrl:function(b){var d=/\/[\d\w+%_\-]+\/\.\.\//,c=/([^:])\/\//g;b=b.replace(c,"$1/");while(d.test(b)){b=b.replace(d,"/")}if(b.match(/^(http||https):\/\//)){return b}var e=(b.substring(0,1)==="/")?"":location.pathname;if(e.substring(e.length-1)!=="/"){e=e.substring(0,e.lastIndexOf("/")+1)}var a=location.protocol+"//"+location.host+e+b;return a},appendQueryParameters:function(a,c){var d="";for(var b in c){if(c.hasOwnProperty(b)){d+=b+"="+c[b]+"&"}}return a+((a.indexOf("?")==-1)?"?":"&")+d.substring(0,d.length-1)}};easyXDM.Socket=function(b){var a=easyXDM.createStack(easyXDM.prepareTransportStack(b).concat([{incoming:function(e,d){b.onMessage(e,d)},callback:function(d){if(b.onReady){b.onReady(d)}}}])),c=easyXDM.Url.getLocation(b.remote);this.destroy=function(){a.destroy()};this.postMessage=function(d){a.outgoing(d,c)};a.init()};easyXDM.Rpc=function(c,b){var a=easyXDM.createStack(easyXDM.prepareTransportStack(c).concat([new easyXDM.stack.RpcBehavior(this,b),{callback:function(d){if(c.onReady){c.onReady(d)}}}]));this.destroy=function(){a.destroy()};a.init()};easyXDM.stack.PostMessageTransport=function(d){var f,g,b,c;function a(h){if(h.origin){return h.origin}if(h.uri){return easyXDM.Url.getLocation(h.uri)}if(h.domain){return location.protocol+"//"+h.domain}throw"Unable to retrieve the origin of the event"}function e(i){var h=a(i);if(h==c&&i.data.substring(0,d.channel.length+1)==d.channel+" "){f.up.incoming(i.data.substring(d.channel.length+1),h)}}return(f={outgoing:function(h,i){b.postMessage(d.channel+" "+h,i||c)},destroy:function(){easyXDM.DomHelper.un(window,"message",e);if(g){b=null;g.parentNode.removeChild(g);g=null}},init:function(){c=easyXDM.Url.getLocation(d.remote);if(d.isHost){easyXDM.DomHelper.on(window,"message",function h(i){if(i.data==d.channel+"-ready"){easyXDM.DomHelper.un(window,"message",h);easyXDM.DomHelper.on(window,"message",e);window.setTimeout(function(){f.up.callback(true)},0)}});g=easyXDM.DomHelper.createFrame(easyXDM.Url.appendQueryParameters(d.remote,{xdm_e:location.protocol+"//"+location.host,xdm_c:d.channel,xdm_p:1}),d.container,function(i){b=i})}else{easyXDM.DomHelper.on(window,"message",e);b=window.parent;b.postMessage(d.channel+"-ready",c);window.setTimeout(function(){f.up.callback(true)},0)}}})};easyXDM.stack.NameTransport=function(e){var f;var h,l,d,j,k,b,a;function i(o){var n=e.remoteHelper+(h?("#_3"+encodeURIComponent(a+"#"+e.channel)):("#_2"+e.channel));l.contentWindow.sendMessage(o,n)}function g(){if(h){if(++j===2||!h){f.up.callback(true)}}else{i("ready");f.up.callback(true)}}function m(n){f.up.incoming(n,b)}function c(){if(k){window.setTimeout(function(){k(true)},0)}}return(f={outgoing:function(o,p,n){k=n;i(o)},destroy:function(){l.parentNode.removeChild(l);l=null;if(h){d.parentNode.removeChild(d);d=null}},init:function(){h=e.isHost;j=0;b=easyXDM.Url.getLocation(e.remote);e.local=easyXDM.Url.resolveUrl(e.local);if(h){easyXDM.Fn.set(e.channel,function(n){if(h&&n==="ready"){easyXDM.Fn.set(e.channel,m);g()}});a=easyXDM.Url.appendQueryParameters(e.remote,{xdm_e:e.local,xdm_c:e.channel,xdm_p:2});d=easyXDM.DomHelper.createFrame(a+"#"+e.channel,e.container,null,e.channel)}else{e.remoteHelper=e.remote;easyXDM.Fn.set(e.channel,m)}l=easyXDM.DomHelper.createFrame(e.local+"#_4"+e.channel,null,function(){easyXDM.DomHelper.un(l,"load",l.loadFn);easyXDM.Fn.set(e.channel+"_load",c);g()})}})};easyXDM.stack.HashTransport=function(r){var p;var s=this,m,b,a,l,d,i,o;var f,k,c,g;function e(u){if(!o){return}var t=r.remote+"#"+(d++)+"_"+u;if(m||!k){o.contentWindow.location=t;if(c){o.width=o.width>75?50:100}}else{o.location=t}}function q(t){l=t;p.up.incoming(l.substring(l.indexOf("_")+1),g)}function h(t){q(i.location.hash)}function n(){if(i.location.hash&&i.location.hash!=l){q(i.location.hash)}}function j(){if(f){b=window.setInterval(n,a)}else{easyXDM.DomHelper.on(i,"resize",h)}}return(p={outgoing:function(t,u){e(t)},destroy:function(){if(f){window.clearInterval(b)}else{if(i){easyXDM.DomHelper.un(i,"resize",n)}}if(m||!k){o.parentNode.removeChild(o)}o=null},init:function(){m=r.isHost;a=r.interval;l="#"+r.channel;d=0;f=r.usePolling;k=r.useParent;c=r.useResize;g=easyXDM.Url.getLocation(r.remote);if(!m&&k){i=window;o=parent;j();p.up.callback(true)}else{o=easyXDM.DomHelper.createFrame((m?r.remote:r.remote+"#"+r.channel),r.container,(m&&k||!m)?function(){i=window;j();p.up.callback(true)}:null,(m?"local_":"remote_")+r.channel);if(m&&!k){var v=0,t=r.delay/50;(function u(){if(++v>t){throw new Error("Unable to reference listenerwindow")}if(i){return}try{i=o.contentWindow.frames["remote_"+r.channel];window.clearTimeout(b);j();p.up.callback(true);return}catch(w){window.setTimeout(u,50)}}())}}}})};easyXDM.stack.ReliableBehavior=function(c){var d,a,h,f,j=0,e=0,g=c.tries||5,i=c.timeout,b=0,k;return(d={incoming:function(n,l){var m=n.indexOf("_"),p=parseInt(n.substring(0,m),10),o;n=n.substring(m+1);m=n.indexOf("_");o=parseInt(n.substring(0,m),10);m=n.indexOf("_");n=n.substring(m+1);if(a&&p===j){window.clearTimeout(a);a=null;if(k){window.setTimeout(function(){k(true)},0)}}if(o!==0){if(o!==b){b=o;n=n.substring(o.length+1);d.down.outgoing(o+"_0_ack",l);window.setTimeout(function(){d.up.incoming(n,l)},c.timeout/2)}else{d.down.outgoing(o+"_0_ack",l)}}},outgoing:function(n,l,m){k=m;e=0;h={data:b+"_"+(++j)+"_"+n,origin:l};(function o(){a=null;if(++e>g){if(k){window.setTimeout(function(){k(false)},0)}}else{d.down.outgoing(h.data,h.origin);a=window.setTimeout(o,c.timeout)}}())},destroy:function(){if(a){window.clearInterval(a)}d.down.destroy()}})};easyXDM.stack.QueueBehavior=function(b){var d,e=[],i=false,c="",h,a=(b)?b.maxLength:0,f=(b)?(b.encode||false):false;function g(){if(i||e.length===0||h){return}i=true;var j=e.shift();d.down.outgoing(j.data,j.origin,function(k){i=false;if(j.callback){window.setTimeout(function(){j.callback(k)},0)}g()})}return(d={incoming:function(m,k){var l=m.indexOf("_"),j=parseInt(m.substring(0,l),10);c+=m.substring(l+1);if(j===0){if(f){c=decodeURIComponent(c)}d.up.incoming(c,k);c=""}},outgoing:function(n,k,m){if(f){n=encodeURIComponent(n)}var j=[],l;if(a){while(n.length!==0){l=n.substring(0,a);n=n.substring(l.length);j.push(l)}}else{j.push(n)}while((l=j.shift())){e.push({data:j.length+"_"+l,origin:k,callback:j.length===0?m:null})}g()},destroy:function(){h=true;d.down.destroy()}})};easyXDM.stack.VerifyBehavior=function(e){var f,d,b,c=false;function a(){d=Math.random().toString(16).substring(2);f.down.outgoing(d)}return(f={incoming:function(i,g){var h=i.indexOf("_");if(h===-1){if(i===d){f.up.callback(true)}else{if(!b){b=i;if(!e.initiate){a()}f.down.outgoing(i)}}}else{if(i.substring(0,h)===b){f.up.incoming(i.substring(h+1),g)}}},outgoing:function(i,g,h){f.down.outgoing(d+"_"+i,g,h)},callback:function(g){if(e.initiate){a()}}})};easyXDM.stack.RpcBehavior=function(c,b){var f,d=b.serializer||window.JSON;var a=0,e={};function g(j,i){if(typeof j.scope==="undefined"){j.scope=window}if(j.isVoid){return function(){var k=Array.prototype.slice.call(arguments,0);window.setTimeout(function(){f.down.outgoing(d.stringify({name:i,params:k}))},0)}}else{return function(){e[""+(++a)]=arguments[arguments.length-1];var k={name:i,id:(a),params:Array.prototype.slice.call(arguments,0,arguments.length-1)};f.down.outgoing(d.stringify(k))}}}function h(i,l,k,j){if(!k){throw new Error("The method "+i+" is not implemented.")}if(k.isAsync){j.push(function(m){f.down.outgoing(d.stringify({id:l,response:m}))});k.method.apply(k.scope,j)}else{if(k.isVoid){k.method.apply(k.scope,j)}else{f.down.outgoing(d.stringify({id:l,response:k.method.apply(k.scope,j)}))}}}return(f={incoming:function(j,i){var k=d.parse(j);if(k.name){h(k.name,k.id,b.local[k.name],k.params)}else{e[k.id](k.response);delete e[k.id]}},init:function(){if(b.remote){for(var i in b.remote){if(b.remote.hasOwnProperty(i)){c[i]=g(b.remote[i],i)}}}f.down.init()},destroy:function(){for(var i in c){if(c.hasOwnProperty(i)){delete c[i]}}f.down.destroy()}})};



/*
 * onDOMReady
 * Copyright (c) 2009 Ryan Morr (ryanmorr.com)
 * Licensed under the MIT license.
 */
if(!VK.onDOMReady) {
  VK.onDOMReady = function(fn,ctx){var ready,timer;var onStateChange=function(e){if(e&&e.type=="DOMContentLoaded"){fireDOMReady()}else if(e&&e.type=="load"){fireDOMReady()}else if(document.readyState){if((/loaded|complete/).test(document.readyState)){fireDOMReady()}else if(!!document.documentElement.doScroll){try{ready||document.documentElement.doScroll('left')}catch(e){return}fireDOMReady()}}};var fireDOMReady=function(){if(!ready){ready=true;fn.call(ctx||window);if(document.removeEventListener)document.removeEventListener("DOMContentLoaded",onStateChange,false);document.onreadystatechange=null;window.onload=null;clearInterval(timer);timer=null}};if(document.addEventListener)document.addEventListener("DOMContentLoaded",onStateChange,false);document.onreadystatechange=onStateChange;timer=setInterval(onStateChange,5);window.onload=onStateChange};
}

/*
 * Based on JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 */
if(!VK.MD5) {
  VK.MD5 = function(s) {
    var
    sa = function (x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    },
    rl =  function(x, n) {
      return (x << n) | (x >>> (32-n));
    },
    cmn = function(q, a, b, x, s, t) {
      return sa(rl(sa(sa(a, q), sa(x, t)), s), b);
    },
    ff = function (a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    },
    gg = function (a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    },
    hh = function (a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    },
    ii = function (a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    },
    core = function (x, len) {
      var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878,
      oa, ob, oc, od;
      x[len >> 5] |= 0x80 << ((len) % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;
      for(var i = 0, j = x.length; i < j; i += 16) {
        oa = a;
        ob = b;
        oc = c;
        od = d;
        a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = ff(c, d, a, b, x[i+ 2], 17, 606105819);
        b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = ff(d, a, b, c, x[i+ 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416);
        d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i+10], 17, -42063);
        b = ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = ff(a, b, c, d, x[i+12], 7 , 1804603682);
        d = ff(d, a, b, c, x[i+13], 12, -40341101);
        c = ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = ff(b, c, d, a, x[i+15], 22, 1236535329);
        a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = gg(c, d, a, b, x[i+11], 14, 643717713);
        b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = gg(d, a, b, c, x[i+10], 9 , 38016083);
        c = gg(c, d, a, b, x[i+15], 14, -660478335);
        b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = gg(a, b, c, d, x[i+ 9], 5 , 568446438);
        d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = gg(b, c, d, a, x[i+ 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = gg(c, d, a, b, x[i+ 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i+12], 20, -1926607734);
        a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i+11], 16, 1839030562);
        b = hh(b, c, d, a, x[i+14], 23, -35309556);
        a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = hh(d, a, b, c, x[i+ 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = hh(a, b, c, d, x[i+13], 4 , 681279174);
        d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = hh(b, c, d, a, x[i+ 6], 23, 76029189);
        a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = hh(d, a, b, c, x[i+12], 11, -421815835);
        c = hh(c, d, a, b, x[i+15], 16, 530742520);
        b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
        a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = ii(d, a, b, c, x[i+ 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = ii(a, b, c, d, x[i+12], 6 , 1700485571);
        d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i+10], 15, -1051523);
        b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359);
        d = ii(d, a, b, c, x[i+15], 10, -30611744);
        c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i+13], 21, 1309151649);
        a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = ii(c, d, a, b, x[i+ 2], 15, 718787259);
        b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
        a = sa(a, oa);
        b = sa(b, ob);
        c = sa(c, oc);
        d = sa(d, od);
      }
      return [a, b, c, d];
    },
    str2rstr_utf8 = function(input)
    {
      var output = "", i = -1, l = input.length, x, y;
      while(++i < l)
      {
        x = input.charCodeAt(i);
        y = i + 1 < l ? input.charCodeAt(i + 1) : 0;
        if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }
        if(x <= 0x7F)
          output += String.fromCharCode(x);
        else if(x <= 0x7FF)
          output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F), 0x80 | (x & 0x3F));
        else if(x <= 0xFFFF)
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        else if(x <= 0x1FFFFF)
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6 ) & 0x3F), 0x80 | (x & 0x3F));
      }
      return output;
    },
    rstr2binl = function(input)
    {
      var output = Array(input.length >> 2), i, j;
      for(i = 0, j = output.length; i < j; i++)
        output[i] = 0;
      for(i = 0, j = input.length * 8; i < j; i += 8)
        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
      return output;
    },
    binl2rstr = function(input)
    {
      var output = "";
      for(var i = 0, j = input.length * 32; i < j; i += 8)
        output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
      return output;
    },
    rstr_md5 = function (s) {
      return binl2rstr(core(rstr2binl(s), s.length * 8));
    },
    rstr2hex = function (input) {
      var hex = "0123456789abcdef", output = "", x;
      for(var i = 0, j = input.length; i < j; i++) {
        x = input.charCodeAt(i);
        output += hex.charAt((x >>> 4) & 0x0F) +  hex.charAt(x & 0x0F);
      }
      return output;
    };
    
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
  }
};


/*
 * VKontakte Open API JavaScript library
 * http://vkontakte.ru/
 */
VK.extend = function(target, source, overwrite) {
  for (var key in source) {
    if (overwrite || typeof target[key] === 'undefined') {
      target[key] = source[key];
    }
  }
  return target;
};

VK.extend(VK, { 
  _apiId: null,
  _session: null,
  _userStatus: 'unknown',
  _domain: {
    'main': window.location.protocol + '//vkontakte.ru/',
    'api': window.location.protocol + '//api.vkontakte.ru/'
  },
  _path: {
    login: 'login.php',
    proxy: 'xd_proxy.html',
    transport: 'xd_receiver.html',
    json: 'js/lib/json2.js'
  },
  _rootId: 'vk_api_transport',
  _nameTransportPath: '',
  xdReady: false,
  access: {
    FRIENDS:   0x2,
    PHOTOS:    0x4,
    AUDIO:     0x8,
    VIDEO:     0x10,
    MATCHES:   0x20,
    QUESTIONS: 0x40,
    WIKI:      0x80
  }
}, true);

VK.init = function(options) {
  var
    body,
    root;

  if (!options.apiId) {
    throw 'VK.init() called without an apiId'
  }  
  VK._apiId = options.apiId;
  
  if (!options.nameTransportPath || options.nameTransportPath == '') {
    throw 'VK.init() called without a nameTransportPath';
  }
  VK._nameTransportPath = options.nameTransportPath;

  root = document.getElementById(VK._rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = VK._rootId;
    body = document.getElementsByTagName('body')[0];
    body.insertBefore(root, body.childNodes[0]);
  }
  root.style.position = 'absolute';
  root.style.top = '-10000px';
  
  if(window.JSON) {
    this._lazyInit();
  } else {
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = VK._domain.main + VK._path.json;
    el.async = true;
    document.getElementById('vk_api_transport').appendChild(el);
    VK._jsonIntId = setInterval(this._lazyInit, 50);
  }
};
VK._lazyInit = function() {
  var
    session;

  if (window.JSON) {
    if (VK._jsonIntId) {
      clearInterval(VK._jsonIntId);
      delete VK._jsonIntId;
    }
    VK.XDM.init();
  } else {
    return false;
  }
}

if(!VK.Cookie) {
  VK.Cookie = {
    _domain: null,
    load: function() {
      var
        cookie = document.cookie.match('\\bvk_app_' + VK._apiId + '=([^;]*)\\b'),
        session;

      if (cookie) {
        session = this.decode(cookie[1]);
        session.expire = parseInt(session.expire, 10);
        VK.Cookie._domain = '.' + window.location.hostname;//session.base_domain;
      }

      return session;
    },
    setRaw: function(val, ts, domain) {
      var
        rawCookie;

      rawCookie = 'vk_app_' + VK._apiId + '=' + val + '';
      rawCookie += (val && ts == 0 ? '' : '; expires=' + new Date(ts * 1000).toGMTString());
      rawCookie += '; path=/';
      rawCookie += (domain ? '; domain=.' + domain : '');
      document.cookie = rawCookie;

      this._domain = domain;
    },
    set: function(session) {
      session
        ? this.setRaw(this.encode(session), session.expire, window.location.hostname)
        : this.clear();
    },
    clear: function() {
      this.setRaw('', 0, this._domain);
    },
    encode: function(params) {
      var
        pairs = [],
        key;
      
      for(key in params) {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
      pairs.sort();
      
      return pairs.join('&');
    },
    decode: function(str) {
      var
        params = {},
        parts = str.split('&'),
        i,
        pair;

      for (i=0; i<parts.length; i++) {
        pair = parts[i].split('=', 2);
        if (pair && pair[0]) {
          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
      }
      
      return params;
    }
  }
}

if(!VK.Api) {
  VK.Api = {
    _lastMethod: '',
    _lastParams: null,
    _lastCb: null,
    _repeatLast: false,
    call: function(method, params, cb) {
      var
        query = params || {},
        qs,
        responseCb;

      if(typeof query != 'object' || typeof cb != 'function') {
        return false;
      }

      if(!this._repeatLast) {
        this._lastMethod = method;
        this._lastParams = {};
        VK.extend(this._lastParams, query);
        this._lastCb = cb;
      }
      
      VK.extend(query, {
        api_id: VK._apiId,
        v: '3.0',
        format: 'JSON',
        method: method
      }, true);
      VK.extend(query, {
        sig: this.sign(query),
        sid: VK._session ? VK._session.sid : ''
      }, true);
      qs = VK.Cookie.encode(query);
      //console.log(qs);
      
      responseCb = function(response) {
        if(response.error && response.error.error_code == 5) {
          VK.Api._repeatLast = true;
          VK.Auth.getLoginStatus();
          VK.Observer.subscribe('auth.sessionChange', VK.Api.repeatCall);
        } else {
          cb(response);
        }
      };
      
      VK.XDM.remote.apiCall(qs, responseCb);
    },
    repeatCall: function(response) {
      VK.Observer.unsubscribe('auth.sessionChange', VK.Api.repeatCall);
      if(response.session) {
        VK.Api.call(VK.Api._lastMethod, VK.Api._lastParams, VK.Api._lastCb);
      }
      VK.Api.repeatLast = false;
    },
    sign: function(query) {
      var i, keys = [], sign;
      for(i in query) {
        keys.push(i.toString());
      }
      keys.sort();
      sign = VK._session ? VK._session.mid : 0;
      for(i=0; i<keys.length; i++) {
        sign += keys[i] + '=' + query[keys[i]];
      }
      sign += VK._session ? VK._session.secret : '';
      return VK.MD5(sign);
    }
  }
};

if(!VK.Auth) {
VK.Auth = {
  popup: null,
  setSession: function(session, status, settings) {
    var
      login = !VK._session && session,
      logout = VK._session && !session,
      both = VK._session && session && VK._session.mid != session.mid,
      sessionChange = login || logout || (VK._session && session && VK._session.sid != session.sid),
      statusChange = status != VK._userStatus,
      response = {
        'session': session,
        'status': status,
        'settings': settings
      };
    
    if(window.console) {
      console.log('login: '+login);
      console.log('logout '+logout);
      console.log('both: '+both);
      console.log('sessionChange: '+sessionChange);
      console.log('statusChange: '+statusChange);
    }
    VK._session = session;
    VK._userStatus = status;
    
    VK.Cookie.set(session);
    
    if (statusChange) {
      VK.Observer.publish('auth.statusChange', response);
    }
    if (logout || both) {
      VK.Observer.publish('auth.logout', response);
    }
    if (login || both) {
      VK.XDM.remote.init(VK._apiId, session, status);
      VK.Observer.publish('auth.login', response);
    }
    if (sessionChange) {
      VK.Observer.publish('auth.sessionChange', response);
    }
    
    if(VK.UI.active && !VK.UI.active.closed) {
      try {
        VK.UI.active.close();
      } catch (e) {};
      VK.Observer.publish('auth.onLogin', response);
      VK.Observer.unsubscribe('auth.onLogin');
    }
    
    return response;
  },
  /* Public VK.Auth methods */
  login: function(cb, settings) {
    /* Call this ONLY ON A USER EVENT as it opens a popup */
    var
      channel,
      url;

    if(!VK._apiId) {
      return false;
    }
    
    channel = window.location.protocol + '//' + window.location.hostname + VK._nameTransportPath;
    url = VK._domain.main + VK._path.login + '?app='+VK._apiId+'&layout=openapi&channel='+encodeURIComponent(channel);
    if(settings && parseInt(settings) > 0) {
      url += '&settings=' + settings;
    }

    VK.Observer.unsubscribe('auth.onLogin');
    VK.Observer.subscribe('auth.onLogin', cb);
    VK.UI.popup({
      width: 554,
      height: 277,
      url: url
    });
  },
  /* Logout user from app, vkontakte.ru & login.vk.com */
  logout: function(cb) {
    VK.XDM.remote.logout(cb);
  },
  /* Get current login status from session (sync) (not use on load time)*/
  getSession: function() {
    return VK._session;
  },
  /* Get current login status from vkontakte.ru (async) */
  getLoginStatus: function(cb, force) {
    if (!VK._apiId) {
      return;
    }

    if (cb) {
      if (!force && VK.Auth._loadState == 'loaded') {
        cb({status: VK._userStatus, session: VK._session});
        return;
      } else {
        VK.Observer.subscribe('auth.loginStatus', cb);
      }
    }

    if (!force && VK.Auth._loadState == 'loading') {
      return;
    }

    VK.Auth._loadState = 'loading';

    var lsCb = function(response) {
      VK.Auth._loadState = 'loaded';
      VK.Observer.publish('auth.loginStatus', response);
      VK.Observer.unsubscribe('auth.loginStatus');
    };
    VK.XDM.remote.getLoginStatus(lsCb);
  }
}
};

if (!VK.UI) {
  VK.UI = {
    active: null,
    _buttons: [],
    popup: function(options) {
      var
        screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
        screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
        outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
        outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
        width = options.width,
        height = options.height,
        left = parseInt(screenX + ((outerWidth - width) / 2), 10),
        top = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
        features = (
          'width=' + width +
          ',height=' + height +
          ',left=' + left +
          ',top=' + top
        );
      
      this.active = window.open(options.url, 'vk_openapi', features)
    },
    button: function(el, handler) {
      var html = '';
      if(typeof el == 'string') {
        el = document.getElementById(el);
      }

      this._buttons.push(el);
      index = this._buttons.length - 1;

      html = (
        '<table cellspacing="0" cellpadding="0" id="openapi_UI_' + index + '" onmouseover="VK.UI._change(1, ' + index + ');" onmouseout="VK.UI._change(0, ' + index + ');" onmousedown="VK.UI._change(2, ' + index + ');" onmouseup="VK.UI._change(1, ' + index + ');" style="cursor: pointer; border: 0px; font-family: tahoma; font-size: 10px;"><tr style="vertical-align: middle"><td></td>' +
        '<td><div style="border: 1px solid #3b6798;"><div style="border: 1px solid #5c82ab; border-top-color: #7e9cbc; background-color: #6d8fb3; color: #fff; text-shadow: 0px 1px #45688E; height: 15px; padding: 2px 4px 0px 6px;">Войти</div></div></td>' +
        '<td><div style="background: url('+VK._domain.main+'images/btns.png) 0px -42px no-repeat; width: 21px; height: 21px"></div></td>' +
        '<td><div style="border: 1px solid #3b6798;"><div style="border: 1px solid #5c82ab; border-top-color: #7e9cbc; background-color: #6d8fb3; color: #fff; text-shadow: 0px 1px #45688E; height: 15px; padding: 2px 6px 0px 4px;">Контакте</div></div></td><td></td>' +
        '</tr></table>'
      );
      el.innerHTML = html;
      el.style.width = el.childNodes[0].offsetWidth + 'px';
    },
    _change: function(state, index) {
      var row = document.getElementById('openapi_UI_' + index).rows[0];
      var elems = [row.cells[1].firstChild.firstChild, row.cells[3].firstChild.firstChild];
      for (var i = 0; i < 2; ++i) {
         var elem = elems[i];
        if (state == 0) {
          elem.style.backgroundColor = '#6D8FB3';
          elem.style.borderTopColor = '#7E9CBC';
          elem.style.borderLeftColor = elem.style.borderRightColor = elem.style.borderBottomColor = '#5C82AB';
        } else if (state == 1) {
          elem.style.backgroundColor = '#84A1BF';
          elem.style.borderTopColor = '#92ACC7';
          elem.style.borderLeftColor = elem.style.borderRightColor = elem.style.borderBottomColor = '#7293B7';
        } else if (state == 2) {
          elem.style.backgroundColor = '#6688AD';
          elem.style.borderBottomColor = '#7495B8';
          elem.style.borderLeftColor = elem.style.borderRightColor = elem.style.borderTopColor = '#51779F';
        }
      }
      var elems = [row.cells[0].firstChild, row.cells[4].firstChild];
      for (var i = 0; i < 2; ++i) {
        var elem = elems[i];
        if (elem) {
          if (state == 0) {
            elem.style.backgroundPosition = '-21px -' + (42 + i * 21) + 'px';
          } else if (state == 1) {
            elem.style.backgroundPosition = '-23px -' + (42 + i * 21) + 'px';
          } else if (state == 2) {
            elem.style.backgroundPosition = '-25px -' + (42 + i * 21) + 'px';
          }
        }
      }
      if (state == 0 || state == 2) {
        row.cells[2].firstChild.style.backgroundPosition = '0px -42px';
      } else if (state == 1) {
        row.cells[2].firstChild.style.backgroundPosition = '0px -63px';
      }
    }
  };
}

if (!VK.XDM) {
  VK.XDM = {
    remote: null,
    init: function() {
      this.remote = new easyXDM.Rpc({
        local: VK._nameTransportPath,
        remote: VK._domain.api + VK._path.proxy,
        remoteHelper: VK._domain.api + VK._path.transport,
        container: document.getElementById(VK._rootId),
        onReady: function() {
          session = VK.Cookie.load();
          VK.Auth.setSession(session, session ? 'connected' : 'unknown');
          VK.XDM.remote.init(VK._apiId, VK._session, VK._userStatus);
          VK.xdReady = true;
        }
      }, {
        remote: {
          init: {
            isVoid: true
          },
          apiCall: {},
          getLoginStatus: {},
          logout: {}
        },
        local: {
          setSession: {
            isVoid: true,
            method: function(session, status) {
              VK.Auth.setSession(session, status);
            }
          }
        }
      });
    },
    xdHandler: function(code) {
      try {
        eval('VK.' + code);
      } catch(e) {};
    }
  }
};

if (!VK.Observer) {
  VK.Observer = {
    _subscribers: function() {
      if (!this._subscribersMap) {
        this._subscribersMap = {};
      }
      return this._subscribersMap;
    },
    publish: function(eventName) {
      var
        args = Array.prototype.slice.call(arguments),
        eventName = args.shift(),
        subscribers = this._subscribers()[eventName],
        i, j;
    
      if (!subscribers) return;
    
      for (i = 0, j = subscribers.length; i < j; i++) {
        if(subscribers[i] != null) {
          subscribers[i].apply(this, args);
        }
      }
    },
    subscribe: function(eventName, handler) {
      var
        subscribers = this._subscribers();

      if(typeof handler != 'function') return false;
      
      if(!subscribers[eventName]) {
        subscribers[eventName] = [handler];
      } else {
        subscribers[eventName].push(handler);
      }
    },
    unsubscribe: function(eventName, handler) {
      var
        subscribers = this._subscribers()[eventName],
        i, j;
      
      if (!subscribers) return false;
      if (typeof handler == 'function') {
        for (i = 0, j = subscribers.length; i < j; i++) {
          if (subscribers[i] == handler) {
            subscribers[i] = null;
          }
        }
      } else {
        delete this._subscribers()[eventName];
      }
    }
  }
}

/* Init asynchronous library loading */
window.setTimeout(function() {
  if (window.vkAsyncInit) {
    vkAsyncInit();
  }
}, 0);