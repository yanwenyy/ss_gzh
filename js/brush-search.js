$(function(){
    if($(".channel-search-msg").val()!=''){
        list($(".mine-work-title>.orange").attr("data-code"),$(".channel-search-msg").val());
        list_more($(".mine-work-title>.orange").attr("data-code"),$(".channel-search-msg").val());
    }
    $(".release").click(function(){
        var val=$(".channel-search-msg").val();
        if(val==''){
            alert("请输入搜索词")
        }else{
            list($(".mine-work-title>.orange").attr("data-code"),val);
            list_more($(".mine-work-title>.orange").attr("data-code"),val);
        }
    });
    function list(code,val){
        count_end=10;count_start=1;
        if(code==1){//视频
            ajax(http_url.url+"/brush/brushVideorParticiple",{
                "maxId": count_end,
                "sinceId": count_start,
                "content": val,
            },function(data){
                var brush=data.data.brushVideoDtos;
                var html='',segments=data.data.segments;
                if(brush&&brush!=""){
                    $(".column-list-main-ss").show();
                    if(brush.length<10){
                        relevant_ss(val);
                    }
                    if(brush.length<3){
                        $(".column-list-main").css("column-count","1")
                    }
                    for(var i=0,len=brush.length;i<len;i++){
                        var change_v=brush[i];
                        var title='',s_name=get_name(change_v);
                        if(change_v.title.length>18){
                            title=change_v.title.slice(0,18)+".."
                        }else{
                            title=change_v.title
                        }
                        if(s_name.length>8){
                            s_name=s_name.slice(0,8)+".."
                        }
                        html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${keyWordRed(title,segments)}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                <div class="inline-block">${keyWordRed(s_name,segments)}</div>
                            </div>
                        </div>
                    </div>`
                    }
                    $(".column-list-main").html(html);
                }else{
                    $(".column-list-main-ss").hide();
                    relevant_ss(val);
                }
            })
        }else if(code==2){//用户
            ajax(http_url.url+"/attention/allFriend",{
                "maxId": count_end,
                "name": val,
                "sinceId": count_start
            },function(data){
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var name_v=get_name(change_v);
                        html+=`
                       <li class="box-sizing">
                            <img  data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${change_v.phoneNumber}" class="inline-block look-hp-image fans-name-div" data-role="${change_v.role}">
                                <div class="inline-block fans-name">${name_v}</div>
                                <div class="inline-block fans-dj-msg ${change_v.role==2?'':'out'}">${change_v.levelName}</div>
                                <div class="inline-block fans-dj ${change_v.role==1?'':'out'}"><img src="${get_score(change_v.integralScore,change_v.aision,change_v.vip)}" alt=""></div>
                                <div class="fans-zw">
                                    <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block ${change_v.counselorDuty!=null&&change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                                    <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                                </div>
                            </div>
                            <div data-phone="${change_v.phoneNumber}" class="inline-block attention-fans ${change_v.follow==1?'each-attention':'gzfs'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${change_v.follow==1?(change_v.mutual==1?'互关':'已关注'):'+关注'}</div>
                        </li>
                        `
                    }
                    $(".mine-fans-list").html(html);
                }
            })
        }else if(code==3){//标签
            ajax(http_url.url+"/brush/allLabel",{
                "labelName": val,
                "maxId": count_end,
                "sinceId": count_start
            },function(data){
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        html+=`
                            <li data-id="${change_v.id}"  data-html="${change_v.labelName}">#${change_v.labelName.replace(val, "<span class='orange'>"+ val + "</span>")}</li>
                        `
                    }
                    $(".search-label-body").html(html);
                }
            })
        }
    }
    function list_more(code,val){
        if(code==1){//视频
            scroll_more(http_url.url+"/brush/brushVideorParticiple",{
                "maxId": count_end,
                "sinceId": count_start,
                "content": val,
            },function(data){
                var brush=data.data.brushVideoDtos;
                var html='',segments=data.data.segments;
                if(brush&&brush!=""){
                    for(var i=0,len=brush.length;i<len;i++){
                        var change_v=brush[i];
                        var title='',s_name=get_name(change_v);
                        if(change_v.title.length>18){
                            title=change_v.title.slice(0,18)+".."
                        }else{
                            title=change_v.title
                        }
                        if(s_name.length>8){
                            s_name=s_name.slice(0,8)+".."
                        }
                        html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${keyWordRed(title,segments)}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                <div class="inline-block">${keyWordRed(s_name,segments)}</div>
                            </div>
                        </div>
                    </div>`
                    }
                    $(".column-list-main").append(html);
                }else{
                    scroll_status=false;
                    relevant_ss(val);
                }

            })
        }else if(code==2){//用户
            scroll_more(http_url.url+"/attention/allFriend",{
                "maxId": count_end,
                "name": val,
                "sinceId": count_start
            },function(data){
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var name_v=get_name(change_v);
                        html+=`
                       <li class="box-sizing">
                            <img  data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${change_v.phoneNumber}" class="inline-block look-hp-image fans-name-div" data-role="${change_v.role}">
                                <div class="inline-block fans-name">${name_v}</div>
                                <div class="inline-block fans-dj-msg ${change_v.role==2?'':'out'}">${change_v.levelName}</div>
                                <div class="inline-block fans-dj ${change_v.role==1?'':'out'}"><img src="${get_score(change_v.integralScore,change_v.aision,change_v.vip)}" alt=""></div>
                                <div class="fans-zw">
                                    <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block ${change_v.counselorDuty!=null&&change_v.role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ change_v.counselorDuty}</div>
                                    <div class="inline-block ${change_v.role==3? '':'out'}"><img src="../img/office-icon.png" alt="">官方认证</div>
                                </div>
                            </div>
                            <div data-phone="${change_v.phoneNumber}" class="inline-block attention-fans ${change_v.follow==1?'each-attention':'gzfs'}"><img src="../img/hg.png" class="hg-fans ${Number(change_v.mutual)==1?'':'out'}" alt="">${change_v.follow==1?(change_v.mutual==1?'互关':'已关注'):'+关注'}</div>
                        </li>
                        `
                    }
                    $(".mine-fans-list").append(html);
                }else{
                    scroll_status=false;
                }
            })
        }else if(code==3){//标签
            scroll_more(http_url.url+"/brush/allLabel",{
                "labelName": val,
                "maxId": count_end,
                "sinceId": count_start
            },function(data){
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        html+=`
                            <li data-id="${change_v.id}" data-html="${change_v.labelName}">#${change_v.labelName.replace(val, "<span class='orange'>"+ val + "</span>")}</li>
                        `
                    }
                    $(".search-label-body").append(html);
                }else{
                    scroll_status=false;
                }
            })
        }
    }
    //刷刷相关推荐
    function relevant_ss(val){
        count_start=1;count_end=10;
        ajax(http_url.url+"/brush/brushVideorParticipleRecommend",{
            "content": val,
            "maxId": count_end,
            "sinceId": count_start
        },function(data){
            var datas=data.data.brushVideoDtos,html='',segments=data.data.segments;
            for(var i=0,len=datas.length;i<len;i++){
                $(".relevant-ss").show();
                var change_v=datas[i];
                var title='';
                if(change_v.title.length>18){
                    title=change_v.title.slice(0,18)+".."
                }else{
                    title=change_v.title
                }
                html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${keyWordRed(title,segments)}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
            }
            $(".relevant-ss>.column-list-main").html(html);
        })
    }
    //视频列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
    //tab切换点击
    $(".mine-work-title>div").click(function(){
        count_start=1;count_end=10;
        $(".mine-work-title>div").removeClass("orange").children("span").removeClass("work-title-line");
        $(this).addClass("orange").children("span").addClass("work-title-line");
        var code=$(this).attr("data-code");
        $(".brush-search-main").addClass("out");
        $(".brush-search-main[data-code="+code+"]").removeClass("out");
        var val=$(".channel-search-msg").val();
        if(val!=''){
            list($(".mine-work-title>.orange").attr("data-code"),val);
            list_more($(".mine-work-title>.orange").attr("data-code"),val);
        }
    });
    //标签点击
    $("body").on("click",".search-label-body>li",function(){
        var id=$(this).attr("data-id");
        var name=$(this).attr("data-html");
        window.location.href="brush-label-detail.html?id="+$(this).attr("data-id")+"&name="+encodeURIComponent(encodeURIComponent(name));
    })
});