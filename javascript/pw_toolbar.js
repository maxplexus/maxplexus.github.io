/**
 * Created with IntelliJ IDEA.
 * User: moo
 * Date: 14-6-3
 * Time: 下午6:29
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var JT = {
        $:function (id) {
            return document.getElementById(id);
        },
        addEvent:function (obj, eventType, func) {
            if (obj.attachEvent) {
                obj.attachEvent("on" + eventType, func);
            } else {
                obj.addEventListener(eventType, func, false)
            }
        },
        delNode:function (node) {
            node.parentNode.removeChild(node);
        },
        hasClass:function (ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass:function (ele, cls) {
            if (!this.hasClass(ele, cls)) {
                ele.className += " " + cls;
            }
        },
        removeClass:function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        },
        /*获取当前语言*/
        getTWLanguage : function(){
            return (window.navigator.language === "zh-CN" || window.navigator.language === "zh-cn") ? "cn" : "en";
        },
        getBrowser:function () {
            var browerInfo = navigator.userAgent.toLowerCase();
            var btypeInfo = (browerInfo.match(/msie|trident|firefox|chrome|safari|opera/g) || "other")[0];
            btypeInfo = (btypeInfo == "trident")?"msie":btypeInfo;
            var pc = "";
            var prefix = "";
            var plat = "";
            var supportCSSMatrixes = false;
            //如果没有触摸事件 判定为PC
            var isTocuh = ("msPointerEnabled" in window) || ("ontouchstart" in window) || browerInfo.indexOf("touch") >= 0;
            if (isTocuh) {
                if (browerInfo.indexOf("ipad") >= 0) {
                    pc = "pad";
                } else if (browerInfo.indexOf("mobile") >= 0) {
                    pc = "mobile";
                } else if (browerInfo.indexOf("android") >= 0) {
                    pc = "androidPad";
                } else {
                    pc = "pc";
                }
            } else {
                pc = "pc";
            }
            switch (btypeInfo) {
                case "chrome":
                case "safari":
                case "mobile":
                    prefix = "webkit";
                    supportCSSMatrixes = (('WebKitCSSMatrix') in window);
                    break;
                case "msie":
                case "trident":
                    prefix = "MS";
                    supportCSSMatrixes = (('MSCSSMatrix') in window);
                    break;
                case "firefox":
                    prefix = "Moz";
                    supportCSSMatrixes = (('MozCSSMatrix') in window);
                    break;
                case "opera":
                    prefix = "O";
                    supportCSSMatrixes = (('OCSSMatrix') in window);
                    break;
                default:
                    prefix = "webkit";
                    supportCSSMatrixes = false;
                    break
            }
            plat = (browerInfo.indexOf("android") > 0) ? "android" : navigator.platform.toLowerCase();
            return {
                version:(browerInfo.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
                plat:plat,
                type:btypeInfo,
                pc:pc,
                prefix:prefix,
                CSSMatrix:supportCSSMatrixes
            }

        }
    };
    var browserLg = JT.getTWLanguage();
    var languageTip = {
        left: {en:"Left",cn:" 向左"},
        right:{en:"Right",cn:" 向右"},
        up:  {en:"Up",cn:" 向上"},
        down:{en:"Down",cn:" 向下"},
        gyro:{en:"Gyro",cn:" 陀螺仪"},
        zoomIn:{en:"ZoomIn",cn:" 放大"},
        zoomOut:{en:"ZoomIn",cn:" 缩小"},
        reset:{en:"Reset",cn:" 重置"},
        direction:{en:"ChangerDirection",cn:" 改变方向"},
        hide:{en:"Hide",cn:" 隐藏"}
    }
    var pcStyleDom = '<div class="DivToolBar">' +
            '<div class="DivToolBarTipCon">' +
            '<div id="DivToolBarTip" class="DivToolBarTip"></div>' +
            '</div>' +
            '<div id="DivToolBarCon" class="DivToolBarCon ani">' +
            '<div class="leftPW"    tipText = "'+languageTip['left'][browserLg]+'"           actionName="left"></div>' +
            '<div class="rightPW"   tipText = "'+languageTip['right'][browserLg]+'"          actionName="right"></div>' +
            '<div class="upPW"      tipText = "'+languageTip['up'][browserLg]+'"             actionName="up"></div>' +
            '<div class="downPW"    tipText = "'+languageTip['down'][browserLg]+'"           actionName="down"></div>' +
            '<div class="gyroPW"    tipText = "'+languageTip['gyro'][browserLg]+'"           actionName="toggleGyro"></div> ' +
            '<div class="zoominPW"  tipText = "'+languageTip['zoomIn'][browserLg]+'"         actionName="zoomIn"></div>' +
            '<div class="zoomoutPW" tipText = "'+languageTip['zoomOut'][browserLg]+'"        actionName="zoomOut"></div>' +
            '<div class="resetPW"   tipText = "'+languageTip['reset'][browserLg]+'"          actionName="reset"></div>' +
            '<div id="pwDirectionId" class="directionPW" tipText = "'+languageTip['direction'][browserLg]+'" actionName="toggleDragDirection"></div>' +
            '<div class="hidePW"      tipText = "'+languageTip['hide'][browserLg]+'" id="DivHide"></div>' +
            '</div>' +
            '<div class="DivToolBarHandlerCon">' +
            '<div id="DivToolBarHandler" class="DivToolBarHandler ani"></div>' +
            '</div>' +
            '</div>';

    var mobileStyleDom = '<div class="DivToolBarMobile">' +
            '<div id="DivToolBarConMobile" class="DivToolBarConMobile ani">' +
            '<div class="gyroMobilePW"      tipText = "'+languageTip['gyro'][browserLg]+'"           actionName="toggleGyro"></div>' +
            '<div id="pwDirectionId" class="directionMobilePW" tipText = "'+languageTip['direction'][browserLg]+'" actionName="toggleDragDirection"></div>' +
            '<div class="resetMobilePW"     tipText = "'+languageTip['reset'][browserLg]+'"          actionName="reset"></div>' +
            '<div class="hideMobilePW"      tipText = "'+languageTip['hide'][browserLg]+'" id="DivHideMobile"></div>' +
            '</div>' +
            '<div class="DivToolBarHandlerCon">' +
            '<div id="DivToolBarHandlerMobile" class="DivToolBarHandlerMobile ani"></div>' +
            '</div>' +
            '</div>';


    window.TWToolbarClass = function(options){
        this.container = options.container || document.body;
        this.browser = JT.getBrowser();
        this.target = document.createElement("div");
        this.className = "containerBar";
        this.innerHtml = pcStyleDom;
        if(this.browser.pc == "pc"){
            this.className = "containerBar";
            this.innerHtml =  pcStyleDom;
        }
        else{
            this.className = "containerBarMobile";
            this.innerHtml =  mobileStyleDom;
        }
        JT.addClass(this.target,this.className);
        this.target.innerHTML = this.innerHtml;
        //将targe 添加到容器中
        this.container.appendChild(this.target);

        if(this.browser.pc == "pc"){
            //提示切换事件
            var toolBarCon = JT.$("DivToolBarCon"),
                tipDom = JT.$("DivToolBarTip"),
                hideDom = JT.$("DivHide"),
                showDom = JT.$("DivToolBarHandler");
            if(TWSceneObj){
                var fTarget = JT.$("pwDirectionId");
                !TWSceneObj.dragDirectionMode && (fTarget.className = "directionOnPW");
                TWSceneObj.dragDirectionMode && (fTarget.className = "directionPW");
            }
            JT.addEvent(toolBarCon, "mouseover", function (e) {
                var target = e.target || e.srcElement;
                var text = target.getAttribute("tipText") || "";
                tipDom.innerHTML = text;
            });
            JT.addEvent(toolBarCon, "click", function (e) {
                var target = e.target || e.srcElement;
                var actionName = target.getAttribute("actionName") || "";
                if (TWActions && TWActions[actionName]) {
                    var result = TWActions[actionName]();
                    if (actionName == "toggleDragDirection") {
                        !result && (target.className = "directionOnPW");
                        result && (target.className = "directionPW");
                    } else if (actionName == "toggleGyro") {
                        result && (target.className = "gyroOnPW");
                        !result && (target.className = "gyroPW");
                    }
                }

            });
            JT.addEvent(hideDom, "click", function (e) {
                toolBarCon.style.top = "111px";
                showDom.style.top = "-26px";
                tipDom.innerHTML = "";
            });
            JT.addEvent(showDom, "click", function (e) {
                toolBarCon.style.top = "0px";
                showDom.style.top = "0px";
            });
        }
        else{
            if(TWSceneObj){
                var fTarget = JT.$("pwDirectionId");
                !TWSceneObj.dragDirectionMode && (fTarget.className = "directionOnMobilePW");
                TWSceneObj.dragDirectionMode && (fTarget.className = "directionMobilePW");
            }
            //移动设备事件
            var toolBarConM = JT.$("DivToolBarConMobile"),hideDomM = JT.$("DivHideMobile"),showDomM = JT.$("DivToolBarHandlerMobile");
            JT.addEvent(toolBarConM, "touchend", function (e) {
                var target = e.target || e.srcElement;
                var actionName = target.getAttribute("actionName") || "";
                if (TWActions && TWActions[actionName]) {
                    var result = TWActions[actionName]();
                    if (actionName == "toggleDragDirection") {
                        !result && (target.className = "directionOnMobilePW");
                        result && (target.className = "directionMobilePW");
                    } else if (actionName == "toggleGyro") {
                        result && (target.className = "gyroOnMobilePW");
                        !result && (target.className = "gyroMobilePW");
                    }
                }
            });
            JT.addEvent(hideDomM, "touchend", function (e) {
                toolBarConM.style.top = "64px";
                showDomM.style.top = "-28px";
            });
            JT.addEvent(showDomM, "touchend", function (e) {
                toolBarConM.style.top = "0px";
                showDomM.style.top = "0px";
            });
        }
    };
})();