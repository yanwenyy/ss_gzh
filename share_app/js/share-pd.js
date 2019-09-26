$(function(){
   var id=getUrlParms("id");
   //频道详情
    ajax_nodata(http_url.url+"/share/classifyvideo/"+id+"/share",function(data){
        if(data.code==1){
            // console.log(data);
            var msg=data.data;
            if(msg.charge=="0"){
                var v_html="&lt;script async src='https://p.bokecc.com/player?vid="+$.trim(msg.cc_id)+"&siteid=A0123BC413D6FBAE&autoStart=false&width=100%&height=100%&playerid=7E2195B034B0277B&playertype=1'>&lt;/script>";
                v_html=v_html.replace(/&lt;/g,'<');
                $(".channel-d-video").html(v_html);
            }else if(msg.charge=="1"){
                $(".channel-d-video").html(`<img src="${cover_src+msg.cover}">`);
            }
            if(msg.role==3){
                $(".c-t-title").hide();
                $(".channel-detail-rz").removeClass("out");
            }
            $(".channel-d-author-title").html(msg.title);
            $(".channel-teacher").html(get_name(msg).length>25?get_name(msg).slice(0,25)+"...":get_name(msg));
            $(".channel-d-author-msg .look-hp-image").attr("src",headimage(msg.headImage)).attr("data-phone",msg.userId);
            $(".attention-author").attr("data-phone",msg.userId);
            $(".channel-course").html(msg.introduction);
            $(".channel-d-comment-num").html(msg.discuss_num);
        }else{
            alert(data.des);
        }
        wx_share()
    });
    //相关推荐
    ajax_get(http_url.url+"/share/classifyvideo/keywords/share?id="+id+"&&maxId=3&&sinceId=1",function(data){
        var html='';
        if(data.data){
            for(var i=0;i<data.data.length;i++){
                html+=`<div class="channel-relevant-list share-downloade" data-vid="${data.data[i].id}">
                        <img src="${cover_src+data.data[i].cover}" alt="">
                        <div class="inline-block channel-relevant-list-msg">
                            <div>${data.data[i].title.length>18?data.data[i].title.slice(0,18)+"...":data.data[i].title}</div>
                            <div>${get_name(data.data[i])}</div>
                            <div class="orange ${data.data[i].charge==0?'out':''}"">频道会员免费</div>
                        </div>
                    </div>`
            }
            $(".channel-relevant").html(html);
        }else{
            $(".tuijian").hide();
        }
    });
    //评论列表
    ajax_nodata(http_url.url+"/share/discusslist/"+id+"/share",function(data){
        if(data.data&&data.data!=''&&data.data!=[]){
            var html='';
            for(var i=0;i<data.data.length;i++){
                html+=`
                  <div class="channel-d-c-list share-downloade">
                    <img src="${headimage(data.data[i].headImage)}" onerror=src="../img/user.png" alt="">
                    <div class="inline-block">
                        <div>
                        <div class="channel-d-c-name">
                        <span class="inline-block blue">${get_name(data.data[i]).length>10?get_name(data.data[i]).slice(0,10)+"...":get_name(data.data[i])}</span>
                        <span class="liline-block">
                        <img src="../img/channel-zan-no.png" alt="">
                        <span>${data.data[i].sumPraisNum}</span>
                        </span>
                        </div>
                        <div class="channel-d-c-content">${data.data[i].content}</div>
                        </div>
                    </div>
                  </div>  
                `;
            }
            $(".channel-detail-commit").html(html);
        }
    });
    //频道图片点击
    $("body").on("click",".channel-d-video>img",function(){
        if(confirm("此视频为会员视频，需在APP进行观看，快去下载吧！")==true){
            window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jieshuibao.jsb"
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
                        title: "这些财税知识越早知道越好",
                        desc: $(".channel-d-author-title").text(), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-pd.html?id="+id,
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
});