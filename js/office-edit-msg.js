$(function(){
    var msg=getUrlParms("msg"),grjl=getUrlParms("grjl");
    ajax_nodata(http_url.url+"/user/message",get_user);
    var kjs_list=[],ls_list=[],sws_list=[],sfz_list=[];
    if(sessionStorage.getItem("goodat")!=null){
        $("#goodat_mine").val("已填")
    }if(sessionStorage.getItem("person_msg")!=null){
        $("#personal_msg").val("已填")
    }if(sessionStorage.getItem("case_msg")!=null){
        $("#case_mine").val("已填")
    }if(sessionStorage.getItem("headImage")!=null){
        $(".consultant-img").attr("src","data:image/jpeg;base64,"+sessionStorage.getItem("headImage")).attr("data-src",sessionStorage.getItem("headImage"));
    }if(sessionStorage.getItem("city-picker")!=null){
        $("#city-picker").val(sessionStorage.getItem("city-picker"));
    }if(sessionStorage.getItem("userName")!=null){
        $(".user_realname").val(sessionStorage.getItem("userName"))
    }
    if(sessionStorage.getItem("realName")!=null){
        $(".username").val(sessionStorage.getItem("realName"))
    }
    $("#goodat_mine").attr("data-msg",sessionStorage.getItem("goodat"));
    $("#personal_msg").attr("data-msg",sessionStorage.getItem("person_msg"));
    $("#case_mine").attr("data-msg",sessionStorage.getItem("case_msg")).attr("data-img",sessionStorage.getItem("case_img"));
    function get_user(data){
        // console.log(data);
        if(data.role==3){
            $(".apply-office").attr("readonly",true);
            $(".apply-office-img").attr("id","");
        }
        var head_img='';
        if(data.headImage){
            head_img=headimage(data.headImage);
        }else{

            if(sessionStorage.getItem("headImage")!=null){

                head_img="data:image/jpeg;base64,"+sessionStorage.getItem("headImage");
            }else{
                head_img="../img/user.png";
            }

        }
        $('.userimg-look').attr("src",head_img);
        // $('.consultant-img').attr("src",head_img);
        if(data.realName.length<5){
            $(".username").val(data.realName||sessionStorage.getItem("realName")||"");
        }else{
            $(".username").val(data.realName||sessionStorage.getItem("realName")||"");
        }
        $(".user_realname").val(data.userName||sessionStorage.getItem("userName")||"");
        // $('#sex').val(data.gender);
        $(".sex-radio").attr("src",'../img/channel-card-select-no.png');
        $(".sex-radio[data-msg="+data.gender+"]").attr("src","../img/channel-card-select.png");
        var province='',address='',birthday='';
        if(data.province!=null){
            province=data.province;
        }else{
            province=sessionStorage.getItem("city-picker")||"";
        }
        if(data.address!=null){
            address=data.address;
        }
        if(data.birthday!=null&&data.birthday!=""){
            birthday=format(data.birthday);
            $("#datetime-picker").val(birthday.split(" ")[0]||"");
        }else{
            $("#datetime-picker").val("未设置");
        }
        var pa=province+" "+address;
        if(province==''&&address==''){
            pa=""
        }
        $("#city-picker").val(pa);
        $("#hy").val(data.trade||"");
        $("#mine-duty").val(data.position||"");
        $("#componey-name").val(data.companyName||"");
        if(data.adepts){
            var adepts=[];
            for(var k in data.adepts){
                adepts.push(k);
            }
            $("#goodat_mine").attr("data-msg",adepts).val("已填");
            sessionStorage.setItem("goodat",adepts);
        }
        if(data.experience&&grjl==null){
            $("#personal_msg").attr("data-msg",data.experience).val("已填");
            sessionStorage.setItem("person_msg",data.experience);
        }
        if(data.classicalCase){
            $("#case_mine").attr("data-msg",data.classicalCase).val("已填");
            sessionStorage.setItem("case_msg",data.classicalCase);
        }
        if(data.cases){//不可以传图片名字
            $("#case_mine").attr("data-img",data.cases);
        }
        $("#id_card").val(data.idCard||"");
        if(data.idCardFront){
            $("#id_front").attr("src",cert_src+data.idCardFront).addClass("certificate-img-show");
            $("#id_front").next(".certificate-upload-div").hide();
            $("#id_front").next().next().next(".del-certificate-img2").show();
        }else if(sessionStorage.getItem("sfz_front")!=null){
            // console.log(sessionStorage.getItem("sfz_front"));
            $("#id_front").attr("src",sessionStorage.getItem("sfz_front")).attr("data-src",sessionStorage.getItem("sfz_front").split(",")[1])
        }
        if(data.idCardFront){
            $("#id_back").attr("src",cert_src+data.idCardBack).addClass("certificate-img-show");
            $("#id_back").next(".certificate-upload-div").hide();
            $("#id_back").next().next().next(".del-certificate-img2").show();
        }else if(sessionStorage.getItem("sfz_back")!=null){
            // console.log(sessionStorage.getItem("sfz_front"));
            $("#id_back").attr("src",sessionStorage.getItem("sfz_back")).attr("data-src",sessionStorage.getItem("sfz_back").split(",")[1])
        }
        if(data.accountants){
            var html='';
            for(var i=0;i<3;i++){
                var src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
                if(data.accountants[i]!=null){
                    src=cert_src+data.accountants[i];
                    del_show="display:block";
                    plus_show="out";
                    img_show="visibility: visible";
                }
                html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="2">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="2">
                </div>
            `
            }
            $(".kjs_list").html(html);
        }
        if(data.taxs){
            var html='';
            for(var i=0;i<3;i++){
                var src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
                if(data.taxs[i]!=null){
                    src=cert_src+data.taxs[i];
                    del_show="display:block";
                    plus_show="out";
                    img_show="visibility: visible";
                }
                html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="2">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="2">
                </div>
            `
            }
            $(".sws_list").html(html);
        }
        if(data.lawyers){
            var html='';
            for(var i=0;i<3;i++){
                var src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
                if(data.lawyers[i]!=null){
                    src=cert_src+data.lawyers[i];
                    del_show="display:block";
                    plus_show="out";
                    img_show="visibility: visible";
                }
                html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="2">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="2">
                </div>
            `
            }
            $(".ls_list").html(html);
        }
    }
    //性别
    $("#sex").select({
        items: [
            {
                title: "男",
                value: "1"},
            {
                title: "女",
                value: "2"}
        ],
        onClose:function(){
            // alert(11)
        }
    });
    $(".sex-radio").click(function(){
        $(".sex-radio").attr("src","../img/channel-card-select-no.png");
        $(this).attr("src","../img/channel-card-select.png");
    });

    //税种,专题列表
    function get_sz(data){
        console.log(data);
        var categorys=data.categorys,
            industry=categorys[0].children,list=[],list_item={};
        for(var i=0;i<industry.length;i++){
            list_item={title:industry[i].name,value:industry[i].uuid};
            list.push(list_item);
        }
        //企业名称
        $("#hy").select({
            items: list
        });
    }
    ajax_nodata(http_url.url+"/category/tree",get_sz);
// //企业名称
//     $("#componey-name").select({
//         items: ["机械制造业", "房地产业","金融业"],
//         onClose:function(){
//             // alert(11)
//         }
//     });
// //出生日期
//     $("#datetime-picker").calendar();

    //头像点击
    $(".apply-office-img").click(function(){
        if($(this).attr("id")!=''){
            $(".img-sel-model").show();
        }else{
            alert("官方账号不可修改头像和昵称，如需更换请联系客服。客服电话：010-57797977");
        }
    });
    $(".apply-office").click(function(){
        alert("官方账号不可修改头像和昵称，如需更换请联系客服。客服电话：010-57797977");
    });
    $(".img-sel-model-close").click(function(){
        $(".img-sel-model").hide();
    });
    $(".mine-user-img-sel-btn").change(function () {
        var file = $('.mine-user-img-sel-btn').get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            //console.log(e.target.result);
            $(".consultant-img").attr("src",e.target.result).attr("data-src",e.target.result.split(",")[1]);
            $(".img-sel-model").hide();
        };
    });
    $(".mine-user-img-sel-btn2").change(function () {
        var file = $('.mine-user-img-sel-btn2').get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            //console.log(e.target.result);
            $(".consultant-img").attr("src",e.target.result).attr("data-src",e.target.result.split(",")[1]);
            $(".img-sel-model").hide();
            $(".img-sel-model").hide();
        };
    });
    //提交信息
    $(".release").click(function(){
        var headImage=$(".consultant-img").attr("data-src"),
            companyName=$("#componey-name").val(),
            adep=$("#goodat_mine").attr("data-msg"),
            experience=$("#personal_msg").attr("data-msg"),
            realName=$(".username").val(),
            userName=$(".user_realname").val(),
            sex=$(".sex-radio[src='../img/channel-card-select.png']").attr("data-code"),
            birthdayDate=$("#datetime-picker").val(),
            trade=$("#hy").val(),
            position=$("#mine-duty").val(),
            province=$("#city-picker").val().split(" ")[0];
        if($("#case_mine").attr("data-img")){
            var caseImages=$("#case_mine").attr("data-img").split(",");
        }
        if(province=="北京"||province=="上海"||province=="天津"||province=="重庆"){
            var address=$("#city-picker").val().split(" ")[2];
        }else{
            var address=$("#city-picker").val().split(" ")[1];
        }
        //console.log(address);
        // if(headImage==""||companyName==""||adep==""||experience==""||classicalCase==""||
        //     caseImages==""||accountantImage==""||taxImage==""||taxImage==""||lawyerImage==""||
        //     realName==""|| sex==""||birthdayDate==""||address==""||province==""||idCard==""||
        //     idCardFront==""||idCardBack==""){
        //     alert("请完善信息")
        // }
        function sub_list(data){
            console.log(data);
            if(data.code==1){
                alert(data.des);
                sessionStorage.removeItem("sex");
                sessionStorage.removeItem("city-picker");
                sessionStorage.removeItem("datetime-picker");
                sessionStorage.removeItem("hy");
                sessionStorage.removeItem("goodat");
                sessionStorage.removeItem("person_msg");
                sessionStorage.removeItem("case_msg");
                ajax(http_url.url+"/pay/companyEnveloeps",{"redType":"personalInfo"},function(data){
                    console.log(data);
                });
                window.location.href="index-mine.html";
            }else{
                alert(data.des);
            }
        }
        ajax(http_url.url+"/user/editUser",{
            "headImage":headImage,
            "adept":adep,
            "companyName":companyName,
            "experience":experience,
            "userName":userName,
            "sex":sex,
            "birthdayDate":birthdayDate,
            "address":address,
            "province":province,
            "role":2,
            "trade":trade,
            "position":position
        },sub_list)
    });
    $("#sex").val(sessionStorage.getItem("sex"));
    $("#city-picker").val(sessionStorage.getItem("city-picker"));
    $("#datetime-picker").val(sessionStorage.getItem("datetime-picker"));
    $("#hy").val(sessionStorage.getItem("hy"));
    //跳转页面点击
    $(".consultant_a").click(function(){
        var a_href=$(this).attr("data-href");
        sessionStorage.setItem("headImage",$(".consultant-img").attr("data-src"));
        sessionStorage.setItem("sex",$("#sex").val());
        sessionStorage.setItem("userName",$(".user_realname").val());
        sessionStorage.setItem("realName",$(".username").val());
        sessionStorage.setItem("city-picker",$("#city-picker").val());
        sessionStorage.setItem("datetime-picker",$("#datetime-picker").val());
        sessionStorage.setItem("hy",$("#hy").val());
        window.location.href=a_href;
    })
});

