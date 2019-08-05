$(function(){
    var watch_id=getUrlParms("cwatch_id");
    function get_cwatch(data){
        // console.log(data);
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
                <img src="${headimage(questionUser.headImage)}" alt="" onerror=src="../img/user.png">
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
            `);

    }
    ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+watch_id,get_cwatch);
    //围观人员列表
    function get_wg(data){
        console.log(data);
        var OnLookCountDetail=data.OnLookCountDetail,html='';
        for(var i=0;i<8;i++){
            var v_html='';
            if(OnLookCountDetail[i]){
                v_html=`
                <img src="${headimage(OnLookCountDetail[i].headImage)}" alt="" onerror=src="../img/user.png" >`;
            }else{
                v_html='<img src="../img/csq-moren.png" alt="">'
            }
            html+=v_html;
        }
        $(".look-peo-img").html(html);
        $('.look-number').html(data.OnLookCount);
    }
    ajax(http_url.url+"/onlook/onlookCountDetailList",{
        "sinceId":"1",
        "maxId":"8",
        "questionUuid":watch_id},get_wg);
    //支付按钮点击
    $("body").on("click",".answer-btn",function(){
        // window.location.href="watch-pay.html?price=1&&watch_id="+watch_id;
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fwatch_id%3d"+watch_id+"%26%26price%3d1&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    });
    //围观详情点击
    $("body").on("click",".wacth-people-deatial",function(){
        window.location.href="wacth-people-list.html?uuid="+watch_id;

    });
    //开通365点击
    $(".kt-365-watch").click(function(){
        ajax_nodata(http_url.url+"/user/message",function(data){
            //是否是365会员
            if(data.tsfTime!=null&&data.tsfTime!=''){
                window.location.href="mine-365-card.html?time="+data.tsfTime;
            }else{
                window.location.href="mine-365-card.html?open=yes"
            }
        });

    });
    //回答者信息
    function get_answer(data){
        //console.log(data);
        var html="";
        if(data.userMsg.role==1){
            html=`<img src="${headimage(data.userMsg.headImage)}" onerror=src="../img/user.png" alt="">
                <div class="inline-block">
                    <div class="user-name">
                        ${data.userMsg.realName||"匿名用户"}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${get_score(data.userMsg.integralSum,data.userMsg.aision,data.userMsg.vip)}" alt="">
                        </div>
                    </div>
                </div>`;
        }else{
            html=`<img src="${headimage(data.userMsg.headImage)}" onerror=src="../img/user.png" alt="">
                <div class="inline-block">
                    <div class="user-name">
                    ${data.userMsg.userName}
                        <div class="inline-block zxs-grade">
                        <img src="../img/icon-expert icon.png" alt="">
                        ${data.userMsg.levelName}
                        </div>
                    </div>
                    <div class="zx-detail-date">${data.userMsg.counselorDuty}</div>
                </div>`;
        }
        $(".cwath-anser-body .clist-head").html(html);
    }
    ajax(http_url.url+"/user/someUserMsg",{"questionUuid":watch_id},get_answer);
    //免费围观点击
    $(".answer-btn-free").click(function(){
        ajax_nodata(http_url.url+"videoAdvertising",function(data){
            console.log(data);
            if(data.code==1){
                window.location.href="free-video.html?uuid="+watch_id+"&vid="+data.id;
            }
        })
    })
});