$(function(){
    //获取省份
    function get_list(data){
        // console.log(data);
        var provinces=data.provinces,html='<li class="city_li_act" data-msg="">全国</li>';
        for(var i=0;i<provinces.length;i++){
            html+=`<li  data-msg="${provinces[i].province}">${provinces[i].province}</li>`
        }
        $(".city-main").html(html);
    }
   ajax_nodata(http_url.url+"/citys/area",get_list);
    //省市点击
    $("body").on("click",".city-main>li",function(){
        var msg=$(this).html();
        $(".city-main>li").removeClass("city_li_act");
        $(this).addClass("city_li_act");
        if(msg=="全国"){
            window.location.href=getUrlParms("source")+"?province="+encodeURIComponent(encodeURIComponent('全国'))+"&&city=";
        }else{
            ajax_nodata(http_url.url+"/citys/area",get_area);
        }
        //获取区
        function get_area(data){
            console.log(data);
            var area='',provinces=data.provinces,area_html='<li data-city="">全部</li>';
            for(var i=0;i<provinces.length;i++){
               if(msg==provinces[i].province){
                   area=provinces[i].agency;
               }
            }
            for(var j=0;j<area.length;j++){
                area_html+=`<li data-city="${area[j].city}">${area[j].city}</li>`;
            }
            $(".city-area").html(area_html);
        }
    });
    //二级省市点击
    $("body").on("click",".city-area>li",function(){
        $(".city-area>li").removeClass("pro_li_act");
        $(this).addClass("pro_li_act");
        window.location.href=getUrlParms("source")+"?province="+encodeURIComponent(encodeURIComponent($(".city_li_act").attr("data-msg")))+"&&city="+encodeURIComponent(encodeURIComponent($(".pro_li_act").attr("data-city")));
    });
    //刷新按钮点击
    $(".mer-reload").click(function(){
        window.location.reload();
    })
});