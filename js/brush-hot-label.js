$(function(){
    var msg=getUrlParms("msg");
    //获取标签列表
    ajax(http_url.url+"/brush/allLabel",{
        "labelType":1
    },function(data){
        var html=`<div class="inline-block ${msg?'':'brush-hot-body-list-act'}" data-id=""><span>推荐</span></div>`;
        for(var i=0;i<data.data.length;i++){
            html+=`
            <div data-id="${data.data[i].id}" class="inline-block ${msg==data.data[i].id?'brush-hot-body-list-act':''}"># <span>${data.data[i].labelName}</span></div>`;
        }
        $(".brush-hot-body-list").html(html);
    });
    //标签切换
    $("body").on("click",".brush-hot-body-list>div",function(){
        $(".brush-hot-body-list>div").removeClass("brush-hot-body-list-act");
        $(this).addClass("brush-hot-body-list-act");
        window.location.href="brush.html?msg="+$(this).attr("data-id");
    })
});
