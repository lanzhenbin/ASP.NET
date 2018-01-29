﻿if (namespace = function () { for (var e = arguments, t = 0; t < e.length; t++) for (var n = e[t].split("."), i = window, o = 0; o < n.length; o++) i[n[o]] = i[n[o]] || {}, i = i[n[o]]; return i }, namespace("milo.base"), function () { function e(e) { return null == e ? String(e) : Object.prototype.toString.call(e).replace(/\[object\s+(\w+)\]/i, "$1") || "object" } milo.base.extend = function (t, n) { if (null == t) t = n; else for (var i in n) "object" === e(n[i]).toLowerCase() && "object" === e(t[i]).toLowerCase() ? extend(t[i], n[i]) : t[i] = n[i]; return t }, milo.base.extendLess = function (e, t) { var n = t; for (var i in e) isObject(t) && void 0 !== t[i] && (e[i] = n[i]); return e }, milo.base.extendClass = function (e, t) { var n = function () { }; n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.superclass = t.prototype, t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t) }, milo.base.cloneClass = function (e) { if (!isObject(e)) return e; if (null == e) return e; var t = new Object; for (var n in e) t[n] = cloneClass(e[n]); return t }, milo.base.bind = function (e, t) { return function () { return e.apply(t, arguments) } }, milo.base.extend(milo.base, { isUndefined: function (e) { return void 0 === e && void 0 === e }, isArray: function (t) { return "array" === e(t).toLowerCase() }, isFunction: function (t) { return "function" === e(t).toLowerCase() }, isObject: function (t) { return "object" === e(t).toLowerCase() }, isNumber: function (t) { return "number" === e(t).toLowerCase() }, isString: function (t) { return "string" === e(t).toLowerCase() }, isBoolean: function (t) { return "boolean" === e(t).toLowerCase() }, isDate: function (t) { return "date" === e(t).toLowerCase() }, isDom: function (e) { try { return e && "object" == typeof e && !isUndefined(e.nodeType) && 1 == e.nodeType && !isUndefined(e.nodeName) && "string" == typeof e.nodeName } catch (e) { return !1 } }, getDomVal: function (e) { return e.value || e.innerHTML }, forEach: function (e, t) { var n, i = 0, o = e.length; if (void 0 !== o) for (; i < o && !1 !== t.call(e[i], i, e[i++]) ;); else for (n in e) t.call(e[n], n, e[n]) }, g: function (e) { return "object" == typeof e ? e : document.getElementById(e) } }) }(), milo.base.extend(window, milo.base), namespace("milo.config"), extend(milo.config, { loaderPath: "http://ossweb-img.qq.com/images/js/milo/", version: "20130701", expires: 3e4 }), namespace("milo.loader"), function (e) { function t(e, i, o) { for (var a = 0, s = 0, c = {}, l = 0; l < i.length; l++) { var h = r(i[l]); a++, i[l] = i[l].replace(/\//g, "."), u[i[l]] || d[i[l]] ? s++ : c[i[l]] = h } return { name: e, modules: i, need: c, res: new Array, expires: i.length * milo.config.expires, callback: o, needown: a, hasdown: s, hasmaped: 0, loadUrlCallback: function (e, i) { if (this.hasdown++, e) for (u[i] = !0; ;) { var o = f.splice(0, 1).pop(); if (null == o) { m[i] = e; break } if (!(o[0] && o[0].toLowerCase() != i.substr(i.lastIndexOf(".") + 1).toLowerCase() && o[0].toLowerCase().indexOf(i.substr(i.lastIndexOf(".") + 1).toLowerCase()) < 0 && i.toLowerCase().indexOf(o[0].toLowerCase()) < 0)) { o[0] = i, n(t.apply(null, o)); break } } else m[i] = "undefined" }, loadInluderCallback: function (e) { this.checkMaped() }, completeLoad: function (e) { for (var t = [], n = 0; n < this.modules.length; n++) t.push(this.res[this.modules[n]]); if (!isFunction(this.callback) && !isObject(this.callback)) return !1; "" == this.name ? this.callback.apply(null, t) : isObject(this.callback) ? m[this.name] = this.callback : m[this.name] = this.callback.apply(null, t) }, checkMaped: function () { for (e = 0; e < this.modules.length; e++) isUndefined(this.res[this.modules[e]]) && !isUndefined(m[this.modules[e]]) && (this.res[this.modules[e]] = m[this.modules[e]], this.hasmaped++); if (this.hasmaped != this.needown) { if (this.hasmaped < this.needown && this.expires <= 0) { for (var e = 0; e < this.modules.length; e++) isObject(m[this.modules[e]]) || (this.res[this.modules[e]] = "undefined", this.hasmaped++); this.completeLoad.apply(this, [!1]) } else if (this.hasmaped < this.needown && this.expires > 0) { this.expires = this.expires - 50; var t = this; setTimeout(function () { t.checkMaped() }, 50) } } else this.completeLoad.apply(this, [!0]) } } } function n(e) { var t = e.need; for (var n in t) i(t[n], n, e); o(e) } function i(e, t, n) { var i = /\.css(\?|$)/i.test(e); d[t] = !0, i ? c(e, function (e) { n.loadUrlCallback.call(n, [e, t]) }) : s(e, function (e) { n.loadUrlCallback.apply(n, [e, t]) }) } function o(e) { e.hasdown != e.needown ? e.hasdown < e.needown && e.expires <= 0 ? e.loadInluderCallback.apply(e, [!1]) : e.hasdown < e.needown && e.expires > 0 && (e.expires = e.expires - 50, setTimeout(function () { o(e) }, 50)) : e.loadInluderCallback.apply(e, [!0]) } function r(e) { return -1 == e.search(/^http:\/\//i) && (e = milo.config.loaderPath + e.replace(/\./g, "/") + ".js?" + milo.config.version), e } function a(e, t) { for (var n = 0, i = 0, o = {}, a = 0; a < e.length; a++) { var s = r(e[a]); if (n++, u[e[a]]) { i++; break } o[e[a]] = s } return { files: e, need: o, res: new Array, expires: n * milo.config.expires, callback: t, needown: n, hasdown: i, loadUrlCallback: function (e, t) { e && this.hasdown++, u[t] = e }, loadInluderCallback: function (e) { for (var t = [], n = 0; n < this.files.length; n++) t.push(u[this.files[n]]); this.callback.apply(null, t) } } } function s(e, t) { var n = document.getElementsByTagName("head")[0], i = document.createElement("script"); i.type = "text/javascript", i.charset = charset, i.src = e; var o = setTimeout(function () { n.removeChild(i), t.call(this, !1) }, milo.config.expires); return l(i, function (e) { n.removeChild(i), clearTimeout(o), t(!0) }), n.appendChild(i), !0 } function c(e, t) { var n = document.getElementsByTagName("head")[0].appendChild(document.createElement("link")); n.href = e, n.rel = "stylesheet", t.call(this, !0) } function l(e, t) { var n = "onload" in e || (e.setAttribute("onload", ""), "function" == typeof e.onload); document.addEventListener ? e.addEventListener("load", function () { t.call(this, e) }, !1) : n || e.attachEvent("onreadystatechange", function () { var n = e.readyState.toLowerCase(); "loaded" !== n && "complete" !== n || (e.detachEvent("onreadystatechange"), t.call(this, e.innerHTML)) }) } var u = {}, d = {}, f = [], m = {}; charset = "gb2312", e.set = function (e) { charset = e.charset }, e.need = function (e, i) { isArray(e) || (e = new Array(e)), n(t("", e, i)) }, e.define = function (e, t, n) { isString(e) || (n = t, t = e, e = null), isArray(t) || (n = t, t = []), f.push([e, t, n]) }, e.define.amd = { jQuery: !0 }, e.include = function (e, t) { var i = new Array; i = i.concat(e), isFunction(t) || (t = function () { }), n(a(i, t)) }, e.loadScript = function (e, t) { isFunction(t) || (t = function () { }), s(e, t) }, e.loadCSS = function (e, t) { -1 == e.search(/^http:\/\//i) && (e = milo.config.loaderPath + e.replace(/\./g, "/") + ".css?" + milo.config.version); var n = /\.css(\?|$)/i.test(e); isFunction(t) || (t = function () { }), n & !u[e] && (c(e, t), u[e] = !0) } }(milo.loader), extend(window, milo.loader), namespace("milo.dom"), function () { var e = milo.dom, t = navigator.userAgent.toLowerCase(); extend(e, { browser: { version: (t.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1], webkit: /webkit/.test(t), opera: /opera/.test(t), msie: /msie/.test(t) && !/opera/.test(t), mozilla: /mozilla/.test(t) && !/(compatible|webkit)/.test(t), tt: /tencenttraveler/.test(t), chrome: /chrome/.test(t), firefox: /firefox/.test(t), safari: /safari/.test(t), gecko: /gecko/.test(t), ie6: this.msie && "6" == this.version.substr(0, 1) }, g: function (e) { return "object" == typeof e ? e : document.getElementById(e) }, hasClassName: function (e, t) { var n = e.className; return n.length > 0 && (n == t || new RegExp("(^|\\s)" + t + "(\\s|$)").test(n)) }, addClassName: function (e, t) { return milo.hasClassName(e, t) || (e.className += (e.className ? " " : "") + t), e }, removeClassName: function (e, t) { return e.className = milo.trim(e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")), e }, setStyle: function (e, t) { for (var n in t) e.style[n] = t[n] }, getStyle: function (e, t) { var n = isFunction(document.defaultView) ? document.defaultView() : document.defaultView; if (n && n.getComputedStyle) { var i = n.getComputedStyle(e, null); return i && i.getPropertyValue(t) } return e.currentStyle && (e.currentStyle[t] || null) || null }, getMaxH: function () { return this.getPageHeight() > this.getWinHeight() ? this.getPageHeight() : this.getWinHeight() }, getMaxW: function () { return this.getPageWidth() > this.getWinWidth() ? this.getPageWidth() : this.getWinWidth() }, getPageHeight: function () { var e = window.innerHeight && window.scrollMaxY ? window.innerHeight + window.scrollMaxY : document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight; return e > document.documentElement.scrollHeight ? e : document.documentElement.scrollHeight }, getPageWidth: function () { return window.innerWidth && window.scrollMaxX ? window.innerWidth + window.scrollMaxX : document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth : document.body.offsetWidth }, getWinHeight: function () { return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight }, getWinWidth: function () { return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth }, setOpacity: function (e, t) { this.browser.msie && (!document.documentMode || document.documentMode < 9) ? e.style.filter = "Alpha(opacity=" + t + ")" : e.style.opacity = t / 100 }, getX: function (e) { for (var t = e.offsetLeft; e = e.offsetParent;) t += e.offsetLeft; return t }, getY: function (e) { for (var t = e.offsetTop; e = e.offsetParent;) t += e.offsetTop; return t }, request: function (e) { for (var t = window.location.href.replace(/#+.*$/, ""), n = t.substring(t.indexOf("?") + 1, t.length).split("&"), i = {}, o = 0; o < n.length; o++) { var r = n[o].indexOf("="), a = n[o].substring(0, r), s = n[o].substring(r + 1); i[a] = s } return void 0 === i[e] ? "" : i[e] } }) }(), namespace("milo.array"), function () { var e = milo.array; extend(e, { getLength: function (e) { var t = 0; for (var n in e) t++; return t }, clone: function (e) { for (var t = [], n = 0; n < e.length; ++n) t.push(e[n]); return t }, hasValue: function (e, t) { var n = !1; if (isArray(e) || isObject(e)) for (var i in e) e[i] == t && (n = !0); return n }, getArrayKey: function (e, t) { var n = -1; if (isArray(e) || isObject(e)) for (var i in e) e[i] == t && (n = i); return n }, filter: function (e, t) { for (var n = [], i = 0; i < e.length; i++) milo.hasValue(t, e[i]) || n.push(e[i]); return n }, unique: function (e, t) { return milo.filter(e, t).concat(milo.filter(t, e)) } }) }(), namespace("milo.string"), function () { var e = milo.string; extend(e, { getByteLength: function (e) { for (var t = 0, n = 0; n < e.length; ++n, ++t) e.charCodeAt(n) > 255 && ++t; return t }, getDwordNum: function (t) { return e.getByteLength(t) - t.length }, getChineseNum: function (e) { return e.length - e.replace(/[\u4e00-\u9fa5]/g, "").length }, cutChinese: function (t, n, i) { if (isNaN(n)) return t; if (e.getByteLength(t) <= n) return t; for (var o = 0, r = 0; o < t.length && r < n; ++o, ++r) t.charCodeAt(o) > 255 && ++r; return i = i || "", (r - n == 1 ? t.substr(0, o - 1) : t.substr(0, o)) + i }, trimLeft: function (e) { return e.replace(/^\s+/, "") }, trimRight: function (e) { return e.replace(/\s+$/, "") }, trim: function (e) { return milo.trimRight(milo.trimLeft(e)) }, replacePairs: function () { for (var e = arguments[0], t = 1; t < arguments.length; ++t) { var n = new RegExp(arguments[t][0], "g"); e = e.replace(n, arguments[t][1]) } return e }, toHtml: function (e) { return milo.replacePairs.apply(this, [e].concat([["&", "&#38;"], [" ", "&#32;"], ["'", "&#39;"], ['"', "&#34;"], ["/", "&#47;"], ["<", "&#60;"], [">", "&#62;"], ["\\\\", "&#92;"], ["\n", "<br />"], ["\r", ""]])) }, isMail: function (e) { return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(e) }, isTel: function (e) { return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(e) }, isMobile: function (e) { return /^1[34578]\d{9}$/.test(e) }, isZipCode: function (e) { return /^(\d){6}$/.test(e) }, isIDCard: function (e) { return function (e) { var t = 0, n = e; if (!/^\d{17}(\d|x)$/i.test(n)) return !1; if (n = n.replace(/x$/i, "a"), null == { 11: "鍖椾含", 12: "澶╂触", 13: "娌冲寳", 14: "灞辫タ", 15: "鍐呰挋鍙�", 21: "杈藉畞", 22: "鍚夋灄", 23: "榛戦緳姹�", 31: "涓婃捣", 32: "姹熻嫃", 33: "娴欐睙", 34: "瀹夊窘", 35: "绂忓缓", 36: "姹熻タ", 37: "灞变笢", 41: "娌冲崡", 42: "婀栧寳", 43: "婀栧崡", 44: "骞夸笢", 45: "骞胯タ", 46: "娴峰崡", 50: "閲嶅簡", 51: "鍥涘窛", 52: "璐靛窞", 53: "浜戝崡", 54: "瑗胯棌", 61: "闄曡タ", 62: "鐢樿們", 63: "闈掓捣", 64: "瀹佸", 65: "鏂扮枂", 71: "鍙版咕", 81: "棣欐腐", 82: "婢抽棬", 91: "鍥藉" }[parseInt(n.substr(0, 2))]) return !1; var i = n.substr(6, 4) + "-" + Number(n.substr(10, 2)) + "-" + Number(n.substr(12, 2)), o = new Date(i.replace(/-/g, "/")); if (i != o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate()) return !1; for (var r = 17; r >= 0; r--) t += Math.pow(2, r) % 11 * parseInt(n.charAt(17 - r), 11); return t % 11 == 1 }(15 == e.length ? function (e) { var t = e.substring(0, 6) + "19" + e.substring(6, 15), n = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], o = 0; for (i = 0; i < t.length; i++) o += t.substring(i, i + 1) * n[i]; return o %= 11, t += ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"][o] }(e) : e) }, isChinese: function (e) { return milo.getChineseNum(e) == e.length }, isEnglish: function (e) { return /^[A-Za-z]+$/.test(e) }, isURL: function (e) { return / ^ (https | http): \/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(e) }, isNumberString: function (e) { return /^\d+$/.test(e) } }) }(), namespace("milo.cookie"), function () { var e = milo.cookie; extend(e, { set: function (e, t, n, i, o, r) { if (void 0 != e) { void 0 == t && (t = ""); var a = [e + "=" + escape(t)]; if (!isNaN(n)) { var s = new Date; s.setTime(s.getTime() + 1e3 * n), 0 == n || a.push("expires=" + s.toGMTString()) } void 0 != i && a.push("domain=" + i), void 0 != o && a.push("path=" + o), r && a.push("secure"), document.cookie = a.join("; ") } }, get: function (e, t) { var n = "(?:; |^)" + e + "=([^;]*);?"; return new RegExp(n).test(document.cookie) ? unescape(RegExp.$1) : t || null }, clear: function (t, n, i) { var o = new Date; e.set(t, "", -o.getTime() / 1e3, n, i) } }) }(), namespace("milo.date"), function () { var e = milo.date, t = new Date; extend(e, { toDateString: function (e) { var n = [], i = isDate(e) ? e : t; return m = i.getMonth() + 1, d = i.getDate(), sep = arguments[1] ? arguments[1] : isString(arguments[0]) ? arguments[0] : "-", n.push(i.getFullYear()), n.push(m.toString().length < 2 ? "0" + m : m), n.push(d.toString().length < 2 ? "0" + d : d), n.join(sep) }, toDateTimeString: function (n) { var i = isDate(n) ? n : t, o = i.getHours(), r = i.getMinutes(), a = i.getSeconds(), s = []; return s.push(o.toString().length < 2 ? "0" + o : o), s.push(r.toString().length < 2 ? "0" + r : r), s.push(a.toString().length < 2 ? "0" + a : a), e.toDateString.apply(this, arguments) + " " + s.join(":") }, isLeapYear: function (e) { return 0 == e % 4 && (e % 100 != 0 || e % 400 == 0) }, getSeverDateTime: function () { var e = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest; return e.open("HEAD", window.location.href, !1), e.send(), new Date(e.getResponseHeader("Date")) } }) }(), namespace("milo.number"), function () { var e = milo.number; extend(e, { isInt: function (e, t, n) { return !(!isFinite(e) || !/^[+-]?\d+$/.test(e) || void 0 != t && parseInt(e) < parseInt(t) || void 0 != n && parseInt(e) > parseInt(n)) }, isFloat: function (e, t, n) { return !(!isFinite(e) || void 0 != t && parseFloat(e) < parseFloat(t) || void 0 != n && parseFloat(e) > parseFloat(n)) }, isQQ: function (e) { return /^[1-9]{1}\d{4,11}$/.test(e) }, randomInt: function (e) { return Math.floor(Math.random() * e) } }) }(), namespace("milo.event"), function () { function e() { if ("complete" === document.readyState) return t(); if (document.addEventListener) document.addEventListener("DOMContentLoaded", function () { document.removeEventListener("DOMContentLoaded", arguments.callee, !1), t() }, !1), window.addEventListener("load", t, !1); else if (document.attachEvent && (document.attachEvent("onreadystatechange", function () { "complete" === document.readyState && (document.detachEvent("onreadystatechange", arguments.callee), t()) }), window.attachEvent("onload", t), document.documentElement.doScroll && window == window.top)) { if (milo.isReady) return; try { document.documentElement.doScroll("left") } catch (e) { return void setTimeout(arguments.callee, 0) } t() } } function t() { if (!milo.isReady) { if (!document.body) return setTimeout(t, 13); if (milo.isReady = !0, milo.readyFn.length > 0) { for (var e, n = 0; e = milo.readyFn[n++];) e.call(); milo.readyFn.length = 0 } } } var n = milo.event; extend(n, { preventDefault: function (e) { e.preventDefault ? e.preventDefault() : e.returnValue = !1 }, stopPropagation: function (e) { e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0 }, addEvent: function (e, t, n) { if (window.addEventListener) e["e" + t + n] = n, e[t + n] = function (i) { var o = i || window.event; 0 == e["e" + t + n](o) && (milo.preventDefault(o), milo.stopPropagation(o)) }, e.addEventListener(t, e[t + n], !1); else { if (window.attachEvent) return e["e" + t + n] = n, e[t + n] = function (i) { 0 == e["e" + t + n](window.event) && milo.preventDefault(window.event) }, void e.attachEvent("on" + t, e[t + n]); e["on" + t] = n } }, removeEvent: function (e, t, n) { if (window.removeEventListener) e.removeEventListener(t, e[t + n], !1), e[t + n] = null; else { if (window.detachEvent) return e.detachEvent("on" + t, e[t + n]), void (e[t + n] = null); e["on" + t] = null } }, isReady: !1, readyFn: [], ready: function (t) { e(), milo.isReady ? t.call() : isFunction(t) && milo.readyFn.push(t) } }) }(), namespace("milo.object"), extend(milo.object, { serialize: function (e) { var t = null; if (void 0 !== e && "function" != typeof e || (t = ""), "number" == typeof e && (t = e.toString()), "boolean" == typeof e && (t = e ? "1" : "0"), "object" == typeof e && (e || (t = ""), e instanceof RegExp && (t = e.toString())), "string" == typeof e && (t = e), "string" == typeof t) return encodeURIComponent(t); var n = []; if (e instanceof Array) { for (i = 0; i < e.length; i++) void 0 !== e[i] && n.push("object" == typeof e[i] ? "" : milo.serialize(e[i])); return n.join("|") } for (var i in e) void 0 !== e[i] && (t = null, "object" == typeof e[i] ? e[i] instanceof Array ? (t = e[i], n.push(i + "=" + milo.serialize(t))) : n.push(i + "=") : (t = e[i], n.push(i + "=" + milo.serialize(t)))); return n.join("&") }, unSerialize: function (e, t) { if (t = t || 0, !(e = e.toString())) return {}; var n = {}, i = e.split("&"); if (0 == i.length) return n; for (var o = 0; o < i.length; o++) if (i[o] && i[o].split("=").length >= 2) { var r = i[o].substr(0, i[o].indexOf("=")), a = i[o].substr(i[o].indexOf("=") + 1); a || (a = ""), r && (n[r] = 0 == t ? decodeURIComponent(a) : a) } return n }, decode: function (e) { if ("string" == typeof e) { try { return decodeURIComponent(e) } catch (e) { } return e } if ("object" == typeof e) { if (null == e) return null; if (e instanceof Array) { for (t = 0; t < e.length; t++) e[t] = milo.decode(e[t]); return e } if (e instanceof RegExp) return e; for (var t in e) e[t] = milo.decode(e[t]); return e } return e } }), milo.base.extend(milo, milo.dom), milo.base.extend(milo, milo.array), milo.base.extend(milo, milo.string), milo.base.extend(milo, milo.date), milo.base.extend(milo, milo.number), milo.base.extend(milo, milo.event), milo.base.extend(milo, milo.object), namespace("milo.ams"), function () { function getAmsFile(e, t, n) { isFunction(n) || (n = function (e) { }); var i = window["ams_actdesc_" + e]; if (isObject(i)) n(i); else if (!(!e || isNaN(e) || e <= 0)) { var o = e + "", r = ""; r = Number(e) >= 125300 ? location.protocol + "//" + window.location.host + "/comm-htdocs/js/ams/actDesc/" + o.substr(o.length - 3) + "/" + o + "/act.desc.js" : location.protocol + "//" + window.location.host + "/comm-htdocs/js/ams/v0.2R02/act/" + o + "/act.desc.js", include(r, function (t) { t && n(window["ams_actdesc_" + e]) }) } } function getDesc(e, t) { var n = window["ams_actdesc_" + e.actId], i = e.actId + "", o = ""; o = Number(e.actId) >= 125300 ? location.protocol + "//" + window.location.host + "/comm-htdocs/js/ams/actDesc/" + i.substr(i.length - 3) + "/" + i + "/act.desc.js" : location.protocol + "//" + window.location.host + "/comm-htdocs/js/ams/v0.2R02/act/" + i + "/act.desc.js", isObject(n) ? t(e, n) : include(o, function (n) { t(e, window["ams_actdesc_" + e.actId]) }) } function init(e) { getDesc(e, function (e, t) { var n = t.flows, i = null, o = e; for (fid in n) if (fid == "f_" + e.flowId) { i = n[fid]; break } if (null != i) if (null == i.functions[0].sExtModuleId) need("ams.flowengine", function (t) { t.submit(window["amsCfg_" + e.flowId]) }); else { var r = i.functions[0].method; e.modJsPath && -1 === e.modJsPath.indexOf("http") || e.modJsPath, need("ams." + r, function () { var t = r.split("."), n = t[t.length - 1], i = window[n + "_" + e.flowId]; if (isObject(i) && isFunction(e.modSubmit)) return isFunction(i.submit) ? o._everyRead && isFunction(i.submit) ? (i.init(o), e.modSubmit(window[n + "_" + e.flowId]), !1) : (e.modSubmit(i), !1) : (i.init(o), !1); window[n + "_" + e.flowId] = cloneClass(arguments[0]), window[n + "_" + e.flowId].init(o), isFunction(e.modSubmit) && e.modSubmit(window[n + "_" + e.flowId]) }) } }) } function submit(e) { e.modSubmit = function (t) { isFunction(t.submit) && t.submit(e.flowId) }, init(e) } extend(milo.ams, { amsInit: function (e, t, n) { 1 !== arguments.length ? getAmsFile(e, 0, function (i) { var o = i.flows, r = null, a = window["amsCfg_" + t] || {}; for (fid in o) if (fid == "f_" + t) { r = o[fid]; break } if (null != r) if (a.iAMSActivityId = e, a.iFlowId = t, null == r.functions[0].sExtModuleId) need("ams.flowengine", function (e) { e.submit(window["amsCfg_" + t]) }); else { var s = r.functions[0].method; e > 6686 && 6688 != e && 6701 != e && 6731 != e && ("share.microblogFix" == s || "share.microblogUser" == s || "share.qqgameFeed" == s || "share.qqSignButton" == s || "share.qqSignQueryTime" == s || "share.qqSignRadio" == s || "share.qzoneFix" == s || "share.qzoneUser" == s || "share.shareQueryHistory" == s) && (r.functions[0].method = "share.commShare"), 6370 != e && 6241 != e && 3733 != e || "share.microblogFix" != s && "share.microblogUser" != s && "share.qqgameFeed" != s && "share.qqSignButton" != s && "share.qqSignQueryTime" != s && "share.qqSignRadio" != s && "share.qzoneFix" != s && "share.qzoneUser" != s && "share.shareQueryHistory" != s || (r.functions[0].method = "share.commShare"), need("ams." + r.functions[0].method, function () { var e = r.functions[0].method.split("."), i = e[e.length - 1], o = window[i + "_" + t]; if (isObject(o) && isFunction(n)) return isFunction(o.submit) ? a._everyRead && isFunction(o.submit) ? (o.init(a, r), n(window[i + "_" + t]), !1) : (n(o), !1) : (o.init(a, r), !1); window[i + "_" + t] = cloneClass(arguments[0]), window[i + "_" + t].init(a, r), isFunction(n) && n(window[i + "_" + t]) }) } }) : init(e) }, amsSubmit: function (amsActivityId, flowId) { if (1 !== arguments.length) { var caller = arguments.callee.caller; if (window.event && window.event.srcElement && window.event.srcElement != document || caller && caller.arguments[0]) { var ev = window.event || caller.arguments[0]; if (ev[0]) var target = ev[0]; else var target = ev.srcElement || ev.target; if (target) { var data = target.getAttribute && target.getAttribute("action-data") || {}; _amsCFG = window["amsCfg_" + flowId]; try { _amsCFG.triggerSourceData = eval("(" + data + ")") } catch (e) { _amsCFG.triggerSourceData = data } } } amsInit(amsActivityId, flowId, function (e) { isFunction(e.submit) && e.submit(flowId) }) } else submit(amsActivityId) } }) }(), milo.base.extend(window, milo.ams), namespace("milo.ui"), extend(milo.ui, { alert: function (e) { alert(e) } }), namespace("milo.xss"), function () { var e = milo.xss; extend(e, { filter: function (e) { if (!e) return e; for (var t, n = ["3c", "3e", "27", "22", "28", "29", "60", { format: "script{}", chr: "3a" }], i = [], o = [], r = "{}", a = 0; a < n.length; a++) "string" == typeof n[a] ? (r = "{}", t = n[a]) : (r = n[a].format, t = n[a].chr), i.push(r.replace("{}", "\\u00" + t)), i.push(r.replace("{}", "%" + t)), i.push(r.replace("{}", "%25" + t)), o.push(r.replace("{}", "&#x" + t + ";")), o.push(r.replace("{}", "%26%23x" + t + "%3B")), o.push(r.replace("{}", "%2526%2523x" + t + "%253B")); for (a = 0; a < i.length; a++) e = e.replace(new RegExp(i[a], "gi"), o[a]); return e = e.replace(/script[\u000d\u000a\u0020]+\:/i, "script&#x3a;") }, filterWxNickName: function (e) { console.log(this); var t = e.match(/\<span\sclass\=\"emoji\semoji[0-9a-z]+\"\>\<\/span\>/g), n = "", i = "", o = "{tag_" + (new Date).getTime() + "}"; if (t && t.length) { n = e.replace(/\<span\sclass\=\"emoji\semoji[0-9a-z]+\"\>\<\/span\>/g, o), i = this.filter(n); for (var r = 0; r < t.length; r++) i = i.replace(o, t[r]); return i } return this.filter(e) } }) }(), "function" == typeof window.onbeforeunload) var temp_onbeforeunload = window.onbeforeunload; window.onbeforeunload = function () { "function" == typeof temp_onbeforeunload && temp_onbeforeunload(), milo.cookie.clear("lg_source", "qq.com", "/"), milo.cookie.clear("ams_game_appid", "qq.com", "/") };