$(function(){
    var open=getUrlParms("open");
    var uuid='',
        originalPrice='',
        currentPrice='',
        cardImage='',
        cardType='',
        cardNum='',
        cardStyle='';
    if(open!=''&&open!=null){
        $(".card-365-footer-two>span").html("立即开通");
    }else{
        $(".card-365-footer-two>span").html("立即续费");
        $(".card-365-show-open").addClass("out");
        $(".card-365-show-date").removeClass("out");
        var tt=new Date().getTime();
        if(tt>getUrlParms("time")){
            $(".tfs-time").addClass("gray").html(format(Number(getUrlParms("time"))).split(" ")[0]+"过期"||'');
        }else{
            $(".tfs-time").html(format(Number(getUrlParms("time"))).split(" ")[0]+"到期"||'');
        }
    }
    ajax_nodata(http_url.url+"/vipcard/tsf",function(data){
        console.log(data);
        //365卡详情
        uuid=data.data.uuid;
        originalPrice=data.data.originalPrice;
        currentPrice=data.data.currentPrice;
        cardImage=data.data.cardImage;
        cardType=data.data.cardType;
        cardNum=data.data.cardNum;
        cardStyle=data.data.cardStyle;
    });
    //开通或续费365
    $(".kt-365-btn").click(function(){
        // window.location.href='watch-pay.html?card_365=yes&'+'price='+currentPrice+'&uuid='+uuid+'&originalPrice='+originalPrice+'&currentPrice='+currentPrice+'&cardStyle='+cardStyle;
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fuuid%3d"+uuid+"%26%26card_365%3dyes"+"%26%26price%3d"+currentPrice+"%26%26originalPrice%3d"+originalPrice+"%26%26currentPrice%3d"+currentPrice+"%26%26cardStyle%3d"+cardStyle+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
    })
});