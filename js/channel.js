$(function(){
    var vip="免费",user='',classifyId=getUrlParms("classifyId");//是否是会员
    ajax_nodata(http_url.url+"/user/message",function(data){
        user=data;
    });
    //查询是否有定制频道
    ajax_nodata(http_url.url+"/classify/classifylist",function(data){
        if(data.data!=null){
            window.location.href="channel-customized.html";
        }
    });
    //税种数据
    ajax_nodata(http_url.url+"/category/tree",function(data){
        var sz=get_category(data.categorys,"税种"),html='<div class="inline-block channel-list-act" data-id="">全部税种</div>';
        for(var i=0;i<sz.length;i++){
            html+=`<div class="inline-block" data-id="${sz[i].uuid}">${sz[i].name}</div>`
        }
        $(".channel-c-main-list").html(html);
    });
    //导航栏数据
    ajax_nodata(http_url.url+"/classify/attention/classifylist",function(data){
        // console.log(data);
        var html='';
        for(var i=0;i<data.data.length;i++){
            html+=`<div class="inline-block ${classifyId&&classifyId==data.data[i].id?'channel-tab-act':(!classifyId&&i==0?'channel-tab-act':'')}" data-id="${data.data[i].id}">
                        ${data.data[i].name}
                        <div class="channel-tab-line ${classifyId&&classifyId==data.data[i].id?'':(!classifyId&&i==0?'':'out')}"></div>
                    </div>`
        }
        $(".channel-tab").html(html);
        //用户频道会员信息
        ajax(http_url.url+"/goods/classify/goods",{"id":$(".channel-tab-act").attr("data-id")},function(data){
            // console.log(data);
            $(".channel-vip-rule").attr("data-name",data.data.name).attr("data-html",data.data.instructions);
            $(".channel-vip-icon").attr("src",cover_src+data.data.icon);
            $(".channel-vip-title").html(data.data.name);
            $(".channel-vip-date>span").html(format(data.data.invalid_time).split(" ")[0]);
            $(".min-money").html(parseFloat(data.data.minPrice).toFixed(2));
            $(".max-money").html(parseFloat(data.data.maxPrice).toFixed(2));
            if(data.data.charge==0){
                $(".channel-vip").addClass("out");
                $(".channel-vip-free").removeClass("out");
            }else if(data.data.charge==1){
                $(".channel-vip").addClass("out");
                if(data.data.classifyVip&&data.data.classifyVip==0){
                    vip="会员";
                    $(".channel-vip-yes").removeClass("out");
                }else if(data.data.classifyVip&&data.data.classifyVip==1){
                    vip="会员过期";
                    $(".channel-vip-dateout").removeClass("out");
                }else if(data.data.classifyVip&&data.data.classifyVip==2){
                    vip="未开通";
                    $(".channel-vip-no").removeClass("out");
                }
                if(data.data.classifyVip==0){
                    $(".channel-vip-yes").removeClass("out");
                }else if(data.data.classifyVip==1){
                    $(".channel-vip-dateout").removeClass("out");
                }else if(data.data.classifyVip==2){
                    $(".channel-vip-no").removeClass("out");
                }
            }
        });
        list();
    });
    //所有频道点击
    $(".channel-mine-btn").click(function(){
        window.location.href="channel-mine.html";
    });
    //tab导航栏点击
    $("body").on("click",".channel-tab>div",function(){
        window.scroll(0, 0);
        count_start=1;count_end=10;
        $(".channel-tab>div").removeClass("channel-tab-act").children(".channel-tab-line").addClass("out");
        $(this).addClass("channel-tab-act").children(".channel-tab-line").removeClass("out");
        //用户频道会员信息
        ajax(http_url.url+"/goods/classify/goods",{"id":$(".channel-tab-act").attr("data-id")},function(data){
            $(".channel-vip-rule").attr("data-name",data.data.name).attr("data-html",data.data.instructions);
            $(".channel-vip-icon").attr("src",cover_src+data.data.icon);
            $(".channel-vip-title").html(data.data.name);
            $(".channel-vip-date>span").html(format(data.data.invalid_time).split(" ")[0]);
            $(".min-money").html(parseFloat(data.data.minPrice).toFixed(2));
            $(".max-money").html(parseFloat(data.data.maxPrice).toFixed(2));
            if(data.data.charge==0){
                $(".channel-vip").addClass("out");
                $(".channel-vip-free").removeClass("out");
            }else if(data.data.charge==1){
                $(".channel-vip").addClass("out");
                if(data.data.classifyVip&&data.data.classifyVip==0){
                    vip="会员";
                    $(".channel-vip-yes").removeClass("out");
                }else if(data.data.classifyVip&&data.data.classifyVip==1){
                    vip="会员过期";
                    $(".channel-vip-dateout").removeClass("out");
                }else if(data.data.classifyVip&&data.data.classifyVip==2){
                    vip="未开通";
                    $(".channel-vip-no").removeClass("out");
                }
            }
        });
        $(".channel-c-main-list>div").removeClass("channel-list-act");
        $(".channel-c-main-list>div:first-child").addClass("channel-list-act");
        $(".channel-sz-show").html("筛选税种").attr("data-id","");
        $(".channel-tax-sel-model").addClass("out");
        list();
        scroll_more(http_url.url+"/classifyvideo/videolist",{
            "classifyId": ".channel-tab-act&&data-id",
            "maxId": count_end,
            "sinceId": count_start,
            "showCity":user.address,
            "showProvince":user.province,
            "taxId":".channel-sz-show&&data-id"
        },list_more);
    });
    //频道搜索点击
    $(".channel-search-input").click(function(){
        var vip_msg='';
        if(vip=="会员"){
            vip_msg='yes'
        }
        window.location.href="channel-search.html?classifyId="+$(".channel-tab-act").attr("data-id")+"&vip="+vip_msg;
    });
    //税种筛选按钮点击
    $(".channel-tax-sel-btn").click(function(){
        if($(".channel-tax-sel-model").hasClass("out")){
            $(".channel-tax-sel-model").removeClass("out");
        }else{
            $(".channel-tax-sel-model").addClass("out");
        }
    });
    //税种列表点击
    $("body").on("click",".channel-c-main-list>div",function(){
        $(".channel-c-main-list>div").removeClass("channel-list-act");
        $(this).addClass("channel-list-act");
        $(".channel-sz-show").html($(this).html().length>4?$(this).html().slice(0,4)+"..":$(this).html()).attr("data-id",$(this).attr("data-id"));
        $(".channel-sz-hidden").html($(this).html());
        $(".channel-tax-sel-model").addClass("out");
        list();
        scroll_more(http_url.url+"/classifyvideo/videolist",{
            "classifyId": ".channel-tab-act&&data-id",
            "maxId": count_end,
            "sinceId": count_start,
            "showCity":user.address,
            "showProvince":user.province,
            "taxId":".channel-sz-show&&data-id"
        },list_more);
    });
    //开通会员卡点击
    $(".kt-channelvip-btn").click(function(){
        window.location.href="channel-vip-card.html?id="+$(".channel-tab-act").attr("data-id");
    });
    //频道列表点击
    $("body").on("click",".channel-page-li",function(){
        var charge=$(this).attr("data-charge"),vip_msg='';
        if(vip=="会员"){
            vip_msg='yes'
        }
        if(charge==0||vip=="会员"){
            window.location.href="channel-detail.html?classifyId="+$(".channel-tab-act").attr("data-id")+"&vid="+$(this).attr("data-vid")+"&userid="+$(this).attr("data-userid")+'&vip='+vip_msg;
        }else{
            if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                window.location.href="channel-vip-card.html?id="+$(".channel-tab-act").attr("data-id");
            }
        }

    });
    //频道列表数据
    function list(){
        ajax(http_url.url+"/classifyvideo/videolist",{
            "classifyId": $(".channel-tab-act").attr("data-id"),
            "maxId": count_end,
            "sinceId": count_start,
            "showCity":user.address,
            "showProvince":user.province,
            "taxId": $(".channel-sz-show").attr("data-id")
        },function(data){
            // console.log(data);
            var html='';
            for(var i=0;i<data.data.length;i++){
                var videoAdvertising='';
                if(data.data[i].videoAdvertising&&data.data[i].videoAdvertising!==null&&data.data[i].videoAdvertising!==''){
                    videoAdvertising=data.data[i].videoAdvertising;
                }
                html+=`
                    <div class="channel-page-li" data-charge="${data.data[i].charge}" data-vid="${data.data[i].id}" data-userid="${data.data[i].userId}">
                        <img src="${cover_src+data.data[i].cover}" alt="">
                        <div class="channel-page-li-title">${data.data[i].title}</div>
                        <div class="channel-page-li-user">
                            <img src="${headimage(data.data[i].headImage)}" onerror=src="../img/user.png" alt="">
                            <div class="inline-block channel-page-li-username">${get_name(data.data[i])}</div>
                            <div class="inline-block orange channel-page-li-userbtn ${data.data[i].charge==0||vip=="会员"?'out':''}">频道会员免费</div>
                        </div>
                    </div>
                    <div class="channel-page-ad ${data.data[i].videoAdvertising&&data.data[i].videoAdvertising!==null&&data.data[i].videoAdvertising!==''?'':'out'}">
                        <div class="inline-block channel-page-ad-msg">
                            <img src="${headimage(videoAdvertising.enterpriseHead)}" alt="">
                            <div class="box-sizing">
                                <div class="channel-page-ad-name">机构推荐</div>
                                <div class="channel-page-ad-line"></div>
                                <div class="channel-page-ad-company">${videoAdvertising.advertisingVideoType==0?videoAdvertising.enterpriseName:videoAdvertising.title}</div>
                            </div>
                        </div>
                        <div class="bf-btn-channel"></div>
                        <img data-type="${videoAdvertising.advertisingVideoType}" class="channel-ad-click" data-id="${videoAdvertising.agencyId}" data-vid="${videoAdvertising.vid}" src="${cover_src+videoAdvertising.cover}" alt="">
                    </div>
                `
            }
            $(".channel-page-ul").html(html);
        })
    }
    function list_more(data){
        var html='';
        if(data.data&&data.data!=''){
            for(var i=0;i<data.data.length;i++){
                var videoAdvertising='';
                if(data.data[i].videoAdvertising&&data.data[i].videoAdvertising!==null&&data.data[i].videoAdvertising!==''){
                    videoAdvertising=data.data[i].videoAdvertising;
                }
                html+=`
                    <div class="channel-page-li" data-charge="${data.data[i].charge}" data-vid="${data.data[i].id}" data-userid="${data.data[i].userId}">
                        <img src="${cover_src+data.data[i].cover}" alt="">
                        <div class="channel-page-li-title">${data.data[i].title}</div>
                        <div class="channel-page-li-user">
                            <img src="${headimage(data.data[i].headImage)}" onerror=src="../img/user.png" alt="">
                            <div class="inline-block channel-page-li-username">${get_name(data.data[i])}</div>
                            <div class="inline-block orange channel-page-li-userbtn ${data.data[i].charge==0||vip=="会员"?'out':''}">频道会员免费</div>
                        </div>
                    </div>
                   <div class="channel-page-ad ${data.data[i].videoAdvertising&&data.data[i].videoAdvertising!==null&&data.data[i].videoAdvertising!==''?'':'out'}">
                        <div class="inline-block channel-page-ad-msg">
                            <img src="${headimage(videoAdvertising.enterpriseHead)}" alt="">
                            <div class="box-sizing">
                                <div class="channel-page-ad-name">机构推荐</div>
                                <div class="channel-page-ad-line"></div>
                                <div class="channel-page-ad-company">${videoAdvertising.advertisingVideoType==0?videoAdvertising.enterpriseName:videoAdvertising.title}</div>
                            </div>
                        </div>
                        <div class="bf-btn-channel"></div>
                        <img data-type="${videoAdvertising.advertisingVideoType}" class="channel-ad-click" data-id="${videoAdvertising.agencyId}" data-vid="${videoAdvertising.vid}" src="${cover_src+videoAdvertising.cover}" alt="">
                    </div>
                `
            }
            $(".channel-page-ul").append(html);
        }else{
            scroll_status=false;
        }
    }
    //机构广告点击
    $("body").on("click",".channel-ad-click",function(){
        var type=$(this).attr("data-type");
        if(type==0){
            window.location.href="video.html?vid="+$(this).attr("data-vid");
        }else{
            window.location.href="office-detail.html?id="+$(this).attr("data-id");
        }
    });
    //会员规则点击
    $(".channel-vip-rule").click(function(){
        $(".channel-rule-title span").html($(this).attr("data-name"));
        $(".channel-rule-msg").html($(this).attr("data-html"));
        $(".channel-rule-model").show();
    });
    //关闭规则弹窗
    $(".channel-rule-title>img").click(function(){
        $(".channel-rule-model").hide();
    })
});