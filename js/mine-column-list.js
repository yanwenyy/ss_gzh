$(function(){
    var id=getUrlParms("id");
    //专栏列表
    ajax_nodata(http_url.url+"/user/message",function(data){
        ajax(http_url.url+"/brush/allSpecialcolumn",{
            "userId":data.phoneNumber
        },function(data){
           // console.log(data);
           var html='',datas=data.data;
           for(var i=0,len=datas.length;i<len;i++){
               var change_v=datas[i];
               html+=`<div class="inline-block ${id==change_v.id?'column-list-tab-act':''}" data-id="${change_v.id}">${change_v.specialColumnName} </div>`
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
        // window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
        window.location.href="brush-nopass-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
    //专栏视频列表
    function list(val){
        ajax(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "specialcolumnId":val,
        },function(data){
            // console.log(data);
            var html='',datas=data.data;
            if(datas.length<3){
                $(".column-list-main").css("column-count","1")
            }
            for(var i=0,len=datas.length;i<len;i++){
                var change_v=datas[i];
                html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
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
            var html='',datas=data.data;
            if(datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
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