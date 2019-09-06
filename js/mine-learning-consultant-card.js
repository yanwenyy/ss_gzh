$(function(){
    function get_money(data){
        // console.log(data);
        $(".balance").html(parseFloat(data.vipBalance).toFixed(2)||"0.0");
    }
    $(".back").click(function(){
        window.location.href="../html/index-mine.html";
    });
    ajax_nodata(http_url.url+"/user/sectionMessage",get_money);
    //会员卡列表
    function get_card_list(data){
        //console.log(data);
        var vipCards=data.vipCards,html="";
        for(var i=0,len=vipCards.length;i<len;i++){
            var change_v=vipCards[i];
            html+=`
                <li class="box-sizing">
                    <img src="${showImg_src+change_v.cardImage}" alt="">
                    <div class="inline-block">
                        <div class="xxgwk-money">金额：<span class="red">￥${change_v.currentPrice}</span></div>
                        <div class="xxgwk-fp"><img src="../img/icon-index-ask-anonymous unchecked.png" alt="" class="need_fp">需要发票</div>
                        <div class="xxgwk-buy" data-uuid="${change_v.uuid}" data-originalPrice="${change_v.originalPrice}" data-currentPrice="${change_v.currentPrice}" data-cardStyle="${change_v.cardStyle}">购买</div>
                    </div>
                </li>
            `;
        }
        $(".vip-card-list").html(html);
    }
    ajax_nodata(http_url.url+"/pay/card",get_card_list);
    //需要发票按钮点击
    $("body").on("click",".need_fp",function(){
        if($(this).attr("src")=="../img/icon-index-ask-anonymous unchecked.png"){
            //判断是否开过发票
            $(this).attr("src","../img/icon-index-ask-anonymous.png");
            function if_already(data){
                console.log(data);
                if(data.code==4){
                    window.location.href="../html/mine-invoice-write.html";
                }else{
                    alert(data.des);
                }
            }
            ajax_nodata(http_url.url+"/pay/isInvoice",if_already);
        }else{
            $(this).attr("src","../img/icon-index-ask-anonymous unchecked.png")
        }
    });
    //购买按钮点击
    $("body").on("click",".xxgwk-buy",function(){
        var originalPrice=$(this).attr("data-originalPrice"),
            currentPrice=$(this).attr("data-currentPrice"),
            cardStyle=$(this).attr("data-cardStyle"),
            uuid=$(this).attr("data-uuid"),invoiceStatus;
        if($(this).prev(".xxgwk-fp").children(".need_fp").attr("src")=="../img/icon-index-ask-anonymous unchecked.png"){
            invoiceStatus=0;
        }else{
            invoiceStatus=1;
        }
        //window.location.href="watch-pay.html?vip_id="+uuid+"&&price="+originalPrice+"&&originalPrice="+originalPrice+"&&currentPrice="+currentPrice+"&&cardStyle="+cardStyle+"&&invoiceStatus="+invoiceStatus;
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fvip_id%3d"+uuid+"%26%26price%3d"+originalPrice+"%26%26originalPrice%3d"+originalPrice+"%26%26currentPrice%3d"+currentPrice+"%26%26cardStyle%3d"+cardStyle+"%26%26invoiceStatus%3d"+invoiceStatus+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
    })
});