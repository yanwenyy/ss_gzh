$(function(){
    var watch_id=getUrlParms("cwatch_id");
    function get_cwatch(data){
        console.log(data);
        var questionUser=data.questionUser,
            questionUser_createDate=format(questionUser.date);
        //用户等级
        var score_img=get_score(questionUser.integralScore,questionUser.aision,questionUser.vip);
        var user_answer_img=questionUser.images,ans_html="";
        if(questionUser.images!=null){
            for(var i=0;i<user_answer_img.length;i++){
                ans_html+=`
                 <img class="img_look" src="${question_src+user_answer_img[i]}" alt="">
            `;
            }
        }
        var realName=get_name(questionUser);
        $(".cwatch_msg-body").html(`<div class="clist-head">
                <img src="${head_src+questionUser.headImage}" alt="" onerror=src="../img/user.png">
                <div class="inline-block">
                    <div class="user-name">
                        ${realName||"匿名用户"}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
                    </div>
                    <div class="zx-detail-date">${questionUser_createDate}</div>
                </div>
            </div>
            <div class="clist-msg">
                ${questionUser.content}
            </div>
            <div class="zx-detail-img">
                ${ans_html}
            </div>
            <div class="zx-detail-city wacth-city">
                <div class="inline-block">
                    <img src="../img/label.png" alt="">
                    ${questionUser.area||""} ${questionUser.quTrade||""}
                </div>
                <div class="wacth-num inline-block">
                    <span>点赞<span class="dz-num">${questionUser.approveNum}</span></span>
                    <span>围观<span class="wg-num">${questionUser.lookNum}</span></span>
                </div>
            </div>
            <div class="answer-btn box-sizing">立即支付</div>`);

    }
    ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+watch_id,get_cwatch);
    //支付按钮点击
    $("body").on("click",".answer-btn",function(){
        // window.location.href="watch-pay.html?price=1&&watch_id="+watch_id;
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fwatch_id%3d"+watch_id+"%26%26price%3d1&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    });
});