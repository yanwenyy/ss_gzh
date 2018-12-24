$(function(){
    $(".back").click(function(){
        window.location.href="../html/index.html";
    });
    //快速答列表
    function get_list(data){
        console.log(data);
        var questions=data.questions,html="";
        for(var i=0;i<questions.length;i++){
            var content='';
            if(questions[i].content.length>40){
                content=questions[i].content.substr(0,40)+"..."
            }else{
                content=questions[i].content
            }
            var realName=get_name(questions[i]);
            //用户等级
            var score_img=get_score(questions[i].integralScore,questions[i].aision,questions[i].vip);
            html+=`
                <div class="box-sizing" data-id="${questions[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+questions[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="money-reword">赏金:<span>${parseFloat(questions[i].money).toFixed(2)}元</span></div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${format(questions[i].date)}</div>
                    </div>
                </div>
            `;
        }
        $(".card-list").html(html);
    }
    function get_list_more(data){
        var questions=data.questions,html="";
        for(var i=0;i<questions.length;i++){
            var content='';
            if(questions[i].content.length>40){
                content=questions[i].content.substr(0,40)+"..."
            }else{
                content=questions[i].content
            }
            var realName=get_name(questions[i]);
            //用户等级
            var score_img=get_score(questions[i].integralScore,questions[i].aision,questions[i].vip);
            html+=`
                <div class="box-sizing" data-id="${questions[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+questions[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="money-reword">赏金:<span>${parseFloat(questions[i].money).toFixed(2)}元</span></div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${format(questions[i].date)}</div>
                    </div>
                </div>
            `;
        }
        $(".card-list").append(html);
    }
    ajax(http_url.url+"/question/pageList",{"sinceId":count_start,
        "maxId":count_end},get_list);
    scroll_more(http_url.url+"/question/pageList",{"sinceId":count_start,
        "maxId":count_end},get_list_more);
    $("body").on("click",".card-list>div",function(){
        var id=$(this).attr("data-id");
        window.location.href="answer-detail.html?id="+id;
    })
});