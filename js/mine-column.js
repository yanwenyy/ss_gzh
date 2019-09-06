$(function(){
    $(".back").click(function(){
       window.location.href="index-mine.html"
    });
    //专栏列表
    ajax_nodata(http_url.url+"/user/message",function(data){
        ajax(http_url.url+"/brush/allSpecialcolumn",{
            "userId":data.phoneNumber
        },function(data){
            var list=data.data;
            if(list==''){
                $(".no-column").removeClass("out");
                $(".column-body").addClass("out");
            }else{
                var html='';
                if(data.rows>2){
                    $(".crate-column-btn").addClass("crate-column-btn-no")
                }
                for(var i=0,len=list.length;i<len;i++){
                    var change_v=list[i];
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block column-group-num">${i+1}</div>
                        <div class="inline-block column-group-msg"  data-id="${change_v.id}">
                            <div>${change_v.specialColumnName}</div>
                            <div>${change_v.specialColumnVideoNumber}篇视频</div>
                        </div>
                        <div class="inline-block column-group-more" data-num="${change_v.specialColumnVideoNumber}" data-id="${change_v.id}" data-name="${change_v.specialColumnName}"><img src="../img/column-mone.png" alt=""></div>
                    </li>`
                }
                $(".column-group").html(html);
            }
        });
    });
    //关闭操作弹窗
   $(".operation-cancel").click(function(){
        $(".column-operation").addClass("out");
   });
   //打开操作弹窗
    $("body").on("click",".column-group-more",function(){
        $(".column-operation").removeClass("out").attr("data-id",$(this).attr("data-id")).attr("data-name",$(this).attr("data-name")).attr("data-num",$(this).attr("data-num"));
    });
    //创建专栏点击
    $(".crate-column-btn").click(function(){
        if($(this).hasClass("crate-column-btn-no")){
            return;
        }else{
            window.location.href="mine-column-crate.html";
        }
    });
    //编辑专栏名称点击
    $(".operation-edit").click(function(){
        var name=encodeURIComponent(encodeURIComponent($(".column-operation").attr("data-name")));
        window.location.href="mine-column-crate.html?id="+$(".column-operation").attr("data-id")+"&name="+name;
    });
    //查看专栏
    $(".operation-look").click(function(){
        window.location.href="mine-column-list.html?id="+$(".column-operation").attr("data-id");
    });
    //查看专栏
    $("body").on("click",".column-group-msg",function(){
        window.location.href="mine-column-list.html?id="+$(this).attr("data-id");
    });
    //删除专栏点击
    $(".operation-del").click(function(){
        if(confirm("确定要删除此专栏吗")==true){
            if( $(".column-operation").attr("data-num")>0){
                alert("您的专栏下有已经发布的视频,不可删除")
            }else{
                ajax(http_url.url+"/brush/delSpecialcolumn",{
                    "id":$(".column-operation").attr("data-id")
                },function(data){
                    if(data.code==1){
                        location.reload();
                    }else{
                        alert(data.des);
                    }
                })
            }

        }
    })
});