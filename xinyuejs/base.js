﻿//env settings 
var _ENV = 'oss';
if (_ENV == 'dev') {
    var baseurl = 'http://vipapps.game.qq.com/php/tgclub/home/';
} else {
    var baseurl = 'http://apps.game.qq.com/php/tgclub/home/';
}

var host = 'http://xinyue.qq.com/';
// env settings end
var gameList;
var myString = {
    config: {
        nickNameL: 10
    },
    _strLen: function (str) {
        var len = str.length;
        var reLen = 0;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
                reLen += 2;
            } else {
                reLen++;
            }
        }
        return reLen;
    },
    subString: function (str, len, hasDot) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            }
            else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }
        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    },
    formatStr: function (str) {
        if (myString._strLen(str) > myString.config.nickNameL) {
            return myString.subString(str, myString.config.nickNameL, false);
        }
        return str;
    }
}

var UserActivateInterface = {
    show_dialog: function (e) {
        showDialog.show({
            id: e,
            bgcolor: "#000",
            opacity: 70
        });
    },
    show: function (activateId) {
        if (!comm.user.ifLogined) {

            LoginManager.login(comm.app.login);
            return;
        }

        if (!comm.vipInfo.is_tgclub_vip) {
            alert('你不是心悦会员或合作会员，无法激活。');
            return;
        }
        if (comm.vipInfo.ifactive && comm.vipInfo.mobile != '') {
            alert('你已经激活！');
            return;
        }
        // $('.m_guide_a,.m_guide_b,.m_guide_c,.m_guide_d').css('display','');
        /*var _uToken = '';
        if(arguments.length==1) {
        	_uToken = arguments[0];
        }*/
        var _dev = $("#activateForm");
        var uin = comm.user.qq;
        var skey = VCookieManager.getCookie('skey');
        var vip_type = comm.vipInfo.vipLevel;
        skey = skey.replace(/@/, '');
        if (_dev.length <= 0) {
            var time_stamp = new Date().getTime();
            $('body').append("<div id='activateForm'   style='display:none;width:640px;height:632px;'><iframe id='activateFrame' name='activateFrame' width='100%' height='100%' scrolling='no' frameborder='0'></iframe></div>");
            var src_url = '';
            /*if(typeof('activeFrom') == 'undefined') {
				var activeFrom = 0;
			}*/
            var _activeFrom = 0;
            if (arguments.length == 1) {
                _activeFrom = arguments[0];
            }
            //src_url = host+"web201206/user_active.shtml?uin="+uin+"&skey="+skey+"&vip_type="+vip_type+"&token="+_uToken+"&t="+time_stamp+"&activeFrom="+activeFrom;

            src_url = host + "web201206/user_active02.shtml?uin=" + uin + "&skey=" + skey + "&vip_type=" + vip_type + "&t=" + time_stamp + "&activeFrom=" + _activeFrom + '&activateId=' + activateId;
            $("#activateFrame").attr("src", src_url);
        }
        UserActivateInterface.show_dialog('activateForm');
    }
}

