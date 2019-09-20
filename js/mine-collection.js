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
            var html='',datas=data.data;
            if(datas.length<3&&datas.length>1){
                $(".column-list-main").css("column-count","1");
                $(".column-list-div").css("width","33.8rem");
            }else{
                $(".column-list-main").css("column-count","2");
                $(".column-list-div").css("width","auto");
            }
            for(var i=0,len=datas.length;i<len;i++){
                var change_v=datas[i];
                if(sel=="ss"){
                    html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" onerror=src='../img/user.png' alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
                }else if(sel=="sp"){
                    html+=`<div class="channel-relevant-list" data-type="${change_v.video_type}" data-charge="${change_v.charge}" data-classify_id="${change_v.classify_id}" data-id="${change_v.id}" data-ifClassifyVip="${change_v.ifClassifyVip}"  data-userId="${change_v.userId}">  
                            <img src="${cover_src+change_v.cover}" alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${change_v.title.length>17?change_v.title.slice(0,17)+"..":change_v.title}</div>
                                <div>${change_v.video_type==1?change_v.classify_name:'视频头条'}</div>
                                <div class="orange ${change_v.charge==0||change_v.ifClassifyVip==0?'out':''}"">频道会员免费</div>
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
                var datas=data.data;
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    if(sel=="ss"){
                        html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" onerror=src='../img/user.png' alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
                    }else if(sel=="sp"){
                        html+=`<div class="channel-relevant-list" data-type="${change_v.video_type}" data-charge="${change_v.charge}" data-classify_id="${change_v.classify_id}" data-id="${change_v.id}" data-ifClassifyVip="${change_v.ifClassifyVip}"  data-userId="${change_v.userId}">  
                            <img src="${cover_src+change_v.cover}"  alt="">
                            <div class="inline-block channel-relevant-list-msg">
                                <div>${change_v.title.length>17?change_v.title.slice(0,17)+"..":change_v.title}</div>
                                <div>${change_v.video_type==1?change_v.classify_name:'视频头条'}</div>
                                <div class="orange ${change_v.charge==0||change_v.ifClassifyVip==0?'out':''}"">频道会员免费</div>
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
    $("body").on("click",".channel-relevant-list",function(e){
        var charge=$(this).attr("data-charge"),
            classify_id=$(this).attr("data-classify_id"),
            id=$(this).attr("data-id"),
            ifClassifyVip=$(this).attr("data-ifClassifyVip"),
            userId=$(this).attr("data-userId"),
            type=$(this).attr("data-type");
        if(type==1){
            if(charge=="0"||ifClassifyVip=="0"){
                window.location.href="channel-detail.html?classifyId="+classify_id+"&vid="+id+"&userid="+userId;
            }else{
                ajax(http_url.url+"/goods/classify/goods",{"id": classify_id},function(data){
                    var datas=data.data;
                    if(datas.classifyVip==0){
                        window.location.href="channel-detail.html?classifyId="+classify_id+"&vid="+id+"&userid="+userId;
                    }else if(datas.classifyVip==1||datas.classifyVip==2){
                        if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                            window.location.href="channel-vip-card.html?id="+classify_id;
                        }
                    }else if(datas.classifyVip==3){
                        if(confirm("此视频属于"+datas.name+"频道，您需要去关注并购买才可观看视频")){
                            window.location.href="channel-mine.html";
                        }
                    }
                });
            }
        }else{
            window.location.href="channel-sptt-detail.html?id="+id;
        }
    });
    //刷刷列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
});