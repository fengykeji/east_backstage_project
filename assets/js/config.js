var config={
    address:'http://120.27.21.136:2798/',//'http://localhost/back/public/index.php/',
    responseError:400,
    responseSuccess:200,
    cookiePrefix:'yqd_',
    defaultRole:'project',
    configList:{
        'BANK_TYPE':1, //银行类型
        'CARD_TYPE':2, //证件类型
        'COMMISSION_TYPE':3, //提成方式
        'COMPLAINT_TYPE':4, //投诉方式
        'COMPLAINT_RESOLVE_TYPE':5, //投诉解决方式
        'CONTRACT_END_REASON':6,//合同终止原因
        'ENABLED_TYPE':7,//禁用类型
        'HOUSE_OLD':8,//房龄
        'HOUSE_TYPE':9,//住房类型
        'MONEY_TYPE':10,//货币类型
        'OPEN_TYPE':11,//开盘类型
        'BUY_TYPE':12,//置业目的
        'PAY_WAY':13,//支付类型
        'PROJECT_IMG_TYPE':14,//项目图片类型
        'PROJECT_TAGS_DEFAULT':15,//项目标签默认
        'PROPERTY_TYPE':16,//物业类型
        'BUILD_TYPE':17,//建筑类型
        'USER_DISABLED_TYPE':18,//用户失效类型
        'FACE':19,//朝向
        'LADDER_RATIO':20,//梯户比
        'DECORATE':21,//装修标准
        'AVERAGE':22,//均价
        'FOLLOW_TYPE':23,//跟进类型
        'APPEAL_TYPE':24,//申述类型
        'TOTAL_PRICE':25,//总价
        'AREA':26,//面积

    }
}

var ajax={
    submitting:false,

    res:'',

    async:false,

    queueList:{},

    success:function(){
        return this.res;
    },

    error:function(){
        alert('当前网络状态不稳定，请稍后再试');
    },

    //不需要token的
    publicInfo:function(url,data,func,type){
       /* if(this.submitting==true){
            return ;
        }*/
        if(func!=undefined){
            ajax.success=func;
        }
        if(type==undefined){
            type= "GET";
        }
        this.submitting=true;
        $.ajax({
            url: config.address+url,
            type: type,
            dataType:"json",
            data: data,
            async:ajax.async,
            complete:function(){
                ajax.submitting=false;
            },
            success: function (res) {
                ajax.res=res;
                ajax.success(ajax.res);
            },
            error: function () {
                ajax.error();
            }
        })
    },

    //post方法
    post:function(url,data,func){
        if(this.submitting==true){
            return ;
        }
        if(func!=undefined){
            ajax.success=func;
        }
        this.submitting=true;
        $.ajax({
            url: config.address+url,
            type: "POST",
            dataType:"json",
            async:ajax.async,
            headers: {
                'ACCESS-ROLE':config.defaultRole,
                'ACCESS-TOKEN':$.cookie(config.cookiePrefix+'login_token'),
            },
            data: data,
            complete:function(){
                ajax.submitting=false;
            },
            success: function (res) {
                ajax.res=res;

                ajax.success(ajax.res);
            },
            error: function () {
                alert('当前网络状态不稳定，请稍后再试');
            }
        })

    },

    //get方法
    get:function(url,data,func){
       /* if(this.submitting==true){
            return ;
        }

        this.submitting=true;*/
        if(func!=undefined){
            ajax.success=func;
        }
        $.ajax({
            url: config.address+url,
            type: "GET",
            dataType:"json",
            async:ajax.async,
            headers: {
                'ACCESS-ROLE':config.defaultRole,
                'ACCESS-TOKEN':$.cookie(config.cookiePrefix+'login_token'),
            },
            data: data,
            complete:function(){
                ajax.submitting=false;
            },
            success: function (res) {
                ajax.res=res;
                ajax.is_success=true
            },
            error: function () {
                alert('当前网络状态不稳定，请稍后再试');
            }
        })
        if(this.is_success==true){
            this.success(ajax.res);
        }
    },

}

function checkLogin(){

    if(token=$.cookie(config.cookiePrefix+'login_token')){
        var data={
            'token':token
        };
        ajax.publicInfo('project/user/init',data,function(res){
            if(res.code==config.responseSuccess){
                $.cookie(config.cookiePrefix+'login_token',res.data.token)
                window.location.href='index.html';
            }
        },'GET');
    }
}

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


