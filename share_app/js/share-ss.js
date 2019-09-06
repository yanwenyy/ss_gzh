$(function(){
    var id=getUrlParms("id");
    //刷刷视频
    ajax_nodata(http_url.url+"/share/brush/"+id+"/share",function(data){
        var datas=data.data;
        $("title").html(datas.title);
        var v_html="&lt;script async src='https://p.bokecc.com/player?vid="+datas.vid+"&siteid=A0123BC413D6FBAE&autoStart=true&width=100%&height=100%&playerid=7E2195B034B0277B&playertype=1'>&lt;/script>";
        v_html=v_html.replace(/&lt;/g,'<');
        $(".brush-video-body").html(v_html);
        var html=`<div class="brush-video-column inline-block ${datas.specialColumnName?'':'out'}">${datas.specialColumnName||''}</div>
                    <div class="brush-video-user">${get_name(datas)}</div>
                    <div class="brush-video-label">${datas.title}</div>
                    <div class="brush-video-title">${datas.labelName||''}</div>
                    `;
        $(".brush-video-msg").html(html);
        $(".brush-v-xh-num").html(datas.praiseNum);
        $(".brush-v-gz>img").attr("src",headimage(datas.headImage));
        $(".channel-d-comment-num").html(datas.discussNum);
    });
    //评论列表
    ajax_nodata(http_url.url+"/share/discusslist/"+id+"/share",function(data){
        var html='',datas=data.data;
        if(datas&&datas!=''&&datas!=[]){
            for(var i=0,len=datas.length;i<len;i++){
                var change_v=datas[i];
                html+=`
                  <div class="channel-d-c-list share-downloade">
                    <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                    <div class="inline-block">
                        <div>
                        <div class="channel-d-c-name">
                        <span class="inline-block blue">${get_name(data.data[i])}</span>
                        <span class="liline-block">
                        <img src="../img/channel-zan-no.png" alt="">
                        <span>${change_v.sumPraisNum}</span>
                        </span>
                        </div>
                        <div class="channel-d-c-content">${change_v.content}</div>
                        </div>
                    </div>
                  </div>  
                `;
            }
            $(".channel-detail-commit").html(html);
        }else{
            $(".channel-detail-commit").hide();
            $(".channel-d-card-title").hide();
            $(".down-app-look-one").html("打开App，查看更多视频")
        }
    });
    //更多热门视频
    ajax_nodata(http_url.url+"/share/brush/list/share",function(data){
        var html='',datas=data.data;
        if(datas&&datas!=''&&datas!=[]){
            for(var i=0,len=datas.length;i<len;i++){
                var change_v=datas[i];
                html+=`
                <div class="column-list-div inline-block share-downloade">
                    <img src="${cover_src+change_v.image}" alt="">
                    <div class="box-sizing">
                    <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                    <div class="column-list-name">
                    <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                    <div class="inline-block">${get_name(data.data[i])}</div>
                    </div>
                    </div>
                </div>
            `
            }
            $(".column-list-main").html(html);
        }
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
                        title: $("title").html(),
                        desc: "财税界短视频，你想看的都在这里！", //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-ss.html?id="+id,
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