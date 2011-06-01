var vksess, udata;

function doLogin() {
  VK.Auth.login(
    function(res){
        if (res && res.session)
        {
            vksess =  res.session; 
            getInitData();
        } else {
            vksess = false;
        }
    },
    VK.access.WIKI
  );
}
function doLogout() {
  VK.Auth.logout(function(){alert ("logout");});
}
function loginOpenAPI() {
  getInitData();
}
function getInitData() {
  var code;
  code = 'return {';
  code += 'me: API.getProfiles({uids: API.getVariable({key: 1280}), fields: "bdate,sex,nickname,uid,first_name,last_name,city,country,photo_medium", test_mode: "1"})[0]';
  code += '};';
  VK.Api.call('execute', {'code': code}, onGetInitData);
}



function onGetInitData(data) {
  var r;

  if (data.response) {
    r = data.response;
    udata = r.me;
        ses = vksess;
        if (ses && ses.expire && ses.mid && ses.secret && ses.sid && ses.sig)
        {
            var loc = "/kontakt/auth.php?expire="+ses.expire+"&mid="+ses.mid+"&secret="+ses.secret+"&sid="+ses.sid+"&sig="+ses.sig;

            if (udata && udata['sex'])
                loc += '\&udata[sex]='+(udata['sex'] == 2 ? 1 : 2);
            if (udata && (udata['first_name'] || udata['last_name']))
                loc += '&udata[fullname]='+udata['first_name']+" "+udata['last_name'];
            if (udata && udata['photo_medium'])
                loc += '&udata[img]='+udata['photo_medium'];
            window.location = loc;
        } else {
            alert ("Не удалось авторизоваться");
        }
  } else {
    alert("Не удалось авторизоваться");
  }
}



if (window.postMessage)
{
      window.vkAsyncInit = function() {
        VK.init({
          apiId: 1889104,
          nameTransportPath: '/xd_receiver.php'
        });
      };
      (function() {
        var el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'http://vkontakte.ru/js/api/openapi.js';
        el.async = true;
        document.getElementById('vk_api_transport').appendChild(el);
      }());
}