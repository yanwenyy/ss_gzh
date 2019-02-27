$(function(){
    var price=getUrlParms("price"),
        videoId=getUrlParms("videoId"),
        watch_id=getUrlParms("watch_id"),
        vip_id=getUrlParms("vip_id"),
        qeus=getUrlParms("qeus"),
        code=getUrlParms("code"),
        card_365=getUrlParms("card_365");
    $(".zf_money").html(price);
    //余额显示
    function show_ye(data){
        // console.log(data);
        $(".qb").html(parseFloat(data.balance).toFixed(2));
        $(".xxgwk").html(parseFloat(data.vipBalance).toFixed(2));
        $(".cswdk").html(parseFloat(data.qacardBlance).toFixed(2));
    }
    ajax_nodata(http_url.url+"/user/message",show_ye);
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
    $(".pay_money-num").html(parseFloat(price).toFixed(2));
    //支付视频
    if(videoId!=""&&videoId!=null&&videoId!=undefined){
        $(".pay_name").html("视频金额支付");
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
                        function get_vid(data){
                            vid=data.data.vid;
                            window.location.href="../html/video.html?vid="+vid+"&&spid="+videoId;
                        }
                        ajax(http_url.url+"/video/vid",{"id":videoId},get_vid);
                    }
                });
            }else{
                alert(data.des)
            }
        }
        //钱包&&问答卡支付
        function pay_card(data){
            console.log(data);
            if(data.code==1){
                alert("支付成功");
                function get_vid(data){
                    vid=data.data.vid;
                    window.location.href="../html/video.html?vid="+vid+"&&spid="+videoId;
                }
                ajax(http_url.url+"/video/vid",{"id":videoId},get_vid);
            }else{
                alert(data.des);
            }
        }
        $(".ok-btn").on("click",function(e){
            e.preventDefault();
            var payType=$(".zf-select").attr("data-type");
                if(payType=="weixin"){
                    ajax(http_url.url+"/video/buy",{"videoId":videoId, "payType":payType, "money":price,"source":1,"code":code},pay_wx);
                }else{
                    ajax(http_url.url+"/video/buy",{"videoId":videoId, "payType":payType, "money":price,"source":1,"code":code},pay_card);
                }
        })
    }
    //围观支付
    if(watch_id!=""&&watch_id!=null&&watch_id!=undefined){
        $(".pay_name").html("围观金额支付");
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
        }
        //钱包&&问答卡支付
        function pay_card(data){
            console.log(data);
            if(data.code==1){
                alert("支付成功");
                window.location.href="../html/watch-anwser.html?cwatch_id="+watch_id+"&newuser=yes";
            }else{
                alert(data.des);
            }
        }
        $(".ok-btn").on("click",function(e){
            e.preventDefault();
            var payType=$(".zf-select").attr("data-type");
            if(payType=="weixin"){
                ajax(http_url.url+"/onlook/look/buy",{"uuid":watch_id, "payType":payType,"source":"1", "money":price,"code":code},pay_wx);
            }else{
                ajax(http_url.url+"/onlook/look/buy",{"uuid":watch_id, "payType":payType,"source":"1",  "money":price,"code":code},pay_card);
            }
        })
    }
    //会员卡支付
    if(vip_id!=""&&vip_id!=null&&vip_id!=undefined){
        $(".pay_name").html("学习顾问卡金额支付");
        var originalPrice=getUrlParms("originalPrice"),
            currentPrice=getUrlParms("currentPrice"),
            cardStyle=getUrlParms("cardStyle"),
            invoiceStatus=getUrlParms("invoiceStatus");
        $(".VipBalance_pay").hide();
        $(".balance_pay").hide();
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
                        window.location.href="../html/mine-learning-consultant-card.html";
                    }
                });
            }else{
                alert(data.des)
            }
        }
        //钱包&&问答卡支付
        function pay_card(data){
            console.log(data);
            if(data.code==1){
                alert("支付成功");
                window.location.href="../html/mine-learning-consultant-card.html";
            }else{
                alert(data.des);
            }
        }
        $(".ok-btn").on("click",function(e){
            e.preventDefault();
            var payType=$(".zf-select").attr("data-type");
                if(payType=="weixin"){
                    ajax(http_url.url+"/pay/buyCard",{"uuid":vip_id,"source":1,"payType":payType,"originalPrice":originalPrice, "currentPrice":currentPrice,"invoiceStatus":invoiceStatus,"cardStyle":cardStyle,"code":code},pay_wx);
                }else{
                        ajax(http_url.url+"/pay/buyCard",{"uuid":vip_id,"source":1, "payType":payType,"originalPrice":originalPrice,  "currentPrice":currentPrice,"invoiceStatus":invoiceStatus,"cardStyle":cardStyle,"code":code},pay_card);
                }
        })
    }
    //快速问支付
    if(qeus!=""&&qeus!=null&&qeus!=undefined){
        $(".back").click(function(){
            window.location.href="../html/free-question.html?msg=2";
        });
        var ques=sessionStorage.getItem("ques");
        ques=JSON.parse(ques);
        // console.log(ques);
        //类似问题
        ajax(http_url.url+"/onlook/serarch",{
            "sinceId":count_start,
            "maxId":count_end,
            "content":ques.content
        },function(data){
            console.log(data);
            if(data.data!=""){
                $(".similar_answer").show();
                var articles=data.data,html='';
                for(var i=0;i<articles.length;i++){
                    var atc_title;
                    if(articles[i].content.length>40){
                        atc_title=articles[i].content.substr(0,40)+"..."
                    }else{
                        atc_title=articles[i].content;
                    }
                    html+=`
                    <li  data-id='${articles[i].uuid}' data-status="${articles[i].status}">
                        ${atc_title}
                        <div class="watch-search-footer">
                            <div class="inline-block">${format(articles[i].date)}</div>
                            <div class="inline-block"><span>点赞: ${articles[i].approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${articles[i].lookNum}</span></div>
                        </div>
                    </li>
                    `
                }
                $(".wacth-search-list>ul").html(html);
            }
        });
        scroll_more(http_url.url+"/onlook/serarch",{
            "sinceId":count_start,
            "maxId":count_end,
            "content":ques.content
        },function(data){
            console.log(data);
            if(data.data!=""&&data.data!=null){
                $(".similar_answer").show();
                var articles=data.data,html='';
                for(var i=0;i<articles.length;i++){
                    var atc_title;
                    if(articles[i].content.length>40){
                        atc_title=articles[i].content.substr(0,40)+"..."
                    }else{
                        atc_title=articles[i].content;
                    }
                    html+=`
                    <li  data-id='${articles[i].uuid}' data-status="${articles[i].status}">
                        ${atc_title}
                        <div class="watch-search-footer">
                            <div class="inline-block">${format(articles[i].date)}</div>
                            <div class="inline-block"><span>点赞: ${articles[i].approveNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>围观: ${articles[i].lookNum}</span></div>
                        </div>
                    </li>
                    `
                }
                $(".wacth-search-list>ul").append(html);
            }else{
                scroll_status=false;
                $(".msg-loading").hide();
            }
        });
        //快速问推荐点击
        $("body").on("click",".wacth-search-list li",function(){
            var cwatch_id=$(this).attr("data-id");
            //微信授权
            function cwatch_jurisdiction(data){
                console.log(data);
                if(data.isBuy==1){//未购买
                    window.location.href="../html/cwatch.html?cwatch_id="+cwatch_id;
                }else if(data.isBuy==0){//已围观
                    window.location.href="../html/watch-anwser.html?cwatch_id="+cwatch_id;
                }
            }
            ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+cwatch_id,cwatch_jurisdiction);
        });
        $(".QACardBalance_pay").show();
        $(".pay_name").html("快速问金额支付");
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
                        window.location.href="../html/index.html";
                    }
                });
            }else{
                alert(data.des)
            }
        }
        //钱包&&问答卡支付
        function pay_card(data){
            console.log(data);
            if(data.code==1){
                alert(data.des);
                window.location.href="../html/index.html";
            }else{
                alert(data.des);
            }
        }
        $(".ok-btn").on("click",function(e){
            e.preventDefault();
            var payType=$(".zf-select").attr("data-type");
                if(payType=="weixin"){
                    ajax(http_url.url+"/question/releaseQuestion",{"content":ques.content,"source":1,"payType":payType,"originalPrice":originalPrice, "money":price,"trade":ques.trade,"isAnon":ques.isAnon,"images":ques.images,"code":code},pay_wx);
                }else{
                        ajax(http_url.url+"/question/releaseQuestion",{"content":ques.content,"source":1, "payType":payType,"originalPrice":originalPrice,  "money":price,"trade":ques.trade,"isAnon":ques.isAnon,"images":ques.images,"code":sessionStorage.getItem("code")},pay_card);
                }
        })
    };
    //365卡购买
    if(card_365!=''&&card_365!=null&&card_365!=undefined){
        $(".pay_name").html("365会员卡支付");
        $(".balance_pay").hide();
        $(".VipBalance_pay").hide();
        $(".QACardBalance_pay").hide();
        var uuid=getUrlParms('uuid'),
            originalPrice=getUrlParms("originalPrice"),
            currentPrice=getUrlParms("currentPrice"),
            cardStyle=getUrlParms("cardStyle"),
            invoiceStatus=getUrlParms("invoiceStatus");
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
                        window.location.href="../html/index-mine-365.html";
                    }
                });
            }else{
                alert(data.des)
            }
        }
        $(".ok-btn").on("click",function(e){
            e.preventDefault();
            var payType=$(".zf-select").attr("data-type");
            if(payType=="weixin"){
                ajax(http_url.url+"/pay/buyCard",{"uuid":uuid,"source":1,"payType":payType,"originalPrice":originalPrice, "currentPrice":currentPrice,"invoiceStatus":0,"cardStyle":cardStyle,"code":code},pay_wx);
            }
        })
    }
    //支付选择点击
    $(".more-img").click(function(){
        $(".more-img").removeClass("zf-select").attr("src","../img/wacth-pay-nochage.png");
        $(this).addClass("zf-select").attr("src","../img/wacth-pay-chage.png");
    });
    $(".cancel-btn").click(function(){
        $(".zf_model").hide();
    });
    $(".pay_btn").on("click",function(e){
        var payType=$(".zf-select").attr("data-type");
        if(payType){
            $(".zf_model").show();
        }else{
            alert("请选择支付方式");
        }
    });
});