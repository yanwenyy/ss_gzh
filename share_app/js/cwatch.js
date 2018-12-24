$(function(){
    var watch_id=getUrlParms("cwatch_id");
    function get_cwatch(data){
        console.log(data);
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
            $(".cwatch_msg-body").html(`<div class="clist-head">
                <img src="${head_src+questionUser.headImage}" alt="" onerror=src="../img/user.png">
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
            <div class="clist-msg">
                ${questionUser.content}
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
        }else{
            alert(data.des);
        }
    }
    ajax(http_url.url+"/openShareDetails/share",{"uuid":watch_id,"shareType":"shareSecretly"},get_cwatch);
});