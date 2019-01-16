$(function(){
    var csq_id=getUrlParms("uuid");
    function get_reward(data){
        //console.log(data);
        var redEnvelopesArticleUser=data.OnLookCountDetail,html="";
        for(var i=0;i<redEnvelopesArticleUser.length;i++){
            var date=redEnvelopesArticleUser[i].onLookTime,level,hg_img;
            if(redEnvelopesArticleUser[i].role==1){
                level=redEnvelopesArticleUser[i].position;
                hg_img="";
            }else{
                level=redEnvelopesArticleUser[i].levelName;
                hg_img="../img/icon-expert icon.png";
            }
            var realName=get_name(redEnvelopesArticleUser[i]);
            var counselorDuty="";
            if(redEnvelopesArticleUser[i].role==2){
                counselorDuty=redEnvelopesArticleUser[i].counselorDuty;
            }
            html+=`
            <div class="box-sizing">
        <img src="${head_src+redEnvelopesArticleUser[i].headImage}" alt="" onerror=src="../img/user.png">
        <div class="inline-block attention-export-msg">
            <div>
                <span>${realName||"匿名用户"}</span>
                <img src="${hg_img}" alt="">
                <span> ${level||""}</span>
            </div>
            <div>${counselorDuty||""}</div>
        </div>
        <div class="reworad_money">
            <div>+${parseFloat( redEnvelopesArticleUser[i].onLookMoney).toFixed(2)}元</div>
            <div>${date}</div>
        </div>
    </div>
           `;
        }
        $(".mine-attention").html(html);
    }
    function get_reward_more(data){
        //console.log(data);
        var redEnvelopesArticleUser=data.OnLookCountDetail,html="";
        if(redEnvelopesArticleUser!=""){
            for(var i=0;i<redEnvelopesArticleUser.length;i++){
                var date=redEnvelopesArticleUser[i].onLookTime,level,hg_img;
                if(redEnvelopesArticleUser[i].role==1){
                    level=redEnvelopesArticleUser[i].position;
                    hg_img="";
                }else{
                    level=redEnvelopesArticleUser[i].levelName;
                    hg_img="../img/icon-expert icon.png";
                }
                var realName=get_name(redEnvelopesArticleUser[i]);
                var counselorDuty="";
                if(redEnvelopesArticleUser[i].role==2){
                    counselorDuty=redEnvelopesArticleUser[i].counselorDuty;
                }
                html+=`
            <div class="box-sizing">
        <img src="${head_src+redEnvelopesArticleUser[i].headImage}" alt="" onerror=src="../img/user.png">
        <div class="inline-block attention-export-msg">
            <div>
                <span>${realName||"匿名用户"}</span>
                <img src="${hg_img}" alt="">
                <span> ${level||""}</span>
            </div>
            <div>${counselorDuty||""}</div>
        </div>
        <div class="reworad_money">
            <div>+${parseFloat( redEnvelopesArticleUser[i].onLookMoney).toFixed(2)}元</div>
            <div>${date}</div>
        </div>
    </div>
           `;
            }
            $(".mine-attention").append(html);
            $(".msg-loading").hide();
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/onlook/onlookCountDetailList",{"questionUuid":csq_id,"sinceId":count_start, "maxId":count_end},get_reward);
    scroll_more(http_url.url+"/onlook/onlookCountDetailList",{"questionUuid":csq_id,"sinceId":count_start, "maxId":count_end},get_reward_more);
});