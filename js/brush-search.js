$(function(){
    if($(".channel-search-msg").val()!=''){
        list($(".channel-search-msg").val());
        list_more($(".channel-search-msg").val());
    }
    $(".release").click(function(){
        count_start=1;count_end=10;
        var val=$(".channel-search-msg").val();
        if(val==''){
            alert("请输入搜索词")
        }else{
            list(val);
            list_more(val);
        }
    });
    function list(val){
        ajax(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId": count_start,
            "title": val,
        },function(data){
            var html='';
            if(data.data&&data.data!=""){
                if(data.data.length<3){
                    $(".column-list-main").css("column-count","1")
                }
                for(var i=0;i<data.data.length;i++){
                    html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
                        <img src="${cover_src+data.data[i].image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${data.data[i].title.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="column-list-name">
                                <img src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(data.data[i])}</div>
                            </div>
                        </div>
                    </div>`
                }
                $(".column-list-main").html(html);
            }else{
                $(".column-list-main").html('<div class="none-msg" style="display: block">暂无相关信息</div>');
            }
        })
    }
    function list_more(val){
        scroll_more(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId": count_start,
            "title": val,
        },function(data){
            var html='';
            if(data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    html+=`<div class="column-list-div inline-block" data-id="${data.data[i].id}" data-vid="${data.data[i].vid}">
                        <img src="${cover_src+data.data[i].image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${data.data[i].title.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="column-list-name">
                                <img src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(data.data[i])}</div>
                            </div>
                        </div>
                    </div>`
                }
                $(".column-list-main").append(html);
            }else{
                scroll_status=false;
            }

        })
    }
    //视频列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
});