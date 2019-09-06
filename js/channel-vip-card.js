$(function(){
    var id=getUrlParms("id");
    //列表数据
    ajax(http_url.url+"/goods/goodslist",{"id":id},function(data){
        console.log(data);
        var html='',list=data.data;
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            html+=`
                <div class="channel-card-list ${i==0?'channel-card-list-act':''} box-sizing" data-id="${change_v.id}" data-price="${change_v.price}">
                    <img class="channel-card-sel" src="${i==0?'../img/channel-card-select.png':'../img/channel-card-select-no.png'}" alt="">
                    <div class="inline-block">
                        <div class="channel-card-name">${change_v.goods_name}</div>
                        <div class="channel-card-msg">${change_v.introduction}</div>
                        <div class="orange channel-card-money"><span style="font-size: 2.8rem">¥</span>${parseFloat(change_v.price).toFixed(2)}/<span style="font-size: 2.4rem">${change_v.unit==1?'年':change_v.unit==2?'季':change_v.unit==3?'月':'周'}</span></div>
                    </div>
                </div>
            `;
        }
        $(".channel-c-main").html(html);
    });
    //取消页面点击
    $(".cancel-vip").click(function(){
        window.history.go(-1);
    });
    //会员卡列表点击
    $("body").on("click",".channel-card-list",function(){
        $(".channel-card-list").removeClass("channel-card-list-act");
        $(this).addClass("channel-card-list-act");
        $(".channel-card-sel").attr("src",'../img/channel-card-select-no.png');
        $(this).children(".channel-card-sel").attr("src","../img/channel-card-select.png")
    });
    //确定按钮点击
    $(".sub-channel-c").click(function(){
        // window.location.href="channel-pay.html?id="+$(".channel-card-list-act").attr("data-id")+"&price="+$(".channel-card-list-act").attr("data-price");
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fchannel-pay.html%3fid%3d"+$(".channel-card-list-act").attr("data-id")+"%26%26price%3d"+$(".channel-card-list-act").attr("data-price")+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
    })
});