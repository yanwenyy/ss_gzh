$(function(){
    var msg=getUrlParms("msg");
    //轮播图
    ajax(http_url.url+"/rotation/brush",{
        "maxId": 10,
        "sinceId": 1
    },function(data){
        var rotations=data.data;
        var html='';
        for(var i=0,len=rotations.length;i<len;i++){
            var change_v=rotations[i];
            html+=`<div class="swiper-slide"  data-md-name="${change_v.image}" data-imageLink="${change_v.imageLink}"  data-nativeLink="${change_v.nativeLink}"  data-isNative="${change_v.isNative}"><img alt="" src="${rotation_src+change_v.image}" data-id="${change_v.uuid}" data-name="${change_v.image}' alt=""></div>`
        }
        $(".s3>.swiper-wrapper").html(html);
    });
    var mySwiper2 = new Swiper('.s3', {
        autoplay:3000,//可选选项，自动滑动
        //autoHeight: true,
        speed: 2000,
        roundLengths: true,
        // pagination: '.swiper-pagination',
        type: 'bullets',
        paginationClickable: true,
        loop: true, //循环播放
        //touchRatio:1,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true ,//修改swiper的父元素时，自动初始化swiper
        autoplayStopOnLast:false,
        // nextButton: '.swiper-button-next2',
        // prevButton: '.swiper-button-prev2',
    });
    //获取标签列表
    ajax(http_url.url+"/brush/allLabel",{
        "labelType":1
    },function(data){
        var html=`
            <div class="inline-block ${msg==''||msg==null?'channel-tab-act':''}" data-id="" data-recommend="1">
                推荐
                <div class="channel-tab-line ${msg==null||msg==''?'':'out'}"></div>
            </div>`,list_v=data.data;
        for(var i=0,len=list_v.length;i<len;i++){
            var change_v=list_v[i];
            html+=`
            <div class="inline-block ${msg==change_v.id?'channel-tab-act':''}" data-id="${change_v.id}" >
                #${change_v.labelName}
                <div class="channel-tab-line ${msg==change_v.id?'':'out'}"></div>
            </div>`;
        }
        $(".channel-tab").html(html);
        if(msg){
            $(".channel-tab").scrollLeft($(".channel-tab>div[data-id="+msg+"]").offset().left-40);
        }
        list($(".channel-tab-act").attr("data-id"),$(".channel-tab-act").attr("data-recommend"));
    });
    // //获取滚动距离
    // $(window).scroll(function(){
    //   if($(document).scrollTop()>=$(".hot-label-body").offset().top){
    //       $(".brush-input").show();
    //       $(".brush-title").hide();
    //   }else{
    //       $(".brush-input").hide();
    //       $(".brush-title").show();
    //   }
    // });
    // //置顶按钮点击
    // $(".go-top").click(function(){
    //     window.location.href="#";
    // });
    //轮播图点击
    $("body").on("click",".swiper-slide",function(){
        var isNative=$(this).attr("data-isNative"),
            nativeLink=$(this).attr("data-nativeLink"),
            imageLink=$(this).attr("data-imageLink");
        if(isNative==0){
            window.location.href=imageLink;
        }else if(isNative==2){
            window.location.href="special-column-detail.html?type="+nativeLink+"&&msg="+encodeURIComponent(encodeURIComponent(imageLink))
        }else if(isNative==3){
            window.location.href="office-detail.html?id="+imageLink;
        }else if(isNative==4){
            window.location.href="brush.html?msg="+imageLink;
        }else if(isNative==5){
            window.location.href="brush-video.html?id="+imageLink;
        }
    });
    //全部热门点击
    $(".channel-mine-btn").click(function(){
        window.location.href="brush-hot-label.html?msg="+$(".channel-tab-act").attr("data-id");
    });
    //tab导航栏点击
    $("body").on("click",".channel-tab>div",function(){
        $(".channel-tab>div").removeClass("channel-tab-act").children(".channel-tab-line").addClass("out");
        $(this).addClass("channel-tab-act").children(".channel-tab-line").removeClass("out");
        $(".column-list-main").css("column-count","2").html("");
        list($(".channel-tab-act").attr("data-id"),$(".channel-tab-act").attr("data-recommend"));
    });
    function list(labelId,recommend){
        count_end=10;count_start=1;
        ajax(http_url.url+"/brush/brushVideorRequirement",{
            "labelId": labelId,
            "maxId": count_end,
            "sinceId": count_start,
            "recommend": recommend,
        },function(data){
            var html='';
            var list=data.data;
            if(list.length<3&&list.length>1){
                $(".column-list-main").css("column-count","1");
                $(".column-list-div").css("width","33.8rem");
            }else{
                $(".column-list-main").css("column-count","2");
                $(".column-list-div").css("width","auto");
            }
            for(var i=0,len=list.length;i<len;i++){
                var change_v=list[i];
                html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
            }
            $(".column-list-main").html(html);
        })
    }
    function list_more(data){
        var html='';
        if(data.data!=''){
            for(var i=0,len=list.length;i<len;i++){
                var change_v=list[i];
                html+=`<div class="column-list-div inline-block" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="../img/user.png" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
            }
            $(".column-list-main").append(html);
        }else{
            scroll_status=false;
        }
    }
    scroll_more(http_url.url+"/brush/brushVideorRequirement",{
        "labelId":".channel-tab-act&&data-id",
        "maxId": count_end,
        "sinceId": count_start,
        "recommend": ".channel-tab-act&&data-recommend"
    },list_more);
    //视频列表点击
    $("body").on("click",".column-list-div",function(){
        window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
    });
    // //搜索刷刷
   $(".fans-search").click(function(){
        window.location.href="brush-search.html"
   })
});