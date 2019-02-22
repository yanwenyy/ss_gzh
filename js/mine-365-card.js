$(function(){
    var open=getUrlParms("open");
    if(open!=''&&open!=null){
        $(".card-365-footer-two>span").html("立即开通");
    }else{
        $(".card-365-footer-two>span").html("立即续费");
        $(".card-365-show-open").addClass("out");
        $(".card-365-show-date").removeClass("out");
    }
});