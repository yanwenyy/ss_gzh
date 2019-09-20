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
    var role='',phone;
    //待抢答个数
    ajax_nodata(http_url.url+"/question/waitquestionNum",function(data){
        $(".need-ask-num").html(data.data);
        if(data.data>0){
            $(".red_dot-365").show();
        }
    });
    function get_user(data){
        phone=data.phoneNumber;
        //咨询师认证状态
        if(data.status== 2){
            $(".e-wrz").hide();
            $(".e-yrz").show();
        }else if(data.status== 1){
            $(".e-wrz").hide();
            $(".e-shz").show();
        }
        if(data.lecturer==0&&data.role!=3){
            $(".zl-mine").hide();
        }
        if(data.studentStatus==1){
            $(".s-wrz").hide();
            $(".s-yrz").show();
        }else if(data.studentStatus==3){
            $(".s-wrz").hide();
            $(".s-shz").show();
        }else if(data.studentStatus==4){
            $(".s-wrz").hide();
            $(".s-shsb").show();
        }
        //粉丝和关注
        $(".mine-fs-num").html(data.fans);
        $(".mine-gz-num").html(data.follow);
        $(".mine-gz-sc").html(data.stores);
        //收藏,刷刷作品,喜欢
        $(".mine-brush").html(data.brushs+data.auditFailbrushs);
        $(".mine-like").html(data.praise);
        //钱包,问答金,财税问答卡余额
        if(parseFloat(data.balance).toFixed(2).length>7){
            $(".bag-money").html(parseFloat(parseFloat(data.balance).toFixed(2)/1000).toFixed(2)+"k");
        }else{
            $(".bag-money").html(parseFloat(data.balance).toFixed(2)||"0.00");
        }
        if(parseFloat(data.vipBalance).toFixed(2).length>7){
            $(".ask-money").html(parseFloat(parseFloat(data.vipBalance).toFixed(2)/1000).toFixed(2)+"k");
        }else{
            $(".ask-money").html(parseFloat(data.vipBalance).toFixed(2)||"0.00");
        }
        if(parseFloat(data.qacardBlance).toFixed(2).length>7){
            $(".qc-money").html(parseFloat(parseFloat(data.qacardBlance).toFixed(2)/1000).toFixed(2)+"k");
        }else{
            $(".qc-money").html(parseFloat(data.qacardBlance).toFixed(2)||"0.00");
        }
        // $(".bag-money").html(parseFloat(data.balance).toFixed(2)||"0.00");
        // $(".ask-money").html(parseFloat(data.vipBalance).toFixed(2)||"0.00");
        // $(".qc-money").html(parseFloat(data.qacardBlance).toFixed(2)||"0.00");
        //是否是365会员
        if(data.tsfTime!=null&&data.tsfTime!=''){
            $(".mine-365-card").attr("style","background:url('../img/365_My_vipcard.png') no-repeat;background-size:100% 100%");
            var tt=new Date().getTime();
            if(tt>data.tsfTime){
                $(".card-365-date").removeClass("out").attr("data-time",data.tsfTime).children("span").html(format(data.tsfTime).split(" ")[0]+"过期");
            }else{
                $(".card-365-date").removeClass("out").attr("data-time",data.tsfTime).children("span").html(format(data.tsfTime).split(" ")[0]+"到期");
            }
            $(".card-365-open").addClass("out");
        }
        role=data.role;
        //用户等级
        var score_img=get_score(data.integralScore,data.aision,data.vip);
        if(data.role==1){
            if(data.status==1){
                $(".new-bench-expert-apply").removeClass("out");
            }else{
                $(".new-bench-user").removeClass("out");
            }
            $(".workbench-normal").attr("data-status",data.status);
            if(data.aision==0){
                $(".mine-365-normal").addClass("out");
                $(".mine-365-hangxin").removeClass("out");
                var vip='';
                if(data.vip==0){
                    vip="快速问免费 有效期至 "+format(data.vipTime).split(" ")[0];
                }else{
                    vip="航信会员过期";
                }
                var html=`<img src="" alt="" class="user-head-img look-hp-image"  data-role="${data.role}" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div class="mine-user-name">
                                    ${data.realName||"匿名用户"}
                                </div>
                                <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                                <div class="hangxin-date-365">${vip}</div>
                            </div>
                            <!--<div class="inline-block edit-365-msg">-->
                                <!--编辑信息 <span>></span>-->
                            <!--</div>-->
                      `;
                $(".mine-365-hangxin").html(html);
            }else{
                $(".mine-365-normal").html(`
                    <img src="" alt="" class="user-head-img look-hp-image"  data-role="${data.role}" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div class="mine-user-name">
                             ${data.realName||"匿名用户"}
                        </div>
                        <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                    </div>
                    <!--<div class="inline-block edit-365-msg">-->
                        <!--编辑信息 <span>></span>-->
                    <!--</div>-->
                `)
            }
        }else if(data.role==2){
            $(".new-bench-expert").removeClass("out");
            // $(".workbench-consultant").removeClass("out");
            // $(".workbench-normal").addClass("out").attr("data-status",data.status);
            if(data.aision==0){
                $(".mine-365-normal").addClass("out");
                $(".mine-365-hangxin").removeClass("out");
                var vip='';
                if(data.vip==0){
                    vip="快速问免费 有效期至 "+format(data.vipTime).split(" ")[0];
                }else{
                    vip="航信会员过期";
                }
                var html=`<img src="" alt="" class="user-head-img look-hp-image" data-role="${data.role}" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div class="mine-user-name">
                                    ${data.userName||"匿名用户"}
                                    <div class="inline-block zxs-grade">
                                        <!--<img src="../img/icon-expert icon.png" alt="">-->
                                        ${data.levelName||""}
                                    </div>
                                </div>
                                <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                                <div class="hangxin-date-365">${vip}</div>
                            </div>
                            <!--<div class="inline-block edit-365-msg">-->
                                <!--编辑信息 <span>></span>-->
                            <!--</div>-->
                      `;
                $(".mine-365-hangxin").html(html);
            }else{
                $(".mine-365-normal").addClass("out");
                $(".mine-365-consultant").removeClass("out");
                $(".mine-365-consultant").html(`
                    <img src="" alt="" class="user-head-img look-hp-image"  data-role="${data.role}" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div class="mine-user-name">
                            ${data.userName||"匿名用户"}
                            <div class="inline-block zxs-grade">
                                <!--<img src="../img/icon-expert icon.png" alt="">-->
                                ${data.levelName||""}
                            </div>
                        </div>
                        <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                    </div>
                    <!--<div class="inline-block edit-365-msg">-->
                        <!--编辑信息 <span>></span>-->
                    <!--</div>-->
                `)
            }
        }else if(data.role==3){
            $(".mine-365-normal").addClass("out");
            $(".mine-365-consultant").removeClass("out");
            $(".index-mine-office-hidden").hide();//我的提问,资料认证隐藏
            $(".index-mine-office-show").show();
            $(".mine-like-p").addClass("out");
            $(".mine-like-office").removeClass("out");
            $(".mine-365-consultant").html(`
                    <img src="" alt="" class="user-head-img look-hp-image" data-role="${data.role}" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div class="mine-user-name">
                            ${get_name(data)}
                        </div>
                        <div><img src="../img/index-mine-office.png" alt="" class="user-grade" ></div>
                    </div>
                `)
        }
        $(".user-head-img").attr("src",headimage(data.headImage)).attr("data-role",data.role).attr("data-phone",data.phoneNumber);

    }
    ajax_nodata(http_url.url+"/user/message",get_user);
