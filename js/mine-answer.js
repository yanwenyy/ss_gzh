$(function(){
    //获取列表
    function get_list(data){
        console.log(data);
        var questions=data.questionUserAnswerRewardFlows,html="";
        for(var i=0;i<questions.length;i++){
            var status="";
            if(questions[i].status==1){
                status="未采纳";
            }else if(questions[i].status==2){
                status="已采纳";
            }else if(questions[i].status==3){
                status="未采纳";
            }else if(questions[i].status==4){
                status="未采纳";
            }else if(questions[i].status==5){
                status="未采纳";
            }else if(questions[i].status==6){
                status="已纠错";
            }
            //用户等级
            var score_img=get_score(questions[i].integralScore,questions[i].aision,questions[i].vip);
            var realName=get_name(questions[i]);
            html+=`
            <div class="card-list mine-answer-list" data-id="${questions[i].uuid}" data-status="${questions[i].status}">
                <div class="box-sizing">
                    <div class="clist-head">
                        <img src="${head_src+questions[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${score_img}" alt="">
                                </div>
                            </div>
                            <div class="zx-detail-date">${format(questions[i].date)}</div>
                        </div>
                        <div class="inline-block red mine-ans-cn">${status}</div>
                    </div>
                    <div class="clist-msg"  style="margin-top: 1rem">
                       ${questions[i].content}
                    </div>
                    <div class="zx-detail-city mine-answer-date">
                        <div class="inline-block">
                             <img src="../img/label.png" alt="">
                            ${questions[i].area||""} ${questions[i].quTrade||""}
                        </div>
                        <div class="inline-block mine-ans-sj">
                            赏金: <span class="red">${parseFloat(questions[i].money).toFixed(2)||"0.00"}元</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        $(".mine-free-ques").html(html);
    }
    function get_list_more(data){
        console.log(data);
        var questions=data.questionUserAnswerRewardFlows,html="";
        if(questions!=""){
            for(var i=0;i<questions.length;i++){
                var status="";
                if(questions[i].status==1){
                    status="未采纳";
                }else if(questions[i].status==2){
                    status="已采纳";
                }else if(questions[i].status==3){
                    status="未采纳";
                }else if(questions[i].status==4){
                    status="未采纳";
                }else if(questions[i].status==5){
                    status="未采纳";
                }else if(questions[i].status==6){
                    status="已纠错";
                }
                //用户等级
                var score_img=get_score(questions[i].integralScore,questions[i].aision,questions[i].vip);
                var realName=get_name(questions[i]);
                html+=`
            <div class="card-list mine-answer-list" data-id="${questions[i].uuid}" data-status="${questions[i].status}">
                <div class="box-sizing">
                    <div class="clist-head">
                        <img src="${head_src+questions[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${score_img}" alt="">
                                </div>
                            </div>
                            <div class="zx-detail-date">${format(questions[i].date)}</div>
                        </div>
                        <div class="inline-block red mine-ans-cn">${status}</div>
                    </div>
                    <div class="clist-msg"  style="margin-top: 1rem">
                       ${questions[i].content}
                    </div>
                    <div class="zx-detail-city mine-answer-date">
                         <div class="inline-block">
                             <img src="../img/label.png" alt="">
                            ${questions[i].area||""} ${questions[i].quTrade||""}
                        </div>
                        <div class="inline-block mine-ans-sj">
                            赏金: <span class="red">${parseFloat(questions[i].money).toFixed(2)||"0.00"}元</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
            }
            $(".mine-free-ques").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/question/answerQuestionList",{"sinceId":count_start,"maxId":count_end},get_list);
    scroll_more(http_url.url+"/question/answerQuestionList",{"sinceId":count_start,"maxId":count_end},get_list_more);
    $("body").on("click",".mine-answer-list",function(){
        var id=$(this).attr("data-id");
        window.location.href="mine-answer-detail.html?id="+id+"&&status="+$(this).attr("data-status");
    })
});