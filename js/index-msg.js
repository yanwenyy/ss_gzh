
$(function(){
    var icode = getUrlParms("icode"),newuser=getUrlParms("newuser");
    var hot_count_start=1,hot_count_end=5,recommend_count_start=1,recommend_count_end=5;
    //是否新用户
    if(newuser){
        $(".down-app-model").show();
    }
    //是否航信
    function if_hangxin(data){
        // console.log(data);
        if(data.aision==0){
            $(".mfw>img").attr("src","../img/hangxin-ask.png");
        }else if(data.aision==2){
            $(".mfw>img").attr("src","../img/gshy-ask.png");
        }
    }
    ajax_nodata(http_url.url+"/user/sectionMessage",if_hangxin);
    //轮播图
    function get_lunbo(data){
        // console.log(data);
        if(data.code!=1&&data.code!=2){
            alert(data.des);
            return;
        }
        var rotations=data.rotations,rotationImageUrl=data.rotationImageUrl;
        var html='';
        for(var i=0;i<rotations.length;i++){
            html+='<div class="swiper-slide ymmd-click" data-md-name="'+rotations[i].image+'"><a href="'+rotations[i].imageLink+'"><img src="'+http_url.url+rotationImageUrl+rotations[i].image+'" data-id="'+rotations[i].uuid+'" data-name="'+rotations[i].image+' alt=""></a></div>'
        }
        $(".s2>.swiper-wrapper").html(html);
    }
    ajax_nodata(http_url.url+'/rotation/display',get_lunbo);
    //通告消息
    var scroll=0,num=0;
    function get_notice(data){
        console.log(data);
        var data=data.datas,html='';
        for(var i=0;i<data.length;i++){
            html+=`<li class="notice-li">
                        <img src="${head_src+data[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">用户${data[i].peepName}围观了一个问题</div>
                    </li>`
        }
        $(".notice-ul").html(html);
        setInterval(function(){
            if(num==$(".notice-li").size()-1){
                scroll=0,num=-1;
                $(".notice-ul").css("top","0px");
            }
            num+=1;
            scroll=-num*4;
            // $("ul").css("top",scroll+"px");
            $(".notice-ul").animate({top:scroll+"rem"},"normal","linear");
            // 某些定时器操作
        }, 2000);
    }
    ajax_nodata(http_url.url+"/indexOnLookQ",get_notice);
    //专题内容
    function get_grsd(data){
        // console.log(data);
        var columnRecom=data.columnRecom;
        $(".grsds_name").html(columnRecom.description).attr("data-type",columnRecom.name);
        function get_list(data){
            // console.log(data);
            var list=data.data,html="";
            for(var i=0;i<list.length;i++){
                var content="",
                    creatdate=format(list[i].date);
                //用户等级
                var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
                if(list[i].content.length>40){
                    content=list[i].content.substr(0,40)+"...";
                }else{
                    content=list[i].content;
                }
                var if_buy="",cwatch_buy='';
                if(list[i].status=="1"){
                    if_buy="已围观";
                    cwatch_buy="cwatch_buy";
                }else{
                    if_buy=" 围观"
                }
                var realName=get_name(list[i]);
                var look_img="";
                if(list[i].isAnon!=0){
                    look_img="look-hp-image";
                }
                html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
            }
            $(".grsds-list-msg").html(html)
        }
        ajax(http_url.url+"/onlook/serarch",{
            "sinceId":1,
            "maxId":5,
            "type":columnRecom.name,
            "typeContent":columnRecom.description

        },get_list);
    }
    ajax_nodata(http_url.url+"/load/getconfig/message",get_grsd);
    //机构推荐
    function get_jgtj(data){
        // console.log(data);
        var datas=data.datas,html='';
        for(var i=0;i<datas.length;i++){
            html+=`
                <div class="jg_img" data-id="${datas[i].id}" data-vid="${datas[i].videoId}">
                    <img src="${cover_src+datas[i].videoCover}" alt="">
                </div>
            `;
        }
        $(".jgtj_main").html(html);
    }
    ajax_nodata(http_url.url+"/agency/findAgencysForRecommendByParams",get_jgtj);
    //最热围观
    function hot_watch(data){
        //console.log(data);
        var list=data.data,html="";
        for(var i=0;i<list.length;i++){
            var content="",
                creatdate=format(list[i].date);
           //用户等级
            var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
            if(list[i].content.length>40){
                content=list[i].content.substr(0,40)+"...";
            }else{
                content=list[i].content;
            }
            var if_buy="",cwatch_buy='';
            if(list[i].status=="1"){
                if_buy="已围观";
                cwatch_buy="cwatch_buy";
            }else{
                if_buy="围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(list[i].isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <img src="../img/icon-index-hot.png" alt="">
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".hot-list-msg").html(html)
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":hot_count_start, "maxId":hot_count_end, "type":"hot"},hot_watch);
    //最热围观换一批
    $(".hot_change").click(function(){
        if(hot_count_end==10){
            hot_count_start=1,hot_count_end=5;
            ajax(http_url.url+"/onlook/look/list",{"sinceId":hot_count_start, "maxId":hot_count_end, "type":"hot"},hot_watch);
        }else{
            hot_count_start=6,hot_count_end=10;
            ajax(http_url.url+"/onlook/look/list",{"sinceId":hot_count_start, "maxId":hot_count_end, "type":"hot"},hot_watch);
        }
    });
    //今日推荐
    function recommend_watch(data){
        //console.log(data);
        var list=data.data,html="";
        for(var i=0;i<list.length;i++){
            var content="",
                creatdate=format(list[i].date);
            //用户等级
            var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
            if(list[i].content.length>40){
                content=list[i].content.substr(0,40)+"...";
            }else{
                content=list[i].content;
            }
            var if_buy="",cwatch_buy='';
            if(list[i].status=="1"){
                if_buy="已围观";
                cwatch_buy="cwatch_buy";
            }else{
                if_buy="围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(list[i].isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
               <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png"  class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}"  data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".recommend").html(html);
    };
    // ajax(http_url.url+"/onlook/look/list",{"sinceId":recommend_count_start, "maxId":recommend_count_end, "type":"recom"},recommend_watch);
    //今日推荐换一批
    $(".change_recommend").click(function(){
        if(recommend_count_end==10){
            recommend_count_start=1,recommend_count_end=5;
            ajax(http_url.url+"/onlook/look/list",{"sinceId":recommend_count_start, "maxId":recommend_count_end, "type":"recom"},recommend_watch);
        }else{
            recommend_count_start=6,recommend_count_end=10;
            ajax(http_url.url+"/onlook/look/list",{"sinceId":recommend_count_start, "maxId":recommend_count_end, "type":"recom"},recommend_watch);
        }
    });
    //最新问答
    function new_watch(data){
        //console.log(data);
        var list=data.data,html="";
        for(var i=0;i<list.length;i++){
            var content="",
                creatdate=format(list[i].date);
            //用户等级
            var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
            if(list[i].content.length>40){
                content=list[i].content.substr(0,40)+"...";
            }else{
                content=list[i].content;
            }
            var if_buy="",cwatch_buy='';
            if(list[i].status=="1"){
                if_buy="已围观";
                cwatch_buy="cwatch_buy";
            }else{
                if_buy="围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(list[i].isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png"  class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}"  data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".new-list-msg").html(html)
    }
    function new_watch_more(data){
        //console.log(data);
        var list=data.data,html="";
        if(list!=""){
            for(var i=0;i<list.length;i++){
                var content="",
                    creatdate=format(list[i].date);
                //用户等级
                var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
                if(list[i].content.length>40){
                    content=list[i].content.substr(0,40)+"...";
                }else{
                    content=list[i].content;
                }
                var if_buy="",cwatch_buy='';
                if(list[i].status=="1"){
                    if_buy="已围观";
                    cwatch_buy="cwatch_buy";
                }else{
                    if_buy="围观"
                }
                var realName=get_name(list[i]);
                var look_img="";
                if(list[i].isAnon!=0){
                    look_img="look-hp-image";
                }
                html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png"  class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}"  data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
            }
            $(".msg-loading").hide();
            $(".new-list-msg").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":1, "maxId":5, "type":"new"},new_watch);
    // scroll_more(http_url.url+"/onlook/look/list",{"sinceId":count_start, "maxId":count_end, "type":"new"},new_watch_more)
    //最新问答查看更多
    $(".zxwd-more").click(function(){
        window.location.href="new-answer-more.html"
    });
    //1元围观
    $("body").on("click",".one_wg",function(){
        var cwatch_id=$(this).attr("data-id");
        //微信授权
        function cwatch_jurisdiction(data){
            console.log(data);
            if(data.isBuy==1){//未购买
                window.location.href="../html/cwatch.html?cwatch_id="+cwatch_id;
            }else if(data.isBuy==0){//已围观
                window.location.href="../html/watch-anwser.html?cwatch_id="+cwatch_id;
            }
        }
        ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+cwatch_id,cwatch_jurisdiction);
    });
    //专家推荐
    function recommend_export(data){
        //console.log(data);
        var export_list=data.data,html='';
        for(var i=0;i<export_list.length;i++){
            html+=`
                <div class="zjtj_list inline-block" data-phone="${export_list[i].phoneNumber}">
                        <div><img src="${head_src+export_list[i].headImage}" alt="" onerror=src="../img/user.png"></div>
                        <div>${export_list[i].userName||"匿名用户"}</div>
                        <div>${export_list[i].counselorDuty}</div>
                    </div>
            `;
        }
        $(".export_list_main").html(html);
    }
    ajax(http_url.url+"/counselor/coun/list",{"sinceId":1, "maxId":10},recommend_export);
    //专家推荐list点击
    $("body").on("click",".zjtj_list",function(){
       var phone=$(this).attr("data-phone");
       window.location.href="../html/expert-home-page.html?phone="+phone;
    });
    //大咖访谈
    function cafe_inter(data){
        //console.log(data);
        var videos=data.videos,html="";
        for(var i=0;i<videos.length;i++){
            var title="";
            if(videos[i].title.length>20){
                title=videos[i].title.substr(0,20)+"..."
            }else{
                title=videos[i].title
            }
            html+=`
                <div class="inline-block dkft_list"  data-id="${videos[i].id}">
                    <img src="${cover_src+videos[i].image}" alt="">
                    <div>${title}</div>
                </div>
            `;
        }
        $(".dkft-model").html(html);
    }
    ajax(http_url.url+"/video/search",{"sinceId":1, "maxId":2, "type":"3"},cafe_inter);
    //大咖访谈视频点击
    $("body").on("click",".dkft-model>div",function(){
        var videoId=$(this).attr("data-id");
        function get_vid(data){
            vid=data.data.vid;
            window.location.href="../html/video.html?vid="+vid+"&&spid="+videoId+"&&msg=dkft";
        }
        ajax(http_url.url+"/video/vid",{"id":videoId},get_vid);
    });
    //免费问
    $(".mfw").click(function(){
        function get_user(data){
            console.log(data);
            if(data.userName||data.companyName||data.province){
                ajax_nodata(http_url.url+"/answer/isAnswer",if_anwser);
            }else{
                alert("请完善您的个人信息");
                window.location.href="../html/mine-personal-data.html"
            }
        }
        ajax_nodata(http_url.url+"/user/message",get_user);
        //是否有未提交的答案
        function if_anwser(data){
            //console.log(data);
            if(data.code==4&&data.des=="您有未回答的问题，请前去回答"){
                alert(data.des);
                window.location.href="../html/answer.html?id="+data.question.uuid;
            }else{
                window.location.href="../html/free-question.html?msg=1";
            }
        }

    });
    //快速答
    $(".kud").click(function(){
        //获取用户信息
        function get_user(data){
            //console.log(data);
            if(data.role==1){
                if(data.status==1){
                    alert("咨询师正在审核中,请耐心等待");
                }else{
                    alert("你不是咨询师,请申请咨询师");
                    window.location.href="../html/mine-apply-consultant.html?msg=apply"
                }

            }else if(data.role==2){
                //是否有未提交的答案
                function if_anwser(data){
                    //console.log(data);
                    if(data.code==4&&data.des=="您有未回答的问题，请前去回答"){
                        alert(data.des);
                        window.location.href="../html/answer.html?id="+data.question.uuid;
                    }else if(data.code==1){
                        window.location.href="../html/quick-answer.html";
                    }else{
                        alert(data.des)
                    }
                }
                ajax_nodata(http_url.url+"/answer/isAnswer",if_anwser);
            }
        }
        ajax_nodata(http_url.url+"/user/message",get_user);

    });
    //围观搜索
    $(".index-serach").click(function(){
        window.location.href="../html/watch-search.html";
    });
    //顶部tab栏点击
    $(".tab-class-list").click(function(){
        window.location.href=$(this).attr("data-url");
    });
    //机构推荐查看更多
    $(".jgtj-more").click(function(){
        window.location.href="mechanism-list.html";
    });
    //个人所得税查看更多点击
    $(".grsds_more").click(function(){
        window.location.href="special-column-detail.html?type="+$(".grsds_name").attr("data-type")+"&&msg="+encodeURIComponent(encodeURIComponent($(".grsds_name").html()));
    });
    //机构推荐列表点击
    $("body").on("click",".jg_img",function(){
        var id=$(this).attr("data-id"),vid=$(this).attr("data-vid");
        if(vid&&vid!=""){
            window.location.href="merchanism-video.html?id="+id+"&&videoId="+vid;
        }
    })
});
