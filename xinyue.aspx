﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xinyue.aspx.cs" Inherits="xinyueguanwang.xinyue" %>

<!DOCTYPE html>

<head>
    <meta charset="gbk" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="all">
    <meta name="author" content="tencent-TGideas">
    <meta name="Copyright" content="Tencent">
    <meta name="description" content="这是一款陪你一起游戏一起成长，让你可以更深刻了解游戏以及游戏内更新情况的软件，做为一个资深的“老司机”是玩一个游戏我们就要学会去了解它的历史这就是怎么一个软件，最后心悦向大家表示会随时更新游戏动态">
    <meta name="keywords" content="心悦主要功能，心悦官网、心悦俱乐部、心悦游戏专区、游戏礼包、手机游戏礼包、lol游戏皮肤、cf活动、dnf活动、QQ图标、账号找回、">
    <link href="../xinyuecss/basic.css" rel="stylesheet">
    <link href="../xinyuecss/main.css" rel="stylesheet">
    <link href="../css/style.css" rel="stylesheet" />
    <script src="../js/jquery.min.js"></script>
    <script src="http://localhost:7166/Scripts/jquery-1.10.2.js"></script>
    <script src="../js/script.js"></script>
    
    <style>
         #myCarousel {
            width: 585px;
            height: 417px;
            display: inline-block;
            left:0px;
            top: 0px;
        }

    </style>
    <style>
        .pic_link {
            position: absolute;
            top: ;
            left: -710px;
            z-index: 10;
            width: 710px;
            height: 327px;
            text-indent: -9999px;
        }





        .btn-xy5 {
            display: block;
            width: 168px;
            height: 168px;
            background: url(http://ossweb-img.qq.com/images/wap201404/img/fulishengdian.png) no-repeat;
            text-indent: -999em;
            z-index: 100;
            position: fixed;
            top: 0;
            right: 0;
        }

            .btn-xy5:hover {
                background: url(http://ossweb-img.qq.com/images/wap201404/img/fulishengdian.png) no-repeat;
            }



        .u_pointer_copo {
            position: absolute;
            bottom: 20px;
            left: 50%;
            margin-left: 0px;
            width: 200px;
        }

            .u_pointer_copo li {
                float: left;
                width: 12px;
                height: 12px;
                overflow: hidden;
                margin-right: 10px;
                background: #fff;
                border: #cecdd2 1px solid;
                -moz-border-radius: 8px;
                -webkit-border-radius: 8px;
                border-radius: 8px;
                cursor: pointer;
            }

                .u_pointer_copo li.cur {
                    background: #468dff;
                }

        /* ------- 滚动 --------*/

        .u_img_copo {
            width: 100%;
            height: 450px;
            overflow: hidden;
            position: relative;
        }

            .u_img_copo li {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }

            .u_img_copo img {
                width: 460px;
                height: 220px;
            }

            .u_img_copo li a {
                display: block;
                width: 100%;
                height: 100%;
            }
    </style>
  
        
        <title>心悦俱乐部 - 腾讯游戏</title>

        <script type="text/javascript">var _speedMark = new Date();</script>

        <!-- 产品：hunkwu | 设计：wayneyuwang | 重构：moonjayli | 创建：20141021 | 团队博客：http://tgideas.qq.com -->

</head>
<body>

    <div style="margin-top: 100px"></div>

    <!-- footer -->
  
    

        <!-- S 头部top条 -->

        <div id="g_topbar">
            <div class="m_topbar_box">
                <!-- S 特权地图 -->
                <div class="m_map fr">
                    <a class="u_map_btn" href="#"><i class="s fr"></i>特权地图</a>
                    <div class="u_map_link" style="display:none;">
                        <div class="list">
                            <h3>生活特权</h3>
                            <a target="_blank" title="京东优惠券周周领" href="http://xinyue.qq.com/act/pc/a20160920xinyjd/?ADTAG=gw.top.jd" onclick="pgvSendClick({hottag:'gw.top.jd'});">京东购物优惠福利</a>
                            <a target="_blank" title="深航专享福利" href="http://xinyue.qq.com/act/pc/shenhanghezuoPC/index.htm?ADTAG=gw.top.sh" onclick="pgvSendClick({hottag:'gw.top.sh'});">深航专享福利</a>
                            <a target="_blank" title="悦·享绿钻" href="http://film.qq.com/topic/2015/xinyuehlw.html?ADTAG=gw.top.lz" onclick="pgvSendClick({hottag:'gw.top.lz'});">悦·享绿钻</a>
                            <a target="_blank" title="心悦观影特权" href="http://xinyue.qq.com/act/pc/a2016081viewing/index.shtml?ADTAG=gw.top.lz" onclick="pgvSendClick({hottag:'gw.top.lz'});">心悦观影特权</a>
                        </div>
                        <div class="list">
                            <h3>游戏特权</h3>
                            <a target="_blank" onclick="pgvSendClick({hottag:'gw.top.recommend'});" title="心悦精品推荐" href="http://xinyue.qq.com/web201410/recommend.shtml?ADTAG=gw.top.recommend">心悦精品推荐</a>
                            <a target="_blank" onclick="pgvSendClick({hottag:'gw.top.mobgame'});" title="心悦手游专区" href="http://xinyue.qq.com/web201410/mobgame.shtml?ADTAG=gw.top.mobgame">心悦手游专区</a>
                            <a target="_blank" onclick="pgvSendClick({hottag:'gw.top.newgame'});" title="心悦新游专区" href="http://xinyue.qq.com/web201410/newgame.shtml?ADTAG=gw.top.newgame">心悦新游专区</a>
                            <a target="_blank" title="优先体验" href="http://xinyue.qq.com/web201410/webgame.shtml?ADTAG=gw.top.webgame" onclick="pgvSendClick({hottag:'gw.top.webgame'});">心悦页游专区</a>
                            <a target="_blank" title="游戏礼包" href="http://xinyue.qq.com/web201410/gamezone.shtml?ADTAG=gw.top.webgame" onclick="pgvSendClick({hottag:'gw.top.gamezone'});">游戏礼包</a>
                        </div>
                        <div class="list">
                            <h3>服务特权</h3>
                            <!--<a target="_blank" title="一站式服务" href="http://xinyue.qq.com/web201410/yzsfw.shtml?ADTAG=gw.top.service" onclick="pgvSendClick({hottag:\'gw.top.service\'});">一站式服务</a>-->
                            <a target="_blank" title="会员专线" href="http://xinyue.qq.com/web201410/4001508888.shtml?ADTAG=gw.top.zx" onclick="pgvSendClick({hottag:'gw.top.zx'});">会员专线</a>
                            <a target="_blank" title="心悦限时处理" href="http://xinyue.qq.com/web201410/xscl.shtml?ADTAG=gw.top.xscl" onclick="pgvSendClick({hottag:'gw.top.xscl'});">心悦限时处理</a>
                            <a target="_blank" title="被盗找回" href="http://xinyue.qq.com/web201410/daohao.shtml?ADTAG=gw.top.bdzh" onclick="pgvSendClick({hottag:'gw.top.bdzh'});">被盗找回</a>
                            <a target="_blank" title="误操作恢复" href="http://xinyue.qq.com/web201410/wczhf.shtml?ADTAG=gw.top.huifu" onclick="pgvSendClick({hottag:'gw.top.wcz'});">误操作恢复</a>
                            <a target="_blank" title="点亮尊贵图标" href="http://xinyue.qq.com/act/a20121009vip/index.htm?ADTAG=gw.top.tubiao" onclick="pgvSendClick({hottag:'gw.top.tubiao'});">点亮尊贵图标</a>
                        </div>
                        <div class="list">
                            <h3>其它</h3>
                            <a href="http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.top.personal" title="个人中心" target="_blank" class="focus" onclick="pgvSendClick({hottag:'gw.top.personal'});">个人中心</a>
                            <a href="http://xinyue.qq.com/web201410/newbie.shtml?ADTAG=gw.top.newbie" title="心悦任务" target="_blank" onclick="pgvSendClick({hottag:'gw.top.newbie'});">心悦任务</a>
                            <a href="http://xinyue.qq.com/web201410/grow_new.shtml?ADTAG=gw.top.grow_new" title="心悦体系" target="_blank" onclick="pgvSendClick({hottag:'gw.top.grow'});">心悦体系</a>
                            <!--<a href="http://e.t.qq.com/xinyuejulebu?ADTAG=gw.top.weibo" title="官方微博" target="_blank" onclick="pgvSendClick({hottag:'gw.top.weibo'});">官方微博</a>-->
                            <a href="http://xinyue.qq.com/act/a20150731zhxy/index.html?ADTAG=gw.top.zhaohuan" title="召唤心悦" target="_blank" onclick="pgvSendClick({hottag:'gw.top.zhaohuan'});">召唤心悦</a>
                            <a href="http://xinyue.gamebbs.qq.com/forum.php?ADTAG=gw.top.forum" title="心悦论坛" target="_blank" onclick="pgvSendClick({hottag:'gw.top.forum'});">心悦论坛</a>
                            <a href="http://xinyue.qq.com/web201206/help.shtml?ADTAG=gw.top.help" title="帮助中心" target="_blank" onclick="pgvSendClick({hottag:'gw.top.help'});">帮助中心</a>
                        </div>
                    </div>
                </div>
                <!-- E 特权地图 -->
                <!-- <a class="u_login_dl fr" href="#" style="display:none;">登录</a> -->
                <div class="u_login_user fr">
                    <!--<a class="reindex" href="http://xinyue.qq.com/web201206/index.shtml?ADTAG=gw.top.back.old" onclick="pgvSendClick({hottag:'gw.top.back.old'});">返回旧官网 &gt;</a>-->
                    <!-- S 用户信息 -->
                    <div class="name" id="user_name">
                        <div class="denglu.html">
                            
                            <a style="display:block;" class="denglu.html" href="denglu.html">您好，请登录</a>
                            <p class="user" style="display:none;">
                                
                                <!--<a href="http://xinyue.qq.com/act/pc/a20171212Gminute/index.html?ADTAG=gw.top" class="fr top_bar_xyscore"><i class="ico_topbar_1"></i></a>-->
                                <a title="注销" href="javascript:LoginManager.logout(comm.app.loginOut);VCookieManager.delCookie('top_guide');VCookieManager.delCookie('right_guide')" class="logout fr green">[注销]</a>
                                <a target="_blank" href="http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.top.personal">
                                    <span id="usermsg_top"></span>
                                </a>
                                <span style="position:relative;">
                                    <!--<i class="icon-dot-tip"></i>-->
                                    <a href="javascript:;" onclick="UserActivateInterface.show(1000000003);"><i class="ico ico_vip" id="vipTypeLogo_top"></i></a>
                                    <span class="m_guide_d" style="display:none">
                                        <a class="m_guide_d_close"></a>恭喜你，心悦尊贵图标已可点亮，赶紧行动吧！<a onclick="UserActivateInterface.show(1000000003);">立即点亮</a>
                                    </span>
                                    <!-- S 游戏家为您准备一份神秘宝箱 气泡-->
                                    <span class="xy-pop-gift-bubble xy-pop-spr" style="display: none">
                                        <span>腾讯·游戏家为您准备一份&nbsp;</span><a href="javascript:" class="xy-btn-get">马上开启</a>
                                        <a href="javascript:" class="xy-btn-close"></a>
                                    </span>
                                    <!-- E游戏家为您准备一份神秘宝箱 气泡-->
                                </span>
                                <a id="topbar_mail_notice" style="display:none;" class="icon_top_mail" href="http://xinyue.qq.com/web201410/mail.shtml?ADTAG=gw.top.mail"></a>
                            </p>
                        </div>
                    </div>
                    <!-- E 用户信息 -->
                    <!-- S 站内信 -->
                    <a class="mail" href="http://xinyue.qq.com/web201410/mail.shtml?ADTAG=gw.top"></a>
                    <!-- E 站内信 -->


                </div>
            </div>

        </div><!--[if !IE]>|xGv00|06696118763e8eba338d915c82036985<![endif]-->
    <div class="wave-box">

        <div class="marquee-box marquee-up" id="marquee-box">
            <div class="marquee">
                <div class="wave-list-box" id="wave-list-box1">
                    <ul>

                        <li><img height="60" alt="波浪" src="../xinyuetu/wave_02.png"></li>
                    </ul>
                </div>
                <div class="wave-list-box" id="wave-list-box2">
                    <ul>
                        <li><img height="60" alt="波浪" src="../xinyuetu/wave_01.png"></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="marquee-box" id="marquee-box3">
            <div class="marquee">
                <div class="wave-list-box" id="wave-list-box4">
                    <ul>
                        <li><img height="60" alt="波浪" src="../xinyuetu/wave_01.png"></li>
                    </ul>
                </div>
                <div class="wave-list-box" id="wave-list-box5">
                    <ul>
                        <li><img height="60" alt="波浪" src="../xinyuetu/wave_01.png"></li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
        <!-- S 领取·游戏家奖励 心悦成长值 弹窗-->
        <div id="popGift2" class="xy-pop-gift xy-pop-gift-get" style="display: none">
            <h2>领取·游戏家奖励</h2>
            <div class="xy-pop-bd">
                <div class="xy-pop-pic-1 xy-pop-spr">
                    <h3></h3>
                </div>
                <p>恭喜您成功获得<span></span></p>


                <h4>更多游戏家福利</h4>
                <ul class="xy-more-list">
                    <li>
                        <img src="http://cf.qq.com/../xinyuetu/cf04.jpg" width="148" height="125">

                        <p>充50元立返500点</p>
                        <a href="http://cf.qq.com/../xinyuetu/cf04.jpg" target="_blank" title="CF游戏家专区"></a>
                    </li>
                    <li>
                        <img src="http://bns.qq.com/../xinyuetu/jianling07.jpg" width="148" height="125">

                        <p>登录送福利</p>
                        <a href="http://bns.qq.com/../xinyuetu/jianling07.jpg" target="_blank" title="剑灵游戏家专区"></a>
                    </li>
                    <li>
                        <img src="http://eafifa.qq.com/main.shtml?ADTAG=fifa.web201509.index.btn_entermain../xinyuetu/flfa05.jpg" width="148" height="125">

                        <p>不再只有心悦会员的特权</p>
                        <a href="http://eafifa.qq.com/main.shtml?ADTAG=fifa.web201509.index.btn_entermain../xinyuetu/flfa05.jpg" target="_blank" title="FIFA游戏家专区"></a>
                    </li>
                </ul>
            </div>
            <a href="javascript:closeDialog()" class="xy-btn-close xy-pop-spr"></a>
        </div>
        <!-- E 领取·游戏家奖励 心悦成长值 弹窗-->
        <!-- S 领取·游戏家奖励 Q币 弹窗-->
        <div id="popGift3" class="xy-pop-gift xy-pop-gift-get" style="display: none">
            <h2>领取·游戏家奖励</h2>
            <div class="xy-pop-bd">
                <div class="xy-pop-pic-2 xy-pop-spr">
                    <h3></h3>
                </div>
                <p>恭喜您成功获得<span></span></p>


                <h4>更多游戏家福利</h4>
                <ul class="xy-more-list">
                    <li>
                        <img src="http://cf.qq.com/../xinyuetu/cf04.jpg" width="148" height="125">
                        <p>充50元立返50点</p>
                        <a href="http://cf.qq.com/../xinyuetu/cf04.jpg" target="_blank" title="CF游戏家专区"></a>
                    </li>
                    <li>
                        <img src="http://bns.qq.com/../xinyuetu/jianling07.jpg" width="148" height="125">
                        <p>登录送福利</p>
                        <a href="http://bns.qq.com/../xinyuetu/jianling07.jpg" target="_blank" title="剑灵游戏家专区"></a>
                    </li>
                    <li>
                        <img src="http://eafifa.qq.com/main.shtml?ADTAG=fifa.web201509.index.btn_entermain../xinyuetu/flfa05.jpg" width="148" height="125">
                        <p>不再只有心悦会员的特权</p>
                        <a href="http://eafifa.qq.com/main.shtml?ADTAG=fifa.web201509.index.btn_entermain../xinyuetu/flfa05.jpg" target="_blank" title="FIFA游戏家专区"></a>
                    </li>
                </ul>
            </div>
            <a href="javascript:closeDialog()" class="xy-btn-close xy-pop-spr"></a>
        </div>
        <!-- E 领取·游戏家奖励 Q币 弹窗-->
        <!-- S 领取·游戏家奖励 体验资格 弹窗-->
        <div id="popGift4" class="xy-pop-gift xy-pop-gift-get" style="display: none">
            <h2>领取·游戏家奖励</h2>
            <div class="xy-pop-bd">
                <div class="xy-pop-pic-3 xy-pop-spr">
                    <h3></h3>
                </div>
                <p>恭喜您成功获得<span></span></p>


                <h4>更多游戏家福利</h4>
                <ul class="xy-more-list">
                    <li>
                        <img src="http://cf.qq.com/../xinyuetu/cf04.jpg" width="148" height="125">
                        <p>充50元立返50点</p>
                        <a href="http://cf.qq.com/../xinyuetu/cf04.jpg" target="_blank" title="CF游戏家专区"></a>
                    </li>
                    <li>
                        <img src="http://bns.qq.com/../xinyuetu/jianling07.jpg" width="148" height="125">
                        <p>登录送福利</p>
                        <a href="http://bns.qq.com/../xinyuetu/jianling07.jpg" target="_blank" title="剑灵游戏家专区"></a>
                    </li>
                    <li>
                        <img src="http://eafifa.qq.com/main.shtml?ADTAG=fifa.web201509.index.btn_entermain../xinyuetu/flfa05.jpg" width="148" height="125">
                        <p>不再只有心悦会员的特权</p>
                        <a href="http://eafifa.qq.com/main.shtml?ADTAG=fifa.web201509.index.btn_entermain../xinyuetu/flfa05.jpg" target="_blank" title="FIFA游戏家专区"></a>
                    </li>
                </ul>
            </div>
            <a href="javascript:closeDialog()" class="xy-btn-close xy-pop-spr"></a>
        </div>
        <!-- E 领取·游戏家奖励 体验资格 弹窗-->
        <!-- S 打开·游戏家奖励 弹窗-->
        <div id="popGift1" class="xy-pop-gift xy-pop-gift-open" style="display: none">
            <h2>打开·游戏家奖励</h2>
            <div class="xy-pop-bd">
                <div class="xy-pop-pic xy-pop-spr">
                    <p>随机爆出<span>Q币、心悦体验资格、心悦成长值</span>等物品，祝您好运！</p>
                </div>
                <div class="xy-step"><div class="xy-line"></div><h3>第一步:获得钥匙</h3></div>
                <div class="xy-input-box" id="phoneInputBox">
                    <i class="xy-icon-phone xy-pop-spr"></i><label>手机号码</label>
                    <select id="_areacode">
                        <option value="86">中国</option>
                        <option value="852">香港</option>
                        <option value="853">澳门</option>
                        <option value="886">台湾</option>
                        <option value="1">美国</option>
                        <option value="7">俄罗斯</option>
                        <option value="44">英国</option>
                        <option value="49">德国</option>
                        <option value="33">法国</option>
                        <option value="39">意大利</option>
                        <option value="61">澳大利亚</option>
                        <option value="81">日本</option>
                        <option value="82">韩国</option>
                        <option value="65">新加坡</option>
                        <option value="376">安道尔共和国</option>
                        <option value="971">阿拉伯联合酋长国</option>
                        <option value="93">阿富汗</option>
                        <option value="1268">安提瓜和巴布达</option>
                        <option value="1264">安圭拉岛</option>
                        <option value="355">阿尔巴尼亚</option>
                        <option value="374">亚美尼亚</option>
                        <option value="247">阿森松</option>
                        <option value="244">安哥拉</option>
                        <option value="54">阿根廷</option>
                        <option value="43">奥地利</option>
                        <option value="994">阿塞拜疆</option>
                        <option value="1246">巴巴多斯</option>
                        <option value="880">孟加拉国</option>
                        <option value="32">比利时</option>
                        <option value="226">布基纳法索</option>
                        <option value="359">保加利亚</option>
                        <option value="973">巴林</option>
                        <option value="257">布隆迪</option>
                        <option value="229">贝宁</option>
                        <option value="970">巴勒斯坦</option>
                        <option value="1441">百慕大群岛</option>
                        <option value="673">文莱</option>
                        <option value="591">玻利维亚</option>
                        <option value="55">巴西</option>
                        <option value="1242">巴哈马</option>
                        <option value="267">博茨瓦纳</option>
                        <option value="375">白俄罗斯</option>
                        <option value="501">伯利兹</option>
                        <option value="1">加拿大</option>
                        <option value="1345">开曼群岛</option>
                        <option value="236">中非共和国</option>
                        <option value="242">刚果</option>
                        <option value="41">瑞士</option>
                        <option value="682">库克群岛</option>
                        <option value="56">智利</option>
                        <option value="237">喀麦隆</option>
                        <option value="57">哥伦比亚</option>
                        <option value="506">哥斯达黎加</option>
                        <option value="420">捷克</option>
                        <option value="53">古巴</option>
                        <option value="357">塞浦路斯</option>
                        <option value="420">捷克</option>
                        <option value="253">吉布提</option>
                        <option value="45">丹麦</option>
                        <option value="1890">多米尼加共和国</option>
                        <option value="213">阿尔及利亚</option>
                        <option value="593">厄瓜多尔</option>
                        <option value="372">爱沙尼亚</option>
                        <option value="20">埃及</option>
                        <option value="34">西班牙</option>
                        <option value="251">埃塞俄比亚</option>
                        <option value="358">芬兰</option>
                        <option value="679">斐济</option>
                        <option value="241">加蓬</option>
                        <option value="1809">格林纳达</option>
                        <option value="995">格鲁吉亚</option>
                        <option value="594">法属圭亚那</option>
                        <option value="233">加纳</option>
                        <option value="350">直布罗陀</option>
                        <option value="220">冈比亚</option>
                        <option value="224">几内亚</option>
                        <option value="30">希腊</option>
                        <option value="502">危地马拉</option>
                        <option value="1671">关岛</option>
                        <option value="592">圭亚那</option>
                        <option value="504">洪都拉斯</option>
                        <option value="509">海地</option>
                        <option value="36">匈牙利</option>
                        <option value="62">印度尼西亚</option>
                        <option value="353">爱尔兰</option>
                        <option value="972">以色列</option>
                        <option value="91">印度</option>
                        <option value="964">伊拉克</option>
                        <option value="98">伊朗</option>
                        <option value="354">冰岛</option>
                        <option value="225">科特迪瓦</option>
                        <option value="1876">牙买加</option>
                        <option value="962">约旦</option>
                        <option value="254">肯尼亚</option>
                        <option value="331">吉尔吉斯坦</option>
                        <option value="855">柬埔寨</option>
                        <option value="850">朝鲜</option>
                        <option value="225">科特迪瓦共和国</option>
                        <option value="965">科威特</option>
                        <option value="327">哈萨克斯坦</option>
                        <option value="856">老挝</option>
                        <option value="961">黎巴嫩</option>
                        <option value="1758">圣卢西亚</option>
                        <option value="423">列支敦士登</option>
                        <option value="94">斯里兰卡</option>
                        <option value="231">利比里亚</option>
                        <option value="266">莱索托</option>
                        <option value="370">立陶宛</option>
                        <option value="352">卢森堡</option>
                        <option value="371">拉脱维亚</option>
                        <option value="218">利比亚</option>
                        <option value="212">摩洛哥</option>
                        <option value="377">摩纳哥</option>
                        <option value="373">摩尔多瓦</option>
                        <option value="261">马达加斯加</option>
                        <option value="223">马里</option>
                        <option value="95">缅甸</option>
                        <option value="976">蒙古</option>
                        <option value="1664">蒙特塞拉特岛</option>
                        <option value="356">马耳他</option>
                        <option value="1670">马里亚那群岛</option>
                        <option value="596">马提尼克</option>
                        <option value="230">毛里求斯</option>
                        <option value="960">马尔代夫</option>
                        <option value="265">马拉维</option>
                        <option value="52">墨西哥</option>
                        <option value="60">马来西亚</option>
                        <option value="258">莫桑比克</option>
                        <option value="264">纳米比亚</option>
                        <option value="977">尼日尔</option>
                        <option value="234">尼日利亚</option>
                        <option value="505">尼加拉瓜</option>
                        <option value="31">荷兰</option>
                        <option value="47">挪威</option>
                        <option value="977">尼泊尔</option>
                        <option value="599">荷属安的列斯</option>
                        <option value="674">瑙鲁</option>
                        <option value="64">新西兰</option>
                        <option value="968">阿曼</option>
                        <option value="507">巴拿马</option>
                        <option value="51">秘鲁</option>
                        <option value="689">法属玻利尼西亚</option>
                        <option value="675">巴布亚新几内亚</option>
                        <option value="63">菲律宾</option>
                        <option value="92">巴基斯坦</option>
                        <option value="48">波兰</option>
                        <option value="1787">波多黎各</option>
                        <option value="351">葡萄牙</option>
                        <option value="595">巴拉圭</option>
                        <option value="974">卡塔尔</option>
                        <option value="262">留尼旺</option>
                        <option value="40">罗马尼亚</option>
                        <option value="966">沙特阿拉伯</option>
                        <option value="677">所罗门群岛</option>
                        <option value="248">塞舌尔</option>
                        <option value="249">苏丹</option>
                        <option value="46">瑞典</option>
                        <option value="386">斯洛文尼亚</option>
                        <option value="421">斯洛伐克</option>
                        <option value="232">塞拉利昂</option>
                        <option value="378">圣马力诺</option>
                        <option value="684">东萨摩亚(美)</option>
                        <option value="685">西萨摩亚</option>
                        <option value="221">塞内加尔</option>
                        <option value="252">索马里</option>
                        <option value="597">苏里南</option>
                        <option value="239">圣多美和普林西比</option>
                        <option value="503">萨尔瓦多</option>
                        <option value="963">叙利亚</option>
                        <option value="268">斯威士兰</option>
                        <option value="235">乍得</option>
                        <option value="228">多哥</option>
                        <option value="66">泰国</option>
                        <option value="992">塔吉克斯坦</option>
                        <option value="993">土库曼斯坦</option>
                        <option value="216">突尼斯</option>
                        <option value="676">汤加</option>
                        <option value="90">土耳其</option>
                        <option value="1809">特立尼达和多巴哥</option>
                        <option value="255">坦桑尼亚</option>
                        <option value="380">乌克兰</option>
                        <option value="256">乌干达</option>
                        <option value="598">乌拉圭</option>
                        <option value="233">乌兹别克斯坦</option>
                        <option value="1784">圣文森特岛</option>
                        <option value="58">委内瑞拉</option>
                        <option value="84">越南</option>
                        <option value="967">也门</option>
                        <option value="381">南斯拉夫</option>
                        <option value="27">南非</option>
                        <option value="260">赞比亚</option>
                        <option value="243">扎伊尔</option>
                        <option value="263">津巴布韦</option>
                    </select>
                    <input id="_phone" class="xy-tel-input">
                    <a href="javascript:" class="xy-btn-blue">获取验证码</a>
                    <p style="display: none">请输入您的手机号码</p>
                </div>
                <div class="xy-input-box" id="verifyInputBox">
                    <i class="xy-icon-verify xy-pop-spr"></i><label>验证码</label>
                    <input id="_vcode" class="xy-verify-input">
                    <a href="javascript:" class="xy-btn-blue">确认绑定</a>
                    <p style="display: none">请输入验证码</p>
                </div>
                <div class="xy-step"><div class="xy-line"></div><h3>第二步:打开宝箱</h3></div>
                <a href="javascript:" class="xy-btn-open xy-disabled"><i class="xy-icon-key xy-pop-spr"></i>点击开启</a>
                <p class="xy-notice" style="display: none">请先完成第一步才能开启宝箱哦</p>
            </div>
            <a href="javascript:closeDialog()" class="xy-btn-close xy-pop-spr"></a>
        </div>
        <!-- E 打开·游戏家奖励 弹窗-->


        <script type="text/javascript" src="http://apps.game.qq.com/comm-htdocs/js/ams/v0.2R02/act/49210/act.desc.js"></script>

        <script type="text/javascript">

            function getAwardPage(v) {

                if (v == "1Q币") {
                    TGDialogS('popGift3');
                    $('#popGift3 h3').text(v);
                    $('#popGift3 span').text(v);

                }
                if (v == "5Q币") {
                    TGDialogS('popGift3');
                    $('#popGift3 h3').text(v);
                    $('#popGift3 span').text(v);
                }
                if (v == "V1体验资格(7天)") {
                    TGDialogS('popGift4');
                    $('#popGift4 h3').text(v);
                    $('#popGift4 span').text(v);
                }
                if (v == "V3体验资格(7天)") {
                    TGDialogS('popGift4');
                    $('#popGift4 h3').text(v);
                    $('#popGift4 span').text(v);
                }
                if (v == "成长值500") {
                    TGDialogS('popGift2');
                    $('#popGift2 h3').text(v);
                    $('#popGift2 span').text(v);
                }



            }


            // 抽奖领取主功能初始化
            amsCfg_255838 = {
                'iAMSActivityId': '49210', // AMS活动号
                'activityId': '144418', // 模块实例号

                //可选扩展参数sData，
                /**
                "sData":{
                        "sPlatId":1,
                        "sArea":4,
                        "appid":"100584625",
                        "sServiceType":"pao"
                        },
                **/

                'onBeginGetGiftEvent': function () {
                    return 0; // 抽奖前事件，返回0表示成功
                },
                'onGetGiftFailureEvent': function (callbackObj) {// 抽奖失败事件
                    alert(callbackObj.sMsg);
                },
                'onGetGiftSuccessEvent': function (callbackObj) {// 抽奖成功事件
                    if (!callbackObj.sPackageName) {
                        LotteryManager.alert(callbackObj.sMsg);
                        return;
                    }
                    //1：实物
                    getAwardPage(callbackObj.sPackageName)
                    var str = "恭喜您获得了 " + callbackObj.sPackageName + " !";
                    if ((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1) {
                        /*
                         * 0：虚拟游戏物品
                         * 1：实际物品，需要填写个人收货信息
                         * 2：cdkey
                         */
                        str += "请您准确填写个人信息，官方将有工作人员联系您。";
                        LotteryManager.alert(str);
                        return;
                    }
                    //2：cdkey
                    if (callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey) {

                        LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
                        //LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
                        return;
                    }
                    str += "请您注意查收！";
                    //LotteryManager.alert(str);
                    return;
                }
            };
        </script>

        <!-- E 头部top条 -->
        <!-- S 导航条 -->

        <div id="g_nav">
            <div class="m_nav_box">
                <h1 class="m_nav_logo"><a href="http://localhost:14943/xinyuehtml/index.html" title="心悦俱乐部" onclick="pgvSendClick({hottag:'gw.nav.logo'});"><img src="../xinyuetu/zutu.jpg" width="230" height="70" alt="返回首页" /></a></h1>
                <div class="m_nav_list">
                    <ul>
                        <li class="cur"><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.home'});" title="首页">首页</a></li>
                        <li id="gameRight">
                            <a href="/webplat/info/news_version3/833/10563/10596/10598/m8407/list_1.shtml?ADTAG=gw.nav.gamezone" onclick="pgvSendClick({hottag:'gw.nav.gamezone'});" title="游戏特权">游戏特权</a>
                            <div class="subnav">
                                <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.mobgame'});" title="心悦手游专区">心悦未来的手游世界</a>
                                <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.newgame'});" title="新游体验专区">心悦未来的新游体验专区</a>
                                <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.recommend'});" title="精品游戏推荐">心悦未来的精品游戏推荐</a>
                                <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.yueshanghui'});" title="精品游戏推荐">心悦未来的传奇悦享会</a>
                            </div>
                        </li>
                        <li id="nav_service">
                            <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.service'});" title="服务特权">服务特权</a>
                            <div class="subnav2">
                                <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.service.wechat'});" title="在线管家" style="display:none">在线管家</a>
                                <a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.service.400'});" title="404服务专区">404服务专区</a>
                            </div>
                        </li>
                        <li><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.life'});" title="生活特权">生活特权</a></li>
                        <li><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.safe'});" title="新闻中心">新闻中心</a></li>
                        <li id="intro_step_5"><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.personal'});" title="个人中心">个人中心</a></li>
                        <li><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.grow'});" title="会员体系">会员体系</a></li>
                        <li><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.daohang'});" title="G分">积分</a></li>
                        <!--<li><a href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.nav.brand'});" title="2015品牌站" target="_blank">2015品牌站</a></li>-->
                    </ul>
                </div>


                <!--<div id="g_movepic">

                    <!-- S 广告轮播 -->
                <!--<div id="myCarousel" class="carousel slide" data-ride="carousel">-->
                <!-- 轮播（Carousel）指标小圆圈 -->
                <!--<ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"><>
                    <li data-target="#myCarousel" data-slide-to="1"><>
                    <li data-target="#myCarousel" data-slide-to="2"><>
                    <li data-target="#myCarousel" data-slide-to="3"><>
                </ol>-->
                <!-- 轮播（Carousel） 项目 -->
                <!--<div class="carousel-inner boxCarousel">
                        <div class="item active">

                            <img style="width:630px;height:405px;" src="../xinyuetu/cf04.jpg" alt="070503273.jpg" />
                            <div class="carousel-inner titles">标题1</div>
                        </div>
                        <div class="item">
                            <img style="width:630px;height:405px;" src="../xinyuetu/flfa05.jpg" alt="131551308.jpg" />
                            <div class="carousel-inner titles">标题2</div>
                        </div>
                        <div class="item">
                            <img style="width:630px;height:405px;" src="../xinyuetu/lol06.jpg" alt="140116182482507.jpg" />
                            <div class="carousel-inner titles">标题3</div>
                        </div>
                        <div class="item">
                            <img style="width:630px;height:405px;" src="../xinyuetu/quanhuang12.jpg" alt="1_150210161508_1.jpg" />
                            <div class="carousel-inner titles">标题4</div>
                        </div>
                    </div>
                    <div class="btns">
                        <a class="leftbtn" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                        <a class="rightbtn" href="#myCarousel" data-slide="next">&rsaquo;</a>
                    </div>
                </div>-->
                <!--<div class="m_adshow">

                    <ul class="u_adshow_img u_img_adver">-->
                <!--

                <li style="background:url(images/img/banner01.jpg) center top;"><a href="#">&nbsp;</a></li>

                -->
                <!--</ul>
                <div class="u_adshow_pointer_loca">
                    <ul class="u_adshow_pointer u_pointer_adver">-->
                <!--<li class="cur">&nbsp;</li>

                <li>&nbsp;</li>

                <li>&nbsp;</li>

                <li>&nbsp;</li>

                -->
                <!--</ul>-->
            </div>

            <div class="u_adshow_btn">

                <a href="#" class="u_adshow_prevbtn"></a>

                <a href="#" class="u_adshow_nextbtn"></a>

            </div>

        </div>

        <!-- E 广告轮播 -->
        <!-- S 登陆框 -->

        <div class="g_login_box">

            <!-- S 登陆前后 -->
            <!-- S 登陆后 -->
            <div class="m_login">
                <div class="u_user_hd">
                    <p class="mail clearfix"><a href="http://localhost:14943/xinyuehtml/index.html"></a></p>
                    <p class="quit"><a href="javascript:LoginManager.logout(comm.app.loginOut);VCookieManager.delCookie('top_guide');VCookieManager.delCookie('right_guide')" class="logout fr green">注销</a></p>
                </div>
                <div class="u_user_vip">
                    <a class="img" href="http://xinyue.qq.com/web201410/personal.shtml?ADTAG=gw.login.head"><img src="" /></a>
                    <p class="name"></p>
                    <div class="dtVip" style="display:none">
                        <span class="vip"></span>
                        <span class="bar">
                            <span class="c" style="width:0%;">
                            </span>
                        </span>
                        <span class="vip"></span>
                    </div>
                </div>
                <div class="u_user_num clearfix">
                    <div class="value fl">
                        <p class="n"></p>
                        <p></p>
                    </div>
                    <div class="rank fl">
                        <p class="n">0&nbsp;</p>
                        <p>心悦排名</p>
                    </div>
                    <div class="date fl">
                        <p class="n">&nbsp;</p>
                        <p>会员有效期</p>
                    </div>
                </div>
                <div class="u_user_btn">
                    <a class="cent" href="#">个人中心</a>
                    <p class="expire_tips" style="display:none">您的心悦会员将于2016-11-30过期，续期可享有每月价值万元的免费礼包。 <a href="">点击续期</a></p>
                    <!--<p class="link"><a href="http://xinyue.qq.com/act/a20141216ahfc/index.shtml?ADTAG=gw.login.link" onclick="pgvSendClick({hottag:'gw.login.link'});">全民破坏神——心悦带你尽享暗黑风潮</a></p>-->
                </div>
            </div>
            <!-- E 登陆后 -->
            <!-- S 登陆前 -->
            <div class="m_attend" style="display:none;">
                <div class="u_attend_hd">
                    <span class="img"></span>
                </div>
                <div class="u_attendr_bd">
                    <a class="btn" href="javascript:LoginManager.login(comm.app.login);">登录查看我的信息</a>
                    <p class="mt20">游戏心悦俱乐部：</p>
                    <p>为你提供丰富的游戏、生活、服务等专属特权</p>
                </div>
            </div>
            <!-- E 登陆前 -->
            <!-- E 登陆前后 -->

        </div>

        <!-- E 登陆框 -->
        </div>-->

        <!-- E 主轮播 -->
        <!-- S 内容 -->

        <!--<div id="g_content">

            <div class="m_content_box">

                <div class="m_sectionA clearfix">-->

                    <!-- S 心悦人物 -->

                    <!--<div class="m_manshow mr14 fl">

                        <h2 class="tit"><span class="s"></span>合作推荐</h2>

                        <div class="u_manshow_pic">

                            <ul class="u_img_copo">
                            </ul>
                            <div class="u_manshow_pic">

                                <ul class="u_img_copo">

                                    <li><img src="../xinyuetu/lol06.jpg" /></li>
                                    <li><img src="../xinyuetu/qqfeiche02.jpg" /></li>
                                    <li><img src="../xinyuetu/daota09.jpg" /></li>
                                    <li><img src="../xinyuetu/lol06.jpg" /></li>
                                    <li><img src="../xinyuetu/qqfeiche02.jpg" /></li>
                                </ul>
                                <ul class="u_pointer_copo">
                                    <li class="cur"></li>
                                    <li class="cur"></li>
                                    <li class="cur"></li>
                                    <li class=""></li>
                                </ul>
                            </div>
                        </div>
                    </div>-->
    <!--11111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
    
    <style type="text/css">
        #banner {
            position: relative;
            width: 478px;
            height: 286px;
            border: 1px solid #666;
            overflow: hidden;
        }

        #banner_list img {
            border: 0px;
        }

        #banner_bg {
            position: absolute;
            bottom: 0;
            background-color: #000;
            height: 30px;
            filter: Alpha(Opacity=30);
            opacity: 0.3;
            z-index: 1000;
            cursor: pointer;
            width: 478px;
        }

        #banner_info {
            position: absolute;
            bottom: 0;
            left: 5px;
            height: 22px;
            color: #fff;
            z-index: 1001;
            cursor: pointer;
        }

        #banner_text {
            position: absolute;
            width: 120px;
            z-index: 1002;
            right: 3px;
            bottom: 3px;
        }

        #banner ul {
            position: absolute;
            list-style-type: none;
            filter: Alpha(Opacity=80);
            opacity: 0.8;
            z-index: 1002;
            margin: 0;
            padding: 0;
            bottom: 3px;
            right: 5px;
        }

            #banner ul li {
                padding: 0px 8px;
                float: left;
                display: block;
                color: #FFF;
                background: #6f4f67;
                cursor: pointer;
                border: 1px solid #333;
            }

                #banner ul li.on {
                    background-color: #000;
                }
        让四张图片都可以重叠在一起-- >
    </style>

    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>



    <script type="text/javascript">

