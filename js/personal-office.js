$(function(){
    var phone=getUrlParms("phone"),code=getUrlParms("code"),to=getUrlParms("to"),msg=getUrlParms("msg"),sid=getUrlParms("sid");
    count_end=10;count_start=1;
    if(code==1){
        $(".back").click(function(){
            window.location.href="index.html";
        });
    }
    if(to){
        location.href = "#"+to;
        $(".personal-main-tab>div").removeClass("personal-main-tab-act");
        $(".personal-main-tab>div[data-html="+msg+"]").addClass("personal-main-tab-act");
        $(".column-list-main").hide();
        $("."+msg).show();
        if(msg=="p-ss"){
            list("/brush/brushVideorRequirement",{
                "maxId": count_end,
                "sinceId":count_start,
                "userId": phone,
            },'p-ss');
        }else if(msg=="p-xh"){
            list("/brush/brushVideorRequirement",{
                "maxId": count_end,
                "sinceId":count_start,
                "praise":'1',
                "userId": phone,
            },'p-xh');
        }else if(msg=="p-zl"){
            $(".column-list-main").show();
        }
    }
    var users='',self=0;
    //用户信息
    ajax(http_url.url+"/personal/home",{"phone":phone},function(data){
        self=data.self;
        users=data.users;
        if(users.specialcolumns==0||users.specialcolumns==""||users.specialcolumns==null){
            $(".p-zl-title").hide();
        }
        $(".new-p-sptt-num").html("("+users.officials+")");
        $(".new-p-ss-num").html("("+users.brushs+")");
        $(".new-p-zl-num").html("("+users.specialcolumns+")");
        $(".new-p-sp-num>span").html(users.classifys||0);
        if(data.self==1){
            $(".office-p-attention").addClass("out");
            $(".office-p-edit").removeClass("out");
        }
        if(data.isAttention==1){
            $(".office-p-attention").html("取消关注").addClass("attention-person-already");
        }
        $(".personal-img-head").attr("src",headimage(users.headImage));
        $(".office-p-name").html(get_name(users));
        var province=users.address||'',companyName=users.companyName||'';
        $(".office-p-adress>div").html(users.officialAddress);
        $(".new-p-gz").html(users.follow);
        $(".new-p-fs").html(users.fans);
        //视频头条类型
        ajax(http_url.url+"/headtype/headtype/classifyvideo",{ "userId": users.phoneNumber},function(data){
            var datas=data.data,html='';
            for(var i=0,len=datas.length;i<len;i++){
                var change_v=datas[i];
                html+=`
                    <div class="inline-block" data-id="${change_v.id}">${change_v.name} </div>
                `
            }
            $(".list-tab-sptt").html(html);
        });
        //专栏类型
        ajax(http_url.url+"/brush/allSpecialcolumn",{
            "userId":users.phoneNumber},function(data){
            var html='',datas=data.data;
            for(var i=0,len=datas.length;i<len;i++){
                var d_change=datas[i];
                html+=`<div class="inline-block ${sid&&sid==d_change.id? 'column-list-tab-act':(!sid&&i==0?'column-list-tab-act':'')}" data-id="${d_change.id}">${d_change.specialColumnName} </div>`
            }
            $(".list-tab-zl").html(html);
        });
        //视频头条列表
        list("/headvideo/list",{
            "maxId": count_end,
            "sinceId": count_start,
            "userId": users.phoneNumber
        },"column-list-main-sptt");
        //专栏列表
        list("/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "specialcolumnId":$(".column-list-tab-act").attr("data-id"),
            "userId": phone,
        },"column-list-main-zl");
    });
    //详情tab点击
    $(".personal-main-tab>div").click(function(){
        $(".personal-main-tab>div").removeClass("personal-main-tab-act");
        $(this).addClass("personal-main-tab-act");
        var code=$(this).attr("data-html");
        $(".personal-main-detail>div").hide();
        $("."+code).show();
        count_end=10;count_start=1;scroll_status=true;num=1;
        switch (code){
            case 'p-sptt':
                list("/headvideo/list",{
                    "maxId": count_end,
                    "sinceId": count_start,
                    "userId": phone
                },"column-list-main-sptt");
                break;
            case 'p-ss':
                list("/brush/brushVideorRequirement",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "userId": phone,
                },'p-ss');
                break;
            case 'p-zl':
                break;
            case 'p-xh':
                list("/brush/brushVideorRequirement",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "praise":'1',
                    "userId": phone,
                },'p-xh');
                break;
            case 'p-sp':
                list("/classifyvideo/videoshome",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "userId": phone,
                },'p-sp');
                break;
            default:return
        }
    });
    //视频头条tab点击
    $("body").on("click",".p-sptt>.column-list-tab>div",function(){
        $(".p-sptt>.column-list-tab>div").removeClass("column-list-tab-act");
        $(this).addClass("column-list-tab-act");
        count_end=10;count_start=1;scroll_status=true;num=1;
        list("/headvideo/list",{
            "headTypeId":$(this).attr("data-id"),
            "maxId": count_end,
            "sinceId": count_start,
            "userId": phone
        },"column-list-main-sptt")
    });
    //专栏tab点击
    $("body").on("click",".p-zl>.column-list-tab>div",function(){
        $(".p-zl>.column-list-tab>div").removeClass("column-list-tab-act");
        $(this).addClass("column-list-tab-act");
        count_end=10;count_start=1;scroll_status=true;num=1;
        list("/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "specialcolumnId":$(".column-list-tab-act").attr("data-id"),
            "userId": phone,
        },"column-list-main-zl");
    });
    //关注按钮点击
    $(".office-p-attention").click(function(){
        var that=$(this);
        function attention(data){
            alert(data.des);
        }
        if($(this).html()=="已关注"){
            $(this).html("+ 关注").addClass("office-p-attention-add");
            // ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":0},attention);

        }else{
            $(this).html("已关注").removeClass("office-p-attention-add");
            // ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);
        }
    });
    function list(jk,cc,sel){
        cc.maxId=10;cc.sinceId=1;
        ajax(http_url.url+jk,cc,function(data){
            var html='',mine_data=data.data;
            if(mine_data.length<3&&(sel=="p-ss"||sel=="column-list-main-zl"||sel=="p-xh")){
                $(".column-list-main").css("column-count","1")
            }
            for(var i=0,len=mine_data.length;i<len;i++){
                var change_m=mine_data[i];
                if(sel=="p-ss"||sel=="column-list-main-zl"||sel=="p-xh"){
                    html+=`<div class="column-list-div inline-block ${change_m.checkStatus!=2?'':'out'}"  data-checkStatus="${change_m.checkStatus}" data-id="${change_m.id}" data-vid="${change_m.vid}">
                        <img src="${cover_src+change_m.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_m.title.length>18?change_m.title.slice(0,18)+"..":change_m.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_m.headImage)}" alt="">
                                <div class="inline-block">${get_name(change_m).length>8?get_name(change_m).slice(0,8)+"...":get_name(change_m)}</div>
                            </div>
                        </div>
                    </div>`
                }else if(sel=="p-sp"){
                    html+=`<div class="channel-relevant-list" data-charge="${change_m.charge}" data-classify_id="${change_m.classify_id}" data-id="${change_m.id}" data-ifClassifyVip="${change_m.ifClassifyVip}"  data-userId="${change_m.userId}">  
                            <img src="${cover_src+change_m.cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${change_m.title.length>17?change_m.title.slice(0,17)+"..":change_m.title}</div>
                                <div>${change_m.classify_name}</div>
                                <div class="orange ${change_m.charge==0||change_m.ifClassifyVip==0?'out':''}"">频道会员免费</div>
                            </div>
                        </div>`
                }else if(sel=="column-list-main-sptt"){
                    html+=`
                         <div class="channel-page-li channel-page-li-sptt" data-id="${change_m.id}">
                            <img src="${cover_src+change_m.cover}" data-id="${change_m.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_m.watch_num)<10000?change_m.watch_num:change_m.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_m.id}">${change_m.title.length>20?change_m.title.slice(0,20)+'...':change_m.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_m.id}">
                                    <img class="channel-sptt-userimg"  data-id="${change_m.id}" src="${headimage(change_m.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_m.role==3?'':'out'}" data-id="${change_m.id}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_m.id}">
                                    <div>${get_name(change_m)}</div>
                                    <div>${timeago(change_m.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_m.head_type}">${change_m.videoTypeName}</div>
                            </div>
                        </div>
                    `
                }
            }
            $("."+sel).html(html);
        })
    }
    function list_more(jk,cc,sel){
        ajax(http_url.url+jk,cc,function(data){
            var html='';
            if(mine_data!=''){
                var mine_data=data.data;
                for(var i=0,len=mine_data.length;i<len;i++){
                    var change_m=mine_data[i];
                    if(sel=="p-ss"||sel=="column-list-main-zl"||sel=="p-xh"){
                        html+=`<div class="column-list-div inline-block ${change_m.checkStatus!=2?'':'out'}"  data-checkStatus="${change_m.checkStatus}" data-id="${change_m.id}" data-vid="${change_m.vid}">
                        <img src="${cover_src+change_m.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_m.title.length>18?change_m.title.slice(0,18)+"..":change_m.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_m.headImage)}" alt="">
                                <div class="inline-block">${get_name(change_m).length>8?get_name(change_m).slice(0,8)+"...":get_name(change_m)}</div>
                            </div>
                        </div>
                    </div>`
                    }else if(sel=="p-sp"){
                        html+=`<div class="channel-relevant-list" data-charge="${change_m.charge}" data-classify_id="${change_m.classify_id}" data-id="${change_m.id}" data-ifClassifyVip="${change_m.ifClassifyVip}"  data-userId="${change_m.userId}">  
                            <img src="${cover_src+change_m.cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${change_m.title.length>17?change_m.title.slice(0,17)+"..":change_m.title}</div>
                                <div>${change_m.classify_name}</div>
                                <div class="orange ${change_m.charge==0||change_m.ifClassifyVip==0?'out':''}"">频道会员免费</div>
                            </div>
                        </div>`
                    }else if(sel=="column-list-main-sptt"){
                        html+=`
                         <div class="channel-page-li channel-page-li-sptt" data-id="${change_m.id}">
                            <img src="${cover_src+change_m.cover}" data-id="${change_m.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_m.watch_num)<10000?change_m.watch_num:change_m.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_m.id}">${change_m.title.length>20?change_m.title.slice(0,20)+'...':change_m.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_m.id}">
                                    <img class="channel-sptt-userimg"  data-id="${change_m.id}" src="${headimage(change_m.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_m.role==3?'':'out'}" data-id="${change_m.id}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_m.id}">
                                    <div>${get_name(change_m)}</div>
                                    <div>${timeago(change_m.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_m.head_type}">${change_m.videoTypeName}</div>
                            </div>
                        </div>
                    `
                    }
                }
                $("."+sel).append(html);
            }else{
                scroll_status=false;
            }
        })
    }
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
        var scrollHeight = $(document).height();   //当前页面的总高度
        var clientHeight = $(this).height();    //当前可视的页面高度
        var code=$(".personal-main-tab-act").attr("data-html");
        //console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
        if(scrollTop + clientHeight >= scrollHeight-1){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
            //滚动条到达底部
            //alert(3);
            if(scroll_status==true){
                num+=1;
                count_start=((num-1)*10)+1;
                count_end=num*10;
                // console.log(code);
                switch (code){
                    case 'p-ss':
                        list_more("/brush/brushVideorRequirement",{
                            "maxId": count_end,
                            "sinceId":count_start,
                            "userId": phone,
                        },'p-ss');
                        break;
                    case 'p-zl':
                        list_more("/brush/brushVideorRequirement",{
                            "maxId": count_end,
                            "sinceId":count_start,
                            "specialcolumnId":".column-list-tab-act&&data-id",
                        },"p-zl>column-list-main");
                        break;
                    case 'p-sp':
                        list_more("/classifyvideo/videoshome",{
                            "maxId": count_end,
                            "sinceId":count_start,
                            "userId": phone,
                        },'p-sp');
                        break;
                    default:return
                }
            }
            // console.log(scroll_status);
            // $(".msg-loading").hide();
        }else if(scrollTop<=0){
            //滚动条到达顶部
            // alert(4)
            //滚动条距离顶部的高度小于等于0

        }
    });
    //关注和粉丝点击
    $(".atten-click").click(function(){
        var msg='';
        if(self==0){
            msg="?phoneNum="+phone;
        }
        window.location.href=$(this).attr("data-url")+msg;
    });
    //编辑个人信息
    $("body").on("click",".edit-personal-msg",function(){
        if(users.role==1){
            window.location.href="../html/mine-personal-data.html";
        }else if(users.role==2){
            window.location.href="../html/mine-apply-consultant.html";
        }
    });
    //视频列表点击
    $("body").on("click",".p-sp>div",function(){
        var charge=$(this).attr("data-charge"),
            classify_id=$(this).attr("data-classify_id"),
            id=$(this).attr("data-id"),
            ifClassifyVip=$(this).attr("data-ifClassifyVip"),
            userId=$(this).attr("data-userId");
        if(charge=="0"||ifClassifyVip=="0"){
            window.location.href="channel-detail.html?classifyId="+classify_id+"&vid="+id+"&userid="+userId;
        }else{
            if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                window.location.href="channel-vip-card.html?id="+classify_id;
            }
        }
    });
    //刷刷列表点击
    $("body").on("click",".column-list-div",function(){
        if(self==0){
            window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
        }else if(self==1){
            window.location.href="brush-nopass-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
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
});