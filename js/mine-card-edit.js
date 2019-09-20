$(function(){
    if(localStorage.getItem("bg")){
        var bg=localStorage.getItem("bg");
        $(".mine-card-body").css({
            "background":"url("+bg+") no-repeat 100% 100%",
            "background-size": "cover"
        });
    }
    //用户信息回显
    ajax_nodata(http_url.url+"/user/message",function(data){
        var msg=data;
        var html=`
            <div class="mine-card-head">
                <div class="mine-card-head-btn inline-block">
                    <img src="${headimage(msg.headImage)}" onerror=src="../img/user.png" alt="">
                    <img class="mine-card-head-btn-sel" src="../img/icon_renzheng_cam.png" alt="">
                    <input type="file" class="mine-card-head-btn-input">
                </div>
                 <div class="inline-block mine-card-name">
                            ${get_name(msg)}
                 </div>
                 <div class="inline-block mine-card-dj ${msg.role==2?'':'out'}">${msg.levelName}</div>
                <div class="mine-card-rz">
                        <div class="inline-block mine-card-rz-color4 ${msg.lecturer==1?'':'out'}">
                            <img src="../img/mine-card-rz4.png" alt="">
                            讲师
                        </div>
                        <div class="inline-block mine-card-rz-color3 ${msg.role==2?'':'out'}">
                            <img src="../img/mine-card-rz3.png" alt="">
                            税务师、律师
                        </div>
                        <div class="inline-block ${msg.role==3?'':'out'}">
                            <img src="../img/office-p-rz.png" alt="">
                            官方认证
                        </div>
                </div>
            </div>
            <div class="mine-card-agdress">
                <span>${msg.province}</span>
                <span class="inline-block mine-card-agdress-line ${msg.position&&msg.role!=3?'':'out'}"></span>
                <span class="${msg.role!=3?'':'out'}">${msg.position}</span>
            </div>
            <div class="mine-card-company">${msg.companyName}</div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-p.png" alt="">
                ${msg.cardPhone||msg.phone}
            </div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-m.png" alt="">
               ${msg.email||"未填写"}
            </div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-a.png" alt="">
                ${msg.officeAddress||"未填写"}
            </div>
        `;
        $(".mine-card-main").html(html);
        $(".realName").val(msg.realName).attr("data-val",msg.realName);
        $(".userName").val(msg.userName).attr("data-val",msg.userName);
        $(".city").val('').attr("data-val",'');
        $(".companyName").val(msg.companyName).attr("data-val",msg.companyName);
        $(".position").val(msg.position).attr("data-val",msg.position);
        $(".cardPhone").val(msg.cardPhone).attr("data-val",msg.cardPhone);
        $(".email").val(msg.email).attr("data-val",msg.email);
        $(".officeAddress").val(msg.officeAddress).attr("data-val",msg.officeAddress);
        if(msg.role==2&&msg.userName){
            $(".if-show").attr("checked",true);
        }
    });
    //选择背景
    $(".mine-card-bg-opt").click(function(){
        $(".mine-card-bg-opt").removeClass("mine-card-bg-opt-act").children(".mine-card-bg-opted").attr("src","../img/mine-draft-select-no.png");
        $(this).addClass("mine-card-bg-opt-act").children(".mine-card-bg-opted").attr("src","../img/mine-draft-select.png");
        var bg=$(".mine-card-bg-opt-act>.mine-card-bg-opt-show").attr("src");
        $(".mine-card-body").css({
            "background":"url("+bg+") no-repeat 100% 100%",
            "background-size": "cover"
        });
    })
});