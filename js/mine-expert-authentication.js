$(function(){
    var msg=getUrlParms("msg");
    if(msg!=null){
        $(".apply-name").html("申请咨询师")
    }else{
        $(".apply-name").html("编辑资料")
    }
    $(".back").click(function(){
        window.location.href="index-mine.html";
        sessionStorage.removeItem("expert_msg");
    });
    var kjs_list=[],ls_list=[],sws_list=[],sfz_list=[],expert_msg=JSON.parse(sessionStorage.getItem("expert_msg"))||'';
   console.log(expert_msg);
    function get_user(data){
        // console.log(data);
        var head_img='';
        //咨询师认证状态
        if(data.status== 2){
            $(".release").attr("data-type","again");
            $(".wrz").hide();
            $(".wrz-list").hide();
            $(".rzcg").show();
        }else if(data.status== 3){
            $(".wrz").hide();
            $(".rzsb").show();
            $(".rzsb-reson").html(data.aduitReason);
            $(".recertification-btn-sub").html("重新认证");
            $(".release").hide();
        }else if(data.status==null||data.status==''){
            $(".release").hide();
        }
        if(data.headImage){
            head_img=headimage(data.headImage);
            $('.consultant-img').attr("src",head_img);
        }else{
            if(expert_msg.headImage!=null){
                head_img="data:image/jpeg;base64,"+expert_msg.headImage;
            }else{
                head_img="../img/user.png";
            }
            $('.consultant-img').attr("src",head_img).attr("data-src",expert_msg.headImage);
        }
        if(data.userName){
            $(".user_realname").val(data.userName);
        }else{
            if(expert_msg.userName!=null){
                $(".user_realname").val(expert_msg.userName);
            }
        }
        if(data.realName){
            $(".username").val(data.realName);
        }else{
            if(expert_msg.realName!=null){
                $(".username").val(expert_msg.realName);
            }
        }
        if(data.gender){
            // $("#sex").val(data.gender);
            $(".sex-radio").attr("src",'../img/channel-card-select-no.png');
            $(".sex-radio[data-msg="+data.gender+"]").attr("src","../img/channel-card-select.png");
        }else{
            if(expert_msg.sex!=null){
                // $("#sex").val(expert_msg.sex);
                $(".sex-radio").attr("src",'../img/channel-card-select-no.png');
                $(".sex-radio[data-msg="+expert_msg.sex+"]").attr("src","../img/channel-card-select.png");
            }
        }
        var province='',address='',birthday='';
        if(data.province!=null){
            province=data.province;
        }else{
            if(expert_msg.city_picker!=null){
                province=expert_msg.city_picker;
            }
        }
        if(data.address!=null){
            address=data.address;
        }
        $("#city-picker").val(province+" "+address);
        if(data.idCard){
            $("#id_card").val(data.idCard);
        }else{
            if(expert_msg.id_card!=null){
                $("#id_card").val(expert_msg.id_card);
            }
        }
        if(data.trade){
            $("#hy").val(data.trade);
        }else{
            if(expert_msg.hy!=null){
                $("#hy").val(expert_msg.hy);
            }
        }
        if(data.position){
            $("#mine-duty").val(data.position);
        }else{
            if(expert_msg.mine_duty!=null){
                $("#mine-duty").val(expert_msg.mine_duty);
            }
        }
        if(data.companyName){
            $("#componey-name").val(data.companyName);
        }else{
            if(expert_msg.componey_name!=null){
                $("#componey-name").val(expert_msg.componey_name);
            }
        }
        if(data.adepts){
            var adepts=[];
            for(var k in data.adepts){
                adepts.push(k);
            }
            $("#goodat_mine").attr("data-msg",adepts).val("已填");
        }else{
            if(expert_msg.goodat_mine!=null){
                $("#goodat_mine").val("已填").attr("data-msg",expert_msg.goodat_mine);
            }
        }
        if(data.experience){
            $("#personal_msg").attr("data-msg",data.experience).val("已填");
        }else{
            if(expert_msg.personal_msg!=null){
                $("#personal_msg").val("已填").attr("data-msg",expert_msg.personal_msg);
            }
        }
        if(data.idCardFront){
            $("#id_front").attr("src",cert_src+data.idCardFront).addClass("certificate-img-show");
            $("#id_front").next(".certificate-upload-div").hide();
            $("#id_front").next().next().next(".del-certificate-img2").show();
        }else if(expert_msg.sfz_front!=null){
            // console.log(sessionStorage.getItem("sfz_front"));
            $("#id_front").attr("src","data:image/jpeg;base64,"+expert_msg.sfz_front).attr("data-src",expert_msg.sfz_front).addClass("certificate-img-show")
            $("#id_front").next(".certificate-upload-div").hide();
            $("#id_front").next().next().next(".del-certificate-img2").show();
        }
        if(data.idCardBack){
            $("#id_back").attr("src",cert_src+data.idCardBack).addClass("certificate-img-show");
            $("#id_back").next(".certificate-upload-div").hide();
            $("#id_back").next().next().next(".del-certificate-img2").show();
        }else if(expert_msg.sfz_back!=null){
            // console.log(sessionStorage.getItem("sfz_front"));
            $("#id_back").attr("src","data:image/jpeg;base64,"+expert_msg.sfz_back).attr("data-src",expert_msg.sfz_back).addClass("certificate-img-show")
            $("#id_back").next(".certificate-upload-div").hide();
            $("#id_back").next().next().next(".del-certificate-img2").show();
        }
        if(data.accountants){
            var html='';
            for(var i=0;i<3;i++){
                var index='',src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
                if(data.accountants[i]!=null){
                    src=cert_src+data.accountants[i];
                    del_show="display:block";
                    plus_show="out";
                    img_show="visibility: visible";
                    kjs_list[i]="0";
                    index=i;
                }
                html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}" ></div>
                    <input type="file"  class="certificate-upload-input ${data.status==2?'recertification':''}" data-index="${index}"  data-code="2">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png"  data-index="${index}" alt="" class="del-certificate-img ${index!==''?'recertification-close':''}" data-code="2">
                </div>
            `
            }
            $(".kjs_list").html(html);

        }else if(expert_msg.kjs_list!=''&&expert_msg.kjs_list!=null){
            var kjs_sess=expert_msg.kjs_list,html='';
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
                    <img src="${src}" alt="" style="${img_show}" data-src="${kjs_sess[i]}">
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
                var index='',src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
                if(data.taxs[i]!=null){
                    src=cert_src+data.taxs[i];
                    del_show="display:block";
                    plus_show="out";
                    img_show="visibility: visible";
                    sws_list[i]="0";
                    index=i;
                }
                html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input  ${data.status==2?'recertification':''}" data-index="${index}"  data-code="3">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png"  data-index="${index}" alt="" class="del-certificate-img ${index!==''?'recertification-close':''}" data-code="3">
                </div>
            `
            }
            $(".sws_list").html(html);
        }else if(expert_msg.sws_list!=''&&expert_msg.sws_list!=null){
            var kjs_sess=expert_msg.sws_list,html='';
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
                    <img src="${src}" alt="" style="${img_show}" data-src="${kjs_sess[i]}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="3">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="3">
                </div>
            `
            }
            $(".sws_list").html(html);
        }
        if(data.lawyers){
            var html='';
            for(var i=0;i<3;i++){
                var index='',src='',del_show='display:none',plus_show='on',img_show="visibility:hidden";
                if(data.lawyers[i]!=null){
                    src=cert_src+data.lawyers[i];
                    del_show="display:block";
                    plus_show="out";
                    img_show="visibility: visible";
                    ls_list[i]="0";
                    index=i;
                }
                html+=`
                <div  class="inline-block certificate-upload-total">
                    <img src="${src}" alt="" style="${img_show}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input  ${data.status==2?'recertification':''}"  data-index="${index}"  data-code="4">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png"  data-index="${index}" alt="" class="del-certificate-img ${index!==''?'recertification-close':''}" data-code="4">
                </div>
            `
            }
            $(".ls_list").html(html);
        }else if(expert_msg.ls_list!=''&&expert_msg.ls_list!=null){
            var kjs_sess=expert_msg.ls_list,html='';
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
                    <img src="${src}" alt="" style="${img_show}"  data-src="${kjs_sess[i]}">
                    <div class="certificate-upload-div ${plus_show}"></div>
                    <input type="file"  class="certificate-upload-input"  data-code="4">
                    <img style="${del_show}" src="../img/icon-index-ask-close.png" alt="" class="del-certificate-img" data-code="4">
                </div>
            `
            }
            $(".ls_list").html(html);
        }
        if(data.status== 2){
            $(".recertification").attr("disabled",true);//禁用按钮
            $(".recertification-close").hide();//删除照片按钮隐藏
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
    $(".sex-radio").click(function(){
        $(".sex-radio").attr("src","../img/channel-card-select-no.png");
        $(this).attr("src","../img/channel-card-select.png");
    });
    //税种,专题列表
    function get_sz(data){
        // console.log(data);
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
            }else if(code==2){//注册会计师
                if(that.attr("data-index")){
                    kjs_list[that.attr("data-index")]=e.target.result.split(",")[1];
                }else{
                    kjs_list.push(e.target.result.split(",")[1]);
                }
            }else if(code==3){//税务师
                if(that.attr("data-index")){
                    sws_list[that.attr("data-index")]=e.target.result.split(",")[1];
                }else{
                    sws_list.push(e.target.result.split(",")[1]);
                }
            }else if(code==4){//律师
                if(that.attr("data-index")){
                    ls_list[that.attr("data-index")]=e.target.result.split(",")[1];
                }else{
                    ls_list.push(e.target.result.split(",")[1]);
                }
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
            if($(this).attr("data-index")){
                kjs_list[$(this).attr("data-index")]="1";
            }else{
                kjs_list.remove($(this).parent().children("img:first-child").attr("data-src"));
            }
        }else if(code==3){//税务师
            if($(this).attr("data-index")){
                sws_list[$(this).attr("data-index")]="1";
            }else{
                sws_list.remove($(this).parent().children("img:first-child").attr("data-src"));
            }
            console.log(sws_list);
        }else if(code==4){//律师
            if($(this).attr("data-index")){
                ls_list[$(this).attr("data-index")]="1";
            }else{
                ls_list.remove($(this).parent().children("img:first-child").attr("data-src"));
            }
            console.log(ls_list);
        }
    });
    $(".del-certificate-img2").click(function(){
        $(this).parent().children("img:first-child").attr("src","").attr("data-src","").removeClass("certificate-img-show");
        $(this).hide();
        $(this).prev().prev("img").show();
        sfz_list.remove($(this).parent().children("img:first-child").attr("data-src"));
        $(this).parent().attr("data-src","");
    });
    //重新认证点击
    $(".release").click(function(){
        $(this).hide();
        $(".recertification").attr("disabled",false);//禁用按钮
        $(".recertification-close").show();//删除照片按钮出现
        $(".recertification-btn-sub").html("重新认证");
        $(".recertification-btn").show();
    });
    //提交信息
    $(".sub_msg").click(function(){
        // for(var i=0,len=kjs_list.length;i<len;i++){
        //     if(kjs_list[i].indexOf("showImg/cert")!=-1){
        //         var hc=kjs_list[i];
        //         main(hc,function(base64){
        //             kjs_list.push(base64.split(",")[1]);
        //             return kjs_list;
        //         });
        //         kjs_list.remove(kjs_list[i]);
        //     }
        // }
        // console.log(kjs_list);
        var headImage=$(".consultant-img").attr("data-src"),
            companyName=$("#componey-name").val(),
            trade=$("#hy").val(),
            adep=$("#goodat_mine").attr("data-msg"),
            experience=$("#personal_msg").attr("data-msg"),
            classicalCase=$("#case_mine").attr("data-msg"),
            accountantImage=kjs_list,
            taxImage=sws_list,
            lawyerImage=ls_list,
            realName=$(".username").val(),
            userName=$(".user_realname").val(),
            sex=$(".sex-radio[src='../img/channel-card-select.png']").attr("data-code"),
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
                sessionStorage.removeItem("expert_msg");
                sessionStorage.removeItem("base64")
                ajax(http_url.url+"/pay/companyEnveloeps",{"redType":"personalInfo"},function(data){
                    console.log(data);
                });
                window.location.href="index-mine.html";
            }else{
                alert(data.des);
            }
        }
        if($(".rzxy-aut").get(0).checked===false){
            alert("请勾选入驻协议");
        }else if(idCardFront==''){
            alert("请上传身份证正面图片");
        }else if(idCardBack==''){
            alert("请上传身份证反面图片");
        }else{
            if($(this).html()=="重新认证"){
                if(confirm("审核期间，您的咨询师权益将被暂停。是否继续提交?")==true){
                    ajax(http_url.url+"/user/wx/apply/counselor",{
                        "headImage":headImage,
                        "adep":adep,
                        "companyName":companyName,
                        "trade":trade,
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
                }
            }else{
                ajax(http_url.url+"/user/wx/apply/counselor",{
                    "headImage":headImage,
                    "adep":adep,
                    "companyName":companyName,
                    "trade":trade,
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
            }
        }

    });
    //跳转页面点击
    $(".consultant_a").click(function(){
        var a_href=$(this).attr("data-href");
        // console.log(kjs_list);
        var expert_msg={
            "headImage":$(".consultant-img").attr("data-src"),
            "sex":$("#sex").val(),
            "userName":$(".user_realname").val(),
            "realName":$(".username").val(),
            "city_picker":$("#city-picker").val(),
            "id_card":$("#id_card").val(),
            "componey_name":$("#componey-name").val(),
            "hy":$("#hy").val(),
            "mine_duty":$("#mine-duty").val(),
            "goodat_mine":$("#goodat_mine").attr("data-msg"),
            "personal_msg":$("#personal_msg").attr("data-msg"),
            "sfz_front":$("#id_front").attr("data-src"),
            "sfz_back":$("#id_back").attr("data-src"),
            "kjs_list":kjs_list,
            "sws_list":sws_list,
            "ls_list":ls_list
        };
        sessionStorage.setItem("expert_msg",JSON.stringify(expert_msg));
        window.location.href=a_href;
    });
    //了解特权点击
    $(".know-tq").click(function(){
        var expert_msg={
            "headImage":$(".consultant-img").attr("data-src"),
            "sex":$("#sex").val(),
            "userName":$(".user_realname").val(),
            "realName":$(".username").val(),
            "city_picker":$("#city-picker").val(),
            "id_card":$("#id_card").val(),
            "componey_name":$("#componey-name").val(),
            "hy":$("#hy").val(),
            "mine_duty":$("#mine-duty").val(),
            "goodat_mine":$("#goodat_mine").attr("data-msg"),
            "personal_msg":$("#personal_msg").attr("data-msg"),
            "sfz_front":$("#id_front").attr("data-src"),
            "sfz_back":$("#id_back").attr("data-src"),
            "kjs_list":kjs_list,
            "sws_list":sws_list,
            "ls_list":ls_list
        };
        sessionStorage.setItem("expert_msg",JSON.stringify(expert_msg));
        window.location.href="expert-privilege.html"
    });
    //图片转base64
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");  // 可选其他值 image/jpeg
        return dataURL;
    }
    function main(src, cb) {
        var image = new Image();
        image.src = src + '?v=' + Math.random(); // 处理缓存
        image.crossOrigin = "*";  // 支持跨域图片
        // image.setAttribute("data-src",'');
        image.onload = function(){
            // console.log(src);
            var base64 = getBase64Image(image);
            image.src=base64;
            sessionStorage.removeItem("base64");
            sessionStorage.setItem("base64",base64);
            // image.setAttribute("data-src",base64); // 处理缓存
            cb && cb(base64);
        };
        // return image;
    };
});

