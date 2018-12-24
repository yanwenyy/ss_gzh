$(function(){
    $("body").on("touchstart",".list-li", function(e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
        $(".list-li").not($(this)).attr("style"," transform: translateX(0rem)");
    });
    $("body").on("touchmove",".list-li", function(e) {
        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;
        // console.log(X);
        if(X<0){
            $(this).attr("style"," transform: translateX(-15.7rem)")
        }else if(X>0||X==0){
            $(this).attr("style"," transform: translateX(0rem)")
        }
    });
    //收藏列表
    function get_collection(data){
        console.log(data);
        if(data.articles==""){
            $(".none-msg").show();
        }else{
            $(".none-msg").hide();
        }
        var articles=data.articles,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
        for(var i=0;i<articles.length;i++){
            createDate=format(articles[i].createDate);
            if(articles[i].userLevel!=null){
                user_img=head_src+articles[i].userLevel.headImage;
                user_name=articles[i].userLevel.realName;
                user_role=articles[i].userLevel.role;
                user_counselorDuty=articles[i].userLevel.counselorDuty;
            }else{
                user_img="";
                user_name='';
                user_role='';
                user_counselorDuty='';
            }
            csq_detail="&&user_img="+user_img+"&&user_name="+user_name+"&&user_role="+user_role+"&&user_counselorDuty="+user_counselorDuty+"&&category_name="+articles[i].category.name+"&&createDate="+createDate;
            if(articles[i].top==1){
                zd_img="../img/icon-article-top.png"
            }else{
                zd_img='';
            }
            var title="";
            if(articles[i].title.length>40){
                title=articles[i].title.substr(0,40)+"...";
            }else{
                title=articles[i].title
            }
            html+=`<li class="list-li" data-id="${articles[i].uuid}" data-detail="${csq_detail}">
            <div class="con collection-list-msg" data-id="${articles[i].uuid}">
                <div>${title||""}</div>
                <div>
                    <div class="inline-block">${createDate}</div>
                    <div class="inline-block">
                        <span>评论<span class="blue">${articles[i].discussNum}</span></span>
                        <span>点赞<span class="red">${articles[i].approveNum}</span></span>
                    </div>
                </div>
            </div>
            <div class="btn">
                <div class="box-sizing">取消收藏</div>
            </div>
        </li>`;
        }
        $(".list-ul").html(html);
        back_login(data);
    }
    function get_collection_more(data){
        console.log(data);
        var articles=data.articles,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
        if(articles!=""){
            for(var i=0;i<articles.length;i++){
                createDate=format(articles[i].createDate);
                if(articles[i].userLevel!=null){
                    user_img=head_src+articles[i].userLevel.headImage;
                    user_name=articles[i].userLevel.realName;
                    user_role=articles[i].userLevel.role;
                    user_counselorDuty=articles[i].userLevel.counselorDuty;
                }else{
                    user_img="";
                    user_name='';
                    user_role='';
                    user_counselorDuty='';
                }
                csq_detail="&&user_img="+user_img+"&&user_name="+user_name+"&&user_role="+user_role+"&&user_counselorDuty="+user_counselorDuty+"&&category_name="+articles[i].category.name+"&&createDate="+createDate;
                if(articles[i].top==1){
                    zd_img="../img/icon-article-top.png"
                }else{
                    zd_img='';
                }
                var title="";
                if(articles[i].title.length>40){
                    title=articles[i].title.substr(0,40)+"...";
                }else{
                    title=articles[i].title
                }
                html+=`<li class="list-li" data-id="${articles[i].uuid}" data-detail="${csq_detail}">
            <div class="con collection-list-msg" data-id="${articles[i].uuid}">
                <div>${title||""}</div>
                <div>
                    <div class="inline-block">${createDate}</div>
                    <div class="inline-block">
                        <span>评论<span class="blue">${articles[i].discussNum}</span></span>
                        <span>点赞<span class="red">${articles[i].approveNum}</span></span>
                    </div>
                </div>
            </div>
            <div class="btn">
                <div class="box-sizing">取消收藏</div>
            </div>
        </li>`;
            }
            $(".list-ul").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/article/articleCollection",{"sinceId":count_start,"maxId":count_end},get_collection);
    scroll_more(http_url.url+"/article/articleCollection",{"sinceId":count_start,"maxId":count_end},get_collection_more);
    //reload_msg($(".mine-tab-buy"),http_url.url+"/article/articleCollection",{"sinceId":count_start,"maxId":count_end},get_collection);
    //取消收藏
    $("body").on("click",".btn",function(){
        var that=$(this);
        var collection_id=that.parent().attr("data-id");
        ajax(http_url.url+"/article/cancel",{"articleUuid":collection_id},del_collection);
        function del_collection(data){
            console.log(data);
            if(data.code==1){
                alert(data.des);
                that.parent().remove();
            }
        }
    });
    //收藏列表点击
    $("body").on("click",".collection-list-msg",function(){
        var csq_id=$(this).attr("data-id");
        console.log(csq_id);
        window.location.href="../html/csq_detail.html?csq_id="+csq_id;
    })
});