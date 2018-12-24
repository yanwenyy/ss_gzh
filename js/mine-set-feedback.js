$(function(){
    $(".release").click(function(){
        var content=$(".yjfk-textarea").val(),
            contact=$(".feed_number").val();
        function sub(data){
            if(data.code==1){
                alert(data.des);
                window.location.href="../html/index-mine.html";
            }else{
                alert(data.des);
            }
        }
        ajax(http_url.url+"/personal/opinion",{"content":content,
            "contact":contact},sub)
    })
});