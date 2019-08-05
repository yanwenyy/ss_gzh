$(function(){
    var id=getUrlParms("id"),name=decodeURIComponent(decodeURIComponent(getUrlParms("name")));
    if(id){
        $(".title-msg").html("修改专栏");
        $(".crate-column-msg>input").val(name);
        $(".column-name-num>span").html(name.length)
    }
    $(".release").click(function(){
        if($(".crate-column-msg>input").val()==''){
            alert("专栏名字不能为空");
        }else{
            if(id){
                ajax(http_url.url+"/brush/addSpecialcolumn",{
                    "id":id,
                    "specialColumnName": $(".crate-column-msg>input").val()
                },function(data){
                    if(data.code==1){
                        alert("修改成功");
                        window.location.href="mine-column.html"
                    }else{
                        alert(data.des);
                    }
                })
            }else{
                ajax(http_url.url+"/brush/addSpecialcolumn",{
                    "specialColumnName": $(".crate-column-msg>input").val()
                },function(data){
                    if(data.code==1){
                        alert("创建成功");
                        window.location.href="mine-column.html"
                    }else{
                        alert(data.des);
                    }
                })
            }

        }
    });
    //删除数字点击
    $(".crate-column-msg>img").click(function(){
        $(".crate-column-msg>input").val("");
        $(".column-name-num>span").html(0)
    })
});