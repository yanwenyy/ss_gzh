//分页常量
var count_start=1,count_end=10,num=1,scroll_status=true;
//接口变量
const http_url={
    formal_url:"https://api.jieshuibao.com/",//正式
    test_url:"http://test.jieshuibao.com/jsb_webserver/",//测试
    url:"http://test.jieshuibao.com/jsb_webserver/"
};
//微信回调公共变量
const wx_hd_url={
    formal_url:"appid=wx64eaa52e2ff9ec97&redirect_uri=https%3a%2f%2fapi.jieshuibao.com",
    test_url:"appid=wx57543e0ae2e282e9&redirect_uri=http%3a%2f%2ftest.jieshuibao.com",
    url:"appid=wx57543e0ae2e282e9&redirect_uri=http%3a%2f%2ftest.jieshuibao.com"
};
//微信分享公共变量
const total_share_url={
    formal_url:"https://api.jieshuibao.com/",
    test_url:"http://test.jieshuibao.com/",
    url:"http://test.jieshuibao.com/"
};
//友盟埋点公共变量
const ym_md={
    formal_url:"cnzz_stat_icon_1275564682",
    test_url:"cnzz_stat_icon_1275561782",
    url:"cnzz_stat_icon_1275564682"
};
//头像路径
var head_src=http_url.url+"showImg/head/";
//问题图片
var question_src=http_url.url+"showImg/question/";
//会员卡图片
var showImg_src=http_url.url+"showImg/card/";
//视频封面图片
var cover_src=http_url.url+"showImg/cover/";
//证件图片
var cert_src=http_url.url+"showImg/cert/";
function ajax(url,data,succ){
    // console.log(url);
    $.ajax({
        type:"POST",
        url:url,
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            "cookieId":sessionStorage.getItem("cookieId")
        },
        data:JSON.stringify(data),
        success:function(data){
            succ(data);
        },
        error:function(){
            console.log("程序出错,请重试");
        }
    })
}
function ajax_nodata(url,succ){
    $.ajax({
        type:"POST",
        url:url,
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            "cookieId":sessionStorage.getItem("cookieId")
        },
        success:function(data){
            succ(data);
        },
        error:function(){
            console.log("程序出错,请重试");
        }
    })
}