$(function(){
    var id=getUrlParms("id");
    ajax_get(http_url.url+"/share/agencycounselor/"+id+"/share",function(data){
        var agency=data.data.agency;
        $(".merchanism-video-title").html(agency.name);
        $(".mer-addre").html(agency.address);
        $(".mer-distance").html(parseFloat(agency.distance).toFixed(2));
        $(".office-rz").html(`
            <div class="inline-block office-rz-qy ${agency.type2&&agency.type2.indexOf(2)!=-1?'':'out'}"><img src="../img/office-rz.png" alt="">认证企业</div>
            <div class="inline-block office-rz-fws">${agency.type==1?'普通机构':agency.type==2?'授权服务商':'合作伙伴'}</div>
            <div class="inline-block office-rz-sws ${agency.type2&&agency.type2.indexOf(1)!=-1?'':'out'}">5A级事务所</div>
        `);
        if(agency.areas){
            var expertiseAreas=agency.areas.split(";"),e_html='';
            if(expertiseAreas.length>5){
                $(".curriculum-more").removeClass("out");
            }
            for(var e=0;e<expertiseAreas.length;e++){
                if(expertiseAreas[e]!=''){
                    e_html+=`
                     <div class="inline-block">${expertiseAreas[e]}</div>
                `;
                }
            }
            $(".office-goodats").html(e_html)
        }
        $(".office-company-intro").html(agency.introduction);
        var html='';
        if(agency.videoCover&&agency.videoCover!==null&&agency.videoCover!=''){
            html=`<div class="swiper-slide office-video share-downloade" data-vid="${agency.videoId}">
                    <img src="${cover_src+agency.videoCover}" alt="">
                    <div class="video-bf">
                        <img src="../img/video-bf.png" alt="">
                    </div>
                    <div class="inline-block video-class">
                        <span class="video-video inline-block video-video-act">视频</span>
                        <span class="video-img inline-block">图片</span>
                    </div>
                </div>`;
        }
        $(".sub-channel-c>a").attr("href","tel:"+agency.contactNo);
        if(agency.picture){
            var pictureCollection=agency.picture.split(",");
            for(var i=0;i<pictureCollection.length;i++){
                html+=`<div class="swiper-slide">
                    <img src="${cover_src+pictureCollection[i]}" alt="">
                    <div class="inline-block video-class">
                        <span class="video-video inline-block">视频</span>
                        <span class="video-img inline-block video-img-act">图片(${i+1}/${pictureCollection.length})</span>
                    </div>
                </div>`;
            }
        }
        $(".swiper-wrapper").html(html);
        //轮播图
        if($(".swiper-wrapper>div").size()>1){
            var mySwiper = new Swiper('.office-swiper', {
                autoplay:true,//等同于以下设置
                loop : true,
            });
        }else{
            var mySwiper = new Swiper('.office-swiper', {
                autoplay:true,//等同于以下设置
            });
        };
        //咨询师列表
        var agencyCounselors=data.data.agencyCounselors,a_html='';
        if(agencyCounselors!=""){
            $(".office-expert-more>span").html(agencyCounselors.length);
            for(var a=0;a<agencyCounselors.length;a++){
                a_html+=`
                 <div class="inline-block office-expert-list-li share-downloade"  data-phone="${agencyCounselors[a].phoneNumber}">
                    <img src="${headimage(agencyCounselors[a].headImage)}"  onerror=src="../img/user.png" alt="">
                    <div class="office-expert-list-li-name">${get_name(agencyCounselors[a])}</div>
                    <div>${agencyCounselors[a].counselorDuty}</div>
                </div>
            `;
            }
            $(".office-expert-list").html(a_html);
        }
        wx_share();
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
                        title: "事务所找的好，税务没烦恼！",
                        desc: $(".merchanism-video-title").text(), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/share-sws.html?id="+id,
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