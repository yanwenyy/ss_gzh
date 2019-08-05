$(function(){
    var id=getUrlParms("id");
    function get_detail(data){
        // console.log(data);
        //我的提问
        var questionUserOwnMsg=data.question;
        //用户等级
        var score_img=get_score(questionUserOwnMsg.integralScore,questionUserOwnMsg.aision,questionUserOwnMsg.vip);
        $(".m-q-f-detail .free-user_imgage").attr("src",headimage(questionUserOwnMsg.headImage)).attr("data-phone",questionUserOwnMsg.phoneNumber).attr("data-role",questionUserOwnMsg.role);
        var realName=get_name(questionUserOwnMsg);
        $(".m-q-f-detail .user-name").html(`
             <div class="user-name">
                        ${realName||""}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
             </div>
        `);
        $(".m-q-f-detail .zx-detail-date").html(format(questionUserOwnMsg.date));
        $(".m-q-f-detail .clist-msg").html(questionUserOwnMsg.content);
        $(".m-q-f-detail .zx-detail-city").html(`
            <img src="../img/label.png" alt="">
                ${questionUserOwnMsg.area||""} ${questionUserOwnMsg.quTrade||""}
        `);
        var imgs=questionUserOwnMsg.images,html="";
        if(imgs!=null){
            for(var i=0;i<imgs.length;i++){
                html+=`
               <img src="${question_src+imgs[i]}" alt="">
            `;
            }
            $(".m-q-f-detail .zx-detail-img").html(html);
        }
    }
    ajax(http_url.url+"/question/acceptAnswer",{
        "status":status, "questionUuid":id},get_detail);
    //重新发布点击
    $(".free-release-ques-btn").click(function(){
        ajax(http_url.url+"/question/againReleaseQuestion",{"questionUuid":id},function(data){
            if(data.code==1){
                window.location.href="mine-free-question-list.html";
            }else{
                alert(data.des);
            }
        })
    })
});