var VCookieManager = {
    SetCookie: function (name, value)//两个参数，一个是cookie的名子，一个是值
    {
        var Days = 30; //此 cookie 将被保存 30 天
        var exp = new Date();    //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function (name)//取cookies函数
    {
        var a;
        return LoginManager.filterXSS((a = document.cookie.match(RegExp("(^|;\\s*)" + name + "=([^;]*)(;|$)"))) ? unescape(a[2]) : null)

    },
    delCookie: function (name)//删除cookie
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = VCookieManager.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}



var comm = {
    ifInit: false,

    user: {
        qq: 0,
        nickName: "",
        ifLogined: false,
        isViper: false,
        otherVip: {
            is_tenpay_vip: false,
            is_game_vip: false
        }
    },
    growPoint: 12000,
    profileCode: 100000,
    profileAppid: 1,

    userInfo: {
        'status': false, // 数据是否加载 
        'info': {
            'sex': 0,
            'name': '',
            'phone': '',
            'mail': '',
            'weixin': '',
            'address': '',

            'addr': {
                'country': 0,
                'city': 1,
                'province': 1
            },

            'detailinfo': {
                'gameuin': 0,
                'clothes': 1,
                'postcode': '',
                'birthday': {
                    'year': 1980,
                    'month': 1,
                    'day': 1
                },
                'rpg': [0, 0, 0],
                'athletics': [0, 0],
                'tab': [0, 0],
                'webgame': [0, 0],
                'wapgame': [0, 0],
                'bloodtype': 0,
                'education': 0,
                'profession': 0,
                'income': 0,
                'hobby': 2,
                'tel': ''
            }
        }
    },

    vipInfo: {
        qq: 0,
        gm: {
            qq: 0,
            name: '',
            phone: ''
        },
        is_tgclub_vip: false,
        vipLevel: 0,
        ifactive: false,
        points: {
            vailddate: '2012-12-31',
            l1: 50000,
            l2: 1000000,
            l3: 8000000,
            his: 0,  //历史成长值
            cur: 0,  //当前成长值  
            rank: 0  //排名          
        },
        crmQQ: '',
        crmName: ''
    },

    config: {
        baseUrlPath: baseurl,
        host: host,
        vCodeVaild: 0,
        viptype: {
            l0: '心悦会员',
            l1: 'VIP1',
            l2: 'VIP2',
            l3: 'VIP3'
        },
        point_process_bar_length: 1000000,
        loadEvent: [],
        loginCallBack: [],

        ajaxUrl: {
            ckIfLoginVip: baseurl + 'viper_check.cgi',
            loginOut: baseurl + 'logout/index/',
            getface: baseurl + 'viper_face.cgi',
            wburl: 'http://t.qq.com/xinyuejulebu'
        },
        msg: {
            notlogin: '当前还没登录，登录后才可以体验哦',
            notviper: '当前帐号并非心悦俱乐部会员',
            innerNotViper: '你目前还未加入俱乐部'
        },
        loadUserInfoSuccessEvent: [],  // 加载用户资料后的方法回调
        loadCallBack: [],              // 用于页面加载后的方法注入
        loginOutBack: []
    },
    Init: function () {
        comm.config.loadEvent.push(comm.app.cklogin);

        comm.ifInit = true;
    },
    load: function () {


        if (!comm.ifInit) {
            comm.Init();
        }
        for (var i = 0; i < comm.config.loadEvent.length; i++) {
            comm.config.loadEvent[i].call(comm, null);
        }
    },

    commonApp: {
        decimalToHexString: function (val) {
            var tmp = val.toString(16);
            var str = "";
            if (tmp.length < 2) {
                str = "0";
            }
            str += tmp;
            return str;
        },

        arrToDecimal: function (arr) {
            var num = 0;
            for (var i = 0; i < arr.length; i++) {
                num |= arr[i];
            }
            return num;
        },

        arrGameToString: function (arr, gameLen) {
            var strGame = "";

            for (i = 0; i < gameLen; i++) {
                strGame += comm.commonApp.decimalToHexString(arr[i]);
            }
            return strGame;
        }
    },
    app: {
        updateActiveFlag: function () {
            VCookieManager.SetCookie('showActiveFlag', 0);
            showDialog.hide();
        },
        ckshowActiveDialog: function () {
            var showActiveFlag = VCookieManager.getCookie('showActiveFlag');
            if (showActiveFlag == null) {
                VCookieManager.SetCookie('showActiveFlag', 1);
            }

            showActiveFlag = VCookieManager.getCookie('showActiveFlag');
            if (showActiveFlag == 1) {
                //用户未激活，则弹出激活窗口

                if ((comm.vipInfo.vipLevel > 4) && (!comm.vipInfo.ifactive)) {
                    if (!VCookieManager.getCookie('right_guide')) {
                        $('.m_guide_a,.m_guide_b,.m_guide_c').css('display', '');
                    }
                    if (!VCookieManager.getCookie('top_guide')) {
                        $('.m_guide_d').css('display', '');
                    }
                    // UserActivateInterface.show(1000000000);
                    return false;
                }
            }
        },
        showCodeVaild: function () {
            if (comm.config.vCodeVaild) {
                comm.config.vCodeVaild--;
                $('#vcodevaildct').html(comm.config.vCodeVaild + ' ');
            } else {
                return;
            }
            setTimeout(comm.app.showCodeVaild, 1000);
        },
        getFace: function (qq) {
            var msgurl = "http://q3.qlogo.cn/headimg_dl?bs=qq&dst_uin=%d&src_uin=%d&fid=%d&spec=100&url_enc=0&referer=bu_interface&term_type=PC";
            msgurl = msgurl.replace(/\%d/g, comm.user.qq);
            //$('#userface').attr('src',msgurl);
            $(".u_user_vip img").attr("src", msgurl)//头像
        },
        fillQQInfo: function () {

            var qq = LoginManager.getUserUin();
            LoginManager.getNickName(function (loginInfo) {
                if (loginInfo.isLogin) {
                    comm.user.nickName = loginInfo.nickName;
                    $(".name").eq(1).text(loginInfo.nickName); //用户名

                }
            });
            comm.user.qq = qq;
            comm.vipInfo.qq = qq;




            $('#u-name').html(comm.user.qq);
            comm.app.getFace(qq);
        },
        noview: function () {
            if (location.href.search(/\index\.shtml/g) < 0 && location.href != comm.config.host) {
                alert('当前还没登录，登录后才可以体验哦');
                location.href = comm.config.host + "index.shtml";
            }
        },
        destoryQQInfo: function () {
            comm.user.ifLogined = false;
            comm.user.isViper = false;
            comm.userInfo.status = false;
            $('#vipPanel').hide();
            $('#btn-login').show();
            VCookieManager.SetCookie('showActiveFlag', 1);
        },
        cklogin: function () {
            var qq = LoginManager.getUserUin();
            LoginManager.checkLogin(comm.app.fillQQInfo);
            if (qq && qq != '' && qq > 0) {
                afterLogin();
                comm.user.ifLogined = true;

                comm.app.showVipDetail();

                return;
            } else {
                //console.log("没登录....");
                $(".m_login").css("display", "none");
                $(".m_attend").css("display", "block");

                $(".u_message_login").show();
                $(".u_message_bd").append('<div class="u_message_login bor fl"> <a href="javascript:LoginManager.login(comm.app.login);pgvSendClick({hottag:\'gw.personal.login\'});"><span>登陆</span><br><span class="s">查看我的基础信息</span></a> </div>');
                $(".m_information").append('<div class="u_message_login bor fl"> <a href="javascript:LoginManager.login(comm.app.login);pgvSendClick({hottag:\'gw.personal.login\'});"><span>登陆</span><br><span class="s">查看我的基础信息</span></a> </div>');

                if (comm.config.loadCallBack.length > 0) {
                    for (var i = 0; i < comm.config.loadCallBack.length; i++) {
                        if (typeof (comm.config.loadCallBack[i]) == 'function') {
                            comm.config.loadCallBack[i].call(window, null);
                        }
                    }
                }
            }
        },
        login: function () {
            comm.app.fillQQInfo();
            location.reload();
        },
        tlog: function (v) {
            $.ajax({
                type: "POST",
                url: "http://apps.game.qq.com/php/tgclub/v2/tlog/log",
                dataType: "jsonp",
                data: { _logtype: 'mobile_change', data: v },
                success: function (xml) {
                    console.log(" status:" + xml.status + " data:" + xml.data);

                }
            });
        },
        loginOut: function () {
            FileLoadManager.ajaxRequest({
                'url': comm.config.ajaxUrl.loginOut,
                'charset': 'gb2312',
                'cache': false,
                'postType': 'post', //提交信息的方式
                'dataType': 'object', //返回的数据类型：object, function
                'dataTypeName': 'loginout', //如果dataTypeName设定成功以后的方法
                'showLoadingStr': '', //显示正在加载提示信息
                'isUseDefaultLoadType': false, //是否使用默认的加载方法，适用于当正常的ajax出现错误的时候。
                'onLoadStartEvent': null, //加载前的方法
                'onLoadingEvent': null, //加载时的方法
                'onLoadSuccessEvent': function (msg) {
                    if (loginout.status) {
                        comm.app.destoryQQInfo();
                        //if(comm.config.loginOutBack.length>0){
                        //for(var i=0;i<comm.config.loginOutBack.length;i++){
                        //comm.config.loginOutBack[i].call(window,null);
                        //}
                        //}
                        //MK.UI.Background.msgbox.close();
                        location.reload();
                    } else {
                        if (comm.config.msg[loginout.msg]) {
                            alert(comm.config.msg[loginout.msg]);
                        } else {
                            alert('登出失败')
                            location.reload();
                        }
                    }
                },
                'onLoadErrorEvent': null, //加载失败以后的方法
                'onLoadCompleteEvent': null //加载完成以后的方法
            })

        },
        showPointProcess: function () {
            if (comm.vipInfo.points.cur < 10000) {
                $('#current_point').html('<10000');
            } else {
                $('#current_point').html(comm.vipInfo.points.cur);
            }

            var percent = parseInt((parseInt(comm.vipInfo.points.cur) / comm.config.point_process_bar_length) * 100);
            percent = (percent >= 100) ? 100 : percent;
            percent = percent.toString();
            $('.currentt').css('width', percent + '%');
            if (comm.vipInfo.points.cur < 10000) {
                $('#user_point_info').html("当前成长值:<b class='blue fwb'><10000</b>");
            } else {
                $('#user_point_info').html("当前成长值:<b class='blue fwb'>" + comm.vipInfo.points.cur + "</b>");
            }
            if (comm.vipInfo.vipLevel > 0) {
                $('#user_point_info').append("你于<b class='blue fwb'>" + comm.vipInfo.points.begin_date + "</b>成为VIP" + comm.vipInfo.vipLevel);
                $('#user_point_info').append("会员到期时间:<b class='blue fwb'>" + comm.vipInfo.points.vailddate + "</b>");
            }
        },



        //提交用户的安全定制业务信息 add by jacky 20140402





        getRealLength: function (str) {
            var ilen = 0;
            var reg = /^[\u4E00-\u9FA3]{1,}$/
            for (var i = 0; i < str.length; i++) {
                if (reg.test(str.substr(i, 1))) {
                    ilen += 2;
                } else {
                    ilen++;
                }
            }
            return ilen;
        },

        showGm: function (ifshow) {
            if (comm.user.isViper && comm.vipInfo.vipLevel == 3) {
                if (ifshow) {
                    $('#gmpanel').show();
                } else {
                    $('#gmpanel').hide();
                }
            }
        },
        showVipDetail: function () {





            if (comm.user.ifLogined) {



                //jsonp1415089139853({"status":1,"data":{"uin":4297246,"level":"3","flag":"1","mail_unread":"5","point":"831820","point_rank":0,"point_rank_diff":"-29","actived":1,"begin_date":"2014-10-31","vaild_date":"2015-10-31","expir_in_30":0}});	




                var ost_o = { mmo: { i: [{ n: "剑灵", id: "bns", stat: "hot" }, { n: "斗战神", id: "dzs", stat: "hot" }, { n: "QQ仙灵", id: "h2" }, { n: "御龙在天", id: "yl" }, { n: "轩辕传奇", id: "xy" }, { n: "QQ华夏", id: "qqhx" }, { n: "寻仙", id: "xx" }, { n: "天涯明月刀", id: "wuxia", stat: "new" }, { n: "上古世纪", id: "age" }, { n: "更多", url: "game.qq.com/gamelist.shtml", stat: "more" }], g: { c: "角色扮演", e: "mmorpg" } }, act: { i: [{ n: "疾风之刃", id: "jf", stat: "hot" }, { n: "刀剑2", id: "d2", stat: "hot" }, { n: "地下城与勇士", id: "dnf", stat: "hot" }, { n: "炫斗之王", id: "xd" }, { n: "天刹", id: "tian" }, { n: "魂之猎手", id: "mf" }, { n: "怪物猎人 OL", id: "mho" }, { n: "王牌对决", id: "k", stat: "new" }], g: { c: "动作游戏", e: "actgame" } }, esg: { i: [{ n: "使命召唤OL", id: "codol", stat: "new" }, { n: "FIFA Online3", id: "eafifa", stat: "hot" }, { n: "逆战", id: "nz", stat: "hot" }, { n: "枪神纪", id: "tps" }, { n: "NBA2KOL", id: "nba2k" }, { n: "英雄联盟", id: "lol" }, { n: "穿越火线", id: "cf" }, { n: "超神英雄", id: "hon" }, { n: "神之浩劫", id: "sm" }, { n: "更多", url: "game.qq.com/gamelist.shtml#type1", stat: "more" }], g: { c: "竞技游戏", e: "esportgame" } }, acg: { i: [{ n: "炫舞时代", id: "5s", stat: "new" }, { n: "英雄联盟官方助手", url: "tgp.qq.com/lol.shtml" }, { n: "腾讯对战平台", id: "dz" }, { n: "QQ游戏", id: "qqgame" }, { n: "QQ炫舞", id: "x5", stat: "hot" }, { n: "QQ飞车", id: "speed", stat: "hot" }, { n: "QQ企鹅", id: "pet" }, { n: "3366小游戏", url: "www.3366.com" }, { n: "勇者大冒险", id: "mx", stat: "new" }], g: { c: "休闲&amp;平台", e: "acgplat" } }, web: { i: [{ n: "火影忍者OL", id: "huoying", stat: "hot" }, { n: "焚天之怒", id: "fen" }, { n: "部落守卫战", id: "bl", stat: "hot" }, { n: "塔防三国志", id: "t3" }, { n: "七雄争霸", id: "7" }, { n: "夜店之王", id: "ye" }, { n: "斩仙", url: "zx.qq.com/act/a20130619zxobeta1/" }, { n: "战龙三国", id: "zl" }, { n: "斗战诛天", url: "zt.qq.com/cp/a20140626gzwx", stat: "new" }, { n: "更多", url: "igame.qq.com/games/webgame_list.php", stat: "more" }], g: { c: "网页游戏", e: "webgame" } }, mobile: { i: [{ n: "糖果传奇", id: "ccs", stat: "new" }, { n: "天天富翁", id: "ttfw" }, { n: "天天酷跑", id: "pao", stat: "hot" }, { n: "欢乐斗地主", id: "huanle" }, { n: "天天飞车", id: "ttfc" }, { n: "天天爱消除", id: "peng" }, { n: "全民飞机大战", id: "feiji" }, { n: "雷霆战机", id: "lt" }, { n: "天天炫斗", id: "ttxd" }, { n: "更多", id: "sy", stat: "more" }], g: { c: "手机游戏", e: "mobilegame" } } };


                function echoGName(a) {
                    for (v in ost_o) {
                        for (var b = 0; b < ost_o[v].i.length; b++) {
                            if (ost_o[v].i[b].id == a)
                                return ost_o[v].i[b].n;
                        }
                    }
                }

                function echoStatus(v) {
                    if (v == 0) {
                        return "处理";
                    }
                    if (v == 1) {
                        return "未处理";
                    }
                }






                /*
                
                $.ajax({
                        //限时服务
                            type: "GET",
                            url: "http://apps.game.qq.com/php/tgclub/v2/qhelper/recent",
                            dataType: "jsonp",
                            success: function (xml) {
                              
                            
                            
                            if(xml.data.length!=0){
                                $(".u_timeserv_bd").css("display","none");
                                $(".u_timeserv_bd2").css("display","block")
                                $(".u_timeserv_list2").text('');
                                for(var hh=0;hh<xml.data.length;hh++){
                               var aa = xml.data[hh].game;
                               var cre = xml.data[hh].created;
                               var sta = xml.data[hh].status;
                               var c= '<li><p>'+cre.substring(0,11)+'<span>'+echoGName(aa)+'</span><span>问题类别</span><span class="c_red">'+echoStatus(sta)+'</span></p></li>';
                               $(".u_timeserv_list2").append(c);
                                
                             }
                            }else{
                                
                            
                            }
                            
                             
                             
                            },
                        });
                        
                        */






                /*
                        //我的付费
                        $.ajax({
                            type: "GET",
                            url: "http://apps.game.qq.com/php/tgclub/v2/game/pay_list",
                            dataType: "jsonp",
                            success: function (xml) {
                                $(".m_mygame.fl ul").text('');
                                $(".u_mygame_list").css("display","block");
                                if(xml.data!=0){
                                    $(".u_mygame_recommend").css("display","none");
                                }
                                for(i=0;i<xml.data.length;i++){
                                    if(i<2){
                                     var a='<li><span class="u_mygame_name"><a href="#">'+xml.data[i].game+'</a></span><span class="u_mygame_txt"> 最近充值 '+xml.data[i].total+'</span></li>'
                                $(".m_mygame.fl ul").append(a);  
                                    }
                                    
                               
                                }
                            },
                        });
                        */










                if (window.location.href.indexOf("profile.shtml") != -1 || window.location.href.indexOf("profile_old.shtml") != -1) {



                    $.ajax({
                        type: "GET",
                        url: "http://apps.game.qq.com/php/tgclub/v2/user/getprofile2",
                        dataType: "jsonp",
                        success: function (xml) {
                            //个人资料

                            $('.u_phone_highlight a').eq(0).text("+" + xml.data.countrycode + " " + xml.data.mobile)
                            if (xml.data.birthday == 0 || xml.data.birthday == "1900-01-01" || xml.data.birthday == "1960-01-01" || xml.data.birthday == "") {
                                $('.u_birthday_edit').show();
                                $('.u_birthday_comm').hide();
                            } else {

                                if (getServerTime(xml.data.cur_time) == xml.data.birthday) {



                                    $.ajax({
                                        type: "GET",
                                        url: "http://apps.game.qq.com/php/tgclub/v2/user/logininfo",
                                        dataType: "jsonp",
                                        success: function (xml) {
                                            if (xml.data.level > 0) {


                                                //是否领取过

                                                $.ajax({
                                                    type: "GET",
                                                    url: "http://apps.game.qq.com/php/tgclub/v2/act_popup_show/showpop",
                                                    dataType: "jsonp",
                                                    success: function (xml) {
                                                        if (xml.data == 4) {

                                                            $('.u_birthday_edit').hide();
                                                            $('.u_birthday_highlight').show();
                                                        } else {
                                                            $('.u_birthday_edit').hide();
                                                            $('.u_birthday_comm').show();
                                                            $('.u_birthday_comm h3').text('祝你生日快乐！');
                                                        }

                                                    },
                                                });

                                                //

                                            } else {
                                                $('.u_birthday_edit').hide();
                                                $('.u_birthday_comm').show();
                                                $('.u_birthday_comm h3').text('祝你生日快乐！');
                                            }

                                        }
                                    })





                                } else {
                                    $('.u_birthday_edit').hide();
                                    $('.u_birthday_comm').show();
                                }

                            }

                            $(".itembtn a").eq(0).unbind();
                            $(".itembtn a").eq(0).bind("click", function () {
                                modifyProfile();
                            });

                            //验证手机号
                            $(".item.mt20 input").eq(0).bind("input", function () {
                                if ($(this).val().length == 11) {
                                    $(".item.mt20 span").eq(0).addClass('cg');
                                } else {
                                    $(".item.mt20 span").eq(0).removeClass();
                                }
                            })


                            $(".item span").eq(2).text(xml.data.realname);
                            if (xml.data.mobile != '') {
                                $(".item span").eq(3).html(xml.data.mobile + '<a href="javascript:TGDialogS(' + "pop_dia03" + ')">修改</a>');
                                $(".item span").eq(13).html(xml.data.mobile + '<a href="javascript:TGDialogS(' + "pop_dia03" + ')">修改</a>');
                            } else {


                                $(".item span").eq(3).html(xml.data.mobile + '<a href="javascript:bdmobile(' + comm.vipInfo.ifactive + ')">绑定手机</a>');
                                $(".item span").eq(13).html(xml.data.mobile + '<a href="javascript:bdmobile(' + comm.vipInfo.ifactive + ')">绑定手机</a>');
                            }

                            $(".item.mt20 span").eq(1).text(xml.data.mobile);


                            if (xml.data.sex == 1) {
                                $(".item span").eq(4).text("男");
                                $('input:radio[name=Sex]').eq(0).prop('checked', true);
                            } else {
                                $(".item span").eq(4).text("女");
                                $('input:radio[name=Sex]').eq(1).prop('checked', true);
                            };

                            $(".item span").eq(5).text(xml.data.wechat);

                            if (xml.data.birthday != 0) {
                                $(".item span").eq(6).text(xml.data.birthday);
                            } else {
                                $(".item span").eq(6).text("1990-1-1");
                            }


                            $(".item span").eq(7).text(xml.data.email);

                            if (xml.data.gameqq != 0) {
                                $(".item span").eq(8).text(xml.data.gameqq);
                                $(".item :input").eq(8).val(xml.data.gameqq);
                            }




                            var pPro = prov[xml.data.province][0];
                            var cCit = selectCityName(xml.data.province, xml.data.city);
                            if (pPro == '请选择') { pPro = ''; }
                            if (cCit == '请选择') { cCit = ''; }
                            $(".item span").eq(9).text(pPro + cCit + xml.data.addr);

                            if (xml.data.postcode != 0) {
                                $(".item span").eq(10).text(xml.data.postcode);
                                $(".item :input").eq(12).val(xml.data.postcode);
                            }



                            /*        
                    3 wechat
                    7 email
                    8 gameqq
                    $(".item :input").eq(11) addr xx
                    12 postcode
                    
                    */
                            $('#province-edit').prop('selectedIndex', xml.data.province);
                            selectCity(xml.data.province);
                            $('#city-edit').prop('selectedIndex', xml.data.city);

                            // 显示 $('.u_birthday_highlight').show();$('.u_birthday_comm').hide()


                            var births = xml.data.birthday;
                            var birth = births.replace(/-/g, '/');

                            $('.text_box h3 span').text(birthRemain(birth))
                            $('.text_box h2').text(birth)
                            var birthSplit = birth.split("-");
                            if (xml.data.birthday != 0) {
                                $("#year-edit [value=" + parseInt(birthSplit[0]) + "]").prop('selected', true);
                            } else {
                                $("#year-edit [value=1900]").prop('selected', true);
                            }

                            $("#month-edit [value=" + (birthSplit[1]) + "]").prop('selected', true);
                            $("#day-edit [value=" + (birthSplit[2]) + "]").prop('selected', true);


                            $(".item :input").eq(0).val(xml.data.realname);


                            $(".u_information_action .item :input").eq(3).val(xml.data.wechat);
                            // $(".item span").eq(17).text(xml.data.birthday);

                            $(".item :input").eq(7).val(xml.data.email);

                            $(".item :input").eq(11).val(xml.data.addr);



                        }
                    });

                }



                if (window.location.href.indexOf("mail.shtml") != -1) {
                    //站内信 未读 tab

                    $.ajax({
                        type: "GET",
                        url: "http://apps.game.qq.com/php/tgclub/v2/msg/unread",
                        dataType: "jsonp",
                        success: function (xml) {

                            //全部消息
                            if (xml.data[0] != 0) {

                                $(".u_mynews_hd li a").eq(0).append('<span class="num">' + xml.data[0] + '</span>');

                            } else {
                                $(".u_mynews_hd li a").eq(0).append('<span></span>');


                            }

                            if (xml.data[100] != 0) {
                                $(".u_mynews_hd li a").eq(1).append('<span class="num">' + xml.data[100] + '</span>');
                            } else {
                                $(".u_mynews_hd li a").eq(1).append('<span></span>');
                            }

                            if (xml.data[200] != 0) {
                                $(".u_mynews_hd li a").eq(2).append('<span class="num">' + xml.data[200] + '</span>');
                            } else {
                                $(".u_mynews_hd li a").eq(2).append('<span></span>');
                            }

                            if (xml.data[300] != 0) {
                                $(".u_mynews_hd li a").eq(3).append('<span class="num">' + xml.data[300] + '</span>');
                            } else {
                                $(".u_mynews_hd li a").eq(3).append('<span></span>');
                            }



                        }
                    });
                }











                $(".u_mynews_hd li").eq(0).bind("click", function () {
                    defaultType = 0;
                    defaultPage = 1;
                    defaultTab = 0;

                    readMail(defaultType, defaultPage, defaultPerPage);
                });

                $(".u_mynews_hd li").eq(1).bind("click", function () {
                    defaultType = 100;
                    defaultPage = 1;
                    defaultTab = 1;

                    readMail(defaultType, defaultPage, defaultPerPage);
                });

                $(".u_mynews_hd li").eq(2).bind("click", function () {
                    defaultType = 200;
                    defaultPage = 1;
                    defaultTab = 2;

                    readMail(defaultType, defaultPage, defaultPerPage);
                });

                $(".u_mynews_hd li").eq(3).bind("click", function () {
                    defaultType = 300;
                    defaultPage = 1;
                    defaultTab = 3;

                    readMail(defaultType, defaultPage, defaultPerPage);
                });






                //other vipsers
                /*if(comm.vipInfo.is_game_vip>0) {
                        $('#blue_vip_icon').addClass('ico ico_vipl');
                    }
                    if(comm.vipInfo.is_tenpay_vip>0) {
                        $('#tenpay_vip_icon').addClass('ico ico_vipc');
                    }*/
            }
        },



        getAddress: function (addCode) {
            var ct = addCode.split('-');
            if (ct.length != 3) {
                return "未能获取地址";
            } else {
                return "";
            }
        },
        getGameVip: function () {
            //not login
            if (!comm.user.ifLogined) {
                LoginManager.login(comm.app.login);
                return false;
            }
            //is viper or not
            if (!comm.user.isViper) {
                alert('当前帐号无法领取，请更换帐号尝试');
                return false;
            }
            //is activatable
            if (!comm.vipInfo.ifactive) {
                UserActivateInterface.show(1000000000);

                return false;
            }
            comm.app.getLb(function () {
                window['getGiftMain_1906'].submit();
            });
        },
        getLb: function () {
            var execFun = arguments[0];
            execFun.call(window, null);
        }
    }
}




function submitForm() {

    var sRealName = $(".item :input").eq(0).val();
    var sWechat = $(".item :input").eq(3).val();

    var sEmail = $(".item :input").eq(7).val();
    var sGameQQ = $(".item :input").eq(8).val();
    var sAddr = $(".item :input").eq(11).val();
    var sPostCode = $(".item :input").eq(12).val();
    var sGender = $("input:radio[name=Sex]:checked").val();
    var sGenderNum = 1;
    if (sGender == "male") {
        sGenderNum = 1;
    } else {
        sGenderNum = 0;
    }

    var sDate = $("#year-edit").val() + "-" + $("#month-edit").val() + "-" + $("#day-edit").val();

    var sProv = $("#province-edit").find('option:selected').val();
    var sCity = $("#city-edit").find('option:selected').val();

    //设置个人资料
    $.ajax({
        type: "POST",
        url: "http://apps.game.qq.com/php/tgclub/v2/user/setprofile1",
        dataType: "jsonp",
        data: {
            realname: sRealName,
            sex: sGenderNum,
            birthday: sDate,
            email: sEmail,
            province: sProv,
            city: sCity,
            addr: sAddr,
            postcode: sPostCode,
            gameqq: sGameQQ,
            wechat: sWechat
        },
        success: function (xml) {

            if (xml.status == 1) {
                alert("提交成功。");
                window.location.reload();

            } else {
                alert(xml.data);
            }

        }
    });

}




comm.config.loadCallBack.push(comm.app.ckshowActiveDialog);

var otherAct = {
    sc1001: '填资料送成长值',
    sc1002: '收听微博送成长值',
    sc1003: '七雄充值送成长值',
    sc1004: '春节及圣诞祝福活动',
    sc1005: '飞车成长值',
    sc1008: '财付通VIP成长值加成',
    sc1009: '财付通SVIP成长值加成',
    sc1010: '财悦会员领取心悦成长值',
    sc1020: '心悦新手任务',
    sc100705: '道聚城',
    sc100702: '生日关怀',
    sc100703: '新进VIP用户'

}



function findGame(v) {

    if (v < 0) {
        return "未知游戏";
    }
    //console.log(gameList[v]);
    if (gameList[v] != undefined) {
        return gameList[v].value;
    } else {
        if (v > 1000 && v < 1100) {
            if (otherAct["sc" + v] != undefined) {
                return otherAct["sc" + v];
            } else {
                return "专题活动";
            }

        }


        if (v > 4000) {
            if (otherAct["sc" + v] != undefined) {
                return otherAct["sc" + v];
            } else {
                return "专题活动";
            }
            //
        } else {
            if (gameList[v] == v) {
                return gameList[v].value;
            } else {

            }

        }

    }


}

function bugfix(v) {
    if (v == undefined) {
        return "未知游戏";
    } else {
        return v;
    }
}


function findSource(v) {


    if (gameList[v] == v) {
        return gameList[i][1];
    } else {
        if (v > 1000 && v < 1100) {
            return "活动";
        }
        if (v > 5000 && v < 9999) {
            return "活动";
        }
        if (v > 9999) {
            return "专属活动";
        }
        return "充值";

    }


}






var prov = [];

prov[0] = ["请选择", "请选择"];
prov[1] = ["北京", "|东城|西城|崇文|宣武|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|平谷|怀柔|密云|延庆"];
prov[2] = ["上海", "|黄浦|卢湾|徐汇|长宁|静安|普陀|闸北|虹口|杨浦|闵行|宝山|嘉定|浦东|金山|松江|青浦|南汇|奉贤|崇明"];
prov[3] = ["天津", "|和平|东丽|河东|西青|河西|津南|南开|北辰|河北|武清|红挢|塘沽|汉沽|大港|宁河|静海|宝坻|蓟县"];
prov[4] = ["重庆", "|万州|涪陵|渝中|大渡口|江北|沙坪坝|九龙坡|南岸|北碚|万盛|双挢|渝北|巴南|黔江|长寿|綦江|潼南|铜梁|大足|荣昌|壁山|梁平|城口|丰都|垫江|武隆|忠县|开县|云阳|奉节|巫山|巫溪|石柱|秀山|酉阳|彭水|江津|合川|永川|南川"];
prov[5] = ["河北", "|石家庄|邯郸|邢台|保定|张家口|承德|廊坊|唐山|秦皇岛|沧州|衡水"];
prov[6] = ["山西", "|太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城"];
prov[7] = ["内蒙古", "|呼和浩特|包头|乌海|赤峰|呼伦贝尔盟|阿拉善盟|哲里木盟|兴安盟|乌兰察布盟|锡林郭勒盟|巴彦淖尔盟|伊克昭盟"];
prov[8] = ["辽宁", "|沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛"];
prov[9] = ["吉林", "|长春|吉林|四平|辽源|通化|白山|松原|白城|延边"];
prov[10] = ["黑龙江", "|哈尔滨|齐齐哈尔|牡丹江|佳木斯|大庆|绥化|鹤岗|鸡西|黑河|双鸭山|伊春|七台河|大兴安岭"];
prov[11] = ["江苏", "|南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安"];
prov[12] = ["浙江", "|杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水"];
prov[13] = ["安徽", "|合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州|宿州|池州|淮南|巢湖|阜阳|六安|宣城|亳州"];
prov[14] = ["福建", "|福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德"];
prov[15] = ["江西", "|南昌市|景德镇|九江|鹰潭|萍乡|新余|赣州|吉安|宜春|抚州|上饶"];
prov[16] = ["山东", "|济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽"];
prov[17] = ["河南", "|郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源"];
prov[18] = ["湖北", "|武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州"];
prov[19] = ["湖南", "|长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界"];
prov[20] = ["广东", "|广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|潮州|揭阳|云浮"];
prov[21] = ["广西", "|南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|南宁地区|柳州地区|贺州|百色|河池"];
prov[22] = ["海南", "|海口|三亚"];
prov[23] = ["四川", "|成都|绵阳|德阳|自贡|攀枝花|广元|内江|乐山|南充|宜宾|广安|达川|雅安|眉山|甘孜|凉山|泸州|遂宁"];
prov[24] = ["贵州", "|贵阳|六盘水|遵义|安顺|铜仁|黔西南|毕节|黔东南|黔南"];
prov[25] = ["云南", "|昆明|大理|曲靖|玉溪|昭通|楚雄|红河|文山|思茅|西双版纳|保山|德宏|丽江|怒江|迪庆|临沧"];
prov[26] = ["西藏", "|拉萨|日喀则|山南|林芝|昌都|阿里|那曲"];
prov[27] = ["陕西", "|西安|宝鸡|咸阳|铜川|渭南|延安|榆林|汉中|安康|商洛"];
prov[28] = ["甘肃", "|兰州|嘉峪关|金昌|白银|天水|酒泉|张掖|武威|定西|陇南|平凉|庆阳|临夏|甘南"];
prov[29] = ["宁夏", "|银川|石嘴山|吴忠|固原"];
prov[30] = ["青海", "|西宁|海东|海南|海北|黄南|玉树|果洛|海西"];
prov[31] = ["新疆", "|乌鲁木齐|石河子|克拉玛依|伊犁|巴音郭勒|昌吉|克孜勒苏柯尔克孜|博尔塔拉|吐鲁番|哈密|喀什|和田|阿克苏"];
prov[32] = ["香港", ""];
prov[33] = ["澳门", ""];
prov[34] = ["台湾", "|台北|高雄|台中|台南|屏东|南投|云林|新竹|彰化|苗栗|嘉义|花莲|桃园|宜兰|基隆|台东|金门|马祖|澎湖"];
prov[35] = ["其它", "|北美洲|南美洲|亚洲|非洲|欧洲|大洋洲"];


function selectCity(v) {

    $("#city-edit").html('');
    var a = prov[v][1];
    var b = a.split("|");

    for (var i = 0; i < b.length; i++) {

        $("#city-edit").append('<option value="' + i + '">' + b[i] + '</option>');
    };

};

function selectCityName(v, c) {


    var a = prov[v][1];
    var b = a.split("|");
    return b[c];

};



initCity();
function initCity() {

    for (var i = 0; i < prov.length; i++) {

        $("#province-edit").append('<option value="' + i + '">' + prov[i][0] + '</option>');
    }

    $("#city-edit").append('<option value="0">请选择</option>');

};



$('.m_guide_d_close').live('click', function () {
    VCookieManager.SetCookie('top_guide', '1');
    $('.m_guide_d').hide();
});
$('.m_guide_a_close').live('click', function () {
    VCookieManager.SetCookie('right_guide', '1');
    $('.m_guide_a').hide();
    $('.m_guide_b').hide();
    $('.m_guide_c').hide();
});

function modifyProfile() {

    $(".u_information_action").eq(0).css("display", "none");
    $(".u_information_action").eq(1).css("display", "block");

};



$(".itembtn a").eq(0).bind("click", function () {
    LoginManager.login(comm.app.login);
});



function bdmobile(v) {




    if (v == false) {
        if (comm.vipInfo.vipLevel != 0) {
            UserActivateInterface.show(1000000000);

        } else {
            bmobile();
        }

    } else {
        bmobile();

    }

}

function bmobile() {

    TGDialogS("pop_dia01");
    $(".item.mt20 input").val('');
    $(".item.mt10 input").val('');
    $('#pop_dia01 .item.mt20 span').eq(0).text('')
    $(".item.mt20 a").eq(0).unbind();
    $(".item.mt20 a").eq(0).bind("click", function () {
        bindMoible(1, { countrycode: $("#cCode").val(), phone: $(".item.mt20 input").val() })
    });
    $(".item.mt20 a").eq(1).unbind();
    $(".item.mt20 a").eq(1).bind("click", function () {
        bindMoible(2, { countrycode: $("#cCode").val(), phone: $(".item.mt20 input").val(), vcode: $(".item.mt10 input").val() })
    });

}


function bindMoible(v, b) {
    //绑定手机

    $(".item.mt20 .dia_getCode").eq(0).text("获取验证码");
    $.ajax({
        type: "POST",
        url: "http://apps.game.qq.com/php/tgclub/v2/user/bind_mobile?step=" + v,
        dataType: "jsonp",
        data: b,
        success: function (xml) {
            //console.log("step:"+v+" status:"+xml.status+" data:"+xml.data);
            if (v == 1) {
                if (xml.status > 0) {
                    //$(".item.mt20 .dia_getCode").eq(0).text("短信已发");
                    stepCode = 0;
                    totalSec = 180;
                    clearInterval(sendCode);
                    sendCode = setInterval(countdown, "1000");
                    $(".error").eq(0).text('');
                } else {
                    $(".error").eq(0).text(xml.data);
                }

            }
            if (v == 2) {
                if (xml.status > 0) {
                    TGDialogS('pop_dia02');
                }
            }

        }
    });
}


function changeMobile(v, b) {
    //修改手机

    $(".item.mt20 .dia_getCode").eq(0).text("获取验证码")
    $(".item.mt20 .dia_getCode").eq(1).text("获取验证码")

    $.ajax({
        type: "POST",
        url: "http://apps.game.qq.com/php/tgclub/v2/user/change_mobile?step=" + v,
        dataType: "jsonp",
        data: b,
        success: function (xml) {
            //console.log("step:"+v+" status:"+xml.status+" data:"+xml.data)


            if (v == 6) {
                if (xml.status > 0) {
                    stepCode = 2;
                    totalSec = 180;
                    clearInterval(sendCode);
                    sendCode = setInterval(countdown, "1000");
                    $(".error").eq(2).text('');
                    comm.app.tlog(2);


                } else {
                    $(".error").eq(2).text(xml.data);
                }
            }

            if (v == 1) {
                if (xml.status > 0) {
                    stepCode = 1;
                    totalSec = 180;
                    clearInterval(sendCode);
                    sendCode = setInterval(countdown, "1000");
                    $(".error").eq(1).text('');


                } else {
                    $(".error").eq(1).text(xml.data);
                }
            }
            if (v == 2) {
                if (xml.status == 0) {
                    $(".error").eq(1).text(xml.data);
                }
                if (xml.status > 0) {
                    TGDialogS('pop_dia01');
                    $(".item.mt20 input").val('');
                    $(".item.mt10 input").val('');
                    $(".item.mt20 a").eq(0).unbind();
                    $(".item.mt20 a").eq(0).bind("click", function () {
                        changeMobile(3, { countrycode: $("#cCode").val(), phone: $(".item.mt20 input").val() })
                    });

                }
            }

            if (v == 3) {

                if (xml.status > 0) {
                    //$(".item.mt20 .dia_getCode").eq(0).text("短信已发");
                    stepCode = 0;
                    totalSec = 180;
                    clearInterval(sendCode);
                    sendCode = setInterval(countdown, "1000");
                    $(".error").eq(0).text('');
                    $(".item.mt20 a").eq(1).unbind();
                    $(".item.mt20 a").eq(1).bind("click", function () {
                        changeMobile(4, { countrycode: $("#cCode").val(), phone: $(".item.mt20 input").val(), vcode: $(".item.mt10 input").val() })
                    });
                } else {
                    $(".error").eq(0).text(xml.data);
                }

            }

            if (v == 4) {
                if (xml.status > 0) {

                    $(".error").eq(0).text('');
                    TGDialogS('pop_dia02');
                } else {
                    $(".error").eq(0).text(xml.data);
                }

            }


            if (v == 7) {
                if (xml.status > 0) {
                    comm.app.tlog(3);
                    $(".error").eq(2).text('');
                    TGDialogS('pop_dia02');
                } else {
                    $(".error").eq(2).text(xml.data);
                }

            }


        }
    });
}
$(".date.fl p").eq(1).text('');



var defaultType = 0;
var defaultPage = 1;
var defaultPerPage = 10;
var defaultTab = 0;


function markItemRead(v) {

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/msg/read?" + v,
        dataType: "jsonp",
        success: function (xml) {

        }
    });


}

