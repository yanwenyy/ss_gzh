$(function(){
    function get_fans(data){
        //console.log(data);
        $(".all_fans").html("("+data.data.count+")");
        var fans=data.data.fans,html="";
        if(fans==""){
            $(".none-msg").show();
        }
        for(var i=0;i<fans.length;i++){
            //用户等级
            var score_img=get_score(fans[i].integralScore,fans[i].aision,fans[i].vip);
            var realName=get_name(fans[i]);
            html+=`
                <li class="box-sizing" data-id="${fans[i].uuid}">
                    <img src="${head_src+fans[i].headImage}" alt="" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div>${realName||" "}</div>
                        <div><img class="fans_score"  src="${score_img}" alt=""></div>
                    </div>
                </li>
            `;
        }
        $(".mine-fans-list").html(html);
    }
    function get_fans_more(data){
        $(".all_fans").html("("+data.data.count+")");
        var fans=data.data.fans,html="";
        if(fans!=""){
            for(var i=0;i<fans.length;i++){
                //用户等级
                var score_img=get_score(fans[i].integralScore,fans[i].aision,fans[i].vip);
                var realName=get_name(fans[i]);
                html+=`
                <li class="box-sizing" data-id="${fans[i].uuid}">
                    <img src="${head_src+fans[i].headImage}" alt="" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div>${realName}</div>
                        <div><img class="fans_score" src="${score_img}" alt=""></div>
                    </div>
                </li>
            `;
            }
            $(".mine-fans-list").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/attention/user/fans",{"sinceId":count_start, "maxId":count_end},get_fans);
    scroll_more(http_url.url+"/attention/user/fans",{"sinceId":count_start, "maxId":count_end},get_fans_more);
});