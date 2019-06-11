$(function(){
    var msg=getUrlParms("msg");
    if(msg!=null){
        $(".apply-name").html("申请咨询师")
    }else{
        $(".apply-name").html("编辑资料")
    }
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
    if(sessionStorage.getItem("kjs_list")!=null){
        var kjs_sess=sessionStorage.getItem("kjs_list").split(","),html='';
        kjs_list=kjs_sess;
        for(var i=0;i<3;i++){
            var src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
            if(kjs_sess[i]!=null){
                src="data:image/jpeg;base64,"+kjs_sess[i];
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
    if(sessionStorage.getItem("sws_list")!=null){
        var kjs_sess=sessionStorage.getItem("sws_list").split(","),html='';
        sws_list=kjs_sess;
        for(var i=0;i<3;i++){
            var src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
            if(kjs_sess[i]!=null){
                src="data:image/jpeg;base64,"+kjs_sess[i];
                del_show="display:block";
                plus_show="out";
                img_show="visibility: visible";
            }
            html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="3">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="2">
                </div>
            `
        }
        $(".sws_list").html(html);
    }
    if(sessionStorage.getItem("ls_list")!=null){
        var kjs_sess=sessionStorage.getItem("ls_list").split(","),html='';
        ls_list=kjs_sess;
        for(var i=0;i<3;i++){
            var src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
            if(kjs_sess[i]!=null){
                src="data:image/jpeg;base64,"+kjs_sess[i];
                del_show="display:block";
                plus_show="out";
                img_show="visibility: visible";
            }
            html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="4">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="2">
                </div>
            `
        }
        $(".ls_list").html(html);
    }
    $("#goodat_mine").attr("data-msg",sessionStorage.getItem("goodat"));
    $("#personal_msg").attr("data-msg",sessionStorage.getItem("person_msg"));
    $("#case_mine").attr("data-msg",sessionStorage.getItem("case_msg")).attr("data-img",sessionStorage.getItem("case_img"));
    function get_user(data){
        console.log(data);
        var head_img='';
        if(data.headImage){
            head_img=head_src+data.headImage
        }else{

            if(sessionStorage.getItem("headImage")!=null){

                head_img="data:image/jpeg;base64,"+sessionStorage.getItem("headImage");
            }else{
                head_img="../img/user.png";
            }

        }
        $('.consultant-img').attr("src",head_img);
        if(data.realName.length<5){
            $(".username").val(data.realName||sessionStorage.getItem("realName")||"");
        }else{
            $(".username").val(sessionStorage.getItem("realName")||"");
        }
        $(".user_realname").val(data.userName||sessionStorage.getItem("userName")||"");
        $('#sex').val(data.gender);
        var province='',address='',birthday='';
        if(data.province!=null){
            province=data.province;
        }else{
            province=sessionStorage.getItem("city-picker")||"";
        }
        if(data.address!=null){
            address=data.address;
        }
        if(data.birthday!=null&&birthday!=""){
            birthday=format(data.birthday);
            $("#datetime-picker").val(birthday.split(" ")[0]||"");
        }else{
            $("#datetime-picker").val("");
        }
        $("#city-picker").val(province+" "+address);
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
        if(data.experience){
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
    ajax_nodata(http_url.url+"/user/message",get_user);
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
    $("#userimg-sel-btn").click(function(){
        $(".img-sel-model").show();
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
        };
    });
    //证书添加图片点击
    $("body").on("change",".certificate-upload-input",function(){
    // $(".certificate-upload-input").change(function(){
        var that=$(this);
        var code=that.attr("data-code");
        var file = that.get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            // console.log(e.target.result);
            that.prev().prev("img").attr("src",e.target.result).attr("data-src",e.target.result.split(",")[1]);
            that.prev().prev("img").addClass("certificate-img-show");
            that.next(".del-certificate-img").show();
            that.next(".del-certificate-img2").show();
            that.prev().hide().removeClass("on");
            if(code==1){//身份证
                sfz_list.push(e.target.result.split(",")[1]);
                that.parent().attr("data-src",e.target.result.split(",")[1]);
                if(that.hasClass("sfz_front")){
                    sessionStorage.setItem("sfz_front",e.target.result)
                }
                if(that.hasClass("sfz_back")){
                    sessionStorage.setItem("sfz_back",e.target.result)
                }
            }else if(code==2){//注册会计师
                kjs_list.push(e.target.result.split(",")[1]);
                sessionStorage.setItem("kjs_list",kjs_list);
            }else if(code==3){//税务师
                sws_list.push(e.target.result.split(",")[1]);
                sessionStorage.setItem("sws_list",sws_list);
            }else if(code==4){//律师
                ls_list.push(e.target.result.split(",")[1]);
                sessionStorage.setItem("ls_list",ls_list);
            }
        };
    });
//删除证书图片
    $("body").on("click",".del-certificate-img",function(){
        var code=$(this).attr("data-code");
        $(this).parent().children("img:first-child").attr("src","").removeClass("certificate-img-show");
        $(this).hide();
        $(this).prev().prev("div").show().removeClass("out");
        if(code==2){//注册会计师
            kjs_list.remove($(this).parent().children("img:first-child").attr("data-src"));
        }else if(code==3){//税务师
            sws_list.remove($(this).parent().children("img:first-child").attr("data-src"));
        }else if(code==4){//律师
            ls_list.remove($(this).parent().children("img:first-child").attr("data-src"));
        }
        console.log(kjs_list);
    });
    $(".del-certificate-img2").click(function(){
        $(this).parent().children("img:first-child").attr("src","").removeClass("certificate-img-show");
        $(this).hide();
        $(this).prev().prev("img").show();
        sfz_list.remove($(this).parent().children("img:first-child").attr("data-src"));
        $(this).parent().attr("data-src","");
    });
    //提交信息
    $(".send-sqzxs-msg").click(function(){
        var headImage=$(".consultant-img").attr("data-src"),
            companyName=$("#componey-name").val(),
            adep=$("#goodat_mine").attr("data-msg"),
            experience=$("#personal_msg").attr("data-msg"),
            classicalCase=$("#case_mine").attr("data-msg"),
            accountantImage=kjs_list,
            taxImage=sws_list,
            lawyerImage=ls_list,
            realName=$(".username").val(),
            userName=$(".user_realname").val(),
            sex=$("#sex").attr("data-values"),
            birthdayDate=$("#datetime-picker").val(),
            province=$("#city-picker").val().split(" ")[0],
            idCard=$("#id_card").val(),
            idCardFront=$("#id_front").attr("data-src"),
            idCardBack=$("#id_back").attr("data-src");
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
        ajax(http_url.url+"/user/counselor",{
            "headImage":headImage,
            "adep":adep,
            "companyName":companyName,
            "experience":experience,
            "classicalCase":classicalCase,
            "caseImages":caseImages,
            "accountantImage":accountantImage,
            "taxImage":taxImage,
            "lawyerImage":lawyerImage,
            "userName":userName,
            "realName":realName,
            "sex":sex,
            "birthdayDate":birthdayDate,
            "address":address,
            "province":province,
            "idCard":idCard,
            "idCardFront":idCardFront,
            "idCardBack":idCardBack
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

