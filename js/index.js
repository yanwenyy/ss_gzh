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
        alert("请下载刷刷app进行私密问答操作");
    });
//用户头像点击
$("body").on("click",".look-hp-image",function(){
        var role=$(this).attr("data-role"),phone=$(this).attr("data-phone");
        if(role==3){
            window.location.href="personal-official.html?phone="+phone;
        }else{
            window.location.href="personal-new.html?phone="+phone;
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
//视频头条时间显示
function timeago(dateTimeStamp){
    // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var minute=1000*60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var  hour=minute*60;
    var day=hour*24;
    var week=day*7;
    var halfamonth=day*15;
    var month=day*30;
    var result='';
    var  now=new Date().getTime();   //获取当前时间毫秒
    var diffValue=now - dateTimeStamp;//时间差
    if(diffValue<0){return;}

    var  minC=diffValue / minute;  //计算时间差的分，时，天，周，月
    var  hourC=diffValue / hour;
    var  dayC=diffValue / day;
    var  weekC=diffValue / week;
    var  monthC=diffValue / month;
    var time = new Date(dateTimeStamp);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    if(monthC>=12){
        result=y+'-'+add0(m)+'-'+add0(d);
    }
    // if(monthC>=1){
    //     result="" + parseInt(monthC) + "月前";
    // }
    // else if(weekC>=1){
    //     result="" + parseInt(weekC) + "周前";
    // }
    else if(dayC>=1){
        // result=""+ parseInt(dayC) +"天前";
        result=add0(m)+'-'+add0(d);
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
        result="刚刚";
    return result;
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
    $(window).off("scroll").on("scroll",function(){
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
                    for(var i in data){
                        if(typeof(data[i])=="string"&&data[i].indexOf("&&")!=-1){
                            var new_data=data[i].split("&&");
                            data[i]=$(new_data[0]).attr(new_data[1]);
                        }
                    }
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
    //data=integralScore 分数
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
            score_img="../img/icon-pthy.png"
        }else if(6<=data&&data<20){
            score_img="../img/icon-tphy.png"
        }else if(20<=data&&data<50){
            score_img="../img/icon-yphy.png"
        }else if(50<=data&&data<100){
            score_img="../img/icon-jphy.png"
        }else if(100<=data&&data<500){
            score_img="../img/icon-bjhy.png"
        }else if(500<=data){
            score_img="../img/icon-zshy.png"
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
//行业,税种,专题
function get_category(data,key){
    var categorys='';
    for(var i=0;i<data.length;i++){
        if(data[i].name==key){
            categorys=data[i].children;
        }
    }
    return categorys;
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
//用户头像
function headimage(val){
    var src='';
    if(val&&val!=''&&val.indexOf("http")!=-1){
        src=val;
    }else if(val&&val!=null){
        src=head_src+val
    }
    return src;
}
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

//动态加载js文件
function loadScripts(url) {
   if(Array.isArray(url)||Object.prototype.toString.call(url) === "[object Array]"){
        var scripts='',
            i=0,
            len=url.length;
        for(;i<len;i++){
            var script="&lt;script src="+url[i]+">&lt;/script>";
                script=script.replace(/&lt;/g,'<');
            scripts+=script;
        }
       console.log(scripts);
        $("body").append(scripts);

   }else{
       console.log("动态加载js文件传入的参数必须是数组");
   }
}

//多个关键词变红
function keyWordRed(val,arr){
  if(Array.isArray(arr)||Object.prototype.toString.call(arr) === "[object Array]"){
      for(var i=0,len=arr.length;i<len;i++){
          var change_v=arr[i];
          val=val.replace(new RegExp(change_v, 'g'),"<span class='red'>$&</span>");
      }
  }
  return val;
}

