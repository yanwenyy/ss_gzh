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
        console.log(data);
        role=data.role;
        //用户等级
        var score_img=get_score(data.integralScore,data.aision,data.vip);
        $(".other_card .user-grade").attr("src",score_img);
        if(data.role==1){
            $(".mine-tab-user").removeClass("out");
            if(data.aision==0){
                $(".hangxin_vip_card").removeClass("out");
                $(".other_card").addClass("out");
                var hangxin_img="",hangxin_date='';
                if(data.vip==0){
                    hangxin_img="../img/hangxin_vip.png";
                    hangxin_date="快速问免费 有效期至 "+format(data.vipTime).split(" ")[0];
                }else{
                    hangxin_img="../img/hangxin_vip_dateout.png";
                    hangxin_date="航信会员过期";
                }
                $(".hangxin_vip_card .mine-user-name").html(`${data.realName||"匿名用户"}
                    <div style="height: 3.6rem"><img src="${hangxin_img}" alt="" class="user-grade" ></div>
                    <div class="hangxin-date">
                        ${hangxin_date}
                    </div>`);
            }else{
                $(".hangxin_vip_card").addClass("out");
                $(".other_card").removeClass("out");
                $(".other_card .mine-user-name").html(data.realName||"匿名用户");
            }
            if(data.status==1){
                $(" .zxs-status").html("审核中")
            }else if(data.status==3){
                $(".zxs-status").html("申请咨询师")
            }
        }else if(data.role==2){
            $(".mine-tab-export").removeClass("out");
            if(data.aision==0){
                $(".hangxin_vip_card").removeClass("out");
                $(".other_card").addClass("out");
                var hangxin_img="",hangxin_date='';
                if(data.vip==0){
                    hangxin_img="../img/hangxin_vip.png";
                    hangxin_date="快速问免费 有效期至 "+format(data.vipTime).split(" ")[0];
                }else{
                    hangxin_img="../img/hangxin_vip_dateout.png";
                    hangxin_date="航信会员过期";
                }
                $(".hangxin_vip_card .mine-user-name").html(`${data.userName||"匿名用户"}
                    
                    <div class="zxs-grade inline-block">
                        <img src="../img/icon-expert icon.png" alt="">
                        <span>${data.levelName||""}</span>
                    </div>
                    <div style="height: 3.6rem"><img src="${hangxin_img}" alt="" class="user-grade " ></div>
                    <div class="hangxin-date">
                        ${hangxin_date}
                    </div>`);
            }else{
                $(".hangxin_vip_card").addClass("out");
                $(".other_card").removeClass("out");
                $(".other_card .mine-user-name").html(`${data.userName||"匿名用户"}
                    <div class="inline-block zxs-grade">
                        <img src="../img/icon-expert icon.png" alt="">
                        ${data.levelName||""}
                    </div>`);
            }
            $(".expert_name").html(data.levelName);
        }
        console.log(head_src+data.headImage)
        $(".user-head-img").attr("src",head_src+data.headImage).attr("data-role",data.role).attr("data-phone",data.phoneNumber);

    }
    ajax_nodata(http_url.url+"/user/message",get_user);
//我的会员等级
    $("body").on("click",".mine-hydj",function(){
        window.location.href="../html/mine-membership-grade.html"
    });
    //普通用户申请咨询师
    $(".zxs-status").click(function(){
        if($(this).html()!="审核中"){
            window.location.href="mine-apply-consultant.html?msg='aplay'"
        }else{
            alert("正在审核,请耐心等待")
        }
    });
    //专家点申请咨询师
    $(".expert_sq").click(function(){
        alert("您已经是咨询师!");
    });
    //编辑个人信息
    $(".mine-msg-edit").click(function(){
        if(role==1){
            window.location.href="../html/mine-personal-data.html";
        }else if(role==2){
            window.location.href="../html/mine-apply-consultant.html";
        }

    });
});