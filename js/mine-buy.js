$(function(){
    var status=getUrlParms("status"),type=getUrlParms("type");
    if(status!=null){
        ajax(http_url.url+"/user/secretly",{"sinceId":count_start,
            "maxId":count_end},get_wg);
        scroll_more(http_url.url+"/user/secretly",{"sinceId":count_start,
            "maxId":count_end},get_wg_more);
        $(".mine_w").addClass("csq-header-change-act");
        $(".mine_v").removeClass("csq-header-change-act");
        $(".mine-buy-header").html("我的围观");
        $(".mine-buy-wg").show();
        $('.mine-buy-video').hide();
    }else{
        if(type=="wg"){
            ajax(http_url.url+"/user/secretly",{"sinceId":count_start,
                "maxId":count_end},get_wg);
            scroll_more(http_url.url+"/user/secretly",{"sinceId":count_start,
                "maxId":count_end},get_wg_more);
            $(".mine_w").addClass("csq-header-change-act");
            $(".mine_v").removeClass("csq-header-change-act");
            $(".mine-buy-header").html("我的围观");
            $(".mine-buy-wg").show();
            $('.mine-buy-video').hide();
        }else{
            ajax(http_url.url+"/video/buylist",{"sinceId":count_start,
                "maxId":count_end},buy_video);
            scroll_more(http_url.url+"/video/buylist",{"sinceId":count_start,
                "maxId":count_end},buy_video_more);
            $(".mine_v").addClass("csq-header-change-act");
            $(".mine_w").removeClass("csq-header-change-act");
            $(".mine-buy-header").html("已购视频");
            $(".mine-buy-video").show();
            $('.mine-buy-wg').hide();
        }

    }
    $(".back").click(function(){
        window.location.href="../html/index-mine.html"
    });
    //已购视频
    function buy_video(data){
        console.log(data);
        var list=data.data,html='';
        if(list==""){
            $(".none-msg").show();
        }else{
            $(".none-msg").hide();
        }
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            var title="";
            if(change_v.title.length>20){
                title=change_v.title.substr(0,20)+"...";
            }else{
                title=change_v.title;
            }
            html+=`
                <div class="inline-block dkft_list">
                    <img class="sp-img" data-id="${change_v.vid}" src="${cover_src+change_v.image}" alt="" onerror=src="../img/ceshi.jpg">
                    <div>${title}</div>
                </div>
            `
        }
        $(".mine-buy-video .dkft-model").html(html);
    }
    function buy_video_more(data){
        // console.log(data);
        var list=data.data,html='';
        if(list!=""){
            for(var i=0,len=list.length;i<len;i++){
                var change_v=list[i];
                var title="";
                if(change_v.title.length>20){
                    title=change_v.title.substr(0,20)+"...";
                }else{
                    title=change_v.title;
                }
                html+=`
                <div class="inline-block dkft_list">
                    <img class="sp-img" data-id="${change_v.vid}" src="${cover_src+change_v.image}" alt="" onerror=src="../img/ceshi.jpg">
                    <div>${title}</div>
                </div>
            `
            }
            $(".mine-buy-video .dkft-model").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    // ajax(http_url.url+"/video/buylist",{"sinceId":count_start,
    //     "maxId":count_end},buy_video);
    // scroll_more(http_url.url+"/video/buylist",{"sinceId":count_start,
    //     "maxId":count_end},buy_video_more);
    //我的围观
    function get_wg(data){
        // console.log(data);
        var questions=data.questions,html='';
        if(questions==""){
            $(".none-msg").show();
        }else{
            $(".none-msg").hide();
        }
        for(var i=0,len=questions.length;i<len;i++){
            var change_v=questions[i];
            var title='';
            if(change_v.content.length>40){
                title=change_v.content.substr(0,40)+"...";
            }else{
                title=change_v.content;
            }
            //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            var img_src="";
            if(change_v.isAnon!=0){
                img_src=headimage(change_v.headImage);
            }
            var realName=get_name(questions[i]);
            var jc_show='out';
            if(change_v.status==9){
                jc_show='';
            }
            html+=`
                <div class="box-sizing" data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img class="look-hp-image" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" src="${img_src}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName.length>10?realName.slice(0,10)+"...":realName}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="inline-block orange wg_jc ${jc_show}">已纠错</div>
                    </div>
                    <div class="clist-msg">
                       ${title}
                    </div>
                    <div class="clist-foot">
                        <div>${format(change_v.date)}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".card-list").html(html);
    }
    function get_wg_more(data){
        // console.log(data);
        var questions=data.questions,html='';
        if(questions!=""){
            for(var i=0,len=questions.length;i<len;i++){
                var change_v=questions[i];
                var title='';
                if(change_v.content.length>40){
                    title=change_v.content.substr(0,40)+"...";
                }else{
                    title=change_v.content;
                }
                //用户等级
                var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
                var img_src="";
                if(change_v.isAnon!=0){
                    img_src=headimage(change_v.headImage);
                }
                var realName=get_name(questions[i]);
                var jc_show='out';
                if(change_v.status==9){
                    jc_show='';
                }
                html+=`
                <div class="box-sizing" data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img class="look-hp-image" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" src="${img_src}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                 ${realName.length>10?realName.slice(0,10)+"...":realName}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="inline-block orange wg_jc ${jc_show}">已纠错</div>
                    </div>
                    <div class="clist-msg">
                       ${title}
                    </div>
                    <div class="clist-foot">
                        <div>${format(change_v.date)}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
            }
            $(".card-list").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    //tab点击
    $(".csq-header-change>div").click(function(){
        scroll_status=true;
        window.scrollTo(0,0);
        $(".csq-header-change>div").removeClass("csq-header-change-act");
        $(this).addClass("csq-header-change-act");
        var code=$(this).attr("data-code");
        count_start=1,count_end=10,num=1;
        if(code==1){//已购视频
            ajax(http_url.url+"/video/buylist",{"sinceId":count_start,
                "maxId":count_end},buy_video);
            scroll_more(http_url.url+"/video/buylist",{"sinceId":count_start,
                "maxId":count_end},buy_video_more);
        }else{//我的围观
            ajax(http_url.url+"/user/secretly",{"sinceId":count_start,
                "maxId":count_end},get_wg);
            scroll_more(http_url.url+"/user/secretly",{"sinceId":count_start,
                "maxId":count_end},get_wg_more);
        }
    });
    //视频点击
    $("body").on("click",".sp-img",function(){
        window.location.href="../html/video.html?vid="+$(this).attr("data-id");
    });
    //围观列表点击
    $("body").on("click",".card-list>div",function(){
        window.location.href="../html/watch-anwser.html?cwatch_id="+$(this).attr("data-id")+"&&status=1";
    });
});