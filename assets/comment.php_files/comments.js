
function Insert(text){
if (text!="") paste("<i>"+text+"</i>\n", 0);
} 

function paste(text, flag){
    if (document.add_com) {
        if ((document.selection)&&(flag)) {
            document.add_com.comment.focus();
            document.add_com.document.selection.createRange().text = text;
        } else document.add_com.comment.value += text;
    }
}

var successPostFunc = function() {
        if(last){document.getElementById('reply_link'+last).style.display='none';}
        last='';
}
var successVoteFunc = function() {
        last='';
}


function answer (id){
        if(window.last)
        {
            var tmp;
            if (tmp = document.getElementById('reply'+last)) tmp.style.display='none';
        }
        var block = document.getElementById('form'+id);
        if (!block) return;
        var answerComment = document.getElementById('answerCommentBlock').innerHTML;
        var newhtml = answerComment.replace(/__REPLYTO__/g, id);;
        block.innerHTML = newhtml;
        var replyForm = document.getElementById('reply'+id);
        replyForm.style.display='inline';
        last=id;
}


function del (id){
        if(last2){document.getElementById('delete'+last2).style.display='none';}
        document.getElementById('delete'+id).style.display='inline';
        last2=id;
}

function scw (id){
        if(form_show){
                document.getElementById('comment_form').style.display='none';
                form_show='';
        } else {
                if(last){
                        document.getElementById('reply'+last).style.display='none';
                        last='';
                }
                document.getElementById('comment_form').style.display='inline';
                form_show='comment_form';
        }
}

function scom (id){
        if(document.getElementById('hide_com'+id).style.display != 'none' ){
                document.getElementById('hide_com'+id).style.display='none';
        } else {
                document.getElementById('hide_com'+id).style.display='inline';
        }
}

/*
function ins(name, target)
{
    target = target || "add_com";
    document[target].comment.value += name;
    document[target].comment.focus();
}
*/
function ins(name, target)
{
    target = target || "add_com";
    var start = document[target].comment.selectionStart;
    var end = document[target].comment.selectionEnd;
    
    var ta = document[target].comment;

    if(!document.all) 
    {
        ta.value = document[target].comment.value.substr(0, start) + name + document[target].comment.value.substr(end);
        ta.focus();
        ta.selectionStart = start+5;
        ta.selectionEnd = document[target].comment.selectionStart;
    }
    else
    {
        start = getIESelectionStart(ta);
        end = getIESelectionEnd(ta);
        ta.value = document[target].comment.value.substr(0, start) + name + document[target].comment.value.substr(end);
        setIESelection(ta, start+5);
    }
}

function getIESelectionStart(elem)
{
    elem.focus();
    if(elem.selectionStart) return elem.selectionStart;
    else if (document.selection)
    {
        var sel = document.selection.createRange();
        var clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(elem);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
    }
    return 0;
}

function getIESelectionEnd(elem)
{
        var start = getIESelectionStart(elem);
        var sel = document.selection.createRange();
        return sel.text.length+start;
}

function setIESelection(elem, start, end)
{
    var len = end && end > start ? end - start : 0;
    end = end && end > start ? end : start;
    var r = elem.createTextRange();
    r.moveStart("character", start);
    r.moveEnd("character", end-elem.value.length);
    r.select();
    elem.focus();
}

function insertQuote(text, elem)
{
    if (text=="") return false;
    elem.form.comment.value += "<i>"+text+"</i>\n";
    elem.form.comment.focus();
}

function get_selection() {
   if (document.getSelection){
    selection = document.getSelection();
    selection = selection.replace(/\r\n\r\n/gi, "_doublecaret_");
    selection = selection.replace(/\r\n/gi, " ");
       while (selection.indexOf("  ") !=-1) selection = selection.replace(/  /gi, "");
    selection = selection.replace(/_doublecaret_/gi, "\r\n\r\n");
  } else
      selection = document.selection.createRange().text;
}

function showComment(commentid)
{
    var note = document.getElementById("bcnotice_"+commentid);
    var block = document.getElementById("bcblock_"+commentid);
    if (!(note && block))
        return false;
    note.style.display="none";
    block.style.display="";
}

function voteComment(evt)
{
    evt = evt || event;
    var elem = evt.srcElement || evt.target;
    var trgt = $("replyTrgt");
    trgt.setAttribute("trgt", "");
    var id = elem.getAttribute("cid");
    var v = elem.getAttribute("voice");
    trgt.src = "\/valuation_com.php?c="+id+"&v="+v;
    elem.parentNode.innerHTML = "Ваш голос учтен. Спасибо.";
    
}