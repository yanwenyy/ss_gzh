$(function(){
    //微信接口配置
    var path_url=encodeURIComponent(location.href.split('#')[0]),phone;
    function get_phone(data){
        phone=data.phoneNumber;
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
                        title: "[航信办税宝]50元红包等你领取。",
                        desc: "发现一个不错的财税咨询平台，我帮你申请了50元问答红包，快来领取吧", //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/user-register.html?inviteUserId="+phone,
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
    ajax_nodata(http_url.url+"/user/message",get_phone);
    //分享链接按钮点击
    $(".share-towx").click(function(){
        $(".shadow").show();
        $(".shadow").click(function(){
            $(".shadow").hide();
        })
    });
    //微博分享
    function shareToXl(title,url,picurl){
        var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
    }
    $(".share_towb").click(function(){
        shareToXl("发现一个不错的财税咨询平台，我帮你申请了50元问答红包，快来领取吧",total_share_url.url+"jsb_weixin/share_app/html/user-register.html?inviteUserId="+phone,total_share_url.url+"jsb_weixin/share_app/img/share-logo.png");
    });
    $(".invite-code-btn").click(function(){
        window.location.href="mine-invite-code.html"
    });
    $(".release").click(function(){
        window.location.href="mine-invite-record.html"
    })
});