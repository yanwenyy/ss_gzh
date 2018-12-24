$(function(){
    //获取积分信息
    function get_grade(data){
        console.log(data);
        //用户等级
        var score_img=get_score(data.data.integralSum,data.data.aision,data.data.vip);
        $(".grade_img").attr("src",score_img);
        $(".m-jf-num").html(data.data.integralSum);
        $(".regist").html(data.data.regist);
        $(".question").html(data.data.question);
        $(".adop").html(data.data.adop);
        $(".secretly").html(data.data.secretly);
        $(".complete").html(data.data.complete);
        $(".video").html(data.data.video);
        $(".recharge").html(data.data.recharge);
    }
    ajax_nodata(http_url.url+"/integral/user/integral",get_grade);
});