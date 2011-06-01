var begunAds = {
	"banners":
	{
		"autocontext":
		[
		],
		"hypercontext":
		[
		],
		"graph":
		[
		]
	},
	"stubs":
	{
		"all_banners": "http://autocontext.begun.ru/search/?cstr=xHuiUbBQGtczL*-G4aK2A6SzKuntAL8-molv886rejB6zMUnaHrIZBnS9C4r7i5uTRqf9s8UFft9mR9Y*M1Qw8sdVobP5Q-yMDBJDKw49RhmSeh9owgwfNHRLTaIOgRxTzNNclG47kdOmXNNudveCTRgWd9NgD3Jel6FFTZhiUQM*apiQjHf6c4IWEpiZSAC5HC0A-dYZhlo5llZ66HJzsVgwSPBnMUgRG8FWGC2NrcdiGaQKbXyY8f9gjA*LY8TlHPcFUe76QP-0BrPbJskAw07*FtkXy4",
		"behav_all_banners": "http://autocontext.begun.ru/search/?cstr=",
		"place_here": "http://autocontext.begun.ru/geoIpRedirect.php",
		"become_partner": "http://www.begun.ru/partner/?r1=Begun&r2=become_partner",
		"rambler_sbox_btn_text": "&#x41d;&#x430;&#x439;&#x442;&#x438;!",
		"rambler_sbox_auto": "",
		"rambler_sbox": ""
	},
	"blocks":
	[
		{
			"id": 201,
			"options": {
				"visual": {},
				"dimensions": {
					"type": ""
				},
				"banners_count": 1,
				"banners_count_coef": 1,
				"use_scroll": 0,
				"use_accordion": 0,
				"show_thumbnails": 0,
				"show_favicons": 0,
				"markup_lang": "notset",
				"rambler_search_box": "disabled",
				"misc_id": 0,
				"capacity": 1,
				"json": "",
				"view_type": "Usual,Rich",
				"block_options": ""
			}
		}
	],
	"links":
	[
		{
			"type": "204",
			"url": "http://begun.rambler.ru/sync.204?pid=16&uuid=ca8b79b2-8992-485f-b170-d911bf008e8b"
		},
		{
			"type": "js",
			"url": "http://autocontext.begun.ru/auto_rich.js"
		}
	],
	"params":
	{
		"multispan": 0,
		"thumbs": 0,
		"thumbs_src": "thumbs01.begun.ru",
		"icons": 0,
		"stub": 1,
		"autoscroll": 0,
		"showhref": 0,
		"behavshowhref": 0,
		"wide": 0,
		"is_mobile": 0,
		"extended_banner_info": "1"
	},
	"cookies":
	{
		"uuid" : "ca8b79b2-8992-485f-b170-d911bf008e8b"
	},
	"chain":
	[
	],
	"debug":
	{
	}
}

if (typeof Begun != 'undefined' && Begun.Autocontext && typeof Begun.Autocontext.Begun.News.loadFeedDone == 'function')
Begun.Autocontext.Begun.News.loadFeedDone();
else if (typeof Begun.News.loadFeedDone == 'function') Begun.News.loadFeedDone();
