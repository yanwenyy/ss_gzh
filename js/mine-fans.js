$(function(){
    var phoneNum=getUrlParms("phoneNum");
    if(phoneNum){
        $(".title-name").html("他的粉丝");
        $(".release").hide();
    }
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
               <li class="box-sizing"  data-id="${fans[i].uuid}">
                    <img data-phone="${fans[i].phoneNumber}" src="${headimage(fans[i].headImage)}" class="look-hp-image"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${fans[i].phoneNumber}" class="inline-block look-hp-image">
                        <div class="inline-block fans-name">${realName||" "}</div>
                        <div class="inline-block ${fans[i].role==2?'fans-dj-msg':'fans-dj'} ">${fans[i].role==2? fans[i].levelName:'<img src="'+score_img+'" alt="">'}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${fans[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${fans[i].role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ fans[i].counselorDuty}</div>
                        </div>
                    </div>
                    <div data-phone="${fans[i].phoneNumber}" class="inline-block attention-fans ${fans[i].follow==1?'each-attention':'gzfs'} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(fans[i].mutual)==1?'':'out'}" alt="">${fans[i].follow==1?(fans[i].mutual==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${fans[i].phoneNumber}"  class="inline-block attention-fans ${Number(fans[i].mutual)==1?'each-attention':'gzfs'} ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(fans[i].mutual)==1?'':'out'}" alt="">${Number(fans[i].mutual)==1?'互关':'+关注'}</div>
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
               <li class="box-sizing"  data-id="${fans[i].uuid}">
                    <img data-phone="${fans[i].phoneNumber}" src="${headimage(fans[i].headImage)}" class="look-hp-image"  alt="" onerror=src="../img/user.png">
                    <div data-phone="${fans[i].phoneNumber}" class="inline-block look-hp-image">
                        <div class="inline-block fans-name">${realName||" "}</div>
                        <div class="inline-block ${fans[i].role==2?'fans-dj-msg':'fans-dj'} ">${fans[i].role==2? fans[i].levelName:'<img src="'+score_img+'" alt="">'}</div>
                        <div class="fans-zw">
                            <div class="inline-block ${fans[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                            <div class="inline-block ${fans[i].role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ fans[i].counselorDuty}</div>
                        </div>
                    </div>
                    <div data-phone="${fans[i].phoneNumber}" class="inline-block attention-fans ${fans[i].follow==1?'each-attention':'gzfs'} ${phoneNum?'':'out'}"><img src="../img/hg.png" class="hg-fans ${Number(fans[i].mutual)==1?'':'out'}" alt="">${fans[i].follow==1?(fans[i].mutual==1?'互关':'已关注'):'+关注'}</div>
                    <div data-phone="${fans[i].phoneNumber}"  class="inline-block attention-fans ${Number(fans[i].mutual)==1?'each-attention':'gzfs'} ${phoneNum?'out':''}"><img src="../img/hg.png" class="hg-fans ${Number(fans[i].mutual)==1?'':'out'}" alt="">${Number(fans[i].mutual)==1?'互关':'+关注'}</div>
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
    $("body").on("click",".gzfs",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
            alert(data.des);
            if(data.code==1){
                that.addClass("each-attention").removeClass("gzfs").html("已关注");
            }
        })
    });
});