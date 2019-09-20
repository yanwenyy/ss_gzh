$(function(){
    var id=getUrlParms("id");
    function get_detail(data){
        console.log(data);
        $(".merchanism-video-title").html(data.obj.name);
        $(".mer-addre").html(data.obj.address);
        var business='';
        if(data.obj.business&&data.obj.business.length>60){
            business=data.obj.business.substr(0,60)+"...";
        }else{
            business=data.obj.business
        }
        $(".ywlx-msg").html(business);
        if(data.obj.image1!=""||data.obj.image2!=""||data.obj.image3!=""){
            $(".xztp-body").show();
        }else{
            $(".xztp-body").hide();
        }
        $(".xz_img1").attr("src",cover_src+data.obj.image1);
        $(".xz_img2").attr("src",cover_src+data.obj.image2);
        $(".xz_img3").attr("src",cover_src+data.obj.image3);
        $(".qyjs-msg").html(data.obj.introduction);
        $(".lxdh").html(data.obj.contactNo);
        $(".phone_num").attr("href","tel:"+data.obj.contactNo);
        $(".mer-look-num").html(data.obj.detailedViews||0);
        $(".daohang").attr("data-lat",data.obj.latitude).attr("data-lng",data.obj.longitude);
        if(data.obj.type==2){
            $(".mer-video-msg-footer").show();
            $(".merhcanism-hzhb").hide();
        }else{
            $(".mer-video-msg-footer").hide();
            $(".merhcanism-hzhb").show();
        }
    }
    ajax(http_url.url+"/agency/getAgencyById",{"id":id},get_detail);
    //业务类型查看更多
    $(".ywlx_more").click(function(){
        window.location.href="merchanism-ywlx-more.html?id="+id;
    });
    //导航按钮点击
    $("body").on("click",".daohang",function(){
        window.location.href="navigation.html?lat="+$(this).attr("data-lat")+"&&lng="+$(this).attr("data-lng");
    });
    var sp_time=0;
    //视频点击
    $("body").on("click",".ccH5PlayBtn",function(){
        var timer=setInterval(function(){
            sp_time++;
            if(sp_time==10){
                clearInterval(timer);
                function num(data){
                    console.log(data)
                }
               ajax(http_url.url+"/agency/increaseBrowsingTimes",{"id":id},num);
            }
        },1000);
    })
});