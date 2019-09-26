$(function(){
    var phone=getUrlParms("phone"),
        code=getUrlParms("code"),
        to=getUrlParms("to"),
        msg=getUrlParms("msg"),
        share_url='',
        sid=getUrlParms("sid");
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

    //滚动到顶部时tab栏固定
    var oTop = $(".personal-main-tab").offset().top;
    //获取导航栏的高度，此高度用于保证内容的平滑过渡
    var martop = $('.personal-main-tab').outerHeight();
    var sTop = 0;
    // //获取滚动距离
    $(window).scroll(function(){
        sTop = $(this).scrollTop();

        // 当导航栏到达屏幕顶端
        if (sTop >= oTop) {

            // 修改导航栏position属性，使之固定在屏幕顶端
            $(".personal-main-tab").addClass("personal-main-msg-fixed");

            // 修改内容的margin-top值，保证平滑过渡
            $(".personal-main-detail").css({ "margin-top": martop });
        } else {

            // 当导航栏脱离屏幕顶端时，回复原来的属性
            $(".personal-main-tab").removeClass("personal-main-msg-fixed");
            $(".personal-main-detail").css({ "margin-top": "0" });
        }
    });
    var users='',self=0;
    //用户信息
    ajax(http_url.url+"/personal/home",{"phone":phone},function(data){
        self=data.self;
        users=data.users;
        share_url=users.role!=3?"jsb_weixin/share_app/html/personal-new.html?phone="+phone:"jsb_weixin/share_app/html/personal-official.html?phone="+phone;
        wx_share();
        if(users.specialcolumns==0||users.specialcolumns==""||users.specialcolumns==null){
            $(".p-zl-title").hide();
        }
        $(".new-p-sptt-num").html("("+users.officials+")");
        $(".new-p-ss-num").html("("+users.brushs+")");
        $(".new-p-zl-num").html("("+users.specialcolumns+")");
        $(".new-p-sp-num>span").html(users.classifys||0);
        $(".new-p-xh-num").html("("+users.praise+")");
        if(data.self==1){
            $(".office-p-attention").addClass("out");
            $(".office-p-edit").removeClass("out");
            $(".office-xh").removeClass("out");
        }
        if(data.isAttention==1){
            $(".office-p-attention").html("取消关注").addClass("office-p-attention").removeClass("office-p-attention-add");
        }
        $(".personal-img-head").attr("src",headimage(users.headImage));
        $(".office-p-name").html(get_name(users));
        var province=users.address||'',companyName=users.companyName||'';
        $(".office-p-adress>div").html(users.officialAddress);
        $(".new-p-gz").html(users.fans);
        $(".new-p-fs").html(users.officials+users.brushs+users.classifys);
        $(".ss-num>span").html(users.brushNum);
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
            //专栏列表
            list("/brush/brushVideorRequirement",{
                "maxId": count_end,
                "sinceId":count_start,
                "specialcolumnId":$(".column-list-tab-act").attr("data-id"),
                "userId": phone,
            },"column-list-main-zl");
        });
        //视频头条列表
        list("/headvideo/list",{
            "maxId": count_end,
            "sinceId": count_start,
            "userId": users.phoneNumber
        },"column-list-main-sptt");
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
        if($(this).html()=="取消关注"){
            $(this).html("+ 关注").addClass("office-p-attention-add");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":0},attention);

        }else{
            $(this).html("取消关注").removeClass("office-p-attention-add");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);
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
                        <span class="brush-num-main inline-block">${change_m.watchNum>10000?change_m.watchNum/10000+"万":change_m.watchNum}观看</span>
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
                            <div class="channel-page-li-title" data-id="${change_m.id}">${change_m.title.length>40?change_m.title.slice(0,40)+'...':change_m.title}</div>
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
                        <span class="brush-num-main inline-block">${change_m.watchNum>10000?change_m.watchNum/10000+"万":change_m.watchNum}观看</span>
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
                            <div class="channel-page-li-title" data-id="${change_m.id}">${change_m.title.length>40?change_m.title.slice(0,40)+'...':change_m.title}</div>
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
    $("body").on("click",".office-p-edit",function(){
        window.location.href="office-edit-msg.html";
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
    //刷刷号点击
    $(".ss-num").click(function(){
        var text = $(".ss-num>span").html();
        var input = document.getElementById("ss-num-copy");
        input.value = text; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        alert("已复制");
    });
    //分享按钮点击
    $(".release>span").click(function(){
        $(".share-shadow").show();
    });
    $(".share-shadow").click(function(){
        $(".share-shadow").hide();
    });
    //微信分享
    function wx_share(){
        //配置微信信息
        var path_url=encodeURIComponent(window.location.href.split('#')[0]);
        $.ajax({
            type:"POST",
            url:http_url.url+"/wx/createJsapiSignature?url="+path_url,
            success:function(data){
                console.log(data.datum);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.datum.appid, // 必填，公众号的唯一标识
                    timestamp:data.datum.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.datum.noncestr, // 必填，生成签名的随机串
                    signature: data.datum.signature,// 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline',       // 分享到朋友圈接口
                        'onMenuShareAppMessage',  //  分享到朋友接口
                        'onMenuShareQQ',         // 分享到QQ接口
                        'onMenuShareQZone',// 分享到qq空间
                        'scanQRCode',// 微信扫一扫接口
                        'uploadImage',
                        'downloadImage'//下载图片
                    ] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    var shareData = {
                        title: "在刷刷，打开财税新世界",
                        desc: "行业大咖都在用刷刷，你还在等什么，快来围观！", //这里请特别注意是要去除html
                        link: total_share_url.url+share_url,
                        imgUrl: total_share_url.url+"jsb_weixin/share_app/img/share-logo.png",
                        trigger: function (res) {
                            console.log('用户点击发送给朋友');
                        },
                        success: function (res) {
                            console.log('已分享');
                        },
                        cancel: function (res) {
                            console.log('已取消');
                        },
                        fail: function (res) {
                            console.log(JSON.stringify(res));
                            console.log(shareData.link)
                        }
                    };
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareQZone(shareData);
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                });
                wx.error(function(res){
                    console.log(res)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            },
            error:function(){
                alert("程序出错,请重试")
            }
        });
    }
});