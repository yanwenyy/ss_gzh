$(function(){
    //获取列表
    function get_list(data){
        console.log(data);
        var questions=data.questions,html="";
        if(questions==""){
            $(".none-msg").show();
        }
        for(var i=0;i<questions.length;i++){
            var status="",status_time='';
            if(questions[i].status==1){
                status="未采纳";
                status_time=questions[i].endDate;
            }if(questions[i].status==2){
                status="未采纳";
            }else if(questions[i].status==3){
                status="已采纳";
            }else if(questions[i].status==4){
                status="已采纳";
            }else if(questions[i].status==5){
                status="未采纳";
            }else if(questions[i].status==6){
                status="已退款";
            }else if(questions[i].status==7){
                status="退款异常";
            }else if(questions[i].status==8){
                status="退款异常";
            }
            var content=questions[i].content;
            if(questions[i].content.length>40){
                content=questions[i].content.substr(0,40)+"...";
            }
            html+=`
            <div class="mine-f-q-list box-sizing"  data-id="${questions[i].uuid}" data-status="${questions[i].status}">
                <div>
                    <div class="inline-block">${format(questions[i].date)}</div>
                    <div class="inline-block red time-msg" data-time="${status_time}">${status}</div>
                </div>
                <div class="box-sizing">${content}</div>
                <div>
                    <div class="inline-block">
                        <img src="../img/label.png" alt="">
                       <div class="inline-block">${questions[i].area||""} ${questions[i].quTrade||""}</div>
                    </div>
                    <div class="inline-block">赏金: <span class="red">${parseFloat(questions[i].money).toFixed(2)}元</span></div>
                </div>
            </div>
            `;
        }
        $(".mine-free-ques").html(html);
        setInterval(function(){
            $(".time-msg").each(function(){
                var that=$(this);
                if(that.attr("data-time")){
                    that.html(get_djs($(this).attr("data-time")));
                    //console.log(get_djs($(this).attr("data-time")))
                }
            })
        },1000);
    }
    function get_list_more(data){
        console.log(data);
        var questions=data.questions,html="";
        if(questions!=""){
            for(var i=0;i<questions.length;i++){
                var status="",status_time='';
                if(questions[i].status==1){
                    status="未采纳";
                    status_time=questions[i].endDate;
                }if(questions[i].status==2){
                    status="未采纳";
                }else if(questions[i].status==3){
                    status="已采纳";
                }else if(questions[i].status==4){
                    status="已采纳";
                }else if(questions[i].status==5){
                    status="未采纳";
                }else if(questions[i].status==6){
                    status="已退款";
                }else if(questions[i].status==7){
                    status="退款异常";
                }else if(questions[i].status==8){
                    status="退款异常";
                }
                var content=questions[i].content;
                if(questions[i].content.length>40){
                    content=questions[i].content.substr(0,40)+"...";
                }
                html+=`
            <div class="mine-f-q-list box-sizing"  data-id="${questions[i].uuid}"  data-status="${questions[i].status}">
                <div>
                    <div class="inline-block">${format(questions[i].date)}</div>
                    <div class="inline-block red">${status}</div>
                </div>
                <div class="box-sizing">${content}</div>
                <div>
                    <div class="inline-block">
                        <img src="../img/label.png" alt="">
                       <div class="inline-block">${questions[i].area||""} ${questions[i].quTrade||""}</div>
                    </div>
                    <div class="inline-block">赏金: <span class="red">${parseFloat(questions[i].money).toFixed(2)}元</span></div>
                </div>
            </div>
            `;
            }
            $(".mine-free-ques").append(html);
            setInterval(function(){
                $(".time-msg").each(function(){
                    var that=$(this);
                    if(that.attr("data-time")){
                        that.html(get_djs($(this).attr("data-time")));
                        //console.log(get_djs($(this).attr("data-time")))
                    }
                })
            },1000);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/question/admireList",{"sinceId":count_start,"maxId":count_end},get_list);
    scroll_more(http_url.url+"/question/admireList",{"sinceId":count_start,"maxId":count_end},get_list_more);
    $("body").on("click",".mine-f-q-list",function(){
        var id=$(this).attr("data-id");
        window.location.href="mine-free-question-detail.html?id="+id+"&&status="+$(this).attr("data-status");
    })
});
function get_djs(endTime){
    //取设定的活动结束时间距1970年1月1日之间的毫秒数
    var time_string="";
    var end=endTime;
//取当前时间距1970年1月1日之间的毫秒数
    var nowTime=new Date().getTime();
//结束时间与当前时间之间的毫秒差
    var difference=Number(end-nowTime);
    // console.log(nowTime);
    if (difference>0) {
//将毫秒差换算成天数
        days=Math.floor(difference/86400000);
        difference=difference-days*86400000;
//换算成小时
        hours=Math.floor(difference/3600000);
        difference=difference-hours*3600000;
//换算成分钟
        minutes=Math.floor(difference/60000);
        difference=difference-minutes*60000;
//换算成秒数
        seconds=Math.floor(difference/1000);
//不足10时，进行补零操作
        if(hours<10){
            hours="0"+hours;
        }
        if(minutes<10){
            minutes="0"+minutes;
        }
        if(seconds<10){
            seconds="0"+seconds;
        }
        // $(".tis1").html(days);
        // $(".tis3").html(hours);
        // $(".tis5").html(minutes);
        // $(".tis7").html(seconds);
        time_string="倒计时: "+hours+":"+minutes+":"+seconds;
    } else {
//设定若是过了设置的活动结束时间，全部写成0天0时0分0秒
//                 $(".tis1").html(0);
//                 $(".tis3").html(0);
//                 $(".tis5").html(0);
//                 $(".tis7").html(0);
        time_string="未采纳";
    }
    return time_string;
}
