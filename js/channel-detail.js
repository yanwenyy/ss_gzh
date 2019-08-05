$(function(){
    var classifyId=getUrlParms("classifyId"),vid=getUrlParms("vid"),userid=getUrlParms("userid"),vip=getUrlParms("vip");
    $(".sub_commit").attr("data-commitId",vid);
    $(".back-channel").click(function(){
        var playTime=document.querySelector('video')?document.querySelector('video').currentTime*1000:0;
        if(playTime>1000){
            ajax(http_url.url+"/classifyvideo/videowatchnum",{
                "playTime": playTime,
                "vid": vid
            },function(data){
                console.log(data);
                window.location.href="channel.html?classifyId="+classifyId;
            })
        }else{
            window.location.href="channel.html?classifyId="+classifyId;
        }
    });
    ajax_nodata(http_url.url+"/user/message",function(data1){
        sessionStorage.setItem("userid",data1.phoneNumber);
    });
    //详情信息
    ajax(http_url.url+"/classifyvideo/videodetails",{
        "classifyId": classifyId,
        "vid":vid
        },function(data){
        if(data.code==1){
            // console.log(data);
            var msg=data.data;
            $(".channel-zan").attr("data-id",vid);
            $(".channel-sc").attr("data-id",vid);
            $(".channel-zan-num").html(msg.praise_num!==null&&parseFloat(msg.praise_num)<1000?msg.praise_num:"999+");
            if(msg.ifPraise>0){
                $(".channel-zan").attr("src",'../img/channel-c-zan.png');
            }
            if(msg.ifStore==0){
                $(".channel-sc").attr("src",'../img/channel-sc.png');
            }
            if(msg.ifAttention==0||msg.ifAttention==2){
                $(".attention-author").hide()
            }else if(msg.ifAttention==1){
                $(".attention-author").html("+ 关注")
            }
            var v_html="&lt;script async src='https://p.bokecc.com/player?vid="+msg.cc_id+"&siteid=A0123BC413D6FBAE&autoStart=false&width=100%&height=100%&playerid=7E2195B034B0277B&playertype=1'>&lt;/script>";
            v_html=v_html.replace(/&lt;/g,'<');
            $(".channel-d-video").html(v_html);
            $(".channel-d-author-title").html(msg.title);
            $(".channel-teacher").html(get_name(msg));
            $(".channel-d-author-msg>img").attr("src",headimage(msg.headImage)).attr("data-phone",msg.userId);
            $(".attention-author").attr("data-phone",msg.userId);
            $(".channel-course").html(msg.introduction);
            $(".channel-d-comment-num").html(msg.discuss_num);
        }else{
            alert(data.des);
        }
    });
    //相关推荐
    ajax(http_url.url+"/classifyvideo/videokeywords",{
        "classifyId": classifyId,
        "maxId": 10,
        "sinceId": 1,
        "vid": vid
    },function(data){
        // console.log(data);
        var html='';
        if(data.data&&data.data!=''&&data.data.length>3){
            $(".tj-more").removeClass("out");
            for(var i=0;i<data.data.length;i++){
                html+=`<div data-charge="${data.data[i].charge}" class="channel-relevant-list" data-classid="${data.data[i].classify_id}" data-vid="${data.data[i].id}" data-uid="${data.data[i].userId}">
                        <img src="${cover_src+data.data[i].cover}" alt="">
                        <div class="inline-block channel-relevant-list-msg">
                            <div>${data.data[i].title}</div>
                            <div>${get_name(data.data[i])}</div>
                            <div class="orange ${data.data[i].charge==0||vip!=''?'out':''}"">频道会员免费</div>
                        </div>
                    </div>`
            }
            $(".channel-relevant").html(html);
        }else{
            $(".tj-channel-detail").hide();
        }
    });
    //相关推荐频道列表点击
    $("body").on("click",".channel-relevant-list",function(){
        var charge=$(this).attr("data-charge");
        if(charge==0||vip=="yes"){
            window.location.href="channel-detail.html?classifyId="+$(this).attr("data-classid")+"&vid="+$(this).attr("data-vid")+"&userid="+$(this).attr("data-userid")+'&vip='+vip;
        }else{
            if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                window.location.href="channel-vip-card.html?id="+$(this).attr("data-classid");
            }
        }
    });
    //评论列表
    ajax(http_url.url+"/discuss/discusslist",{
        "maxId": count_end,
        "sinceId":count_start,
        "type": "4",
        "uuid": vid
    },function(data){
        console.log(data);
        var html='';
        if(data.data&&data.data!=''){
            for(var i=0;i<data.data.length;i++){
                var reply=[],reply_html='';
                if(data.data[i].childrens!=[]){
                    reply=data.data[i].childrens;
                    for(var r=0;r<reply.length;r++){
                        reply_html+=`<div class="channel-d-c-reply-list box-sizing">
                                            <img data-phone="${reply[r].userUuid}"  src="${headimage(reply[r].headImage)}" class="look-hp-image" alt="" onerror=src="../img/user.png">
                                            <div class="inline-block" style="width:79%">
                                                <div>
                                                    <div class="channel-d-c-name">
                                                        <span class="inline-block">
                                                            ${get_name(reply[r])}
                                                            <!--span class="orange ${reply[r].author==0?'':'out'}">·作者</span-->
                                                            <span class="${reply[r].reply==0?'':'out'}"><span style="color:#333">回复</span> ${get_rname(reply[r])}
                                                            <!--span class="orange ${reply[r].pUserId==userid?'':'out'}">·作者</span-->
                                                            </span>
                                                        </span>
                                                        <span class="liline-block">
                                                            <img src="${reply[r].praiseNum==0?'../img/channel-zan-no.png':'../img/channel-zan.png'}"  data-id="${reply[r].uuid}" class="zan-comment" alt="">
                                                            <span>${reply[r].sumPraisNum}</span>
                                                        </span>
                                                    </div>
                                                    <div class="channel-d-c-content" data-name="${get_name(reply[r])}" data-status="2" data-id="${reply[r].uuid}">${reply[r].content}</div>
                                                    <div class="channel-d-c-date">
                                                        ${format2(reply[r].date)}
                                                        <span data-id="${reply[r].uuid}" class="del-channel-comment ${sessionStorage.getItem("userid")==reply[r].userUuid?'':'out'}">·删除</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                    }
                }
                html+=`
                <div class="channel-d-c-list">
                    <img src="${headimage(data.data[i].headImage)}" data-phone="${data.data[i].userUuid}" class="look-hp-image" alt="" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div>
                            <div class="channel-d-c-name">
                                <span class="inline-block blue">${get_name(data.data[i])} 
                                <!--span class="orange ${data.data[i].author==0?'':'out'}">·作者</span-->
                                </span>
                                <span class="liline-block">
                                <img src="${data.data[i].praiseNum==0?'../img/channel-zan-no.png':'../img/channel-zan.png'}" data-id="${data.data[i].uuid}" class="zan-comment" alt="">
                                <span>${data.data[i].sumPraisNum}</span>
                            </span>
                            </div>
                            <div class="channel-d-c-content ${data.data[i].content=='该评论已被删除'?'orange':''}" data-name="${get_name(data.data[i])}" data-status="2"  data-id="${data.data[i].uuid}">${data.data[i].content}</div>
                           <div class="channel-d-c-date">${format2(data.data[i].date)}  
                                <span data-id="${data.data[i].uuid}" class="del-channel-comment ${sessionStorage.getItem("userid")==data.data[i].userUuid?'':'out'}">·删除</span>
                               
                           </div>
                        </div>
                        <div class="channel-d-c-reply box-sizing ${reply!=''?'':'out'}">
                            <div class="channel-d-c-reply-body">
                                ${reply_html}
                            </div>
                            <div class="blue more-reply ${data.data[i].childrens.length>1?'':'out'}" data-num="${data.data[i].childrens.length-1}">更多回复(${data.data[i].childrens.length-1})</div>
                        </div>
                    </div>
                </div>
            `
            }
            $(".channel-detail-commit").html(html);
        }
    });
    scroll_more(http_url.url+"/discuss/discusslist",{
        "maxId": count_end,
        "sinceId":count_start,
        "type": "4",
        "uuid": vid
    },function(data){
        var html='';
        if(data.data!=''){
            for(var i=0;i<data.data.length;i++){
                var reply=[],reply_html='';
                if(data.data[i].childrens!=[]){
                    reply=data.data[i].childrens;
                    for(var r=0;r<reply.length;r++){
                        reply_html+=`<div class="channel-d-c-reply-list box-sizing">
                                            <img data-phone="${reply[r].userUuid}"  src="${headimage(reply[r].headImage)}" class="look-hp-image" alt="" onerror=src="../img/user.png">
                                            <div class="inline-block" style="width:79%">
                                                <div>
                                                    <div class="channel-d-c-name">
                                                        <span class="inline-block">
                                                            ${get_name(reply[r])}
                                                            <!--span class="orange ${reply[r].author==0?'':'out'}">·作者</span-->
                                                            <span class="${reply[r].reply==0?'':'out'}"><span style="color:#333">回复</span> ${get_rname(reply[r])}
                                                            <!--span class="orange ${reply[r].pUserId==userid?'':'out'}">·作者</span></span-->
                                                        </span>
                                                        <span class="liline-block">
                                                            <img src="${reply[r].praiseNum==0?'../img/channel-zan-no.png':'../img/channel-zan.png'}"  data-id="${reply[r].uuid}" class="zan-comment" alt="">
                                                            <span>${reply[r].sumPraisNum}</span>
                                                        </span>
                                                    </div>
                                                    <div class="channel-d-c-content" data-name="${get_name(reply[r])}" data-status="2" data-id="${reply[r].uuid}">${reply[r].content}</div>
                                                    <div class="channel-d-c-date">
                                                        ${format2(reply[r].date)}
                                                        <span data-id="${reply[r].uuid}" class="del-channel-comment ${sessionStorage.getItem("userid")==reply[r].userUuid?'':'out'}">·删除</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                    }
                }
                html+=`
                <div class="channel-d-c-list">
                    <img src="${headimage(data.data[i].headImage)}" data-phone="${data.data[i].userUuid}" class="look-hp-image" alt="" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div>
                            <div class="channel-d-c-name">
                                <span class="inline-block blue">${get_name(data.data[i])} 
                                <!--span class="orange ${data.data[i].author==0?'':'out'}">·作者</span-->
                                </span>
                                <span class="liline-block">
                                <img src="${data.data[i].praiseNum==0?'../img/channel-zan-no.png':'../img/channel-zan.png'}" data-id="${data.data[i].uuid}" class="zan-comment" alt="">
                                <span>${data.data[i].sumPraisNum}</span>
                            </span>
                            </div>
                            <div class="channel-d-c-content ${data.data[i].content=='该评论已被删除'?'orange':''}" data-name="${get_name(data.data[i])}" data-status="2"  data-id="${data.data[i].uuid}">${data.data[i].content}</div>
                            <div class="channel-d-c-date">${format2(data.data[i].date)}  
                                <span data-id="${data.data[i].uuid}" class="del-channel-comment ${sessionStorage.getItem("userid")==data.data[i].userUuid?'':'out'}">·删除</span>
                               
                            </div>
                        </div>
                        <div class="channel-d-c-reply box-sizing ${reply!=''?'':'out'}">
                            <div class="channel-d-c-reply-body">
                                ${reply_html}
                            </div>
                            <div class="blue more-reply ${data.data[i].childrens.length>1?'':'out'}" data-num="${data.data[i].childrens.length-1}">更多回复(${data.data[i].childrens.length-1})</div>
                        </div>
                    </div>
                </div>
            `
            }
            $(".channel-detail-commit").append(html);
        }else{
            scroll_status=false;
        }
    });
    //提交评论
    $(".sub_commit").on('keypress',function(e) {
        var keycode = e.keyCode;
        var val = $(this).val();
        if(keycode=='13') {
            e.preventDefault();
            //请求搜索接口  
            ajax(http_url.url+"/discuss/discussadd",{
                "discussContent": val,
                "productId": $(this).attr("data-commitId"),
                "status": $(this).attr("data-status"),
                "type": $(this).attr("data-type")
            },function(data){
                if(data.code==1){
                    location.reload();
                }else{
                    alert(data.des);
                }
            })
        }
    });
    //评论列表点击
    $("body").on("click",".channel-d-c-content",function(){
        if($(this).html()!="该评论已被删除"){
            $(".sub_commit").focus().attr({
                'data-commitId':$(this).attr("data-id"),
                'data-status':$(this).attr("data-status"),
                'placeholder':"回复: "+$(this).attr("data-name")
            })
        }
    });
    //评论赞点击
    $("body").on("click",".zan-comment",function(){
        var num=Number($(this).next("span").html()),that=$(this);
        if($(this).attr("src")=="../img/channel-zan-no.png"){
            ajax(http_url.url+"/praise/brush",{
                "praiseType": "1",
                "productId": $(this).attr("data-id"),
                "type": "4"
            },function(data){
                if(data.code==1){
                    that.attr("src","../img/channel-zan.png").next("span").html(num+1);
                }else{
                    alert(data.des);
                }
            });
        }else{
            ajax(http_url.url+"/praise/brush",{
                "praiseType": "0",
                "productId": $(this).attr("data-id"),
                "type": "4"
            },function(data){
                if(data.code==1){
                    that.attr("src","../img/channel-zan-no.png").next("span").html(num-1);;
                }else{
                    alert(data.des);
                }
            });

        }
    });
    //更多回复点击
    $("body").on("click",".more-reply",function(){
        if($(this).html()=="收起"){
            $(".channel-d-c-reply-body").css({
                height: "16rem",
                overflow: "hidden"
            });
            $(this).html("更多回复("+$(this).attr("data-num")+")")
        }else{
            $(".channel-d-c-reply-body").css({
                height: "auto"
            });
            $(this).html("收起")
        }
    });
    //删除评论点击
    $("body").on("click",".del-channel-comment",function(){
        if(confirm("确定要删除吗")==true){
            ajax(http_url.url+"/discuss/deldicuss",{
                "type":"4",
                "uuid":$(this).attr("data-id")
            },function(data){
                if(data.code==1){
                    location.reload()
                }else{
                    alert(data.des);
                }
            })
        }
    });
    //关注按钮点击
    $(".attention-author").click(function(){
        var that=$(this),phone=$(this).attr("data-phone");
        function attention(data){
            alert(data.des);
            that.hide();
        }
        ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);
        // if($(this).html()=="取消关注"){
        //     $(this).html("+ 关注").removeClass("attention-person-already");
        //     ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":0},attention);
        //
        // }else{
        //     $(this).html("取消关注").addClass("attention-person-already");
        //     ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);
        // }
    });
    //课程介绍查看全部点击
    $(".curriculum-more").click(function(){
        if($(this).children("span").html()=="查看全部"){
            $(".channel-course").css({"max-height":"none"});
            $(this).children("span").html("收起");
        }else{
            $(".channel-course").css({"max-height":"51.3rem"});
            $(this).children("span").html("查看全部");
        }
    });
    //相关推荐查看全部点击
    $(".tj-more").click(function(){
        if($(this).children("span").html()=="查看全部"){
            $(".channel-relevant").css({"max-height":"none"});
            $(this).children("span").html("收起");
        }else{
            $(".channel-relevant").css({"max-height":"75rem"});
            $(this).children("span").html("查看全部");
        }
    });
    //视频赞点击
    $(".channel-zan").click(function(){
        var that=$(this);
        if($(this).attr("src")=='../img/channel-c-zan-no.png'){
            ajax(http_url.url+"/praise/brush",{
                "praiseType":"1",
                "productId": $(this).attr("data-id"),
                "type":"6"
            },function(data){
                if(data.code==1){
                    $(".channel-zan-num").html(Number($(".channel-zan-num").html())+1);
                    that.attr("src",'../img/channel-c-zan.png');
                }else{
                    alert(data.des);
                }
            });
        }else{
            ajax(http_url.url+"/praise/brush",{
                "praiseType":"0",
                "productId": $(this).attr("data-id"),
                "type":"6"
            },function(data){
                if(data.code==1){
                    $(".channel-zan-num").html(Number($(".channel-zan-num").html())-1);
                    that.attr("src",'../img/channel-c-zan-no.png');
                }else{
                    alert(data.des);
                }
            });
        }
    });
    //视频收藏点击
    $(".channel-sc").click(function(){
        var that=$(this);
        if($(this).attr("src")=='../img/channel-sc-no.png'){
            ajax(http_url.url+"/store/brush",{
                "storeType":"1",
                "businessId": $(this).attr("data-id"),
                "type":"2"
            },function(data){
                if(data.code==1){
                    that.attr("src",'../img/channel-sc.png');
                }else{
                    alert(data.des);
                }
            });
        }else{
            ajax(http_url.url+"/store/brush",{
                "storeType":"0",
                "businessId": $(this).attr("data-id"),
                "type":"2"
            },function(data){
                if(data.code==1){
                    that.attr("src",'../img/channel-sc-no.png');
                }else{
                    alert(data.des);
                }
            });
        }
    });
    //被回复人的名字
    function get_rname(val){
        var realName='';
        if(val.replyRole==2){
            realName=val.replyUserName;
        }else{
            realName=val.replyRealName||"匿名用户";
        }
        return realName;
    }
    //分享按钮点击
    $(".channel-fx").click(function(){
        $(".shadow").show();
    });
    $(".shadow").click(function(){
        $(".shadow").hide();
    });
    //tab切换点击
    $(".channel-d-tab a").click(function(){
        $(".channel-d-tab a").removeClass("channel-d-tab-act");
        $(this).addClass("channel-d-tab-act");
    });
    function format2(shijianchuo){
        var time = new Date(shijianchuo);
        var now_time=new Date();
        var now_y=now_time.getFullYear();
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        if(now_time>time){
            return add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        }else{
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        }

    }
    //微信分享
    function wx_share(){
        //配置微信信息
        var path_url=encodeURIComponent(window.location.href.split('#')[0]);
        $.ajax({
            type:"POST",
            url:http_url.url+"/wx/createJsapiSignature?url="+path_url,
            success:function(data){
                console.log(data.datum);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.datum.appid, // 必填，公众号的唯一标识
                    timestamp:data.datum.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.datum.noncestr, // 必填，生成签名的随机串
                    signature: data.datum.signature,// 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline',       // 分享到朋友圈接口
                        'onMenuShareAppMessage',  //  分享到朋友接口
                        'onMenuShareQQ',         // 分享到QQ接口
                        'onMenuShareQZone']   // 分享到qq空间] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    var shareData = {
                        title: "这些财税知识越早知道越好",
                        desc: $.trim($(".channel-d-author-title").html()), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-pd.html?id="+vid,
                        imgUrl: total_share_url.url+"jsb_weixin/share_app/img/share-logo.png",
                        trigger: function (res) {
                            console.log('用户点击发送给朋友');
                        },
                        success: function (res) {
                            console.log('已分享');
                            function fx_hobao(data){

                            }
                            ajax(http_url.url+"/pay/companyEnveloeps",{
                                "questionUuid":watch_id,
                                "redType":"shareSecretly"
                            },fx_hobao)
                        },
                        cancel: function (res) {
                            console.log('已取消');
                        },
                        fail: function (res) {
                            console.log(JSON.stringify(res));
                            console.log(shareData.link)
                        }
                    };
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareQZone(shareData);
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                });
                wx.error(function(res){
                    console.log(res)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            },
            error:function(){
                alert("程序出错,请重试")
            }
        });
    }
    wx_share()
});