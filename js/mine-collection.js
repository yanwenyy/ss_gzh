$(function(){
    // $("body").on("touchstart",".list-li", function(e) {
    //     e.preventDefault();
    //     startX = e.originalEvent.changedTouches[0].pageX,
    //         startY = e.originalEvent.changedTouches[0].pageY;
    //     $(".list-li").not($(this)).attr("style"," transform: translateX(0rem)");
    // });
    // $("body").on("touchmove",".list-li", function(e) {
    //     e.preventDefault();
    //     moveEndX = e.originalEvent.changedTouches[0].pageX,
    //         moveEndY = e.originalEvent.changedTouches[0].pageY,
    //         X = moveEndX - startX,
    //         Y = moveEndY - startY;
    //     // console.log(X);
    //     if(X<0){
    //         $(this).attr("style"," transform: translateX(-15.7rem)")
    //     }else if(X>0||X==0){
    //         $(this).attr("style"," transform: translateX(0rem)")
    //     }
    // });
    // //收藏列表
    // function get_collection(data){
    //     console.log(data);
    //     if(data.articles==""){
    //         $(".none-msg").show();
    //     }else{
    //         $(".none-msg").hide();
    //     }
    //     var articles=data.articles,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
    //     for(var i=0;i<articles.length;i++){
    //         createDate=format(articles[i].createDate);
    //         if(articles[i].userLevel!=null){
    //             user_img=head_src+articles[i].userLevel.headImage;
    //             user_name=articles[i].userLevel.realName;
    //             user_role=articles[i].userLevel.role;
    //             user_counselorDuty=articles[i].userLevel.counselorDuty;
    //         }else{
    //             user_img="";
    //             user_name='';
    //             user_role='';
    //             user_counselorDuty='';
    //         }
    //         csq_detail="&&user_img="+user_img+"&&user_name="+user_name+"&&user_role="+user_role+"&&user_counselorDuty="+user_counselorDuty+"&&category_name="+articles[i].category.name+"&&createDate="+createDate;
    //         if(articles[i].top==1){
    //             zd_img="../img/icon-article-top.png"
    //         }else{
    //             zd_img='';
    //         }
    //         var title="";
    //         if(articles[i].title.length>40){
    //             title=articles[i].title.substr(0,40)+"...";
    //         }else{
    //             title=articles[i].title
    //         }
    //         html+=`<li class="list-li" data-id="${articles[i].uuid}" data-detail="${csq_detail}">
    //         <div class="con collection-list-msg" data-id="${articles[i].uuid}">
    //             <div>${title||""}</div>
    //             <div>
    //                 <div class="inline-block">${createDate}</div>
    //                 <div class="inline-block">
    //                     <span>评论<span class="blue">${articles[i].discussNum}</span></span>
    //                     <span>点赞<span class="red">${articles[i].approveNum}</span></span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="btn">
    //             <div class="box-sizing">取消收藏</div>
    //         </div>
    //     </li>`;
    //     }
    //     $(".list-ul").html(html);
    //     back_login(data);
    // }
    // function get_collection_more(data){
    //     console.log(data);
    //     var articles=data.articles,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
    //     if(articles!=""){
    //         for(var i=0;i<articles.length;i++){
    //             createDate=format(articles[i].createDate);
    //             if(articles[i].userLevel!=null){
    //                 user_img=head_src+articles[i].userLevel.headImage;
    //                 user_name=articles[i].userLevel.realName;
    //                 user_role=articles[i].userLevel.role;
    //                 user_counselorDuty=articles[i].userLevel.counselorDuty;
    //             }else{
    //                 user_img="";
    //                 user_name='';
    //                 user_role='';
    //                 user_counselorDuty='';
    //             }
    //             csq_detail="&&user_img="+user_img+"&&user_name="+user_name+"&&user_role="+user_role+"&&user_counselorDuty="+user_counselorDuty+"&&category_name="+articles[i].category.name+"&&createDate="+createDate;
    //             if(articles[i].top==1){
    //                 zd_img="../img/icon-article-top.png"
    //             }else{
    //                 zd_img='';
    //             }
    //             var title="";
    //             if(articles[i].title.length>40){
    //                 title=articles[i].title.substr(0,40)+"...";
    //             }else{
    //                 title=articles[i].title
    //             }
    //             html+=`<li class="list-li" data-id="${articles[i].uuid}" data-detail="${csq_detail}">
    //         <div class="con collection-list-msg" data-id="${articles[i].uuid}">
    //             <div>${title||""}</div>
    //             <div>
    //                 <div class="inline-block">${createDate}</div>
    //                 <div class="inline-block">
    //                     <span>评论<span class="blue">${articles[i].discussNum}</span></span>
    //                     <span>点赞<span class="red">${articles[i].approveNum}</span></span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="btn">
    //             <div class="box-sizing">取消收藏</div>
    //         </div>
    //     </li>`;
    //         }
    //         $(".list-ul").append(html);
    //     }else{
    //         scroll_status=false;
    //         $(".msg-loading").hide();
    //     }
    // }
    // ajax(http_url.url+"/article/articleCollection",{"sinceId":count_start,"maxId":count_end},get_collection);
    // scroll_more(http_url.url+"/article/articleCollection",{"sinceId":count_start,"maxId":count_end},get_collection_more);
    // //reload_msg($(".mine-tab-buy"),http_url.url+"/article/articleCollection",{"sinceId":count_start,"maxId":count_end},get_collection);
    // //取消收藏
    // $("body").on("click",".btn",function(){
    //     var that=$(this);
    //     var collection_id=that.parent().attr("data-id");
    //     ajax(http_url.url+"/article/cancel",{"articleUuid":collection_id},del_collection);
    //     function del_collection(data){
    //         console.log(data);
    //         if(data.code==1){
    //             alert(data.des);
    //             that.parent().remove();
    //         }
    //     }
    // });
    // //收藏列表点击
    // $("body").on("click",".collection-list-msg",function(){
    //     var csq_id=$(this).attr("data-id");
    //     console.log(csq_id);
    //     window.location.href="../html/csq_detail.html?csq_id="+csq_id;
    // })
    var user='';
    ajax_nodata(http_url.url+"/user/message",function(data){
        user=data;
        list("/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "store":'1',
            "userId": user.phoneNumber,
        },'ss');
        list_more("/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "store":'1',
            "userId": user.phoneNumber,
        },'ss');
    });
    $(".collection-list-tab>div").click(function(){
        $(".collection-list-tab>div").removeClass("collection-list-act");
        $(this).addClass("collection-list-act");
        var html=$(this).attr("data-html");
        $(".collection-list").hide();
        $('.'+html).show();
        count_end=10;count_start=1;
        switch (html){
            case 'ss':
                list("/brush/brushVideorRequirement",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "store":'1',
                    "userId": user.phoneNumber,
                },'ss');
                list_more("/brush/brushVideorRequirement",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "store":'1',
                    "userId": user.phoneNumber,
                },'ss');
                break;
            case 'sp':
                list("/classifyvideo/videostore",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "userId": user.phoneNumber,
                },'sp');
                list_more("/classifyvideo/videostore",{
                    "maxId": count_end,
                    "sinceId":count_start,
                    "userId": user.phoneNumber,
                },'ss');
                break;
            default:return
        }
    });
    function list(jk,data,sel){
        ajax(http_url.url+jk,data,function(data){
            var html='';
            if(data.data.length<3&&data.data.length>1){
                $(".column-list-main").css("column-count","1");
                $(".column-list-div").css("width","33.8rem");
            }else{
                $(".column-list-main").css("column-count","2");
                $(".column-list-div").css("width","auto");
            }
            for(var i=0;i<data.data.length;i++){
                if(sel=="ss"){
                    html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
                        <img src="${cover_src+data.data[i].image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${data.data[i].title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(data.data[i].headImage)}" onerror=src='../img/user.png' alt="">
                                <div class="inline-block">${get_name(data.data[i])}</div>
                            </div>
                        </div>
                    </div>`
                }else if(sel=="sp"){
                    html+=`<div class="channel-relevant-list" data-charge="${data.data[i].charge}" data-classify_id="${data.data[i].classify_id}" data-id="${data.data[i].id}" data-ifClassifyVip="${data.data[i].ifClassifyVip}"  data-userId="${data.data[i].userId}">  
                            <img src="${cover_src+data.data[i].cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${data.data[i].title.length>17?data.data[i].title.slice(0,17)+"..":data.data[i].title}</div>
                                <div>${data.data[i].classify_name}</div>
                                <div class="orange ${data.data[i].charge==0||data.data[i].ifClassifyVip==0?'out':''}"">频道会员免费</div>
                            </div>
                        </div>`
                }
            }
            $("."+sel).html(html);
        })
    }
    function list_more(jk,data,sel){
        scroll_more(http_url.url+jk,data,function(data){
            var html='';
            if(data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    if(sel=="ss"){
                        html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
                        <img src="${cover_src+data.data[i].image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${data.data[i].title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(data.data[i].headImage)}"  onerror=src='../img/user.png' alt="">
                                <div class="inline-block">${get_name(data.data[i])}</div>
                            </div>
                        </div>
                    </div>`
                    }else if(sel=="sp"){
                        html+=`<div class="channel-relevant-list" data-charge="${data.data[i].charge}" data-classify_id="${data.data[i].classify_id}" data-id="${data.data[i].id}" data-ifClassifyVip="${data.data[i].ifClassifyVip}"  data-userId="${data.data[i].userId}">  
                            <img src="${cover_src+data.data[i].cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${data.data[i].title.length>17?data.data[i].title.slice(0,17)+"..":data.data[i].title}</div>
                                <div>${data.data[i].classify_name}</div>
                                <div class="orange ${data.data[i].charge==0||data.data[i].ifClassifyVip==0?'out':''}"">频道会员免费</div>
                            </div>
                        </div>`
                    }
                }
                $("."+sel).append(html);
            }else{
                scroll_status=false;
            }
        });
    }
    //视频列表点击
    $("body").on("click",".sp>div",function(){
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
});