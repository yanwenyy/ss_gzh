//屏蔽手机自带返回键
$(document).ready(function() {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
});
$(function(){
    var icode = getUrlParms("icode"),newuser=getUrlParms("newuser"),if_365=false;
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
        if(data.tsfTime!=null&&data.tsfTime!=''){
            var tt=new Date().getTime();
            if(tt<data.tsfTime){
                if_365=true;
            }
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
            html+=`<div class="swiper-slide ymmd-click" data-md-name="${rotations[i].image}" data-imageLink="${rotations[i].imageLink}"  data-nativeLink="${rotations[i].nativeLink}"  data-isNative="${rotations[i].isNative}"><img src="${http_url.url+rotationImageUrl+rotations[i].image}" data-id="${rotations[i].uuid}" data-name="${rotations[i].image}' alt=""></div>`
        }
        $(".s2>.swiper-wrapper").html(html);
    }
    ajax_nodata(http_url.url+'/rotation/display',get_lunbo);
    //通告消息
    var scroll=0,num=0;
    function get_notice(data){
        // console.log(data);
        var data=data.datas,html='';
        for(var i=0;i<data.length;i++){
            html+=`<li class="notice-li">
                        <img src="${headimage(data[i].headImage)}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">用户${data[i].peepName.length>6?data[i].peepName.slice(0,6)+"..":data[i].peepName}围观了一个问题</div>
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
    //广告位图片
    ajax_nodata(http_url.url+"/rotation/home/ad",function(data){
        $(".m365-model-list-btn").attr("data-url",data.data[0].imageLink).children("img").attr("src",rotation_src+data.data[0].image)
    });
    //专题内容
    function get_grsd(data){
        // console.log(data);
        var columnRecom=data.columnRecom;
        $(".index-new-rmzt-title-name").attr("data-type",columnRecom.name).html(columnRecom.description);
        $(".index-new-rmzt-title>img").attr("src",cover_src+columnRecom.mandatory);
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
                var realName=get_name(list[i]);
                var look_img="";
                if(list[i].isAnon!=0){
                    look_img="look-hp-image";
                }
                html+=`
                    <li class="index-new-rmzt-li one_wg"  data-id="${list[i].uuid}">
                        <span class="inline-block"></span>
                        <div class="inline-block">${content}</div>
                        <img src="../img/brush-more.png" alt="">
                    </li>
                `;
            }
            $(".index-new-rmzt-body>ul").html(html);
        }
        ajax(http_url.url+"/onlook/serarch",{
            "sinceId":1,
            "maxId":5,
            "type":columnRecom.name,
            "typeContent":columnRecom.description

        },get_list);
    }
    ajax_nodata(http_url.url+"/load/getconfig/message",get_grsd);
    //刷刷推荐
    ajax(http_url.url+"/brush/brushVideoList",{
        "sinceId":1,
        "maxId":6
    },function(data){
        // console.log(data);
        var html='';
        for(var i=0;i<data.data.length;i++){
            html+=`
            <div class="inline-block" data-vid="${data.data[i].vid}"  data-id="${data.data[i].id}">
                <img src="${cover_src+data.data[i].image}" alt="">
                <div>${data.data[i].title.length>12?data.data[i].title.slice(0,12)+"...":data.data[i].title}</div>
            </div>`
        }
        $(".index-new-brush-list").html(html);
    });
    //机构推荐
    function get_jgtj(data){
        // console.log(data);
        var datas=data.datas,html='';
        for(var i=0;i<datas.length;i++){
            html+=`
                <div class="jg_img" data-id="${datas[i].id}" data-vid="${datas[i].videoId}">
                    <img src="${cover_src+datas[i].videoCover}" alt="">
                    <div class="jg_img-msg">${datas[i].name}</div>
                    <div class="jg_img-footer">
                        <div class="inline-block office-rz-qy ${datas[i].type2==2?'':'out'}">认证企业</div>
                        <div class="inline-block office-rz-fws">${datas[i].type==1?'普通机构':datas[i].type==2?'授权服务商':'合作伙伴'}</div>
                        <div class="inline-block office-rz-sws ${datas[i].type2==1?'':'out'}">5A级事务所</div>
                    </div>
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
                    <div class="index-new-hot-list-msg">
                        ${content}
                    </div>
                    <div class="index-new-zxwd-list-footer">
                        <img src="${headimage(list[i].headImage)}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">${get_name(list[i])}</div>
                        <div class="inline-block index-new-zxwd-list-footer-wg">围观 ${list[i].lookNum}</div>
                    </div>
                    <img class="index-new-zr-num" src="../img/index-new-zr${i+1}.png" alt="">
                </div>
            `;
        }
        $(".index-new-hot-list").html(html)
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":1, "maxId":10, "type":"hot"},hot_watch);
    //最新问答
    function new_watch(data){
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
                if_buy="围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(list[i].isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="index-new-zxwd-list-msg">
                        <div class="inline-block index-new-zxwd-list-msg-left">
                            ${content}
                        </div>
                        <img class="${list[i].images!=''&&list[i].images!=null?'':'out'}" src="${list[i].images!=''&&list[i].images!=null?question_src+list[i].images[0]:''}" alt="">
                    </div>
                    <div class="index-new-zxwd-list-footer">
                         <img src="${headimage(list[i].headImage)}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">${get_name(list[i])}</div>
                        <div class="inline-block index-new-zxwd-list-footer-wg">围观 ${list[i].lookNum}</div>
                    </div>
                </div>
            `;
        }
        $(".index-new-zxwd-list").html(html)
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":1, "maxId":10, "type":"new"},new_watch);
    //专家推荐
    function recommend_export(data){
        //console.log(data);
        var export_list=data.data,html='';
        for(var i=0;i<export_list.length;i++){
            html+=`
                <div class="zjtj_list inline-block" data-phone="${export_list[i].phoneNumber}">
                        <div><img src="${headimage(export_list[i].headImage)}" alt="" onerror=src="../img/user.png"></div>
                        <div>${export_list[i].userName||"匿名用户"}</div>
                        <div>${export_list[i].counselorDuty}</div>
                    </div>
            `;
        }
        $(".export_list_main").html(html);
    }
    ajax(http_url.url+"/counselor/coun/list",{"sinceId":1, "maxId":10},recommend_export);
    //查看更多点击d
    $(".zxwd-more").click(function(){
        window.location.href=$(this).attr("data-url");
    });
    //轮播图点击
    $("body").on("click",".swiper-slide",function(){
       var isNative=$(this).attr("data-isNative"),
           nativeLink=$(this).attr("data-nativeLink"),
           imageLink=$(this).attr("data-imageLink");
       if(isNative==0){
           window.location.href=imageLink;
       }else if(isNative==2){
           window.location.href="special-column-detail.html?type="+nativeLink+"&&msg="+encodeURIComponent(encodeURIComponent(imageLink))
       }else if(isNative==3){
           window.location.href="office-detail.html?id="+imageLink;
       }else if(isNative==4){
           window.location.href="brush.html?msg="+imageLink;
       }else if(isNative==5){
           window.location.href="brush-video.html?id="+imageLink;
       }
    });
    //1元围观
    $("body").on("click",".one_wg",function(){
        var cwatch_id=$(this).attr("data-id");
        if(if_365==true){
            window.location.href="../html/watch-anwser.html?cwatch_id="+cwatch_id;
        }else{
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
        }
    });
    //专家推荐list点击
    $("body").on("click",".zjtj_list",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="../html/personal-new.html?phone="+phone;
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
    //热门专题查看更多点击
    $(".grsds_more").click(function(){
        window.location.href="special-column-detail.html?type="+$(".index-new-rmzt-title-name").attr("data-type")+"&&msg="+encodeURIComponent(encodeURIComponent($(".index-new-rmzt-title-name").html()));
    });
    //机构推荐列表点击
    $("body").on("click",".jg_img",function(){
        var id=$(this).attr("data-id"),vid=$(this).attr("data-vid");
        window.location.href="office-detail.html?id="+$(this).attr("data-id");
        // if(vid&&vid!=""){
        //     window.location.href="merchanism-video.html?id="+id+"&&videoId="+vid;
        // }
    });
    //刷刷视频列表点击
    $("body").on("click",".index-new-brush-list>div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    })
});
