$(function(){
    var src_list=[],session_list=[];
    $(".ques-text").val(sessionStorage.getItem("case_msg"));
    var img_src_list=sessionStorage.getItem("case_img");

    if(img_src_list){
        img_src_list=img_src_list.split(",");
        //console.log(img_src_list);
        var html='';
        for(var i=0;i<img_src_list.length;i++){
            src_list.push(img_src_list[i]);
            html+=`<div class="inline-block">
            <img  class="img_look" src="data:image/jpeg;base64,${img_src_list[i]}" alt="" data-src="${img_src_list[i]}">
            <img src="../img/icon-index-ask-close.png" alt="" class="del-img">
            </div>`;
        }
        console.log(src_list);
        $(".qus-img-group").html(html);
        $(".img-sel-num").html(src_list.length);
    }
    $(".add-qus-img input").change(function () {
        var html;
        var file = $('.add-qus-img input').get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            //console.log(e.target.result);
            html='<div class="inline-block"><img class="img_look" src="'+e.target.result+'" alt="" data-src="'+e.target.result.split(",")[1]+'">'+'<img src="../img/icon-index-ask-close.png" alt="" class="del-img"></div>';
            $(".qus-img-group").append(html);
            src_list.push(e.target.result.split(",")[1]);
            session_list.push(e.target.result);
            console.log(src_list);
            $(".record-num").val(src_list);
            $(".img-sel-num").html(src_list.length);
            if(src_list.length==3){
                $(".add-qus-img").hide();
            }
        };
    });
    $("body").on("click",".del-img",function(){
        var that= $(this);
        //console.log(that.prev("img").attr("src"));
        // for(var i=0;i<src_list.length;i++){
        //     if(src_list[i]==that.prev("img").attr("src")){
        //         src_list.splice(i,1);
        //     }
        // }
        src_list.remove(that.prev("img").attr("data-src"));
        session_list.remove(that.prev("img").attr("data-src"));
        that.parent().remove();
        console.log(src_list);
        $(".img-sel-num").html(src_list.length);
        $(".record-num").val(src_list);
        if( $(".img-sel-num").html()<3){
            $(".add-qus-img").show();
        }
    });
    $(".release").click(function(){
        var msg=$(".ques-text").val();
        //var img_src=$(".record-num").val();
        sessionStorage.setItem("case_msg",msg);
        sessionStorage.setItem("case_img",src_list);
        sessionStorage.setItem("session_list",session_list);
        console.log(src_list);
        window.history.go(-1);
    });
});