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
    FastClick.attach(document.body);
    var offset = sessionStorage.getItem("offsetTop2");
    // console.log(offset);
    setTimeout(function(){$(document).scrollTop(offset)},2000);
    //滚动时保存滚动位置
    $(window).scroll(function(){
        if($(document).scrollTop()!=0){
            sessionStorage.setItem("offsetTop2", $(window).scrollTop());
        }
    });
    $(".swiper-container").swiper();
    var icode = getUrlParms("icode"),newuser=getUrlParms("newuser"),if_365=false;
    var hot_count_start=1,hot_count_end=5,recommend_count_start=1,recommend_count_end=5;
    //是否新用户
    if(newuser){
        $(".down-app-model").show();
    }
    //是否航信
    function if_hangxin(data){
        // console.log(data);
        if(data.role==3){
            $(".suspension_model").hide();
        }
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
        for(var i=0,len=rotations.length;i<len;i++){
            var change_v=rotations[i];
            html+=`<div class="swiper-slide ymmd-click" data-md-name="${change_v.image}" data-imageLink="${change_v.imageLink}"  data-nativeLink="${change_v.nativeLink}"  data-isNative="${change_v.isNative}"><img src="${http_url.url+rotationImageUrl+change_v.image}" data-id="${rotations[i].uuid}" data-name="${rotations[i].image}' alt=""></div>`
        }
        $(".s2>.swiper-wrapper").html(html);
    }
    ajax_nodata(http_url.url+'/rotation/display',get_lunbo);
    //轮播图
    var mySwiper2 = new Swiper('.s2', {
        autoplay:3000,//可选选项，自动滑动
        //autoHeight: true,
        speed: 2000,
        roundLengths: true,
        // pagination: '.swiper-pagination',
        type: 'bullets',
        paginationClickable: true,
        loop: true, //循环播放
        //touchRatio:1,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true ,//修改swiper的父元素时，自动初始化swiper
        autoplayStopOnLast:false,
        // nextButton: '.swiper-button-next2',
        // prevButton: '.swiper-button-prev2',
    });
    //通告消息
    var scroll=0,num=0;
    function get_notice(data){
        // console.log(data);
        var data=data.datas,html='';
        for(var i=0,len=data.length;i<len;i++){
            var change_v=data[i];
            html+=`<li class="notice-li">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">用户${change_v.peepName.length>6?change_v.peepName.slice(0,6)+"..":change_v.peepName}围观了一个问题</div>
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
            for(var i=0,len=list.length;i<len;i++){
                var change_v=list[i];
                var content="",
                    creatdate=format(change_v.date);
                //用户等级
                var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
                if(change_v.content.length>40){
                    content=change_v.content.substr(0,40)+"...";
                }else{
                    content=change_v.content;
                }
                var if_buy="",cwatch_buy='';
                if(change_v.status=="1"){
                    if_buy="已围观";
                    cwatch_buy="cwatch_buy";
                }else{
                    if_buy=" 围观"
                }
                var realName=get_name(list[i]);
                var look_img="";
                if(change_v.isAnon!=0){
                    look_img="look-hp-image";
                }
                html+=`
                <div class="box-sizing one_wg"  data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName.length>11?realName.slice(0,11)+"...":realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${change_v.uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
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
        for(var i=0,len=datas.length;i<len;i++){
            var picture=datas[i].picture.split(",");
            html+=`
                <div class="jg_img" data-id="${datas[i].id}" data-vid="${datas[i].videoId}">
                    <img src="${datas[i].videoCover?cover_src+datas[i].videoCover:cover_src+picture[0]}" alt="">
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
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            var content="",
                creatdate=format(change_v.date);
           //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            if(change_v.content.length>40){
                content=change_v.content.substr(0,40)+"...";
            }else{
                content=change_v.content;
            }
            var if_buy="",cwatch_buy='';
            if(change_v.status=="1"){
                if_buy="已围观";
                cwatch_buy="cwatch_buy";
            }else{
                if_buy="围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(change_v.isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
                <div class="box-sizing one_wg"  data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName.length>11?realName.slice(0,11)+"...":realName||"匿名用户"}
                                <img src="../img/icon-index-hot.png" alt="">
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${change_v.uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".hot-list-msg").html(html)
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":hot_count_start, "maxId":hot_count_end, "type":"hot"},hot_watch);
    //刷刷推荐
    ajax(http_url.url+"/brush/brushVideoHome",{
        "sinceId":1,
        "maxId":6
    },function(data){
        // console.log(data);
        var html='',list=data.data;
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            html+=`
            <div class="inline-block" data-vid="${change_v.vid}"  data-id="${change_v.id}">
                <img src="${cover_src+change_v.image}" alt="">
                <div>${change_v.title.length>12?change_v.title.slice(0,12)+"...":change_v.title}</div>
            </div>`
        }
        $(".index-new-brush-list").html(html);
    });
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
    //最新问答
    function new_watch(data){
        //console.log(data);
        var list=data.data,html="";
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            var content="",
                creatdate=format(change_v.date);
            //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            if(change_v.content.length>40){
                content=change_v.content.substr(0,40)+"...";
            }else{
                content=change_v.content;
            }
            var if_buy="",cwatch_buy='';
            if(change_v.status=="1"){
                if_buy="已围观";
                cwatch_buy="cwatch_buy";
            }else{
                if_buy="围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(change_v.isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
                <div class="box-sizing one_wg"  data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png"  class="${look_img}" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName.length>11?realName.slice(0,11)+"...":realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}"  data-id="${change_v.uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".new-list-msg").html(html)
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":1, "maxId":10, "type":"new"},new_watch);
    //最新问答查看更多
    $(".zxwd-more").click(function(){
        window.location.href="new-answer-more.html"
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
    //专家推荐
    function recommend_export(data){
        //console.log(data);
        var export_list=data.data,html='';
        for(var i=0,len=export_list.length;i<len;i++){
            var export_change_v=export_list[i];
            html+=`
                <div class="zjtj_list inline-block" data-phone="${export_change_v.phoneNumber}">
                        <div><img src="${headimage(export_change_v.headImage)}" alt="" onerror=src="../img/user.png"></div>
                        <div>${export_change_v.userName||"匿名用户"}</div>
                        <div>${export_change_v.counselorDuty}</div>
                    </div>
            `;
        }
        $(".export_list_main").html(html);
    }
    ajax(http_url.url+"/counselor/coun/list",{"sinceId":1, "maxId":10},recommend_export);
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
                    window.location.href="mine-expert-authentication.html?msg=apply"
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
        // window.location.href="../html/watch-search.html";
        window.location.href="../html/index-search.html";
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
        window.location.href="office-detail.html?id="+$(this).attr("data-id");
        // if(vid&&vid!=""){
        //     window.location.href="merchanism-video.html?id="+id+"&&videoId="+vid;
        // }
    });
    //刷刷推荐查看更多
    $(".brush-more").click(function(){
        window.location.href="brush.html"
    })
    //刷刷视频列表点击
    $("body").on("click",".index-new-brush-list>div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
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
});
