$('#header').load('public/header.html');
$('#menu').load('public/menu.html');
loginAuth();

function loginAuth()
{
    if(token=$.cookie(config.cookiePrefix+'login_token')){
        var data={
            'token':token
        };

        ajax.publicInfo('project/user/init',data,function(res){
            if(res.code!=config.responseSuccess){
                window.location.href='login.html';
            }
        },'GET');
    }
}

$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});