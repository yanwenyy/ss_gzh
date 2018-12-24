$(function(){
    var csq_id=getUrlParms("csq_id"),csq_name=decodeURI(getUrlParms("csq_name"));
    $(".csq-title-name").html(csq_name);
//   标签文章列表
    function get_hot_focus(data){
        console.log(data);
        var articles=data.articles,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
        for(var i=0;i<articles.length;i++){
            createDate=format(articles[i].createDate);
            if(articles[i].userLevel!=null){
                user_img=head_src+articles[i].userLevel.headImage;
                user_name=articles[i].userLevel.realName;
                user_role=articles[i].userLevel.levelName;
                user_counselorDuty=articles[i].userLevel.counselorDuty;
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
            var description=articles[i].description;
            if(articles[i].description.length>180){
                description=articles[i].description.substr(0,180)+"...";
            }
            html+=`<div data-id="${articles[i].uuid}">
                        <div class="grwz card-list zx-list">
                            <div class="box-sizing watch-answer-expert">
                            <div class="clist-head">
                                <img src="${user_img}" alt=""  onerror=src="../img/user.png">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${user_name||""}
                                        <div class="inline-block zxs-grade">
                                            <img src="../img/icon-expert icon.png" alt="">
                                            ${user_role||""}
                                        </div>
                                    </div>
                                    <div class="zx-detail-date">${user_counselorDuty||""}</div>
                                </div>
                            </div>
                            <div class="clist-msg hot_detail"  data-id="${articles[i].uuid}">
                                ${articles[i].title}
                            </div>
                        </div>
                        </div>
                        <div class="wz-da box-sizing  hot_detail"  data-id="${articles[i].uuid}">
                            ${description}
                        </div>
                        <div class="clist-foot export-foot">
                            <div>${createDate}</div>
                            <div>
                                <div class="inline-block">点赞 <span class="blue">${articles[i].approveNum}</span></div>
                                <div class="inline-block">评论 <span class="orange">${articles[i].discussNum}</span></div>
                            </div>
                        </div>
                    </div>`;
        }
        $(".hot-focus").html(html);
    }
    function get_hot_focus_more(data){
        console.log(data);
        var articles=data.articles,zd_img,csq_detail,html='',user_img,user_name,user_role,user_counselorDuty,createDate;
        for(var i=0;i<articles.length;i++){
            createDate=format(articles[i].createDate);
            if(articles[i].userLevel!=null){
                user_img=head_src+articles[i].userLevel.headImage;
                user_name=articles[i].userLevel.realName;
                user_role=articles[i].userLevel.levelName;
                user_counselorDuty=articles[i].userLevel.counselorDuty;
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
            var description=articles[i].description;
            if(articles[i].description.length>180){
                description=articles[i].description.substr(0,180)+"...";
            }
            html+=`<div data-id="${articles[i].uuid}">
                        <div class="grwz card-list zx-list">
                            <div class="box-sizing watch-answer-expert">
                            <div class="clist-head">
                                <img src="${user_img}" alt=""  onerror=src="../img/user.png">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${user_name||""}
                                        <div class="inline-block zxs-grade">
                                            <img src="../img/icon-expert icon.png" alt="">
                                            ${user_role||""}
                                        </div>
                                    </div>
                                    <div class="zx-detail-date">${user_counselorDuty||""}</div>
                                </div>
                            </div>
                            <div class="clist-msg hot_detail"  data-id="${articles[i].uuid}">
                                ${articles[i].title}
                            </div>
                        </div>
                        </div>
                        <div class="wz-da box-sizing  hot_detail"  data-id="${articles[i].uuid}">
                            ${description}
                        </div>
                        <div class="clist-foot export-foot">
                            <div>${createDate}</div>
                            <div>
                                <div class="inline-block">点赞 <span class="blue">${articles[i].approveNum}</span></div>
                                <div class="inline-block">评论 <span class="orange">${articles[i].discussNum}</span></div>
                            </div>
                        </div>
                    </div>`;
        }
        $(".hot-focus").append(html);
    }
    ajax(http_url.url+"/article/articleCategoryId",{"sinceId":count_start,"maxId":count_end,"uuid":csq_id},get_hot_focus);
    scroll_more(http_url.url+"/article/articleCategoryId",{"sinceId":count_start,"maxId":count_end,"uuid":csq_id},get_hot_focus_more);
    //财税圈list点击
    $("body").on("click",".hot_detail",function(){
        var csq_id=$(this).attr("data-id");
        //console.log(data_detail);
        window.location.href="../html/csq_detail.html?csq_id="+csq_id;
    });
});