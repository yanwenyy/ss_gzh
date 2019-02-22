//获取地址栏参数
function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
}
//返回按钮点击
$(".back").click(function(){
    window.history.go(-1);
});
//轮播图
var mySwiper2 = new Swiper('.s2', {
        autoplay:3000,//可选选项，自动滑动
        //autoHeight: true,
        speed: 2000,
        roundLengths: true,
        // pagination: '.swiper-pagination',
        type: 'bullets',
        paginationClickable: true,
        loop: true, //循环播放
        //touchRatio:1,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true ,//修改swiper的父元素时，自动初始化swiper
        autoplayStopOnLast:false,
        // nextButton: '.swiper-button-next2',
        // prevButton: '.swiper-button-prev2',
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
$("body").on("click",".csq-search-btn2",function(){
        window.location.href="../html/csq-list-search.html"
    });
//所有私密问按钮点击
$(".smw_btn_all").click(function(){
        alert("请下载航信办税宝app进行私密问答操作");
    });
//用户头像点击
$("body").on("click",".look-hp-image",function(){
        var role=$(this).attr("data-role"),phone=$(this).attr("data-phone");
        if(role==2){
            window.location.href="expert-home-page.html?phone="+phone;
        }
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
                if(scroll_status==true){
                    $(".msg-loading").show();
                    num+=1;
                    count_start=((num-1)*10)+1;
                    count_end=num*10;
                    data.sinceId=count_start;
                    data.maxId=count_end;
                    ajax(url_name,data,succ);
                }
                // console.log(scroll_status);
                // $(".msg-loading").hide();
            }else if(scrollTop<=0){
                //滚动条到达顶部
                // alert(4)
                //滚动条距离顶部的高度小于等于0

            }
        });
}
//用户等级
function get_score(data,aision,vip){
    var score_img;
    if(aision==0){
        if(vip==0){
            score_img="../img/hangxin_vip.png"
        }else{
            score_img="../img/hangxin_vip_dateout.png"
        }
    }else if(aision==2){
        score_img="../img/gshy.png"
        // if(vip==0){
        //     score_img="../img/gshy.png"
        // }else{
        //     score_img="../img/gshy-dateout.png"
        // }
    }else{
        if(0<=data&&data<6){
            score_img="../img/icon-onlooked-member.png"
        }else if(6<=data&&data<20){
            score_img="../img/icon-onlooked-copper member.png"
        }else if(20<=data&&data<50){
            score_img="../img/icon-onlooked-silver member.png"
        }else if(50<=data&&data<100){
            score_img="../img/icon-onlooked-gold member.png"
        }else if(100<=data&&data<500){
            score_img="../img/icon-onlooked-platinum-member.png"
        }else if(500<=data){
            score_img="../img/icon-onlooked-diamonds member.png"
        }
    }
    return score_img;
}
//返回登录
function back_login(data){
    if(data.code==2){
        window.location.href="../html/register-next.html"
    }
}
//图片预览
$("body").on("click",".img_look",function(){
    // $(".img_privew").show();
    // $(".weui-gallery__img").attr("src",$(this).attr("src"));
    var that=$(this),index_img;
    var items=[];
    var img=$(".img_look");
    $(".img_look").each(function(index){
        items.push($(this).attr("src"));
        if(that.attr("src")==$(this).attr("src")){
            index_img=index;
        }
    });
    var pb1 = $.photoBrowser({
        items: items,
        initIndex:index_img
    });
    pb1.open();
});
//用户名显示
function get_name(val){
    var realName='';
    if(val.isAnon==0){
        realName="匿名用户"
    }else{
        if(val.role==2){
            realName=val.userName;
        }else{
            realName=val.realName||"匿名用户";
        }
    }
    return realName;
}
//删除数组内某项的构造函数
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//友盟埋点统计
$("body").on("click",".ymmd-click",function(){
    var md_msg=$(this).attr("data-md-name");
    _czc.push(["_trackEvent",md_msg,"点击"]);
});
//新用户引导下载
$(".down-app-model").click(function(){
    $(".down-app-model").hide();
});
$(".new-user-down-app").click(function(){
   window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jieshuibao.jsb";
});

//页面加载后获取code
var code=getUrlParms("code");
var cookieId;
if(code!=null){
    sessionStorage.setItem("code",code);
    $.ajax({
        type:"POST",
        url:http_url.url+'/wx/getOpenid/'+code,
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8"
        },
        success:function(data){
            cookieId=data.data;
            sessionStorage.setItem("cookieId",cookieId);
        },
        error:function(){
            alert("程序出错,请重试");
        }
    });
}else{
    var cookieId="oPUdI0pZbHIYBCHUn_aQPCJAmRIU"; //晏雯
    sessionStorage.setItem("cookieId",cookieId);
}
