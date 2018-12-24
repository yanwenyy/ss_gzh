$(function(){
    // 大咖访谈列表
    function get_wk(data){
        
        //console.log(data);
        var videos=data.videos,html='';
        for(var i=0;i<videos.length;i++){
            if(videos[i].title.length>20){
                var sp_title;
                sp_title=videos[i].title.substr(0,20)+"...";
            }else{
                sp_title=videos[i].title
            }
            html+=`<div class="inline-block dkft_list" data-id="${videos[i].id}">
                    <img src="${cover_src+videos[i].image}" alt="" onerror=src="../img/ceishi.jpg">
                    <div>${sp_title}</div>
                    </div>`;
        }
        $(".dkft-model").html(html);
    }
    function get_wk_more(data){
        
        //console.log(data);
        var videos=data.videos,html='';
        for(var i=0;i<videos.length;i++){
            if(videos[i].title.length>20){
                var sp_title;
                sp_title=videos[i].title.substr(0,20)+"...";
            }else{
                sp_title=videos[i].title
            }
            html+=`<div class="inline-block dkft_list" data-id="${videos[i].id}">
                    <img src="${cover_src+videos[i].image}" alt="" onerror=src="../img/ceishi.jpg">
                    <div>${sp_title}</div>
                    </div>`;
        }
        $(".dkft-model").append(html);
    }
    ajax(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":3},get_wk);
    scroll_more(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":3},get_wk_more);
    //视频点击
    $("body").on("click",".dkft-model>div",function(){
        var videoId=$(this).attr("data-id");
        function get_vid(data){
            vid=data.data.vid;
            window.location.href="../html/video.html?vid="+vid+"&&spid="+videoId+"&&msg=dkft";
        }
        ajax(http_url.url+"/video/vid",{"id":videoId},get_vid);
    })
});