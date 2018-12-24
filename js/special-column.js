$(function(){
    function get_select(data){
        console.log(data);
        var categorys=data.categorys,zt='',sz='',hy='',zt_html='',sz_html='',hy_html='';
        for(var p=0;p<categorys.length;p++){
            if(categorys[p].name=="专题"){
                zt=categorys[p].children;
            }else if(categorys[p].name=="税种"){
                sz=categorys[p].children;
            }else if(categorys[p].name=="行业"){
                hy=categorys[p].children;
            }
        }
        for(var i=0;i<zt.length;i++){
            zt_html+=`<div class="inline-block" data-type="topic">${zt[i].name}</div>`
        }
        $(".zt").html(zt_html);
        for(var j=0;j<sz.length;j++){
            sz_html+=`<div class="inline-block" data-type="tax">${sz[j].name}</div>`
        }
        $(".sz").html(sz_html);
        for(var k=0;k<hy.length;k++){
            hy_html+=`<div class="inline-block" data-type="trade">${hy[k].name}</div>`
        }
        $(".hy").html(hy_html);
    }
    ajax_nodata(http_url.url+"/category/tree",get_select);
    //行业,税种点击
    $("body").on("click",".consultant-list-sel>div",function(){
        var type=$(this).attr("data-type"),msg=$(this).html();
        window.location.href="special-column-detail.html?type="+type+"&&msg="+encodeURIComponent(encodeURIComponent(msg));
    });
});