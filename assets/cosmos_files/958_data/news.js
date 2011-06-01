if (typeof Begun !== "object") {
	var Begun = {};
}
if (typeof Begun.loaderCallbacks === "undefined") {
	Begun.loaderCallbacks = [];
}

Begun.loaderCallbacks.push(begun_load_news);

function begun_load_news() {

	Begun.Scripts.importAllScripts({"acp/begun_utils.35105.js": true}); 

	Begun.Scripts.Callbacks['news'] = function(fileName) {

		if (!Begun.News && Begun.Scripts.isLastRequired(fileName)) {
			Begun.News = new function() {
				var _this = this;
				this.Strings = {
					urls: {
						daemon: 'http://autocontext.begun.ru/context.jsp?'
					}
				};
				this.requestParams = {
					"pad_id": '',
					"block_id": '',
					"n": '',
					"lmt": Date.parse(document.lastModified) / 1000,
					"sense_mode": 'custom', // wtf?
					"ut_screen_width": screen.width || 0,
					"ut_screen_height": screen.height || 0,
					"json": 1, // for json feed!
					"jscall": 'Begun.News.loadFeedDone', // called after feed load
					"condition_id": window.begun_condition_id || '',
					"force_js_link": '',
					"misc_id": window.begun_misc_id || window.misc_id,
					"overridden": '',
					"banner_filter": '',
					"stopwords": window.stopwords || '',
					"begun_self_keywords": window.begun_self_keywords || '',
					"ref": document.referrer,
					"real_refer": document.location
				};
				this.responseParams = {};
				this.prepareRequestParams = function(newValues) {
					var comma = "";
					_this.requestParams.pad_id = window.begun_auto_pad;
					_this.requestParams.block_id = window.begun_block_id;
					if (newValues) {
						Begun.extend(_this.requestParams, newValues);
					}
					var thePad = _this.getPad();
					if (typeof thePad.rq === "undefined") {
						thePad.rq = 0;
					} else {
						thePad.rq++;
					}
					if (typeof Begun.pageId === "undefined") {
						Begun.pageId = Math.floor(10000000000000 * Math.random() + (new Date()).valueOf());
					}
					_this.requestParams.rq = (thePad.rq).toString();
					_this.requestParams.page_id = Begun.pageId;
				};
				this.init = function() {
					if (typeof window.begun_callbacks !== "undefined") {
						Begun.News.Callbacks.register(window.begun_callbacks || {});
						window.begun_callbacks = null;
					}
					_this.Pads.init();
					_this.initCurrentBlock();
				};
				this.initCurrentBlock = function() {
					if (typeof window.begun_auto_pad !== "undefined" && window.begun_auto_pad > 0 && typeof window.begun_block_id !== "undefined" && window.begun_block_id > 0) {
						_this.initFeedLoad();
					}
				};
				this.initFeedLoad = function() {
					if (_this.isFeedStarted()) {
						return false;
					}
					_this.setFeedStarted();
					this.feedLoad();
					return false;
				};
				this.feedLoad = function(paramsUpdate) {
					_this.prepareRequestParams(paramsUpdate);
					Begun.Utils.includeScript(
						(_this.Strings.urls.daemon + Begun.Utils.toQuery(_this.requestParams)).substring(0, 1524).replace(/%[0-9a-fA-F]?$/, ''),
						'write', // only write!!
						undefined, // callback doesn't work properly in IE
						undefined,
						'begunAds'
					);
					_this.requestParams.block_id = "";
					_this.requestParams.begun_self_keywords = "";
					return true;
				};
				this.loadFeedDone = function() {
					_this.getPad().feed = window.begunAds;
					var ttt = _this.processData();
					_this.Callbacks.dispatch('news', 'draw', _this, [ttt]);
				};
				this.isFeedStarted = function() {
					return !!_this.getPad().feed_started;
				};
				this.setFeedStarted = function() {
					_this.getPad().feed_started = true;
				};
				this.getBannerIndex = function(pad_id, section, banner_id) {
					if (!banner_id) {
						return _this.getPad(pad_id).banner_index;
					} else {
						section = section || 'autocontext';
						var banner_index = 0;
						while (banner = _this.getBanner(section, banner_index, pad_id)) {
							if (banner.banner_id == banner_id) {
								return banner_index;
							}
							banner_index++;
						}
					}
				};
				this.getPad = function(pad_id) {
					return _this.Pads.getPad(pad_id || window.begun_auto_pad);
				};
				this.getFeed = function(pad_id) {
					return _this.getPad(pad_id).feed;
				};
				this.getBanner = function(type, index, pad_id) {
					try{
						return _this.getPad(pad_id).feed.banners[type][index];
					} catch(e) {
						return null;
					}
				};
				this.getBanners = function() {
					return _this.getFeed().banners;
				};
				this.processData = function() {
					var data = [];
					var i = 0;
					while (banner = Begun.News.getBanner('autocontext', i)) {
						data.push({
							"title": banner.title,
							"url": banner.url,
							"thematic_id": banner.thematics.split(',')[0],
							"banner_id": banner.banner_id,
							"condition_id": banner.condition_id,
							"keyword": banner.keyword
						});
						i++;
					}
					return data;
				};
			};
			
			(function() {
		
				Begun.News.Pads = new function() {
					var pads = [];
					this.init = function() {
						if (typeof window.begun_auto_pad !== "undefined" && !this.getPad()) {
							this.push(window.begun_auto_pad);
						}
					};
					this.push = function(pad_id) {
						pads[pads.length] = {
							pad_id: pad_id,
							feed: null,
							blocks: [],
							banner_index: 0,
							feed_started: false
						};
					};
					this.getPad = function(pad_id) {
						pad_id = pad_id || window.begun_auto_pad;
						for(var i=0, l=pads.length; i<l; i++) {
							if (pads[i].pad_id == pad_id) {
								return pads[i];
							}
						}
						return null;
					};
					this.getPads = function() {
						return pads;
					};
				};
		
				Begun.News.Callbacks = new function() {
					var _callbacks = {};
					var _extend = function(destination, source) {
						for (var property in source) {
							if (typeof source[property] == 'object') {
								var new_obj = {};
								for (var property2 in source[property]) {
									if (typeof source[property][property2] == 'function') {
										if ((typeof destination[property] !== "undefined") && (typeof destination[property][property2] == 'function')) {
											new_obj[property2] = function(old_func, new_func, property2) {
												return function(args) {
													old_func.apply(Begun.News, [args]);
													new_func.apply(Begun.News, [args]);
												};
											}(destination[property][property2], source[property][property2], property2);
										} else {
											new_obj[property2] = function(func, property2) {
												return function(args) {
													func.apply(Begun.News, [args]);
												};
											}(source[property][property2], property2);
										}
									}
								}
								destination[property] = new_obj;
							}
						}
						return destination;
					};
					this.register = function(callbacks) {
						_extend(_callbacks, callbacks);
					};
					this.dispatch = function(obj, method, context_obj, args) {
						if (_callbacks[obj] && typeof _callbacks[obj][method] == 'function') {
							args = args || [];
							_callbacks[obj][method].apply(context_obj || this, args);
						} else {
							return null;
						}
					};
					this.getCallbacks = function() {
						return _callbacks;
					};
				};
		
			})();
			
			Begun.News.init();
		}
	}

	if (typeof Begun.News === "object") {
		Begun.News.init();
	}

	Begun.Scripts.addStrictFunction(Begun.Scripts.Callbacks['news']);
}

if (typeof Begun.Scripts !== "object") {
	Begun.Scripts = {
		_baseUrl: window.begun_urls&&window.begun_urls.base_scripts_url?window.begun_urls.base_scripts_url:"http://autocontext.begun.ru/",
		_norm: function(scriptUrl, isStrict) {
			if (!scriptUrl) {
				return;
			}
			if ((scriptUrl.indexOf(this._baseUrl) !== 0) && (scriptUrl && scriptUrl.indexOf("http") === -1)) {
				scriptUrl = this._baseUrl + scriptUrl.replace(/\?.*$/, '');
			}
			if (!isStrict) {
				return scriptUrl;
			}
			return scriptUrl.replace(/acp\/([^.]+).[^.]*.js/,"$1.js");
		},
		importScript: function(scriptUrl) {
			document.write("<scr" + "ipt type=\"text/javascript\" src=\"" + this._norm(scriptUrl) + "\"></scr" + "ipt>");
		}
	};
	Begun.Scripts.importScript("acp/begun_scripts.35990.js");
} else {
	if (typeof Begun.Scripts.addStrictFunction !== "undefined") {
		begun_load_news();
	}
}

