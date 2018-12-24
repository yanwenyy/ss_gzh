
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    var flag = IsPC(); //true为PC端，false为手机端;
    if(flag==true){
        !(function(doc, win) {
            var docEle = doc.documentElement;//获取html元素
            docEle.style.fontSize = '16px';

        }(document, window));
    }else{
        !(function(doc, win) {
            var docEle = doc.documentElement, //获取html元素
                event = "onorientationchange" in window ? "orientationchange" : "resize", //判断是屏幕旋转还是resize;
                fn = function() {
                    var width = docEle.clientWidth;
                    width && (docEle.style.fontSize = 10 * (width / 750) + "px"); //设置html的fontSize，随着event的改变而改变。
                    // alert(docEle.style.fontSize)
                };

            win.addEventListener(event, fn, false);
            doc.addEventListener("DOMContentLoaded", fn, false);

        }(document, window));
    }

