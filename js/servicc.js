$(function(){
    function sub_msg(data){
        console.log(data);
        if(data.code==1){
            alert(data.des);
            window.location.href="index.html";
        }else{
            alert(data.des);
        }
    }
    $(".release").click(function(){
       var  content=$(".yjfk-textarea").val(),contact=$(".feed_number").val();
       if(content==""){
           alert("请填写需要服务的内容")
       }else if(contact==""){
           alert("请填写联系方式");
       }else{
           ajax(http_url.url+"/personal/service/opinion",{"content":content,
               "contact":contact},sub_msg);
       }
    });

});