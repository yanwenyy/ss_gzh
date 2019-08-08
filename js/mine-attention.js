$(function(){
    var phoneNum=getUrlParms("phoneNum");
    if(phoneNum){
        $(".title-name").html("他的关注");
        $(".release").hide();
    }
    //关注列表
    function get_attention(data){
        console.log(data);
        var attentionUser=data.data,html="";
        if(attentionUser==""){
            $(".none-msg").show();
        }
        for(var i=0;i<attentionUser.length;i++){
            //用户等级
            var score_img=get_score(attentionUser[i].integralScore,attentionUser[i].aision,attentionUser[i].vip);
            var realName=get_name(attentionUser[i]);
            html+=`
               <li class="box-sizing"  data-id="${attentionUser[i].uuid}">
                    <img data-phone="${attentionUser[i].phoneNumber}" class="look-hp-image" src="${headimage(attentionUser[i].headImage)}"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${attentionUser[i].phoneNumber}" class="inline-block look-hp-image">
                        <div class="inline-block fans-name">${realName||" "}</div>
                        <div class="inline-block ${attentionUser[i].role==2?'fans-dj-msg':'fans-dj'} ">${attentionUser[i].role==2? attentionUser[i].levelName:`<img src='${score_img}' alt=''>`}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${attentionUser[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${attentionUser[i].role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ attentionUser[i].counselorDuty}</div>
                        </div>
                    </div>
                    <div data-phone="${attentionUser[i].phoneNumber}"  class="inline-block attention-fans ${Number(attentionUser[i].follow)==1?'each-attention':''} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(attentionUser[i].mutual)==1?'':'out'}" alt="">${Number(attentionUser[i].follow)==1?(Number(attentionUser[i].mutual)==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${attentionUser[i].phoneNumber}"  class="inline-block attention-fans each-attention ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(attentionUser[i].mutual)==1?'':'out'}" alt="">${Number(attentionUser[i].mutual)==1?'互关':'已关注'}</div>
                </li>
            `;
        }
        $(".mine-attention>ul").html(html);
    }
    function get_attention_more(data){
        //console.log(data);
        var attentionUser=data.data,html="";
        if(attentionUser!=""){
            for(var i=0;i<attentionUser.length;i++){
                var realName=get_name(attentionUser[i]);
                html+=`
               <li class="box-sizing"  data-id="${attentionUser[i].uuid}">
                    <img data-phone="${attentionUser[i].phoneNumber}" class="look-hp-image" src="${headimage(attentionUser[i].headImage)}"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${attentionUser[i].phoneNumber}" class="inline-block look-hp-image">
                        <div class="inline-block fans-name">${realName||" "}</div>
                        <div class="inline-block ${attentionUser[i].role==2?'fans-dj-msg':'fans-dj'} ">${attentionUser[i].role==2? attentionUser[i].levelName:`<img src='${score_img}' alt=''>`}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${attentionUser[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${attentionUser[i].role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ attentionUser[i].counselorDuty}</div>
                        </div>
                    </div>
                    <div class="inline-block attention-fans ${Number(attentionUser[i].follow)==1?'each-attention':''} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(attentionUser[i].mutual)==1?'':'out'}" alt="">${Number(attentionUser[i].follow)==1?(Number(attentionUser[i].mutual)==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${attentionUser[i].phoneNumber}"  class="inline-block attention-fans each-attention ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(attentionUser[i].mutual)==1?'':'out'}" alt="">${Number(attentionUser[i].mutual)==1?'互关':'已关注'}</div>
                </li>
            `;
            }
            $(".mine-attention>ul").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/attention/allUser/v2",{"sinceId":count_start, "maxId":count_end,"phoneNum":phoneNum||''},get_attention);
    scroll_more(http_url.url+"/attention/allUser/v2",{"sinceId":count_start, "maxId":count_end,"phoneNum":phoneNum||''},get_attention_more);
    //取消关注
    $("body").on("click",".attention-fans",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        if($(this).html()=="+关注"){
            ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
                alert(data.des);
                if(data.code==1){
                    that.addClass("each-attention").html("已关注");
                }
            })
        }else{
            function cancel_attention(data){
                //console.log(data);
                if(data.code==1){
                    alert(data.des);
                    that.parent().remove();
                }else{
                    alert(data.des);
                }
            }
            if(confirm("确定不再关注吗?")==true){
                ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":0},cancel_attention)
            }
        }

    });
    //关注列表点击
    $("body").on("click",".mine-attention>div>.attention-export-msg",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="../html/personal-new.html?phone="+phone;
    });
    $("body").on("click",".mine-attention>div>img",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="../html/personal-new.html?phone="+phone;
    });
    //添加好友点击
    $(".release").click(function(){
        window.location.href="mine-fans-add.html";
    })
});