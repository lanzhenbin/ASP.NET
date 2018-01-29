﻿//请求加载js格式对象或方法
/**
 * FileLoadManager
 * tiantian
 */
if (typeof (FileLoadManager) == 'undefined') {
    FileLoadManager = {};
}

//外部使用接口
FileLoadManager.ajaxRequest = function (opt) {
    var option = {
        'url': '',
        'charset': 'gb2312',
        'cache': false,
        'postType': 'get', //提交信息的方式
        'dataType': 'object', //返回的数据类型：object, function
        'dataTypeName': '', //如果dataTypeName设定成功以后的方法
        'showLoadingStr': '请等待,数据正在加载中...', //显示正在加载提示信息
        'isUseDefaultLoadType': false, //是否使用默认的加载方法，适用于当正常的ajax出现错误的时候。
        'onLoadStartEvent': null, //加载前的方法
        'onLoadingEvent': null, //加载时的方法
        'onLoadSuccessEvent': null, //加载成功以后的方法
        'onLoadErrorEvent': null, //加载失败以后的方法
        'onLoadCompleteEvent': null //加载完成以后的方法
    };
    var config = {
        'isShowLoading': true
    };

    option = FileLoadManager._comm.extend(option, opt);

    {//数据检查
        if (!option.url) {
            alert('提交地址不能为空');
            reutrn;
        }
        if (option.postType != "get" && option.postType != "post") {
            option.postType = 'get';
        }
    }

    var floaterLoading = null;
    {//提示加载信息
        if (!option.showLoadingStr ||
			(typeof (option.onLoadSuccessEvent) != 'function' && typeof (option.onLoadCompleteEvent) != 'function')) {
            config.isShowLoading = false;
        }
        if (config.isShowLoading) {
            if (typeof (FloaterManager) == 'undefined') {
                alert('因为使用到了FloaterManager对象，所以必须加载http://ossweb-img.qq.com/images/js/basic/floatermanager.js文件，\r\n或者参数中设置showLoadingStr:\'\'');
                return;
            }
            floaterLoading = FloaterManager.init(null, false);
        }
    }

    {//加载前
        if (typeof (option.onLoadStartEvent) == 'function') {
            if (option.onLoadStartEvent(option)) {
                return;
            }
        }
        //加载前需要清空上一次可能留下来的对象。
        if (option.dataType == 'object') {
            if (option.dataTypeName) {
                window[option.dataTypeName] = undefined;
            }
        }
    }

    {//加载中
        if (floaterLoading) {
            floaterLoading.ajaxLoading(option.showLoadingStr);
        }
        if (typeof (option.onLoadingEvent) == 'function') {
            if (option.onLoadingEvent(option)) {
                return;
            }
        }
    }

    {//正式加载
        var loadAjaxFileFunction = function () {
            if (typeof (option.onLoadSuccessEvent) != 'function' && typeof (option.onLoadCompleteEvent) != 'function' && !option.dataTypeName) {
                //表示直接提交一个请求即可，无需要返回值，用图片可以避免网页js报错的问题
                var _opt = {
                    'url': option.url,
                    'cache': false
                };
                FileLoadManager._comm.createScript(_opt);
                return;
            }

            {//对方法进行优化
                {//complete
                    var _defaultComplete = function () { };
                    if (typeof (option.onLoadCompleteEvent) == "function") {
                        _defaultComplete = option.onLoadCompleteEvent;
                    }
                    option.onLoadCompleteEvent = function () {
                        if (typeof (floaterLoading) == 'object' && floaterLoading && config.isShowLoading) {
                            floaterLoading.close();
                        }
                        _defaultComplete();
                    };
                }

                {//success
                    var _defaultSuccess = null;
                    if (typeof (option.onLoadSuccessEvent) == "function") {
                        _defaultSuccess = option.onLoadSuccessEvent;
                    }
                    option.onLoadSuccessEvent = function () {
                        if (typeof (_defaultSuccess) == "function") {
                            _defaultSuccess();
                        }
                    };
                }

                {//error
                    var _defaultError = null;
                    if (typeof (option.onLoadErrorEvent) == "function") {
                        _defaultError = option.onLoadErrorEvent;
                    }
                    option.onLoadErrorEvent = function () {
                        if (typeof (_defaultError) == "function") {
                            _defaultError();
                        }
                    };
                }
            }

            var defaultLoadjs = function () {
                if (option.postType == 'get') {
                    FileLoadManager._comm.createScript(option);
                } else if (option.postType == 'post') {
                    FileLoadManager._comm.inputPost(option);
                }
            };

            //如果是Firefox，则使用默认提交方式。
            if (option.postType == 'get' && FileLoadManager._comm.bom.isFireFox) {
                option.isUseDefaultLoadType = true;
            }

            //是否跨域了
            var remote = /^(?:\w+:)?\/\/([^\/?#]+)/;
            if (remote.test(option.url) && remote.exec(option.url)[1] != location.host) {
                option.isUseDefaultLoadType = true;
                //如果跨域了，而且还要利用返回值，则只能使用get方式了。
                if (option.postType == 'post' && option.dataTypeName) {
                    option.postType = 'get';
                }
            }

            //是否直接使用默认的加载方法使用。
            if (option.isUseDefaultLoadType) {
                defaultLoadjs();
                return;
            }

            try {
                FileLoadManager._comm.ajax({
                    'url': option.url,
                    'charset': option.charset,
                    'cache': option.cache,
                    'dataType': option.dataType,
                    'postType': option.postType, //提交信息的方式
                    'onLoadSuccessEvent': function () {
                        var isFalse = false;
                        if (option.dataTypeName) {
                            if (option.dataType == 'object') {
                                if (typeof (window[option.dataTypeName]) == 'object') {
                                    isFalse = true;
                                }
                            } else if (option.dataType == 'function') {
                                isFalse = true;
                            }
                        } else {
                            isFalse = true;
                        }
                        if (isFalse) {
                            if (typeof (option.onLoadSuccessEvent) == "function") {
                                option.onLoadSuccessEvent();
                            }
                            return;
                        }

                        if (typeof (option.onLoadErrorEvent) == "function") {
                            option.onLoadErrorEvent();
                        } else {
                            alert('网络繁忙，请您稍后重试！');
                        }
                    }, //加载成功以后的方法
                    'onLoadErrorEvent': function () {
                        if (typeof (option.onLoadErrorEvent) == "function") {
                            option.onLoadErrorEvent();
                        } else {
                            alert('网络繁忙，请您稍后重试！');
                        }
                    }, //加载失败以后的方法
                    'onLoadCompleteEvent': function () {
                        option.onLoadCompleteEvent();
                    } //加载完成以后的方法
                });
            } catch (e) {
                defaultLoadjs();
            }

        };
        setTimeout(function () {
            loadAjaxFileFunction();
        }, 500);
    }
};



//公共方法
FileLoadManager._comm = {
    option: {
        maxId: 0
    },
    getId: function () {//取得唯一的一个页面标识符
        return ++this.option.maxId;
    },
    extend: function (option, opt) {
        if (typeof (opt) != 'object' || !opt) {
            return option;
        }
        for (var property in opt) {
            option[property] = opt[property];
        }
        return option;
    },
    bom: {
        isIE: (navigator.userAgent.toLowerCase().indexOf("msie") != -1 ? true : false),
        isFireFox: (navigator.userAgent.toLowerCase().indexOf("firefox") != -1 ? true : false)
    },
    globalEval: function (data, charset, dataType) {
        charset = charset || 'gb2312';
        dataType = dataType || 'object';

        var trim = function (text) {
            return (text || "").replace(/^\s+|\s+$/g, '').replace(/(^<script.*?>)|(<\/script>$)/img, '');
        };
        data = trim(data);
        if (data) {
            try {
                var head = null;
                if (document.getElementsByTagName) {
                    head = document.getElementsByTagName('head')[0] || document.documentElement;
                } else {
                    head = document.documentElement;
                }
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.charset = charset;
                if (FileLoadManager._comm.bom.isIE) {
                    script.text = data;
                } else {
                    script.appendChild(document.createTextNode(data));
                }

                if (dataType != 'object') {
                    head.insertBefore(script, head.firstChild);
                    head.removeChild(script);
                    return;
                }

                var isObject = false;
                try {
                    eval(data);
                    isObject = true;
                } catch (e) {
                    throw e;
                    return;
                }
                if (isObject) {
                    head.insertBefore(script, head.firstChild);
                    head.removeChild(script);
                }
            } catch (e) {
                throw data + '：为不可执行的javascript代码';
            }
        }
    },
    addListener: function (elem, type, listener, capture) {
        if (window.addEventListener) {
            elem.addEventListener(type, listener, (capture));
        } else if (window.attachEvent) {
            elem.attachEvent("on" + type, listener);
        }
    },
    removeListener: function (elem, type, listener, capture) {
        if (window.removeEventListener) {
            elem.removeEventListener(type, listener, (capture));
        } else if (window.detachEvent) {
            elem.detachEvent("on" + type, listener);
        }
    }
};

//ajax方法
FileLoadManager._comm.ajax = function (opt) {
    var option = {
        'url': '',
        'charset': 'gb2312',
        'cache': true,
        'dataType': 'object',
        'postType': 'get', //提交信息的方式
        'onLoadSuccessEvent': null, //加载成功以后的方法
        'onLoadErrorEvent': null, //加载失败以后的方法
        'onLoadCompleteEvent': null //加载完成以后的方法
    };
    FileLoadManager._comm.extend(option, opt);
    {//地址是否缓存
        var getNewURL = function (s) {
            if (!s.url) {
                return '';
            }
            if (s.cache === false) {
                var ts = +new Date;
                var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
                s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
            }
            return s.url;
        };

        var _url = getNewURL(option);
        if (!_url) {
            return;
        }
        option.url = _url;
    }
    {//返回方法
        if (typeof (option.onLoadSuccessEvent) != 'function') {
            option.onLoadSuccessEvent = function (option) { };
        }
        if (typeof (option.onLoadCompleteEvent) != 'function') {
            option.onLoadCompleteEvent = function (option) { };
        }
        if (typeof (option.onLoadErrorEvent) != 'function') {
            option.onLoadErrorEvent = function (option) { };
        }
    }
    /////////////////////////////////////////////////////////	
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType("text/html");
        }
    } else if (window.ActiveXObject) {
        var activeName = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < activeName.length; i++) {
            try {
                xmlhttp = new ActiveXObject(activeName[i]);
                break;
            } catch (e) { }
        }
    }
    if (!xmlhttp) {
        throw "XMLHttpRequest创建失败!";
        return;
    }


    {//如果有对象则设定超时时间
        xmlhttp.__start = new Date().getTime();
        xmlhttp.__timeout = function () {
            if (xmlhttp.complete) {
                xmlhttp.__timeout = null;
                return;
            }

            var duration = new Date().getTime() - xmlhttp.__start;
            if (duration > 30 * 1000) {
                option.onLoadErrorEvent(option);
                option.onLoadCompleteEvent(option);
                xmlhttp.complete = true;
                return;
            }
            setTimeout(xmlhttp.__timeout, 500);
        };
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var callback_ = function () {
                    var response = xmlhttp.responseText;
                    if (response) {
                        xmlhttp.complete = true; //如果为200表示真正完成了。
                        var isFinshed = false;
                        try {
                            FileLoadManager._comm.globalEval(response, option.charset, option.dataType);
                            isFinshed = true;
                        } catch (e) {
                            //'ajax加载失败，可能是编码问题造成的，因此可采用默认方法解决。';
                            if (option.dataType == 'object') {
                                if (option.postType == 'get') {
                                    FileLoadManager._comm.createScript(option);
                                } else if (option.postType == 'post') {
                                    FileLoadManager._comm.inputPost(option);
                                }
                                return;
                            }
                        }
                        if (isFinshed) {
                            option.onLoadSuccessEvent(option);
                        } else {
                            option.onLoadErrorEvent(option);
                        }
                        option.onLoadCompleteEvent(option);
                        return;
                    }
                };

                if (FileLoadManager._comm.bom.isFireFox) {
                    setTimeout(callback_, 1000);
                } else {
                    callback_();
                }
            } else {
                //加载完后还是失败了的情况
                option.onLoadErrorEvent(option);
                option.onLoadCompleteEvent(option);
                xmlhttp.complete = true;
            }
        }
        return;
    };

    if (option.postType == 'get') {
        try {
            xmlhttp.open("GET", option.url, true);
            xmlhttp.setRequestHeader("Content-Type", "text/xml;charset=" + option.charset);
            xmlhttp.send(null);
            xmlhttp.__timeout(); //没有问题了再计时
        } catch (e) {
            throw 'get方式提交失败';
            xmlhttp.complete = true;
            return;
        }
    } else if (option.postType == 'post') {
        var submitData = {
            url: option.url,
            data: null
        };
        {//分解地址跟数据
            var _url = submitData.url || '';
            if (_url && _url.split("?").length <= 2) {
                if (_url.split("?").length == 2) {
                    submitData = {
                        url: _url.split("?")[0],
                        data: _url.split("?")[1]
                    };
                }
            } else {
                alert("url 输入格式出错:" + option.url);
                return;
            }

            if (!submitData.url) {
                alert("url 输入格式不能为空！");
                return;
            }
        }
        if (!submitData.data) {
            submitData.data = '';
        }

        try {
            xmlhttp.open("POST", submitData.url, true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send(submitData.data);
            xmlhttp.__timeout(); //没有问题了再计时
        } catch (e) {
            throw 'post方式提交失败';
            xmlhttp.complete = true;
            return;
        }
    }
};

