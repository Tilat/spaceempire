function $(id)
{
    return document.getElementById(id);
}

function viewCloud(what){
    var y = what.offsetTop;
    var x = what.offsetLeft;
    document.getElementById("viewCloud").style.display='block';
    document.getElementById("viewCloud").style.top = y + 20 + 'px';
    document.getElementById("viewCloud").style.left = x + 10 + 'px';
}

function hideCloud(what){
    document.getElementById("viewCloud").style.display='none';
}

function replyResponse(elem)
{
    var id = elem.getAttribute("trgt");
    if (!id) 
    {
        return;
    }
    var cont = document.getElementById(id).parentNode;
    var text = elem.contentWindow.document.documentElement;
    text = text.innerHTML || text.textContent;
//    cont.innerHTML = (elem.contentDocument.documentElement || elem.contentWindow.document.documentElement).innerText;
    cont.innerHTML = text;
    cont.id="";
}
function submitSendReply(elem)
{
    document.getElementById("replyTrgt").setAttribute("trgt", elem.id);
/*    window.frames.replyTrgt.onclick = function(){alert (111)};
    window.frames.replyTrgt.onload=function()
    {
        alert (this.innerHTML); 
//        elem.parentNode.innerHTML = 'ответилось';
    }*/
}


function addToFav(id, evt)
{
    evt = evt || event;
    var elem = evt.target || evt.srcElement;
    var trgt = $("replyTrgt");
    trgt.setAttribute("trgt", "");
    trgt.src = "\/favorite.php?add="+id;
    elem.style.display="none";
    elem.nextSibling.style.display="";
}

function remFromFav(id, evt)
{
    evt = evt || event;
    var elem = evt.target || evt.srcElement;
    var trgt = $("replyTrgt");
    trgt.setAttribute("trgt", "");
    trgt.src = "\/favorite.php?add="+id;
    elem.style.display="none";
    elem.previousSibling.style.display="";
}