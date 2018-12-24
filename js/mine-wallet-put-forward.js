$(function(){
    function get_money(data){
        console.log(data);
        $(".mine-wx-money").html(parseFloat(data.balance).toFixed(2)||"0.0");
    }
    ajax_nodata(http_url.url+"/user/sectionMessage",get_money);
    //全部提现点击
    $(".tx-all-btn").click(function(){
        var money=$(".mine-wx-money").html();
        $(".tx-money").val(money);
    });
    //提现按钮点击
    $(".put-forward-btn").click(function(){
        var money= $(".tx-money").val();
        function get_money(data){
            if(data.code==1){
                alert(data.des);
                window.location.href="../html/mine-wallet.html";
            }else{
                alert(data.des);
            }
        }
        ajax(http_url.url+"/wx/wp/withdraw",{"money":money},get_money);
    })
});