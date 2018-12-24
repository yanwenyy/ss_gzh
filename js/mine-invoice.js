$(function(){
    $(".back").click(function(){
        window.location.href="index-mine.html";
    });
    //发票列表
    function get_invoice_list(data){
        console.log(data);
        var purchaseOrders=data.purchaseOrders,html="";
        if(purchaseOrders==""){
            $(".none-msg").show();
        }
        for(var i=0;i<purchaseOrders.length;i++){
            var invoice_sta="",invoice_blue="";
            if(purchaseOrders[i].invoiceStatus=="-1"){
                invoice_sta="开发票";
                invoice_blue="open-invoice-btn_blue";
            }else if(purchaseOrders[i].invoiceStatus=="0"){
                invoice_sta="开发票中"
            }else{
                invoice_sta="已开发票"
            }
            // html+=`
            //     <div class="box-sizing invoice-list">
            //         <div>${purchaseOrders[i].productType}</div>
            //         <div><span class="red">${parseFloat(purchaseOrders[i].currentPrice).toFixed(2)}</span>元</div>
            //         <div>${format(purchaseOrders[i].paymentDate)}</div>
            //         <div class="open-invoice-btn" data-uuid="${purchaseOrders[i].uuid}">${invoice_sta}</div>
            //     </div>
            // `;
            html+=`
                <div class="box-sizing invoice-list">
                    <div><span>${purchaseOrders[i].productType}</span><span style="margin-right: 3.2rem">${parseFloat(purchaseOrders[i].currentPrice).toFixed(2)}元</span></div>
                    <div class="inline-block"></div>
                    <div>${format(purchaseOrders[i].paymentDate)}</div>
                    <div class="open-invoice-btn ${invoice_blue}" data-uuid="${purchaseOrders[i].uuid}">${invoice_sta}</div>
                </div>
            `;
        }
        $(".invoice-list-body").html(html);
    }
    function get_invoice_list_more(data){
        var purchaseOrders=data.purchaseOrders,html="";
        if(purchaseOrders!=""){
            for(var i=0;i<purchaseOrders.length;i++){
                var invoice_sta="",invoice_blue="";
                if(purchaseOrders[i].invoiceStatus=="-1"){
                    invoice_sta="开发票";
                    invoice_blue="open-invoice-btn_blue";
                }else if(purchaseOrders[i].invoiceStatus=="0"){
                    invoice_sta="开发票中"
                }else{
                    invoice_sta="已开发票"
                }
                html+=`
                <div class="box-sizing invoice-list">
                    <div><span>${purchaseOrders[i].productType}</span><span style="margin-right: 3.2rem">${parseFloat(purchaseOrders[i].currentPrice).toFixed(2)}元</span></div>
                    <div class="inline-block"></div>
                    <div>${format(purchaseOrders[i].paymentDate)}</div>
                    <div class="open-invoice-btn ${invoice_blue}" data-uuid="${purchaseOrders[i].uuid}">${invoice_sta}</div>
                </div>
            `;
            }
            $(".invoice-list-body").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/pay/purchaseOrder",{"sinceId":count_start,"maxId":count_end},get_invoice_list);
    scroll_more(http_url.url+"/pay/purchaseOrder",{"sinceId":count_start,"maxId":count_end},get_invoice_list_more);
    $("body").on("click",".open-invoice-btn",function(){
          var msg=$(this).html();
          if(msg=="开发票"){
              window.location.href="mine-invoice-write.html?uuid="+$(this).attr("data-uuid");
          }else{
              alert(msg)
          }
    });
    //编辑发票信息
    $(".release").click(function(){
        window.location.href="mine-invoice-write.html";
    })
});