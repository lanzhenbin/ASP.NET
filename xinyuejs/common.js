﻿(function ($) {
    $.fn.slider = function (o) {
        var d = {
            container: '.m_adshow',
            trigger: '.u_adshow_pointer li',
            triggerPrev: '.u_adshow_prevbtn',
            triggerNext: '.u_adshow_nextbtn',
            panel: '.u_adshow_img li'
        };
        var o = $.extend(d, o);
        var triggerCurCls = 'cur',
            isAutoPlay = true,
            autoPlayDirection = 'left';

        var triggerLen = $(d.trigger).length;

        var isShouldAutoPlay = true, // 记录当前是否需要自动播放
            curIndex = 0,            // 记录当前索引值
            isAnimated = false;      // 记录当前是否动画正在进行中

        // 切换效果
        var go = function (index) {
            if (isAnimated) {
                return;
            }
            isAnimated = true;
            $(d.trigger).eq(index).addClass(triggerCurCls).siblings().removeClass(triggerCurCls);
            $(d.panel).eq(index).addClass('focus').fadeIn().siblings().removeClass('focus').fadeOut(function () {
                isAnimated = false;
            });
            curIndex = index;
        };

        // 根据当前的索引值，确定下一帧的索引值
        var calcTheNextIndex = function (curIndex, direction) {
            direction = direction || 'left';
            if (direction === 'left') {
                if (curIndex === triggerLen - 1) {
                    return 0;
                } else {
                    return curIndex + 1;
                }
            } else if (direction === 'right') {
                if (curIndex === 0) {
                    return triggerLen - 1;
                } else {
                    return curIndex - 1;
                }
            }
        };

        // 鼠标移动到这个轮播图的时候，不再自动播放
        $(d.container).on({
            mouseenter: function () {
                isShouldAutoPlay = false;
            },
            mouseleave: function () {
                isShouldAutoPlay = true;
            }
        });
        // 自动播放
        (function () {
            if (!isAutoPlay) {
                return;
            }
            var self = arguments.callee;
            setTimeout(function () {
                var theNextIndex = -1;
                if (isShouldAutoPlay) {
                    theNextIndex = calcTheNextIndex(curIndex, autoPlayDirection);
                    go(theNextIndex);
                }
                self();
            }, 3000);
        })();

        // 触发切换的事件
        $(d.trigger).on({
            click: function () {
                var _this = $(this),
                    index = _this.index();
                go(index);
                return false;
            }
        });
        $(d.triggerPrev).on({
            click: function () {
                theNextIndex = calcTheNextIndex(curIndex, 'right');
                go(theNextIndex);
                return false;
            }
        });
        $(d.triggerNext).on({
            click: function () {
                theNextIndex = calcTheNextIndex(curIndex, 'left');
                go(theNextIndex);
                return false;
            }
        });
    };
})(jQuery);

