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
        var hy_list=[],gdtj_list=[],pttj_list=[],mine_list=data.data;
        for(var i=0,len=mine_list.length;i<len;i++){
            var change_v=mine_list[i];
            if(change_v.recommend_type==1){
                hy_list.push(change_v);
            }else  if(change_v.recommend_type==2){
                gdtj_list.push(change_v)
            }else  if(change_v.recommend_type==3){
                pttj_list.push(change_v)
            }
        }
        var h_html='',g_html='',p_html='';
        for(var h=0,len1=hy_list.length;h<len1;h++){
            var h_change=hy_list[h];
            h_html+=`
                <div class="inline-block box-sizing  ${h_change.name.length>7?'mine-pd-list-two':''}" data-id="${h_change.id}">${h_change.name}</div>
            `
        }
        for(var g=0,len2=gdtj_list.length;g<len2;g++){
            var g_change=gdtj_list[g];
            g_html+=`
               <div class="inline-block channel-tj-mr cursor ${g_change.name.length>7?'mine-pd-list-two':''}" data-id="${g_change.id}">${g_change.name}</div>
            `
        }
        for(var p=0,len3=pttj_list.length;p<len3;p++){
            var p_change=pttj_list[p];
            ids.push(p_change.id);
            p_html+=`
                <div class="inline-block channel-list-act channel-tj-mr-no ${p_change.name.length>7?'mine-pd-list-two':''}" data-id="${p_change.id}">${p_change.name}</div>
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