//屏蔽手机自带返回键
$(document).ready(function() {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
});
$(function(){
    //微课搜索
    $(".wk-search").click(function(){
        window.location.href="wk-search.html"
    });
    // 微课列表
    function get_wk(data){
        console.log(data);
        var videos=data.videos,html='';
        for(var i=0;i<videos.length;i++){
            if(videos[i].title.length>20){
                var sp_title,buy_price,already_buy,sp_yigou;
                sp_title=videos[i].title.substr(0,20)+"...";
            }else{
                sp_title=videos[i].title
            }
            if(videos[i].ifBuy==1){
                buy_price="out";
                already_buy="";
                sp_yigou="sp_yigou"
            }else{
                already_buy="out";
                sp_yigou="";
                buy_price="";
            }
            var price='';
            if(videos[i].price==0){
                price="限时免费"
            }else{
                price="¥"+parseFloat(videos[i].price).toFixed(2);
            }
            html+=`<div class="inline-block dkft_list ${sp_yigou}" data-id="${videos[i].id}" data-price="${videos[i].price}">
                    <img src="${cover_src+videos[i].image}" alt="" onerror=src="../img/ceshi.jpg">
                    <div>${sp_title}</div>
                    <div class="red ${buy_price}">${price}</div>
                    <div class="red ${already_buy}">已购买</div>
                </div>`;
        }
        $(".wk-list").html(html);
    }
    function get_wk_more(data){
        //console.log(data);
        var videos=data.videos,html='';
        if(videos!=""){
            for(var i=0;i<videos.length;i++){
                if(videos[i].title.length>20){
                    var sp_title,buy_price,already_buy,sp_yigou;
                    sp_title=videos[i].title.substr(0,20)+"...";
                }else{
                    sp_title=videos[i].title
                }
                if(videos[i].ifBuy==1){
                    buy_price="out";
                    sp_yigou="sp_yigou"
                }else{
                    already_buy="out";
                    sp_yigou="";
                }
                var price='';
                if(videos[i].price==0){
                    price="限时免费"
                }else{
                    price="¥"+parseFloat(videos[i].price).toFixed(2);
                }
                html+=`<div class="inline-block dkft_list ${sp_yigou}" data-id="${videos[i].id}"  data-price="${videos[i].price}">
                    <img src="${cover_src+videos[i].image}" alt="" onerror=src="../img/ceshi.jpg">
                    <div>${sp_title}</div>
                    <div class="red ${buy_price}">${price}</div>
                    <div class="red ${already_buy}">已购买</div>
                </div>`;
            }
            $(".msg-loading").hide();
            $(".wk-list").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0},get_wk);
    scroll_more(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0},get_wk_more);
    //视频点击
    $("body").on("click",".wk-list>div",function(){
        var videoId=$(this).attr("data-id"),
            price=$(this).attr("data-price"),vid;
        var that=$(this);
        //判断是否购买过
        function get_vid(data){
            vid=data.data.vid;
            if(vid!=""&&vid!=null){
                console.log("已购买");
                window.location.href="../html/video.html?vid="+vid;
            }else{
                console.log("未购买");
                //window.location.href="../html/watch-pay.html?videoId="+videoId+"&&price="+price;
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?"+wx_hd_url.url+"%2fjsb_weixin%2fhtml%2fwatch-pay.html%3fvideoId%3d"+videoId+"%26%26price%3d"+price+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
            }
        }
        ajax(http_url.url+"/video/vid",{"id":videoId},get_vid);
    });
    //行业,税种,专题
    function get_select(data){
        console.log(data);
        var industry_html='<li>全部</li>',category_html='<li>全部</li>',special_html='<li>全部</li>';
        var categorys=data.categorys,
            industry="",
            category="",
            special="";
        for(var p=0;p<categorys.length;p++){
            if(categorys[p].name=="专题"){
                special=categorys[p].children;
            }else if(categorys[p].name=="税种"){
                category=categorys[p].children;
            }else if(categorys[p].name=="行业"){
                industry=categorys[p].children;
            }
        }
        for(var i=0;i<industry.length;i++){
            industry_html+=`
                <li data-uuid="${industry[i].uuid}">${industry[i].name}</li>
            `;
        }
        for(var j=0;j<category.length;j++){
            category_html+=`
                <li data-uuid="${category[j].uuid}">${category[j].name}</li>
            `;
        }
        for(var k=0;k<special.length;k++){
            special_html+=`
                <li data-uuid="${special[k].uuid}">${special[k].name}</li>
            `;
        }
        $(".hy-ul").html(industry_html);
        $(".sz-ul").html(category_html);
        $(".zt-ul").html(special_html);
    };
    ajax_nodata(http_url.url+"/category/tree",get_select);
    //微课导航栏切换
    $("body").on("click",".wk-head-sel>div",function(){
        var code=$(this).attr("data-code");
        if(code==1){//行业
            $(".wk-head-opt ul").hide();
            $(".hy-ul").show();
        }else if(code==2){//税种
            $(".wk-head-opt ul").hide();
            $(".sz-ul").show();
        }else if(code==3){//专题
            $(".wk-head-opt ul").hide();
            $(".zt-ul").show();
        }
        $(".wk-head-sel>div").not($(this)).children("img").attr("src","../img/down.png");
        if( $(this).children("img").attr("src")=="../img/down.png"){
            $(this).children("img").attr("src","../img/up.png").addClass("wk-head-sel-up");
            $(".wk-head-opt").show();
        }else{
            $(this).children("img").attr("src","../img/down.png").removeClass("wk-head-sel-up");
            $(".wk-head-opt").hide();
        }
        $(".wk-head-sel>div").removeClass("wk_sel_act");
        $(this).addClass("wk_sel_act");
    });
    //微课head li点击
    $("body").on("click",".wk-head-opt li",function(){
        count_start=1,count_end=10;
        var code=$(".wk_sel_act").attr("data-code");
        var uuid=$(this).attr("data-uuid");
        if(code==1){//行业
            if($(this).html()=="全部"){
                $(".wk-zt").html("专题");
                $(".wk-sz").html("税种");
                $(".wk-hy").html("行业");
            }else{
                $(".wk-zt").html("专题");
                $(".wk-sz").html("税种");
                $(".wk-hy").html($(this).html());
            }
            ajax(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0,"trade":uuid},get_wk);
            scroll_more(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0,"trade":uuid},get_wk_more)
        }else if(code==2){//税种
            if($(this).html()=="全部"){
                $(".wk-zt").html("专题");
                $(".wk-sz").html("税种");
                $(".wk-hy").html("行业");
            }else{
                $(".wk-hy").html("行业");
                $(".wk-zt").html("专题");
                $(".wk-sz").html($(this).html());
            }

            ajax(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0,"tax":uuid},get_wk);
            scroll_more(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0,"tax":uuid},get_wk_more)
        }else if(code==3){//专题
            if($(this).html()=="全部"){
                $(".wk-zt").html("专题");
                $(".wk-sz").html("税种");
                $(".wk-hy").html("行业");
            }else{
                $(".wk-hy").html("行业");
                $(".wk-sz").html("税种");
                $(".wk-zt").html($(this).html());
            }
            ajax(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0,"topic":uuid},get_wk);
            scroll_more(http_url.url+"/video/search",{"sinceId":count_start,"maxId":count_end,"type":0,"topic":uuid},get_wk_more)
        }
        $(".wk-head-sel>div").children("img").attr("src","../img/down.png");
        $(".wk-head-opt").hide();
    });
});