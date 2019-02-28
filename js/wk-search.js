$(function(){
    //搜索文章
    function get_search(data){
       console.log(data);
        var videos=data.videos,html="",csq_detail='',search=$(".wg-search-input").val();
        if(videos==""){
            $(".wacth-search-list ul").html('<li class="search-none">暂无内容</li>');
        }else{
            for(var i=0;i<videos.length;i++){
                var atc_title;
                if(videos[i].title.length>40){
                    atc_title=videos[i].title.substr(0,40)+"..."
                }else{
                    atc_title=videos[i].title;
                }
                atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
                html+="<li data-id='"+videos[i].id+"' data-price='"+videos[i].price+"'>"+atc_title+"</li>";
            }
            $(".wacth-search-list ul").html(html);
        }
    }
    function get_search_more(data){
        // console.log(data);
        var videos=data.videos,html="",csq_detail='',search=$(".wg-search-input").val();
        for(var i=0;i<videos.length;i++){
            var atc_title;
            if(videos[i].title.length>40){
                atc_title=videos[i].title.substr(0,40)+"..."
            }else{
                atc_title=videos[i].title;
            }
            atc_title=atc_title.replace(search,`<span class="red">${search}</span>`);
            html+="<li data-id='"+videos[i].id+"' data-price='"+videos[i].price+"'>"+atc_title+"</li>";
        }
        $(".wacth-search-list ul").append(html);
    }
    $(".release").click(function(){
        $(".wacth-search-list ul").html('');
        count_start=1,count_end=10,num=1;
        var search=$(".wg-search-input").val();
        if(search!=''&&search!=null&&search!=undefined){
            ajax(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"title":search,"type":"0"},get_search);
            scroll_more(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"title":search,"type":"0"},get_search_more)
        }
    });
    //文章列表点击
    $("body").on("click",".wacth-search-list li",function(){
        var videoId=$(this).attr("data-id"),
            price=$(this).attr("data-price"),vid;
        var that=$(this);
        //判断是否购买过
        function get_vid(data){
            vid=data.data.vid;
            if(vid!=""&&vid!=null){
                console.log("已购买");
                window.location.href="../html/video.html?vid="+vid;
            }else{
                console.log("未购买");
                //window.location.href="../html/watch-pay.html?videoId="+videoId+"&&price="+price;
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fvideoId%3d"+videoId+"%26%26price%3d"+price+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
            }
        }
        ajax(http_url.url+"/video/vid",{"id":videoId},get_vid);
    });
});