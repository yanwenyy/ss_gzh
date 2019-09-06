$(function(){
    function get_select(data){
        console.log(data);
        var categorys=data.categorys,zt='',sz='',hy='',zt_html='',sz_html='',hy_html='';
        for(var p=0,len=categorys.length;p<len;p++){
            var change_v=categorys[p];
            if(change_v.name=="专题"){
                zt=change_v.children;
            }else if(change_v.name=="税种"){
                sz=change_v.children;
            }else if(change_v.name=="行业"){
                hy=change_v.children;
            }
        }
        for(var i=0,len1=zt.length;i<len1;i++){
            var change_1=zt[i];
            zt_html+=`<div class="inline-block" data-type="topic">${change_1.name}</div>`
        }
        $(".zt").html(zt_html);
        for(var j=0,len2=sz.length;j<len2;j++){
            var change_2=sz[j];
            sz_html+=`<div class="inline-block" data-type="tax">${change_2.name}</div>`
        }
        $(".sz").html(sz_html);
        for(var k=0,len3=hy.length;k<len3;k++){
            var change_3=hy[k];
            hy_html+=`<div class="inline-block" data-type="trade">${change_3.name}</div>`
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