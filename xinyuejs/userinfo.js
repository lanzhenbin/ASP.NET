﻿var mminfo = {
    loadbase: function () {
        //birthday year 
        for (var i = 1940; i < 2010; i++) {
            var ele = '<option value="${value}">${text}</option>';
            var relele = ele.replace(/\$\{value\}/g, i).replace(/\$\{text\}/g, i);
            $('#year-edit').append(relele);
        }
        //birthday month
        for (var i = 1; i < 13; i++) {
            var ele = '<option value="${value}">${text}</option>';
            var relele = ele.replace(/\$\{value\}/g, i).replace(/\$\{text\}/g, i);
            $('#month-edit').append(relele);
        }




        //clothes
        //衣服
        for (var xxx in base_cfg.clothes) {
            var ele = '<option value="${value}">${text}</option>';
            var relele = ele.replace(/\$\{value\}/g, xxx).replace(/\$\{text\}/g, base_cfg.clothes[xxx]);
            $('#clothes-edit').append(relele);
        }
        //province selector
        ptc.getProvinceList(0, "province-edit");

        //city selector
        ptc.getCityList(0, "city-edit");
    },
    mathTenTran: function (ttype, number) {
        return number.toString(ttype);
    },
    strToArr: function (str) {
        var alist = [];
        if (str == "" || str == null) {
            return null;
        }
        str = mminfo.mathTenTran(2, str);
        for (var i = str.length - 1; i >= 0; i--) {
            if (str.charAt(i) == '1') {
                alist.push(str.length - 1 - i);
            }
        }
        return alist;
    },
    fillInterest: function (arr) {
        if (!arr || !arr.length) {
            return;
        }
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += base_cfg.hobby[Math.pow(2, (arr[i]))] + ",";
        }
        $('#an-interest').html(str);

    },
    seleYear: function (year) {
        var eobj = $('#year-edit');
        for (var i = 0; i < eobj[0].length; i++) {
            if (eobj.get(0).options[i].value == year) {
                eobj.get(0).options[i].selected = true;
            }
        }
    },
    fillGame: function (gameLen, gameId, gameEId) {
        for (var i = 0; i < gameLen; i++) {
            var unit = comm.userInfo.info.detailinfo[gameId][i];
            var unitArr = mminfo.strToArr(unit);
            if (!unitArr || !unitArr.length) {
                return;
            }
            if (unitArr.length > 0) {
                for (var c = 0; c < unitArr.length; c++) {
                    $('#' + gameEId + '-' + i + '-' + Math.pow(2, (unitArr[c]))).attr('checked', true);
                }
            }
        }
    },
    loadData: function () {
        if (comm.userInfo.status) {
            // 基本资料
            $('#an-name').html(decodeURIComponent(comm.userInfo.info.name));
            $('#an-phone').html(comm.userInfo.info.phone);
            if (comm.userInfo.info.sex == "1") {
                $('#an-sex').html('男');
            } else if (comm.userInfo.info.sex == "0") {
                $('#an-sex').html('女');
            } else {
                $('#an-sex').html('男');
            }
            // 详细地址					
            var birth = comm.userInfo.info.detailinfo.birthday;
            $('#an-birth').html(birth.year + '-' + birth.month + '-' + birth.day);
            //$('#eclothes').html(comm.userInfo.info.clothes);		
            //ptc.selectProv(comm.userInfo.info.addr.province,"an-province","an-city");
            //ptc.selectCity(comm.userInfo.info.addr.city,"an-city");	
            $('#an-address').html(decodeURIComponent(comm.userInfo.info.address));

            // 生日
            //mminfo.seleYear(comm.userInfo.info.detailinfo.birthday.year);
            //                    if ( comm.userInfo.info.detailinfo.birthday.month <= 0 ) {
            //                        $('#emonth').get(0).selectedIndex = 0;
            //                    }
            //                    else {
            //                        $('#emonth').get(0).selectedIndex=comm.userInfo.info.detailinfo.birthday.month-1;
            //                    }
            //					if ( comm.userInfo.info.detailinfo.birthday.day <= 0 ) {
            //                        $('#eday').get(0).selectedIndex = 0;
            //                    }
            //                    else {
            //                        $('#eday').get(0).selectedIndex=comm.userInfo.info.detailinfo.birthday.day-1;
            //                    }
            //                    if (comm.userInfo.info.detailinfo.gameuin != 0) {
            $('#an-qq').html(comm.userInfo.info.detailinfo.gameuin);
            //                  }                
            if (comm.userInfo.info.detailinfo.clothes == 'undefined') {
                comm.userInfo.info.detailinfo.clothes = 0;
            }
            $('#eclothes').html(base_cfg.clothes[comm.userInfo.info.detailinfo.clothes]);
            $('#an-mail').html(comm.userInfo.info.mail);
            $('#an-postcode').html(comm.userInfo.info.detailinfo.postcode);
            $('#an-wx').html(comm.userInfo.info.weixin);
        } else {
            $('#an-name').html('');
            $('#an-phone').html('');
            $('#an-sex').html('');
            $('#an-address').html('');
            $('#an-birth').html('');
            $('#eclothes').html('');
            $('#an-postcode').html('');
            $('#an-qq').html('');
            $('#an-mail').html('');
            $('#an-wx').html('');
        }

        // 详细资料
        //$('#an-tel').html(comm.userInfo.info.detailinfo.tel); 
        //$('#eincome').html(base_cfg.income[comm.userInfo.info.detailinfo.income]);
        //$('#eprofession').html(base_cfg.profession[comm.userInfo.info.detailinfo.profession]);
        //$('#eeducation').html(base_cfg.education[comm.userInfo.info.detailinfo.education]);
        //$('#ebloodtype').html(base_cfg.bloodtype[comm.userInfo.info.detailinfo.bloodtype]);
        //                    // 兴趣爱好
        //var interests=mminfo.strToArr(comm.userInfo.info.detailinfo.hobby);
        //mminfo.fillInterest(interests);		

        // 游戏资料
        //mminfo.fillGame(3,'rpg','rpg');
        //mminfo.fillGame(2,'athletics','fps');
        //mminfo.fillGame(2,'tab','plat');
        //mminfo.fillGame(2,'webgame','webgame');
        //mminfo.fillGame(2,'wapgame','wapgame');
    },
    _fillMonth: function () {
        //注入日期
        //birthday day
        var syear = $('#year-edit').find('option:selected').text();
        var smonth = $('#month-edit').find('option:selected').text();
        var ifrun = 0;
        var totalDays = 30;
        var bmonths = [1, 3, 5, 7, 8, 10, 12];

        if (bmonths.indexOf(smonth) >= 0) {
            totalDays = 31;
        }
        //var smonth=comm.userInfo.info.detailinfo.birthday.month;
        if (smonth == 2) {
            if (syear % 4 == 0) {
                totalDays = 29;
            } else {
                totalDays = 28;
            }
        }
        $('#day-edit').empty();

        for (var i = 1; i <= totalDays; i++) {
            var ele = '<option value="${value}">${text}</option>';
            var relele = ele.replace(/\$\{value\}/g, i).replace(/\$\{text\}/g, i);
            $('#day-edit').append(relele);
        }

    },
    //edit user info
    loadEditData: function () {
        if (comm.userInfo.info == 'undefined') {
            alert('user info not ready');
        }
        //base information
        $('#an-name-edit').val(decodeURIComponent(comm.userInfo.info.name));
        $('#an-phone-edit').val(comm.userInfo.info.phone);

        if (comm.userInfo.info.sex == "0") {
            $('#women').attr('checked', true);
        } else {
            $('#men').attr('checked', true);
        }


        ptc.selectProv(comm.userInfo.info.addr.province, "province-edit", "city-edit");
        ptc.getCityList(comm.userInfo.info.addr.province, "city-edit");
        ptc.selectCity(comm.userInfo.info.addr.city, "city-edit");

        // 生日
        mminfo.seleYear(comm.userInfo.info.detailinfo.birthday.year);
        if (comm.userInfo.info.detailinfo.birthday.month <= 0) {
            $('#month-edit').get(0).selectedIndex = 0;
        }
        else {
            $('#month-edit').get(0).selectedIndex = comm.userInfo.info.detailinfo.birthday.month - 1;
        }

        mminfo._fillMonth();

        if ($('#day-edit').get(0).length < comm.userInfo.info.detailinfo.birthday.day) {
            comm.userInfo.info.detailinfo.birthday.day = $('#day-edit').get(0).length;
        }

        if (comm.userInfo.info.detailinfo.birthday.day <= 0) {
            $('#day-edit').get(0).selectedIndex = 0;
        }
        else {
            $('#day-edit').get(0).selectedIndex = comm.userInfo.info.detailinfo.birthday.day - 1;
        }
        if (comm.userInfo.info.detailinfo.gameuin != 0) {
            $('#qq-edit').val(comm.userInfo.info.detailinfo.gameuin);
        }

        $('#clothes-edit').val(comm.userInfo.info.detailinfo.clothes);
        $('#email-edit').val(comm.userInfo.info.mail);
        $('#wx-edit').val(comm.userInfo.info.weixin);
        $('#postcode-edit').val(comm.userInfo.info.detailinfo.postcode);
    },
    loadData2: function () {
        alert('加载成功！');
    },

    analysisGameArr: function (arr, gameLen) {
        var gameArr = new Array();
        var valList = new Array();
        var val = 0;
        var i = 0;

        for (i = 0; i < gameLen; i++) {
            gameArr[i] = new Array();
            gameArr[i][0] = 0;
            valList[i] = 0;
        }
        for (i = 0; i < arr.length; i++) {
            val = arr[i].split("-");
            gameArr[val[0]].push(val[1]);
        }
        for (i = 0; i < gameLen; i++) {
            valList[i] = comm.commonApp.arrToDecimal(gameArr[i]);
        }
        gameArr = null;
        return valList;
    },

    getGameData: function (gameId, gameLen) {
        var val = [];
        $("input[@name='" + gameId + "']").each(function () {
            if (this.checked) {
                val.push(this.value);
            }
        });
        var gameArr = mminfo.analysisGameArr(val, gameLen);
        return gameArr;
    },
    checkUserInfo: function () {
        // 必填项
        if ($.trim($('#an-name-edit').val()) == "") {
            alert('温馨提示：请填写您的姓名');
            return false;
        }
        var ilen = comm.app.getRealLength($.trim($('#an-name-edit').val()));
        if (ilen > 8) {
            alert('温馨提示：姓名请不要超过8个字符');
            return false;
        }

        var sex = $("input[@name='sex']:checked").val();
        if (sex == "") {
            alert('温馨提示：请选择您的性别');
            return false;
        }

        var sGameQQ = $.trim($('#qq-edit').val());
        if (sGameQQ == "") {
            alert('温馨提示：请填写您的常用游戏QQ号码');
            return false;
        }
        if (!/^\d{5,12}$/.test(sGameQQ)) {
            alert('温馨提示：请检查常用游戏QQ号码是否有误?');
            return false;
        }
        var province = $('#province-edit').val();
        if (province == "") {
            alert('温馨提示：请填写您的邮寄地址');
            return false;
        }
        var city = $('#city-edit').val();
        if (city == "") {
            alert('温馨提示：请填写您的邮寄地址');
            return false;
        }
        /*
        var saddress=$('#an-address-edit').val();
        if(saddress==""){
            alert('温馨提示：请填写您的邮寄地址');
            return false;
        }
        var ilen=comm.app.getRealLength(saddress);
        if(ilen>80){
            alert('温馨提示：联系地址请不要超过40个汉字');
            return false;
        }
        
        var postcode=$.trim($('#postcode-edit').val());
        if(postcode==""){
            alert('温馨提示：请填写您的邮编');
            return false;
        }
        if(!/^\d{6}$/.test(postcode)){
            alert('温馨提示：请检查邮编是否有误?');            
            return false;
        }

        var emailstr=$.trim($('#email-edit').val()).replace(/\s/g,'');
        if(emailstr!=""){          
            if(!/^[\w]+\@[\w]+(\.|[\w])+[\w]+$/.test(emailstr))
            {
                alert('email地址非法');
                return false;
            }
        }
        else {
            alert('温馨提示：请填写您的EMail');
            return false;
        }*/

        var weixinInfo = $.trim($('#wx-edit').val());
        if (weixinInfo == '') {
            alert('温馨提示：请填写正确的微信号码');
            return false;
        }
        if ((null != weixinInfo && weixinInfo != "") && (!/^[a-zA-Z]+[a-zA-Z0-9_-]*$/.test(weixinInfo) || weixinInfo.length < 6 || weixinInfo.length > 20)) {
            alert('温馨提示：请填写正确的微信号码');
            return false;
        }

        // 非必填项
        /*
        var tel=$('#an-tel').val();
        if(tel!=""){
            if(!/^[\-\d\(\)]{7,20}$/.test(tel)){
                alert('温馨提示：请检查座机号码是否有误?');            
                return false;
            }
        }
        */
        return true;
    },
    submitUserInfo: function () {
        if (!comm.user.ifLogined) {
            LoginManager.login(comm.app.login);
            return;
        }
        if (!mminfo.checkUserInfo()) {
            return;
        }
        // 必填项 基本资料
        comm.userInfo.info.name = encodeURIComponent(encodeURIComponent($('#an-name-edit').val()));
        comm.userInfo.info.sex = $("input[@name='sex']:checked").val();
        //comm.userInfo.info.phone = $('#an-phone-edit').html();
        comm.userInfo.info.mail = $('#email-edit').val();
        comm.userInfo.info.address = encodeURIComponent(encodeURIComponent($('#an-address-edit').val()));//$('#an-address').val();
        comm.userInfo.info.addr.country = 0;
        comm.userInfo.info.addr.province = $('#province-edit').val();
        comm.userInfo.info.addr.city = $('#city-edit').val();
        comm.userInfo.info.detailinfo.birthday.year = $('#year-edit').val();
        comm.userInfo.info.detailinfo.birthday.month = $('#month-edit').val();
        comm.userInfo.info.detailinfo.birthday.day = $('#day-edit').val();
        comm.userInfo.info.detailinfo.clothes = $('#clothes-edit').val();
        comm.userInfo.info.detailinfo.gameuin = $('#qq-edit').val();
        comm.userInfo.info.detailinfo.postcode = $('#postcode-edit').val();
        comm.userInfo.info.detailinfo.weixin = $('#wx-edit').val();
        //submit
        mminfo._subUserInfo();
    },
    _subUserInfo: function () { // base.js抽取
        var url = comm.config.ajaxUrl.subVipInfo + comm.user.qq +
            "?vipUin=" + comm.user.qq +
            //必填项 基本资料
            "&name=" + comm.userInfo.info.name +
            "&sex=" + comm.userInfo.info.sex +
            "&phone=" + comm.userInfo.info.phone +
            "&email=" + comm.userInfo.info.mail +
            "&address=" + comm.userInfo.info.address +
            "&country=" + comm.userInfo.info.addr.country +
            "&province=" + comm.userInfo.info.addr.province +
            "&city=" + comm.userInfo.info.addr.city +
            "&year=" + comm.userInfo.info.detailinfo.birthday.year +
            "&month=" + comm.userInfo.info.detailinfo.birthday.month +
            "&day=" + comm.userInfo.info.detailinfo.birthday.day +
            "&clothes=" + comm.userInfo.info.detailinfo.clothes +
            "&gameuin=" + comm.userInfo.info.detailinfo.gameuin +
            "&postcode=" + comm.userInfo.info.detailinfo.postcode +
            "&weixin=" + comm.userInfo.info.detailinfo.weixin +
            "&skey=" + VCookieManager.getCookie('skey') +
                "&g_tk=" + comm.vipInfo.g_tk;
        FileLoadManager.ajaxRequest({
            'url': url,
            'charset': 'utf-8',
            'cache': false,
            'postType': 'post',              //提交信息的方式
            'dataType': 'object',            //返回的数据类型：object, function
            'dataTypeName': 'subInfoajaxV2', //如果dataTypeName设定成功以后的方法
            'showLoadingStr': '',            //显示正在加载提示信息
            'isUseDefaultLoadType': false,   //是否使用默认的加载方法，适用于当正常的ajax出现错误的时候。
            'onLoadStartEvent': null,        //加载前的方法
            'onLoadingEvent': null,          //加载时的方法
            'onLoadSuccessEvent': function (msg) {
                if (subInfoajaxV2.status) {
                    alert('更新用户资料成功');
                    //MK.UI.Background.msgbox.close();
                    location.reload()
                    //location.href="http://xinyue.qq.com/web201110/meminfohd.shtml";
                } else {
                    if (comm.config.msg[subInfoajaxV2.msg]) {
                        alert(comm.config.msg[subInfoajaxV2.msg]);
                    } else {
                        alert('更新用户资料失败')
                    }
                }
            },
            'onLoadErrorEvent': null, //加载失败以后的方法
            'onLoadCompleteEvent': null //加载完成以后的方法		           
        });
    }
}/*  |xGv00|2f96ae9840a409ed7246714c2690638c */