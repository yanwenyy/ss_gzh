$(function(){
    var phone=getUrlParms("phone");
    //tab切换
    $(".mine-work-title>div").click(function(){
        $(".column-list-main").html('');
        $(".mine-work-title>div").removeClass("orange").children("span").removeClass("work-title-line");
        $(this).addClass("orange").children("span").addClass("work-title-line");
        var code=$(this).attr("data-code");
        if(code==2){
            $(".no-pass-works").show();
        }else{
            $(".no-pass-works").hide();
        }
        list(code);
    });
    list($(".mine-work-title>div").attr("data-code"));
    list_more($(".mine-work-title>div").attr("data-code"));
    //专栏视频列表
    function list(val){
        count_end=10;count_start=1;
        ajax(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "checkState":val,
            "userId":phone
        },function(data){
            var html='',list=data.data;
            if(list.length<3){
                $(".column-list-main").css("column-count","1")
            }
            var len=list.length;
            for(var i=0;i<len;i++){
                var change_v=list[i];
                html+=`<div class="column-list-div inline-block" data-checkStatus="${change_v.checkStatus}" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                ${change_v.checkStatus!=2?format(change_v.createTime):''}
                                ${change_v.checkStatus==2&&change_v.surplusDate?change_v.surplusDate+'天':''}
                            </div>
                        </div>
                        <span class="brush-num-main inline-block">${change_v.watchNum>10000?change_v.watchNum/10000+"万":change_v.watchNum}观看</span>
                    </div>`
            }
            $(".column-list-main").html(html);
        })
    }
    function list_more(val){
        scroll_more(http_url.url+"/brush/brushVideorRequirement",{
            "maxId": count_end,
            "sinceId":count_start,
            "checkState":val,
            "userId":phone
        },function(data){
            var html='';
            if(data.data!=''){
                var list=data.data,len=list.length;
                for(var i=0;i<len;i++){
                    var change_v=list[i];
                    html+=`<div class="column-list-div inline-block" data-checkStatus="${change_v.checkStatus}" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                ${change_v.checkStatus!=2?format(change_v.createTime):''}
                                ${change_v.checkStatus==2&&change_v.surplusDate?change_v.surplusDate+'天':''}
                            </div>
                        </div>
                        <span class="brush-num-main inline-block">${change_v.watchNum>10000?change_v.watchNum/10000+"万":change_v.watchNum}观看</span>
                    </div>`
                }
                $(".column-list-main").append(html);
            }else{
                scroll_status=false;
            }
        })
    }
    //视频列表点击
    $("body").on("click",".column-list-div",function(){
        var checkStatus=$(this).attr("data-checkStatus");
        window.location.href="brush-nopass-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
        // if(checkStatus==2){
        //     window.location.href="brush-nopass-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
        // }else{
        //     window.location.href="brush-video.html?vid="+$(this).attr("data-vid")+"&id="+$(this).attr("data-id");
        // }
    });
    function format(shijianchuo) {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
    }
});