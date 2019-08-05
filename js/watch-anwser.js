//屏蔽手机自带返回键
$(document).ready(function() {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.location.href="index.html";
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
});
$(function(){
    var watch_id=getUrlParms("cwatch_id"),answerUuid,status=getUrlParms("status"),msg=getUrlParms("msg");
    var newuser=getUrlParms("newuser");
    //是否新用户
    // if(newuser){
    //     $(".down-app-model").show();
    // }
    if(status!=null){
        $(".back").click(function(){
            window.location.href="../html/mine-buy.html?status=1"
        })
    }else if(msg!=null){
        $(".back").click(function(){
            window.location.href="personal-new.html.html?phone="+msg+"&&code=1";
        });
    }else{
        $(".back").click(function(){
            window.location.href="index.html";
        })
    }
    //回答详情
    function get_answer(data) {
        console.log(data);
        var questionUser=data.questionUser,createDate=format(questionUser.date),
            answewrUser=data.answewrUsers;
        //用户等级
        var score_img=get_score(questionUser.integralScore,questionUser.aision,questionUser.vip);
        var user_answer_img=questionUser.images,ans_html="";
        if(questionUser.images!=null){
            for(var i=0;i<user_answer_img.length;i++){
                ans_html+=`
                 <img class="img_look" src="${question_src+user_answer_img[i]}" alt="">
            `;
            }
        }
        var realName=get_name(questionUser);
        $(".user-msg-detail").html(`
            <div class="box-sizing">
            <div class="clist-head">
                <img src="${headimage(questionUser.headImage)}" alt="" onerror=src="../img/user.png"  class="look-hp-image"  data-role="${questionUser.role}" data-phone="${questionUser.phoneNumber}">
                <div class="inline-block">
                    <div class="user-name">
                       ${realName||"匿名用户"}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
                    </div>
                    <div class="zx-detail-date">${createDate}</div>
                </div>
            </div>
            <div class="clist-msg-q clist-msg">
                ${questionUser.content}
            </div>
            <div class="zx-detail-img">
                ${ans_html}
            </div>
            <div class="zx-detail-city watch-answer-city">
                <div class="inline-block">
                    <img src="../img/label.png" alt="">
                     ${questionUser.area||""} ${questionUser.quTrade||""}
                </div>
                <div class="wacth-num inline-block">
                    <span>点赞<span class="dz-num">${questionUser.approveNum}</span></span>
                    <span>围观<span class="wg-num">${questionUser.lookNum}</span></span>
                </div>
            </div>
        </div>
        `);
        //回答者集合
        var answer_html='';
        for(var m=0;m<answewrUser.length;m++){
            if(answewrUser[m].status==2||answewrUser[m].checkStatus==2||answewrUser[m].status==7){
                answerUuid=answewrUser[m].uuid;
                // $(".error-correction-btn").show();
            }
            else{
                // $(".error-correction-btn").hide();
            }
            if(answewrUser[m].status==7||answewrUser[m].checkStatus==2){
                $(".error-correction-btn").hide();
            }
            var user_role='',zxs_role='',score_answer=answewrUser[m].score,score_html="",adopt_html='',jc_title_html='',pj_out='out';
            if(answewrUser[m].status==2||answewrUser[m].checkStatus==2||answewrUser[m].status==7){
                adopt_html="<img src='../img/best-answer.png'>";
            }else if(answewrUser[m].status==6){
                adopt_html="<img src='../img/error-answer.png'>";
                jc_title_html=`<div class="huida box-sizing" style="height: auto">答案纠错</div>`;
            }
            if(answewrUser[m].praiseNum>0){
                $(".zan-csq-detail").attr("src","../img/icon-onlooked-liked-select.png");
            }
            if(answewrUser[m].treadNum>0){
                $(".cai-csq-detail").attr("src","../img/icon-onlooked-unliked-select.png");
            }
            for(var j=0;j<5;j++){
                var s='';
                if((j<answewrUser[m].score)){
                    s+=`<img src="../img/-icon-star.png" alt="">`;
                }else{
                    s+=`<img src="../img/icon-star_an.png" alt="">`;
                }
                score_html+=s;
            }
            if(answewrUser[m].status==2||answewrUser[m].status==7){
                pj_out="";
            }
            if(answewrUser[m].role==1){
                zxs_role="out";
            }else{
                user_role="out"
            }
            answer_html+=`
                ${jc_title_html}
                <div class="box-sizing watch-answer-expert">
                    <div class="clist-head">
                        <img src="${headimage(answewrUser[m].headImage)}" alt="" onerror=src="../img/user.png"   class="look-hp-image" data-role="${answewrUser[m].role}" data-phone="${answewrUser[m].phoneNumber}">
                        <div class="inline-block ${zxs_role}">
                            <div class="user-name">
                                ${answewrUser[m].userName||"匿名用户"}
                                <div class="inline-block zxs-grade">
                                    <img src="../img/icon-expert icon.png" alt="">
                                    ${answewrUser[m].levelName}
                                </div>
                            </div>
                            <div class="zx-detail-date">${answewrUser[m].counselorDuty}</div>
                        </div>
                        <div class="inline-block ${user_role}">
                            <div class="user-name">
                                ${answewrUser[m].realName||"匿名用户"}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${get_score(answewrUser[m].integralScore,answewrUser[m].aision,answewrUser[m].vip)}" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="adopt">${adopt_html}</div>
                        
                    </div>
                    <div class="clist-msg">
                       ${answewrUser[m].content}
                    </div>
                </div>
                <ul class="zxs-range">
                    <li>
                        <span class="inline-block">所属专题：</span>
                        <span class="inline-block">${answewrUser[m].topic||""}</span>
                    </li>
                    <li>
                        <span class="inline-block">所属税种：</span>
                        <span class="inline-block">
                           ${answewrUser[m].tax||""}
                        </span>
                    </li>
                </ul>
                <div class="m-q-f-date box-sizing">
                    ${format(answewrUser[m].date)}
                     <div class="inline-block answer-cz-btn">
                        <div class="inline-block">
                            <img src="../img/icon-onlooked-liked-unselect.png" alt="" class="zan-csq-detail" data-id="${answewrUser[m].uuid}">
                            <span>${answewrUser[m].approveNum}</span>
                        </div>
                        <div class="inline-block">
                            <img src="../img/icon-onlooked-unliked-unselect.png" alt=""  class="cai-csq-detail" data-id="${answewrUser[m].uuid}">
                            <span>${answewrUser[m].opposeNum}</span>
                        </div>
                    </div>
                </div>
                <div class="evaluation-score box-sizing ${pj_out}">
                    <div>
                        评价得分：
                        <div class="inline-block">
                            ${score_html}
                        </div>
                    </div>
                    <div>${answewrUser[m].appraisal||"暂无评价内容"}</div>
                </div>`;
        }
        $(".answer-msg_detail").html(answer_html);
        //我的纠错显示
        var changerAnswer=data.changerAnswer,jc_html='';
        if(changerAnswer!=''&&changerAnswer!=null){
            ajax_nodata(http_url.url+"/user/message",function(data){
                if(data.code==1){
                    var all_usermsg=data;
                    console.log(all_usermsg);
                    $(".mine-jc-show").show();
                    var zxs_role,user_role;
                    if(data.role==1){
                        zxs_role="out";
                    }else{
                        user_role="out"
                    }
                    for(var j=0;j<changerAnswer.length;j++){
                        jc_html+=`
                    <div class="card-list zx-list m-q-f-d-msg">
                            <div class="box-sizing watch-answer-expert">
                                <div class="clist-head">
                                    <img class="look-hp-image" data-role="${all_usermsg.role}" data-phone="${changerAnswer[j].phoneNumber}" src="${headimage(all_usermsg.headImage)}" alt="" onerror=src="../img/user.png">
                                    <div class="inline-block ${zxs_role}">
                                        <div class="user-name">
                                            ${data.userName||"匿名用户"}
                                            <div class="inline-block zxs-grade">
                                                <img src="../img/icon-expert icon.png" alt="">
                                                ${data.levelName}
                                            </div>
                                        </div>
                                        <div class="zx-detail-date">${data.counselorDuty}</div>
                                    </div>
                                    <div class="inline-block ${user_role}">
                                            <div class="user-name">
                                                ${data.realName||"匿名用户"}
                                                <div class="user-grade inline-block zx-detail-grade">
                                                    <img src="${get_score(data.integralScore,data.aision,data.vip)}" alt="">
                                                </div>
                                            </div>
                                     </div>
                                 </div>
                                <div class="clist-msg">
                                ${changerAnswer[j].content}
                                </div>
                            </div>
                            <ul class="zxs-range" style="padding:3rem;">
                                <li>
                                <span class="inline-block">所属专题：</span>
                                <span class="inline-block">${changerAnswer[j].topic||""}</span>
                                </li>
                                <li>
                                <span class="inline-block">所属税种：</span>
                                <span class="inline-block">
                                    ${changerAnswer[j].tax||""}
                                </span>
                                </li>
                            </ul>
                            <div class="m-q-f-date box-sizing">${format(changerAnswer[j].date)}</div>
                        </div>
                `;
                    }
                    $(".mine-jc-list").html(jc_html);
                }
            });
        }
        //评论列表
        ajax(http_url.url+"/discuss/all",{"sinceId":count_start, "maxId":count_end, "answerUuid":answerUuid},answer_list);
        scroll_more(http_url.url+"/discuss/all",{"sinceId":count_start, "maxId":count_end, "answerUuid":answerUuid},answer_list_more)
    }
    ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+watch_id,get_answer);
    //评论列表
    function answer_list(data){
        // console.log(data);
        var discussUsers=data.discussUsers,dis_html="";
        if(discussUsers!=''&&discussUsers!=null){
            for(var k=0;k<discussUsers.length;k++){
                //用户等级
                var score_img=get_score(discussUsers[k].integralScore,discussUsers[k].aision,discussUsers[k].vip);
                var realName=get_name(discussUsers[k]);
                dis_html+=`<div class="box-sizing">
                <div class="clist-head">
                    <img src="${headimage(discussUsers[k].headImage)}" alt="" onerror=src="../img/user.png" class="look-hp-image" data-role="${discussUsers[k].role}" data-phone="${discussUsers[k].userUuid}">
                    <div class="inline-block">
                        <div class="user-name">
                            ${realName||"匿名用户"}
                            <div class="user-grade inline-block zx-detail-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clist-msg review-list-msg">
                    ${discussUsers[k].content}
                </div>
                <div class="zx-detail-date  review-list-msg">${format(discussUsers[k].date)}</div>
            </div>`
            }
            $(".dis_msg_detail").html(dis_html);
        }
    }
    function answer_list_more(data){
        //console.log(data);
        var discussUsers=data.discussUsers,dis_html="";
        if(discussUsers!=""&&discussUsers!=null){
            for(var k=0;k<discussUsers.length;k++){
                //用户等级
                var score_img=get_score(discussUsers[k].integralScore,discussUsers[k].aision,discussUsers[k].vip);
                var realName=get_name(discussUsers[k]);
                dis_html+=`<div class="box-sizing">
                <div class="clist-head">
                    <img src="${headimage(discussUsers[k].headImage)}" alt="" onerror=src="../img/user.png" class="look-hp-image"   data-role="${discussUsers[k].role}" data-phone="${discussUsers[k].userUuid}">
                    <div class="inline-block">
                        <div class="user-name">
                            ${realName||"匿名用户"}
                            <div class="user-grade inline-block zx-detail-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clist-msg review-list-msg">
                    ${discussUsers[k].content}
                </div>
                <div class="zx-detail-date  review-list-msg">${format(discussUsers[k].date)}</div>
            </div>`
            }
            $(".dis_msg_detail").append(dis_html);
        }else{
            scroll_status=false;
        }
    }
    //评论答案
    function sub_comment(data){
        //console.log(data);
        if(data.code==1){
            alert(data.des);
            // location.reload();
            // console.log(window.location);
            var url=window.location.pathname+window.location.search.replace(/\&newuser=yes/, "");
            // console.log(url);
            window.location.href = url;
        }else{
            alert(data.des);
        }
    }
    // $(".comment-sub").on('keypress',function(e) {
    $(".fb-commit").on('click',function(e) {
        // var keycode = e.keyCode;
        var comment_val = $(".comment-sub").val();
        // alert(comment_val);
        // if(keycode=='13') {
            e.preventDefault();
            if(comment_val==""){
                alert("内容不能为空");
            }else{
                // 请求搜索接口
                ajax(http_url.url+"/discuss/edit",{"answerUuid":answerUuid,"discussContent":comment_val},sub_comment);
            }
        // }
    });
    //我要纠错
    $(".error-correction-btn").click(function(){
        window.location.href="mine-ques-errorCorrection.html?id="+answerUuid;
    });
    //赞
    function zan_csq(data){
        if(data.code==1){
            alert("已赞");
            $(".zan-csq-detail").attr("src","../img/icon-onlooked-liked-select.png");
        }else{
            alert(data.des);
        }
    }
    //踩
    function cai_csq(data){
        if(data.code==1){
            alert("已踩");
            $(".cai-csq-detail").attr("src","../img/icon-onlooked-unliked-select.png");
        }else{
            alert(data.des);
        }
    }
    $("body").on("click",".zan-csq-detail",function(){
        var that=$(this);
        if($(this).attr("src")=="../img/icon-onlooked-liked-select.png"){
            alert("您已经赞过,不能再赞")
        }else{
            ajax(http_url.url + "/answer/proveAndpose", {"answerUuid": $(this).attr("data-id"), "status": 1}, function(data){
                if(data.code==1){
                    var num=Number(that.next("span").html())+1;
                    alert("已赞");
                    that.attr("src","../img/icon-onlooked-liked-select.png").next("span").html(num);
                }else{
                    alert(data.des);
                }
            });
            // if( $(".cai-csq-detail").attr("src")=="../img/icon-onlooked-unliked-select.png"){
            //     alert("您已经踩过该文章,不能再赞")
            // }else {
            //     ajax(http_url.url + "/answer/proveAndpose", {"answerUuid": answerUuid, "status": 1}, zan_csq);
            // }
        }
    });
    $("body").on("click",".cai-csq-detail",function(){
        var that=$(this);
        if($(this).attr("src")=="../img/icon-onlooked-unliked-select.png"){
            alert("您已经踩过,不能再踩")
        }else{
            ajax(http_url.url + "/answer/proveAndpose", {"answerUuid":  $(this).attr("data-id"), "status": 2}, function(data){
                if(data.code==1){
                    var num=Number(that.next("span").html())+1;
                    alert("已踩");
                    that.attr("src","../img/icon-onlooked-unliked-select.png").next("span").html(num);
                }else{
                    alert(data.des);
                }
            });
            // if( $(".zan-csq-detail").attr("src")=="../img/icon-onlooked-liked-select.png"){
            //     alert("您已经赞过该文章,不能再踩")
            // }else {
            //     ajax(http_url.url + "/answer/proveAndpose", {"answerUuid": answerUuid, "status": 2}, cai_csq);
            // }
        }
    });
    //微信分享
    function wx_share(){
        //配置微信信息
        var path_url=encodeURIComponent(window.location.href.split('#')[0]);
        $.ajax({
            type:"POST",
            url:http_url.url+"/wx/createJsapiSignature?url="+path_url,
            success:function(data){
                console.log(data.datum);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.datum.appid, // 必填，公众号的唯一标识
                    timestamp:data.datum.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.datum.noncestr, // 必填，生成签名的随机串
                    signature: data.datum.signature,// 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline',       // 分享到朋友圈接口
                        'onMenuShareAppMessage',  //  分享到朋友接口
                        'onMenuShareQQ',         // 分享到QQ接口
                        'onMenuShareQZone']   // 分享到qq空间] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    var shareData = {
                        title: "专家详解：你该了解的财税知识",
                        desc: $.trim($(".clist-msg-q").html()), //这里请特别注意是要去除html
                        link: total_share_url.url+"jsb_weixin/share_app/html/cwatch.html?cwatch_id="+watch_id,
                        imgUrl: total_share_url.url+"jsb_weixin/share_app/img/share-logo.png",
                        trigger: function (res) {
                            console.log('用户点击发送给朋友');
                        },
                        success: function (res) {
                            console.log('已分享');
                            function fx_hobao(data){

                            }
                            ajax(http_url.url+"/pay/companyEnveloeps",{
                                "questionUuid":watch_id,
                                "redType":"shareSecretly"
                            },fx_hobao)
                        },
                        cancel: function (res) {
                            console.log('已取消');
                        },
                        fail: function (res) {
                            console.log(JSON.stringify(res));
                            console.log(shareData.link)
                        }
                    };
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareQZone(shareData);
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                });
                wx.error(function(res){
                    console.log(res)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            },
            error:function(){
                alert("程序出错,请重试")
            }
        });
    }
    wx_share();
    $(".share-wx").click(function(){
        var share_name=$(this).attr("data-name");
        //alert("点击右上角进行分享");$(".shadow").show();
        $(".shadow").show();
        $(".shadow").click(function(){
            $(".shadow").hide();
        })
    });
});