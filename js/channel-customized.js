$(function(){
    //返回按钮点击
    $(".channel-back").click(function(){
        window.history.go(-1);
    });
    //保存的频道id
    var ids=[];
    //频道列表
    ajax_nodata(http_url.url+"/classify/classifylist",function(data){
        // console.log(data);
        var hy_list=[],gdtj_list=[],pttj_list=[];
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].recommend_type==1){
                hy_list.push(data.data[i]);
            }else  if(data.data[i].recommend_type==2){
                gdtj_list.push(data.data[i])
            }else  if(data.data[i].recommend_type==3){
                pttj_list.push(data.data[i])
            }
        }
        var h_html='',g_html='',p_html='';
        for(var h=0;h<hy_list.length;h++){
            h_html+=`
                <div class="inline-block box-sizing  ${hy_list[h].name.length>7?'mine-pd-list-two':''}" data-id="${hy_list[h].id}">${hy_list[h].name}</div>
            `
        }
        for(var g=0;g<gdtj_list.length;g++){
            g_html+=`
               <div class="inline-block channel-tj-mr cursor ${gdtj_list[g].name.length>7?'mine-pd-list-two':''}" data-id="${gdtj_list[g].id}">${gdtj_list[g].name}</div>
            `
        }
        for(var p=0;p<pttj_list.length;p++){
            ids.push(pttj_list[p].id);
            p_html+=`
                <div class="inline-block channel-list-act channel-tj-mr-no ${pttj_list[p].name.length>7?'mine-pd-list-two':''}" data-id="${pttj_list[p].id}">${pttj_list[p].name}</div>
            `
        }
        $(".channel-mine-hy").html(h_html);
        $(".channel-tj").html(g_html).append(p_html);
    });
    //我的行业点击
    $("body").on("click",".channel-mine-hy>div",function(){
        var id=$(this).attr("data-id");
        if($(this).hasClass("channel-list-act")){
            $(this).removeClass('channel-list-act');
            ids.remove(id);
        }else{
            $(this).addClass('channel-list-act');
            ids.push(id);
        }
    });
    //频道推荐点击
    $("body").on("click",".channel-tj-mr-no",function(){
        var id=$(this).attr("data-id");
        if($(this).hasClass("channel-list-act")){
            $(this).removeClass('channel-list-act');
            ids.remove(id);
        }else{
            $(this).addClass('channel-list-act');
            ids.push(id);
        }
    });
    //保存按钮点击
    $(".sub-channel-c").click(function(){
        console.log(ids);
        if(ids==''){
            alert("请定制您的频道")
        }else{
            ajax(http_url.url+"/classify/attention/classify",{ids:ids},function(data){
                console.log(data);
                if(data.code==1){
                    window.location.href="channel.html";
                }else{
                    alert(data.des);
                }
            })
        }

    })
});