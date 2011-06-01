var isFlash=(swfFLLocation.toUpperCase().indexOf('.SWF') != -1);

function getfv(){
 var d, n = navigator, f = 'Shockwave Flash';
 if((n = n.plugins) && n[f]){d = n[f].description}
 else if (window.ActiveXObject) { try { d = (new ActiveXObject((f+'.'+f).replace(/ /g,''))).GetVariable('$version');} catch (e) { try { new ActiveXObject((f+'.'+f+'.6').replace(/ /g,'')); d='WIN 6,0,21,0';} catch (e) {} }}
 return d ? d.replace(/\D+/,'').split(/\D+/) : [0,0];
};

function check(o) {
 return ((typeof(o) != "undefined") && (o != null));
}

function fill(pid,s) {
    var doc;
    if(document.all&&!window.opera){
	doc=window.frames['medialand_adland_frm_'+pid].document;
    }else{
	if(window.opera){
	    while(!document.getElementById("medialand_adland_frm_"+pid).contentDocument){};
	};
	doc=document.getElementById("medialand_adland_frm_"+pid).contentDocument;
    }
    if(check(doc)) {
	//doc.open();
	doc.writeln("<html><body>");
	doc.writeln(s);
	doc.writeln("</body></html>");
	doc.close();
    }
}

var str = '';
var obj_div = document.getElementById('medialand_adland_div_'+pid);
var obj_frm = document.getElementById('medialand_adland_frm_'+pid);

var contentVersion = 6;
if (isFlash && (parseInt(getfv()[0]) >= contentVersion)) {
  var mlfv = 'clickTAG=' + escape(swfFLClickTag) + 'clickTag=' + escape(swfFLClickTag) + '&link1=' + escape(swfFLClickTag) + '&target=_blank';
  var mls = (swfFLLocation.indexOf('?') != -1) ? '&' : '?';
  str += ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash2/cabs/swflash.cab#version=4,0,0,0" width="'+swfFLAdWidth+'" height="'+swfFLAdHeight+'">');
  str += ('<param name="movie" value="' + swfFLLocation + mls + mlfv + '">');
  str += ('  <param name="flashvars" value="' + mlfv + '">');
  str += ('  <param name="quality" value="high">');
  str += ('  <param name="play" value="true">');
  str += ('  <param name="wmode" value="opaque">')
  str += ('  <embed src="'+ swfFLLocation + mls + mlfv + '" quality="high" width="'+swfFLAdWidth+'" height="'+swfFLAdHeight+'" wmode="opaque" flashvars="' + mlfv + '" play="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">');
  str += ('  </embed>');
  str += ('</object>');
} else {
  str += ('<a href="'+swfFLClickTag+'" target="_blank"><img src="'+swfFLImage+'" width="'+swfFLAdWidth+'" height="'+swfFLAdHeight+'" border=0></a>');
}
str += ('<div style="visibility: hidden; position : absolute;">'+tracingCode+'<\/div>');

if(check(obj_div) && check(obj_frm)) {
//    obj_frm.width = swfFLAdWidth;
//    obj_frm.height = swfFLAdHeight;
//    fill(pid,str);
//    if(obj_frm.parentNode == obj_div) {
	obj_div.innerHTML=str;
	obj_div.style.display="inline";
	obj_div.style.width = swfFLAdWidth;
	obj_div.style.height = swfFLAdHeight;
//    }
}

