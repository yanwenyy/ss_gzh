$(function(){
    if($(".wg-search-input").val()==""){
        sessionStorage.removeItem("csq-search");
    }else{
        if(sessionStorage.getItem("csq-search")){
            count_start=1,count_end=10,num=1;
            ajax(http_url.url+"/article/search",{"sinceId":count_start,"maxId":count_end,"search":sessionStorage.getItem("csq-search")},get_search);
            scroll_more(http_url.url+"/article/search",{"sinceId":count_start,"maxId":count_end,"search":sessionStorage.getItem("csq-search")},get_search_more)
        }
    }
    //搜索文章
    function get_search(data){
        console.log(data);
        var articles=data.articles,html="",csq_detail='',search=$(".wg-search-input").val();
        if(articles==""){
            $(".wacth-search-list ul").html('<li class="search-none">暂无内容</li>');
        }else{
            for(var i=0;i<articles.length;i++){
                var atc_title;
                if(articles[i].title.length>40){
                    atc_title=articles[i].title.substr(0,40)+"..."
                }else{
                    atc_title=articles[i].title;
                }
                atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
                html+="<li data-id='"+articles[i].uuid+"'>"+atc_title+"</li>";
            }
            //console.log(html);
            $(".wacth-search-list ul").html(html);
        }
    }
    function get_search_more(data){
        
        //console.log(data);
        var articles=data.articles,html="",search=$(".wg-search-input").val();
        for(var i=0;i<articles.length;i++){
            var atc_title;
            //console.log(articles[i].title);
            if(articles[i].title.length>40){
                atc_title=articles[i].title.substr(0,40)+"..."
            }else{
                atc_title=articles[i].title;
            }
            atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
            html+="<li data-id='"+articles[i].uuid+"'>"+atc_title+"</li>";
        }
        //console.log(html);
        $(".wacth-search-list ul").append(html);
    }
    $(".release").click(function(){
        $(".wacth-search-list ul").html('');
        var search=$(".wg-search-input").val();
        count_start=1,count_end=10,num=1;
        if(search!=''&&search!=null&&search!=undefined){
            sessionStorage.setItem("csq-search",search);
            ajax(http_url.url+"/article/search",{"sinceId":count_start,"maxId":count_end,"search":search},get_search);
            scroll_more(http_url.url+"/article/search",{"sinceId":count_start,"maxId":count_end,"search":search},get_search_more)
        }
    });
    //文章列表点击
    $("body").on("click",".wacth-search-list li",function(){
        var csq_id=$(this).attr("data-id"),data_detail=$(this).attr("data-detail");
        window.location.href="../html/csq_detail.html?csq_id="+csq_id;
    });
});