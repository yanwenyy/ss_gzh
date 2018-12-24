$(function(){
    var payType=getUrlParms("payType");
    ajax(http_url.url+"/flow/sumRecording",{"sinceId":count_start, "maxId":count_end, "articleType":"all","payType":payType},get_all);
    //scroll_more(http_url.url+"/flow/recording",{"sinceId":count_start, "maxId":count_end, "articleType":"all"},get_all_more);
    $(".csq-header-change>div").click(function(){
        scroll_status=true;
        count_start=1,count_end=10,num=1;
        window.scrollTo(0,0);
        $(".transaction_record_body>ul").html('');
        $(".csq-header-change>div").removeClass("csq-header-change-act");
        $(this).addClass("csq-header-change-act");
        var articleType=$(this).attr("data-name");
        if(articleType=="all"){
            $(".record-money").show();
        }else{
            $(".record-money").hide();
        }
        ajax(http_url.url+"/flow/sumRecording",{"sinceId":count_start, "maxId":count_end, "articleType":articleType,"payType":payType},get_all);
        //scroll_more(http_url.url+"/flow/recording",{"sinceId":count_start, "maxId":count_end, "articleType":articleType},get_all_more)
    });
});
//获取全部的交易记录
function get_all(data){
    console.log(data);
    $(".record-sr").html(parseFloat(data.incomeSum||0.00).toFixed(2));
    $(".record-zc").html(parseFloat(data.outpaySum||0.00).toFixed(2));
    var records=data.records,html="";
    for(var i=0;i<records.length;i++){
        var record_date=format(records[i].paySucTime),tradetype,red,trade_img="",trade_opacity='';
        if(records[i].payType==0){
            trade_img="../img/icon-buy-money.png"
        }else if(records[i].payType==1){
            trade_img="../img/icon-buy-vip.png"
        }else if(records[i].payType==7){
            trade_img="../img/icon-buy-askcard.png"
        }else if(records[i].payType==3){
            trade_img="../img/icon-buy-wechat.png"
        }
        if(trade_img==""){
            trade_opacity="style='opacity:0'"
        }
        if(records[i].tradeType==1){
            tradetype="-";
            red="red";
        }else{
            tradetype="+";
            red="green";
        }
        html+=`
                <li class="box-sizing">
                <div class="inline-block transaction_list_name">
                    <div>
                        ${records[i].goodsType}
                        <img src="${trade_img}" alt="" class="money-from" ${trade_opacity}>
                    </div>
                    <div>
                       ${record_date}
                    </div>
                </div>
                <div class="inline-block transaction_list_money red ${red}">
                    ${tradetype}${parseFloat(records[i].sum).toFixed(2)}元
                </div>
            </li>
            `;
        // if($(".money-from").attr("src")==""){
        //     $(".money-from").attr("style","opacity:0;")
        // }
    }
    $(".transaction_record_body>ul").html(html);
}
function get_all_more(data){
    console.log(data);
    var records=data.records,html="";
    if(records!=""){
        for(var i=0;i<records.length;i++){
            var record_date=format(records[i].paySucTime),tradetype,red,trade_img="",trade_opacity='';
            if(records[i].payType==0){
                trade_img="../img/icon-buy-money.png"
            }else if(records[i].payType==1){
                trade_img="../img/icon-buy-vip.png"
            }else if(records[i].payType==7){
                trade_img="../img/icon-buy-askcard.png"
            }else if(records[i].payType==3){
                trade_img="../img/icon-buy-wechat.png"
            }
            if(trade_img==""){
                trade_opacity="style='opacity:0'"
            }
            if(records[i].tradeType==1){
                tradetype="-";
                red="red";
            }else{
                tradetype="+";
                red="green";
            }
            html+=`
                <li class="box-sizing">
                <div class="inline-block transaction_list_name">
                    <div>
                        ${records[i].goodsType}
                        <img src="${trade_img}" alt="" class="money-from" ${trade_opacity}>
                    </div>
                    <div>
                       ${record_date}
                    </div>
                </div>
                <div class="inline-block transaction_list_money red ${red}">
                    ${tradetype}${parseFloat(records[i].sum).toFixed(2)}元
                </div>
            </li>
            `;
            // if($(".money-from").attr("src")==""){
            //     $(".money-from").attr("style","opacity:0;")
            // }
        }
        $(".transaction_record_body>ul").append(html);
    }else{
        scroll_status=false;
        $(".msg-loading").hide();
    }
}