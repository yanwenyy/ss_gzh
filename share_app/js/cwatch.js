$(function(){
    var watch_id=getUrlParms("cwatch_id"),s=1,e=5;
    function get_cwatch(data){
        // console.log(data);
        if(data.code==1){
            var questionUser=data,
                questionUser_createDate=format(questionUser.date);
            var score_img='';
            if(0<questionUser.integralScore<=1){
                score_img="../img/icon-onlooked-member.png"
            }else if(1<questionUser.integralScore<=6){
                score_img="../img/icon-onlooked-copper member.png"
            }else if(6<questionUser.integralScore<=20){
                score_img="../img/icon-onlooked-silver member.png"
            }else if(20<questionUser.integralScore<=50){
                score_img="../img/icon-onlooked-gold member.png"
            }else if(50<questionUser.integralScore<=100){
                score_img="../img/icon-onlooked-platinum-member.png"
            }else if(100<questionUser.integralScore<=500){
                score_img="../img/icon-onlooked-diamonds member.png"
            }
            var user_answer_img=questionUser.images,ans_html="";
            if(questionUser.images!=null){
                for(var i=0;i<user_answer_img.length;i++){
                    ans_html+=`
                 <img class="img_look" src="${question_src+user_answer_img[i]}" alt="">
            `;
                }
            }
            $(".cwatch_msg-body").html(`<div class="clist-head">
                <img src="${headimage(questionUser.headImage)}" alt="" onerror=src="../img/user.png">
                <div class="inline-block">
                    <div class="user-name">
                        ${questionUser.realName||""}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
                    </div>
                    <div class="zx-detail-date">${questionUser_createDate}</div>
                </div>
            </div>
            <div class="clist-msg clist-msg-q">
                ${questionUser.content}
            </div>
            <div class="zx-detail-img">
                ${ans_html}
            </div>
            <div class="zx-detail-city wacth-city">
                <div class="inline-block">
                    <img src="../img/label.png" alt="">
                    ${questionUser.area||""}
                </div>
                <div class="wacth-num inline-block">
                    <span>点赞<span class="dz-num">${questionUser.approveNum}</span></span>
                    <span>围观<span class="wg-num">${questionUser.lookNum}</span></span>
                </div>
            </div>
            `);
            $(".watch-answer-expert").html(`
                <div class="clist-head">
                    <img src="${headimage(data.answerUser.headImage)}" alt="">
                    <div class="inline-block">
                        <div class="user-name ${data.answerUser.role==2?'':'out'}">
                            ${get_name(data.answerUser)}
                            <div class="inline-block zxs-grade">
                                <img src="../img/fans-zxs.png" alt="">
                                ${data.answerUser.levelName||''}
                            </div>
                        </div>
                        <div class="user-name ${data.answerUser.role==1?'':'out'}">
                            ${get_name(data.answerUser)}
                            <div class="user-grade inline-block zx-detail-grade">
                                <img src="${get_score(data.answerUser.integralScore,data.answerUser.aision,data.answerUser.vip)}" alt="">
                            </div>
                        </div>
                        <div class="zx-detail-date ${data.answerUser.role==2?'':'out'}">${data.answerUser.counselorDuty||''}</div>
                    </div>
                   <div class="adopt"><img src='../img/best-answer.png'></div>
                </div>
                <div class="clist-msg">
                    ${data.answerUser.content.length>23?data.answerUser.content.slice(0,23):data.answerUser.content}
                </div>
                 <div class="card-hd-look-more share-downloade"><img src="../img/icon_down.png" alt=""></div>
            `);
            $(".attention-zj").html(`
               <img src="${headimage(data.answerUser.headImage)}" alt="">
               <div class="inline-block">
                        <div class="user-name ${data.answerUser.role==2?'':'out'}">
                            ${get_name(data.answerUser)}
                            <div class="inline-block zxs-grade">
                                <img src="../img/fans-zxs.png" alt="">
                                ${data.answerUser.levelName||''}
                            </div>
                        </div>
                        <div class="user-name ${data.answerUser.role==1?'':'out'}">
                            ${get_name(data.answerUser)}
                            <div class="user-grade inline-block zx-detail-grade">
                                <img src="${get_score(data.answerUser.integralScore,data.answerUser.aision,data.answerUser.vip)}" alt="">
                            </div>
                        </div>
                        <div class="zx-detail-date ${data.answerUser.role==2?'':'out'}">${data.answerUser.counselorDuty||''}</div>
                 </div>
                <div class="inline-block attention-zj-btn share-downloade">+关注</div> 
            `)
        }else{
            alert(data.des);
        }
    }
    ajax(http_url.url+"/openShareDetails/share",{"uuid":watch_id,"shareType":"shareSecretly"},get_cwatch);
    //最热问答
    function hot(start,end){
        ajax(http_url.url+"/share/questionhot/share",{
            "maxId":end,
            "sinceId":start
        },function(data){
            // console.log(data);
            var html='';
            for(var i=0;i<data.data.length;i++){
                html+=`
                     <div class="share-downloade">
                        <div class="index-new-zxwd-list-msg">
                        <div class="inline-block">
                        ${data.data[i].content.length>44?data.data[i].content.slice(0,44)+"...":data.data[i].content}
                        </div>
                        </div>
                        <div class="index-new-zxwd-list-footer">
                        <img src="${headimage(data.data[i].headImage)}" onerror=src="../img/user.png" alt="">
                        <div class="inline-block">${get_name(data.data[i])}</div>
                        <div class="inline-block index-new-zxwd-list-footer-wg">围观 ${data.data[i].lookNum}</div>
                        </div>
                    </div>
                `
            }
            $(".hot-wg").html(html);
        })
    }
    hot(s,e);
    ajax(http_url.url+"/share/hottopic/share",{
        "maxId":5,
        "sinceId":1
    },function(data){
        if(data.code==1){
            var html='';
            $(".grsds_name").html(data.des);
            for(var i=0;i<data.data.length;i++){
                html+=`
                     <div class="share-downloade">
                        <div class="index-new-zxwd-list-msg">
                        <div class="inline-block">
                       ${data.data[i].content.length>44?data.data[i].content.slice(0,44)+"...":data.data[i].content}
                        </div>
                        </div>
                        <div class="index-new-zxwd-list-footer">
                        <img src="${headimage(data.data[i].headImage)}" onerror=src="../img/user.png" alt="">
                        <div class="inline-block">${get_name(data.data[i])}</div>
                        <div class="inline-block index-new-zxwd-list-footer-wg">围观 ${data.data[i].lookNum}</div>
                        </div>
                    </div>
                `
            }
            $(".hot-topic").html(html);
        }else{
            alert(data.des);
        }
    });
    //换一批点击
    $(".hot_change").click(function(){
        if(s==1){
            hot(s,e);
            s=6;e=10;
        }else{
            hot(s,e);
            s=1;e=5;
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
                        title: "专家详解：你该了解的财税知识",
                        desc: $.trim($(".clist-msg-q").text()), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/cwatch.html?cwatch_id="+watch_id,
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