function deleteMsg(v) {

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/msg/del?" + v,
        dataType: "jsonp",
        success: function (xml) {
            if (xml.status > 0) {
                window.location.reload();
            }
        }
    });


}

function markAllRead() {

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/msg/readall",
        dataType: "jsonp",
        success: function (xml) {
            if (xml.status > 0) {
                window.location.reload();
            }
        }
    });


}



function readMail(t, p, item) {

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/msg/list",
        dataType: "jsonp",
        data: { msg_type: t, page: p, per_item: item },
        success: function (xml) {
            //站内信 我的消息

            $(".u_mynews_bd .channel").eq(defaultTab).text('');
            for (i = 0; i < xml.data.data.length; i++) {

                $(".u_mynews_bd .channel").eq(defaultTab).append('<div class="' + echoVisited(xml.data.data[i].is_read) + '"><div class="u_mynews_tit" id="' + xml.data.data[i].msg_id + '" mtype="' + xml.data.data[i].msg_type + '">' + echoOut(xml.data.data[i].out_date) + '<span class="date">' + xml.data.data[i].push_time_start + '</span><span class="ipt"><input type="checkbox" class="checkbox0" value="' + xml.data.data[i].msg_id + '"></span><span class="s"></span><span class="name">' + echoGame(xml.data.data[i].msg_type) + '</span><span class="subtitle">' + xml.data.data[i].title + '</span></div><div class="u_mynews_show"><a class="close" href="javascript:">关闭</a>' + xml.data.data[i].content + '</div></div>');


            }
            $(".u_mynews_bd .channel").eq(defaultTab).append('<div class="u_page mt20 clearfix"><div class="u_mynews_choose fl"><input type="checkbox" class="checkall"> 全选<a class="delbtn" href="#">删除</a><a class="readbtn" href="#">全部标记为已读</a></div><div class="pageshow fr">每页显示 <select class="source_sel" id="diao" name="source"> <option value="10">10条</option> <option value="20">20条</option> <option value="30">30条</option> </select></div><div class="pagination2"><span>' + xml.data.current_page + ' / ' + xml.data.total_pages + '</span>' + getPrePageLink(xml.data.current_page) + getNextPageLink(xml.data.current_page, xml.data.total_pages) + '</div></div>')
            //	$("#diao").eq(defaultTab).prop('selectedIndex', defaultPerPage);
            $(".u_mynews_bd .source_sel [value=" + defaultPerPage + "]").prop('selected', true);

            $(".u_mynews_bd .source_sel").eq(defaultTab).bind("change", function () {
                defaultPerPage = $(".u_mynews_bd .source_sel").eq(defaultTab).val();

                defaultPage = 1;
                readMail(defaultType, defaultPage, defaultPerPage)

            });
            //全选
            $('.checkall').change(function () {
                var checkboxes = $(".u_mynews_bd .channel").eq(defaultTab).find(':checkbox');
                if ($(this).is(':checked')) {
                    checkboxes.attr('checked', 'checked');
                } else {
                    checkboxes.removeAttr('checked');
                }
            });

            $(".readbtn").bind("click", function () {
                markAllRead();
            })

            $(".delbtn").eq(defaultTab).bind("click", function () {
                var ckb = $(".u_mynews_bd .channel").eq(defaultTab).find('input:checked');
                var msgAr = "";
                for (var i = 0; i < ckb.length; i++) {

                    msgAr += "msg_id[]=" + ckb[i].value + "&";
                }

                deleteMsg(msgAr.slice(0, -1));
            })

            $(".u_mynews_tit").click(function () {

                var t = $(this).attr('mtype');


                if (!$(this).parents(".u_mynews_box").hasClass('u_mynews_visited')) {
                    var a = $(".pn02 span").text();
                    var b = $(".u_mynews_hd li a span").eq(0);
                    var c = $(".u_mynews_hd li a span").eq(1);
                    var d = $(".u_mynews_hd li a span").eq(2);
                    var e = $(".u_mynews_hd li a span").eq(3);
                    if ((a - 1) == 0) {
                        $(".pn02 span").remove();
                        $(".mail .num").hide();
                        $(".u_mynews_hd li span").remove();
                    } else {
                        $(".pn02 span").text(a - 1);
                        $(".mail .num").text("(" + (a - 1) + ")");
                        b.text((b.text() - 1));
                        if (t == 100) {

                            c.text((c.text() - 1));
                        }
                        if (t == 200) {

                            d.text((d.text() - 1));
                        }
                        if (t == 300) {

                            e.text((e.text() - 1));
                        }



                    }

                }
                markItemRead("msg_id[]=" + $(this).attr('id'));
                $(this).parents(".u_mynews_box").toggleClass("u_mynews_on").siblings().removeClass("u_mynews_on");
                $(this).parents(".u_mynews_box").addClass("u_mynews_visited");


                $(this).parents(".u_mynews_box").children(".u_mynews_show").slideToggle().parents(".u_mynews_box").siblings(".u_mynews_box").find(".u_mynews_show").slideUp();
            });

            $('.checkbox0').click(function (e) {
                //alert($(this).val());
                e.stopPropagation();
            });


            $(".u_mynews_box").mouseenter(function () {
                $(this).toggleClass("u_mynews_hover").siblings().removeClass("u_mynews_hover");
            })
            $(".u_mynews_show .close").click(function () {
                $(this).parents(".u_mynews_box").children(".u_mynews_show").slideToggle().parents(".u_mynews_box").siblings(".u_mynews_box").find(".u_mynews_show").slideUp();
            });

            //定位

            if (location.hash.substr(1) != '') {

                $('.u_mynews_show').eq(location.hash.substr(1)).show();
                $('.u_mynews_box').eq(location.hash.substr(1)).addClass('u_mynews_visited');
                markItemRead("msg_id[]=" + $('.u_mynews_tit').eq(location.hash.substr(1)).attr('id'));

                var tempN = $(".pn02 span").text();

                if (tempN >= 1) {
                    $(".u_mynews_hd li span").eq(0).text(tempN - 1);
                    $(".pn02 span").text(tempN - 1);
                    $(".mail .num").text("(" + (tempN - 1) + ")");
                }

            }

            //

        }
    });



}

