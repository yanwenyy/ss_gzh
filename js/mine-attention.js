$(function(){
    var phoneNum=getUrlParms("phoneNum");
    if(phoneNum){
        $(".title-name").html("他的关注");
        $(".release").hide();
    }
    //关注列表
    function get_attention(data){
        // console.log(data);
        var attentionUser=data.data,html="";
        if(attentionUser==""){
            $(".none-msg").show();
        }
        for(var i=0,len=attentionUser.length;i<len;i++){
            var change_v=attentionUser[i];
            //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            var realName=get_name(change_v);
            html+=`
               <li class="box-sizing"  data-id="${change_v.uuid}">
                    <img data-phone="${change_v.phoneNumber}" data-role="${change_v.role}" class="look-hp-image" src="${headimage(change_v.headImage)}"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${change_v.phoneNumber}" data-role="${change_v.role}" class="inline-block look-hp-image fans-name-div">
                        <div class="inline-block fans-name">${realName.length>27?realName.slice(0,27)+"...":realName||" "}</div>
                        <div class="inline-block ${change_v.role!=3? '':'out'} ${change_v.role==2?'fans-dj-msg':'fans-dj'} ">${change_v.role==2? change_v.levelName:`<img src='${score_img}' alt=''>`}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                            <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                        </div>
                    </div>
                    <div data-phone="${change_v.phoneNumber}"  class="inline-block attention-fans ${Number(change_v.follow)==1?'each-attention':''} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${Number(change_v.follow)==1?(Number(change_v.mutual)==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${change_v.phoneNumber}"  class="inline-block attention-fans each-attention ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${Number(change_v.mutual)==1?'互关':'已关注'}</div>
                </li>
            `;
        }
        $(".mine-attention>ul").html(html);
    }
    function get_attention_more(data){
        //console.log(data);
        var attentionUser=data.data,html="";
        if(attentionUser!=""){
            for(var i=0,len=attentionUser.length;i<len;i++){
                var change_v=attentionUser[i];
                //用户等级
                var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
                var realName=get_name(change_v);
                html+=`
               <li class="box-sizing"  data-id="${change_v.uuid}">
                    <img data-phone="${change_v.phoneNumber}" data-role="${change_v.role}" class="look-hp-image" src="${headimage(change_v.headImage)}"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${change_v.phoneNumber}" data-role="${change_v.role}" class="inline-block look-hp-image fans-name-div">
                        <div class="inline-block fans-name">${realName.length>27?realName.slice(0,27)+"...":realName||" "}</div>
                        <div class="inline-block ${change_v.role!=3? '':'out'} ${change_v.role==2?'fans-dj-msg':'fans-dj'} ">${change_v.role==2? change_v.levelName:`<img src='${score_img}' alt=''>`}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                            <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                        </div>
                    </div>
                    <div data-phone="${change_v.phoneNumber}"  class="inline-block attention-fans ${Number(change_v.follow)==1?'each-attention':''} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${Number(change_v.follow)==1?(Number(change_v.mutual)==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${change_v.phoneNumber}"  class="inline-block attention-fans each-attention ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${Number(change_v.mutual)==1?'互关':'已关注'}</div>
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