//我的会员等级
    $("body").on("click",".mine-hydj",function(){
        if($(this).attr("src")=="../img/gshy.png"||$(this).attr("src")=="../img/gshy-dateout.png"||$(this).attr("src")=="../img/hangxin_vip.png"||$(this).attr("src")=="../img/hangxin_vip_dateout.png"){
            return false;
        }else{
            window.location.href="../html/mine-membership-grade.html";
        }
    });
    //普通用户申请咨询师
    $(".workbench-normal").click(function(){
        if($(this).attr("data-status")==1){
            alert("您的咨询师认证申请正在审核中,请耐心等待!");
        }else{
            window.location.href="mine-expert-authentication.html?msg='aplay'"
        }
    });
    //编辑个人信息
    $("body").on("click",".edit-365-msg",function(){
        if(role==1){
            window.location.href="../html/mine-personal-data.html";
        }else if(role==2){
            window.location.href="../html/mine-apply-consultant.html";
        }
    });
    //365会员卡点击
    $(".mine-365-card>div").click(function(){
        if($(this).attr("data-open")!=""&&$(this).attr("data-open")!=null){
            window.location.href="mine-365-card.html?open=yes"
        }else{
            window.location.href="mine-365-card.html?time="+$(".card-365-date").attr("data-time");
        }
    });
    //365各个模块点击
    $(".m365-model-list-btn").click(function(){
        window.location.href=$(this).attr("data-url");
    });
    //私密问,消息点击
    $(".m365-dowapp").click(function(){
        alert("请下载刷刷app进行操作");
    });
    //认证点击
    $(".new-cert-apply>div>img").click(function(){
        if($(this).attr("data-status")==1){
            if($(this).hasClass("e")){
                alert("您的咨询师认证申请正在审核中,请耐心等待!")
            }else{
                alert("您的在校大学生认证申请正在审核中,请耐心等待!")
            }
        }else{
            window.location.href=$(this).attr("data-html");
        }
    });
    //喜欢和作品点击
    $(".mine-center").click(function(){
        window.location.href=$(this).attr("data-url")+"&phone="+phone;
    })
});