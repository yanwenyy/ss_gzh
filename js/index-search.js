$(function(){
    //搜索按钮点击
    $(".release").click(function(){
        var val=$(".channel-search-msg").val();
        if(val==''){
            alert("请输入搜索词")
        }else{
            list($(".mine-work-title>.orange").attr("data-code"),val);
            list_more($(".mine-work-title>.orange").attr("data-code"),val);
        }
    });
    //tab切换点击
    $(".mine-work-title>div").click(function(){
        count_start=1;count_end=10;
        $(".no-msg").hide();
        $(".mine-work-title>div").removeClass("orange").children("span").removeClass("work-title-line");
        $(this).addClass("orange").children("span").addClass("work-title-line");
        var code=$(this).attr("data-code");
        $(".index-search-main").addClass("out");
        $(".index-search-main[data-code="+code+"]").removeClass("out");
        var val=$(".channel-search-msg").val();
        if(val!=''){
            list($(".mine-work-title>.orange").attr("data-code"),val);
            list_more($(".mine-work-title>.orange").attr("data-code"),val);
        }
    });
    function list(code,val){
        count_end=10;count_start=1;
        if(code==1){//问答
                ajax(http_url.url+"/onlook/serarch",
                    {"sinceId":count_start,
                    "maxId":count_end,
                    "content":val
                    },function(data){
                        $(".wacth-search-list>ul").html('');
                        var articles=data.data,html="",csq_detail='',search=$(".wg-search-input").val();
                        if(articles==""){
                           $(".no-msg").show();
                        }else if(articles&&articles!=''){
                            $(".no-msg").hide();
                            if(articles.length<10){
                                relevant_list($(".channel-search-msg").val());
                            }
                            for(var i=0,len=articles.length;i<len;i++){
                                var atc_title,change_v=articles[i];
                                if(change_v.content.length>40){
                                    atc_title=change_v.content.substr(0,40)+"..."
                                }else{
                                    atc_title=change_v.content;
                                }
                                atc_title=atc_title.replace(val,`<span class="red">${val}</span>`);
                                // html+="<li data-id='"+change_v.uuid+"' data-status='"+change_v.status+"'>"+atc_title+"</li>";
                                html+=`
                                        <li  data-id='${change_v.uuid}' data-status="${change_v.status}">
                                            ${atc_title}
                                            <div class="watch-search-footer">
                                                <div class="inline-block">${format(change_v.date)}</div>
                                                <div class="inline-block"><span>点赞: ${change_v.approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${change_v.lookNum}</span></div>
                                            </div>
                                        </li>
                                    `;
                            }
                            $(".wacth-search-list>ul").html(html);
                        }
                });

        }else if(code==2){//用户
            ajax(http_url.url+"/attention/allFriend",{
                "maxId": count_end,
                "name": val,
                "sinceId": count_start
            },function(data){
                $(".mine-fans-list").html('');
                var datas=data.data,html='';
                if(datas&&datas!=""){
                    $(".no-msg").hide();
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var name_v=get_name(change_v);
                        html+=`
                       <li class="box-sizing">
                            <img  data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" class="look-hp-image" data-role="${change_v.role}"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${change_v.phoneNumber}" class="inline-block look-hp-image fans-name-div" data-role="${change_v.role}">
                                <div class="inline-block fans-name">${name_v.length>27?name_v.slice(0,27)+"...":name_v}</div>
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
                }else{
                    $(".no-msg").show();
                }
            })
        }else if(code==3){//刷刷
            ajax(http_url.url+"/brush/brushVideorParticiple",{
                "maxId": count_end,
                "sinceId": count_start,
                "content": val,
            },function(data){
                var brush=data.data.brushVideoDtos;
                var html='',segments=data.data.segments;
                $(".column-list-body>.column-list-main").html('');
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
                    $(".column-list-body>.column-list-main").html(html);
                }else{
                    // $(".no-msg").show();
                    $(".column-list-main-ss").hide();
                    relevant_ss(val);
                }
            })
        }else if(code==4){//视频
            ajax(http_url.url+"/headvideo/list",{
                "maxId":count_end,
                "sinceId":count_start,
                "type":"5",
                "content":val
            },function(data){
                $(".channel-page-ul").html('');
                var html='',datas=data.data,segments=data.segments;
                if(datas&&datas!=''){
                    $(".no-msg").hide();
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var v_name=get_name(change_v);
                        if(v_name.length>15){
                            v_name=v_name.slice(0,15)+"...";
                        }
                        if(change_v.video_type=="1"){
                            var videoAdvertising='',
                                title='';
                            if(change_v.videoAdvertising&&change_v.videoAdvertising!==null&&change_v.videoAdvertising!==''){
                                videoAdvertising=change_v.videoAdvertising;
                            }
                            if(change_v.title.length>40){
                                title=change_v.title.slice(0,40)+'...';
                            }else{
                                title=change_v.title;
                            }
                            html+=`
                                    <div class="channel-page-li channel-page-li-pd" data-type="${change_v.video_type}" data-charge="${change_v.charge}" data-classify_id="${change_v.classify_id}" data-id="${change_v.id}" data-ifClassifyVip="${change_v.ifClassifyVip}"  data-userId="${change_v.userId}">
                                        <img src="${cover_src+change_v.cover}" alt="">
                                        <div class="channel-page-li-title">${keyWordRed(title,segments)}</div>
                                        <div class="channel-page-li-user">
                                            <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                                <img class="channel-list-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                                <img class="channel-list-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                            </div>
                                            <div class="inline-block channel-page-li-username">${keyWordRed(v_name,segments)}</div>
                                            <div class="inline-block orange channel-page-li-userbtn ${change_v.charge==0?'out':''}">频道会员免费</div>
                                        </div>
                                    </div>
                                `
                        }else{
                            if(change_v.title.length>40){
                                title=change_v.title.slice(0,40)+'...';
                            }else{
                                title=change_v.title;
                            }
                            html+=`<div class="channel-page-li channel-page-li-sptt" data-type="${change_v.video_type}" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-page-li-title" data-id="${change_v.id}">${keyWordRed(title,segments,change_v.id)}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-list-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-list-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div data-id="${change_v.id}">${keyWordRed(v_name,segments)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                        }
                    }
                    $(".channel-page-ul").html(html);
                }else{
                    $(".no-msg").show();
                }
            })
        }
    }
    function list_more(code,val){
        if(code==1){//问答
            scroll_more(http_url.url+"/onlook/serarch",
                {"sinceId":count_start,
                    "maxId":count_end,
                    "content":val
                },function(data){
                    var articles=data.data,html="",csq_detail='',search=$(".wg-search-input").val();
                    if(articles&&articles!=""){
                        for(var i=0,len=articles.length;i<len;i++){
                            var atc_title,change_v=articles[i];
                            if(change_v.content.length>40){
                                atc_title=change_v.content.substr(0,40)+"..."
                            }else{
                                atc_title=change_v.content;
                            }
                            atc_title=atc_title.replace(val,`<span class="red">${val}</span>`);
                            // html+="<li data-id='"+change_v.uuid+"' data-status='"+change_v.status+"'>"+atc_title+"</li>";
                            html+=`
                                        <li  data-id='${change_v.uuid}' data-status="${change_v.status}">
                                            ${atc_title}
                                            <div class="watch-search-footer">
                                                <div class="inline-block">${format(change_v.date)}</div>
                                                <div class="inline-block"><span>点赞: ${change_v.approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${change_v.lookNum}</span></div>
                                            </div>
                                        </li>
                                    `;
                        }
                        $(".wacth-search-list ul").append(html);
                    }else{
                        scroll_status=false;
                        $(".msg-loading").hide();
                        relevant_list($(".channel-search-msg").val());
                    }
                });

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
                                <div class="inline-block fans-name">${name_v.length>27?name_v.slice(0,27)+"...":name_v}</div>
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
        }else if(code==3){//刷刷
            scroll_more(http_url.url+"/brush/brushVideorParticiple",{
                "maxId": count_end,
                "sinceId": count_start,
                "content": val,
            },function(data){
                var brush=data.data.brushVideoDtos;
                var html='',segments=data.data.segments;
                if(brush&&brush!=""){
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
                    $(".column-list-body>.column-list-main").append(html);
                }else{
                    scroll_status=false;
                    relevant_ss(val);
                }
            })
        }else if(code==4){//视频
            scroll_more(http_url.url+"/headvideo/list",{
                "maxId":count_end,
                "sinceId":count_start,
                "type":"5",
                "content":val
            },function(data){
                var html='',datas=data.data,segments=data.segments;
                if(datas&&datas!=''){
                    for(var i=0,len=datas.length;i<len;i++){
                        var change_v=datas[i];
                        var v_name=get_name(change_v);
                        if(v_name.length>15){
                            v_name=v_name.slice(0,15)+"...";
                        }
                        if(change_v.video_type=="1"){
                            var videoAdvertising='',
                                title='';
                            if(change_v.videoAdvertising&&change_v.videoAdvertising!==null&&change_v.videoAdvertising!==''){
                                videoAdvertising=change_v.videoAdvertising;
                            }
                            if(change_v.title.length>40){
                                title=change_v.title.slice(0,40)+'...';
                            }else{
                                title=change_v.title;
                            }
                            html+=`
                                    <div class="channel-page-li channel-page-li-pd" data-type="${change_v.video_type}" data-charge="${change_v.charge}" data-classify_id="${change_v.classify_id}" data-id="${change_v.id}" data-ifClassifyVip="${change_v.ifClassifyVip}"  data-userId="${change_v.userId}">
                                        <img src="${cover_src+change_v.cover}" alt="">
                                        <div class="channel-page-li-title">${keyWordRed(title,segments)}</div>
                                        <div class="channel-page-li-user">
                                            <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                                <img class="channel-list-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                                <img class="channel-list-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                            </div>
                                            <div class="inline-block channel-page-li-username">${keyWordRed(v_name,segments)}</div>
                                            <div class="inline-block orange channel-page-li-userbtn ${change_v.charge==0?'out':''}">频道会员免费</div>
                                        </div>
                                    </div>
                                `
                        }else{
                            if(change_v.title.length>40){
                                title=change_v.title.slice(0,40)+'...';
                            }else{
                                title=change_v.title;
                            }
                            html+=`<div class="channel-page-li channel-page-li-sptt" data-type="${change_v.video_type}" data-id="${change_v.id}">
                            <img src="${cover_src+change_v.cover}" data-id="${change_v.id}" alt="">
                            <div class="channel-page-li-title" data-id="${change_v.id}">${keyWordRed(title,segments,change_v.id)}</div>
                            <div class="channel-page-li-user channel-sptt-li-user">
                                <div class="inline-block channle-sptt-user" data-id="${change_v.id}">
                                    <img class="channel-list-userimg" data-id="${change_v.id}" src="${headimage(change_v.headImage)}" onerror=src="../img/user.png" alt="">
                                    <img class="channel-list-userimg-rz ${change_v.role==3?'':'out'}" src="../img/office-p-rz.png" alt="">
                                </div>
                                <div class="inline-block channel-sptt-li-username" data-id="${change_v.id}">
                                    <div data-id="${change_v.id}">${keyWordRed(v_name,segments)}</div>
                                </div>
                                <div class="inline-block orange channel-page-li-userbtn" data-id="${change_v.head_type}">${change_v.videoTypeName}</div>
                            </div>
                        </div>`;
                        }
                    }
                    $(".channel-page-ul").append(html);
                }else{
                    scroll_status=false;
                }
            })
        }
    }
    //问答相关推荐
    function relevant_list(val){
        count_end=10;count_start=1;
        ajax(http_url.url+"/onlook/releate",{
            "content": val,
            "maxId": count_end,
            "sinceId": count_start
        },function(data){
            var articles=data.data,html="",csq_detail='',search=$(".wg-search-input").val();
            if(articles&&articles!=""){
                $(".relevant-wd").show();
                for(var i=0,len=articles.length;i<len;i++){
                    var atc_title,change_v=articles[i];
                    if(change_v.content.length>40){
                        atc_title=change_v.content.substr(0,40)+"..."
                    }else{
                        atc_title=change_v.content;
                    }
                    atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
                    // html+="<li data-id='"+change_v.uuid+"' data-status='"+change_v.status+"'>"+atc_title+"</li>";
                    html+=`
                                        <li  data-id='${change_v.uuid}' data-status="${change_v.status}">
                                            ${atc_title}
                                            <div class="watch-search-footer">
                                                <div class="inline-block">${format(change_v.date)}</div>
                                                <div class="inline-block"><span>点赞: ${change_v.approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${change_v.lookNum}</span></div>
                                            </div>
                                        </li>
                                    `;
                }
                $(".relevant-wd>ul").html(html);
            }
        })
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
    //文章列表点击
    $("body").on("click",".wacth-search-list li",function(){
        var csq_id=$(this).attr("data-id"),status=$(this).attr("data-status");
        console.log(status);
        if(status==1){
            window.location.href="../html/watch-anwser.html?cwatch_id="+csq_id;
        }else{
            window.location.href="../html/cwatch.html?cwatch_id="+csq_id;
        }
    });
    //刷刷视频列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
    //视频列表点击
    $("body").on("click",".channel-page-li",function(e){
        var charge=$(this).attr("data-charge"),
            classify_id=$(this).attr("data-classify_id"),
            id=$(this).attr("data-id"),
            ifClassifyVip=$(this).attr("data-ifClassifyVip"),
            userId=$(this).attr("data-userId"),
            type=$(this).attr("data-type");
        if(type==1){
            if(charge=="0"||ifClassifyVip=="0"){
                window.location.href="channel-detail.html?classifyId="+classify_id+"&vid="+id+"&userid="+userId;
            }else{
                ajax(http_url.url+"/goods/classify/goods",{"id": classify_id},function(data){
                    var datas=data.data;
                    if(datas.classifyVip==0){
                        window.location.href="channel-detail.html?classifyId="+classify_id+"&vid="+id+"&userid="+userId;
                    }else if(datas.classifyVip==1||datas.classifyVip==2){
                        if(confirm("您还不是频道会员！ 开通后可观看频道下全部视频～")==true){
                            window.location.href="channel-vip-card.html?id="+classify_id;
                        }
                    }else if(datas.classifyVip==3){
                        if(confirm("此视频属于"+datas.name+"频道，您需要去关注并购买才可观看视频")){
                            window.location.href="channel-mine.html";
                        }
                    }
                });
            }
        }else{
            var class_val=e.target.className.indexOf("channel-page-li-userbtn");
            if(class_val!=-1){
                window.location.href="channel-sptt-label.html?id="+e.target.getAttribute("data-id");
            }else{
                window.location.href="channel-sptt-detail.html?id="+e.target.getAttribute("data-id");
            }
        }
    });
    //关注按钮点击
    $("body").on("click",".attention-fans",function(data){
        var that=$(this),phoneNum=that.attr("data-phone");
        if(that.html().indexOf("+关注")!=-1){
            ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
                alert(data.des);
                that.addClass("attention-fans-already").html("已关注");
            });
        }
    })
});