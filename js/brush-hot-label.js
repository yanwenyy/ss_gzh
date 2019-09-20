$(function(){
    var msg=getUrlParms("msg"),
        from=getUrlParms("from");
    //获取标签列表
    ajax(http_url.url+"/brush/allLabel",{
        "labelType":1
    },function(data){
        var html=`<div class="inline-block ${msg?'':'brush-hot-body-list-act'}" data-id=""><span>推荐</span></div>`;
        var label=data.data;
        for(var i=0,len=label.length;i<len;i++){
            var change_v=label[i];
            html+=`
            <div data-id="${change_v.id}" class="inline-block ${msg==change_v.id?'brush-hot-body-list-act':''}"># <span>${change_v.labelName}</span></div>`;
        }
        $(".brush-hot-body-list").html(html);
    });
    //标签切换
    $("body").on("click",".brush-hot-body-list>div",function(){
        $(".brush-hot-body-list>div").removeClass("brush-hot-body-list-act");
        $(this).addClass("brush-hot-body-list-act");
        if(from){
            var name=$(this).html().split("#")[1];
            window.location.href="brush-label-detail.html?id="+$(this).attr("data-id")+"&name="+encodeURIComponent(encodeURIComponent(name));
        }else{
            window.location.href="brush.html?msg="+$(this).attr("data-id");
        }
    })
});
