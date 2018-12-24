$(function(){
    var phone=getUrlParms("phone"),code=getUrlParms("code");
    if(code==1){
        $(".back").click(function(){
            window.location.href="index.html";
        });
    }
    //个人主页信息
    function home_page(data){
        console.log(data);
        var users=data.users;
        if(data.self==1){
            $(".home-page-expert").show();
            $(".expert-follow").hide();
        }
        if(data.isAttention==1){
            $(".expert-gz").html("取消关注").addClass("gray");
        }
        $(".expert_hp_headimg").attr("src",head_src+users.headImage);
        $(".hp_realname").html(users.userName);
        $(".hp_levelname").html(users.levelName);
        $(".hp_address").html(users.province);
        $(".hp_cn_score").html(parseFloat(users.grScore).toFixed(1));
        $(".hp_zx_score").html(parseFloat(users.adScore).toFixed(1));
        $(".consultMoney").html("￥"+users.consultMoney+"/次");
        $(".zj-compeny").html(users.companyName||"");
        var goodat=users.adepts,html="";
        for(var i in goodat){
            html+=`<div class="inline-block">${goodat[i]}</div>`
        }
        $(".hp_goodat").html(html);
        var zgrz=users.counselorDuty.split(" "),zgrz_html='';
        for(var y=0;y<zgrz.length;y++){
            zgrz_html+=`
                <span><img src="../img/icon-expert home page-book.png" alt="">${zgrz[y]}</span>
            `
        }
        $(".zgrz").html("资格认证:&nbsp;&nbsp;&nbsp;"+zgrz_html);
        $(".hp_smw_price").html(users.consultMoney+" 元/次");
        if(users.experience==null){
            $(".none-msg").show();
        }
        $("#tab1>.grjl").html(users.experience);
        $("#tab2>.grjl").html(users.classicalCase);
    };
    ajax(http_url.url+"/personal/home",{"phone":phone},home_page);
    //文章和被采纳点击
    $(".weui-navbar__item").click(function(){
        var code=$(this).attr("href");
        count_start=1,count_end=10,num=1;
        var url_h=$(this).attr("href"),url_html='';
        $(".none-msg").hide();
        if(url_h=="#tab1"||url_h=="#tab2"){
            url_html=url_h+">div";
            $(".none-msg").html("暂无相关信息");
            if($(url_html).html()!=''){
                $(".none-msg").hide();
            }else{
                $(".none-msg").show();
            }
        }else if(url_h=="#tab3"){
            url_html=url_h;
            $(".none-msg").html("暂无发布的文章");
            function get_art(data){
                //console.log(data);
                console.log(data.articles);
                if(data.articles==""){
                    $(".none-msg").show();
                }else{
                    $(".none-msg").hide();
                    var articles=data.articles,html="";
                    for(var i=0;i<articles.length;i++){
                        var content="";
                        if(articles[i].description.length>120){
                            content=articles[i].description.substr(0,120)+"...";
                        }else{
                            content=articles[i].description;
                        }
                        html+=`<div>
                            <div class="grwz card-list zx-list" data-id="${articles[i].uuid}" data-phone="${articles[i].userLevel.phoneNumber}">
                                <div class="box-sizing watch-answer-expert">
                                    <div class="clist-head">
                                        <img src="${head_src+articles[i].userLevel.headImage}" alt="" onerror=src="../img/user.png"  data-role="${articles[i].userLevel.role}" data-phone="${articles[i].userLevel.phoneNumber}">
                                        <div class="inline-block">
                                            <div class="user-name">
                                                ${articles[i].userLevel.userName}
                                                <div class="inline-block zxs-grade">
                                                    <img src="../img/icon-expert icon.png" alt="">
                                                    ${articles[i].userLevel.levelName}
                                                </div>
                                            </div>
                                            <div class="zx-detail-date">${articles[i].userLevel.counselorDuty}</div>
                                        </div>
                                    </div>
                                    <div class="clist-msg mine-wz"  data-id="${articles[i].uuid}">
                                       ${articles[i].title}
                                    </div>
                                </div>
                            </div>
                            <div class="wz-da box-sizing mine-wz" data-id="${articles[i].uuid}"  data-phone="${articles[i].userLevel.phoneNumber}">
                                 ${content||"暂无内容"}
                            </div>
                            <div class="clist-foot export-foot">
                                <div class="rd-look" data-id="${articles[i].category.uuid}">
                                    ${articles[i].category.name}
                                </div>
                                <div>${format(articles[i].createDate)}</div>
                                <div>
                                    <div class="inline-block">点赞 <span class="blue">${articles[i].approveNum}</span></div>
                                    <div class="inline-block">评论 <span class="orange">${articles[i].discussNum}</span></div>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                    $("#tab3").html(html);
                }
            }
            function get_art_more(data){
                var articles=data.articles,html="";
                for(var i=0;i<articles.length;i++){
                    var content="";
                    if(articles[i].description.length>120){
                        content=articles[i].description.substr(0,120)+"...";
                    }else{
                        content=articles[i].description;
                    }
                    html+=`<div>
                            <div class="grwz card-list zx-list" data-id="${articles[i].uuid}" data-phone="${articles[i].userLevel.phoneNumber}">
                                <div class="box-sizing watch-answer-expert">
                                    <div class="clist-head">
                                        <img src="${head_src+articles[i].userLevel.headImage}" alt="" onerror=src="../img/user.png"  data-role="${articles[i].userLevel.role}" data-phone="${articles[i].userLevel.phoneNumber}">
                                        <div class="inline-block">
                                            <div class="user-name">
                                                ${articles[i].userLevel.userName}
                                                <div class="inline-block zxs-grade">
                                                    <img src="../img/icon-expert icon.png" alt="">
                                                    ${articles[i].userLevel.levelName}
                                                </div>
                                            </div>
                                            <div class="zx-detail-date">${articles[i].userLevel.counselorDuty}</div>
                                        </div>
                                    </div>
                                    <div class="clist-msg mine-wz"  data-id="${articles[i].uuid}">
                                       ${articles[i].title}
                                    </div>
                                </div>
                            </div>
                            <div class="wz-da box-sizing mine-wz" data-id="${articles[i].uuid}"  data-phone="${articles[i].userLevel.phoneNumber}">
                                 ${content||"暂无内容"}
                            </div>
                            <div class="clist-foot export-foot">
                                <div class="rd-look" data-id="${articles[i].category.uuid}">
                                    ${articles[i].category.name}
                                </div>
                                <div>${format(articles[i].createDate)}</div>
                                <div>
                                    <div class="inline-block">点赞 <span class="blue">${articles[i].approveNum}</span></div>
                                    <div class="inline-block">评论 <span class="orange">${articles[i].discussNum}</span></div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                $("#tab3").append(html);

            }
            ajax(http_url.url+"/article/condition",{"uuid":phone, "articleType":"personal",
                "sinceId":count_start, "maxId":count_end},get_art);
            scroll_more(http_url.url+"/article/condition",{"uuid":phone, "articleType":"personal",
                "sinceId":count_start, "maxId":count_end},get_art_more);
        }else if(url_h=="#tab4"){
            url_html=url_h+">div";
            $(".none-msg").html("暂无被采纳的问题");
            function get_cn_answer(data){
                //console.log(data);
                if(data.data==""){
                    $(".none-msg").show();
                }else{
                    $(".none-msg").hide();
                    var answer=data.data,html="";
                    for(var i=0;i<answer.length;i++){
                        //用户等级
                        var score_img=get_score(answer[i].integralScore,answer[i].aision,answer[i].vip);
                        var content;
                        if(answer[i].content.length>40){
                            content=answer[i].content.substr(0,40)+"...";
                        }else{
                            content=answer[i].content;
                        }
                        var if_buy="",cwatch_buy='';
                        if(answer[i].status=="1"){
                            if_buy="已围观";
                            cwatch_buy="cwatch_buy";
                        }else{
                            if_buy="1元 围观"
                        }
                        var realName=get_name(answer[i]);
                        html+=`
                    <div class="box-sizing one_wg"  data-id="${answer[i].uuid}">
                            <div class="clist-head">
                                <img src="${head_src+answer[i].headImage}" alt="" onerror=src="../img/user.png" data-role="${answer[i].role}" data-phone="${answer[i].phoneNumber}">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${realName||"匿名用户"}
                                    </div>
                                    <div class="user-grade">
                                        <img src="${score_img}" alt="">
                                    </div>
                                </div>
                                <div class="cwatch ${cwatch_buy}"  data-id="${answer[i].uuid}">${if_buy}</div>
                            </div>
                            <div class="clist-msg">
                                ${content}
                            </div>
                            <div class="clist-foot">
                                <div>${format(answer[i].date)}</div>
                                <div>
                                    <div class="inline-block">点赞 ${answer[i].approveNum}</div>
                                    <div class="inline-block">围观 ${answer[i].lookNum}</div>
                                </div>
                            </div>
                        </div>
                `;
                    }
                    $("#tab4>.card-list").html(html);
                }

            }
            function get_cn_answer_more(data){
                $(".none-msg").hide();
                var answer=data.data,html="";
                for(var i=0;i<answer.length;i++){
                    var content;
                    var score_img=get_score(answer[i].integralScore,answer[i].aision,answer[i].vip);
                    if(answer[i].content.length>40){
                        content=answer[i].content.substr(0,40)+"...";
                    }else{
                        content=answer[i].content;
                    }
                    var realName=get_name(answer[i]);
                    html+=`
                    <div class="box-sizing">
                            <div class="clist-head">
                                <img src="${head_src+answer[i].headImage}" alt="" onerror=src="../img/user.png"   data-role="${answer[i].role}" data-phone="${answer[i].phoneNumber}">
                                <div class="inline-block">
                                    <div class="user-name">
                                        ${realName||""}
                                    </div>
                                    <div class="user-grade">
                                        <img src="${score_img}" alt="">
                                    </div>
                                </div>
                                <div class="cwatch">1元 围观</div>
                            </div>
                            <div class="clist-msg">
                                ${content}
                            </div>
                            <div class="clist-foot">
                                <div>${format(answer[i].date)}</div>
                                <div>
                                    <div class="inline-block">点赞 ${answer[i].approveNum}</div>
                                    <div class="inline-block">围观 ${answer[i].lookNum}</div>
                                </div>
                            </div>
                        </div>
                `;
                }
                $("#tab4>.card-list").append(html);
            }
            ajax(http_url.url+"/personal/user/adop",{"uuid":phone,
                "sinceId":count_start, "maxId":count_end},get_cn_answer);
            scroll_more(http_url.url+"/personal/user/adop",{"uuid":phone,
                "sinceId":count_start, "maxId":count_end},get_cn_answer_more);
        }
    });
    //修改价格点击
    $(".edit-price").click(function(){
        $(".shadow").show();
        function get_price(data){
            console.log(data);
            var list=data.data,html="";
            for(var i=0;i<list.length;i++){
                html+=`
                    <li data-money="${list[i].money}">${list[i].name}: ${list[i].money}元/次</li>
                `;
            }
            html+=`<div class="red" style="font-size:2.4rem;padding:1rem">注: 该资费标准是根据用户当前等级制度,等级越高咨询费用越高</div>`
            $(".hp_price_list").html(html);
        }
        ajax_nodata(http_url.url+"/personal/level",get_price);
    });
    $(".colse-shadow").click(function(){
        $(".shadow").hide();
    });
    // //个人信息点击
    // $(".weui-navbar__item").click(function(){
    //     var url_h=$(this).attr("href"),url_html='';
    //     if(url_h=="#tab1"||url_h=="#tab2"){
    //         url_html=url_h+">div";
    //         $(".none-msg").html("暂无相关信息");
    //     }else if(url_h=="#tab3"){
    //         url_html=url_h;
    //         $(".none-msg").html("暂无文章");
    //     }else if(url_h=="#tab4"){
    //         url_html=url_h+">div";
    //         $(".none-msg").html("暂无被采纳的问题");
    //     }
    //     console.log($(url_html).html());
    //     if($(url_html).html()!=''){
    //         $(".none-msg").hide();
    //     }else{
    //         $(".none-msg").show();
    //     }
    // });
    //价格点击
    $("body").on("click",".hp_price_list>li",function(){
        var price=$(this).attr("data-money");
        //修改价格
        function edit_price(data){
            if(data.code==1){
                alert(data.des);
                $(".shadow").hide();
                $(".hp_smw_price").html(price+" 元/次");
            }else{
                alert(data.des);
            }
        }
        ajax(http_url.url+"/personal/consultMoney",{"money":price},edit_price)
    });
    //个人文章list点击
    $("body").on("click",".zx-list",function(){
        var csq_id=$(this).attr("data-id"),phone=$(this).attr("data-phone");
        //console.log(data_detail);
        window.location.href="../html/csq_detail.html?csq_id="+csq_id+"&&msg="+phone;
    });
    $("body").on("click",".wz-da",function(){
        var csq_id=$(this).attr("data-id"),phone=$(this).attr("data-phone");
        //console.log(data_detail);
        window.location.href="../html/csq_detail.html?csq_id="+csq_id+"&&msg="+phone;
    });
    //1元围观
    $("body").on("click",".one_wg",function(){
        var cwatch_id=$(this).attr("data-id");
        //微信授权
        function cwatch_jurisdiction(data){
            console.log(data);
            if(data.isBuy==1){//未购买
                window.location.href="../html/cwatch.html?cwatch_id="+cwatch_id;
            }else if(data.isBuy==0){//已购买
                window.location.href="../html/watch-anwser.html?cwatch_id="+cwatch_id+"&&msg="+phone;
            }
        }
        ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+cwatch_id,cwatch_jurisdiction);
    });
    //关注按钮点击
    $(".expert-gz").click(function(){
        var that=$(this);
        function attention(data){
            alert(data.des);
        }
        if($(this).html()=="取消关注"){
            $(this).html("+ 关注").removeClass("gray");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":0},attention);

        }else{
            $(this).html("取消关注").addClass("gray");
            ajax(http_url.url+"/attention/user",{"phoneNum":phone,"isAttention":1},attention);
        }
    });
});