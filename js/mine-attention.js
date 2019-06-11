$(function(){
    //关注列表
    function get_attention(data){
        console.log(data);
        var attentionUser=data.attentionUser,html="";
        if(attentionUser==""){
            $(".none-msg").show();
        }
        for(var i=0;i<attentionUser.length;i++){
            var realName=get_name(attentionUser[i]);
            html+=`
                <div class="box-sizing" data-phone="${attentionUser[i].phoneNumber}">
                    <img  data-phone="${attentionUser[i].phoneNumber}" src="${head_src+attentionUser[i].headImage}" alt="" onerror=src="../img/user.png">
                    <div class="inline-block attention-export-msg"  data-phone="${attentionUser[i].phoneNumber}">
                        <div>
                            <span>${realName||""}</span>
                            <img src="../img/icon-expert icon.png" alt="">
                            <span> ${attentionUser[i].levelName||""}</span>
                        </div>
                        <div> ${attentionUser[i].counselorDuty||""}</div>
                    </div>
                    <div class="attention-btn" data-id="${attentionUser[i].uuid}" data-phone="${attentionUser[i].phoneNumber}">取消关注</div>
                </div>
            `;
        }
        $(".mine-attention").html(html);
    }
    function get_attention_more(data){
        //console.log(data);
        var attentionUser=data.attentionUser,html="";
        if(attentionUser!=""){
            for(var i=0;i<attentionUser.length;i++){
                var realName=get_name(attentionUser[i]);
                html+=`
                <div class="box-sizing"  data-phone="${attentionUser[i].phoneNumber}">
                    <img  data-phone="${attentionUser[i].phoneNumber}" src="${head_src+attentionUser[i].headImage}" alt="" onerror=src="../img/user.png">
                    <div class="inline-block attention-export-msg"  data-phone="${attentionUser[i].phoneNumber}">
                        <div>
                            <span>${realName||""}</span>
                            <img src="../img/icon-expert icon.png" alt="">
                            <span> ${attentionUser[i].levelName||""}</span>
                        </div>
                        <div> ${attentionUser[i].counselorDuty||""}</div>
                    </div>
                    <div class="attention-btn" data-id="${attentionUser[i].uuid}" data-phone="${attentionUser[i].phoneNumber}">取消关注</div>
                </div>
            `;
            }
            $(".mine-attention").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/attention/allUser",{"sinceId":count_start, "maxId":count_end},get_attention);
    scroll_more(http_url.url+"/attention/allUser",{"sinceId":count_start, "maxId":count_end},get_attention_more);
    //取消关注
    $("body").on("click",".attention-btn",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        function cancel_attention(data){
            //console.log(data);
            if(data.code==1){
                alert(data.des);
                that.parent().remove();
            }
        }
            ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":0},cancel_attention)
    });
    //关注列表点击
    $("body").on("click",".mine-attention>div>.attention-export-msg",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="../html/expert-home-page.html?phone="+phone;
    });
    $("body").on("click",".mine-attention>div>img",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="../html/expert-home-page.html?phone="+phone;
    })
});