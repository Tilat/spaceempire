var mlfv = 'link1=' + LinkURL + '&clickTAG='+ LinkURL + '&target=_blank';
var mlsep = GetURL.indexOf('?') != -1 ? '&' : '?';
var mlstr = '';
mlstr += '<table border=0 height=100% width=100% cellspacing="0" cellpadding="0" valign="top" align="left"><tr>';
mlstr += '<td valign="top" align="left" height="'+height+'" width="'+width+'">';
mlstr += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash2/cabs/swflash.cab#version=4,0,0,0" width="'+width+'" height="'+height+'">';
mlstr += '<param name="movie" value="' + GetURL + mlsep + mlfv +'"';
mlstr += '<param name="quality" value="high">';
mlstr += '<param name="allowscriptaccess" value="always">';
mlstr += '<param name="flashvars" value="' + mlfv + '">';
mlstr += '<param name="wmode" value="opaque">';
//mlstr += '<param name="wmode" value="transparent">';
//mlstr += '<embed src="'+ GetURL + mlsep + mlfv +'" quality="high" allowscriptaccess="always" width="'+width+'" height="'+height+'" flashvars="'+ mlfv +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" wmode="opaque">';
mlstr += '<embed src="'+ GetURL + mlsep + mlfv +'" quality="high" allowscriptaccess="always" width="'+width+'" height="'+height+'" flashvars="'+ mlfv +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"' + ((!window.opera) ? ' wmode="opaque"' : ' wmode="transparent"') + '>';
mlstr += '</embed></object>';
mlstr += '</td></tr></table>';
if (typeof(tracing_code) != 'undefined') {
    mlstr += tracing_code;
}

document.write(mlstr);
