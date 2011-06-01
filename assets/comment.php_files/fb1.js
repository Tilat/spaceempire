var fishb_timer = false;
function show_fishb_popup(item)
{
    clearTimeout(fishb_timer);
    var left=0,top=0;
    var style=item.parentNode.lastChild.style;
    var element=item.parentNode.firstChild;

    while (element) {
        left+=element.offsetLeft;
        top+=element.offsetTop;
        element=element.offsetParent;
    }
    style.left=left+'px';
    style.top=top+17+'px';
    style.visibility='visible';
	item.parentNode.lastChild.style.visibility = 'visible';
}
function hide_fishb_popup(item)
{
    fishb_timer = setTimeout(
		function() {
			item.parentNode.lastChild.style.visibility = 'hidden';
		}
	,1000);
}
function fishb_selection()
{
	var sel='';
	if (window.getSelection)
		sel=window.getSelection();
	else if (document.selection)
		sel=document.selection.createRange();
	else
		sel='';
	if (sel.text)
		sel=sel.text;
	return sel;
}

function getBrowserInfo() {
 var t,v = undefined;
 if (window.opera) t = 'Opera';
 else if (document.all) {
  t = 'IE';
  var nv = navigator.appVersion;
  var s = nv.indexOf('MSIE')+5;
  v = nv.substring(s,s+1);
 }
 else if (navigator.appName) t = 'Netscape';
 return {type:t,version:v};
}

function bookmark(a){
 var url = window.document.location;
 var title = window.document.title;
 var b = getBrowserInfo();
 if (b.type == 'IE' && 7 > b.version && b.version >= 4) window.external.AddFavorite(url,title);
 else if (b.type == 'Opera') {
  a.href = url;
  a.rel = "sidebar";
  a.title = title;
  return true;
 }
 else if (b.type == "Netscape") window.sidebar.addPanel(title,url,"");
 else alert("Нажмите CTRL-D, чтобы добавить страницу в закладки браузера.");
 return false;
}

