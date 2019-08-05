$(function(){
    var id=getUrlParms("id");
    //专栏列表
    ajax_nodata(http_url.url+"/user/message",function(data){
        ajax(http_url.url+"/brush/allSpecialcolumn",{
            "userId":data.phoneNumber
        },function(data){
           // console.log(data);
           var html='';
           for(var i=0;i<data.data.length;i++){
               html+=`<div class="inline-block ${id==data.data[i].id?'column-list-tab-act':''}" data-id="${data.data[i].id}">${data.data[i].specialColumnName} </div>`
           }
           $(".column-list-tab").html(html);
            list($(".column-list-tab-act").attr("data-id"));
            list_more($(".column-list-tab-act").attr("data-id"));
        });
    });
    //专栏列表点击
    $("body").on("click",".column-list-tab>div",function(){
        $(".column-list-tab>div").removeClass("column-list-tab-act");
        $(this).addClass("column-list-tab-act");
        count_start=1;count_end=10;
        list($(".column-list-tab-act").attr("data-id"));
        list_more($(".column-list-tab-act").attr("data-id"));
    });
    //视频列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
    //专栏视频列表
    function list(val){
        ajax(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "specialcolumnId":val,
        },function(data){
            console.log(data);
            var html='';
            if(data.data.length<3){
                $(".column-list-main").css("column-count","1")
            }
            for(var i=0;i<data.data.length;i++){
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
            }
            $(".column-list-main").html(html);
        })
    }
    function list_more(val){
        scroll_more(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "specialcolumnId":val,
        },function(data){
            var html='';
            if(data.data!=''){
                for(var i=0;i<data.data.length;i++){
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
                }
                $(".column-list-main").html(html);
            }else{
                scroll_status=false;
            }
        })
    }
});