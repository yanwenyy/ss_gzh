$(function(){
    var price=getUrlParms("price");
    $(".zf_money").html(price);
    //微信接口配置
    var path_url=encodeURIComponent(location.href.split('#')[0]);
    $.ajax({
        type:"POST",
        url:http_url.url+"/wx/createJsapiSignature?url="+path_url,
        success:function(data){
            console.log(data.datum);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.datum.appid, // 必填，公众号的唯一标识
                timestamp:data.datum.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.datum.noncestr, // 必填，生成签名的随机串
                signature: data.datum.signature,// 必填，签名
                jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
            });
        },
        error:function(){
            alert("程序出错,请重试")
        }
    });
    //微信支付
    function pay_wx(data){
        console.log(data);
        if(data.code==1){
            wx.chooseWXPay({
                timestamp: data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.data.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    alert("支付成功");
                    window.location.href="../html/watch-anwser.html?cwatch_id="+watch_id+"&newuser=yes";
                }
            });
        }else{
            alert(data.des)
        }
    };
    $(".ok-btn").on("click",function(e){
        e.preventDefault();
        var payType=$(".zf-select").attr("data-type");
        if(payType=="weixin"){
            ajax(http_url.url+"/pay/buyCard",{"uuid":uuid,"source":1,"payType":payType,"originalPrice":originalPrice, "currentPrice":currentPrice,"invoiceStatus":0,"cardStyle":cardStyle,"code":code},pay_wx);
        }
    })
});