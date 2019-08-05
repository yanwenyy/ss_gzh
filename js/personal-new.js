$(function(){
    var phone=getUrlParms("phone"),code=getUrlParms("code"),to=getUrlParms("to"),msg=getUrlParms("msg");
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
        if(users.lecturer==0){
            $(".p-sp-title").hide();
        }
        $(".new-p-ss-num").html("("+users.brushs+")");
        $(".new-p-xh-num").html("("+users.praise+")");
        $(".new-p-zl-num").html("("+users.specialcolumns+")");
        $(".new-p-wd-num").html("("+users.answers+")");
        $(".new-p-sp-num>span").html(users.classifys||0);
        if(data.self==1){
            $(".attention-person").hide();
            $(".edit-personal-msg").show();
        }
        if(data.isAttention==1){
            $(".attention-person").html("取消关注").addClass("attention-person-already");
        }
        if(users.role==1){
            $(".user-p").removeClass("out");
            $(".expert-p").addClass("out");
            $(".new-p-dj>img").attr("src",get_score(users.integralScore,users.aision,users.vip));
        }else{
            $(".new-p-dj").html(users.levelName);
        }
        $(".personal-img-head").attr("src",headimage(users.headImage));
        $(".new-p-name").html(get_name(users));

        $(".new-p-counselorDuty").html(`
            <span class="inline-block new-p-js ${users.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</span><span class="inline-block new-p-zxs orange ${users.role==2?'':'out'}"><img src="../img/fans-zxs.png" alt="">${users.counselorDuty}</span>
        `);
        var province=users.address||'',companyName=users.companyName||'';
        $(".new-p-address").html(province+` <span class="gray-line inline-block ${province!=''&&companyName!=''?'':'out'}"></span> `+companyName);
        $(".new-p-gz").html(users.follow);
        $(".new-p-fs").html(users.fans);
        $(".new-p-cn").html(parseFloat(users.grScore).toFixed(1));
        $(".new-p-zx").html(parseFloat(users.adScore).toFixed(1));
        $(".personal-new-smw>div").html(parseFloat(users.consultMoney).toFixed(2)+"元 /次 ");
        var adepts=[];
        for(var i in users.adepts){
            adepts.push(users.adepts[i])
        }
        $(".new-p-scly").html(adepts.join(",").length>45?adepts.join(",").slice(0,45)+"...":adepts.join(","));
        $(".new-p-scly-title>img").attr("data-html",adepts.join(", "));
        var experience=users.experience?(users.experience.length>45?users.experience.slice(0,45)+"...":users.experience):'TA有些低调...';
        $(".new-p-grjs").html(experience);
        $(".new-p-grjs-title>img").attr("data-html",users.experience?users.experience:'TA有些低调...');
        if(msg==null||msg==''){
            list("/brush/brushVideorRequirement",{
                "maxId": count_end,
                "sinceId":count_start,
                "userId": phone,
            },'p-ss');
        }
        ajax(http_url.url+"/brush/allSpecialcolumn",{
            "userId":phone
        },function(data){
            var html='';
            for(var i=0;i<data.data.length;i++){
                html+=`<div class="inline-block ${i==0?'column-list-tab-act':''}" data-id="${data.data[i].id}">${data.data[i].specialColumnName} </div>`
            }
            $(".column-list-tab").html(html);
            list("/brush/brushVideorRequirement",{
                "maxId": count_end,
                "sinceId":count_start,
                "specialcolumnId":$(".column-list-tab-act").attr("data-id"),
            },"column-list-main-zl");
        });
    });
    //详情tab点击
    $(".personal-main-tab>div").click(function(){
        $(".personal-main-tab>div").removeClass("personal-main-tab-act");
        $(this).addClass("personal-main-tab-act");
        var code=$(this).attr("data-html");
        $(".personal-main-detail>div").hide();
        $("."+code).show();
        count_end=10;count_start=1,scroll_status=true,num=1;
        switch (code){
            case 'p-ss':
                list("/brush/brushVideorRequirement",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "userId": phone,
                },'p-ss');
                // list_more("/brush/brushVideorRequirement",{
                //     "maxId": count_end,
                //     "sinceId":count_start,
                //     "userId": phone,
                // },'p-ss');
                break;
            case 'p-zl':
                // list("/brush/brushVideorRequirement",{
                //     "maxId": count_end,
                //     "sinceId":count_start,
                //     "userId": phone,
                // },'p-zl');
                // list_more("/brush/brushVideorRequirement",{
                //     "maxId": count_end,
                //     "sinceId":count_start,
                //     "userId": phone,
                // },'p-zl');
                break;
            case 'p-xh':
                list("/brush/brushVideorRequirement",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "praise":'1',
                    "userId": phone,
                },'p-xh');
                // list_more("/brush/brushVideorRequirement",{
                //     "maxId": count_end,
                //     "sinceId":count_start,
                //     "praise":'1',
                //     "userId": phone,
                // },'p-xh');
                break;
            case 'p-wd':
                list("/personal/user/adop",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "uuid": phone,
                },'p-wd');
                // list_more("/personal/user/adop",{
                //     "maxId": count_end,
                //     "sinceId":count_start,
                //     "uuid": phone,
                // },'p-wd');
                break;
            case 'p-sp':
                list("/classifyvideo/videoshome",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "userId": phone,
                },'p-sp');
                // list_more("/classifyvideo/videoshome",{
                //     "maxId": count_end,
                //     "sinceId":count_start,
                //     "userId": phone,
                // },'p-sp');
                break;
            default:return
        }
    });
    function list(jk,data,sel){
        ajax(http_url.url+jk,data,function(data){
            var html='';
            if(data.data.length<3&&(sel=="p-ss"||sel=="column-list-main-zl"||sel=="p-xh")){
                $(".column-list-main").css("column-count","1")
            }
            for(var i=0;i<data.data.length;i++){
                if(sel=="p-ss"||sel=="column-list-main-zl"||sel=="p-xh"){
                    html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
                        <img src="${cover_src+data.data[i].image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${data.data[i].title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(data.data[i].headImage)}" alt="">
                                <div class="inline-block">${get_name(data.data[i])}</div>
                            </div>
                        </div>
                    </div>`
                }else if(sel=="p-sp"){
                    html+=`<div class="channel-relevant-list" data-charge="${data.data[i].charge}" data-classify_id="${data.data[i].classify_id}" data-id="${data.data[i].id}" data-ifClassifyVip="${data.data[i].ifClassifyVip}"  data-userId="${data.data[i].userId}">  
                            <img src="${cover_src+data.data[i].cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${data.data[i].title.length>17?data.data[i].title.slice(0,17)+"..":data.data[i].title}</div>
                                <div>${data.data[i].classify_name}</div>
                                <div class="orange ${data.data[i].charge==0||data.data[i].ifClassifyVip==0?'out':''}"">频道会员免费</div>
                            </div>
                        </div>`
                }else if(sel=="p-wd"){
                    var answer=data.data;
                    var content;
                    if(answer[i].content.length>40){
                        content=answer[i].content.substr(0,40)+"...";
                    }else{
                        content=answer[i].content;
                    }
                    var if_buy="",cwatch_buy='';
                    if(answer[i].status=="1"){
                        if_buy="已围观";
                        cwatch_buy="cwatch_buy";
                    }else{
                        if_buy="1元 围观"
                    }
                    html+=`
                    <div class="box-sizing one_wg"  data-id="${answer[i].uuid}">
                            <div class="clist-head">
                                <img src="${headimage(answer[i].headImage)}" alt="" onerror=src="../img/user.png" data-role="${answer[i].role}" data-phone="${answer[i].phoneNumber}">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${get_name(answer[i])}
                                    </div>
                                    <div class="user-grade">
                                        <img src="${get_score(answer[i].integralScore,answer[i].aision,answer[i].vip)}" alt="">
                                    </div>
                                </div>
                                <div class="cwatch ${cwatch_buy}"  data-id="${answer[i].uuid}">${if_buy}</div>
                            </div>
                            <div class="clist-msg">
                                ${content}
                            </div>
                            <div class="clist-foot">
                                <div>${format(answer[i].date)}</div>
                                <div>
                                    <div class="inline-block">点赞 ${answer[i].approveNum}</div>
                                    <div class="inline-block">围观 ${answer[i].lookNum}</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
            $("."+sel).html(html);
        })
    }
    // function list_more(jk,data,sel){
    //     scroll_more(http_url.url+jk,data,function(data){
    //         var html='';
    //         if(data.data!=''){
    //             for(var i=0;i<data.data.length;i++){
    //                 if(sel=="p-ss"||sel=="p-zl"||sel=="p-xh"){
    //                     html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
    //                     <img src="${cover_src+data.data[i].image}" alt="">
    //                     <div class="box-sizing">
    //                         <div class="column-list-title">${data.data[i].title}</div>
    //                         <div class="column-list-name">
    //                             <img src="../img/user.png" alt="">
    //                             <div class="inline-block">${get_name(data.data[i])}</div>
    //                         </div>
    //                     </div>
    //                 </div>`
    //                 }else if(sel=="p-sp"){
    //                     html+=`<div class="channel-relevant-list" data-charge="${data.data[i].charge}" data-classify_id="${data.data[i].classify_id}" data-id="${data.data[i].id}" data-ifClassifyVip="${data.data[i].ifClassifyVip}"  data-userId="${data.data[i].userId}">
    //                         <img src="${cover_src+data.data[i].cover}" alt="">
    //                         <div class="inline-block channel-relevant-list-msg">
    //                             <div>${data.data[i].title}</div>
    //                             <div>${get_name(data.data[i])}</div>
    //                             <div class="orange ${data.data[i].charge==0?'':'out'}"">频道会员免费</div>
    //                         </div>
    //                     </div>`
    //                 }else if(sel=="p-wd"){
    //                     var answer=data.data;
    //                     var content;
    //                     if(answer[i].content.length>40){
    //                         content=answer[i].content.substr(0,40)+"...";
    //                     }else{
    //                         content=answer[i].content;
    //                     }
    //                     var if_buy="",cwatch_buy='';
    //                     if(answer[i].status=="1"){
    //                         if_buy="已围观";
    //                         cwatch_buy="cwatch_buy";
    //                     }else{
    //                         if_buy="1元 围观"
    //                     }
    //                     html+=`
    //                 <div class="box-sizing one_wg"  data-id="${answer[i].uuid}">
    //                         <div class="clist-head">
    //                             <img src="${head_src+answer[i].headImage}" alt="" onerror=src="../img/user.png" data-role="${answer[i].role}" data-phone="${answer[i].phoneNumber}">
    //                             <div class="inline-block">
    //                                 <div class="user-name">
    //                                     ${get_name(answer[i])}
    //                                 </div>
    //                                 <div class="user-grade">
    //                                     <img src="${get_score(answer[i].integralScore,answer[i].aision,answer[i].vip)}" alt="">
    //                                 </div>
    //                             </div>
    //                             <div class="cwatch ${cwatch_buy}"  data-id="${answer[i].uuid}">${if_buy}</div>
    //                         </div>
    //                         <div class="clist-msg">
    //                             ${content}
    //                         </div>
    //                         <div class="clist-foot">
    //                             <div>${format(answer[i].date)}</div>
    //                             <div>
    //                                 <div class="inline-block">点赞 ${answer[i].approveNum}</div>
    //                                 <div class="inline-block">围观 ${answer[i].lookNum}</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 `;
    //                 }
    //             }
    //             $("."+sel).append(html);
    //         }else{
    //             scroll_status=false;
    //         }
    //     })
    // }
    //个人简介和擅长领域点击
    function list_more(jk,data,sel){
        ajax(http_url.url+jk,data,function(data){
            var html='';
            if(data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    if(sel=="p-ss"||sel=="p-zl"||sel=="p-xh"){
                        html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
                        <img src="${cover_src+data.data[i].image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${data.data[i].title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(data.data[i].headImage)}" alt="">
                                <div class="inline-block">${get_name(data.data[i])}</div>
                            </div>
                        </div>
                    </div>`
                    }else if(sel=="p-sp"){
                        html+=`<div class="channel-relevant-list" data-charge="${data.data[i].charge}" data-classify_id="${data.data[i].classify_id}" data-id="${data.data[i].id}" data-ifClassifyVip="${data.data[i].ifClassifyVip}"  data-userId="${data.data[i].userId}">
                            <img src="${cover_src+data.data[i].cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${data.data[i].title.length>17?data.data[i].title.slice(0,17)+"..":data.data[i].title}</div>
                                <div>${get_name(data.data[i])}</div>
                                <div class="orange ${data.data[i].charge==0||data.data[i].ifClassifyVip==0?'':'out'}"">频道会员免费</div>
                            </div>
                        </div>`
                    }else if(sel=="p-wd"){
                        var answer=data.data;
                        var content;
                        if(answer[i].content.length>40){
                            content=answer[i].content.substr(0,40)+"...";
                        }else{
                            content=answer[i].content;
                        }
                        var if_buy="",cwatch_buy='';
                        if(answer[i].status=="1"){
                            if_buy="已围观";
                            cwatch_buy="cwatch_buy";
                        }else{
                            if_buy="1元 围观"
                        }
                        html+=`
                    <div class="box-sizing one_wg"  data-id="${answer[i].uuid}">
                            <div class="clist-head">
                                <img src="${headimage(answer[i].headImage)}" alt="" onerror=src="../img/user.png" data-role="${answer[i].role}" data-phone="${answer[i].phoneNumber}">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${get_name(answer[i])}
                                    </div>
                                    <div class="user-grade">
                                        <img src="${get_score(answer[i].integralScore,answer[i].aision,answer[i].vip)}" alt="">
                                    </div>
                                </div>
                                <div class="cwatch ${cwatch_buy}"  data-id="${answer[i].uuid}">${if_buy}</div>
                            </div>
                            <div class="clist-msg">
                                ${content}
                            </div>
                            <div class="clist-foot">
                                <div>${format(answer[i].date)}</div>
                                <div>
                                    <div class="inline-block">点赞 ${answer[i].approveNum}</div>
                                    <div class="inline-block">围观 ${answer[i].lookNum}</div>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                }
                $("."+sel).append(html);
            }else{
                scroll_status=false;
            }
        })
    }
    //个人简介和擅长领域点击
    $(".p-g-title>img").click(function(){
        var title=$(this).attr("data-title"),html=$(this).attr("data-html");
        $(".detail-body-title>div").html(title);
        $(".detail-body-main").html(html);
        $(".detail-model").show();
    });
    //关闭弹窗
    $(".close-model-p").click(function(){
        $(".detail-model").hide();
    });
    //关注按钮点击
    $(".attention-person").click(function(){
        var that=$(this);
        function attention(data){
            alert(data.des);
        }
        if($(this).html()=="取消关注"){
            $(this).html("+ 关注").removeClass("attention-person-already");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":0},attention);

        }else{
            $(this).html("取消关注").addClass("attention-person-already");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);
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
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
    //专栏tab点击
    $("body").on("click",".column-list-tab>div",function(){
        $(".column-list-tab>div").removeClass("column-list-tab-act");
        $(this).addClass("column-list-tab-act");
        count_start=1;count_end=10;
        list("/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "specialcolumnId":$(".column-list-tab-act").attr("data-id"),
        },"column-list-main-zl");
    });
    //1元围观
    $("body").on("click",".one_wg",function(){
        var cwatch_id=$(this).attr("data-id");
        //微信授权
        function cwatch_jurisdiction(data){
            console.log(data);
            if(data.isBuy==1){//未购买
                window.location.href="../html/cwatch.html?cwatch_id="+cwatch_id;
            }else if(data.isBuy==0){//已购买
                window.location.href="../html/watch-anwser.html?cwatch_id="+cwatch_id+"&&msg="+phone;
            }
        }
        ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+cwatch_id,cwatch_jurisdiction);
    });
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
                    case 'p-xh':
                        list_more("/brush/brushVideorRequirement",{
                            "maxId": count_end,
                            "sinceId":count_start,
                            "praise":'1',
                            "userId": phone,
                        },'p-xh');
                        break;
                    case 'p-wd':
                        list_more("/personal/user/adop",{
                            "maxId": count_end,
                            "sinceId":count_start,
                            "uuid": phone,
                        },'p-wd');
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
});