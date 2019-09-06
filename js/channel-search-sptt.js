$(function(){
    //tab切换
    $(".mine-work-title>div").click(function(){
        $(".mine-work-title>div").removeClass("orange").children("span").removeClass("work-title-line");
        $(this).addClass("orange").children("span").addClass("work-title-line");
        var code=$(this).attr("data-code");
        $(".brush-search-main").addClass("out");
        $(".brush-search-main[data-code="+code+"]").removeClass("out");
        var val=$(".channel-search-msg").val();
        if(val!=""){
            list($(".mine-work-title>.orange").attr("data-code"),val);
            list_more($(".mine-work-title>.orange").attr("data-code"),val)
        }
    });
    //搜索按钮点击
    $(".release").click(function(){
        var val=$(".channel-search-msg").val();
        if(val==""){
            alert("请输入搜索词")
        }else{
            list($(".mine-work-title>.orange").attr("data-code"),val);
            list_more($(".mine-work-title>.orange").attr("data-code"),val);
        }
    });
    function list(code,val){
        count_end=10;count_start=1;
        if(code==1){//视频
            $(".channel-sptt-page-ul").html('');
            ajax(http_url.url+"/headvideo/list",{
                "maxId":count_end,
                "sinceId":count_start,
                "content":val
            },function(data){
                var html='',datas=data.data;
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i],title='';
                        if(change_v.title.length>20){
                            title=change_v.title.slice(0,20)+".."
                        }else{
                            title=change_v.title
                        }
                        html+=`<div class="channel-page-li channel-page-li-sptt" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_v.id}">${change_v.title.length>20?change_v.title.slice(0,20)+'...':change_v.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz2 ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div>${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                                    <div>${timeago(change_v.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                    }
                    $(".channel-sptt-page-ul").html(html);
                }
            });
        }else{
            $(".mine-fans-list").html('');
            ajax(http_url.url+"/attention/officialByLevelFans",{
                "maxId": count_end,
                "sinceId": count_start,
                "realName":val
            },function(data){
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var name_v=get_name(change_v);
                        html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div class="inline-block fans-name-div">
                            <div class="inline-block fans-name">${name_v.length>25?name_v.slice(0,25).replace(val, "<span class='orange'>"+ val + "</span>")+"...":name_v.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans" data-phone="${change_v.phoneNumber}">+关注</div>
                    </li>
                `
                    }
                    $(".mine-fans-list").html(html);
                }
            })
        }
    }
    function list_more(code,val){
        if(code==1){
            scroll_more(http_url.url+"/headvideo/list",{
                "maxId":count_end,
                "sinceId":count_start,
                "content":val
            },function(data){
                var html='',datas=data.data;
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i],title='';
                        if(change_v.title.length>20){
                            title=change_v.title.slice(0,20)+".."
                        }else{
                            title=change_v.title
                        }
                        html+=`<div class="channel-page-li channel-page-li-sptt" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-sptt-looknum"><span>${parseFloat(change_v.watch_num)<10000?change_v.watch_num:change_v.watch_num/10000+'万'}</span>次观看</div>
                            <div class="channel-page-li-title" data-id="${change_v.id}">${change_v.title.length>20?change_v.title.slice(0,20)+'...':change_v.title}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-sptt-userimg" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-sptt-userimg-rz2 ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div>${get_name(change_v).length>15?get_name(change_v).slice(0,15)+"...":get_name(change_v)}</div>
                                    <div>${timeago(change_v.insert_time)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                    }
                    $(".channel-sptt-page-ul").append(html);
                }else{
                    scroll_status=false;
                }
            })
        }else{
            scroll_more(http_url.url+"/attention/officialByLevelFans",{
                "maxId": count_end,
                "sinceId": count_start,
                "realName":val
            },function(data){
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var name_v=get_name(change_v);
                        html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div class="inline-block fans-name-div">
                            <div class="inline-block fans-name">${name_v.length>25?name_v.slice(0,25).replace(val, "<span class='orange'>"+ val + "</span>")+"...":name_v.replace(val, "<span class='orange'>"+ val + "</span>")}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans" data-phone="${change_v.phoneNumber}">+关注</div>
                    </li>
                `
                    }
                    $(".mine-fans-list").append(html);
                }
            })
        }
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