function getPrePageLink(v) {
    if (v > 1) {
        defaultPage = v - 1;
        return '<a href="javascript:readMail(' + defaultType + ',' + defaultPage + ',' + defaultPerPage + ')" class="uppage" alt="上一页">上一页</a>';
    } else {

        return '';
    }

}

function getNextPageLink(v, b) {
    if (v < b) {
        defaultPage = v + 1;
        return '<a href="javascript:readMail(' + defaultType + ',' + defaultPage + ',' + defaultPerPage + ')" class="downpage" alt="下一页">下一页</a>';
    } else {

        return '';
    }

}

var defaultGiftPage = 1;
var defaultGiftPerPage = 10;




function readGift(p, item) {

    //我的礼包
    $.ajax({

        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/ams/cdkeylist",
        dataType: "jsonp",
        data: { page: p, per_item: item },
        success: function (xml) {
            $(".u_gift_bd .tabA tbody").text('');

            $(".u_gift_bd .tabA tbody").append('<tr> <th width="15%">领取时间</th> <th width="20%">游戏</th> <th width="25%">礼包名称 </th> <th width="40%">CDKEY</th> </tr>');

            for (var cc = 0; cc < xml.data.data.length; cc++) {

                var giftDate = xml.data.data[cc].statis_date;
                $(".u_gift_bd .tabA tbody").append('<tr class="bg"> <td>' + giftDate.substring(0, 4) + '-' + giftDate.substring(4, 6) + '-' + giftDate.substring(6, 8) + '</td><td>' + xml.data.data[cc].game + '</td><td>' + xml.data.data[cc].package_name + '</td> <td><span class="cdkeystring">' + xml.data.data[cc].cdkey + '</span> <a class="copy" data-clipboard-text="' + xml.data.data[cc].cdkey + '">复制</a><a class="exchange" target="_blank" href="' + xml.data.data[cc].cdkeyurl + '">兑换</a></td> </tr>');

            }



            if (!isIE()) {
                var clip = new ZeroClipboard($(".copy"));

                clip.on("ready", function () {


                    this.on("aftercopy", function (event) {
                        alert("CDKEY已成功复制: " + event.data["text/plain"]);
                    });
                });
            } else {
                $(".copy").bind("click", function () {

                    if (window.clipboardData && clipboardData.setData) {
                        clipboardData.setData("Text", $(this).attr("data-clipboard-text"));
                        alert("CDKEY复制成功" + $(this).attr("data-clipboard-text"));
                    }

                })



            }



            $(".m_gift .u_gift_bd div").remove();
            $(".m_gift .u_gift_bd").append('<div class="u_page mt20 clearfix"> <div class="pageshow fr"> 每页显示 <select name="source" class="source_sel"> <option value="10">10条</option> <option value="20">20条</option> <option value="30">30条</option> </select> </div> <div class="pagination2"> <span>' + xml.data.current_page + ' / ' + xml.data.total_pages + '</span> ' + getPreGiftLink(xml.data.current_page) + getNextGiftLink(xml.data.current_page, xml.data.total_pages) + ' </div> </div>');

            $(".u_gift_bd .source_sel [value=" + defaultGiftPerPage + "]").prop('selected', true);

            $(".u_gift_bd .source_sel").bind("change", function () {
                defaultGiftPerPage = $(".u_gift_bd .source_sel").val();

                defaultGiftPage = 1;
                readGift(defaultGiftPage, defaultGiftPerPage);
            });


        }
    });

}



function getPreGiftLink(v) {
    if (v > 1) {
        defaultGiftPage = v - 1;
        return '<a alt="上一页" class="uppage" href="javascript:readGift(' + defaultGiftPage + ',' + defaultGiftPerPage + ')">上一页</a>';
    } else {

        return '';
    }

}

function getNextGiftLink(v, b) {
    if (v < b) {
        defaultGiftPage = v + 1;
        return '<a alt="下一页" class="downpage" href="javascript:readGift(' + defaultGiftPage + ',' + defaultGiftPerPage + ')">下一页</a>';
    } else {

        return '';
    }

}

var defaultGrowPage = 1;
var defaultGrowPerPage = 10;



var glist = {
    "2": {
        "gid": "2",
        "type": "1",
        "name": "cf",
        "value": "穿越火线"
    },
    "9": {
        "gid": "9",
        "type": "1",
        "name": "sg",
        "value": "QQ三国"
    },
    "10": {
        "gid": "10",
        "type": "1",
        "name": "x5",
        "value": "QQ炫舞"
    },
    "13": {
        "gid": "13",
        "type": "1",
        "name": "xy",
        "value": "轩辕传奇"
    },
    "16": {
        "gid": "16",
        "type": "1",
        "name": "yl",
        "value": "御龙在天"
    },
    "61": {
        "gid": "61",
        "type": "1",
        "name": "bns",
        "value": "剑灵"
    },
    "203": {
        "gid": "203",
        "type": "1",
        "name": "tps",
        "value": "枪神纪"
    }
}


//var xyitem = [['cf',248, 'DJCACT-cf-2-20150407111453',1,2],['sg'  ,26, 'DJCACT-sg-2-20150407143649',2,9],['bns'  ,27, 'DJCACT-bns-2-20150407144833',1,61],['xy'  ,19, 'DJCACT-xy-2-20150407154140',1,13],['x5'  ,180, 'DJCACT-x5-2-20150407113049',1,10],['tps'  ,29, 'DJCACT-tps-2-20150407112258',2,203],['yl'  ,33, 'DJCACT-yl-2-20150409164055',1,16]];

var xyitem = [['cf', 248, 'DJCACT-cf-2-20150407111453', 1, 2], ['sg', 26, 'DJCACT-sg-2-20150407143649', 2, 9], ['bns', 27, 'DJCACT-bns-2-20150407144833', 1, 61], ['xy', 19, 'DJCACT-xy-2-20150407154140', 1, 13], ['x5', 180, 'DJCACT-x5-2-20150407113049', 1, 10], ['tps', 29, 'DJCACT-tps-2-20150407112258', 2, 203], ['yl', 33, 'DJCACT-yl-2-20150409164055', 1, 16]];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}




function getItemOder(v) {

    for (var i = 0; i < xyitem.length; i++) {


        if (xyitem[i][0] == v) {

            return i;
        }
    }
}

function report() {
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/cgi-bin/client_pop/daoju/Recommend.cgi?act_type=3&table_type=1&bid=cf&recommend_id=123-123&scene_id=3&page=1&items_list=items",
        dataType: "jsonp",
        success: function (xml) {
            //console.log(xml);
        },
    });

}


function bsuccess() {
    personal_log('daoju', 2);
    LoginManager.reloadLogin();
    VCookieManager.SetCookie('personal_yue' + LoginManager.getUserUin(), 1);
}

function bfail() {
    personal_log('daoju', 3);
}

function get2itemNew(game_id) {
    var random = '';
    console.log(game_id);
    if (!game_id) random = 'random=1';
    $.ajax({
        type: "POST",
        url: "http://apps.game.qq.com/php/tgclub/v2/act_usercenter_libaorecom/daoju?" + random,
        dataType: "jsonp",
        success: function (xml) {
            console.log(xml);
            //console.table(xml.list);
            if (game_id) {
                for (var i = 0; i < xml.data.length; i++) {
                    if (xml.data[i].iGameId == game_id) {
                        var rN = xml.data[i];
                        break;
                    }
                }
            }
            else {
                var rN = xml.data[0];
            }
            console.log(rN);
            //alert(rN.iDJPdName);
            $.ajax({
                type: "POST",
                url: "http://apps.game.qq.com/client_pop/daoju/api.php?pdName=" + rN.iDJPdName + "&sence=4&scene_id=3&pageSize=25&curPage=1&actId=" + rN.iDJActId + "&actNo=" + rN.iDJActNo + "&actType=2",
                dataType: "jsonp",
                success: function (xml) {
                    //console.log(xml);
                    //console.table(xml.list);
                    var xyue = xml.list[0];
                    if (xml.errcode == 0) {
                        report();
                    }
                    need(['daoju.hx.order'], function (order) {
                        //初始化订单插件，初始化以后milo会在window域下注册D.order对象，如果在当前need函数外使用，可以直接用D.order.buy等方法
                        order.init({
                            biz: xyue.sPdName,//业务id -_-
                            plug_id: "7200",//插件id，比如7200（活动营销）、8300（积分+点券）
                            iGameType: rN.iDJType,//游戏类型，用来进行角色 -_-
                            iActionId: xyue.iActionId,//活动id -_-
                            iActionType: "2",//活动类型
                            sActionNo: xyue.sActionNo,//活动No -_-
                            areaType: 2,//大区选择框样式、1:道聚城大区选择框，2:milo默认选择框
                            recommend_id: '123-123',
                            scene_id: 3,
                            table_type: 2,
                            act_type: 3,
                            page: 1,
                            place: 1,
                            uin: LoginManager.getUserUin(),
                            onPaySuccess: bsuccess,//支付成功回调
                            onPayClose: null,//支付弹层关闭回调
                            onBuyError: null//下单失败回调
                        })
                    });
                    $('.m_propsc_list li').off();
                    var rDA = shuffleArray(xml.list);
                    for (var i = 0; i < 2; i++) {

                        set2item(i, rDA, xyue.sPdName, rN);

                    }
                }
            });
        }
    });
}

function get2item(rN) {

    $.ajax({
        type: "POST",
        url: "http://apps.game.qq.com/client_pop/daoju/api.php?pdName=" + rN[0] + "&sence=4&scene_id=3&pageSize=25&curPage=1&actId=" + rN[1] + "&actNo=" + rN[2] + "&actType=2",
        dataType: "jsonp",
        success: function (xml) {
            //console.log(xml);
            //console.table(xml.list);
            var xyue = xml.list[0];

            if (xml.errcode == 0) {
                report();
            }

            need(['daoju.hx.order'], function (order) {
                //初始化订单插件，初始化以后milo会在window域下注册D.order对象，如果在当前need函数外使用，可以直接用D.order.buy等方法
                order.init({
                    biz: xyue.sPdName,//业务id -_-
                    plug_id: "7200",//插件id，比如7200（活动营销）、8300（积分+点券）
                    iGameType: rN[3],//游戏类型，用来进行角色 -_-
                    iActionId: xyue.iActionId,//活动id -_-
                    iActionType: "2",//活动类型
                    sActionNo: xyue.sActionNo,//活动No -_-
                    areaType: 2,//大区选择框样式、1:道聚城大区选择框，2:milo默认选择框
                    recommend_id: '123-123',
                    scene_id: 3,
                    table_type: 2,
                    act_type: 3,
                    page: 1,
                    place: 1,
                    uin: LoginManager.getUserUin(),
                    onPaySuccess: bsuccess,//支付成功回调
                    onPayClose: null,//支付弹层关闭回调
                    onBuyError: null//下单失败回调
                })
            });
            $('.m_propsc_list li').off();
            var rDA = shuffleArray(xml.list);
            for (var i = 0; i < 2; i++) {

                set2item(i, rDA, xyue.sPdName);

            }


        }
    });



}

