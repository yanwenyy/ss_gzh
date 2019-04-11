$(function(){
    var link=getUrlParms("link"),id=getUrlParms("id");
    $("iframe").attr("src",link+"&cookieId="+sessionStorage.getItem("cookieId"));
    $(".go-cawatch").click(function(){
        ajax(http_url.url+"/onlook/look/buy",{
            "uuid":id,
            "payType":"watchVideo",
            "money":1,
            "source":"1"
        },function(data){
            if(data.code==1){
                window.location.href="../html/watch-anwser.html?newuser=yes&&cwatch_id="+id;
            }else{
                alert(data.des);
            }
        })
    })
});