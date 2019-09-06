$(function(){
    var id=getUrlParms("id");
    ajax(http_url.url+"/headtype/details",{
        "headTypeId":id
    },function(data){
        var msg=data.data;
        $(".channel-s-l-head-bg").attr("src",cover_src+msg.back_image);
        $(".chaanel-s-l-name").html(msg.name);
        $(".chaanel-s-l-msg").html(msg.introduction);
    });
    list();
    list_more();
    //tab切换点击
    $(".channel-s-l-body-title-tab>span").click(function(){
        $(".channel-s-l-body-title-tab>span").removeClass("channel-s-l-body-title-act");
        $(this).addClass("channel-s-l-body-title-act");
        list();
        list_more();
    });
    //搜索按钮点击
    $(".find-btn").click(function(){
        window.location.href="channel-sptt-label-search.html?id="+id;
    });
    function list(){
        count_start=1;count_end=10;
        ajax(http_url.url+"/headvideo/list",{
            "headTypeId":id,
            "maxId":count_end,
            "sinceId":count_start,
            "type":$(".channel-s-l-body-title-act").attr("data-code")
        },function(data){
            var html='',datas=data.data;
            $(".sptt-total-num").html(data.totalCount);
            if(datas&&datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`<div class="channel-page-li channel-page-li-sptt">
                            <img src="${cover_src+change_v.cover}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title">${change_v.title.length>20?change_v.title.slice(0,20)+'...':change_v.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username">
                                    <div>${get_name(change_v)}</div>
                                    <div>${timeago(change_v.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                }
                $(".channel-sptt-page-ul").html(html);
            }
        })
    }
    function list_more(){
        scroll_more(http_url.url+"/headvideo/list",{
            "headTypeId":id,
            "maxId":count_end,
            "sinceId":count_start,
            "type":$(".channel-s-l-body-title-act").attr("data-code")
        },function(data){
            var html='',datas=data.data;
            if(datas&&datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`<div class="channel-page-li channel-page-li-sptt">
                            <img src="${cover_src+change_v.cover}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title">${change_v.title.length>20?change_v.title.slice(0,20)+'...':change_v.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username">
                                    <div>${get_name(change_v)}</div>
                                    <div>${timeago(change_v.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                }
                $(".channel-sptt-page-ul").append(html);
            }else{
                scroll_status=false
            }
        })
    }
});