function set2item(i, xml, name, goods) {
    //alert('sssssssssssssssssssssssssss');
    $('.m_propsc_list li').eq(i).bind('click', function () {
        //console.log(xml[i]);
        LoginManager.reloadLogin();
        globalO = xml[i];
        UserActivateInterface.show_dialog('pop2');
        $('#djValue').empty();
        $('#djValue').append('<p>' + xml[i].sGoodsName + ' -心悦价格<em class="price-c1">' + xml[i].iPrice / 100 + 'Q币</em></p>');
        $('#pop2 .pop-per-bd .m_giftc_fc-lq').off();
        selectDaoJuServer(xml[i].sPdName);
        /*D.order.buy({
        iSeqId: xml[i].iSeqId,
        buynum:1,
        recinfo:'{"rec_info":[{"recommend_id":"123-123","act_type":"3","goods_id":"'+xml[i].iSeqId+'","page":"1","place":"1","scene_id":"3","table_type":"3","uin":"'+LoginManager.getUserUin()+'"}]}'	
    });	*/
    })
    $('.m_propsc_list .list-mask-title').eq(i).text(xml[i].sGoodsName);
    $('.iItemName').eq(i).text(xml[i].sGoodsName);
    //	$('.iGameName').text(glist[xyitem[getItemOder(name)][4]].value);
    $('.list-mask-game em').text(goods.iAMSGameName);
    curr_goods_id = goods.id;

    $('.m_propsc_list .list-mask-price').empty();
    $('.m_propsc_list .list-mask-price').eq(i).append('心悦价:' + (xml[i].iPrice / 100) + 'Q币<em>(' + (xml[i].iOrgPrice / 100) + 'Q币)</em>');
    $('.m_propsc_list .list-mask-price').eq(0).append('心悦价:' + (xml[0].iPrice / 100) + 'Q币<em>(' + (xml[0].iOrgPrice / 100) + 'Q币)</em>');
    $(".tips .c1").eq(i).text((xml[i].iPrice / 100) + 'Q币');

    $('.m_propsc_list img').eq(i).attr('src', xml[i].sGoodsPic);
}
$('#changeItem').off();
$('#changeItem').bind('click', function (e) {
    personal_log('daoju', 4);
    showDialog.hide();
    e.preventDefault();

    get2itemNew();
})



function readGrow(p, item) {

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/user/list_point",
        dataType: "jsonp",
        data: { page: p, per_item: item },
        success: function (xml) {
            //成长值
            var wow;
            if (xml.data.data[0] == undefined) {
                get2itemNew();
            } else {
                wow = (xml.data.data[0].gid);
            }
            if (wow != '' || wow != undefined) {
                if (glist[wow] != undefined) {
                    get2itemNew(wow);
                } else {
                    get2itemNew();
                }

            }
            $(".u_grow_bd .tabA tbody").text('');
            $(".u_grow_bd .tabA tbody").append('<tr>  <th width="17%">获取时间</th> <th width="30%">来源</th> <th width="25%">游戏/平台</th> <th width="20%">成长值</th> </tr>');
            for (i = 0; i < xml.data.data.length; i++) {


                $(".u_grow_bd .tabA tbody").append('<tr class="bg"> <td>' + xml.data.data[i].date + '</td> <td>' + findSource(xml.data.data[i].gid) + '</td> <td>' + bugfix(findGame(xml.data.data[i].gid)) + '</td> <td>' + xml.data.data[i].point + '</td> </tr>');

            }
            $(".m_grow .u_grow_bd div").remove();
            $(".m_grow .u_grow_bd").append('<div class="u_page mt20 clearfix"> <div class="pageshow fr"> 每页显示 <select name="source" class="source_sel"> <option value="10">10条</option> <option value="20">20条</option> <option value="30">30条</option> </select> </div> <div class="pagination2"> <span>' + xml.data.current_page + ' / ' + xml.data.total_pages + '</span>  ' + getPreGrowLink(xml.data.current_page) + getNextGrowLink(xml.data.current_page, xml.data.total_pages) + ' </div> </div>');

            $(".u_grow_bd .source_sel [value=" + defaultGrowPerPage + "]").prop('selected', true);

            $(".u_grow_bd .source_sel").bind("change", function () {
                defaultGrowPerPage = $(".u_grow_bd .source_sel").val();

                defaultGrowPage = 1;
                readGrow(defaultGrowPage, defaultGrowPerPage);
            });

        }
    });

}

function getPreGrowLink(v) {
    if (v > 1) {
        defaultGrowPage = v - 1;
        return '<a alt="上一页" class="uppage" href="javascript:readGrow(' + defaultGrowPage + ',' + defaultGrowPerPage + ')">上一页</a>';
    } else {

        return '';
    }

}

function getNextGrowLink(v, b) {
    if (v < b) {
        defaultGrowPage = v + 1;
        return '<a alt="下一页" class="downpage" href="javascript:readGrow(' + defaultGrowPage + ',' + defaultGrowPerPage + ')">下一页</a>';
    } else {

        return '';
    }

}


function echoGame(v) {

    if (v == 100) {
        return "【游戏礼包】";
    };
    if (v == 200) {
        return "【系统消息】";
    };
    if (v == 300) {
        return "【服务安全】";
    };
}

function echoVisited(v) {

    if (v == 0) {
        return "u_mynews_box";
    };
    if (v == 1) {
        return "u_mynews_box u_mynews_visited";
    };
}

function echoOut(v) {

    if (v) {
        return '<span class="expired">已过期</span>';
    } else {
        return '';
    }
}


function gamefamily_status(v1, v2, v3) {
    var type = v1;
    var point = v2;

    if (v3 == "2030-12-30") {
        $('.m_login .date .n').text('-');
    } else {
        $('.m_login .date .n').text(v3);
    }

    //http://xinyue.qq.com/act/pc/a20160116yxwj/?ADTAG=gw.home.gamefamily
    $('.m_login .name i').remove()
    $('.u_user_vip .dtVip .bar').css("width", 148);
    $(".date.fl p").eq(1).text('游戏家有效期');

    $('.u_user_btn a').empty(); $('.u_user_btn a').append('G分');
    $('.u_user_btn a').on('click', function () {
        window.location.href = "http://xinyue.qq.com/act/pc/a20171212Gminute/index.html?ADTAG=gw.denglu"
    })
    $('.m_login .value .n').text(point);

    if (type == 0) {
        $('.m_login .rank .n').text(1);
        $(".rank.fl p").eq(1).text("距离升级还需");
        $(".vip").eq(0).text("非会员");
        $(".vip").eq(1).text("游戏家L1");
        $(".dtVip .bar .c").css("width", 0);
    }
    if (type == 1) {
        //L1  1~999
        $(".rank.fl p").eq(1).text("距离升级还需");
        $(".vip").eq(0).text("游戏家L1");
        $(".vip").eq(1).text("游戏家L2");
        var p1 = Math.floor((point / 999) * 100);
        $('.m_login .rank .n').text(1000 - point);
        $(".dtVip .bar .c").css("width", p1 + "%");
    }
    if (type == 2) {
        //L2  1000~4999
        $(".rank.fl p").eq(1).text("距离升级还需");
        $(".vip").eq(0).text("游戏家L2");
        $(".vip").eq(1).text("游戏家L3");
        var p1 = Math.floor(((point - 1000) / 3999) * 100);
        $('.m_login .rank .n').text(5000 - point);
        $(".dtVip .bar .c").css("width", p1 + "%");
    }
    if (type == 3) {
        //L3  5000~9999
        $(".rank.fl p").eq(1).text("距离升级还需");
        $(".vip").eq(0).text("游戏家L3");
        $(".vip").eq(1).text("游戏家L4");
        var p1 = Math.floor(((point - 5000) / 4999) * 100);
        $('.m_login .rank .n').text(10000 - point);
        $(".dtVip .bar .c").css("width", p1 + "%");
    }
    if (type == 4) {
        //L4  10000~49999
        $(".rank.fl p").eq(1).text("距离升级还需");
        $(".vip").eq(0).text("游戏家L4");
        $(".vip").eq(1).text("心悦VIP1");
        var p1 = Math.floor(((point - 10000) / 39999) * 100);
        $('.m_login .rank .n').text(50000 - point);
        $(".dtVip .bar .c").css("width", p1 + "%");
    }


}

function mainloginLink() {


    if (window.location.href.indexOf("webgame.shtml") != -1) {
        $('.login_r').hide();
        $('.logined_r').show();
    }

    if (window.location.href.indexOf("personal.shtml") != -1) {
        $(".cent").text('最新活动')
        $(".cent").bind("click", function () {
            window.location.href = "http://xinyue.qq.com/web201410/recommend.shtml?ADTAG=gw.personal.login";
        })
    } else {
        $(".cent").html('个人中心<i>')
        $(".cent").bind("click", function () {
            window.location.href = "http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.login.button#";
        })
    }


}



var totalSec = 180;
var sendCode;
var stepCode = 0;
//var sendCode = setInterval(countdown,"1000");
function countdown() {

    $(".item.mt20 .dia_getCode").eq(stepCode).text((totalSec--) + "秒后重发")
    if (totalSec <= 0) {

        $(".item.mt20 .dia_getCode").eq(stepCode).text("获取验证码");
        totalSec = 20;
        clearInterval(sendCode);
    }
}


function scene_counter(a, b) {

    $.ajax({
        type: 'GET',
        url: 'http://apps.game.qq.com/php/tgclub/v2/act_scene_go/counter',
        dataType: "jsonp",
        data: { eid: a, refer: b },
        success: function (data) {

        }

    });

}


