function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
}
    // var cookieId="oPUdI0iHO5g5M0JkhgwexPAMmE_I";
    // sessionStorage.setItem("cookieId",cookieId);
    // function getUrlParms(name){
    //     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //     var r = window.location.search.substr(1).match(reg);
    //     if(r!=null)
    //         return unescape(r[2]);
    //     return null;
    // }
    // var icode = getUrlParms("icode");
    // var code=getUrlParms("code");
    // var cookieId;
    // $.ajax({
    //     type:"POST",
    //     url:http_url.url+'/wx/getOpenid/'+code,
    //     dataType: "json",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json;charset=utf-8"
    //     },
    //     success:function(data){
    //         cookieId=data.data;
    //         ajax(http_url.url+'/rotation/display',{'cookieId':+cookieId},get_lunbo);
    //     },
    //     error:function(){
    //         alert("程序出错,请重试");
    //     }
    // });
    // if(icode==""||icode==undefined||icode==null){
    //     $(".index-class-list>div").removeClass("weui-tab__bd-item--active");
    //     $(".index-class-list>div[data-code=1]").addClass("weui-tab__bd-item--active");
    //     $(".index-tab-a>a").removeClass("weui-bar__item--on");
    //     $(".index-tab-a>a[data-code=1]").addClass("weui-bar__item--on");
    //     var act= $(".index-tab-a>a[data-code=1]").children(".weui-tabbar__icon").children("img").attr("data-act");
    //     $(".index-tab-a>a[data-code=1]").children(".weui-tabbar__icon").children("img").attr("src",act);
    //     //ajax_nodata(http_url.url+'/rotation/display',get_lunbo);
    // }else{
    //     $(".index-class-list>div").removeClass("weui-tab__bd-item--active");
    //     $(".index-class-list>div[data-code="+icode+"]").addClass("weui-tab__bd-item--active");
    //     $(".index-tab-a>a").removeClass("weui-bar__item--on");
    //     $(".index-tab-a>a[data-code="+icode+"]").addClass("weui-bar__item--on");
    //     var act=  $(".index-tab-a>a[data-code="+icode+"]").children(".weui-tabbar__icon").children("img").attr("data-act");
    //     $(".index-tab-a>a[data-code=1]").children(".weui-tabbar__icon").children("img").attr("src",$(".index-tab-a>a[data-code=1]").children(".weui-tabbar__icon").children("img").attr("data-src"));
    //     $(".index-tab-a>a[data-code="+icode+"]").children(".weui-tabbar__icon").children("img").attr("src",act);
    //     if(icode==1){
    //         ajax_nodata(http_url.url+'/rotation/display',get_lunbo);
    //     }else if(icode==2){
    //         ajax_nodata(http_url.url+'/article/category',get_article);
    //     }else if(icode==3){
    //
    //     }else{
    //
    //     }
    // }
    //返回按钮点击
    $(".back").click(function(){
        window.history.go(-1);
    });
    // //底部tab栏
    // $(".weui-tabbar__item").each(function(){
    //     if($(this).hasClass(".weui-bar__item--on")){
    //         var act=$(this).children(".weui-tabbar__icon").children("img").attr("data-act");
    //         $(this).children(".weui-tabbar__icon").children("img").attr("src",act);
    //     }
    // });
    // $(".weui-tabbar__item").click(function(){
    //     $(window).scrollTop(0);
    //     $(".weui-tabbar__item").each(function(){
    //         var src=$(this).children(".weui-tabbar__icon").children("img").attr("data-src");
    //         $(this).children(".weui-tabbar__icon").children("img").attr("src",src);
    //     });
    //     var that=$(this);
    //     var act=that.children(".weui-tabbar__icon").children("img").attr("data-act");
    //     that.children(".weui-tabbar__icon").children("img").attr("src",act);
    //     if(that.attr("data-code")==1){
    //
    //     }else if(that.attr("data-code")==2){
    //         ajax_nodata(http_url.url+'/article/category',get_article);
    //     }else if(that.attr("data-code")==3){
    //
    //     }else{
    //
    //     }
    // });
    //免费问
    $(".mfw").click(function(){
        window.location.href="../html/free-question.html";
    });
    //快速答
    $(".kud").click(function(){
        window.location.href="../html/quick-answer.html";
    });
    //围观搜索
    $(".zrwg-sear").click(function(){
        window.location.href="../html/watch-search.html"
    });
    //大咖访谈
    $(".dkft-more").click(function(){
        window.location.href="../html/cafe-interview.html"
    });
    //专家推荐
    $(".zjtj-more").click(function(){
        window.location.href="../html/expert.html"
    });
    //财税圈搜索按钮点击
    $("body").on("click",".csq-search-btn",function(){
        window.location.href="../html/csq-list-search.html"
    });
    //我的会员等级
    $("body").on("click",".mine-hydj",function(){
        window.location.href="../html/mine-membership-grade.html"
    });
    //编辑个人信息
    $(".mine-msg-edit").click(function(){
        window.location.href="../html/mine-personal-data.html"
    });

//时间转换
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo) {
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
//下拉刷新
//下拉刷新
function reload_msg(ele,url_name,data,succ){
    ele.pullToRefresh({
        onRefresh: function () { /* 当下拉刷新触发的时候执行的回调 */
            //alert(111);
            $(".weui-pull-to-refresh__arrow").addClass("out");
            $(".weui-pull-to-refresh__preloader").addClass("on");
            $(".up").removeClass("on");
            $(".refresh").addClass("on");
            setTimeout(function(){
                ajax(url_name,data,succ);
               ele.pullToRefreshDone().removeClass("mine-attention-pull");
                $(".weui-pull-to-refresh__layer").hide();
                $(".down").removeClass("out");
                $(".weui-pull-to-refresh__arrow").removeClass("out").addClass("on");
                $(".weui-pull-to-refresh__preloader").removeClass("out").removeClass("on");
                $(".refresh").removeClass("out").removeClass("on");
            },2000)
        },
        onPull: function (percent) { /* 用户下拉过程中会触发，接收一个百分比表示用户下拉的比例 */
            //console.log(percent);
            if(percent>10){
                ele.addClass("mine-attention-pull");
                $(".weui-pull-to-refresh__layer").show();
            }
            if(percent>88){
                $(".down").addClass("out");
                $(".up").removeClass("out").addClass("on");
            }
        },
        distance: 10 /* 下拉刷新的触发距离， 注意，如果你重新定义了这个值，那么你需要重载一部分CSS才可以，请参考下面的自定义样式部分 */
    });
}
//滚动加载
function scroll_more(url_name,data,succ){
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
        var scrollHeight = $(document).height();   //当前页面的总高度
        var clientHeight = $(this).height();    //当前可视的页面高度
        //console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
        if(scrollTop + clientHeight >= scrollHeight-1){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
            //滚动条到达底部
            //alert(3);
            num+=1;
            count_start=((num-1)*10)+1;
            count_end=num*10;
            data.sinceId=count_start;
            data.maxId=count_end;
            ajax(url_name,data,succ);
        }else if(scrollTop<=0){
            //滚动条到达顶部
            // alert(4)
            //滚动条距离顶部的高度小于等于0

        }
    });
}
//返回登录
function back_login(data){
    if(data.code==2){
        window.location.href="../html/register-next.html"
    }
}