var t = n =0, count;

$(document).ready(function(){

count=$("#banner_list a").length;

$("#banner_list a:not(:first-child)").hide();

$("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));

$("#banner_info").click(function(){window.open($("#banner_list a:first-child").attr('href'), "_blank")});

$("#banner li").click(function() {

var i = $(this).text() -1;//获取Li元素内的值，即1，2，3，4

n = i;

if (i >= count) return;

$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));

$("#banner_info").unbind().click(function(){window.open($("#banner_list a").eq(i).attr('href'), "_blank")})

$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);

document.getElementById("banner").style.background="";

$(this).toggleClass("on");

$(this).siblings().removeAttr("class");

});

t = setInterval("showAuto()", 4000);

$("#banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 4000);});

})



function showAuto()

{

n = n >=(count -1) ?0 : ++n;

$("#banner li").eq(n).trigger('click');

}

    </script>
        <div id="banner">
            <h2 class="tit"><span class="s"></span>热点推荐</h2>

            <div id="banner_bg"></div>

            <!--标题背景-->

            <div id="banner_info"></div>

            <!--标题-->
            <ul>
                <li class="on">1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            <div id="banner_list">
                <a href="#" target="_blank"><img src="../xinyuetu/dnf01.jpg" title="地下城与勇士" alt="地下城与勇士" /></a>
                <a href="#" target="_blank"><img src="../xinyuetu/qqfeiche02.jpg" title="QQ飞车" alt="QQ飞车" /></a>
                <a href="#" target="_blank"><img src="../xinyuetu/lol06.jpg" title="英雄联盟" alt="英雄联盟" /></a>
                <a href="#" target="_blank"><img src="../xinyuetu/cf04.jpg" title="穿越火线" alt="穿越火线" /></a>
            </div>
        </div>
        <script src="http://www.jq22.com/js/jq.js"></script>
        <!--1111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
    </body>
                    <div class="m_news mr14 fl">
                        <h2 class="tit"><span class="s"></span>热点新闻</h2>
                            <div class="tab_hd clearfix">
                                <ul id="J_tabSwitch" class="clearfix">
                                    <li class="tab_cur"><a href="javascript:void(0)">最新</a></li>
                                    <li><a href="javascript:void(0)">公告</a></li>
                                    <li><a href="javascript:void(0)">活动</a></li>
                                </ul>
                                <i class="l1"></i>
                                <i class="l2"></i>
                                <i class="l3"></i>
                                <a class="more" target="_blank" href="/webplat/info/news_version3/833/2325/2327/m2194/list_1.shtml?ADTAG=gw.home.news.more" onclick="pgvSendClick({hottag:'gw.home.news.more'});"><span class="s"></span>更多</a>
                            </div>
                            <div class="tab_bd" id="J_tabContent">
                                <div style="display:block;" class="tab_content">
                                    <ul class="ul_list">
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/huangyeixingdong11.jpg" target="_blank">[新闻] 预约正版绝地求生手游《绝地求生 全军出击》，瓜分百万Q币！</a><b class="time">01/12</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/cf04.jpg" target="_blank">[公告] 《穿越火线》 拿起你的枪去战斗吧！！！！！！！！</a><b class="time">01/05</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/daota09.jpg" target="_blank">[新闻] 《刀塔传奇》让我们一起来保卫家园</a><b class="time">01/03</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/qqfeiche02.jpg" target="_blank">[新闻] 《QQ飞车手游》不删档上线，心悦送你专属时装！</a><b class="time">12/27</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/dnf01.jpg" target="_blank">[新闻] 《地下城与勇士》阿拉德的勇士们一起来保卫阿拉德吧！！！！！</a><b class="time">12/26</b></li>
                                    </ul>
                                </div>
                                <div class="tab_content">
                                    <ul class="ul_list">
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/huangyeixingdong11.jpg" target="_blank">[新闻] 预约正版绝地求生手游《绝地求生 全军出击》，瓜分百万Q币！</a><b class="time">01/12</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/jianling07.jpg" target="_blank">[新闻] 《剑灵》我们的门派是你最好的选择</a><b class="time">01/03</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/qqfeiche02.jpg" target="_blank">[新闻] 《QQ飞车手游》不删档上线，心悦送你专属时装！</a><b class="time">12/27</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/lol06.jpg" target="_blank">[新闻] 《英雄联盟》让我们一起征战沙场吧</a><b class="time">12/26</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/menghuanxiyou10.jpg" target="_blank">[新闻] 《梦幻西游》 百万人一起冲！！！！！！！</a><b class="time">12/21</b></li>
                                    </ul>
                                </div>
                                <div class="tab_content">
                                    <ul class="ul_list">
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/moshou08.jpg" target="_blank">[公告] 《魔兽》魔兽最新地图</a><b class="time">01/05</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/moyu13.jpg" target="_blank">[公告] 《魔域》让我们来体验最炫的技能，最强的战斗方式</a><b class="time">12/04</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/quanhuang12.jpg" target="_blank">[公告] 拳皇终极技能重现</a><b class="time">11/17</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/tanwanlany15.jpg" target="_blank">[公告] 上贪玩和渣渣辉一起玩转贪玩</a><b class="time">11/13</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="../xinyuetu/yonghengji14.jpg" target="_blank">[公告] 新的职业新的技能新的战斗方式体验不一样的感觉</a><b class="time">11/06</b></li>
                                    </ul>
                                </div>
                                <div class="tab_content">
                                    <ul class="ul_list">
                                        <li class="list"><i class="bgskin"></i><a href="http://www.5qwan.com/?url_targeting=baidu&audience=184571" target="_blank">[活动] 看尽一切的虚幻拨开云雾！</a><b class="time">12/16</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="http://www.5qwan.com/?url_targeting=baidu&audience=184571" target="_blank">[活动] 热心的体验是最好的证明</a><b class="time">08/05</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="http://www.5qwan.com/?url_targeting=baidu&audience=184571" target="_blank">[活动] 告别我们的手走上人工智能的时代</a><b class="time">07/26</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="http://www.5qwan.com/?url_targeting=baidu&audience=184571" target="_blank">[活动] 是否让我们一起来寻找你的真心</a><b class="time">05/04</b></li>
                                        <li class="list"><i class="bgskin"></i><a href="http://www.5qwan.com/?url_targeting=baidu&audience=184571" target="_blank">[活动] 去TM的老子今天不上班</a><b class="time">03/09</b></li>
                                    </ul>
                                </div>
                            </div>
                        </div>                  =
                    <!-- E 最新消息 -->
                    <!-- S 快速入口 -->
                    <div class="m_enter fl">
                        <h2 class="tit"><span class="s"></span>快速入口</h2>
                        <div class="u_enter_list">
                            <ul class="clearfix">
                                <li class="n6"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.star_gift'});"><span class="io"></span><span class="txt">G分兑换</span></a></li>
                                <!-- <li class="n4"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.newbie'});"><span class="io"></span><span class="txt">心悦App</span></a></li> -->
                                <li class="n4"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.newbie'});"><span class="io"></span><span class="txt">心悦App</span></a></li>
                                <li class="n2"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.service.path.forum'});"><span class="io"></span><span class="txt">心悦论坛</span></a></li>
                                <li class="n3"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.yueshanghui'});"><span class="io"></span><span class="txt">传奇悦享会</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <!-- E 快速入口 -->                
                <!-- S 客户端游戏 -->
                <div class="m_sectionC mt50">
                    <div class="m_clientgame">
                        <div class="u_clientgame_hd">
                            <a class="btn_more" href="https://www.baidu.com/" onclick="pgvSendClick({hottag:'gw.home.client.more'});"><i class="s"></i>更多</a>
                            <h2 class="tit"><a href="http://localhost:14943/xinyuehtml/index.html"><span class="s"></span>客户端游戏</a></h2>
                        </div>
                        <div class="u_clientgame_bd mt10">
                            <ul class="ul_bor clearfix">
                                <li class="mr14 long">
                                    <a href='#' data-TGAD='11028,9147' onclick="pgvSendClick({hottag:'gw.home.client.ad1'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11028,9147' onclick="pgvSendClick({hottag:'gw.home.client.ad1'});"></a>
                                </li>
                                <li class="mr14">
                                    <a href='#' data-TGAD='11028,9148' onclick="pgvSendClick({hottag:'gw.home.client.ad2'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11028,9148' onclick="pgvSendClick({hottag:'gw.home.client.ad2'});"></a>
                                </li>
                                <li class="mr14">
                                    <a href='#' data-TGAD='11028,9149' onclick="pgvSendClick({hottag:'gw.home.client.ad3'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11028,9149' onclick="pgvSendClick({hottag:'gw.home.client.ad3'});"></a>
                                </li>
                                <li class="wlast">
                                    <a href='#' data-TGAD='11028,9150' onclick="pgvSendClick({hottag:'gw.home.client.ad4'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11028,9150' onclick="pgvSendClick({hottag:'gw.home.client.ad4'});"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- E 客户端游戏 -->
                <!--111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
                <!-- S 手机游戏 -->
                <div class="m_sectionB mt50">
                    <div class="m_phonegame">
                        <div class="u_phonegame_hd">
                            <a class="btn_more" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.mob.more'});"><i class="s"></i>更多</a>
                            <!--<h2 class="tit"><a href="http://localhost:14943/xinyuehtml/index.html"><span class="s"></span>手机游戏</a></h2>-->
                            <h2 class="tit"><span class="s"></span>手机游戏</h2>
                        </div>
                        <div class="u_phonegame_bd mt10">
                            <ul class="ul_bor clearfix">
                                <li class="mr14 long">
                                    <a href='#' target="_blank" data-TGAD='11026,9121' onclick="pgvSendClick({hottag:'gw.home.mob.ad1'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11026,9121' onclick="pgvSendClick({hottag:'gw.home.mob.ad1'});"></a>
                                </li>
                                <li class="mr14 long">
                                    <a href='#' target="_blank" data-TGAD='11026,9123' onclick="pgvSendClick({hottag:'gw.home.mob.ad2'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11026,9123' onclick="pgvSendClick({hottag:'gw.home.mob.ad2'});"></a>
                                </li>
                                <li class="wlast">
                                    <a href='#' target="_blank" data-TGAD='11026,9124' onclick="pgvSendClick({hottag:'gw.home.mob.ad3'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11026,9124' onclick="pgvSendClick({hottag:'gw.home.mob.ad3'});"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- E 手机游戏 -->
                <!-- S 平台特权 -->
                <div class="m_sectionF mt50">
                    <div class="m_daoju">
                        <div class="u_daoju_hd">
                            <a class="btn_more" href="http://daoju.qq.com/mall/?ADTAG=gw.home.daoju.more" onclick="pgvSendClick({hottag:'gw.home.daoju.more'});"><i class="s"></i>更多</a>
                            <h2 class="tit"><span class="s"></span>平台特权</h2>
                        </div>
                        <div class="u_daoju_bd mt10">
                            <ul class="ul_bor clearfix">
                                <li class="mr14 long">
                                    <a href='#' data-TGAD='14755,13255' onclick="pgvSendClick({hottag:'gw.home.daoju.ad1'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='14755,13255' onclick="pgvSendClick({hottag:'gw.home.daoju.ad1'});"></a>
                                </li>
                                <li class="mr14">
                                    <a href='#' data-TGAD='14755,13256' onclick="pgvSendClick({hottag:'gw.home.daoju.ad2'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='14755,13256' onclick="pgvSendClick({hottag:'gw.home.daoju.ad2'});"></a>
                                </li>
                                <li class="mr14">
                                    <a href='#' data-TGAD='14755,13257' onclick="pgvSendClick({hottag:'gw.home.daoju.ad3'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='14755,13257' onclick="pgvSendClick({hottag:'gw.home.daoju.ad3'});"></a>
                                </li>
                                <li class="wlast">
                                    <a href='#' data-TGAD='14755,13258' onclick="pgvSendClick({hottag:'gw.home.daoju.ad4'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='14755,13258' onclick="pgvSendClick({hottag:'gw.home.daoju.ad4'});"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>                <!-- E 平台特权 -->
                <!-- S 网页游戏 -->
                <div class="m_sectionD mt50">
                    <div class="m_pagegame">
                        <div class="u_pagegame_hd">
                            <a class="btn_more" href="http://daoju.qq.com/mall/?ADTAG=gw.home.daoju.more" onclick="pgvSendClick({hottag:'gw.home.web.more'});"><i class="s"></i>更多</a>
                            <h2 class="tit"><a href="http://daoju.qq.com/mall/?ADTAG=gw.home.daoju.more"><span class="s"></span>网页游戏</a></h2>
                        </div>
                        <div class="u_pagegame_bd mt10">
                            <ul class="ul_bor clearfix">
                                <li class="mr14 long">
                                    <a href='#' data-TGAD='11029,9151' onclick="pgvSendClick({hottag:'gw.home.web.ad1'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11029,9151' onclick="pgvSendClick({hottag:'gw.home.web.ad1'});"></a>
                                </li>
                                <li class="mr14">
                                    <a href='#' data-TGAD='11029,9152' onclick="pgvSendClick({hottag:'gw.home.web.ad2'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11029,9152' onclick="pgvSendClick({hottag:'gw.home.web.ad2'});"></a>
                                </li>
                                <li class="mr14">
                                    <a href='#' data-TGAD='11029,9153' onclick="pgvSendClick({hottag:'gw.home.web.ad3'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11029,9153' onclick="pgvSendClick({hottag:'gw.home.web.ad3'});"></a>
                                </li>
                                <li class="wlast">
                                    <a href='#' data-TGAD='11029,9154' onclick="pgvSendClick({hottag:'gw.home.web.ad4'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11029,9154' onclick="pgvSendClick({hottag:'gw.home.web.ad4'});"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- E 网页游戏 -->
                <!-- S 抢先体验和线下活动 -->
                <div class="m_sectionE mt50 clearfix">
                    <!-- S 抢先体验特权 -->
                    <div class="m_privilege mr14 fl">
                        <h2 class="tit"><span class="s"></span>抢先体验特权</h2>
                        <div class="u_privilege_pic">
                            <a href='#' data-TGAD='11031,9158' onclick="pgvSendClick({hottag:'gw.home.priority.ad1'});"></a>
                            <a href='#' target="_blank" class="s" title-TGAD='11031,9158' onclick="pgvSendClick({hottag:'gw.home.priority.ad1'});"></a>
                            <a class="pic" href='#' data-TGAD='11031,9159' onclick="pgvSendClick({hottag:'gw.home.priority.ad2'});"></a>
                        </div>
                    </div>
                    <!-- E 抢先体验特权  -->
                    <!-- S 心悦人物 -->
                    <div class="m_act fl">
                        <h2 class="tit"><span class="s"></span>心悦人物</h2>
                        <div class="u_act_bd">
                            <ul class="ul_bor clearfix">
                                <li class="mr14">
                                    <a href='#' data-TGAD='11030,10945' onclick="pgvSendClick({hottag:'gw.home.offline.ad1'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11030,10945' onclick="pgvSendClick({hottag:'gw.home.offline.ad1'});"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- E 心悦人物 -->
                    <!-- S 线下活动 -->
                    <div class="m_act fl">
                        <h2 class="tit"><span class="s"></span>心悦线下活动</h2>
                        <div class="u_act_bd">
                            <ul class="ul_bor clearfix">
                                <li class="mr14">
                                    <a href='#' data-TGAD='11030,9156' onclick="pgvSendClick({hottag:'gw.home.offline.ad2'});"></a>
                                    <a href='#' target="_blank" class="s" title-TGAD='11030,9156' onclick="pgvSendClick({hottag:'gw.home.offline.ad2'});"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- E 线下活动 -->
                    <!-- S 召唤"新"悦 -->
                    <div class="m_act fl wlast">
                        <h2 class="tit"><span class="s"></span>召唤"新"悦</h2>
                        <div class="u_act_bd">
                            <ul class="ul_bor clearfix">
                                <li>                         
                                    <a href='http://daoju.qq.com/mall/?ADTAG=gw.home.daoju.more' target="_blank" onclick="pgvSendClick({hottag:'gw.home.hardcore'});"><img src="../xinyuetu/07.jpg" width="222" height="220" alt="" /></a>
                                    <a href='http://daoju.qq.com/mall/?ADTAG=gw.home.daoju.more' target="_blank" class="s" onclick="pgvSendClick({hottag:'gw.home.hardcore'});">hardcore玩家招募计划！</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- E 召唤"新"悦 -->
                </div>
                <!-- E 抢先体验和线下活动 -->
                <!-- S 快速入口底部位 -->
                <div class="m_enter m_enter_bottom mt50">
                    <h2 class="tit"><span class="s"></span>快速入口</h2>
                    <div class="u_enter_list">
                        <ul class="clearfix">
                            <li class="n3"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.recommend'});"><span class="io"></span><span class="txt">心悦推荐</span></a></li>
                            <li class="n4"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.newbie'});"><span class="io"></span><span class="txt">新手专区</span></a></li>
                            <li class="n2"><a target="_blank" href="http://xinyue.qq.com/web201206/help.shtml?ADTAG=gw.home.path.help" onclick="pgvSendClick({hottag:'gw.home.path.help'});"><span class="io"></span><span class="txt">帮助中心</span></a></li>
                            <li class="n1"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.home.path.forum'});"><span class="io"></span><span class="txt">心悦论坛</span></a></li>
                        </ul>
                    </div>
                </div>
                <!-- E 快速入口底部位 -->           
        <!-- E 内容 -->
        <!-- S 底部 -->
        <div id="g_footer">
            <div class="m_footer_box">
                <ul class="clearfix">
                    <li class="u_footer_nav01">
                        <a target="_blank" href="http://localhost:14943/xinyuehtml/index.html" onclick="pgvSendClick({hottag:'gw.bottom.forum'});">
                            <span class="pic fl"></span>
                            <div class="txt">
                                <h3>心悦官方论坛</h3>
                                <p>心悦会员官方交流平台</p>
                                <p>倾听用户的声音</p>
                            </div>
                        </a>
                    </li>
                    <li class="u_footer_nav02">
                        <span class="pic fl"></span>
                        <div class="txt">
                            <h3>官方微信公众号</h3>
                            <p class="blue">tencentjoyclub</p>
                            <p>心悦微官网 全新上线</p>
                        </div>
                    </li>
                    <li class="u_footer_nav03">
                        <span class="pic fl"></span>
                        <div class="txt">
                            <h3>专属客服热线</h3>
                            <p class="blue">4008812345(VIP2)</p>
                            <p class="blue">4001508888(VIP3)</p>
                            <p>专享快速接入语音服务</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- E 底部 -->
        <!-- S 右侧栏 -->

        <div id="g_rbar">
            <ul class="u_rbar_list">
                <li class="rb1"><a id="returnTop">top</a></li>
                <li class="rb4"><a target="_blank" href="http://localhost:14943/xinyuehtml/index.html">在线管家服务</a></li>
                <li class="rb2">
                    <a id="Dcode">二维码</a>
                    
                    <span id="DcodeBox" style="display:none;"><img src="../xinyuetu/erweima.png" width="160" height="190" /></span>
                </li>
                <li class="rb3"><a target="_blank" href="http://www.beian.gov.cn/portal/index" onclick="pgvSendClick({hottag:'gw.rightbar.help'});">帮助中心</a></li>
            </ul>

        </div>


        <!-- S 弹窗1 -->
        <div class="pop_dia" id="pop_dia01" style="display:none;">
            <div class="dia_con">
                <h3 class="dia_tit">绑定手机</h3>
                <div class="dia_bd">
                    <div class="dia_action">
                        <div class="item_tips">手机号码将作为你以后使用特权的重要凭证，请确保无误</div>
                        <div class="item mt20">
                            <label>请输入绑定手机号：</label>

                            <select style="width: 50px" id="cCode">
                                <option value="86">中国</option>
                                <option value="852">香港</option>
                                <option value="853">澳门</option>
                                <option value="886">台湾</option>
                                <option value="1">美国</option>
                                <option value="7">俄罗斯</option>
                                <option value="44">英国</option>
                                <option value="49">德国</option>
                                <option value="33">法国</option>
                                <option value="39">意大利</option>
                                <option value="61">澳大利亚</option>
                                <option value="81">日本</option>
                                <option value="82">韩国</option>
                                <option value="65">新加坡</option>
                                <option value="376">安道尔共和国</option>
                                <option value="971">阿拉伯联合酋长国</option>
                                <option value="93">阿富汗</option>
                                <option value="1268">安提瓜和巴布达</option>
                                <option value="1264">安圭拉岛</option>
                                <option value="355">阿尔巴尼亚</option>
                                <option value="374">亚美尼亚</option>
                                <option value="247">阿森松</option>
                                <option value="244">安哥拉</option>
                                <option value="54">阿根廷</option>
                                <option value="43">奥地利</option>
                                <option value="994">阿塞拜疆</option>
                                <option value="1246">巴巴多斯</option>
                                <option value="880">孟加拉国</option>
                                <option value="32">比利时</option>
                                <option value="226">布基纳法索</option>
                                <option value="359">保加利亚</option>
                                <option value="973">巴林</option>
                                <option value="257">布隆迪</option>
                                <option value="229">贝宁</option>
                                <option value="970">巴勒斯坦</option>
                                <option value="1441">百慕大群岛</option>
                                <option value="673">文莱</option>
                                <option value="591">玻利维亚</option>
                                <option value="55">巴西</option>
                                <option value="1242">巴哈马</option>
                                <option value="267">博茨瓦纳</option>
                                <option value="375">白俄罗斯</option>
                                <option value="501">伯利兹</option>
                                <option value="1">加拿大</option>
                                <option value="1345">开曼群岛</option>
                                <option value="236">中非共和国</option>
                                <option value="242">刚果</option>
                                <option value="41">瑞士</option>
                                <option value="682">库克群岛</option>
                                <option value="56">智利</option>
                                <option value="237">喀麦隆</option>
                                <option value="57">哥伦比亚</option>
                                <option value="506">哥斯达黎加</option>
                                <option value="420">捷克</option>
                                <option value="53">古巴</option>
                                <option value="357">塞浦路斯</option>
                                <option value="420">捷克</option>
                                <option value="253">吉布提</option>
                                <option value="45">丹麦</option>
                                <option value="1890">多米尼加共和国</option>
                                <option value="213">阿尔及利亚</option>
                                <option value="593">厄瓜多尔</option>
                                <option value="372">爱沙尼亚</option>
                                <option value="20">埃及</option>
                                <option value="34">西班牙</option>
                                <option value="251">埃塞俄比亚</option>
                                <option value="358">芬兰</option>
                                <option value="679">斐济</option>
                                <option value="241">加蓬</option>
                                <option value="1809">格林纳达</option>
                                <option value="995">格鲁吉亚</option>
                                <option value="594">法属圭亚那</option>
                                <option value="233">加纳</option>
                                <option value="350">直布罗陀</option>
                                <option value="220">冈比亚</option>
                                <option value="224">几内亚</option>
                                <option value="30">希腊</option>
                                <option value="502">危地马拉</option>
                                <option value="1671">关岛</option>
                                <option value="592">圭亚那</option>
                                <option value="504">洪都拉斯</option>
                                <option value="509">海地</option>
                                <option value="36">匈牙利</option>
                                <option value="62">印度尼西亚</option>
                                <option value="353">爱尔兰</option>
                                <option value="972">以色列</option>
                                <option value="91">印度</option>
                                <option value="964">伊拉克</option>
                                <option value="98">伊朗</option>
                                <option value="354">冰岛</option>
                                <option value="225">科特迪瓦</option>
                                <option value="1876">牙买加</option>
                                <option value="962">约旦</option>
                                <option value="254">肯尼亚</option>
                                <option value="331">吉尔吉斯坦</option>
                                <option value="855">柬埔寨</option>
                                <option value="850">朝鲜</option>
                                <option value="225">科特迪瓦共和国</option>
                                <option value="965">科威特</option>
                                <option value="327">哈萨克斯坦</option>
                                <option value="856">老挝</option>
                                <option value="961">黎巴嫩</option>
                                <option value="1758">圣卢西亚</option>
                                <option value="423">列支敦士登</option>
                                <option value="94">斯里兰卡</option>
                                <option value="231">利比里亚</option>
                                <option value="266">莱索托</option>
                                <option value="370">立陶宛</option>
                                <option value="352">卢森堡</option>
                                <option value="371">拉脱维亚</option>
                                <option value="218">利比亚</option>
                                <option value="212">摩洛哥</option>
                                <option value="377">摩纳哥</option>
                                <option value="373">摩尔多瓦</option>
                                <option value="261">马达加斯加</option>
                                <option value="223">马里</option>
                                <option value="95">缅甸</option>
                                <option value="976">蒙古</option>
                                <option value="1664">蒙特塞拉特岛</option>
                                <option value="356">马耳他</option>
                                <option value="1670">马里亚那群岛</option>
                                <option value="596">马提尼克</option>
                                <option value="230">毛里求斯</option>
                                <option value="960">马尔代夫</option>
                                <option value="265">马拉维</option>
                                <option value="52">墨西哥</option>
                                <option value="60">马来西亚</option>
                                <option value="258">莫桑比克</option>
                                <option value="264">纳米比亚</option>
                                <option value="977">尼日尔</option>
                                <option value="234">尼日利亚</option>
                                <option value="505">尼加拉瓜</option>
                                <option value="31">荷兰</option>
                                <option value="47">挪威</option>
                                <option value="977">尼泊尔</option>
                                <option value="599">荷属安的列斯</option>
                                <option value="674">瑙鲁</option>
                                <option value="64">新西兰</option>
                                <option value="968">阿曼</option>
                                <option value="507">巴拿马</option>
                                <option value="51">秘鲁</option>
                                <option value="689">法属玻利尼西亚</option>
                                <option value="675">巴布亚新几内亚</option>
                                <option value="63">菲律宾</option>
                                <option value="92">巴基斯坦</option>
                                <option value="48">波兰</option>
                                <option value="1787">波多黎各</option>
                                <option value="351">葡萄牙</option>
                                <option value="595">巴拉圭</option>
                                <option value="974">卡塔尔</option>
                                <option value="262">留尼旺</option>
                                <option value="40">罗马尼亚</option>
                                <option value="966">沙特阿拉伯</option>
                                <option value="677">所罗门群岛</option>
                                <option value="248">塞舌尔</option>
                                <option value="249">苏丹</option>
                                <option value="46">瑞典</option>
                                <option value="386">斯洛文尼亚</option>
                                <option value="421">斯洛伐克</option>
                                <option value="232">塞拉利昂</option>
                                <option value="378">圣马力诺</option>
                                <option value="684">东萨摩亚(美)</option>
                                <option value="685">西萨摩亚</option>
                                <option value="221">塞内加尔</option>
                                <option value="252">索马里</option>
                                <option value="597">苏里南</option>
                                <option value="239">圣多美和普林西比</option>
                                <option value="503">萨尔瓦多</option>
                                <option value="963">叙利亚</option>
                                <option value="268">斯威士兰</option>
                                <option value="235">乍得</option>
                                <option value="228">多哥</option>
                                <option value="66">泰国</option>
                                <option value="992">塔吉克斯坦</option>
                                <option value="993">土库曼斯坦</option>
                                <option value="216">突尼斯</option>
                                <option value="676">汤加</option>
                                <option value="90">土耳其</option>
                                <option value="1809">特立尼达和多巴哥</option>
                                <option value="255">坦桑尼亚</option>
                                <option value="380">乌克兰</option>
                                <option value="256">乌干达</option>
                                <option value="598">乌拉圭</option>
                                <option value="233">乌兹别克斯坦</option>
                                <option value="1784">圣文森特岛</option>
                                <option value="58">委内瑞拉</option>
                                <option value="84">越南</option>
                                <option value="967">也门</option>
                                <option value="381">南斯拉夫</option>
                                <option value="27">南非</option>
                                <option value="260">赞比亚</option>
                                <option value="243">扎伊尔</option>
                                <option value="263">津巴布韦</option>
                            </select>

                            <input type="text" class="int">
                            <span class=""></span>
                            <a class="dia_getCode" href='#'>获取验证码</a>
                        </div>
                        <div class="item mt10">
                            <label>输入验证码：</label>
                            <input type="text" class="int">
                            <span class="error"></span>
                        </div>
                        <div class="item mt20 item_btn">
                            <a href='#'>下一步</a>
                            <a href="javascript:showDialog.hide()">取消</a>
                        </div>
                    </div>
                </div>
            </div>
            <a class="dia_close" href="javascript:showDialog.hide()" title="关闭">×</a>
        </div>
        <!-- E 弹窗1 -->
        <!-- S 弹窗2 -->
        <div class="pop_dia" id="pop_dia02" style="display:none;">
            <div class="dia_con">
                <h3 class="dia_tit">绑定手机</h3>
                <div class="dia_bd">
                    <div class="dia_success">
                        <p><span class="s"></span>恭喜你！已成功绑定手机</p>
                        <div class="success_btn"><a href="javascript:window.location.reload();">返回个人资料</a></div>
                    </div>
                </div>
            </div>
            <a class="dia_close" href="javascript:showDialog.hide()" title="关闭">×</a>
        </div>
        <!-- E 弹窗2 -->
        <!-- S 弹窗3 -->
        <div class="pop_dia" id="pop_dia03" style="display:none;">
            <div class="dia_con">
                <h3 class="dia_tit">修改绑定手机</h3>
                <div class="dia_bd">
                    <div class="dia_action">
                        <div class="item_tips">手机号码将作为你以后使用特权的重要凭证，请确保无误</div>
                        <div class="item mt20">
                            <label>当前绑定的手机是：</label>
                            <span class="dia_num"></span>
                            <a class="dia_getCode" href="javascript:changeMobile(1,{})">获取验证码</a>
                            <a class="dia_help" href="javascript:popUp(372, 294, 'http://about.58.com/');showDialog.hide();">无法验证怎么办？</a>
                        </div>
                        <div class="item item_alert">
                            <a href="javascript:void(0)" class="close">X</a>
                            <span class="s"></span>
                            <p>如原绑定手机号码已遗失或不可用，需先进行号码<a href="https://aq.qq.com/cn2/appeal/appeal_index" target="_blank">号码申诉</a>，申诉成功后致电4001508888并提供回执单给客服经理，验证通过后即可为您修改。</p>
                        </div>
                        <div class="item mt10">
                            <label>输入验证码：</label>
                            <input type="text" class="int">
                            <span class="error"></span>
                        </div>
                        <div class="item mt20 item_btn">
                            <a href='javascript:changeMobile(2,{vcode:$(".item.mt10 input").eq(1).val()})'>下一步</a>
                            <a href="javascript:showDialog.hide()">取消</a>
                        </div>
                    </div>
                </div>
            </div>
            <a class="dia_close" href="javascript:showDialog.hide()" title="关闭">×</a>
        </div>
        <!-- E 弹窗3 -->
        <!-- S 弹窗4 -->
        <div class="pop_dia" id="pop_dia04" style="display:none;">
            <div class="dia_con">
                <h3 class="dia_tit">心悦手机验证</h3>
                <div class="dia_bd">
                    <div class="dia_action">
                        <div class="item_tips">手机号码将作为你以后使用特权的重要凭证，请确保无误</div>
                        <div class="item mt20">
                            <label>当前绑定的手机是：</label>
                            <span class="dia_num"></span>
                            <a class="dia_getCode" href="javascript:changeMobile(6,{})">获取验证码</a>
                            <a class="dia_help" href="javascript:popUp(372, 294, 'http://about.58.com/');showDialog.hide();">无法验证怎么办？</a>
                        </div>
                        <div class="item item_alert">
                            <a href="javascript:void(0)" class="close">X</a>
                            <span class="s"></span>
                            <p>如原绑定手机号码已遗失或不可用，需先进行号码<a href="https://aq.qq.com/cn2/appeal/appeal_index" target="_blank">号码申诉</a>，申诉成功后致电4001508888并提供回执单给客服经理，验证通过后即可为您修改。</p>
                        </div>
                        <div class="item mt10">
                            <label>输入验证码：</label>
                            <input type="text" class="int">
                            <span class="error"></span>
                        </div>
                        <div class="item mt20 item_btn">
                            <a href='javascript:changeMobile(7,{vcode:$(".item.mt10 input").eq(2).val()})'>下一步</a>
                            <a href="javascript:showDialog.hide();comm.app.tlog(4);">取消</a>
                        </div>
                    </div>
                </div>
            </div>
            <a class="dia_close" href="javascript:showDialog.hide();comm.app.tlog(4);" title="关闭">×</a>
        </div>
        <!-- E 弹窗4 -->
        <!-- S js -->
        <script type="text/javascript" src="http://xinyue.qq.com/web201410/js/intro.min.js"></script>
        <script src="http://ossweb-img.qq.com/images/js/comm/tgadshow.min.js"></script>
        <script src="http://ossweb-img.qq.com/images/js/jquery/jquery-1.7.2.min.js"></script>
        <script src="http://xinyue.qq.com/web201410/js/common.js"></script>
        <script src="http://xinyue.qq.com/web201410/js/iframes.js"></script>
        <script src="http://ossweb-img.qq.com/images/js/milo/milo-min.js"></script>
        <script type="text/javascript" src="http://ossweb-img.qq.com/images/js/login/loginmanagerv3.js"></script>
        <script src="http://xinyue.qq.com/js/web201206/userinfo.js?version=20141022"></script>

        <script type="text/javascript" src="http://ossweb-img.qq.com/images/js/basic/fileloadmanager.js?v=20111123"></script>
        <script type="text/javascript" src="http://xinyue.qq.com/web201410/js/base.js?ver20161222"></script>
        <script type="text/javascript" src="http://ossweb-img.qq.com/images/js/comm/showDialog.min.js"></script>
        <script>
            $("#myCarousel").hover(function () {
                $(".leftbtn,.rightbtn").css("visibility", "visible");
                $("a").css("text-decoration", "none");
            }, function () {
                $(".leftbtn,.rightbtn").css("visibility", "hidden");
            });
        </script>
        <script>
            //弹出层
            function TGDialogS(e) {
                need("biz.dialog-min", function (Dialog) {
                    Dialog.show({
                        id: e,
                        bgcolor: '#000',
                        opacity: 50
                    });
                });
            }
            function closeDialog() {
                need("biz.dialog-min", function (Dialog) {
                    Dialog.hide();
                });
            }
        </script>
        <!--<a href="http://xinyue.qq.com/webplat/info/news_version3/833/2325/2327/2340/m2195/201711/660465.shtml?ADTAG=gw.jiaobiao" target="_blank" class="btn-xy5" title="腾讯·游戏家">腾讯·游戏家</a>-->

             
            function isIE() {

                var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;

                var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;

                return isIE11orLess;
            }
            function setCookie(c_name, value, expiredays) {

                var exdate = new Date()

                exdate.setDate(exdate.getDate() + expiredays)

                document.cookie = c_name + "=" + escape(value) +

                        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())

            }



            //<!--E 微官网二维码弹窗-->

        </script>

        <!-- S js -->

        <script src="http://xinyue.qq.com/web201410/js/common.js"></script>

        <script src="http://ossweb-img.qq.com/images/js/comm/tgadshow.min.js"></script>

        <script src="http://game.qq.com/time/qqadv/Info_new_11021.js"></script>
        <script src="http://game.qq.com/time/qqadv/Info_new_14401.js"></script>

        <script>

            /*---- 导航轮播 ------*/

            var navJsonfun = function () {
                var i = 0;
                $.each(oDaTaNew11021, function (k, v) {
                    i = i + 1;
                    $('.u_img_adver').append('<li style="display:none;background:url(https://aq.qq.com/cn2/login_limit/login_limit_index' + v[2] + ') center top;"><a  onclick="pgvSendClick({hottag:\'ad.11021.' + k.match(/\d+/)[0] + '.' + v[8] + '\'});" href="' + v[1] + '">&nbsp;</a></li>');
                    if (i === 1) {
                        $('.u_pointer_adver').append('<li class="cur">&nbsp;</li>');
                    } else {
                        $('.u_pointer_adver').append('<li></li>');
                    }
                });
                $('.u_img_adver > li:first').addClass('focus').show();

                $('.u_pointer_adver > li:first').addClass('cur');

            }

            navJsonfun();

            /*合作推荐轮播*/

            function _jump() {

                /*合作推荐轮播*/
                var oDaTaNew14401C = 0;
                var arry = ["../xinyuetu/yonghengji14.jpg", "../xinyuetu/yo.jpg", "../xinyuetu/u=99207154,3930443662&fm=27&gp=0.jpg", "../xinyuetu/u=862559419,3744144059&fm=27&gp=0.jpg"]
                $.each(oDaTaNew14401, function (k, arry) {

                    oDaTaNew14401C = oDaTaNew14401C + 1;
                    $('.u_img_copo').append('<li style="display:none;background:url(' + arry[2] + ') center top;"><span class="s"></span><a onclick="pgvSendClick({hottag:' + ('gw.home.mob.ad' + oDaTaNew14401C) + '});" href="' + arry[1] + '">&nbsp;</a></li>');
                    if (i === 1) {
                        $('.u_pointer_copo').append('<li class="cur">&nbsp;</li>');
                    } else {
                        $('.u_pointer_copo').append('<li></li>');
                    }
                });
                var now = 0, chart = $(".u_img_copo li"), spn = $(".u_pointer_copo li"), cls = '', thiscls = cls + ' cur', lev = 0;

                function jump() {
                    var ord = (now == -1 ? 0 : now);

                    now = ++now % spn.length;

                    spn[ord].className = cls;

                    spn[now].className = thiscls;

                    chart.eq(ord).hide();

                    chart.eq(now).show();
                }

                jump();


                var timer = setInterval(function () {

                    jump();

                }, 4000);
                for (var i = spn.length; i--;) {

                    spn[i].count = i;

                    spn.eq(i).on('mouseenter', function () {
                        clearInterval(timer);


                        var thisContID = spn[this.count];

                        spn[now].className = cls;

                        this.className = thiscls;

                        chart.siblings().hide();

                        chart.eq($(this).index()).show();

                        now = this.count;
                    });
                    spn.eq(i).on('mouseleave', function () {
                        clearInterval(timer);
                        timer = setInterval(function () {

                            jump();

                        }, 4000);
                    });
                };
            }
            _jump();

        </script>
        <!-- E js -->

        <script src="http://ossweb-img.qq.com/images/js/foot.js"></script>

        <script type="text/javascript">comm.load();</script>

        <script>

            /*---- 统计 ------*/

            var countFun = function () {

                $.getScript('http://tajs.qq.com/stats?sId=22941263', function () {

                    $.getScript('http://pingjs.qq.com/ping_tcss_ied.js', function () {

                        pgvMain();

                    });

                });

            }

            countFun();

        </script>
        <script type="text/javascript" src="http://xinyue.qq.com/web201410/js/popup.js"></script>
        <div class="pop-per" id="pop4">
        </div>

    </body>