function afterLogin() {


    //场景触达
    $.ajax({
        type: 'GET',
        url: 'http://apps.game.qq.com/php/tgclub/v2/act_scene_go/scene',
        dataType: "jsonp",
        success: function (data) {
            if (data.data == 1) {
                $('.mail.clearfix').text(data.title);
                $('.mail.clearfix').show();
                $('.mail.clearfix').off();
                $('.mail.clearfix').on('click', function () {
                    scene_counter(data.id, window.location.href)
                    window.open(data.url, '_blank');
                })
                $('.mail.clearfix').css('cursor', 'pointer');
            }
        }

    });


    //	$('.m_sectionE').hide() 
    $('.m_sectionEC').hide()

    //全部未读消息
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/msg/unread_total",
        dataType: "jsonp",
        success: function (xml) {

            if (xml.status > 0) {
                //登录

                $(".u_message_login.bor").css("display", "none");
                $(".m_attend").css("display", "none");
                $(".m_login").css("display", "block");


                //console.log("登录");
                if (window.location.href.indexOf("mail.shtml") != -1) {
                    readMail(defaultType, defaultPage, defaultPerPage);
                }

                if (window.location.href.indexOf("gift.shtml") != -1) {
                    readGift(defaultGiftPage, defaultGiftPerPage);
                }

                if (window.location.href.indexOf("grow.shtml") != -1 || window.location.href.indexOf("personal.shtml") != -1) {



                    $.ajax({
                        type: "GET",
                        url: "http://apps.game.qq.com/php/tgclub/v2/gid/getall/",
                        dataType: "jsonp",
                        success: function (xml) {
                            if (xml.status > 0) {
                                gameList = xml.data;
                                readGrow(defaultGrowPage, defaultGrowPerPage);
                            }
                        }
                    });


                }






                if (window.location.href.indexOf("personal.shtml") != -1) {
                    //个人中心 站内信
                    $.ajax({
                        type: "GET",
                        url: "http://apps.game.qq.com/php/tgclub/v2/msg/list",
                        dataType: "jsonp",
                        success: function (xml) {

                            $(".m_sectionF .m_news .u_news_list").text('');

                            for (i = 0; i < xml.data.data.length; i++) {
                                var a = xml.data.data[i].is_read;
                                if (i < 3) {
                                    if (a == 0) {

                                        $(".m_sectionF .m_news .u_news_list").append('<li><a href="http://xinyue.qq.com/web201410/mail.shtml?ADTAG=gw.personal#' + i + '" onclick="pgvSendClick({hottag:\'gw.personal.news\'});"><i class="s"></i>' + xml.data.data[i].title + '</a></li>');
                                    } else {
                                        $(".m_sectionF .m_news .u_news_list").append('<li><a href="http://xinyue.qq.com/web201410/mail.shtml?ADTAG=gw.personal#' + i + '" onclick="pgvSendClick({hottag:\'gw.personal.news\'});"><i class="s open"></i>' + xml.data.data[i].title + '</a></li>');
                                    }
                                }



                            }
                        }
                    });
                }


                if (xml.data == 0) {
                    $(".mail").hide();
                    $(".mailnum").remove();
                } else {
                    $(".pn02 a").append('<span class="mailnum">' + xml.data + '</span>');
                    $(".u_login_user .mail").append('<i class="s2"></i>');
                    $(".u_login_user .mail").append('<i class="num">(' + xml.data + ')</i>');//未读

                    $(".mail a").append('<i class="num">(' + xml.data + ')</i>');//未读
                    $(".mail a").append('<i class="s2"></i>');
                };
            } else {
                //未登录



            }

        }
    });
    //



    //我的游戏 最近登录
    if (window.location.href.indexOf("personal.shtml") != -1) {

        $.ajax({
            type: "GET",
            url: "http://apps.game.qq.com/php/tgclub/v2/game/recent_list",
            dataType: "jsonp",
            success: function (xml) {
                $(".m_mygame.fl ul").text('');
                $(".u_mygame_list").css("display", "block");
                if (xml.data != 0) {
                    $(".u_mygame_recommend").css("display", "none");
                }
                for (i = 0; i < xml.data.length; i++) {
                    if (i < 3) {
                        var a = '<li><span class="u_mygame_name">' + xml.data[i].game + '</span><span class="u_mygame_txt"> 最近登录时间 ' + xml.data[i].time.substring(0, 10) + '</span></li>'
                        $(".m_mygame.fl ul").append(a);
                    }


                }
            }
        });
    }//


    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/user/logininfonew",
        dataType: "jsonp",
        success: function (xml) {
            //登录信息 成长值

            if (xml.data.level == 8) {
                $('.m_person_nav .pn08').show();
            }
            comm.user.valid_date = xml.data.vaild_date;
            var days = getDayBetweenTwoDays(xml.data.cur_time, xml.data.vaild_date)
            doTaskbyDays(days, xml.data.uin)

            if (window.location.href.indexOf("integral.shtml") != -1) {
                $('.red-info').html('<i class="hd_score_ico"></i>我的G分:' + xml.data.intergral);
            }

            if (window.location.href.indexOf("grow_new.shtml") != -1) {
                //swiper.stopAutoplay();
                //swiper.slideTo(xml.data.level);
            }
            $('.top_bar_xyscore').empty();
            $('.top_bar_xyscore').append('<i class="ico_topbar_1"></i>' + xml.data.intergral)


            if (xml.data.point >= 40000 && xml.data.point <= 49999) {
                $('.u_enter_list .n2').addClass('n5')
                $('.u_enter_list .n2').empty();
                $('.u_enter_list .n2').append('<a target="_blank" href="http://xinyue.qq.com/act/pc/a20160629zlcz/index.shtml?ADTAG=gw.kuai" onclick="pgvSendClick({hottag:\'gw.home.path.gift\'});"><span class="io"></span><span class="txt">特权礼包</span></a>')
                $('.u_user_hd .mail').empty();
                if (window.location.pathname == '/') {
                    $('.u_user_hd .mail').append('<a href="http://xinyue.qq.com/act/pc/a20160629zlcz/index.shtml?ADTAG=gw.dl" target="_blank">准心悦特权礼包领取</a>');
                } else {
                    $('.u_user_hd .mail').append('<a href="http://xinyue.qq.com/act/pc/a20160629zlcz/index.shtml?ADTAG=gw.zone.dl" target="_blank">准心悦特权礼包领取</a>');
                }

            }



            if (xml.data.point >= 10000 && xml.data.point < 50000 && xml.data.mobile_bind_time == 0 && xml.data.mobile == "") {

                $('.u_phone_comm').show()
                $('.u_phone_edit').hide()
            } else {

                //是否有绑定手机
                if (xml.data.mobile != "" || xml.data.mobile != 0) {
                    $('.u_phone_highlight').show()
                    //	$('.u_phone_highlight a').eq(0).text("+" + xml.data.countrycode+" "+xml.data.mobile)
                } else {
                    $('.u_phone_comm').hide()
                    $('.u_phone_edit').show()
                    $('.u_phone_edit a').bind("click", function () {
                        bdmobile(comm.vipInfo.ifactive)
                    })
                }
            }



            if (window.location.href.indexOf("news_version3") != -1) {
                if (VCookieManager.getCookie('xinyue_guide_' + comm.user.qq) == undefined) {
                    //window.startIntro();
                }
            }


            //游戏家激活


            $('.xy-pop-gift-bubble a').eq(0).bind("click", function () {

                open_box("1000000005");



            })

            $('.xy-pop-gift-bubble a').eq(1).bind("click", function (e) {

                e.preventDefault()
                $(this).parent().hide();



            })

            //游戏家激活
            if (xml.data.flag == 0) {

                console.log('black user')
                TGDialogS('block2')
                showblockresult();
                $('.dia-con .dia-con1 p').eq(0).empty()
                $('.dia-con .dia-con1 p').eq(0).append('<p><span>当前QQ</span>' + xml.data.uin + '</p>')

            } else {

            }

            if (xml.status > 0) {
                comm.user.ifLogined = true;
                //	$('.m_sectionE').show();
                //	$('.m_sectionEC').show();
                $('.m_sectionF').show();
                $('.m_sectionG').show();
                $('.u_message_lbox').show();
                $('.u_message_bottom').show();
                $('.m_newact').show();

                if (xml.data.level == 0) {
                    $('.m_sectionE').eq(0).remove();
                    $('.m_sectionEC').remove();
                } else {

                }


                var r = (xml.data.cur_time - xml.data.mobile_bind_time) / 86400;
                $(".item.mt20 span").eq(2).text(xml.data.mobile);

                if (window.location.href.indexOf("personal.shtml") != -1) {





                    if (xml.data.level > 1) {
                        //console.log("wow...")
                        //window.location.href = "http://xinyue.qq.com/web201410/personal_new.shtml?ADTAG=gw.new.personal";
                    } else {
                        //window.location.href = "http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.new.personal";
                    }

                    if (r > 90 && xml.data.actived == 1 && xml.data.mobile != '') {
                        //TGDialogS(pop_dia04);
                        //comm.app.tlog(1);
                    }
                }


                if (window.location.href.indexOf("grow_new.shtml") != -1) {



                    if (xml.data.actived != 1) {
                        $("#btn-active").bind("click", function () {
                            UserActivateInterface.show(1000000003);
                        });
                        $("#btn-li").bind("click", function () {
                            UserActivateInterface.show(1000000003);
                        });

                    } else {
                        $("#btn-active").bind("click", function () {
                            alert("你已经激活");
                        });
                        $("#btn-li").bind("click", function () {
                            alert("你已经激活");
                        });
                    }

                    if (xml.data.flag == 2) {
                        if (xml.data.level == 1) {
                            widthSizeFun(50000);
                            comm.growPoint = 50000;
                        }
                        if (xml.data.level == 2) {
                            widthSizeFun(100000);
                            comm.growPoint = 100000;
                        }
                        if (xml.data.level == 3) {
                            widthSizeFun(800000);
                            comm.growPoint = 800000;
                        }

                    } else {
                        if (xml.data.point > 800000) {
                            widthSizeFun(800000);
                            comm.growPoint = 800000;
                        } else {
                            widthSizeFun(xml.data.point);
                            comm.growPoint = xml.data.point;
                        }
                    }

                    $('#grow_id').text("VIP" + xml.data.level);


                    if (xml.data.level == 0) {
                        $('.tq_icon').eq(0).show();
                        $('.tq_icon').eq(1).hide();
                        $('.tq_icon').eq(2).hide();
                        $('#grow_reach').text(50000 - xml.data.point);
                        $('#grow_id').text("非会员");
                        $(".side_list1 li").eq(3).hide();
                        $("#myRight").hide();

                    }

                    if (xml.data.level == 1) {
                        $('.tq_icon').eq(0).show();
                        $('.tq_icon').eq(1).hide();
                        $('.tq_icon').eq(2).hide();
                        $('#grow_reach').text(100000 - xml.data.point);

                    }
                    if (xml.data.level == 2) {
                        $('.tq_icon').eq(0).hide();
                        $('.tq_icon').eq(1).show();
                        $('.tq_icon').eq(2).hide();
                        $('#grow_reach').text(800000 - xml.data.point);

                    }
                    if (xml.data.level == 3) {
                        $('.tq_icon').eq(0).hide();
                        $('.tq_icon').eq(1).hide();
                        $('.tq_icon').eq(2).show();
                        if ((800000 - xml.data.point) < 0 || xml.data.flag == 2) {
                            $('#grow_reach').text("已是最高级");
                        } else {
                            $('#grow_reach').text(800000 - xml.data.point);
                        }

                    }
                    $('#grow_value').text(xml.data.point);

                    $('#grow_date').text(xml.data.vaild_date);


                }




            }



            $('.top-light-login .top-light-dl').hide();
            $('.top-light-login p').show();
            $('#btn-login').hide();
            $('#vipPanel').show();
            $('#caiyueicon').hide();
            if (comm.user.nickName != '') {
                $('#usermsg,#usermsg_top').html(myString.formatStr(comm.user.nickName));
                //$(".item span").eq(3).html(xml.data.mobile+'<a href="javascript:TGDialogS('+"pop_dia01"+')">绑定手机</a>');
                //$(".item span").eq(13).html(xml.data.mobile+'<a href="javascript:TGDialogS('+"pop_dia01"+')">绑定手机</a>');
                $(".item span").eq(11).text(myString.formatStr(comm.user.nickName));
                $("#mynick").text(myString.formatStr(comm.user.nickName));
                $('#u-name').html(myString.formatStr(comm.user.nickName));
            } else {
                $('#usermsg,#usermsg_top').html(comm.user.qq);
                $(".item span").eq(0).text(comm.user.qq);
                $(".item span").eq(11).text(comm.user.qq);
                $('#u-name').html(comm.user.qq);
            }

            $('#vipmark').show();
            $('#vipType').show();



            comm.vipInfo.mobile = xml.data.mobile;

            if (xml.data.level == 7) {
                $('.time-list li').eq(0).html('<h3>400-150-8888</h3><span>国外用户请拨0086-755-86013288</span>');
                $('.ser-list-i2').show(); $('.ser-list-i4').show(); $('.ser-list-i7').show();
                $('#nav_service .subnav2 a').eq(0).show();
                $('#nav_service .subnav2').css("bottom", "-82px");
            }

            if (xml.data.level > 4) {

                //	$('.m_person_nav ul').append('<li class="pn07"><a href="http://xinyue.qq.com/web201410/follow.shtml?ADTAG=gw.personal.leftbar"><i class="s"></i>订阅管理<i class="arr"></i></a></li>')
                if (window.location.href.indexOf("follow.shtml") != -1) {
                    $('.m_nav_list li').removeClass("cur").eq(6).addClass("cur");
                    $('.m_person_nav li a').removeClass("cur").eq(5).addClass("cur");
                }

                comm.vipInfo.is_tgclub_vip = true;

                if (xml.data.actived != 1) {

                } else {
                    $('#activated_btn').show();
                }
                if (xml.data.actived == 1) {
                    comm.vipInfo.ifactive = true;
                    $('#vipTypeLogo,#vipTypeLogo_top').addClass('ico_vip' + shift_level_num(xml.data.level));
                } else {
                    comm.vipInfo.ifactive = false;
                    $('#vipTypeLogo,#vipTypeLogo_top').addClass('ico_novip' + shift_level_num(xml.data.level));
                }

                $('#joinxy').hide();
                $('#gmname').html(decodeURIComponent(comm.vipInfo.gm.name));
                $('#agmid').html(comm.vipInfo.gm.qq);
                $('#agmid').attr('href', 'tencent://message/?uin=' + comm.vipInfo.gm.qq);
                $('#gmphone').html(comm.vipInfo.gm.phone);
                $('#vailddate').html(comm.vipInfo.points.vailddate);
                //显示会员类型
                $('#vipType').html(comm.config.viptype['l' + comm.vipInfo.vipLevel]);
                //显示会员类型logo

                if (comm.vipInfo.is_tenpay_vip > 0) {
                    $('#caiyueicon').show();
                }
                if (comm.vipInfo.vipLevel == 3) {
                    $('#tel_mark').removeClass('ico_age1');
                    $('#tel_mark').addClass('ico_age2');
                    $('#tel_mark').attr('title', '心悦管家');
                    $('#tel_mark').attr('href', 'http://xinyue.qq.com/web201206/sv_steward.shtml');
                }
            } else {
                $('#vipTypeLogo').removeClass();
                $('#vipType').html('');
                /*if((comm.vipInfo.is_game_vip>0) && (comm.vipInfo.is_tenpay_vip<=0)) {
                    //game vip user
                    $('#vipType').html('蓝悦会员');
                    if(!comm.vipInfo.ifactive){
                        $('#activated_btn').show();  
                    }
                } else */if (comm.vipInfo.is_tenpay_vip > 0) {
                        //tenpay vip user
                        //$('#vipType').html('财悦会员');
                        if (!comm.vipInfo.ifactive) {
                            $('#activated_btn').show();
                        }
                        $('#caiyueicon').show();
                    }/* else if((comm.vipInfo.is_game_vip>0) && (comm.vipInfo.is_tenpay_vip>0)) {
                    	//tenpay and game vip user
                    	$('#vipType').html('财悦会员,蓝悦会员');
                    	if(!comm.vipInfo.ifactive){
                    		$('#activated_btn').show();  
                    	}
                    }*/ else {
                        //not vip1,vip2,tenpay vip,game vip
                        $('#vipType').append("<a title='个人中心' target='_blank' href='" + host + "web201206/my_xinyue.shtml'>非VIP会员</a>");
                        $('#to_be_viper').show();
                        $('#vipTypeLogo,#vipTypeLogo_top').addClass('ico ico_nonvip');
                        $('#to_activate').hide();
                    }
            }



            if (xml.data.expir_in_30 == 1) {
                $(".date.fl .n").css({ 'color': 'red', 'font-weight': 'Bold' });
            };


            $(".value.fl p").eq(0).text(xml.data.point);//成长值
            $(".value.fl p").eq(1).text("成长值");

            if (window.location.pathname == '/') {
                $(".date.fl p").eq(0).text(xml.data.vaild_date); //会员有效期
                $(".date.fl p").eq(1).text('会员有效期');
            }

            $(".u_message_num .clearfix .n").eq(0).text(xml.data.point);

            $(".bar").attr("title", "当前成长值:" + xml.data.point);//悬浮成长值
            $(".n.c_ff").text(xml.data.point);




            if (xml.data.point_rank_diff < 0) {

                $(".u_message_num .clearfix .n").eq(2).text(-(xml.data.point_rank_diff));
                $(".u_message_num .clearfix .n").eq(2).append('<i class="n_down"></i>');
                $(".rank.fl p").eq(0).append('<i class="n_down"></i>');
            };

            if (xml.data.point_rank_diff > 0) {

                $(".u_message_num .clearfix .n").eq(2).text(xml.data.point_rank_diff);
                $(".u_message_num .clearfix .n").eq(2).append('<i class="n_up"></i>');
                $(".rank.fl p").eq(0).append('<i class="n_up"></i>');
            };



            //$(".dtVip .bar .c").css("width","90%")进度条
            var sLevel = xml.data.level;
            var sPoint = xml.data.point;
            var sFlag = xml.data.flag;
            var sActive = xml.data.actived

            if (sLevel > 0) {
                //console.log('哇会员')
                $('#bbsTitle').text('官网论坛');
                $('#bbsContent').empty();
                $('#bbsLink').attr('href', 'http://xinyue.gamebbs.qq.com/forum.php?ADTAG=gw.personal.forum.more');
                var bbsT = '';

                if (window.location.href.indexOf("personal.shtml") != -1) {

                    $.ajax({
                        type: "GET",
                        url: "http://apps.game.qq.com/php/tgclub/v2/act_usercenter_bbs/get_content",
                        dataType: "jsonp",
                        success: function (xml) {
                            for (var i = 0; i < xml.length; i++) {
                                bbsT += '<li><em class="date">' + timeConverter(xml[i][0].dateline) + '</em><a href="http://xinyue.gamebbs.qq.com/forum.php?mod=viewthread&tid=' + xml[i][0].tid + '" target="_blank" onclick="pgvSendClick({hottag:\'gw.personal.forum\'});"><i class="s">' + getBbsType(i) + '</i>' + xml[i][0].subject + '</a></li>'
                            }
                            $('#bbsContent').empty();
                            $('#bbsContent').append(bbsT);
                        },
                    });

                }

            }

            comm.vipInfo.vipLevel = sLevel;
            comm.app.ckshowActiveDialog();

            //          	 
            if (window.location.href.indexOf("personal.shtml") != -1) {

                $.ajax({
                    type: "GET",
                    url: "http://apps.game.qq.com/php/tgclub/v2/user/get_crm",
                    dataType: "jsonp",
                    success: function (xml) {
                        //管家

                        if (sLevel == 3) {
                            $(".m_serv.fl").eq(0).css("display", "none");
                            $(".m_serv.fl").eq(1).css("display", "block");
                        }


                        if (xml.data != null) {
                            $(".qq a span").text(xml.data);

                            $(".qq a").attr("href", "http://b.qq.com/webc.htm?new=0&sid=" + xml.data + "&o=test&q=7");
                            $(".qq a").attr("target", "_blank");


                        } else {
                            $(".qq a").remove();

                        }




                    }
                });
            }	 //




            if (sLevel != 0) {
                //$(".u_message_num .clearfix .n").eq(1).text(xml.data.point_rank);
                $(".rank.fl p").eq(0).text(xml.data.point_rank); //心悦排名
                $(".u_message_num .clearfix .n").eq(1).text(xml.data.point_rank);

            } else {

                $(".u_message_num .clearfix .n").eq(1).text(xml.data.point_diff);
                $(".rank.fl p").eq(0).text(xml.data.point_diff);
                $(".u_message_num .clearfix .n").eq(2).text("-");
            }





            if (xml.data.actived == 0) {
                //未激活
                $(".name").eq(1).attr({ 'onclick': 'UserActivateInterface.show(1000000003);', 'style': 'cursor:pointer;' })



                if (sLevel == 0) {
                    $(".item").eq(1).append('<i class="ico_vip ico_nonvip"></i>');
                    $(".item").eq(12).append('<i class="ico_vip ico_nonvip"></i>');
                    $(".name").eq(1).append('<i class="ico_vip ico_nonvip"></i>');
                    mainloginLink();

                } else {
                    $(".item").eq(1).append('<i class="ico_vip ico_novip' + shift_level_num(xml.data.level) + '"></i>');
                    $(".item").eq(12).append('<i class="ico_vip ico_novip' + shift_level_num(xml.data.level) + '"></i>');
                    $(".name").eq(1).append('<i class="ico_vip ico_novip' + shift_level_num(xml.data.level) + '"></i>');
                    $(".cent").text('立即激活')

                    $(".cent").attr({ 'onclick': 'UserActivateInterface.show(1000000000)', 'href': '#' })
                }

            } else {
                if (sLevel == 0) {
                    $(".item").eq(1).append('<i class="ico_vip ico_nonvip"></i>');
                    $(".item").eq(12).append('<i class="ico_vip ico_nonvip"></i>');
                    $(".name").eq(1).append('<i class="ico_vip ico_nonvip"></i>');
                } else {
                    $(".item").eq(1).append('<i class="ico_vip ico_vip' + shift_level_num(xml.data.level) + '"></i>');
                    $(".item").eq(12).append('<i class="ico_vip ico_vip' + shift_level_num(xml.data.level) + '"></i>');
                    $(".name").eq(1).append('<i class="ico_vip ico_vip' + shift_level_num(xml.data.level) + '"></i>');
                }

                mainloginLink();
            }
            //http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.login.button



            if (window.location.pathname == "/") {
                $('.u_user_vip .dtVip').show();
            }
            if (sLevel < 5) {
                gamefamily_status(xml.data.level, xml.data.point, xml.data.vaild_date)
            }
            //gamefamily_status(o.data.type,o.data.point,o.data.vaild_date)
            if (sLevel == 5) {//10w
                $(".u_message_num .clearfix .n").eq(1).text(xml.data.point_diff);
                $(".rank.fl p").eq(0).text(xml.data.point_diff);
                $(".rank.fl p").eq(1).text("距离升级还需");
                $(".u_message_num p").eq(3).text("距离升级还需" + xml.data.point_diff);
                $(".item span").eq(1).text("VIP1");
                $(".item span").eq(12).text("VIP1");
                $(".vip").eq(0).text("VIP1");
                $(".vip").eq(1).text("VIP2");
                var p2 = Math.floor((sPoint / 100000) * 100);
                $(".dtVip .bar .c").css("width", p2 + "%");
                $(".u_message_load .load span").css("width", (130 * p2 / 100) + 110);
                $(".u_message_load .novip").css("background", "#5697ff");
                $(".u_message_load .vip1").css("background", "#5697ff");
                $(".u_message_load .vip2").css("background", "#d0d0d0");
                $(".u_message_load .vip3").css("background", "#d0d0d0");
            };
            if (sLevel == 6) {//80w
                $(".u_message_num .clearfix .n").eq(1).text(xml.data.point_diff);
                $(".rank.fl p").eq(0).text(xml.data.point_diff);
                $(".rank.fl p").eq(1).text("距离升级还需");
                $(".u_message_num p").eq(3).text("距离升级还需" + xml.data.point_diff);
                $(".item span").eq(1).text("VIP2");
                $(".item span").eq(12).text("VIP2");
                $(".vip").eq(0).text("VIP2");
                $(".vip").eq(1).text("VIP3");
                var p3 = Math.floor((sPoint / 800000) * 100);
                $(".dtVip .bar .c").css("width", p3 + "%");
                $(".u_message_load .load span").css("width", (240 * p3 / 100) + 240);
                $(".u_message_load .novip").css("background", "#5697ff");
                $(".u_message_load .vip1").css("background", "#5697ff");
                $(".u_message_load .vip2").css("background", "#5697ff");
                $(".u_message_load .vip3").css("background", "#d0d0d0");

            };
            if (sLevel == 7) {

                $(".rank.fl p").eq(1).text("排名");
                $(".u_message_num p").eq(3).text("排名");
                if (xml.data.point_rank != 0) {
                    $(".u_message_num .clearfix .n").eq(1).text(xml.data.point_rank);
                    $(".rank.fl p").eq(0).text(xml.data.point_rank);
                } else {
                    $(".u_message_num .clearfix .n").eq(1).text("不在前5000名");
                    $(".u_message_num .clearfix .n").eq(1).addClass("c_ff");
                    $(".rank.fl p").eq(0).text("不在前5000名");
                }
                $(".item span").eq(1).text("VIP3");
                $(".item span").eq(12).text("VIP3");
                $(".vip").eq(0).text("VIP3");
                $(".vip").eq(1).text("满级");
                var p4 = Math.floor((sPoint / 1500000) * 100);
                $(".dtVip .bar .c").css("width", "100%");
                $(".u_message_load .load span").css("width", "600");
                $(".u_message_load .novip").css("background", "#5697ff");
                $(".u_message_load .vip1").css("background", "#5697ff");
                $(".u_message_load .vip2").css("background", "#5697ff");
                $(".u_message_load .vip3").css("background", "#5697ff");
            };
            if (sLevel == 8) {

                $(".rank.fl p").eq(1).text("排名");
                $(".u_message_num p").eq(3).text("排名");
                if (xml.data.point_rank != 0) {
                    $(".u_message_num .clearfix .n").eq(1).text(xml.data.point_rank);
                    $(".rank.fl p").eq(0).text(xml.data.point_rank);
                } else {
                    $(".u_message_num .clearfix .n").eq(1).text("不在前5000名");
                    $(".u_message_num .clearfix .n").eq(1).addClass("c_ff");
                    $(".rank.fl p").eq(0).text("不在前5000名");
                }
                $(".item span").eq(1).text("VIP4");
                $(".item span").eq(12).text("VIP4");
                $(".vip").eq(0).text("VIP4");
                $(".vip").eq(1).text("满级");
                var p4 = Math.floor((sPoint / 1500000) * 100);
                $(".dtVip .bar .c").css("width", "100%");
                $(".u_message_load .load span").css("width", "600");
                $(".u_message_load .novip").css("background", "#5697ff");
                $(".u_message_load .vip1").css("background", "#5697ff");
                $(".u_message_load .vip2").css("background", "#5697ff");
                $(".u_message_load .vip3").css("background", "#5697ff");
            };
        }
    });


    //登录



}



