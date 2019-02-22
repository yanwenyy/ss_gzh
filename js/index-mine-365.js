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
    var role='';
    function get_user(data){
        $(".bag-money").html(parseFloat(data.balance).toFixed(2)||"0.00");
        $(".ask-money").html(parseFloat(data.vipBalance).toFixed(2)||"0.00");
        $(".qc-money").html(parseFloat(data.qacardBlance).toFixed(2)||"0.00");
        role=data.role;
        //用户等级
        var score_img=get_score(data.integralScore,data.aision,data.vip);
        if(data.role==1){
            if(data.aision==0){
                $(".mine-365-normal").addClass("out");
                $(".mine-365-hangxin").removeClass("out");
                var vip='';
                if(data.vip==0){
                    vip="快速问免费 有效期至 "+format(data.vipTime).split(" ")[0];
                }else{
                    vip="航信会员过期";
                }
                var html=`<img src="" alt="" class="user-head-img look-hp-image" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div class="mine-user-name">
                                    ${data.realName||"匿名用户"}
                                </div>
                                <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                                <div class="hangxin-date-365">${vip}</div>
                            </div>
                            <div class="inline-block edit-365-msg">
                                编辑信息 <span>></span>
                            </div>
                      `;
                $(".mine-365-hangxin").html(html);
            }else{
                $(".mine-365-normal").html(`
                    <img src="" alt="" class="user-head-img look-hp-image" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div class="mine-user-name">
                             ${data.realName||"匿名用户"}
                        </div>
                        <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                    </div>
                    <div class="inline-block edit-365-msg">
                        编辑信息 <span>></span>
                    </div>
                `)
            }
        }else if(data.role==2){
            $(".workbench-consultant").removeClass("out");
            $(".workbench-normal").addClass("out");
            if(data.aision==0){
                $(".mine-365-normal").addClass("out");
                $(".mine-365-hangxin").removeClass("out");
                var vip='';
                if(data.vip==0){
                    vip="快速问免费 有效期至 "+format(data.vipTime).split(" ")[0];
                }else{
                    vip="航信会员过期";
                }
                var html=`<img src="" alt="" class="user-head-img look-hp-image" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div class="mine-user-name">
                                    ${data.userName||"匿名用户"}
                                    <div class="inline-block zxs-grade">
                                        <img src="../img/icon-expert icon.png" alt="">
                                        ${data.levelName||""}
                                    </div>
                                </div>
                                <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                                <div class="hangxin-date-365">${vip}</div>
                            </div>
                            <div class="inline-block edit-365-msg">
                                编辑信息 <span>></span>
                            </div>
                      `;
                $(".mine-365-hangxin").html(html);
            }else{
                $(".mine-365-normal").addClass("out");
                $(".mine-365-consultant").removeClass("out");
                $(".mine-365-consultant").html(`
                    <img src="" alt="" class="user-head-img look-hp-image" onerror=src="../img/user.png">
                    <div class="inline-block">
                        <div class="mine-user-name">
                            ${data.userName||"匿名用户"}
                            <div class="inline-block zxs-grade">
                                <img src="../img/icon-expert icon.png" alt="">
                                ${data.levelName||""}
                            </div>
                        </div>
                        <div><img src="${score_img}" alt="" class="user-grade mine-hydj" ></div>
                    </div>
                    <div class="inline-block edit-365-msg">
                        编辑信息 <span>></span>
                    </div>
                `)
            }
        }
        $(".user-head-img").attr("src",head_src+data.headImage).attr("data-role",data.role).attr("data-phone",data.phoneNumber);

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
        window.location.href="mine-apply-consultant.html?msg='aplay'"
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
            window.location.href="mine-365-card.html"
        }
    });
    //365各个模块点击
    $(".m365-model-list-btn").click(function(){
        window.location.href=$(this).attr("data-url");
    });
    //私密问,消息点击
    $(".m365-dowapp").click(function(){
        alert("请下载航信办税宝app进行操作");
    })
});