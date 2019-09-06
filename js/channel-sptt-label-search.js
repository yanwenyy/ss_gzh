$(function(){
   var id=getUrlParms("id");
   //搜索按钮点击
    $(".release").click(function(){
        var val=$(".channel-search-msg").val();
        if(val==''){
            alert("请输入搜索内容")
        }else{
            $(".channel-sptt-page-ul").html('');
            list(val);
            list_more(val);
        }
    });
    function list(val){
        count_start=1;count_end=10;
        ajax(http_url.url+"/headvideo/list",{
            "headTypeId":id,
            "maxId":count_end,
            "sinceId":count_start,
            "content":val
        },function(data){
            var html='',datas=data.data;
            if(datas&&datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i],title='';
                    if(change_v.title.length>20){
                        title=change_v.title.slice(0,20)+".."
                    }else{
                        title=change_v.title
                    }
                    html+=`<div class="channel-page-li channel-page-li-sptt">
                            <img src="${cover_src+change_v.cover}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title">${title.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username">
                                    <div>${get_name(change_v).replace(val, "<span class='orange'>"+ val + "</span>")}</div>
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
    function list_more(val){
        scroll_more(http_url.url+"/headvideo/list",{
            "headTypeId":id,
            "maxId":count_end,
            "sinceId":count_start,
            "content":val
        },function(data){
            var html='',datas=data.data;
            if(datas&&datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i],title='';
                    if(change_v.title.length>20){
                        title=change_v.title.slice(0,20)+".."
                    }else{
                        title=change_v.title
                    }
                    html+=`<div class="channel-page-li channel-page-li-sptt">
                            <img src="${cover_src+change_v.cover}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title">${title.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username">
                                    <div>${get_name(change_v).replace(val, "<span class='orange'>"+ val + "</span>")}</div>
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