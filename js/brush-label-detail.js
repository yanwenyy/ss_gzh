$(function(){
    var id=getUrlParms("id"),name=decodeURIComponent(decodeURIComponent(getUrlParms("name")));
    $(".jsb_header span").html(name);
    ajax(http_url.url+"/brush/brushVideorRequirement",{
        "labelId": id,
        "maxId": count_end,
        "sinceId": count_start,
    },function(data){
        var list=data.data;
        var html='';
        if(list.length<3&&list.length>1){
            console.log(list.length)
            $(".column-list-main").css("column-count","1");
            $(".column-list-div").css("width","33.8rem");
        }else{
            $(".column-list-main").css("column-count","2");
            $(".column-list-div").css("width","auto");
        }
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
        }
        $(".column-list-main").html(html);
    });
    scroll_more(http_url.url+"/brush/brushVideorRequirement",{
        "labelId": id,
        "maxId": count_end,
        "sinceId": count_start
    },function(data){
        var list=data.data;
        if(list&&list!=''){
            var html='';
            if(list.length<3&&list.length>1){
                console.log(list.length)
                $(".column-list-main").css("column-count","1");
                $(".column-list-div").css("width","33.8rem");
            }else{
                $(".column-list-main").css("column-count","2");
                $(".column-list-div").css("width","auto");
            }
            for(var i=0,len=list.length;i<len;i++){
                var change_v=list[i];
                html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
            }
            $(".column-list-main").append(html);
        }else{
            scroll_status=false;
        }
    });
    //视频列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
});