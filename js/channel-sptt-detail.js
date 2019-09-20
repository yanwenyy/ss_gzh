$(function(){
    var id=getUrlParms("id");
    $(".sub_commit").attr("data-commitId",id);
    //tab切换点击
    $(".channel-d-tab a").click(function(){
        $(".channel-d-tab a").removeClass("channel-d-tab-act");
        $(this).addClass("channel-d-tab-act");
    });
    //基本信息
    ajax(http_url.url+"/headvideo/videodetails",{
        "id":id
    },function(data){
        if(data.code==1){
            // console.log(data);
            var msg=data.data;
            $(".channel-sttt-look-num>span").html(msg.watch_num);
            $(".channel-zan").attr("data-id",id);
            $(".channel-sc").attr("data-id",id);
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
            $("title").html(msg.title);
            $(".channel-teacher").html(get_name(msg));
            $(".channel-d-author-msg .look-hp-image").attr("src",headimage(msg.headImage)).attr("data-phone",msg.userId).attr("data-role",msg.role);
            $(".attention-author").attr("data-phone",msg.userId);
            $(".channel-course").html(msg.introduction);
            $(".channel-d-comment-num").html(msg.discuss_num);
            $(".channel-sptt-msg-time").html(timeago(msg.insert_time));
        }else{
            alert(data.des);
        }
    });
    list_sptt_rc(1,20);
    //视频推荐
    function list_sptt_rc(start,end){
        ajax(http_url.url+"/headvideo/morelist",{
            "id": id,
            "maxId": end,
            "sinceId": start},function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                if(datas.length>3){
                    $(".tj-more").removeClass("out");
                }
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                        <div class="channel-relevant-list" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="inline-block channel-relevant-list-msg">
                                <div data-id="${change_v.id}">${change_v.title.length>18?change_v.title.slice(0,18)+'...':change_v.title}</div>
                                <div data-id="${change_v.id}" class="orange" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>
                    `;
                }
                $(".channel-relevant").html(html);
            }else{
                $(".tj-channel-detail").hide();
            }
        })
    }
    //相关推荐频道列表点击
    $("body").on("click",".channel-relevant-list",function(e){
        var class_val=e.target.className.indexOf("channel-page-li-userbtn");
        if(class_val!=-1){
            window.location.href="channel-sptt-label.html?id="+e.target.getAttribute("data-id");
        }else{
            window.location.href="channel-sptt-detail.html?id="+e.target.getAttribute("data-id");
        }
    });
    //评论列表
    ajax(http_url.url+"/discuss/discusslist",{
        "maxId": count_end,
        "sinceId":count_start,
        "type": "5",
        "uuid": id
    },function(data){
        // console.log(data);
        var html='';
        if(data.data&&data.data!=''){
            var commit_list=data.data;
            for(var i=0,len=commit_list.length;i<len;i++){
                var change_v=commit_list[i];
                var reply=[],reply_html='';
                if(change_v.childrens!=[]){
                    reply=change_v.childrens;
                    for(var r=0;r<reply.length;r++){
                        reply_html+=`<div class="channel-d-c-reply-list box-sizing">
                                            <div class="inline-block comment-head-div">
                                                  <img data-phone="${reply[r].userUuid}"  src="${headimage(reply[r].headImage)}" class="look-hp-image" data-role="${reply[r].role}" alt="" onerror=src="../img/user.png">
                                            </div>
                                            <div class="inline-block" style="width:79%">
                                                <div>
                                                    <div class="channel-d-c-name">
                                                        <span class="inline-block">
                                                            ${get_name(reply[r]).length>10?get_name(reply[r]).slice(0,10)+"...":get_name(reply[r])}
                                                            <span class="${reply[r].reply==0?'':'out'}"><span style="color:#333">回复</span>  ${get_name(reply[r]).length>10?get_name(reply[r]).slice(0,10)+"...":get_name(reply[r])}
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
                    <div class="inline-block comment-head-div">
                          <img src="${headimage(change_v.headImage)}" data-phone="${change_v.userUuid}" class="look-hp-image" data-role="${change_v.role}" alt="" onerror=src="../img/user.png">
                    </div>
                    <div class="inline-block">
                        <div>
                            <div class="channel-d-c-name">
                                <span class="inline-block blue">${get_name(change_v).length>10?get_name(change_v).slice(0,10)+"...":get_name(change_v)}
                                <!--span class="orange ${change_v.author==0?'':'out'}">·作者</span-->
                                </span>
                                <span class="liline-block">
                                <img src="${change_v.praiseNum==0?'../img/channel-zan-no.png':'../img/channel-zan.png'}" data-id="${change_v.uuid}" class="zan-comment" alt="">
                                <span>${change_v.sumPraisNum}</span>
                            </span>
                            </div>
                            <div class="channel-d-c-content ${change_v.content=='该评论已被删除'?'orange':''}" data-name="${get_name(data.data[i])}" data-status="2"  data-id="${change_v.uuid}">${change_v.content}</div>
                           <div class="channel-d-c-date">${format2(change_v.date)}  
                                <span data-id="${change_v.uuid}" class="del-channel-comment ${sessionStorage.getItem("userid")==change_v.userUuid?'':'out'}">·删除</span>
                               
                           </div>
                        </div>
                        <div class="channel-d-c-reply box-sizing ${reply!=''?'':'out'}">
                            <div class="channel-d-c-reply-body">
                                ${reply_html}
                            </div>
                            <div class="blue more-reply ${change_v.childrens.length>1?'':'out'}" data-num="${change_v.childrens.length-1}">更多回复(${change_v.childrens.length-1})</div>
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
        "type": "5",
        "uuid": id
    },function(data){
        var html='';
        if(data.data!=''){
            var commit_list=data.data;
            for(var i=0,len=commit_list.length;i<len;i++){
                var change_v=commit_list[i];
                var reply=[],reply_html='';
                if(change_v.childrens!=[]){
                    reply=change_v.childrens;
                    for(var r=0;r<reply.length;r++){
                        reply_html+=`<div class="channel-d-c-reply-list box-sizing">
                                            <div class="inline-block comment-head-div">
                                                  <img data-phone="${reply[r].userUuid}"  src="${headimage(reply[r].headImage)}" class="look-hp-image" data-role="${reply[r].role}" alt="" onerror=src="../img/user.png">
                                            </div>
                                            <div class="inline-block" style="width:79%">
                                                <div>
                                                    <div class="channel-d-c-name">
                                                        <span class="inline-block">
                                                            ${get_name(reply[r]).length>10?get_name(reply[r]).slice(0,10)+"...":get_name(reply[r])}
                                                            <span class="${reply[r].reply==0?'':'out'}"><span style="color:#333">回复</span>  ${get_name(reply[r]).length>10?get_name(reply[r]).slice(0,10)+"...":get_name(reply[r])}
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
                    <div class="inline-block comment-head-div">
                          <img src="${headimage(change_v.headImage)}" data-phone="${change_v.userUuid}" class="look-hp-image" data-role="${change_v.role}" alt="" onerror=src="../img/user.png">
                    </div>
                    <div class="inline-block">
                        <div>
                            <div class="channel-d-c-name">
                                <span class="inline-block blue">${get_name(change_v).length>10?get_name(change_v).slice(0,10)+"...":get_name(change_v)}
                                <!--span class="orange ${change_v.author==0?'':'out'}">·作者</span-->
                                </span>
                                <span class="liline-block">
                                <img src="${change_v.praiseNum==0?'../img/channel-zan-no.png':'../img/channel-zan.png'}" data-id="${change_v.uuid}" class="zan-comment" alt="">
                                <span>${change_v.sumPraisNum}</span>
                            </span>
                            </div>
                            <div class="channel-d-c-content ${change_v.content=='该评论已被删除'?'orange':''}" data-name="${get_name(data.data[i])}" data-status="2"  data-id="${change_v.uuid}">${change_v.content}</div>
                           <div class="channel-d-c-date">${format2(change_v.date)}  
                                <span data-id="${change_v.uuid}" class="del-channel-comment ${sessionStorage.getItem("userid")==change_v.userUuid?'':'out'}">·删除</span>
                               
                           </div>
                        </div>
                        <div class="channel-d-c-reply box-sizing ${reply!=''?'':'out'}">
                            <div class="channel-d-c-reply-body">
                                ${reply_html}
                            </div>
                            <div class="blue more-reply ${change_v.childrens.length>1?'':'out'}" data-num="${change_v.childrens.length-1}">更多回复(${change_v.childrens.length-1})</div>
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
    //删除评论点击
    $("body").on("click",".del-channel-comment",function(){
        if(confirm("确定要删除吗")==true){
            ajax(http_url.url+"/discuss/deldicuss",{
                "type":"5",
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
    //评论列表点击
    $("body").on("click",".channel-d-c-content",function(){
        var name=$(this).attr("data-name").length>10?$(this).attr("data-name").slice(0,10)+"...":$(this).attr("data-name");
        if($(this).html()!="该评论已被删除"){
            $(".sub_commit").focus().attr({
                'data-commitId':$(this).attr("data-id"),
                'data-status':$(this).attr("data-status"),
                'placeholder':"回复: "+name
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
                        title: $(".channel-d-author-title").text(),
                        desc: "官方消息早知道，尽在视频头条！", //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-sptt.html?id="+id,
                        imgUrl: total_share_url.url+"jsb_weixin/share_app/img/share-logo.png",
                        trigger: function (res) {
                            console.log('用户点击发送给朋友');
                        },
                        success: function (res) {
                            console.log('已分享');
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
    wx_share();
});