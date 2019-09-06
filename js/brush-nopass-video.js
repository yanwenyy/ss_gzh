$(function(){
    var vid=getUrlParms("vid"),id=getUrlParms("id"),userId='';
    // ajax(http_url.url+"/brush/original",{
    //     "vid": vid
    // },function(data){
    //
    //     if(data.code==1){
    //         $(".brush-v-xz>a").attr("href",data.data.video.url).attr("download","filename");
    //     }else{
    //         alert(data.des);
    //     }
    // })
    ajax(http_url.url+"/brush/brushVideorRequirement",{
        "source":'0',
        "id":id,
        "sinceId":'1',
        "maxId":'2'
        },function(data){
        var v_html="&lt;script async src='https://p.bokecc.com/player?vid="+data.data[0].vid+"&siteid=A0123BC413D6FBAE&autoStart=true&width=100%&height=100%&playerid=7E2195B034B0277B&playertype=1'>&lt;/script>";
        v_html=v_html.replace(/&lt;/g,'<');
        $(".brush-video-body").html(v_html);
        var html=`<div class="brush-video-column inline-block ${data.data[0].specialColumnName?'':'out'}" data-phone="${data.data[0].userId}" data-id="${data.data[0].specialcolumnId}">${data.data[0].specialColumnName||''}</div>
                    <div class="brush-video-user">${get_name(data.data[0])}</div>
                    <div class="brush-video-label">${data.data[0].title}</div>
                    <div class="brush-video-title" data-id="${data.data[0].labelId}">${data.data[0].labelName?"#"+data.data[0].labelName:''}</div>`;
        $(".brush-video-msg").html(html);
        if(data.data[0].checkStatus!=2){
            $(".brush-v-xz").hide();
        }
        if(data.data[0].checkStatus==1){
            $(".brush-v-xh").show();
            $(".brush-v-xh-num").html(data.data[0].praiseNum);
            if(data.data[0].ifPraise>0){
                $(".brush-v-xh>img").attr("src","../img/brush-v-xh-already.png")
            }
            if(data.data[0].ifStore==0){
                $(".brush-v-sc>img").attr("src","../img/brush-v-sc-already.png")
            }
        }
        $(".brush-v-del").attr("data-id",data.data[0].id);
        $(".brush-v-gz>div").attr("data-id",data.data[0].userId);
        $(".brush-v-gz>img").attr("src",headimage(data.data[0].headImage)).attr("data-phone",data.data[0].userId);
        userId=data.data[0].userId;
    });
    //删除点击
    $(".brush-v-del").click(function(){
        if(confirm("确定要删除吗")==true){
            ajax(http_url.url+"/brush/delBrushVideor",{"id":$(this).attr("data-id")},function(data){
                if(data.code==1){
                    window.history.go(-1);
                }else{
                    alert(data.des);
                }
            });
        }
    });
    $(".brush-v-xz").click(function(){
        alert("请下载刷刷app进行下载操作");
    });
    //标签点击
    $("body").on("click",".brush-video-title",function(){
        var name=$(this).html().split("#")[1];
        window.location.href="brush-label-detail.html?id="+$(this).attr("data-id")+"&name="+encodeURIComponent(encodeURIComponent(name));
    });
    //专栏点击
    $("body").on("click",".brush-video-column",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="personal-new.html?phone="+phone+"&to=personal-new-title&msg=p-zl&sid="+$(this).attr("data-id");
    });
    //喜欢点击
    $(".brush-v-xh").click(function(){
        var that=$(this);
        if($(this).children("img").attr("src")=="../img/brush-v-xh.png"){
            ajax(http_url.url+"/praise/brush",{
                "praiseType": "1",
                "productId": id,
                "type": "2"
            },function(data){
                if(data.code==1){
                    that.children("img").attr("src","../img/brush-v-xh-already.png");
                    that.children("div").html(Number(that.children("div").html())+1);
                }else{
                    alert(data.des);
                }
            })
        }else{
            ajax(http_url.url+"/praise/brush",{
                "praiseType": "0",
                "productId": id,
                "type": "2"
            },function(data){
                if(data.code==1){
                    that.children("img").attr("src","../img/brush-v-xh.png");
                    that.children("div").html(that.children("div").html()-1);
                }else{
                    alert(data.des);
                }
            })
        }

    });
});