$(function(){
    //获取列表
    function get_list(data){
        // console.log(data);
        var questions=data.questionUserAnswerRewardFlows,html="";
        for(var i=0,len=questions.length;i<len;i++){
            var change_v=questions[i];
            var status="";
            if(change_v.status==1){
                status="未采纳";
            }else if(change_v.status==2||change_v.status==7){
                status="已采纳";
            }else if(change_v.status==3){
                status="未采纳";
            }else if(change_v.status==4){
                status="未采纳";
            }else if(change_v.status==5){
                status="未采纳";
            }else if(change_v.status==6){
                status="已纠错";
            }
            //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            var realName=get_name(questions[i]);
            html+=`
            <div class="card-list mine-answer-list" data-id="${change_v.uuid}" data-status="${change_v.status}">
                <div class="box-sizing">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                 ${realName.length>10?realName.slice(0,10)+"...":realName}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${score_img}" alt="">
                                </div>
                            </div>
                            <div class="zx-detail-date">${format(change_v.date)}</div>
                        </div>
                        <div class="inline-block red mine-ans-cn">${status}</div>
                    </div>
                    <div class="clist-msg"  style="margin-top: 1rem">
                       ${change_v.content}
                    </div>
                    <div class="zx-detail-city mine-answer-date">
                        <div class="inline-block">
                             <img src="../img/label.png" alt="">
                            ${change_v.area||""} ${change_v.quTrade||""}
                        </div>
                        <div class="inline-block mine-ans-sj">
                            赏金: <span class="red">${parseFloat(change_v.money).toFixed(2)||"0.00"}元</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        $(".mine-free-ques").html(html);
    }
    function get_list_more(data){
        // console.log(data);
        var questions=data.questionUserAnswerRewardFlows,html="";
        if(questions!=""){
            for(var i=0,len=questions.length;i<len;i++){
                var change_v=questions[i];
                var status="";
                if(change_v.status==1){
                    status="未采纳";
                }else if(change_v.status==2||change_v.status==7){
                    status="已采纳";
                }else if(change_v.status==3){
                    status="未采纳";
                }else if(change_v.status==4){
                    status="未采纳";
                }else if(change_v.status==5){
                    status="未采纳";
                }else if(change_v.status==6){
                    status="已纠错";
                }
                //用户等级
                var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
                var realName=get_name(questions[i]);
                html+=`
            <div class="card-list mine-answer-list" data-id="${change_v.uuid}" data-status="${change_v.status}">
                <div class="box-sizing">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                 ${realName.length>10?realName.slice(0,10)+"...":realName}
                                <div class="user-grade inline-block zx-detail-grade">
                                    <img src="${score_img}" alt="">
                                </div>
                            </div>
                            <div class="zx-detail-date">${format(change_v.date)}</div>
                        </div>
                        <div class="inline-block red mine-ans-cn">${status}</div>
                    </div>
                    <div class="clist-msg"  style="margin-top: 1rem">
                       ${change_v.content}
                    </div>
                    <div class="zx-detail-city mine-answer-date">
                        <div class="inline-block">
                             <img src="../img/label.png" alt="">
                            ${change_v.area||""} ${change_v.quTrade||""}
                        </div>
                        <div class="inline-block mine-ans-sj">
                            赏金: <span class="red">${parseFloat(change_v.money).toFixed(2)||"0.00"}元</span>
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