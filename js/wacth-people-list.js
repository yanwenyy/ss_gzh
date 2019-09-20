$(function(){
    var csq_id=getUrlParms("uuid");
    function get_reward(data){
        //console.log(data);
        var redEnvelopesArticleUser=data.OnLookCountDetail,html="";
        for(var i=0,len=redEnvelopesArticleUser.length;i<len;i++){
            var change_v=redEnvelopesArticleUser[i],date=change_v.onLookTime,level,hg_img;
            if(change_v.role==1){
                level=change_v.position;
                hg_img="";
            }else if(change_v.role==2){
                level=change_v.levelName;
                hg_img="../img/icon-expert icon.png";
            }else if(change_v.role==3){
                level='';
                hg_img="";
            }
            var realName=get_name(redEnvelopesArticleUser[i]);
            var counselorDuty="";
            if(change_v.role==2){
                counselorDuty=change_v.counselorDuty;
            }
            html+=`
            <div class="box-sizing">
                <img src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" alt="" onerror=src="../img/user.png">
                <div class="inline-block attention-export-msg">
                    <div>
                        <span>${realName.length>13?realName.slice(0,13)+"...":realName||"匿名用户"}</span>
                        <img src="${hg_img}" alt="">
                        <span> ${level||""}</span>
                    </div>
                    <div>${counselorDuty||""}</div>
                    <div class="fans-zw ${change_v.role==3?'':'out'}">
                        <div class="inline-block"><img src="../img/office-icon.png" alt="">官方认证</div>
                    </div>
                </div>
                <div class="reworad_money">
                    <div>+${parseFloat( change_v.onLookMoney).toFixed(2)}元</div>
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
            for(var i=0,len=redEnvelopesArticleUser.length;i<len;i++){
                var change_v=redEnvelopesArticleUser[i],date=change_v.onLookTime,level,hg_img;
                if(change_v.role==1){
                    level=change_v.position;
                    hg_img="";
                }else if(change_v.role==2){
                    level=change_v.levelName;
                    hg_img="../img/icon-expert icon.png";
                }else if(change_v.role==3){
                    level='';
                    hg_img="";
                }
                var realName=get_name(redEnvelopesArticleUser[i]);
                var counselorDuty="";
                if(change_v.role==2){
                    counselorDuty=change_v.counselorDuty;
                }
                html+=`
            <div class="box-sizing">
                <img src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" alt="" onerror=src="../img/user.png">
                <div class="inline-block attention-export-msg">
                    <div>
                        <span>${realName.length>13?realName.slice(0,13)+"...":realName||"匿名用户"}</span>
                        <img src="${hg_img}" alt="">
                        <span> ${level||""}</span>
                    </div>
                    <div>${counselorDuty||""}</div>
                    <div class="fans-zw ${change_v.role==3?'':'out'}">
                        <div class="inline-block"><img src="../img/office-icon.png" alt="">官方认证</div>
                    </div>
                </div>
                <div class="reworad_money">
                    <div>+${parseFloat( change_v.onLookMoney).toFixed(2)}元</div>
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