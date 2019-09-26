$(function(){
    if(localStorage.getItem("bg")){
        var bg=localStorage.getItem("bg");
        $(".mine-card-body").css({
            "background":"url(../img/mine-card-bg"+bg+".png) no-repeat 100% 100%",
            "background-size": "cover"
        });
        $(".mine-card-bg-opt").children(".mine-card-bg-opted").attr("src","../img/mine-draft-select-no.png");
        $(".mine-card-bg-opt[data-code="+bg+"]").addClass("mine-card-bg-opt-act").children(".mine-card-bg-opted").attr("src","../img/mine-draft-select.png");
    }
    $(".card-back").click(function(){
        var edit=false;
        new Promise(function(resolve){
            resolve(edit);
        }).then((data) => {
            $(".val-check").each(function(){
                var val=$(this).val(),
                    c_val=$(this).attr("data-val");
                // console.log(val+"    &&   "+c_val);
                if(val!=c_val){
                    data=true;
                    if(confirm("是否保留此次编辑")==true){
                        sub();
                    }
                    return false;
                }
            });
            return data;
        },(err) => {

        }).then((data) => {
            if(data==false){
                window.history.go(-1);
            }
        },(err) => {
        });
    });
    //用户信息回显
    ajax_nodata(http_url.url+"/user/message",function(data){
        var msg=data;
        var html=`
            <div class="mine-card-head">
                <div class="mine-card-head-btn inline-block">
                    <img src="${headimage(msg.headImage)}" class="consultant-img office-no-edit" onerror=src="../img/user.png" alt="">
                    <img class="mine-card-head-btn-sel" src="../img/icon_renzheng_cam.png" alt="">
                    <!--<input type="file" class="mine-card-head-btn-input">-->
                </div>
                 <div class="inline-block mine-card-name">
                            ${get_name(msg)}
                 </div>
                <div class="mine-card-rz">
                        <div class="inline-block ${msg.role==3?'':'out'}">
                            <img src="../img/office-p-rz.png" alt="">
                            官方认证
                        </div>
                </div>
            </div>
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
                ${msg.officialAddress||"未填写"}
            </div>
        `;
        $(".mine-card-main").html(html);
        $(".realName").val(msg.realName).attr("data-val",msg.realName);
        $(".city").val(msg.province+" "+msg.address).attr(msg.province+" "+msg.address);
        $(".companyName").val(msg.companyName).attr("data-val",msg.companyName);
        $(".cardPhone").val(msg.cardPhone||msg.phone).attr("data-val",msg.cardPhone||msg.phone);
        $(".email").val(msg.email).attr("data-val",msg.email);
        $(".officeAddress").val(msg.officialAddress).attr("data-val",msg.officialAddress);
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
    });
    //头像点击,昵称点击
    $("body").on("click",".office-no-edit",function(){
        alert("官方账号不可修改头像和昵称，如需更换请联系客服。客服电话：155-6868-0068")
    });
    $(".mine-card-edit-sub").click(function(){
        sub();
    });
    //提交用户信息
    function sub(){
        var headImage=$(".consultant-img").attr("data-src"),
            realName=$(".realName").val(),
            province=$(".city").val().split(" ")[0],
            address='',
            cardPhone=$(".cardPhone").val(),
            email=$(".email").val(),
            officialAddress=$(".officeAddress").val();
        if(province=="北京"||province=="上海"||province=="天津"||province=="重庆"){
            address=$(".city").val().split(" ")[2];
        }else{
            address=$(".city").val().split(" ")[1];
        }
        if(province==''||officialAddress==''||cardPhone==''){
            alert("请完善信息")
        }else{
            ajax(http_url.url+"/user/editUser",{
                "headImage":headImage,
                "province":province,
                "address":address,
                "cardPhone":cardPhone,
                "email":email,
                "officialAddress":officialAddress,
                "isCard":1,
            },function(data){
                if(data.code==1){
                    alert("提交成功");
                    localStorage.setItem("bg",$(".mine-card-bg-opt-act").attr("data-code"));
                    window.history.go(-1);
                }else{
                    alert(data.msg);
                }
            });
        }
    }
});