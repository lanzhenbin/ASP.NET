function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

if (getParameterByName('ADTAG') == 'qqtips.welcome.hz') {

    var popImage;
    var popUrl;
    var popId;
    var popUin;

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/showpop",
        data: { adtag: 'welcome' },
        dataType: "jsonp",
        success: function (xml) {
            if (xml.data == 3) {
                customPop('pop5')
            }

        },
    });

} else if (getParameterByName('ADTAG') == 'qqtips.enter.hz') {
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/showpop",
        data: { adtag: 'enter' },
        dataType: "jsonp",
        success: function (xml) {
            if (xml.data == 2) {
                if (VCookieManager.getCookie('cpop2') == null) {
                    customPop('jz1_tc');
                }

            }


        },
    });
} else {
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/showpop",
        dataType: "jsonp",
        success: function (xml) {
            var a = (xml.data)
            if (a == 1) {
                if (xml.order != 0 && xml.order != undefined) {
                    customPop('new_pop_1', xml);

                } else {

                    if (VCookieManager.getCookie('cusPop' + xml.uin + xml.id) == null) {

                        if (getUrlStringP('from', xml.image) == window.location.pathname) {
                            //分析来源
                            customPop('jz2_tc')
                            popImage = xml.image;
                            popUrl = xml.url;
                            popId = xml.id;
                            popUin = xml.uin;


                        }

                    }

                }



            }
            if (a == 4) {
                //customPop('jz_tc3')
                $('.tm-gift').removeClass('hid')
                $('.tm-gift').bind('click', function () {
                    customPop('jz_tc3');
                })

            }/*
               if(a==5){
                   customPop('pop_dia04')
                    
               }*/
            if (a == 6) {
                if (VCookieManager.getCookie('cpop3') == null) {
                    customPop('jz_tc2')
                }

            }
            if (a == 7) {
                if (VCookieManager.getCookie('cpop4') == null) {
                    customPop('jz_tc1')
                }

            }

        },
    });
}


function getCLMGame(a, v) {

    for (i = 0; i < v.length; i++) {

        if (a == v[i].game_id) {
            return v[i]
        }
    }
}



$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'http://xinyue.qq.com/web201410/external.css'));
function customPop(v, obj) {

    $.get('http://xinyue.qq.com/web201410/pop.html', function (data) { // Loads content into the 'data' variable.
        $('#pop4').after(data); // Injects 'data' after the #mydiv element.
        TGDialogS(v)
        if (v == 'pop_dia04') {
            comm.app.tlog(1);
        }
        if (v == 'jz2_tc') {
            $('.jz1_dialog').css('background-image', 'url(' + popImage + ')');
        }

        if (v == 'new_pop_1') {
            TGDialogS('new_pop_1');
            $('.new_tc_get').bind("click", function () {


                var order = obj.order;
                var orderArray = order.split(",")
                var tempArray = [];

                for (var i = 0; i < orderArray.length; i++) {
                    var a = getCLMGame(orderArray[i], obj.games);
                    if (a != undefined) {
                        tempArray.push(a);
                    }

                }

                var gType = tempArray[0];

                if (gType.game_id == 61) {
                    pgvSendClick({ hottag: 'zcdtc.bns' });
                }
                if (gType.game_id == 3177) {
                    pgvSendClick({ hottag: 'zcdtc.hy' })
                }
                if (gType.game_id == 3185) {
                    pgvSendClick({ hottag: 'zcdtc.rxcq' })

                }

                $.ajax({
                    type: "GET",
                    url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/getpt",
                    dataType: "jsonp",
                    jsonpCallback: 'callback',
                    success: function (obj) {

                        if (obj.data == 1) {

                            if (gType.game_type == 1) {
                                $('.new_pop_one').fadeOut(800);
                                $('.new_pop_two').fadeIn(1000);
                                $('.new_tc_qyq').bind('click', function () {
                                    window.location.href = gType.game_url;
                                })

                            } else {
                                $('.new_pop_one').fadeOut(800);
                                $('.new_pop_three').fadeIn(1000);
                                $('.new_tc_wechat img').eq(0).attr("src", "http://ossweb-img.qq.com/images/tgclub/clm/" + gType.game_id + ".jpg");
                            }
                        } else {

                            alert('系统错误，请稍后重试');

                        }

                    },
                });







            })
        }

        $('#jz2_tc').bind('click', function () {
            window.location.href = popUrl;
        })

        $('#jz2_tc').css('cursor', 'pointer');
        $('.jz2_diacon p').click(function (e) {
            e.stopPropagation();
            $('.jz2_diacon').toggleClass('on');
            if ($('.jz2_diacon').hasClass('on')) {
                setPopCookie('cusPop' + popUin + popId, 1, 7);
            } else {
                VCookieManager.delCookie('cusPop' + popUin + popId);
            }
        });
        $('.jz1_dia-close').click(function (e) {
            e.stopPropagation();
            showDialog.hide();
        });

        //激活
        $('.welc_open').bind('click', function (e) {
            e.preventDefault();
            if (comm.vipInfo.mobile == '' || comm.vipInfo.mobile == undefined) {
                alert('请先激活再回来领取福袋哦');
            } else {
                console.log('送你')
                $.ajax({
                    type: "GET",
                    url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/vipgift",
                    dataType: "jsonp",
                    success: function (xml) {
                        console.table(xml.data);
                        if (xml.data == 1) {
                            TGDialogS('pop6');
                        } else {
                            alert(xml.data);
                            showDialog.hide();
                        }
                    },
                });

            }
        })



        //生日
        $('.jz_diacon3 a').bind('click', function (e) {
            e.preventDefault();
            console.log('生日')
            //http://xinyue.qq.com/web201410/grow.shtml?ADTAG=birthday.hz
            $.ajax({
                type: "GET",
                url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/birthgift",
                dataType: "jsonp",
                success: function (xml) {
                    console.table(xml.data);
                    if (xml.data == 1) {
                        window.location.href = "http://xinyue.qq.com/web201410/grow.shtml?ADTAG=birthday.hz";
                    } else {
                        alert(xml.data);
                        showDialog.hide();
                    }
                },
            });

        })


        //TGDialogS('jz2_tc') //自定义
        //TGDialogS('jz1_tc') //临界值 40000
        //TGDialogS('pop5') //新VIP用户 50000
        //TGDialogS('pop6') 
        //TGDialogS('jz_tc3') //生日 
        //手机验证
        //TGDialogS('jz_tc1') //降级
        //TGDialogS('jz_tc2') //升级



        //可配置化弹窗-->临界值弹窗-->新进用户弹窗-->生日关怀弹窗-->手机验证弹窗-->等级升级弹窗-->等级降低弹窗

    });
}


//$('.u_mynews_show').eq(location.hash.substr(1)).show();

function getUrlStringP(name, string) {
    var url = string;
    var qc = url.substring(url.indexOf('?') + 1);
    var params = {}, queries, temp, i, l;
    queries = qc.split("&");

    // Convert the array of strings into an object
    for (i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params[name];

}


function setPopCookie(name, value, day) {

    var Days = day;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}