$(function(){
    var vid=getUrlParms("vid"),id=getUrlParms("id"),userId='';
    ajax(http_url.url+"/brush/brushVideorRequirement",{
        "source":'0',
        "id":id,
        "sinceId":'1',
        "maxId":'2'
    },function(data){
        console.log(data);
        var v_html="&lt;script async src='https://p.bokecc.com/player?vid="+data.data[0].vid+"&siteid=A0123BC413D6FBAE&autoStart=true&width=100%&height=100%&playerid=7E2195B034B0277B&playertype=1'>&lt;/script>";
        v_html=v_html.replace(/&lt;/g,'<');
        $(".brush-video-body").html(v_html);
        var html=`<div class="brush-video-column inline-block ${data.data[0].specialColumnName?'':'out'}" data-phone="${data.data[0].userId}" data-id="${data.data[0].specialcolumnId}">${data.data[0].specialColumnName||''}</div>
                    <div class="brush-video-user">${get_name(data.data[0])}</div>
                    <div class="brush-video-label">${data.data[0].title}</div>
                    <div class="brush-video-title" data-id="${data.data[0].labelId}">${data.data[0].labelName?"#"+data.data[0].labelName:''}</div>`;
        $(".brush-video-msg").html(html);
        $(".brush-v-xh-num").html(data.data[0].praiseNum);
        $(".brush-v-gz>div").attr("data-id",data.data[0].userId);
        if(data.data[0].ifAttention==0||data.data[0].ifAttention==2){
            $(".brush-v-gz>div").hide();
        }
        $(".brush-v-gz>img").attr("src",headimage(data.data[0].headImage)).attr("data-phone",data.data[0].userId).attr("data-role",data.data[0].role);
        userId=data.data[0].userId;
        // if(data.data[0].ifAttention==0){
        //     $(".brush-v-gz>div").html("取消关注")
        // }else if(data.data[0].ifAttention==2){
        //     $(".brush-v-gz").hide();
        // }
        if(data.data[0].ifPraise>0){
            $(".brush-v-xh>img").attr("src","../img/brush-v-xh-already.png")
        }
        if(data.data[0].ifStore==0){
            $(".brush-v-sc>img").attr("src","../img/brush-v-sc-already.png")
        }
    });
    //关注点击
    $(".brush-v-gz>div").click(function(){
        var that=$(this);
        if($(this).html()=="关注"){
            ajax(http_url.url+"/attention/user",{
                "phoneNum":$(this).attr("data-id"),"isAttention":1
            },function(data){
                if(data.code==1){
                    that.html("取消关注");
                    that.hide();
                }else{
                    alert(data.des);
                }
            })
        }else{
            ajax(http_url.url+"/attention/user",{
                "phoneNum":$(this).attr("data-id"),"isAttention":0
            },function(data){
                if(data.code==1){
                    that.html("关注")
                }else{
                    alert(data.des);
                }
            })
        }
    });
    //喜欢点击
    $(".brush-v-xh").click(function(){
        var that=$(this);
        if($(this).children("img").attr("src")=="../img/brush-v-xh.png"){
            ajax(http_url.url+"/praise/brush",{
                "praiseType": "1",
                "productId": id,
                "type": "2"
            },function(data){
                if(data.code==1){
                    that.children("img").attr("src","../img/brush-v-xh-already.png");
                    that.children("div").html(Number(that.children("div").html())+1);
                }else{
                    alert(data.des);
                }
            })
        }else{
            ajax(http_url.url+"/praise/brush",{
                "praiseType": "0",
                "productId": id,
                "type": "2"
            },function(data){
                if(data.code==1){
                    that.children("img").attr("src","../img/brush-v-xh.png");
                    that.children("div").html(that.children("div").html()-1);
                }else{
                    alert(data.des);
                }
            })
        }

    });
    //收藏点击
    $(".brush-v-sc").click(function(){
        var that=$(this);
        if($(this).children("img").attr("src")=="../img/brush-v-sc.png"){
            ajax(http_url.url+"/store/brush",{
                "storeType": "1",
                "businessId": id,
                "type": "1"
            },function(data){
                if(data.code==1){
                    that.children("img").attr("src","../img/brush-v-sc-already.png");
                }else{
                    alert(data.des);
                }
            })
        }else{
            ajax(http_url.url+"/store/brush",{
                "storeType": "0",
                "businessId": id,
                "type": "1"
            },function(data){
                if(data.code==1){
                    that.children("img").attr("src","../img/brush-v-sc.png");
                }else{
                    alert(data.des);
                }
            })
        }

    });
    //标签点击
    $("body").on("click",".brush-video-title",function(){
        var name=$(this).html().split("#")[1];
        window.location.href="brush-label-detail.html?id="+$(this).attr("data-id")+"&name="+encodeURIComponent(encodeURIComponent(name));
    });
    //专栏点击
    $("body").on("click",".brush-video-column",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="personal-new.html?phone="+phone+"&to=personal-new-title&msg=p-zl&sid="+$(this).attr("data-id");
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
                        'onMenuShareQZone']   // 分享到qq空间] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    var shareData = {
                        title: $(".brush-video-title").text(),
                        desc: "财税界短视频，你想看的都在这里！", //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-ss.html?id="+id,
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
    wx_share();
});