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
		"all_banners": "http://autocontext.begun.ru/search/?cstr=xPE42E7CnkBav29BeDA7w4TGuScPCa81jYVm6QNDc-6L0BnZi2TMfNPyBDAp5z9*WMg5TbwaF*EVlB8r9s9Khc4RDOjN8GPgOCgEGLk58hh3uHHjO5q24r7aXSSVJgJwTy8EXFC9gUZOmm5G1cHMDWhhQLZShGPXbjWdGEbBIP*tlWZgTiEfOcwXTUKqtT8d5XatA-dEfhxl5lpb8KvVAt*w4ALjoOXflnkCRWhp5asIhW5dOl-wbd-gh904xYMRhJnI-Uu5*cn6FQUqYbv52NzhLoBQWi1pI8kle7E5",
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
		"thumbs_src": "thumbs02.begun.ru",
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
