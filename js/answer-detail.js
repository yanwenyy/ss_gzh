$(function(){
    var id=getUrlParms("id");
    //回答者信息
    function get_ques(data){
        
        console.log(data);
        var questionUserOwnMsg=data.data;
        //用户等级
        var score_img=get_score(questionUserOwnMsg.integralScore,questionUserOwnMsg.aision,questionUserOwnMsg.vip);
        $(".look-hp-image").attr("src",head_src+questionUserOwnMsg.headImage).attr("data-phone",questionUserOwnMsg.phoneNumber).attr("data-role",questionUserOwnMsg.role);
        var realName=get_name(questionUserOwnMsg);
        $(".user-name").html(`
             <div class="user-name">
                        ${realName||"匿名用户"}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
             </div>
        `);
        $(".zx-detail-date").html(format(questionUserOwnMsg.date));
        $(".clist-msg").html(questionUserOwnMsg.content);
        $(".zx-detail-city").html(`
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
        }
        $(".zx-detail-img").html(html);
    }
    ajax(http_url.url+"/answer/grab/details/question",{"uuid":id},get_ques);
    //抢答按钮点击
    $(".answer-btn").click(function(){
        //抢答
        function get_choice(data){
            console.log(data);
            if(data.code==1){
                alert(data.des);
                window.location.href="../html/answer.html?id="+id;
            }else{
                alert(data.des);
            }
        }
        if(confirm("抢答成功后，必须认真作答，否则答题页面无法退出且有可能遭到用户投诉，确认抢答吗？")==true){
            ajax(http_url.url+"/answer/grabAnswer",{"uuid":id},get_choice);
        }else{
            return false;
        }

    });
});