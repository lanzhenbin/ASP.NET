﻿document.domain = "qq.com";
function popUp(width, height, url) {
    var winWinth = $(window).width();
    var winHeight = $(window).height();
    var popUpLeft = winWinth / 2 - width / 2;
    var popUpTop = winHeight / 2 - height / 2 + $(window).scrollTop();
    $("body").append("<div class='winbg'></div>");
    $("body").append("<div class='popUp'><iframe class='winIframe' frameborder='0' hspace='0' src=" + url + "></iframe></div>");
    $(".winbg").css({ width: winWinth, height: winHeight, background: "#fff", position: "absolute", left: "0", top: "0" });
    $(".winbg").fadeTo(0, 0);
    $(".popUp").css({ width: width, height: height, left: popUpLeft, top: popUpTop, background: "#fff", position: "absolute" });
    $(".winIframe").css({ width: width, height: height, background: "#fff" });
}


//密保返回码
var msgInfo = {
    E2000: '配置文件错误！',
    E2001: '对不起，您还没有登录，请立即用QQ号码登录！',
    E3000: '对不起，您的访问频率太频繁，请您休息几秒钟后，再进行支付！',
    E3001: '对不起，您的访问频率太频繁，请您休息几秒钟后，再进行支付！',
    E3002: '安全验证初始化失败，请稍后再试！',
    E110052: '当前功能需验证密保手机、手机令牌、QQ令牌其中一项，请您绑定其中一项后再来使用！',
    ELSE: '系统繁忙，请稍后再试！'
};

var pay = {
    showMsg: function (payResult) {

        $(".winbg").remove();
        $(".popUp").remove();
        if (payResult.result == 1) {
            $("#tempdiv").html("<img src='http://ossweb-img.qq.com/images/helper/web201203/busy.gif' alt='wait' />数据处理中，请稍候……");
            postRequest(payResult.dna_result_key);



        } else {
            console.log("...");

        }
    }
};



function postRequest(v) {

    console.log("dna:" + v);
    $.ajax({
        type: "POST",
        url: "http://apps.game.qq.com/php/tgclub/v2/user/change_mobile?step=5",
        dataType: "jsonp",
        data: { dna: v },
        success: function (xml) {
            //console.log("step:"+v+" status:"+xml.status+" data:"+xml.data);
            if (xml.status > 0) {
                TGDialogS('pop_dia01');
                $(".item.mt20 input").val('');
                $(".item.mt10 input").val('');
                $(".item.mt20 a").eq(0).unbind();
                $(".item.mt20 a").eq(0).bind("click", function () {
                    changeMobile(3, { countrycode: $("#cCode").val(), phone: $(".item.mt20 input").val() })
                });

            } else {
                alert('安全验证失败，请重试');
            }
        }
    });



}