function getBbsType(v) {
    if (v == 0) {
        return 'HOT';
    }
    if (v == 1) {
        return 'NEW';
    }
    if (v == 2) {
        return 'RE';
    }
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var time = year + '/' + month + '/' + date;
    return time;
}




function isIE() {
    var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;
    var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;
    return isIE11orLess;
}

function logoutV2() {
    $(".m_attend").css("display", "block");
    $(".m_login").css("display", "none");
    $('#unlogin').show();
    $('#vipPanel').hide();
    LoginManager.logout(comm.app.loginOut);
    VCookieManager.delCookie('right_guide');
    VCookieManager.delCookie('top_guide');
}
if (VCookieManager.getCookie('hintDot') == 1) {

}

//document.body.innerHTML +='<div class="dia-log" id="block1" style="display:none"><div class="dia-con"><div class="dia-tit"><img src="http://ossweb-img.qq.com/images/tgclub/web201410/pop/logo.jpg" width="54" height="42"/><span>心悦俱乐部封号申诉</span></div><div class="dia-con1_top"><div class="dia-sm"><p>抱歉，你当前账号因为违规操作已被封号，无法享受心悦特权</p></div></div><div class="dia-con1"><p><span>当前QQ</span>x</p><p><span>联系方式</span><input type="text" class="dia-txt"/></p><div class="dia-c"><p class="dia-je">最近充值金额</p><div class="dia-yuan dia-ft"><input type="text" class="dia-txtput"/>元</div></div><div class="dia-c"><p class="dia-czqd"><span>常用充值渠道</span><br/><i class="dia-lh">最多勾选3项</i></p><table class="dia-check"><tr><td class="dia-w1"> <label><input type="checkbox" value="1"/> QQ卡</label> </td><td class="dia-w2"> <label><input type="checkbox" value="2"/> 财付通快捷支付</label> </td><td class="dia-w3"> <label><input type="checkbox" value="3"/> 微信支付</label> </td><td><label><input type="checkbox" value="4"/> 银行卡</label> </td></tr><tr><td> <label><input type="checkbox" value="5"/> 财付通</label></td><td><label><input type="checkbox" value="6"/> 固定电话</label></td><td><label><input type="checkbox" value="7"/> 手机</label> </td><td><label><input type="checkbox" value="8"/> 手机充值卡</label> </td></tr><tr><td><label><input type="checkbox" value="9"/> 网吧</label> </td><td><label><input type="checkbox" value="10"/> 刷卡支付</label></td><td><label><input type="checkbox" value="11"/> 电信易充</label></td><td><label><input type="checkbox" value="12"/> PayPal</label></td></tr></table></div><div class="dia-c"><p class="dia-czqd"><span>详细描述</span><br/><i class="dia-lh">封号前的具体操作</i> </p><div class="dia-gd_nav dia-czqd dia-mr"><textarea class="dia-txtarea"></textarea></div></div><a href="javascript:;" class="dia-btn" id="blockSubmit">提交申诉 >></a> </div><a class="dia-close" href="javascript:showDialog.hide()" title="关闭">×</a></div></div><div class="dia-log" id="block2" style="display:none"><div class="dia-con dia-pt"><div class="dia-tit"><img src="http://ossweb-img.qq.com/images/tgclub/web201410/pop/logo.jpg" width="54" height="42"/><span>心悦俱乐部封号提醒</span></div><div class="dia-con1_top"><div class="dia-sm dia-sm1"><p>抱歉，你当前账号因为违规操作已被封号，无法享受心悦特权</p></div></div><a href="javascript:;" class="dia-btn" id="gotoBlock">我要申诉 >></a><a class="dia-close" href="javascript:showDialog.hide()" title="关闭">×</a></div></div><div class="dia-log" id="block3" style="display:none"><div class="dia-con dia-pt"><div class="dia-tit"><img src="http://ossweb-img.qq.com/images/tgclub/web201410/pop/logo.jpg" width="54" height="42"/><span>心悦俱乐部封号查询</span></div><div class="dia-con3"><p class="dia-desp">2015.xx.xx<span>提交封号（123456789）申诉</span></p><div class="dia-desp dia-c"><em class="dia-czqd">2015.xx.xx</em><span class="dia-czqd">复查结果：</span><p class="dia-czqd">经核实该账号与2015.xx.xx在充值《游戏名字》<br/>违反游戏规定，无法解封</p></div><a href="javascript:;" class="dia-btn">我已了解 >></a></div><a class="dia-close" href="javascript:showDialog.hide()" title="关闭">×</a></div></div>';
var popVar = '<div class="dia-log" id="block1" style="display:none"><div class="dia-con"><div class="dia-tit"><img src="http://ossweb-img.qq.com/images/tgclub/web201410/pop/logo.jpg" width="54" height="42"/><span>心悦俱乐部封号申诉</span></div><div class="dia-con1_top"><div class="dia-sm"><p>抱歉，你当前账号因为违规操作已被封号，无法享受心悦特权</p></div></div><div class="dia-con1"><p><span>当前QQ</span>x</p><p><span>联系方式</span><input type="text" class="dia-txt"/></p><div class="dia-c"><p class="dia-je">最近充值金额</p><div class="dia-yuan dia-ft"><input type="text" class="dia-txtput"/>元</div></div><div class="dia-c"><p class="dia-czqd"><span>常用充值渠道</span><br/><i class="dia-lh">最多勾选3项</i></p><table class="dia-check"><tr><td class="dia-w1"> <label><input type="checkbox" value="1"/> QQ卡</label> </td><td class="dia-w2"> <label><input type="checkbox" value="2"/> 财付通快捷支付</label> </td><td class="dia-w3"> <label><input type="checkbox" value="3"/> 微信支付</label> </td><td><label><input type="checkbox" value="4"/> 银行卡</label> </td></tr><tr><td> <label><input type="checkbox" value="5"/> 财付通</label></td><td><label><input type="checkbox" value="6"/> 固定电话</label></td><td><label><input type="checkbox" value="7"/> 手机</label> </td><td><label><input type="checkbox" value="8"/> 手机充值卡</label> </td></tr><tr><td><label><input type="checkbox" value="9"/> 网吧</label> </td><td><label><input type="checkbox" value="10"/> 刷卡支付</label></td><td><label><input type="checkbox" value="11"/> 电信易充</label></td><td><label><input type="checkbox" value="12"/> PayPal</label></td></tr></table></div><div class="dia-c"><p class="dia-czqd"><span>详细描述</span><br/><i class="dia-lh">封号前的具体操作</i> </p><div class="dia-gd_nav dia-czqd dia-mr"><textarea class="dia-txtarea"></textarea></div></div><a href="javascript:;" class="dia-btn" id="blockSubmit">提交申诉 >></a> </div><a class="dia-close" href="javascript:showDialog.hide()" title="关闭">×</a></div></div><div class="dia-log" id="block2" style="display:none"><div class="dia-con dia-pt"><div class="dia-tit"><img src="http://ossweb-img.qq.com/images/tgclub/web201410/pop/logo.jpg" width="54" height="42"/><span>心悦俱乐部封号提醒</span></div><div class="dia-con1_top"><div class="dia-sm dia-sm1"><p>抱歉，你当前账号因为违规操作已被封号，无法享受心悦特权</p></div></div><a href="javascript:;" class="dia-btn" id="gotoBlock">我要申诉 >></a><a class="dia-close" href="javascript:showDialog.hide()" title="关闭">×</a></div></div><div class="dia-log" id="block3" style="display:none"><div class="dia-con dia-pt"><div class="dia-tit"><img src="http://ossweb-img.qq.com/images/tgclub/web201410/pop/logo.jpg" width="54" height="42"/><span>心悦俱乐部封号查询</span></div><div class="dia-con3"><p class="dia-desp">2015.xx.xx<span>提交封号（123456789）申诉</span></p><div class="dia-desp dia-c"><em class="dia-czqd">2015.xx.xx</em><span class="dia-czqd">复查结果：</span><p class="dia-czqd">经核实该账号与2015.xx.xx在充值《游戏名字》<br/>违反游戏规定，无法解封</p></div><a href="javascript:;" class="dia-btn">我已了解 >></a></div><a class="dia-close" href="javascript:showDialog.hide()" title="关闭">×</a></div></div>';
$('body').append(popVar);

function getblockvalue() {

    var sList = "";
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            sList += $(this).val() + ',';
        }

    });

    return sList.slice(0, -1);
}

function set_xinyue_game_cookie() {
    VCookieManager.SetCookie('xinyue_guide_' + comm.user.qq, 1)
}

var introObj;

