$(function(){
    sessionStorage.removeItem("hy-msg");
   //行业列表
   function get_list(data){
       console.log(data);
       var categorys=data.categorys,html='';
       for(var i=0;i<categorys[2].children.length;i++){
           var city_act="";
           if(i==0){
               city_act="city-act";
           }else{
               city_act="";
           }
           html+=`
                <li class="${city_act}" data-id="${categorys[2].children[i].uuid}">${categorys[2].children[i].name}</li>
           `
       }
       $(".city-list>ul").html(html);
   }
   ajax_nodata(http_url.url+"/category/tree",get_list);
   //行业列表点击
    $("body").on("click",".city-list li",function(){
        $(".city-list li").removeClass("city-act");
        $(this).addClass("city-act");
    });
    $(".release").click(function(){
        var msg=$(".city-act").html();
        //window.location.href="../html/free-question.html";
        window.history.go(-1);
        sessionStorage.setItem("hy-msg",msg)
    })
});