//input post 方法，不支持跨域的操作。
FileLoadManager._comm.inputPost = function (opt) {
    var option = {
        'url': '',
        'charset': 'gb2312',
        'cache': false,
        'postType': 'post', //提交信息的方式
        'dataType': 'object', //返回的数据类型：object, function
        'dataTypeName': '', //如果dataTypeName设定成功以后的方法
        'onLoadSuccessEvent': null, //加载成功以后的方法
        'onLoadErrorEvent': null, //加载失败以后的方法
        'onLoadCompleteEvent': null //加载完成以后的方法
    };
    option = FileLoadManager._comm.extend(option, opt);

    var submitData = {
        url: option.url,
        data: null
    };

    {//分解地址跟数据
        var _url = submitData.url || '';
        if (_url && _url.split("?").length <= 2) {
            if (_url.split("?").length == 2) {
                submitData = {
                    url: _url.split("?")[0],
                    data: _url.split("?")[1]
                };
            }
        } else {
            alert("url 输入格式出错:" + option.url);
            return;
        }

        if (!submitData.url) {
            alert("url 输入格式不能为空！");
            return;
        }
    }

    {//地址不能缓存
        var getNewURL = function (s) {
            if (!s.url) {
                return '';
            }
            if (!option.cache) {//如果不需要缓存，则加随机数。
                var ts = +new Date;
                var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
                s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
            }
            return s.url;
        };

        var _url = getNewURL(submitData);
        if (!_url) {
            return;
        }
        submitData.url = _url;
    }

    var iframe = null;
    if (document.getElementById('FILE_LOAD_TYPE_INPUTPOST')) {
        iframe = document.getElementById('FILE_LOAD_TYPE_INPUTPOST');
    } else {
        if (FileLoadManager._comm.bom.isIE) {
            iframe = document.createElement('<iframe id="FILE_LOAD_TYPE_INPUTPOST" name="FILE_LOAD_TYPE_INPUTPOST" src="about:blank" style="display:none;"></iframe>');
        } else {
            iframe = document.createElement('iframe');
            iframe.setAttribute("id", 'FILE_LOAD_TYPE_INPUTPOST');
            iframe.setAttribute("name", 'FILE_LOAD_TYPE_INPUTPOST');
            iframe.setAttribute("src", 'about:blank');
            iframe.style.display = 'none';
        }
        document.body.appendChild(iframe);
    }

    var form = document.createElement("form");
    form.setAttribute("method", option.postType);
    form.setAttribute("action", submitData.url);
    form.setAttribute("target", 'FILE_LOAD_TYPE_INPUTPOST');
    form.style.display = 'none';
    if (submitData.data) {
        var arrInput = submitData.data.split('&');
        for (var i = 0; i < arrInput.length; i++) {
            if (arrInput[i]) {
                var temp = arrInput[i].split('=');
                if (temp.length == 2 && temp[0]) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", temp[0]);
                    var val = temp[1];
                    if (val) {
                        val = decodeURIComponent(temp[1]); //post浏览器会默认编码一次。
                    } else {
                        val = '';
                    }
                    hiddenField.setAttribute("value", val);
                    form.appendChild(hiddenField);
                }
            }
        }
    }

    document.body.appendChild(form);
    form.submit();

    var needCallback = function () {
        if (typeof (FileLoadManager) == 'undefined') {
            return;
        }
        FileLoadManager._comm.removeListener(iframe, "load", loadCallback);
        FileLoadManager._comm.removeListener(iframe, "error", loadCallback2);
        if (form) {
            document.body.removeChild(form);
            form = null;
        }
        iframe.setAttribute("src", 'about:blank');//提交之后需要重置
    };

    var loadCallback = function () {
        var isSuccess = false;
        var isNotDomain = true;
        try {
            for (var i in window['FILE_LOAD_TYPE_INPUTPOST']) {
                //firefox下可能已报错了。
            }
            var iframeDoc = window['FILE_LOAD_TYPE_INPUTPOST'].document || window['FILE_LOAD_TYPE_INPUTPOST'].documentElement;
            var response = iframeDoc['body'] ? iframeDoc['body'].innerHTML : iframeDoc.documentElement.textContent;
            if (response) {
                try {
                    FileLoadManager._comm.globalEval(response, option.charset, option.dataType);
                    isSuccess = true;
                    if (typeof (option.onLoadSuccessEvent) == 'function') {
                        option.onLoadSuccessEvent(option);
                    }
                } catch (e) {
                }
            }
        } catch (e) {
            isNotDomain = false;
        }

        if (!isNotDomain) {//如果跨域后则直接执行成功后的方法即可，因为提交以后一定会成功的。
            if (typeof (option.onLoadSuccessEvent) == 'function') {
                option.onLoadSuccessEvent(option);
            }
            if (typeof (option.onLoadCompleteEvent) == 'function') {
                option.onLoadCompleteEvent();
            }
            needCallback();
            return;
        }

        if (!isSuccess) {
            if (typeof (option.onLoadErrorEvent) == 'function') {
                option.onLoadErrorEvent(option);
            }
        }

        if (typeof (option.onLoadCompleteEvent) == 'function') {
            option.onLoadCompleteEvent();
        }
        needCallback();
    };
    var loadCallback2 = function () {
        if (typeof (option.onLoadErrorEvent) == 'function') {
            option.onLoadErrorEvent();
        }
        if (typeof (option.onLoadCompleteEvent) == 'function') {
            option.onLoadCompleteEvent();
        }
        needCallback();
    };

    FileLoadManager._comm.addListener(iframe, "load", loadCallback);
    FileLoadManager._comm.addListener(iframe, "error", loadCallback2);
    setTimeout(function () {
        needCallback();
    }, 10000);
};