function allFunShow() {
    /*---- 新闻tab ------*/
    var newsTabFun = function () {
        $("#J_tabSwitch li").mouseenter(function () {
            $(this).parents(".u_news_list").find(".tab_content").hide().eq($(this).addClass("tab_cur").siblings().removeClass("tab_cur").end().index()).show();
        });
    }
    newsTabFun();
    /*---- 特权地图 ------*/
    var mapTqFun = function () {
        $('.m_map').mouseenter(function () {
            $('.u_map_link').show();
        }).mouseleave(function () {
            $('.u_map_link').hide();
        });
    }
    mapTqFun();

    /*---- 二维码 ------*/
    var codeShow = function () {
        $('.codepic').click(function () {
            $('.m_nav_code').fadeOut("slow");
        });
    }
    codeShow();
    /*---- 返回顶部 ------*/
    var returnTopFun = function () {
        $('#g_rbar').css('top', $(window).height() - 150);
        $('#returnTop').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 'normal', 'swing');
        });
    }
    returnTopFun();

    /*---- 二维码右侧 ------*/
    var DcodeFun = function () {
        $('#Dcode').mouseenter(function () {
            $('#DcodeBox').fadeIn("fast");
        }).mouseleave(function () {
            $('#DcodeBox').fadeOut("fast");
        });
    }
    DcodeFun();

    /*---- 分辨率 ------*/
    var widthSizeFun = function () {
        var winWidth = $(window).width();
        if (winWidth < 1420) {
            $('body').addClass('widthSize1000');
        } if (winWidth > 1420) {
            $('body').removeClass('widthSize1000');
        }
    }
    widthSizeFun();
    $(window).resize(function () {
        widthSizeFun();
    });
    /*---- 游戏分类 ------*/
    var gameTabFun = function () {
        $(".u_navGame_hd li").mouseenter(function () {
            $(this).parents(".m_navGame").find(".channel").hide().eq($(this).addClass("cur").siblings().removeClass("cur").end().index()).show();
        });
    }
    gameTabFun();
    /*---- 游戏特权tab ------*/
    var gameTabFun = function () {
        $(".u_sort_hd li").click(function () {
            $(this).parents(".m_sort").find(".channel").hide().eq($(this).addClass("cur").siblings().removeClass("cur").end().index()).show();
        });
    }
    gameTabFun();

    /*---- 游戏特权hover------*/
    var gameListFun = function () {
        $(".u_sort_list li").mouseenter(function () {
            $(this).addClass("cur").siblings().removeClass("cur");
        });
    }
    gameListFun();

    /*---- 游戏活动------*/
    function dateBtnFun() {
        var sortList = $('.u_sort_list li');
        sortList.each(function () {
            var lazyContent = $(this).find('.date');
            var datetime = lazyContent.attr('data-datetime').split('&');
            var from = new Date(datetime[0].replace(/-/g, '/'));
            var to = new Date(datetime[1].replace(/-/g, '/'));
            var now = new Date();
            if (now < from) {
                $(this).find('.willBtn,.new').css("display", "block");
            } else if (now > to) {
                $(this).find('.endBtn,.over').css("display", "block");
            } else {
                $(this).find('.goBtn,.hot').css("display", "block");
            }
        });
    };
    if ($('.u_sort_list').length) {
        dateBtnFun();
    }

    /*---- 我的消息tab------*/
    function mynewsTabFun() {
        $(".u_mynews_hd li").click(function () {
            $(this).parents(".m_mynews").find(".channel").hide().eq($(this).addClass("cur").siblings().removeClass("cur").end().index()).show();
        });
    };
    /*---- 我的消息list------*/
    function mynewsListFun() {
        $(".u_mynews_tit").click(function () {
            $(this).parents(".u_mynews_box").toggleClass("u_mynews_on").siblings().removeClass("u_mynews_on");
            $(this).parents(".u_mynews_box").children(".u_mynews_show").slideToggle().parents(".u_mynews_box").siblings(".u_mynews_box").find(".u_mynews_show").slideUp();
        });
        $(".u_mynews_box").mouseenter(function () {
            $(this).toggleClass("u_mynews_hover").siblings().removeClass("u_mynews_hover");
        })
        $(".u_mynews_show .close").click(function () {
            $(this).parents(".u_mynews_box").children(".u_mynews_show").slideToggle().parents(".u_mynews_box").siblings(".u_mynews_box").find(".u_mynews_show").slideUp();
        });
    }
    if ($('.m_mynews').length) {
        mynewsListFun();
        mynewsTabFun();
    }

    /*---- 首页轮播------*/
    function indexSliderFun() {
        if ($('.m_adshow').length) {
            $(function () {
                $().slider({
                    container: '.m_adshow',
                    trigger: '.u_adshow_pointer li',
                    triggerPrev: '.u_adshow_prevbtn',
                    triggerNext: '.u_adshow_nextbtn',
                    panel: '.u_adshow_img li'
                });
            });
        }
    };
    indexSliderFun();

    /*---- 游戏特权轮播------*/
    function adverSliderFun() {
        if ($('.m_adver').length) {
            $(function () {
                $().slider({
                    container: '.m_adver',
                    trigger: '.u_adver_pointer li',
                    triggerPrev: '.u_adver_prevbtn',
                    triggerNext: '.u_adver_nextbtn',
                    panel: '.u_adver_img li'
                });
            });
        }
    };
    adverSliderFun();

}
allFunShow();
var subNav = $(".subnav");
var subNav2 = $(".subnav2");
$("#gameRight").mouseenter(function () {
    $(subNav[0]).show();
}).mouseleave(function () {
    $(subNav[0]).hide();
});
$("#nav_service").mouseenter(function () {
    $(subNav2[0]).show();
}).mouseleave(function () {
    $(subNav2[0]).hide();
});
/*  |xGv00|67444766f3bd57edb1c75ba0699ad7f2 */