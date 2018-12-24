$(function(){
    var type=getUrlParms("type")||"",msg=decodeURIComponent(decodeURIComponent(getUrlParms("msg")||""));
    if($(".wg-search-input").val()==""){
        sessionStorage.removeItem("watch-search");
    }else{
        if(sessionStorage.getItem("watch-search")!=null){
            count_start=1;count_end=10;num=1;
            ajax(http_url.url+"/onlook/serarch",{"sinceId":count_start,"maxId":count_end,"content":sessionStorage.getItem("watch-search"),type:type,typeContent:msg},get_search);
            scroll_more(http_url.url+"/onlook/serarch",{"sinceId":count_start,"maxId":count_end,"content":sessionStorage.getItem("watch-search"),type:type,typeContent:msg},get_search_more)
        }
    }

    //搜索文章
    function get_search(data){
        console.log(data);
        var articles=data.data,html="",csq_detail='',search=$(".wg-search-input").val();
        if(articles==""){
            $(".wacth-search-list ul").html('<li class="search-none">暂无内容</li>');
        }else{
            for(var i=0;i<articles.length;i++){
                var atc_title;
                if(articles[i].content.length>40){
                    atc_title=articles[i].content.substr(0,40)+"..."
                }else{
                    atc_title=articles[i].content;
                }
                atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
                // html+="<li data-id='"+articles[i].uuid+"' data-status='"+articles[i].status+"'>"+atc_title+"</li>";
                html+=`
                    <li  data-id='${articles[i].uuid}' data-status="${articles[i].status}">
                        ${atc_title}
                        <div class="watch-search-footer">
                            <div class="inline-block">${format(articles[i].date)}</div>
                            <div class="inline-block"><span>点赞: ${articles[i].approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${articles[i].lookNum}</span></div>
                        </div>
                    </li>
                `;
            }
            //console.log(html);
            $(".wacth-search-list ul").html(html);
        }

    }
    function get_search_more(data){
        //console.log(data);
        var articles=data.data,html="",search=$(".wg-search-input").val();
        if(articles!=""){
            for(var i=0;i<articles.length;i++){
                var atc_title;
                if(articles[i].content.length>40){
                    atc_title=articles[i].content.substr(0,40)+"..."
                }else{
                    atc_title=articles[i].content;
                }
                atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
                // html+="<li data-id='"+articles[i].uuid+"' data-status='"+articles[i].status+"'>"+atc_title+"</li>";
                html+=`
                    <li  data-id='${articles[i].uuid}' data-status="${articles[i].status}">
                        ${atc_title}
                        <div class="watch-search-footer">
                            <div class="inline-block">${format(articles[i].date)}</div>
                            <div class="inline-block"><span>点赞: ${articles[i].approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${articles[i].lookNum}</span></div>
                        </div>
                    </li>
                `;
            }
            $(".wacth-search-list ul").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    $(".release").click(function(){
        $(".wacth-search-list ul").html('');
        var search=$(".wg-search-input").val();
        count_start=1,count_end=10,num=1;
        if(search!=''&&search!=null&&search!=undefined){
            sessionStorage.setItem("watch-search",search);
            ajax(http_url.url+"/onlook/serarch",{"sinceId":count_start,"maxId":count_end,"content":search,type:type,typeContent:msg},get_search);
            scroll_more(http_url.url+"/onlook/serarch",{"sinceId":count_start,"maxId":count_end,"content":search,type:type,typeContent:msg},get_search_more)
        }
    });
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
});