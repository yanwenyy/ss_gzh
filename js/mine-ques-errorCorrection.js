$(function(){
    var sz_uuid=[];
    //专题,税种
    function get_select(data){
        console.log(data);
        var categorys=data.categorys,zt='',sz='',zt_html=[],sz_html='';
        for(var p=0;p<categorys.length;p++){
            if(categorys[p].name=="专题"){
                zt=categorys[p].children;
            }else if(categorys[p].name=="税种"){
                sz=categorys[p].children;
            }
        }
        for(var i=0;i<zt.length;i++){
            var item={
                title:zt[i].name,
                value:zt[i].uuid
            };
            zt_html.push(item);
        }
        for(var j=0;j<sz.length;j++){
            sz_html+=`<div class="inline-block error_sz" data-id="${sz[j].uuid}" data-type="tax">${sz[j].name}</div>`
        }
        $(".sz").html(sz_html);
        //企业名称
        $("#hy").select({
            items: zt_html,
            onClose:function(){
                // alert(11)
            }
        });
    }
    ajax_nodata(http_url.url+"/category/tree",get_select);
    //税种点击
    $("body").on("click",".error_sz",function(){
        if($(this).hasClass("error_sz_act")){
            $(this).removeClass("error_sz_act");
            sz_uuid.remove($(this).html());
        }else{
            $(this).addClass("error_sz_act");
            sz_uuid.push($(this).html());
        }
    });
    //提交纠错
    $(".release").click(function(){
        var uuid=getUrlParms("id");
        console.log(sz_uuid)
        var content=$(".ques-text").val(),topicId=$("#hy").val(),taxId=sz_uuid.join(",");
        if(content==""||topicId==null||sz_uuid==""){
            alert("请完善信息")
        }else{
            ajax(http_url.url+"/changerError/answer/add",{
                "content":content,
                "taxId":taxId,
                "topicId":topicId,
                "uuid":uuid
            },function(data){
                if(data.code==1){
                    alert("提交成功");
                    window.history.go(-1);
                }else{
                    alert(data.des);
                }
            })
        }

    })
});