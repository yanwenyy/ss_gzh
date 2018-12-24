$(function(){
    var id=getUrlParms("id");
    function get_detail(data){
        //我的提问
        console.log(data);
        var questionUserOwnMsg=data.question;
        //用户等级
        var score_img=get_score(questionUserOwnMsg.integralScore,questionUserOwnMsg.aision,questionUserOwnMsg.vip);
        var img_src="";
        if(questionUserOwnMsg.isAnon!=0){
            img_src=head_src+questionUserOwnMsg.headImage;
        }
        var realName=get_name(questionUserOwnMsg);
        $(".answer-answer .look-hp-image").attr("src",img_src).attr("data-phone",questionUserOwnMsg.phoneNumber).attr("data-role",questionUserOwnMsg.role);
        $(".answer-answer .user-name").html(`
             <div class="user-name">
                        ${realName||"匿名用户"}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
             </div>
        `);
        $(".dz-num").html(questionUserOwnMsg.approveNum);
        $(".wg-num").html(questionUserOwnMsg.lookNum);
        $(".answer-answer .zx-detail-date").html(format(questionUserOwnMsg.date));
        $(".answer-answer .clist-msg").html(questionUserOwnMsg.content);
        $(".answer-answer .zx-detail-city").html(`
            <div class="inline-block">
                    <img src="../img/label.png" alt="">
                    ${questionUserOwnMsg.area ||""} ${questionUserOwnMsg.quTrade||""}
                </div>
                <div class="wacth-num inline-block">
                    <span>点赞<span class="dz-num">${questionUserOwnMsg.approveNum}</span></span>
                    <span>围观<span class="wg-num">${questionUserOwnMsg.lookNum}</span></span>
                </div>
        `);
        var imgs=questionUserOwnMsg.images,html="";
        if(imgs!=null){
            for(var i=0;i<imgs.length;i++){
                html+=`
               <img src="${question_src+imgs[i]}" alt="">
            `;
            }
            $(".answer-answer .zx-detail-img").html(html);
        }
        var answerUsers=data.answerUsers,answer_html='';
        var answer_score="";
        for(var k=0;k<answerUsers[0].score;k++){
            answer_score+=` <img src="../img/-icon-star.png" alt="">`;
        }
        var on='on';
        if(answerUsers[0].status!==2){
            on="out";
        }
        var realName=get_name(answerUsers[0]);
        $(".watch-answer-msg").html(`
             <div class="card-list zx-list">
                <div class="box-sizing watch-answer-expert">
                    <div class="clist-head">
                        <img class="look-hp-image" data-role="${answerUsers[0].role}" data-phone="${answerUsers[0].phoneNumber}" src="${head_src+answerUsers[0].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||""}
                                <div class="inline-block zxs-grade">
                                    <img src="../img/icon-expert icon.png" alt="">
                                    ${answerUsers[0].levelName}
                                </div>
                            </div>
                            <div class="zx-detail-date">${answerUsers[0].counselorDuty}</div>
                        </div>
                    </div>
                    <div class="clist-msg">
                        ${answerUsers[0].content}
                    </div>
                </div>
                <ul class="zxs-range">
                    <li>
                            <span class="inline-block">所属专题：</span>
                            <span class="inline-block">${answerUsers[0].topic||""}</span>
                        </li>
                        <li>
                            <span class="inline-block">所属税种：</span>
                            <span class="inline-block">
                           ${answerUsers[0].tax||""}
                        </span>
                        </li>
                </ul>
                <div class="m-q-f-date box-sizing">${format(answerUsers[0].date)}</div>
                <div class="evaluation-score box-sizing ${on}">
                    <div>
                        评价得分：
                        <div class="inline-block">
                            ${answer_score}
                        </div>
                    </div>
                    <div>${answerUsers[0].appraisal||""}</div>
                </div>
            </div>
        `)
    }
    ajax(http_url.url+"/question/otherQuestion",{"questionUuid":id},get_detail);
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
                        title: "我在航信办税宝回答了一个问题，快来围观。",
                        desc: $(".clist-msg").html(), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/mine-answer.html",
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
    $(".release").click(function(){
        var share_name=$(this).attr("data-name");
        //alert("点击右上角进行分享");$(".shadow").show();
        $(".shadow").show();
        $(".shadow").click(function(){
            $(".shadow").hide();
        })
    });
});