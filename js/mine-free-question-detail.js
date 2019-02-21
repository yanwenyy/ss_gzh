$(function(){
    var id=getUrlParms("id"),status=getUrlParms("status"),answer_id='',quType=getUrlParms("quType");
    $(".back").click(function(){
        window.location.href="mine-free-question-list.html";
    });
    function get_detail(data){
        // console.log(data);
        //我的提问
        var questionUserOwnMsg=data.question;
        if(questionUserOwnMsg.quType==1){
            window.location.href="mine-free-question-release.html?id="+id;
        }
        //用户等级
        var score_img=get_score(questionUserOwnMsg.integralScore,questionUserOwnMsg.aision,questionUserOwnMsg.vip);
        var user_answer_img=questionUserOwnMsg.images,ans_html="";
        if(questionUserOwnMsg.images!=null){
            for(var i=0;i<user_answer_img.length;i++){
                ans_html+=`
                 <img class="img_look" src="${question_src+user_answer_img[i]}" alt="">
            `;
            }
        }
        var realName=get_name(questionUserOwnMsg);
        $(".m-q-f-detail>div").html(`<div class="clist-head">
                <img src="${head_src+questionUserOwnMsg.headImage}" alt="" onerror=src="../img/user.png">
                <div class="inline-block">
                    <div class="user-name">
                        ${realName||"匿名用户"}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
                    </div>
                    <div class="zx-detail-date">${format(questionUserOwnMsg.date)}</div>
                </div>
            </div>
            <div class="clist-msg">
                ${questionUserOwnMsg.content}
            </div>
            <div class="zx-detail-img">
                ${ans_html}
            </div>
            <div class="zx-detail-city wacth-city">
                <div class="inline-block">
                    <img src="../img/label.png" alt="">
                    ${questionUserOwnMsg.area||""} ${questionUserOwnMsg.quTrade||""}
                </div>
                <div class="wacth-num inline-block">
                    <span>围观<span class="wg-num">${questionUserOwnMsg.lookNum}</span></span>
                </div>
            </div>
            `);
    }
    ajax(http_url.url+"/question/acceptAnswer",{
        "status":status, "questionUuid":id},get_detail);
    if(status==3||status==4){
        $(".error-correction-btn").show();
        $(".look-ques-press").hide();
    }
    //回答列表
    function get_answer(data){
        console.log(data);
        var answerUsers=data.answerUsers,answer_html='',jc_title_html='';
        for(var i=0;i<answerUsers.length;i++){
            var adopt_act,adopt_html='',jb_html='',jb_class="",pj_show="out";
            if(answerUsers[i].status==7||answerUsers[i].checkStatus==2){
                $(".error-correction-btn").hide();
            }
            if(answerUsers[i].status==1&&status==2&&quType!=2){
                jb_html="不满意";
            }
            if(answerUsers[i].status==1&&status==2){
                adopt_html="采纳";
                adopt_act="adopt_act";
            }else if(answerUsers[i].status==2||answerUsers[i].checkStatus==2||answerUsers[i].status==7){
                adopt_html="<img src='../img/best-answer.png'>";
                adopt_act="";
                jb_html="";
                answer_id=answerUsers[i].uuid;
                if(status!=9){
                    pj_show=""
                }
            }else if(answerUsers[i].status==3){
                adopt_html="";
                adopt_act="adopt_act_jb";
                jb_class="red";
                // jb_html="已举报";
            }else if(answerUsers[i].status==4){
                adopt_html="";
                adopt_act="adopt_act_jb";
                jb_class="red";
                // jb_html="举报通过";
            }else if(answerUsers[i].status==5){
                adopt_html="";
                adopt_act="adopt_act";
                // jb_html="举报";
            }else if(answerUsers[i].status==6){
                adopt_html="<img src='../img/error-answer.png'>";
                adopt_act="";
                // jb_html="举报";
                jc_title_html=`<div class="huida box-sizing">答案纠错</div>`;
            }
            var score_answer=answerUsers[i].score,score_html="",pj_score_show="out";
            for(var p=0;p<5;p++){
                var pj_html='';
                if(p<score_answer){
                    pj_html=`<img src="../img/-icon-star.png" alt="">`;
                }else{
                    pj_html=`<img src="../img/icon-star_an.png" alt="">`;
                }
                score_html+=pj_html;
            }
            // for(var j=0;j<score_answer;j++){
            //     score_html+=`<img src="../img/-icon-star.png" alt="">`;
            // }
            if(answerUsers[i].score==0){
                pj_score_show=""
            }
            var realName=get_name(answerUsers[i]);
            var user_role='',zxs_role='';
            if(answerUsers[i].role==1){
                zxs_role="out";
            }else{
                user_role="out"
            }
            answer_html+=`
                ${jc_title_html}
                <div class="card-list zx-list m-q-f-d-msg">
                    <div class="box-sizing watch-answer-expert">
                        <div class="clist-head">
                            <img class="look-hp-image" data-role="${answerUsers[i].role}" data-phone="${answerUsers[i].phoneNumber}" src="${head_src+answerUsers[i].headImage}" alt="" onerror=src="../img/user.png">
                                <div class="inline-block ${zxs_role}">
                                <div class="user-name">
                                    ${answerUsers[i].userName||"匿名用户"}
                                    <div class="inline-block zxs-grade">
                                        <img src="../img/icon-expert icon.png" alt="">
                                        ${answerUsers[i].levelName}
                                    </div>
                                </div>
                                <div class="zx-detail-date">${answerUsers[i].counselorDuty}</div>
                            </div>
                            <div class="inline-block ${user_role}">
                                <div class="user-name">
                                    ${answerUsers[i].realName||"匿名用户"}
                                    <div class="user-grade inline-block zx-detail-grade">
                                        <img src="${get_score(answerUsers[i].integralScore,answerUsers[i].aision,answerUsers[i].vip)}" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="adopt ${adopt_act}" data-phone="${answerUsers[i].phoneNumber}"  data-id="${answerUsers[i].uuid}">${adopt_html}</div>
                        </div>
                        <div class="clist-msg">
                            ${answerUsers[i].content}
                        </div>
                    </div>
                    <ul class="zxs-range">
                        <li>
                            <span class="inline-block">所属专题：</span>
                            <span class="inline-block">${answerUsers[i].topic||""}</span>
                        </li>
                        <li>
                            <span class="inline-block">所属税种：</span>
                            <span class="inline-block">
                           ${answerUsers[i].tax||""}
                        </span>
                        </li>
                    </ul>
                    <div class="m-q-f-date box-sizing">${format(answerUsers[i].date)}<div class="inline-block m-q-f-report ${jb_class}" data-id="${answerUsers[i].uuid}">${jb_html}</div></div>
                     <div class="evaluation-score box-sizing ${pj_show}">
                        <div>
                            评价得分：
                            <div class="inline-block">
                                ${score_html}
                            </div>
                            <div class="inline-block free-que-pj ${pj_score_show}"  data-phone="${answerUsers[i].phoneNumber}"  data-id="${answerUsers[i].uuid}">
                                去评价
                                <img src="../img/free-ques-pj.png" alt="">
                            </div>
                        </div>
                        <div>${answerUsers[i].appraisal||"暂无评价内容"}</div>
                    </div>
                </div>
            `
        }
        $('.watch-answer-msg').html(answer_html);
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
                                    <img class="look-hp-image" data-role="${all_usermsg.role}" data-phone="${changerAnswer[j].phoneNumber}" src="${head_src+all_usermsg.headImage}" alt="" onerror=src="../img/user.png">
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
                            <ul class="zxs-range"  style="padding:3rem;">
                                <li>
                                <span class="inline-block">所属专题：</span>
                                <span class="inline-block">${changerAnswer[j].topic||""}</span>
                                </li>
                                <li>
                                <span class="inline-block">所属专题：</span>
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
        if(status==1||status==2){
            $(".evaluation-score").hide();
        }
    }
    function get_answer_more(data){
        console.log(data);
        var answerUsers=data.answerUsers,answer_html='';
        for(var i=0;i<answerUsers.length;i++){
            var adopt_act,adopt_html='',jb_html='',jb_class="";
            if(answerUsers[i].status==1){
                adopt_html="采纳";
                adopt_act="adopt_act";
                jb_html="不满意";
            }else if(answerUsers[i].status==2){
                adopt_html="";
                adopt_act="";
                jb_html="";
            }else if(answerUsers[i].status==3){
                adopt_html="采纳";
                adopt_act="adopt_act_jb";
                jb_class="red";
                jb_html="已举报";
            }else if(answerUsers[i].status==4){
                adopt_html="采纳";
                adopt_act="adopt_act_jb";
                jb_class="red";
                jb_html="举报通过";
            }else if(answerUsers[i].status==5){
                adopt_html="采纳";
                adopt_act="adopt_act";
                jb_html="举报";
            }
            var realName=get_name(answerUsers[i]);
            answer_html+=`
                <div class="card-list zx-list m-q-f-d-msg">
                    <div class="box-sizing watch-answer-expert">
                        <div class="clist-head">
                            <img class="look-hp-image" data-role="${answerUsers[i].role}" data-phone="${answerUsers[i].phoneNumber}" src="${head_src+answerUsers[i].headImage}" alt="" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div class="user-name">
                                    ${realName||""}
                                    <div class="inline-block zxs-grade">
                                        <img src="../img/icon-expert icon.png" alt="">
                                        ${answerUsers[i].levelName}
                                    </div>
                                </div>
                                <div class="zx-detail-date"> ${answerUsers[i].counselorDuty}</div>
                            </div>
                           
                        </div>
                        <div class="clist-msg">
                            ${answerUsers[i].content}
                        </div>
                    </div>
                    <ul class="zxs-range">
                        <li>
                            <span class="inline-block">所属专题：</span>
                            <span class="inline-block">${answerUsers[i].topic||""}</span>
                        </li>
                        <li>
                            <span class="inline-block">所属税种：</span>
                            <span class="inline-block">
                           ${answerUsers[i].tax||""}
                        </span>
                        </li>
                    </ul>
                    <div class="m-q-f-date box-sizing">${format(answerUsers[i].date)}<div class="inline-block m-q-f-report" data-id="${answerUsers[i].uuid}">${jb_html}</div></div>
                </div>
            `
        }
        $('.watch-answer-msg').append(answer_html);
    }
    ajax(http_url.url+"/question/acceptAnswer",{
        "status":status, "questionUuid":id,"sinceId":count_start, "maxId":count_end},get_answer);
    if(status!=3&&status!=4){
        // scroll_more(http_url.url+"/question/acceptAnswer",{
        //     "status":status, "questionUuid":id,"sinceId":count_start, "maxId":count_end},get_answer_more);
    }
    //采纳点击
    $("body").on("click",".adopt",function(){
        var id=$(this).attr("data-id"),that=$(this),phone=$(this).attr("data-phone");
        function cn(data){
            if(data.code==1){
                alert("已采纳");
                that.hide();
                $(".m-q-f-report").hide();
                window.location.href="../html/mine-private-questions-score.html?id="+id+"&&phone="+phone;
            }else{
                alert(data.des)
            }
        }
        ajax(http_url.url+"/answer/updateStatus",{"status":"2","answerUuid":id},cn)
    });
    //举报点击
    $("body").on("click",".m-q-f-report",function(){
        var id=$(this).attr("data-id"),that=$(this);
        function jb(data){
            if(data.code==1){
                alert("操作成功");
                // alert("已举报");
                // that.html("已举报");
                // window.location.href="../html/mine-free-question-list.html"
                window.location.reload();
            }else{
                alert(data.des);
            }
        }
        ajax(http_url.url+"/answer/updateStatus",{"status":"3","answerUuid":id},jb)
    });
    if(status==3||status==4){
        $(".release").show();
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
                            title: "我在航信办税宝提了一个问题，快来围观。",
                            desc: $(".clist-msg").html(), //这里请特别注意是要去除html
                            link: total_share_url.url+"jsb_weixin/share_app/html/mine-question.html",
                            imgUrl:total_share_url.url+"jsb_weixin/share_app/img/share-logo.png",
                            trigger: function (res) {
                                console.log('用户点击发送给朋友');
                            },
                            success: function (res) {
                                console.log('已分享');
                                function fx_hobao(data){

                                }
                                ajax(http_url.url+"/pay/companyEnveloeps",{
                                    "questionUuid":id,
                                    "redType":"shareQuestion"
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
        $(".release").click(function(){
            var share_name=$(this).attr("data-name");
            //alert("点击右上角进行分享");$(".shadow").show();
            $(".shadow").show();
            $(".shadow").click(function(){
                $(".shadow").hide();
            })
        });
    }
    //我要纠错
    $(".error-correction-btn").click(function(){
       window.location.href="mine-ques-errorCorrection.html?id="+answer_id;
    });
    //查看详情点击
    $(".look-ques-press").click(function(){
        window.location.href="mine-ques-progress.html?id="+id;
    });
    $("body").on("click",".free-que-pj",function(){
        var id=$(this).attr("data-id"),that=$(this),phone=$(this).attr("data-phone");
        window.location.href="../html/mine-private-questions-score.html?id="+id+"&&phone="+phone;
    })
});