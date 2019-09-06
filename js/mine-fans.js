$(function(){
    var phoneNum=getUrlParms("phoneNum");
    if(phoneNum){
        $(".title-name").html("他的粉丝");
        $("title").html("他的粉丝");
        $(".release").hide();
    }
    function get_fans(data){
        //console.log(data);
        $(".all_fans").html("("+data.data.count+")");
        var fans=data.data.fans,html="";
        if(fans==""){
            $(".none-msg").show();
        }
        for(var i=0,len=fans.length;i<len;i++){
            var change_v=fans[i];
            //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            var realName=get_name(change_v);

            html+=`
               <li class="box-sizing"  data-id="${change_v.uuid}">
                    <img data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${change_v.phoneNumber}" data-role="${change_v.role}" class="inline-block look-hp-image fans-name-div">
                        <div class="inline-block fans-name">${realName.length>27?realName.slice(0,27)+"...":realName||" "}</div>
                        <div class="inline-block ${change_v.role!=3? '':'out'} ${change_v.role==2?'fans-dj-msg':'fans-dj'} ">${change_v.role==2? change_v.levelName:'<img src="'+score_img+'" alt="">'}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                            <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                        </div>
                    </div>
                    <div data-phone="${change_v.phoneNumber}" class="inline-block attention-fans ${change_v.follow==1?'each-attention':'gzfs'} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${change_v.follow==1?(change_v.mutual==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${change_v.phoneNumber}"  class="inline-block attention-fans ${Number(change_v.mutual)==1?'each-attention':'gzfs'} ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${Number(change_v.mutual)==1?'互关':'+关注'}</div>
                </li>
            `;
        }
        $(".mine-fans-list").html(html);
    }
    function get_fans_more(data){
        $(".all_fans").html("("+data.data.count+")");
        var fans=data.data.fans,html="";
        if(fans!=""){
            for(var i=0,len=fans.length;i<len;i++){
                var change_v=fans[i];
                //用户等级
                var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
                var realName=get_name(change_v);

                html+=`
               <li class="box-sizing"  data-id="${change_v.uuid}">
                    <img data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${change_v.phoneNumber}" data-role="${change_v.role}" class="inline-block look-hp-image fans-name-div">
                        <div class="inline-block fans-name">${realName.length>27?realName.slice(0,27)+"...":realName||" "}</div>
                        <div class="inline-block ${change_v.role!=3? '':'out'} ${change_v.role==2?'fans-dj-msg':'fans-dj'} ">${change_v.role==2? change_v.levelName:'<img src="'+score_img+'" alt="">'}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                            <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                        </div>
                    </div>
                    <div data-phone="${change_v.phoneNumber}" class="inline-block attention-fans ${change_v.follow==1?'each-attention':'gzfs'} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${change_v.follow==1?(change_v.mutual==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${change_v.phoneNumber}"  class="inline-block attention-fans ${Number(change_v.mutual)==1?'each-attention':'gzfs'} ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${Number(change_v.mutual)==1?'互关':'+关注'}</div>
                </li>
            `;
            }
            $(".mine-fans-list").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/attention/user/fans/v2",{"sinceId":count_start, "maxId":count_end,"phoneNum":phoneNum||''},get_fans);
    scroll_more(http_url.url+"/attention/user/fans/v2",{"sinceId":count_start, "maxId":count_end,"phoneNum":phoneNum||''},get_fans_more);
    //关注按钮点击
    $("body").on("click",".attention-fans",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        if($(this).html().indexOf("+关注")!=-1){
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
                    that.removeClass("each-attention").html("+关注");
                }else{
                    alert(data.des);
                }
            }
            if(confirm("确定不再关注吗?")==true){
                ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":0},cancel_attention)
            }
        }
    });
});