$(function(){
    $(".back").click(function(){
        window.location.href="../html/index.html";
    });
    //快速答列表
    function get_list(data){
        // console.log(data);
        var questions=data.questions,html="";
        if(questions!=''){
            for(var i=0,len=questions.length;i<len;i++){
                var change_v=questions[i];
                var content='';
                if(change_v.content.length>40){
                    content=change_v.content.substr(0,40)+"..."
                }else{
                    content=change_v.content
                }
                var realName=get_name(change_v);
                //用户等级
                var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
                html+=`
                <div class="box-sizing" data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="money-reword">赏金:<span>${parseFloat(change_v.money).toFixed(2)}元</span></div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${format(change_v.date)}</div>
                    </div>
                </div>
            `;
            }
            $(".card-list").html(html);
        }else{
            $(".no-msg").show();
        }

    }
    function get_list_more(data){
        var questions=data.questions,html="";
        for(var i=0,len=questions.length;i<len;i++){
            var change_v=questions[i];
            var content='';
            if(change_v.content.length>40){
                content=change_v.content.substr(0,40)+"..."
            }else{
                content=change_v.content
            }
            var realName=get_name(change_v);
            //用户等级
            var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
            html+=`
                <div class="box-sizing" data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="money-reword">赏金:<span>${parseFloat(change_v.money).toFixed(2)}元</span></div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${format(change_v.date)}</div>
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