$(function(){
    var bg=localStorage.getItem("bg")||1,
        share_url='',
        role=getUrlParms("role"),
        phone=getUrlParms("phone");
    $(".mine-card-body").addClass("mine-card-bg"+bg);
    //用户所有信息
    ajax_nodata(http_url.url+"/user/message",function(data){
        var msg=data;
        var html=`
            <div class="mine-card-head">
                 <img src="${headimage(msg.headImage)}" crossOrigin="anonymous" onerror=src="../img/user.png" alt="">
                 <div class="inline-block mine-card-name">
                            ${get_name(msg)}
                 </div>
                 <div class="inline-block mine-card-dj ${msg.role==2?'':'out'}">${msg.levelName}</div>
                <div class="mine-card-rz">
                        <div class="inline-block mine-card-rz-color${bg} ${msg.lecturer==1?'':'out'}">
                            <img src="../img/mine-card-rz${bg}.png" alt="">
                            讲师
                        </div>
                        <div class="inline-block mine-card-rz-color${bg} ${msg.role==2?'':'out'}">
                            <img src="../img/mine-card-rz${bg}.png" alt="">
                            税务师、律师
                        </div>
                        <div class="inline-block ${msg.role==3?'':'out'}">
                            <img src="../img/office-p-rz.png" alt="">
                            官方认证
                        </div>
                </div>
            </div>
            <div class="mine-card-agdress">
                <span>${msg.province}</span>
                <span class="inline-block mine-card-agdress-line ${msg.position&&msg.role!=3?'':'out'}"></span>
                <span class="${msg.role!=3?'':'out'}">${msg.position}</span>
            </div>
            <div class="mine-card-company">${msg.companyName}</div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-p.png" alt="">
                ${msg.cardPhone||msg.phone}
            </div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-m.png" alt="">
               ${msg.email||"未填写"}
            </div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-a.png" alt="">
                ${msg.role==3?msg.officialAddress||"未填写":msg.officeAddress||"未填写"}
            </div>
        `;
        $(".mine-card-main-msg").html(html);
        if(msg.brushNum){
            $(".mine-card-code-ss>span").html(msg.brushNum)
        }else{
            $(".mine-card-code-ss>span").hide();
        }
    });
    share_url=role!=3?"jsb_weixin/share_app/html/personal-new.html?phone="+phone:"jsb_weixin/share_app/html/personal-official.html?phone="+phone;
    //二维码
    var qrcode = new QRCode('qrcode', {
        text: 'your content',
        width: 256,
        height: 256,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
    qrcode.clear();
    qrcode.makeCode(total_share_url.url+share_url);
    var qrcode2= new QRCode('qrcode2', {
        text: 'your content',
        width: 256,
        height: 256,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
    qrcode2.clear();
    qrcode2.makeCode(total_share_url.url+share_url);
    //保存到相册
    $(".save-album").click(function(){
        html2canvas($(".mine-card-body-copy"),{ // $(".myImg")是你要复制生成canvas的区域，可以自己选
            useCORS: true,
            onrendered:function(canvas){
                dataURL =canvas.toDataURL("image/png");
                // $("body").append(canvas);
                $(".img-model").show();
                $(".img-show").attr("src",dataURL);
                //下载图片
                // $('#down_button').attr( 'href' ,  dataURL ) ;
                // $('#down_button').attr( 'download' , 'myjobdeer.png' ) ;
            },
            // width:100%,
            // height:400
        })
    });
    //编辑名片
    $(".edit-mine-card").click(function(){
        if(role==3){
            window.location.href="mine-card-edit-office.html"
        }else{
            window.location.href="mine-card-edit.html"
        }
    });
    //分享按钮点击
    $(".send-mine-card").click(function(){
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
                        link: total_share_url.url+share_url,
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