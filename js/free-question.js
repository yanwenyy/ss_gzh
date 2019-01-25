$(function(){
    var hangxin_data=false;
    function if_hangxin(data){
        if(data.aision==0&&data.vip==0){
            hangxin_data=true;
            $(".hangxin-money").removeClass("out");
            $(".other-money").addClass("out");
        }else if(data.aision==2&&data.vip==0){
            hangxin_data=true;
            $(".hangxin-money").removeClass("out").children(".more-msg").html("个税会员免费");
            $(".other-money").addClass("out");
        }
    }
    ajax_nodata(http_url.url+"/user/sectionMessage",if_hangxin);
    // var hy=sessionStorage.getItem("hy-msg");
    // $("#hy").val(hy);
    $(".back").click(function(){
       window.location.href="index.html";
    });
    var msg=getUrlParms("msg");
    var src_list=[];
    // var img_src_list=sessionStorage.getItem("ksw-img");
    //
    // if(msg!=1&&img_src_list){
    //     img_src_list=img_src_list.split(",");
    //     //console.log(img_src_list);
    //     var html='';
    //     for(var i=0;i<img_src_list.length;i++){
    //         src_list.push(img_src_list[i]);
    //         html+=`<div class="inline-block">
    //         <img class="img_look" src="data:image/jpeg;base64,${img_src_list[i]}" alt="" data-src="${img_src_list[i]}">
    //         <img src="../img/icon-index-ask-close.png" alt="" class="del-img">
    //         </div>`;
    //     }
    //     console.log(src_list);
    //     if(src_list.length==3){
    //         $(".add-qus-img").hide();
    //     }
    //     $(".qus-img-group").html(html);
    //     $(".img-sel-num").html(src_list.length);
    // }
    // if(msg!=1&&sessionStorage.getItem("checked-img")){
    //     if(sessionStorage.getItem("checked-img")=="../img/icon-index-ask-anonymous.png"){
    //         $(".if_name").attr("data-code","0")
    //     }else{
    //         $(".if_name").attr("data-code","1")
    //     }
    //     $(".if_name").attr("src",sessionStorage.getItem("checked-img"));
    // }
    //是否匿名
    $(".if_name").click(function(){
        if($(this).attr("src")=="../img/icon-index-ask-anonymous unchecked.png"){
            $(this).attr("src","../img/icon-index-ask-anonymous.png").attr("data-code","0");
            sessionStorage.setItem("checked-img","../img/icon-index-ask-anonymous.png");
        }else{
            $(this).attr("src","../img/icon-index-ask-anonymous unchecked.png").attr("data-code","1");
            sessionStorage.setItem("checked-img","../img/icon-index-ask-anonymous unchecked.png");
        }
    });
    function get_user(data){
        $("#hy").val(data.trade);
    }
    ajax_nodata(http_url.url+"/user/message",get_user);
    //公司行业
    function get_select(data){
        var industry_html='',category_html='',special_html='';
        var categorys=data.categorys,
            industry="",list=[];
        for(var p=0;p<categorys.length;p++){
           if(categorys[p].name=="行业"){
                industry=categorys[p].children;
            }
        }
        for(var i=0;i<industry.length;i++){
            list.push(industry[i].name);
        }
        //企业名称
        $("#hy").select({
            items: list,
            onClose:function(){
                // alert(11)
            }
        });
    }
    ajax_nodata(http_url.url+"/category/tree",get_select);
    //发布
    $(".release").click(function(){
        var content=$(".ques-text").val(),
            isAnon=$(".if_name").attr("data-code"),
            images=src_list,
            trade=$("#hy").val(),
            ques={
                content:content,
                isAnon:isAnon,
                trade:trade,
                images:images
            };
        ques=JSON.stringify(ques);
        sessionStorage.setItem("ques",ques);
        if(content==""){
            alert("请输入问题");
        }else{
            //window.location.href="../html/watch-pay.html?price=15&&qeus=ques";
            if(hangxin_data==true){
                function hangxin_send(data){
                    if(data.code==1){
                        alert(data.des);
                        window.location.href="index.html";
                    }else{
                        alert(data.des);
                    }
                }
                ajax(http_url.url+"/question/releaseQuestion",{
                    "content":content,
                    "money":15,
                    "payType":"free",
                    "trade":trade,
                    "isAnon":isAnon,
                    "images":images
                },hangxin_send)
            }else{
                // window.location.href="../html/watch-pay.html?price=15&&qeus="+ques;
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fqeus%3dqeus%26%26price%3d15&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
            }
        }
        // window.location.href="free-question-payment.html"
    });
    //选择图片
    $(".add-qus-img input").change(function () {
        var html;
        var file = $('.add-qus-img input').get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            //console.log(e.target.result);
            html='<div class="inline-block"><img  class="img_look" src="'+e.target.result+'" alt="" data-src="'+e.target.result.split(",")[1]+'">'+'<img src="../img/icon-index-ask-close.png" alt="" class="del-img"></div>';
            $(".qus-img-group").append(html);
            src_list.push(e.target.result.split(",")[1]);
            // sessionStorage.setItem("ksw-img",src_list);
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
        // sessionStorage.setItem("ksw-img",src_list);
        that.parent().remove();
        console.log(src_list);
        $(".img-sel-num").html(src_list.length);
        $(".record-num").val(src_list);
        if( $(".img-sel-num").html()<3){
            $(".add-qus-img").show();
        }
    });
});