function startIntro() {

    introObj = introJs().setOptions({
        'showButtons': false,
        'nextLabel': '下一步',
        //'prevLabel': '上一步',
        //'skipLabel': '跳过',
        //'doneLabel': '完成',
        'steps': [
			{
			    element: '#intro_step_5',
			    intro: '<p style="width: 600px">个人中心定制化礼包功能已上线</p><a href="http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.gamezone.nav.intro" onclick="introObj.exit();set_xinyue_game_cookie();" role="button" class="introjs-custom-button">马上体验</a>'
			}
        ],
        'showBullets': false
    }).onbeforechange(function (targetElement) {
        $('.intro-el').css('display', 'none');
        if (targetElement.id == 'intro_step_2') {
            $('.section-1 .cycle-gifts li .intro-add').css('display', 'block');
        } else if (targetElement.id == 'intro_step_3') {
            $('.section-1 .intro-settings span').css('display', 'inline');
        }
    }).onexit(function () {
        //结束后，将介绍动画要用到的元素恢复原状
        $('.intro-el').css('display', 'none');
        console.log(1);
    }).start();

}


function returnblockreason(v, b) {
    if (v == '') {
        return '<div class="dia-desp c"><span class="fl">单据正在审核中....</span></div>';
    } else {
        return '<div class="dia-desp c"><em class="fl">' + b + '</em><span class="fl">复查结果：</span><p class="fl">' + v + '</p></div>';
    }

}

function birthRemain111(v) {


    var daysTotal = 0;
    var birthday = v;
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var _month = date.getMonth() + 1;//当前月份
    var _day = date.getDate();//当前天数
    var month = parseInt(birthday.split('-')[1]);//生日月份
    var day = parseInt(birthday.split('-')[2]);//生日天数
    if (month > _month) {
        for (var j = _month; j < month; j++) {
            daysTotal = TotalDays(year, j, daysTotal);
        }
        daysTotal = daysTotal + day - _day;
    } else if (month < _month) {
        for (var k = month; k < _month; k++) {
            daysTotal = TotalDays(year, k, daysTotal);
        }
        var dayFull = TotalDays(year, 0, daysTotal);
        daysTotal = dayFull - daysTotal + day - _day;
    } else {
        if (day >= _day) {
            daysTotal = day - _day;
        } else {
            daysTotal = TotalDays(year, 0, daysTotal) - (_day - day);
        }
    }
    return daysTotal;

}


function birthRemain(birthday) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var b = new Date(birthday);
    b.setFullYear(today.getFullYear());

    if (b < today) {
        b.setFullYear(today.getFullYear() + 1);
    }

    return (b - today) / 1000 / 86400;

}


function activeGameFamily(v1, v2) {
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/home/user/activate_user?phone=" + v1 + "&token=&activeFrom=" + v2 + "&skey=skey",
        dataType: "jsonp",
        success: function (xml) {

        }
    });
}

function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month.toString().length == 1) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    return month + "-" + day;
}

function getServerTime(v) {
    var date = new Date(v * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month.toString().length == 1) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    return month + "-" + day;
}


function showblockresult() {
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/service_blacklist/list",
        dataType: "jsonp",
        success: function (xml) {

            if (xml.status == 0) {

                if (xml.data[0] == undefined) {

                } else {
                    if (xml.data[0].iOrderStatus == 1) {



                        //

                        if (xml.data[0].iOrderStatus == 1 && xml.data[0].iIsUnlock == 1) {

                            TGDialogS('block3')
                            $('#block3 .dia-con3').empty();
                            for (var i = 0; i < xml.data.length; i++) {

                                $('#block3 .dia-con3').append('<p class="dia-desp">抱歉，你当前账号因为违规操作已被封号，无法享受心悦特权</p>')
                            }
                            $('#block3 .dia-con3').append('<a href="javascript:TGDialogS(\'block1\');" class="dia-btn">我要申诉 &gt;&gt;</a>')

                        } else {

                            TGDialogS('block3')
                            $('#block3 .dia-con3').empty();
                            for (var i = 0; i < xml.data.length; i++) {
                                $('#block3 .dia-con3').append('<p class="dia-desp">尊敬的用户你好!</p>');
                                $('#block3 .dia-con3').append('<p class="dia-desp">你于 ' + xml.data[i].dtComplaint + ' 提交的封号帐号申诉 ' + xml.data[i].sDeal + '</p>')
                            }
                            $('#block3 .dia-con3').append('<a href="javascript:TGDialogS(\'block1\');" class="dia-btn">我要申诉 &gt;&gt;</a>')
                        }

                        //

                    } else {
                        TGDialogS('block3')
                        $('#block3 .dia-con3').empty();
                        for (var i = 0; i < xml.data.length; i++) {
                            $('#block3 .dia-con3').append('<p class="dia-desp">尊敬的用户你好!</p>');
                            $('#block3 .dia-con3').append('<p class="dia-desp">你已提交了封号帐号申诉，申诉结果以帐号登陆心悦官网状态为准，对核实存在违规事实的玩家将保留封停心悦会员资格的处罚。 </p>')

                        }



                    }
                }

                //	
            } else {
                alert(xml.msg)
            }


        }

    })
}


function open_box(aFrom) {
    TGDialogS('popGift1');
    $('#phoneInputBox a').bind("click", function () {
        var xmatch = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var tel = $('#_phone').val();
        var code = $('#_areacode').val();
        if (code == 86 && !xmatch.test(tel)) {
            $('#_phone').addClass('highlight')
            $('#phoneInputBox p').show();
        } else {
            $('#_phone').removeClass('highlight')
            $('#phoneInputBox p').hide();
            //提交
            $.ajax({
                type: "GET",
                url: "http://apps.game.qq.com/php/tgclub/v2/user/bind_mobile?step=1",
                dataType: "jsonp",
                data: { phone: tel, countrycode: code },
                success: function (xml) {
                    if (xml.status > 0) {

                        alert('验证码已经发出，请查看手机短信');
                        return;
                    } else {
                        alert(xml.data);

                    }
                }
            });
        }
    })


    //
    $('#verifyInputBox a').bind("click", function () {
        var tel = $('#_phone').val();
        var area = $('#_areacode').val();
        var code = $('#_vcode').val()
        var _uActiveFrom = aFrom;
        if (code != '') {
            $.ajax({
                type: "GET",
                url: "http://apps.game.qq.com/php/tgclub/v2/user/bind_mobile?step=2",
                dataType: "jsonp",
                data: { countrycode: area, phone: tel, vcode: code, activeFrom: _uActiveFrom },
                success: function (xml) {
                    if (xml.status > 0) {


                        //	activeGameFamily(tel,_uActiveFrom)
                        alert("绑定成功，现在去开启宝箱吧！")
                        $('.xy-btn-open').removeClass('xy-disabled');
                        $('.xy-pop-bd .xy-btn-open').bind("click", function () {
                            amsSubmit(49210, 255838)
                        })
                        return;
                    } else {
                        alert(xml.data);
                    }
                }
            });
            $('#_vcode').removeClass('highlight')
            $('#verifyInputBox p').hide();
        } else {
            $('#_vcode').addClass('highlight')
            $('#verifyInputBox p').show();
            $('#verifyInputBox p').text('请输入验证码')
        }
    })



}

function setPopCookie(name, value, day) {

    var Days = day;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}

function shift_level(v) {
    if (v == 1) {
        return 'L1'
    }
    if (v == 2) {
        return 'L2'
    }
    if (v == 3) {
        return 'L3'
    }
    if (v == 4) {
        return 'L4'
    }
    if (v == 5) {
        return 'V1'
    }
    if (v == 6) {
        return 'V2'
    }
    if (v == 7) {
        return 'V3'
    }
    if (v == 8) {
        return 'V3'
    }
    if (v == 0) {
        return '非会员'
    }
}
function shift_level_num(v) {
    if (v == 1) {
        return 'L1'
    }
    if (v == 2) {
        return 'L2'
    }
    if (v == 3) {
        return 'L3'
    }
    if (v == 4) {
        return 'L4'
    }
    if (v == 5) {
        return '1'
    }
    if (v == 6) {
        return '2'
    }
    if (v == 7) {
        return '3'
    }
    if (v == 8) {
        return '3'
    }
    if (v == 0) {
        return '非会员'
    }
}

function getDayBetweenTwoDays(v1, v2) {
    var oneDay = 24 * 60 * 60; // hours*minutes*seconds*milliseconds
    var myDate = v2;
    myDate = myDate.split("-");
    var newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0];
    myDate = new Date(newDate).getTime() / 1000;
    curDate = v1;
    var diffDays = (myDate - curDate) / oneDay;
    return Math.round(diffDays)
}

function doTaskbyDays(v, v2) {

    if (v <= 30 && v > 15) {
        show_expire_tips(v - 15, v2);
        show_expire_soon_bubble(v - 15, v2);
        //30天
    } else if (v <= 15 && v > 7) {
        show_expire_tips(v - 7, v2);
        show_expire_soon_bubble(v - 7, v2);
        //15天
    } else if (v <= 7 && v > 3) {
        show_expire_tips(v - 3, v2);
        show_expire_soon_bubble(v - 3, v2);
        //7天
    } else if (v <= 3 && v > 1) {
        show_expire_tips(v - 1, v2);
        show_expire_soon_bubble(v - 1, v2);
        //3天  
    } else if (v == 1) {
        show_expire_tips(1, v2);
        show_expire_soon_bubble(1, v2);
        //1天
    } else if (v < -3 && v >= -7) {
        //过期7天 
        show_expired_tips(Math.abs(v + 3), v2)
        show_expire_bubble(Math.abs(v + 3), v2)
    } else if (v <= -1 && v >= -3) {
        //过期3天

        show_expired_tips(Math.abs(v + 1), v2)
        show_expire_bubble(Math.abs(v + 1), v2)
    } else if (v <= -1 && v >= -3) {
        show_expired_tips(365, v2);

    }

}


function show_expire_tips(v, v2) {

    if (VCookieManager.getCookie('expire_soon_tips' + v2) == undefined) {
        $('.expire_tips').show()
        $('.expire_tips').html('你的心悦会员将于' + date_convert(comm.user.valid_date) + '过期，续期可享有每月价值万元的免费礼包。 <a href="http://xinyue.qq.com/web201206/help_about.shtml#name2i?ADTAG=gw.home.login.jo">查看如何续期</a>')
        setPopCookie('expire_soon_tips' + v2, 1, v)
    }
}
function show_expired_tips(v, v2) {

    if (VCookieManager.getCookie('expired_tips' + v2) == undefined) {
        $('.expire_tips').show()
        $('.expire_tips').html('你的心悦会员于' + date_convert(comm.user.valid_date) + '过期，续期可享有每月价值万元的免费礼包。 <a href="http://xinyue.qq.com/web201206/help_about.shtml#name2i?ADTAG=gw.home.login.jo">查看如何续期</a>')
        setPopCookie('expired_tips' + v2, 1, v)
    }
}

function show_expire_soon_bubble(v, v2) {
    if (VCookieManager.getCookie('expire_soon_bubble' + v2) == undefined) {
        $('.xy-pop-gift-bubble').show();
        $('.xy-pop-gift-bubble').empty();
        $('.xy-pop-gift-bubble').append('<span>你的心悦会员资格将于' + date_convert(comm.user.valid_date) + '到期&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="http://xinyue.qq.com/web201206/help_about.shtml#name2i?ADTAG=gw.home.top.jo1" class="xy-btn-get">查看如何续期</a><a href="javascript:" class="xy-btn-close"></a>')
        setPopCookie('expire_soon_bubble' + v2, 1, v)
    }
}

function show_expire_bubble(v, v2) {
    if (VCookieManager.getCookie('expired_bubble' + v2) == undefined) {
        $('.xy-pop-gift-bubble').show();
        $('.xy-pop-gift-bubble').empty();
        $('.xy-pop-gift-bubble').append('<span>你的心悦会员资格于' + date_convert(comm.user.valid_date) + '已到期&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="http://xinyue.qq.com/web201206/help_about.shtml#name2i?ADTAG=gw.home.top.jo2" class="xy-btn-get">查看如何续期</a><a href="javascript:" class="xy-btn-close"></a>')
        setPopCookie('expired_bubble' + v2, 1, v)
    }
}

function date_convert(v) {
    var a = v;
    var b = a.split('-');
    return b[0] + '年' + parseInt(Number(b[1])) + '月' + parseInt(Number(b[2])) + '日';
}


function listblock() {
    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/service_blacklist/list",
        dataType: "jsonp",
        success: function (xml) {

            if (xml.status == 0) {
                TGDialogS('block1');
                $('#block1 .con1 p').eq(0).empty();
                $('#block1 .con1 p').eq(0).append('<span>当前QQ</span>' + comm.user.qq + '');
                if (xml.data[0] == undefined || xml.data[0].iOrderStatus == 1) {
                    TGDialogS('block1')
                    $('#block1 .con1 p').eq(0).empty();
                    $('#block1 .con1 p').eq(0).append('<span>当前QQ</span>' + comm.user.qq + '');
                    //提交
                } else {
                    //显示办理进度
                    TGDialogS('block3')
                    $('#block3 .dia-con3').empty();
                    for (var i = 0; i < xml.data.length; i++) {

                        $('#block3 .dia-con3').append('<p class="dia-desp">尊敬的用户你好!</p>');
                        $('#block3 .dia-con3').append('<p class="dia-desp">你于 ' + xml.data[i].dtComplaint + ' 已提交了封号帐号申诉，工作人员会在3-7个工作日内尽快进行复查，请耐心等待复查结果。 </p>')

                    }
                    $('#block3 .dia-con3').append('<a href="javascript:window.location.href = \'http://xinyue.qq.com\';" class="dia-btn">我已了解 &gt;&gt;</a>')

                }
            } else {
                alert(xml.msg)
            }


        }

    })
}


$('#gotoBlock').bind('click', function () {
    //显示         
    listblock();

})





//添加
$("#blockSubmit").unbind("click");
$('#blockSubmit').bind('click', function () {

    var desc = $('#block1 textarea').eq(0).val();
    var mobile = $('#block1 input').eq(0).val();
    var mount = $('#block1 input').eq(1).val();

    if (desc == '' || mobile == '' || mount == '' || getblockvalue() == '') {
        alert('请输入完整资料');
        return;

    }


    var qd = getblockvalue()

    $.ajax({
        type: "GET",
        url: "http://apps.game.qq.com/php/tgclub/v2/service_blacklist/add",
        data: { sUserDesc: desc, sUserMobile: mobile, iUserDepositamount: mount, sRechargeChannel: qd },
        dataType: "jsonp",
        contentType: "application/jsonp; charset=utf-8",
        success: function (xml) {
            if (xml.status == -1003) {
                console.log(xml.msg)
            }
            if (xml.status == -1006) {
                alert(xml.msg);
            }

            if (xml.status == 0) {
                listblock();
            }
            console.log(xml)

        }

    })

})



$(".dia-con1 .dia-check input").change(function () {
    var n = 0;
    $(".dia-con1 .dia-check input").each(function () {
        if ($(this).attr("checked") == "checked") {
            n++;
        }
    })
    if (n > 3) {
        $(this).removeAttr("checked");
        alert("最多选择3个");
    }
})

//数据埋点
