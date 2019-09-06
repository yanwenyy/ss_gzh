$(function(){
    var channel_search_history=[],classifyId=getUrlParms("classifyId"),vip=getUrlParms("vip");
    if(localStorage.getItem("channel_search_history")){
        channel_search_history=JSON.parse(localStorage.getItem("channel_search_history"));
        $(".channel-search-history").removeClass("out");
        if(channel_search_history!=''){
            var html='';
            for(var i=0,len=channel_search_history.length;i<len;i++){
                var change_v=channel_search_history[i];
                html+=`
                <li>
                    <div class="inline-block c-s-h-msg">${change_v}</div>
                    <div class="inline-block c-s-h-del" data-val="${change_v}">x</div>
                </li>
            `;
            }
            $(".channel-search-history-ul").html(html);
        }
    };
    //清除每条所搜历史
    $("body").on("click",".c-s-h-del",function(){
        channel_search_history.remove($(this).attr("data-val"));
        $(this).parent().remove();
        localStorage.setItem("channel_search_history",JSON.stringify(channel_search_history));
    });
    //清除所有搜索历史
    $("body").on("click",".remove-history",function(){
        localStorage.removeItem("channel_search_history");
        $(".channel-search-history").addClass("out");
    });
    //搜索按钮点击
    $(".release").click(function(){
        var msg=$(".channel-search-msg").val();
        if(msg!=''){
            $(".channel-search-history").addClass("out");
            channel_search_history.push(msg);
            localStorage.setItem("channel_search_history",JSON.stringify(channel_search_history));
            search(msg);
            search_more(msg);
        }else{
            alert("请输入内容");
            return ;
        }

    });
    //搜索列表
    function search(val){
        ajax(http_url.url+"/classifyvideo/videolist",{
            "classifyId": classifyId,
            "maxId": count_end,
            "sinceId": count_start,
            "content":val
        },function(data){
            var html='',list=data.data;
            if(list&&list!=''){
                for(var i=0,len=list.length;i<len;i++){
                    var change_v=list[i];
                    html+=`
                    <div class="channel-page-li" data-id="${change_v.classify_id}" data-charge="${change_v.charge}" data-vid="${change_v.id}" data-userid="${change_v.userId}">
                        <img src="${cover_src+change_v.cover}" alt="">
                        <div class="channel-page-li-title">${change_v.title.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                        <div class="channel-page-li-user">
                            <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                            <div class="inline-block channel-page-li-username">${get_name(data.data[i]).replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="inline-block orange channel-page-li-userbtn ${change_v.charge==0||vip=='yes'?'out':''}">频道会员免费</div>
                        </div>
                    </div>`
                }
                $(".channel-page-ul").html(html);
            }else{
                $(".channel-page-ul").html('<div class="none-msg" style="display: block">暂无相关信息</div>');
            }

        })
    }
    function search_more(val){
        scroll_more(http_url.url+"/classifyvideo/videolist",{
            "classifyId": classifyId,
            "maxId": count_end,
            "sinceId": count_start,
            "content":val
        },function(data){
            var html='',list=data.data;
            if(list&&list!=''){
                for(var i=0,len=list.length;i<len;i++){
                    var change_v=list[i];
                    html+=`
                    <div class="channel-page-li" data-id="${change_v.classify_id}" data-charge="${change_v.charge}" data-vid="${change_v.id}" data-userid="${change_v.userId}">
                        <img src="${cover_src+change_v.cover}" alt="">
                        <div class="channel-page-li-title">${change_v.title.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                        <div class="channel-page-li-user">
                            <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                            <div class="inline-block channel-page-li-username">${get_name(data.data[i]).replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="inline-block orange channel-page-li-userbtn ${change_v.charge==0||vip=='yes'?'out':''}">频道会员免费</div>
                        </div>
                    </div>`
                }
                $(".channel-page-ul").append(html);
            }else{
                scroll_status=false;
            }
        });
    }
    //搜索历史点击
    $("body").on("click",".c-s-h-msg",function(data){
        $(".channel-search-history").addClass("out");
        $(".channel-search-msg").val($(this).text());
        search($(this).text());
        search_more($(this).text());
    });
    //频道列表点击
    $("body").on("click",".channel-page-li",function(){
        var charge=$(this).attr("data-charge");
        if(charge==0||vip=='yes'){
            window.location.href="channel-detail.html?classifyId="+$(this).attr("data-id")+"&vid="+$(this).attr("data-vid")+"&userid="+$(this).attr("data-userid");
        }else{
            if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                window.location.href="channel-vip-card.html?id="+$(this).attr("data-id");
            }
        }
    });
});