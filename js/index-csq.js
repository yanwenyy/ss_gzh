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
    var csq_head=sessionStorage.getItem("csq_head");
    var hot_msg;
    var csq_url='';
    if(csq_head){
        if(csq_head=="hot"){
            count_start=1;count_end=10;num=1;
            $(".csq-head-hot").addClass("csq-header-change-act");
            $(".csq-head-new").removeClass("csq-header-change-act");
            //最热
            ajax(http_url.url+'article/condition',{"articleType":"hot","sinceId":count_start,"maxId":count_end},get_article);
        }else{
            count_start=1;count_end=10;num=1;
            $(".csq-head-new").addClass("csq-header-change-act");
            $(".csq-head-hot").removeClass("csq-header-change-act");
            //最新
            ajax(http_url.url+'article/all',{"sinceId":count_start,"maxId":count_end},get_article);
        }
    }else{
        //最新
        ajax(http_url.url+'article/all',{"sinceId":count_start,"maxId":count_end},get_article);
    }
    //用户信息
    function get_user(data){
        if(data.role==1){
            $(".release2").hide();
        }else if(data.role==2){
            $(".release2").show();
        }
    }
    ajax_nodata(http_url.url+"/user/message",get_user);
    //财税圈header切换
    $(".csq-header-change>div").click(function(){
        var that=$(this);
        $(".csq-tab-list").html('');
        $(".csq-header-change>div").removeClass("csq-header-change-act");
        $(this).addClass("csq-header-change-act");
        sessionStorage.setItem("csq_head",$(this).attr("data-name"));
        scroll_status=true;
       count_start=1;count_end=10;num=1;
        window.scrollTo(0,0);
        if(that.attr("data-name")=="new"){
            //最新
            ajax(http_url.url+'article/all',{"sinceId":count_start,"maxId":count_end},get_article);
                //最新滚动加载
            csq_url="article/all";
            //scroll_more(http_url.url+'article/all',{"sinceId":count_start,"maxId":count_end},get_article_more);
        }else if(that.attr("data-name")=="hot"){
            //最热
            ajax(http_url.url+'article/condition',{"articleType":"hot","sinceId":count_start,"maxId":count_end},get_article);
            //最热滚动加载
            csq_url="article/condition";
            //scroll_more(http_url.url+'article/condition',{"articleType":"hot","sinceId":count_start,"maxId":count_end},get_article_more);
        }
    });

    //财税圈list点击
    $("body").on("click",".csq-tab-list>div .clist-msg",function(){
        var csq_id=$(this).attr("data-id");
        //console.log(data_detail);
        window.location.href="../html/csq_detail.html?csq_id="+csq_id;
    });
    $("body").on("click",".csq-tab-list>div .wz-da",function(){
        var csq_id=$(this).parent().attr("data-id");
        window.location.href="../html/csq_detail.html?csq_id="+csq_id;
    });
    function get_lunbo(data){
        //console.log(data);
        if(data.code!=1&&data.code!=2){
            alert(data.des);
            return;
        }
        var rotations=data.rotations,rotationImageUrl=data.rotationImageUrl;
        var html='';
        for(var i=0;i<rotations.length;i++){
            html+='<div class="swiper-slide"><a href="'+rotations[i].imageLink+'"><img src="'+http_url.url+rotationImageUrl+rotations[i].image+'" data-id="'+rotations[i].uuid+'" data-name="'+rotations[i].image+' alt=""></a></div>'
        }
        $(".s2>.swiper-wrapper").html(html);
    }
    ajax_nodata(http_url.url+'/rotation/article',get_lunbo);
    //财税圈热点聚焦点击
    $("body").on("click",".rd-look-btn",function(){
        var csq_rdju=$(this).attr("data-id");
        var csq_name=$(this).html();
        window.location.href=encodeURI(encodeURI("../html/csq-hot-focus.html?csq_id="+csq_rdju+"&&csq_name="+csq_name));
    });
    //发布文章点击
    $(".release2").click(function(){
        window.location.href="csq-release-article.html"
    });
});
//文章列表
function get_article(data){
    console.log(data);
    if(data.code!=1&&data.code!=2){
        alert(data.des);
        return;
    }
    var articles=data.articles,role,phone,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
    for(var i=0;i<articles.length;i++){
        createDate=format(articles[i].createDate);
        if(articles[i].userLevel!=null){
            user_img=headimage(articles[i].userLevel.headImage);
            user_name=get_name(articles[i].userLevel);
            user_role=articles[i].userLevel.levelName;
            user_counselorDuty=articles[i].userLevel.counselorDuty;
            role=articles[i].userLevel.role;
            phone=articles[i].userLevel.phoneNumber;
        }else{
            user_img="";
            user_name='匿名用户';
            user_role='';
            user_counselorDuty='';
        }
        if(articles[i].top==1){
            zd_img="../img/icon-article-top.png"
        }else{
            zd_img='';
        }
        var description='';
        if(articles[i].description.length>120){
            description=articles[i].description.substr(0,120)+"...";
        }else{
            description=articles[i].description;
        }
        var title='';
        if(articles[i].title.length>45){
            title=articles[i].title.substr(0,45)+"...";
        }else{
            title=articles[i].title;
        }
        html+=`<div data-id="${articles[i].uuid}">
                        <div class="grwz card-list zx-list">
                            <div class="box-sizing watch-answer-expert">
                            <div class="clist-head">
                                <img src="${user_img}" alt=""  onerror=src="../img/user.png" class="look-hp-image" data-role="${role}" data-phone="${phone}">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${user_name}
                                        <div class="inline-block zxs-grade">
                                            <img src="../img/icon-expert icon.png" alt="">
                                            ${user_role||""}
                                        </div>
                                    </div>
                                    <div class="zx-detail-date">${user_counselorDuty}</div>
                                </div>
                            </div>
                            <div class="clist-msg"  data-id="${articles[i].uuid}">
                                ${title}
                            </div>
                        </div>
                        </div>
                        <div class="wz-da box-sizing">
                            ${description}
                        </div>
                        <div class="clist-foot export-foot">
                            <div class="rd-look rd-look-btn" data-id="${articles[i].category.uuid}">
                                ${articles[i].category.name}
                            </div>
                            <div>${createDate}</div>
                            <div>
                                <div class="inline-block">点赞 <span class="blue">${articles[i].approveNum}</span></div>
                                <div class="inline-block">评论 <span class="orange">${articles[i].discussNum}</span></div>
                            </div>
                        </div>
                        <div class="csq-wz-zd">
                            <img src="${zd_img}" alt="">
                        </div>
                    </div>`;
    }
    $(".csq-tab-list").html(html);
    csq_url=null;
}
function get_article_more(data){
    console.log(data);
    if(data.code!=1&&data.code!=2){
        alert(data.des);
        return;
    }
    var articles=data.articles,zd_img,role,phone,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
    if(articles!=""){
        for(var i=0;i<articles.length;i++){
            createDate=format(articles[i].createDate);

            if(articles[i].userLevel!=null){
                user_img=headimage(articles[i].userLevel.headImage);
                user_name=get_name(articles[i].userLevel);
                user_role=articles[i].userLevel.levelName;
                user_counselorDuty=articles[i].userLevel.counselorDuty;
                role=articles[i].userLevel.role;
                phone=articles[i].userLevel.phoneNumber;
            }else{
                user_img="";
                user_name='匿名用户';
                user_role='';
                user_counselorDuty='';
            }
            if(articles[i].top==1){
                zd_img="../img/icon-article-top.png"
            }else{
                zd_img='';
            }
            var description='';
            if(articles[i].description.length>120){
                description=articles[i].description.substr(0,120)+"...";
            }else{
                description=articles[i].description;
            }
            var title='';
            if(articles[i].title.length>45){
                title=articles[i].title.substr(0,45)+"...";
            }else{
                title=articles[i].title;
            }
            html+=`<div data-id="${articles[i].uuid}">
                        <div class="grwz card-list zx-list">
                            <div class="box-sizing watch-answer-expert">
                            <div class="clist-head">
                                <img src="${user_img}" alt=""  onerror=src="../img/user.png"  class="look-hp-image" data-role="${role}" data-phone="${phone}">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${user_name}
                                        <div class="inline-block zxs-grade">
                                            <img src="../img/icon-expert icon.png" alt="">
                                            ${user_role||""}
                                        </div>
                                    </div>
                                    <div class="zx-detail-date">${user_counselorDuty}</div>
                                </div>
                            </div>
                            <div class="clist-msg"  data-id="${articles[i].uuid}">
                                ${title}
                            </div>
                        </div>
                        </div>
                        <div class="wz-da box-sizing">
                            ${description}
                        </div>
                        <div class="clist-foot export-foot">
                            <div class="rd-look rd-look-btn" data-id="${articles[i].category.uuid}">
                                ${articles[i].category.name}
                            </div>
                            <div>${createDate}</div>
                            <div>
                                <div class="inline-block">点赞 <span class="blue">${articles[i].approveNum}</span></div>
                                <div class="inline-block">评论 <span class="orange">${articles[i].discussNum}</span></div>
                            </div>
                        </div>
                        <div class="csq-wz-zd">
                            <img src="${zd_img}" alt="">
                        </div>
                    </div>`;
        }
        $(".msg-loading").hide();
        $(".csq-tab-list").append(html);
        csq_url=null;
    }else{
        scroll_status=false;
        $(".msg-loading").hide();
    }

}