//直接使用这个方法不用关心返回信息
FileLoadManager._comm.createImage = function (url, sid) {
    if (!url) {
        return null;
    }
    var sid = sid || '';
    if (!sid) {
        sid = url.replace(/[\W]/gi, '');
        if (!sid) {
            return null;
        }
    }
    var image = null;
    if (document.getElementById(sid)) {
        image = document.getElementById(sid);
    } else {
        image = document.createElement('img');
        var head = null;
        if (document.getElementsByTagName) {
            head = document.getElementsByTagName('head')[0] || document.documentElement;
        } else {
            head = document.documentElement;
        }
        head.insertBefore(image, head.firstChild);
    }
    {//设置属性
        image.setAttribute('id', sid);
        image.setAttribute('src', url);
        image.setAttribute('style', 'display:none;');
        image.onload = image.onreadystatechange = function () {
            head.removeChild(image);
        };
    }
    return image;
};

FileLoadManager._comm.createScript = function (opt) {
    var option = {
        'url': '',
        'charset': 'gb2312',
        'cache': true,
        'dataType': 'object', //返回的数据类型：object, function
        'dataTypeName': '', //如果dataTypeName设定成功以后的方法
        'onLoadStartEvent': null, //加载前的方法
        'onLoadingEvent': null, //加载时的方法
        'onLoadSuccessEvent': null, //加载成功以后的方法
        'onLoadErrorEvent': null, //加载失败以后的方法
        'onLoadCompleteEvent': null //加载完成以后的方法
    };
    var config = {
        'retryTimes': 8, //单位为秒
        'jsHandle': null //js文件句柄
    };
    FileLoadManager._comm.extend(option, opt);

    {//是否有cache添加到url中
        var getNewURL = function (s) {
            if (!s.url) {
                return '';
            }
            if (s.cache === false) {
                var ts = +new Date;
                var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
                s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
            }
            return s.url;
        };

        var _url = getNewURL(option);
        if (!_url) {
            return;
        }
        option.url = _url;
    }

    {//如果成功和失败、完成都没有设置函数，说明不关心返回值，则直接使用loadImage的方式。
        if (typeof (option.onLoadSuccessEvent) != 'function' &&
			typeof (option.onLoadErrorEvent) != 'function' &&
			typeof (option.onLoadCompleteEvent) != 'function' &&
			!option.dataTypeName) {
            FileLoadManager._comm.createImage(option.url);
            return;
        }
    }

    {//加载前
        if (typeof (option.onLoadStartEvent) == 'function') {
            if (option.onLoadStartEvent(option)) {
                return;
            }
        }
    }

    var head = null;
    if (document.getElementsByTagName) {
        head = document.getElementsByTagName('head')[0] || document.documentElement;
    } else {
        head = document.documentElement;
    }

    {//设置scriptDOM元素
        var script = config.jsHandle = document.createElement("script");
        script.src = option.url;
        script.type = 'text/javascript';
        if (option.charset) {
            script.charset = option.charset;
        }
        if (typeof (option.onLoadSuccessEvent) != 'function') {
            option.onLoadSuccessEvent = function (option) { };
        }
        if (typeof (option.onLoadCompleteEvent) != 'function') {
            option.onLoadCompleteEvent = function (option) { };
        }
        if (typeof (option.onLoadErrorEvent) != 'function') {
            option.onLoadErrorEvent = function (option) { };
        }

        script.onerror = function () {
            option.onLoadErrorEvent(option);
            option.onLoadCompleteEvent(option);
        };

        var tempId = FileLoadManager._comm.getId();

        window['FILE_LOAD_FLAG_' + tempId] = false; //对这个全局变量初始化。

        var objectDataType = function (opp, conf) {
            if (typeof (window[opp.dataTypeName]) == 'object') {
                opp.onLoadSuccessEvent(opp);
                opp.onLoadCompleteEvent(opp);
                window['FILE_LOAD_FLAG_' + tempId] = true;
                clearInterval(window['FileLoadFlag_' + tempId]);
                return;
            }
            window['FileLoadFlag_' + tempId] = window.setInterval(function () {
                if (window['FILE_LOAD_FLAG_' + tempId]) {
                    clearInterval(window['FileLoadFlag_' + tempId]);
                    return;
                }

                if (typeof (window[opp.dataTypeName]) == 'object') {
                    opp.onLoadSuccessEvent(opp);
                    opp.onLoadCompleteEvent(opp);
                    window['FILE_LOAD_FLAG_' + tempId] = true;
                    clearInterval(window['FileLoadFlag_' + tempId]);
                    return;
                }
                conf.retryTimes--;
                if (conf.retryTimes <= 0) {
                    opp.onLoadErrorEvent(opp);
                    opp.onLoadCompleteEvent(opp);
                    window['FILE_LOAD_FLAG_' + tempId] = true;
                    clearInterval(window['FileLoadFlag_' + tempId]);
                }
            }, 1000);
        };

        var functionDataType = function (opp, conf) {
            if (window['FILE_LOAD_FLAG_' + tempId]) {
                opp.onLoadSuccessEvent(opp);
                opp.onLoadCompleteEvent(opp);
                window['FILE_LOAD_FLAG_' + tempId] = true;
                clearInterval(window['FileLoadFlag_' + tempId]);
                return;
            }
            window['FileLoadFlag_' + tempId] = window.setInterval(function () {
                if (window['FILE_LOAD_FLAG_' + tempId]) {
                    opp.onLoadSuccessEvent(opp);
                    opp.onLoadCompleteEvent(opp);
                    window['FILE_LOAD_FLAG_' + tempId] = true;
                    clearInterval(window['FileLoadFlag_' + tempId]);
                    return;
                }

                conf.retryTimes--;
                if (conf.retryTimes <= 0) {
                    opp.onLoadErrorEvent(opp);
                    opp.onLoadCompleteEvent(opp);
                    window['FILE_LOAD_FLAG_' + tempId] = true;
                    clearInterval(window['FileLoadFlag_' + tempId]);
                }
            }, 1000);
        };

        var done = false;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                head.removeChild(script);//加载成功以后移出元素
                done = true;

                var isFalse = false;
                if (option.dataTypeName) {
                    if (option.dataType == 'object') {
                        objectDataType(option, config);
                    } else if (option.dataType == 'function') {
                        functionDataType(option, config);
                    } else {
                        isFalse = true;
                    }
                } else {
                    isFalse = true;
                }

                if (isFalse) {//没有设定dataTypeName
                    option.onLoadSuccessEvent(option);
                    option.onLoadCompleteEvent(option);
                    return;
                }

                //设置一个全局的函数来解决最大的访问时间10S超时。
                if (window['FILE_LOAD_FLAG_' + tempId]) {
                    return;
                }
                var currTime = +new Date();
                window['FILE_LOAD_TIMMER_FLAG_' + tempId] = window.setInterval(function () {
                    if (window['FILE_LOAD_FLAG_' + tempId]) {
                        clearInterval(window['FILE_LOAD_TIMMER_FLAG_' + tempId]);
                        return;
                    }
                    var _time = (+new Date() - currTime) / 1000;
                    if (_time >= 10) {//超过10秒,则表示加载失败
                        option.onLoadErrorEvent(option);
                        option.onLoadCompleteEvent(option);
                        window['FILE_LOAD_FLAG_' + tempId] = true;
                        clearInterval(window['FileLoadFlag_' + tempId]);
                        clearInterval(window['FILE_LOAD_TIMMER_FLAG_' + tempId]);
                        return;
                    }
                }, 500);
            }
        };

        {//加载中
            if (typeof (option.onLoadingEvent) == 'function') {
                if (option.onLoadingEvent(option)) {
                    return;
                }
            }
        }


        {//如果是函数类型，则需要给这个全局函数中植入一个变量，标记是否成功执行方法。
            if (option.dataType == 'function') {
                if (option.dataTypeName) {
                    if (typeof (window[option.dataTypeName]) != 'function') {
                        alert('函数' + option.dataTypeName + '还未申明');
                        return;
                    }

                    //如果存在该函数，则需要注入一个判断是否执行的变量即可。
                    var injectFunction = function (functionName) {
                        var funStr = window[functionName].toString();
                        //检查是否是function Callback 形式。
                        if (/^function /.test(funStr)) {
                            funStr = funStr.replace(/^function([^\(]+)/, 'function');
                        }
                        funStr = functionName + ' = ' + funStr;
                        funStr = funStr.replace(/\)[ |\t]*\{/, '){FILE_LOAD_FLAG_' + tempId + ' = true;');
                        eval(funStr);
                    };
                    injectFunction(option.dataTypeName);
                }
            }
        }

        try {
            head.appendChild(script);
        } catch (e) { }
        return;
    }
};









/*  |xGv00|b447e534a1649f18921cdda4e6507fa7 */