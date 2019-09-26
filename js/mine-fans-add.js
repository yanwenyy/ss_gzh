$(function(){
    var index=getUrlParms("from"),
        phone=getUrlParms("phone"),
        role=getUrlParms("role");
    var share_url=role!=3?"jsb_weixin/share_app/html/personal-new.html?phone="+phone:"jsb_weixin/share_app/html/personal-official.html?phone="+phone;
    if(index=="index"){
        $(".send-wx").removeClass("out");
    }
    list();
    list_more();
    //推荐好友列表
    function list(val,type){
        ajax(http_url.url+"/attention/allFriend",{
            "maxId": count_end,
            "sinceId": count_start,
            "phone":type==3?val:'',
            "realName":type==2?val:'',
            "userName":type==1?val:'',
            "brushNum":type==4?val:''
        },function(data){
            var search=$(".recommend-title").attr("data-search"),list=data.data;
            var html='';
            if(list&&list!=''){
                for(var i=0,len=list.length;i<len;i++){
                    var change_v=list[i];
                    html+=`<li class="box-sizing">
                            <img  data-phone="${change_v.phoneNumber}" class="look-hp-image"  data-role="${change_v.role}" src="${headimage(change_v.headImage)}"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${change_v.phoneNumber}" class="inline-block look-hp-image fans-name-div" data-role="${change_v.role}">
                                <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                                <div class="inline-block fans-dj-msg ${change_v.role==2?'':'out'}">${change_v.levelName}</div>
                                <div class="inline-block fans-dj ${change_v.role==1?'':'out'}"><img src="${get_score(change_v.integralScore,change_v.aision,change_v.vip)}" alt=""></div>
                                <div class="fans-fans ${search==1?'out':''}">
                                    <span>${change_v.fansNumber} 粉丝</span>
                                    <span>${change_v.brushNumber} 刷刷</span>
                                </div>
                                <div class="fans-zw">
                                    <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block ${change_v.counselorDuty!=null&&change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                                    <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                                </div>
                                <div class="fans-s-msg">
                                    <div class="${type==3?'':'out'}">手机号：${change_v.phone}</div>
                                    <div class="${type==2&&change_v.role==2?'':'out'}">昵称：${change_v.realName}</div>
                                    <div class="${type==1&&change_v.role!=2?'':'out'}">真实姓名：${change_v.userName}</div>
                                </div>
                            </div>
                            <div data-phone="${change_v.phoneNumber}" class="inline-block attention-fans ${change_v.follow==1?'each-attention':'gzfs'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${change_v.follow==1?(change_v.mutual==1?'互关':'已关注'):'+关注'}</div>
                        </li>
                `
                }
                $(".mine-fans-recommend>ul").html(html);
            }
        })
    }
    function list_more(val,type){
        scroll_more(http_url.url+"/attention/allFriend",{
            "maxId": count_end,
            "sinceId": count_start,
            "phone":type==3?val:'',
            "realName":type==2?val:'',
            "userName":type==1?val:'',
            "brushNum":type==4?val:''
        },function(data){
            var html='';
            if(data.data&&data.data!=''){
                var search=$(".recommend-title").attr("data-search"),list=data.data;
                for(var i=0,len=list.length;i<len;i++){
                    var change_v=list[i];
                    html+=`<li class="box-sizing">
                            <img  data-phone="${change_v.phoneNumber}" class="look-hp-image"  data-role="${change_v.role}" src="${headimage(change_v.headImage)}"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${change_v.phoneNumber}" class="inline-block look-hp-image fans-name-div" data-role="${change_v.role}">
                                <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                                <div class="inline-block fans-dj-msg ${change_v.role==2?'':'out'}">${change_v.levelName}</div>
                                <div class="inline-block fans-dj ${change_v.role==1?'':'out'}"><img src="${get_score(change_v.integralScore,change_v.aision,change_v.vip)}" alt=""></div>
                                <div class="fans-fans ${search==1?'out':''}">
                                    <span>${change_v.fansNumber} 粉丝</span>
                                    <span>${change_v.brushNumber} 刷刷</span>
                                </div>
                                <div class="fans-zw">
                                    <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block ${change_v.counselorDuty!=null&&change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                                    <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                                </div>
                                <div class="fans-s-msg">
                                    <div class="${type==3?'':'out'}">手机号：${change_v.phone}</div>
                                    <div class="${type==2&&change_v.role==2?'':'out'}">昵称：${change_v.realName}</div>
                                    <div class="${type==1&&change_v.role!=2?'':'out'}">真实姓名：${change_v.userName}</div>
                                </div>
                            </div>
                            <div data-phone="${change_v.phoneNumber}" class="inline-block attention-fans ${change_v.follow==1?'each-attention':'gzfs'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${change_v.follow==1?(change_v.mutual==1?'互关':'已关注'):'+关注'}</div>
                        </li>
                `
                }
                $(".mine-fans-recommend>ul").append(html);
            }else{
                scroll_status=false;
            }
        });
    }
    //搜索选择框变化
    $(".fans-search>select").on("change",function(){
        var type=$(this).val();
        if(type==1){
            $(".fans-search>input").attr("placeholder","请输入好友真实姓名")
        }else if(type==2){
            $(".fans-search>input").attr("placeholder","请输入好友昵称")
        }else if(type==3){
            $(".fans-search>input").attr("placeholder","请输入好友手机号")
        }else if(type==4){
            $(".fans-search>input").attr("placeholder","请输入好友刷刷号")
        }
    });
    //清空搜索框
    $(".fans-search>img").click(function(){
        $(".fans-search>input").val('')
    });
    //搜索框
    $(".fans-search>input").on('keypress',function(e) {
        var keycode = e.keyCode;
        var val = $(this).val(),type=$(".fans-search>select").val();
        if(keycode=='13') {
            e.preventDefault();
            if(val==''){
                alert("请输入搜索内容")
            }else{
                $(".recommend-title").hide().attr("data-search",'1');
                //请求搜索接口  
                count_start=1;count_end=10;num=1;
                list(val,type);
                list_more(val,type);
            }
        }
    });
    //关注按钮点击
    $("body").on("click",".attention-fans",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        if(that.text()=="+关注"){
            ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
                alert(data.des);
                if(data.code==1){
                    that.addClass("each-attention").html("已关注");
                    if($(".recommend-title").attr("data-search")=="1"){
                        that.text("已关注");
                    }else{
                        that.parent().remove();
                    }
                }
            })
        }
    });
    //邀请微信好友点击
    $(".send-wx").click(function(){
        $(".shadow").show();
    });
    $(".shadow").click(function(){
        $(".shadow").hide();
    });
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
                        'onMenuShareQZone',// 分享到qq空间
                        'scanQRCode',// 微信扫一扫接口
                        'uploadImage',
                        'downloadImage'//下载图片
                    ] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    var shareData = {
                        title: "在刷刷，打开财税新世界",
                        desc: "行业大咖都在用刷刷，你还在等什么，快来围观！", //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-yqh.html?phone="+phone,
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