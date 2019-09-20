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
    //导航栏数据
    ajax_nodata(http_url.url+"/classify/attention/classifylist",function(data){
        // console.log(data);
        var html=`<div class="inline-block ${!classifyId?'channel-tab-act':''}" data-code="sptt">
                        视频头条
                        <div class="channel-tab-line ${!classifyId?'':'out'}"></div>
                    </div>`,tab_list=data.data;
        for(var i=0,len=tab_list.length;i<len;i++){
            var change_v=tab_list[i];
            html+=`<div class="inline-block ${classifyId&&classifyId==change_v.id?'channel-tab-act':''}" data-id="${change_v.id}">
                        ${change_v.name}
                        <div class="channel-tab-line ${classifyId&&classifyId==change_v.id?'':'out'}"></div>
                    </div>`
        }
        $(".channel-tab").html(html);
        type_sel($(".channel-tab-act").attr("data-code"));
        list($(".channel-tab-act").attr("data-code"));
        list_more($(".channel-tab-act").attr("data-code"));
    });
    //视频头条关注列表
    attention_list();
    //所有频道点击
    $(".channel-mine-btn").click(function(){
        window.location.href="channel-mine.html";
    });
    //tab导航栏点击
    $("body").on("click",".channel-tab>div",function(){
       if($(this).text().indexOf("视频头条")!=-1){
           $(".channel-search-input>input").attr("placeholder","搜索标题,官方账号等");
       }else{
           $(".channel-search-input>input").attr("placeholder","请输入搜索关键词");
       }
        window.scroll(0, 0);
        count_end=10;count_start=1;scroll_status=true;num=1;
        $(".channel-tab>div").removeClass("channel-tab-act").children(".channel-tab-line").addClass("out");
        $(this).addClass("channel-tab-act").children(".channel-tab-line").removeClass("out");
        type_sel($(".channel-tab-act").attr("data-code"));
        $(".channel-c-main-list>div").removeClass("channel-list-act");
        $(".channel-c-main-list>div:first-child").addClass("channel-list-act");
        $(".channel-tax-sel-model").addClass("out");
        list($(".channel-tab-act").attr("data-code"));
        list_more($(".channel-tab-act").attr("data-code"));
        var code=$(this).attr("data-code");
        // if(code=="sptt"){
        //     $(".channel-sptt-page").removeClass("out");
        //     $(".channel-page").addClass("out");
        // }else{
        //     $(".channel-page").removeClass("out");
        //     $(".channel-sptt-page").addClass("out");
        // }
    });
    //频道搜索点击
    $(".channel-search-input").click(function(){
        if($(".channel-tab-act").attr("data-code")=="sptt"){
            window.location.href="channel-search-sptt.html";
        }else{
            var vip_msg='';
            if(vip=="会员"){
                vip_msg='yes'
            }
            window.location.href="channel-search.html?classifyId="+$(".channel-tab-act").attr("data-id")+"&vip="+vip_msg;
        }
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
        list($(".channel-tab-act").attr("data-code"));
        list_more($(".channel-tab-act").attr("data-code"));
    });
    //开通会员卡点击
    $(".kt-channelvip-btn").click(function(){
        window.location.href="channel-vip-card.html?id="+$(".channel-tab-act").attr("data-id");
    });
    //频道列表点击
    $("body").on("click",".channel-page-li-pd",function(){
        var charge=$(this).attr("data-charge"),vip_msg='';
        if(vip=="会员"){
            vip_msg='yes'
        }
        if(charge==0||vip=="会员"){
            window.location.href="channel-detail.html?from=channel&classifyId="+$(".channel-tab-act").attr("data-id")+"&vid="+$(this).attr("data-vid")+"&userid="+$(this).attr("data-userid")+'&vip='+vip_msg;
        }else{
            if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                window.location.href="channel-vip-card.html?id="+$(".channel-tab-act").attr("data-id");
            }
        }

    });
    //视频头条列表点击
    $("body").on("click",".channel-page-li-sptt",function(e){
        var class_val=e.target.className.indexOf("channel-page-li-userbtn");
        if(class_val!=-1){
            window.location.href="channel-sptt-label.html?id="+e.target.getAttribute("data-id");
        }else{
            window.location.href="channel-sptt-detail.html?id="+e.target.getAttribute("data-id");
        }
    });
    //频道列表数据
    function list(code){
        count_start=1;count_end=10;num=1;scroll_status=true;
        if(code=="sptt"){
            $(".channel-sptt-page").removeClass("out");
            $(".channel-page").addClass("out");
            ajax(http_url.url+"/headvideo/list",{
                "headTypeId":$(".channel-list-act").attr("data-id"),
                "maxId":count_end,
                "sinceId":count_start,
                "type":$(".channel-sptt-tab-group>.orange").attr("data-code")
            },function(data){
                var html='',datas=data.data;
                if(datas&&datas!=''){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        html+=`<div class="channel-page-li channel-page-li-sptt" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_v.id}">${change_v.title.length>40?change_v.title.slice(0,40)+'...':change_v.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" data-id="${change_v.id}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" data-id="${change_v.id}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div data-id="${change_v.id}">${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                                    <div data-id="${change_v.id}">${timeago(change_v.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                    }
                    $(".channel-sptt-page-ul").html(html);
                }else{
                    $(".channel-sptt-page-ul").html("<div class='no-msg' style='display: block'><div>暂时没有视频,</div>快去关注更多官方账号吧<div></div></div>");
                }
            })
        }else{
            $(".channel-page").removeClass("out");
            $(".channel-sptt-page").addClass("out");
            //用户频道会员信息
            ajax(http_url.url+"/goods/classify/goods",{"id":$(".channel-tab-act").attr("data-id")},function(data){
                var datas=data.data;
                $(".channel-vip-rule").attr("data-name",datas.name).attr("data-html",datas.instructions);
                $(".channel-vip-icon").attr("src",cover_src+datas.icon);
                $(".channel-vip-title").html(datas.name);
                $(".channel-vip-date>span").html(format(datas.invalid_time).split(" ")[0]);
                $(".min-money").html(parseFloat(datas.minPrice).toFixed(2));
                $(".max-money").html(parseFloat(datas.maxPrice).toFixed(2));
                if(datas.charge==0){
                    $(".channel-vip").addClass("out");
                    $(".channel-vip-free").removeClass("out");
                }else if(datas.charge==1){
                    $(".channel-vip").addClass("out");
                    if(datas.classifyVip&&datas.classifyVip==0){
                        vip="会员";
                        $(".channel-vip-yes").removeClass("out");
                    }else if(datas.classifyVip&&datas.classifyVip==1){
                        vip="会员过期";
                        $(".channel-vip-dateout").removeClass("out");
                    }else if(datas.classifyVip&&datas.classifyVip==2){
                        vip="未开通";
                        $(".channel-vip-no").removeClass("out");
                    }
                }
            });
            ajax(http_url.url+"/classifyvideo/videolist",{
                "classifyId": $(".channel-tab-act").attr("data-id"),
                "maxId": count_end,
                "sinceId": count_start,
                "showCity":user.address,
                "showProvince":user.province,
                "taxId": $(".channel-sz-show").attr("data-id")
            },function(data){
                // console.log(data);
                var channel_list=data.data;
                var html='';
                for(var i=0,len=channel_list.length;i<len;i++){
                    var change_v=channel_list[i];
                    var videoAdvertising='';
                    if(change_v.videoAdvertising&&change_v.videoAdvertising!==null&&change_v.videoAdvertising!==''){
                        videoAdvertising=change_v.videoAdvertising;
                    }
                    html+=`
                    <div class="channel-page-li channel-page-li-pd" data-charge="${change_v.charge}" data-vid="${change_v.id}" data-userid="${change_v.userId}">
                        <img src="${cover_src+change_v.cover}" alt="">
                        <div class="channel-page-li-title">${change_v.title.length>40?change_v.title.slice(0,40)+"...":change_v.title}</div>
                        <div class="channel-page-li-user">
                             <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-list-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-list-userimg-rz ${change_v.role==3?'':'out'}" data-id="${change_v.id}" src="../img/office-p-rz.png" alt="">
                             </div>
                            <div class="inline-block channel-page-li-username">${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                            <div class="inline-block orange channel-page-li-userbtn ${change_v.charge==0||vip=="会员"?'out':''}">频道会员免费</div>
                        </div>
                    </div>
                    <div class="channel-page-ad ${change_v.videoAdvertising&&change_v.videoAdvertising!==null&&change_v.videoAdvertising!==''?'':'out'}">
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
    }
    function list_more(code){
        if(code=="sptt"){
            scroll_more(http_url.url+'/headvideo/list',{
                "headTypeId":".channel-list-act&&data-id",
                "maxId":count_end,
                "sinceId":count_start,
                "type":".channel-sptt-tab-group>.orange&&data-code"
            },function(data){
                var html='',datas=data.data;
                if(datas&&datas!=''){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        html+=`<div class="channel-page-li channel-page-li-sptt" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_v.id}">${change_v.title.length>40?change_v.title.slice(0,40)+'...':change_v.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" data-id="${change_v.id}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" data-id="${change_v.id}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div data-id="${change_v.id}">${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                                    <div data-id="${change_v.id}">${timeago(change_v.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                    }
                    $(".channel-sptt-page-ul").append(html);
                }else{
                    scroll_status=false;
                }
            })
        }else{
            scroll_more(http_url.url+"/classifyvideo/videolist",{
                "classifyId": ".channel-tab-act&&data-id",
                "maxId": count_end,
                "sinceId": count_start,
                "showCity":user.address,
                "showProvince":user.province,
                "taxId":".channel-sz-show&&data-id"
            },function(data){
                var html='';
                if(data.data&&data.data!=''){
                    for(var i=0,len=channel_list.length;i<len;i++){
                        var change_v=channel_list[i];
                        var videoAdvertising='';
                        if(change_v.videoAdvertising&&change_v.videoAdvertising!==null&&change_v.videoAdvertising!==''){
                            videoAdvertising=change_v.videoAdvertising;
                        }
                        html+=`
                    <div class="channel-page-li channel-page-li-pd" data-charge="${change_v.charge}" data-vid="${change_v.id}" data-userid="${change_v.userId}">
                        <img src="${cover_src+change_v.cover}" alt="">
                        <div class="channel-page-li-title">${change_v.title.length>40?change_v.title.slice(0,40)+"...":change_v.title}</div>
                        <div class="channel-page-li-user">
                             <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-list-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-list-userimg-rz ${change_v.role==3?'':'out'}" data-id="${change_v.id}" src="../img/office-p-rz.png" alt="">
                             </div>
                            <div class="inline-block channel-page-li-username">${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                            <div class="inline-block orange channel-page-li-userbtn ${change_v.charge==0||vip=="会员"?'out':''}">频道会员免费</div>
                        </div>
                    </div>
                    <div class="channel-page-ad ${change_v.videoAdvertising&&change_v.videoAdvertising!==null&&change_v.videoAdvertising!==''?'':'out'}">
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
            });
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
    });
    //类型筛选
    function type_sel(code){
        if(code=='sptt'){
            $(".channel-sz-show").html("类型筛选").attr("data-id","");
            ajax_nodata(http_url.url+"/headtype/list",function(data){
                var sz=data.data,html='<div class="inline-block channel-list-act" data-id="">全部类型</div>';
                for(var i=0,len=sz.length;i<len;i++){
                    var change_v=sz[i];
                    html+=`<div class="inline-block" data-id="${change_v.id}">${change_v.name}</div>`
                }
                $(".channel-c-main-list").html(html);
            });
        }else{
            //税种数据
            $(".channel-sz-show").html("税种筛选").attr("data-id","");
            ajax_nodata(http_url.url+"/category/tree",function(data){
                var sz=get_category(data.categorys,"税种"),html='<div class="inline-block channel-list-act" data-id="">全部税种</div>';
                for(var i=0,len=sz.length;i<len;i++){
                    var change_v=sz[i];
                    html+=`<div class="inline-block" data-id="${change_v.uuid}">${change_v.name}</div>`
                }
                $(".channel-c-main-list").html(html);
            });
        }
    }
    //视频头条关注列表
    function attention_list(){
        ajax(http_url.url+"/attention/officialByRecommendNumber",{
            "follow": "1",
            "maxId": count_end,
            "sinceId": count_start
        },function(data){
            if(data.data&&data.data!=""){
                var datas=data.data,html='';
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                    <div class="inline-block att-img-group">
                    <div class="channel-sptt-p-img">
                        <img src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                        <img class="channel-sptt-home-rz" src="../img/office-p-rz.png" alt="">
                    </div>
                    <div>${get_name(change_v).length>6?get_name(change_v).slice(0,6)+"...":get_name(change_v)}</div>
                </div>
                `;
                }
                $(".channel-sptt-att-user-yes").html(html)
            }else{
                ajax(http_url.url+"/attention/officialByRecommendNumber",{
                    "follow": "0",
                    "maxId": count_end,
                    "sinceId": count_start
                },function(data){
                    if(data.data&&data.data!=""){
                        $(".channel-sptt-att-user-yes").addClass("out");
                        $(".channel-sptt-att-user-no").removeClass("out");
                        var datas2=data.data,html2='';
                        for(var i=0,len=datas2.length;i<len;i++){
                            var change_v2=datas2[i];
                            html2+=`
                        <div class="inline-block att-img-group">
                        <div class="channel-sptt-p-img">
                            <img src="${headimage(change_v2.headImage)}" class="look-hp-image" data-role="${change_v2.role}" data-phone="${change_v2.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-home-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div>${get_name(change_v2).length>6?get_name(change_v2).slice(0,6)+"...":get_name(change_v2)}</div>
                        <div class="sptt-gz-office" data-phone="${change_v2.phoneNumber}">+关注</div>
                    </div>
                    `;
                        }
                        $(".channel-sptt-att-user-no").html(html2);
                    }
                });
            }
        });
    }
    //视频头条tab点击
    $(".channel-sptt-head-tab").click(function(){
        $(".channel-sptt-head-tab").removeClass("orange");
        $(this).addClass("orange");
        var code=$(this).attr("data-code");
        $(".channel-sptt-page-ul").html('');
        type_sel($(".channel-tab-act").attr("data-code"));
        $(".channel-c-main-list>div").removeClass("channel-list-act");
        $(".channel-c-main-list>div:first-child").addClass("channel-list-act");
        list($(".channel-tab-act").attr("data-code"));
        list_more($(".channel-tab-act").attr("data-code"));
        if(code=="1"){//关注
            $(".channel-sptt-tab-attention").removeClass("out");
        }else{//推荐
            $(".channel-sptt-tab-attention").addClass("out");
        }
    });
    //视频头条关注更多点击
    $(".channel-sptt-att-more").click(function(){
        window.location.href="channel-sptt-attention-more.html";
    });
    //视频头条关注按钮点击
    $("body").on("click",".sptt-gz-office",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
            alert(data.des);
            attention_list();
        });
    });
});