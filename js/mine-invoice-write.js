$(function(){
    var uuid=getUrlParms("uuid");
    //发票信息回显
    function get_invoice(data){
        console.log(data);
        var invoice=data.invoice;
        $("#invoice-class").val(invoice.taxType);
        $("#company-headup-invoice").val(invoice.companyName);
        $("#company-tax-number-invoice").val(invoice.taxNum);
        $("#addressee-invoice").val(invoice.receiverName);
        $("#phonenumber-invioce").val(invoice.receiverPhoneNum);
        $("#detail-address-invioce").val(invoice.address);
        $("#opening-bank-invioce").val(invoice.accountBank);
        $("#bankcard-invioce").val(invoice.accountNumber);
        $("#company-phone-invioce").val(invoice.companyTell);
        $("#company-address-invioce").val(invoice.companyAddress);
        $("#email-invioce").val(invoice.email);
    }
    ajax_nodata(http_url.url+"/pay/editInvoice",get_invoice);
    // //发票类别
    // $("#invoice-class").select({
    //     items: ["增值税电子普通发票", "增值税专用发票"],
    //     onClose:function(){
    //         // alert(11)
    //     }
    // });
    $("#invoice-class").bind("change",function(){
        var msg=$(this).val();
        if(msg=="增值税电子普通发票"){
            $(".special-purpose").addClass("out")
        }else{
            $(".special-purpose").removeClass("out")
        }
    });
    function sub_invoice(data){
        console.log(data);
        if(data.code==1){
            alert(data.des);
            window.location.href="mine-invoice.html"
        }else{
            alert(data.des);
        }
    }
    //提交按钮点击
    $(".release").click(function(){
       var taxType=$("#invoice-class").val(),
           companyName=$("#company-headup-invoice").val(),
           taxNum=$("#company-tax-number-invoice").val(),
           receiverName=$("#addressee-invoice").val(),
           receiverPhoneNum=$("#phonenumber-invioce").val(),
           address=$("#detail-address-invioce").val(),
           accountBank=$("#opening-bank-invioce").val(),
           accountNumber=$("#bankcard-invioce").val(),
           companyTell=$("#company-phone-invioce").val(),
           email=$("#email-invioce").val(),
           companyAddress=$("#company-address-invioce").val();
           ajax(http_url.url+"/pay/addInvoice",{
               "companyName":companyName,
               "receiverName":receiverName,
               "receiverPhoneNum":receiverPhoneNum,
               "address":address,
               "taxNum":taxNum,
               "taxType":taxType,
               "accountBank":accountBank,
               "accountNumber":accountNumber,
               "companyTell":companyTell,
               "companyAddress":companyAddress,
               "email":email,
               "uuid":uuid
           },sub_invoice);
    })
});