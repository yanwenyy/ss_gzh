$(function(){
    var msg=getUrlParms("msg");
    if(msg!=null){
        $(".back").click(function(){
            window.location.href="expert-home-page.html?phone="+msg+"&&code=1";
        });
    }else{
        $(".back").click(function(){
            window.location.href="index-csq.html";
        });
    }
    var csq_id=getUrlParms("csq_id");
    //文章详情的title和content
    function get_csq_detail(data){
        //console.log(data);
        if(data.isCreateByOwn==1){
            $(".release").show();
            $(".gz-btn-new").hide();
        }
        var createData=format(data.cretateDate);
        $(".csq-detail-body-msg .csq-user-img").attr("src",head_src+data.userLevel.headImage).attr("data-role",data.userLevel.role).attr("data-phone",data.userLevel.phoneNumber);
        var realName=get_name(data.userLevel);
        $(".csq-detail-body-msg .user-name").html(`${realName ||"匿名用户"}
                                <div class="inline-block zxs-grade">
                                    <img src="../img/icon-expert icon.png" alt="">
                                    ${data.userLevel.levelName||""}
                                </div>`);
        $(".csq-detail-body-msg .zx-detail-date").html(data.userLevel.counselorDuty);
        $(".csq-detail-body-msg .rd-look-btn").html(data.categorys.name).attr("data-id",data.categorys.uuid);
        $(".csq-detail-body-msg .csq-footer-date").html(createData);
        //是否关注
        if(data.isAttention==1){
            $(".gz-btn-new").addClass("az-csq-ls-qx").removeClass("az-csq-ls");
            $(".gz-btn-new").html("取消关注");
        }
        //是否收藏
        if(data.ifCollection==1){
            $(".sc-csq-detail").attr("src","../img/icon-My-Collection.png");
        }else{

            $(".sc-csq-detail").attr("src","../img/icon-onlooked-Collection.png");
        }
        $(".gz-btn-new").attr("data-atte",data.isAttention);
        $(".gz-btn-new").attr("data-phone",data.userLevel.phoneNumber);
        $(".csq-detail-body-msg .clist-msg").html(data.title);
        var content=data.content.replace(/[\n\r]/g,'<br>');
        $(".csq-detail-body-msg .csq-tab--detail-msg").html(content);
        $(".hb_count").html(data.count);
        $(".hb_all_money").html(parseFloat(data.sum).toFixed(2)+"元");
        var headImages=data.headImages,html="",hb_img=$(".hb-user-msg>img");
       // console.log(hb_img);
        // for(var i=0;i< headImages.length;i++){
        //     //html+=`<img src="${head_src+headImages[i]}" onerror=src="../img/user.png">`;
        //     hb_img[1].attr("src",head_src+headImages[i]);
        // }
        // $(".hb-user-msg").html(html);
        if(data.headImages.length>0){
            $(".hb-user-msg>img").each(function(i){
                for(var k=0;k<headImages.length;k++){
                    if(k==i){
                        var hdimg=head_src+headImages[k];
                        if(headImages[k]==null){
                            hdimg="../img/user.png";
                        }
                    }
                    $(this).attr("src",hdimg);
                }
            });
        }
    }
    //文章评论列表
    function get_comment(data){
        console.log(data);
        var discussUsers=data.discussUsers,html='';
        for(var i=0;i<discussUsers.length;i++){
            createDate=format(discussUsers[i].date);
            //用户等级
            var score_img=get_score(discussUsers[i].integralScore,discussUsers[i].aision,discussUsers[i].vip);
            var realName=get_name(discussUsers[i]);
            html+=`
                <div class="box-sizing">
                    <div class="clist-head">
                        <img src="${head_src+discussUsers[i].headImage}" alt="" onerror=src="../img/user.png"  class="look-hp-image" data-role="${discussUsers[i].role}" data-phone="${discussUsers[i].userUuid}">
                        <div class="inline-block">
                            <div class="user-name">
                               ${realName}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${score_img}" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clist-msg review-list-msg">
                        ${discussUsers[i].content}
                    </div>
                    <div class="zx-detail-date  review-list-msg">${createDate}</div>
                </div>`;
        }
        $(".user_comment-list").html(html);
    }
    function get_comment_more(data){
        //console.log(data);
        var discussUsers=data.discussUsers,html='';
        for(var i=0;i<discussUsers.length;i++){
            createDate=format(discussUsers[i].date);
            //用户等级
            var score_img=get_score(discussUsers[i].integralScore,discussUsers[i].aision,discussUsers[i].vip);
            var realName=get_name(discussUsers[i]);
            html+=`
                <div class="box-sizing">
                    <div class="clist-head">
                        <img src="${head_src+discussUsers[i].headImage}" alt="" onerror=src="../img/user.png"   class="look-hp-image" data-role="${discussUsers[i].role}" data-phone="${discussUsers[i].userUuid}">
                        <div class="inline-block">
                            <div class="user-name">
                               ${realName}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${score_img}" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clist-msg review-list-msg">
                        ${discussUsers[i].content}
                    </div>
                    <div class="zx-detail-date  review-list-msg">${createDate}</div>
                </div>`;
        }
        $(".user_comment-list").append(html);
    }
    ajax(http_url.url+"/article/articleDetails",{"articleUuid":csq_id},get_csq_detail);
    ajax(http_url.url+"/discuss/articleDiscuss",{"articleUuid":csq_id,"sinceId":count_start, "maxId":count_end},get_comment);
    scroll_more(http_url.url+"/discuss/articleDiscuss",{"articleUuid":csq_id,"sinceId":count_start, "maxId":count_end},get_comment_more);
    //关注按钮点击
    $(".gz-btn-new").click(function(){
        var code=$(this).attr("data-atte"),
            phone=$(this).attr("data-phone");
        console.log(code);
        function attention(data){
            alert(data.des);
        }
        if($(this).hasClass("az-csq-ls")){
            $(this).html("取消关注").removeClass("az-csq-ls").addClass("az-csq-ls-qx");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);

        }else{
            $(this).html("关注").removeClass("az-csq-ls-qx").addClass("az-csq-ls");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":0},attention);
        }
    });
    //查看红包人员
    $(".look-release-list").click(function(){
        window.location.href="../html/csq-detail-reward.html?uuid="+csq_id;
    });
    //收藏文章
    function sc_csq_detail(data){
        if(data.des=="收藏成功"){
            alert(data.des);
            $(".sc-csq-detail").attr("src","../img/icon-My-Collection.png");
        }
    }
    //取消收藏
    function cancel_collection(data){
        if(data.code==1){
            alert(data.des);
            $(".sc-csq-detail").attr("src","../img/icon-onlooked-Collection.png");
        }
    }
    //赞
    function zan_csq(data){
        alert(data.des);
        if(data.code==1){
            $(".zan-csq-detail").attr("src","../img/icon-onlooked-liked-select.png");
        }
    }
    //文章评论
    function sub_comment(data){
        console.log(data);
       if(data.code==1){
           alert(data.des);
           location.reload();
       }else{
           alert(data.des);
       }
    }
    $(".comment-sub").on('keypress',function(e) {
        var keycode = e.keyCode;
        var comment_val = $(this).val();
        if(keycode=='13') {
            e.preventDefault();
            function get_user(data){
                console.log(data);
                if(comment_val==""){
                    alert("内容不能为空")
                }else{
                    if(data.userName||data.companyName||data.province){
                        //请求搜索接口
                        ajax(http_url.url+"/discuss/editDiscuss",{"articleUuid":csq_id,"discussContent":comment_val},sub_comment);
                    }else{
                        alert("请完善您的个人信息");
                        window.location.href="../html/mine-personal-data.html"
                    }
                }

            }
            ajax_nodata(http_url.url+"/user/message",get_user);
        }
    });
    //踩
    function cai_csq(data){
        alert(data.des);
        if(data.code==1){
            $(".cai-csq-detail").attr("src","../img/icon-onlooked-unliked-select.png");
        }
    }
    //收藏按钮点击
    $(".sc-csq-detail").click(function(){
        var that=$(this);
        //ajax(http_url.url+"/article/collection",{"articleUuid":csq_id},sc_csq_detail);
        if(that.attr("src")=="../img/icon-onlooked-Collection.png"){
            ajax(http_url.url+"/article/collection",{"articleUuid":csq_id},sc_csq_detail);

        }else{
            ajax(http_url.url+"/article/cancel",{"articleUuid":csq_id},cancel_collection);

        }
    });
    $(".zan-csq-detail").click(function(){
        if( $(".cai-csq-detail").attr("src")=="../img/icon-onlooked-unliked-select.png"){
            alert("您已经踩过该文章,不能再赞")
        }else{
            ajax(http_url.url+"/article/proveAndpose",{"articleUuid":csq_id,"status":1},zan_csq);
        }
    });
    $(".cai-csq-detail").click(function(){
        if( $(".zan-csq-detail").attr("src")=="../img/icon-onlooked-liked-select.png"){
            alert("您已经赞过该文章,不能再踩")
        }else {
            ajax(http_url.url + "/article/proveAndpose", {"articleUuid": csq_id, "status": 2}, cai_csq);
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
                        title: $(".clist-msg").html(),
                        desc: $(".csq-tab--detail-msg").text(), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/csq_detail.html?csq_id="+csq_id,
                        imgUrl: total_share_url.url+"jsb_weixin/share_app/img/share-logo.png",
                        trigger: function (res) {
                            console.log('用户点击发送给朋友');
                        },
                        success: function (res) {
                            console.log('已分享');
                            function fx_hobao(data){

                            }
                            ajax(http_url.url+"/pay/companyEnveloeps",{
                                "questionUuid":csq_id,
                                "redType":"shareArticle"
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
    $(".share-wx").click(function(){
        var share_name=$(this).attr("data-name");
        //alert("点击右上角进行分享");$(".shadow").show();
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
    $(".share_to_weibo").click(function(){
        shareToXl("我在解税宝发现了一篇好文章,推荐给你",total_share_url.url+"jsb_weixin/share_app/html/csq_detail.html?csq_id="+csq_id,total_share_url.url+"jsb_weixin/share_app/img/share-logo.png");
    });
    //删除文章
    $(".release").click(function(){
        function del_art(data){
            if(data.code==1){
                alert("删除成功");
                window.location.href="../html/index-csq.html";
            }else{
                alert(data.des);
            }
        }
        if(confirm("您确定要删除吗?")==true){
            ajax(http_url.url+"/article/delete",{"articleUuid":csq_id},del_art);
        }else{
            return false;
        }
    });
    //红包打赏点击
     $(".send_money").click(function(){
         //window.location.href="../html/hb-pay.html";
         window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fhb-pay.html%3fcsq_id%3d"+csq_id+"%26%26&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
     })
});