function fishbtn()
{
	var title=encodeURIComponent(document.title);
	var url=encodeURIComponent(location.href);

	this.links = [
		{name:'Memory', link:'http://memori.qip.ru/link/?sm=1&u_data[url]='+url+'&u_data[name]='+title, pos:'-320px 0' },
		{name:'БобрДобр', link:'http://bobrdobr.ru/addext.html?url='+url+'&title='+title, pos:'-320px -144px' },
		{name:'Google', link:'http://www.google.com/bookmarks/mark?op=add&bkmk='+url+'&title='+title, pos:'-320px -16px' },
		{name:'Яндекс', link:'http://zakladki.yandex.ru/userarea/links/addfromfav.asp?bAddLink_x=1&lurl='+url+'&lname='+title, pos:'-320px -160px' },
		{name:'Twitter', link:'http://twitter.com/home?status='+title+' '+url, pos:'-320px -32px' },
		{name:'Delicious', link:'http://del.icio.us/post?v=4&noui&jump=close&url='+url+'&title='+title, pos:'-320px -176px' },
		{name:'Yahoo!', link:'http://myweb2.search.yahoo.com/myresults/bookmarklet?u='+url+'&t='+title, pos:'-427px -112px' },
		{name:'Facebook', link:'http://www.facebook.com/share.php?u='+url+'&t='+title, pos:'-427px -144px' },
		{name:'LiveJournal', link:'http://www.livejournal.com/update.bml?subject='+title+'&event=%3Ca+href%3D%22'+url+'%22%3E'+title+'%3C%2Fa%3E%0A%0A', pos:'-427px -96px' },
		{name:'Текст 2.0', link:'http://text20.ru/add/?source='+url+'&title='+title+'&text='+fishb_selection(), pos:'-320px -48px' },
		{name:'News 2', link:'http://news2.ru/add_story.php?url='+url, pos:'-320px -192px' },
		{name:'MySpace', link:'http://www.myspace.com/Modules/PostTo/Pages/?u='+url+'&t='+title+'&c=%3Ca+href%3D%22'+url+'%3E'+title+'%3C%2Fa%3E%0A', pos:'-427px -128px' },
		{name:'Мистер Вонг', link:'http://www.mister-wong.ru/index.php?action=addurl&bm_url='+url+'&bm_description='+title, pos:'-320px -64px' },
		{name:'Моё Место', link:'http://moemesto.ru/post.php?url='+url+'&title='+title, pos:'-427px 0' },
		{name:'СМИ 2', link:'http://smi2.ru/add/?url='+url+'&precaption='+title, pos:'-320px -80px' },
		{name:'Baay!', link:'http://www.vaau.ru/submit/?action=step2&url='+url, pos:'-427px -16px' },
		{name:'LinkStore', link:'http://www.linkstore.ru/servlet/LinkStore?a=add&url='+url+'&title='+title, pos:'-427px -32px' },
		{name:'RuSpace', link:'http://www.ruspace.ru/index.php?link=bookmark&action=bookmarkNew&bm=1&url='+url+'&title='+title, pos:'-320px -112px' },
		{name:'Сто закладок', link:'http://www.100zakladok.ru/save/?bmurl='+url+'&bmtitle='+title, pos:'-427px -48px' },
		{name:'Микроблоги', link:'http://mblogi.qip.ru/knopka/?url='+url+'&title='+title, pos:'-427px -176px' }
	];

	var height = 121;
	var btype = '';
	if (btype == '')
	{
		var width = 108;
		btype = '.gif';
	} else {
		var width = 68;
		btype = '_small.png';
	}

	document.write('<div class="buttonbox">');
	document.write('<a id="fishb" onmouseover="show_fishb_popup(this)" onmouseout="hide_fishb_popup(this)" style="display:-moz-inline-box; display:inline-block; width:'+width+'px; height:14px; padding:2px 0 0 17px; color:#000; font-family:arial; font-size:10px; font-style:normal; font-weight:normal; font-variant:normal; color:#000; text-decoration:none; text-transform:uppercase; line-height:normal; font-size-adjust:none; text-align:left; background:url(http://knopka.fishurl.ru/i/knopka/bookmark'+btype+') no-repeat 0 0" title="Фишкина кнопка">Закладки</a>');
	document.write('<div onmouseover="show_fishb_popup(this)" onmouseout="hide_fishb_popup(this)" id="fishb_popup" style="position:absolute; left:0; top:17px; visibility:hidden;"><div style="height:'+height+'px;width:312px; z-index:1000; background:url(http://knopka.fishurl.ru/i/knopka/fishki.png) no-repeat 0 0; padding:8px 0 0 8px; margin:0; border:0">');
	document.write('<a onclick="return bookmark(this)"  href="#" style="display:block; float:left; width:82px; height:16px; overflow:hidden; padding:0 0 0 21px; margin:0 0 1px 0; font-family:arial; font-size:12px; font-style:normal; font-weight:normal; font-variant:normal; color:#000; text-decoration:none; line-height:normal; font-size-adjust:none; text-align:left">Закладки</a>');

	for(var l in this.links)
	{
		document.write('<a href="'+this.links[l].link+'" style="display:block; float:left; width:82px; height:16px; overflow:hidden; padding:0 0 0 21px; margin:0 0 1px 0; background:url(http://knopka.fishurl.ru/i/knopka/fishki.png) no-repeat '+this.links[l].pos+'; font-family:arial; font-size:12px; font-style:normal; font-weight:normal; font-variant:normal; color:#000; text-decoration:none; line-height:normal; font-size-adjust:none; text-align:left">'+this.links[l].name+'</a>');
	}
	document.write('</div>');
	document.write('<div style="position:absolute; left:0; top:'+(height+8)+'px;width:320px;height:18px;background:url(http://knopka.fishurl.ru/i/knopka/fishki.png) no-repeat 0px -177px; clear:both; font-family:arial; font-size:11px; font-style:normal; font-weight:normal; font-variant:normal; color:#20429f; text-decoration:none; line-height:normal; font-size-adjust:none; text-align:center"><a href="http://knopka.fishurl.ru">&copy;  Фишкина кнопка</a></div>');
	document.write('</div></div>');

}

fishbtn();
