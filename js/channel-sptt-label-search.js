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
            var html='',datas=data.data,segments=data.segments;
            if(datas&&datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i],title=change_v.title;
                    if(change_v.title.length>40){
                        title=change_v.title.slice(0,40)+".."
                    }
                    html+=`<div class="channel-page-li channel-page-li-sptt" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_v.id}">${keyWordRed(title,segments,change_v.id)}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-sptt-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div data-id="${change_v.id}">${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                                    <div data-id="${change_v.id}">${timeago(change_v.insert_time)}</div>
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
            var html='',datas=data.data,segments=data.segments;
            if(datas&&datas!=''){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i],title=change_v.title;
                    if(change_v.title.length>40){
                        title=change_v.title.slice(0,40)+".."
                    }
                    html+=`<div class="channel-page-li channel-page-li-sptt" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_v.id}">${keyWordRed(title,segments,change_v.id)}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-sptt-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div data-id="${change_v.id}">${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                                    <div data-id="${change_v.id}">${timeago(change_v.insert_time)}</div>
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
    //视频头条列表点击
    $("body").on("click",".channel-page-li-sptt",function(e){
        var class_val=e.target.className.indexOf("channel-page-li-userbtn");
        if(class_val!=-1){
            window.location.href="channel-sptt-label.html?id="+e.target.getAttribute("data-id");
        }else{
            window.location.href="channel-sptt-detail.html?id="+e.target.getAttribute("data-id");
        }
    });
});