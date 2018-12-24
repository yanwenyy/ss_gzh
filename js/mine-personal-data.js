$(function(){
    var username=decodeURI(getUrlParms("personaelz-username")),realname=decodeURI(getUrlParms("personael-realname"));
    //用户信息
    function get_user(data){
        console.log(data);
        $(".userimg-look").attr("src",head_src+data.headImage);
        if($(".userimg-look").attr("src")==""){
            $(".userimg-look").attr("style","opacity:0;")
        }
        // if(realname==""||realname==null){
        //     $(".username").val(data.realName);
        // }else{
        //     $(".username").html(realname);
        // }
        // if(username==""||username==null){
        //     $(".user_realname").val(data.userName);
        // }else{
        //     $(".user_realname").html(username);
        // }
        $(".username").val(data.realName);
        $(".user_realname").val(data.userName);
        $("#sex").val(data.gender);
        var province,address;
        if(data.province!=null){
            province=data.province
        }else{
            province=""
        }
        if(data.address!=null){
            address=data.address
        }else{
            address=""
        }
        $("#city-picker").val(province+" "+address);
        $("#datetime-picker").val(data.birthday);
        $("#mine-compney-name").val(data.companyName);
        $("#mine-duty").val(data.position);
        $("#componey-name").val(data.trade)
    }
    ajax_nodata(http_url.url+"/user/message",get_user);
    //公司行业
    function get_select(data){
        var industry_html='',category_html='',special_html='';
        var categorys=data.categorys,
            industry=categorys[2].children,list=[];
        for(var i=0;i<industry.length;i++){
            list.push(industry[i].name);
        }
        //企业名称
        $("#componey-name").select({
            items: list,
            onClose:function(){
                // alert(11)
            }
        });
    };
    ajax_nodata(http_url.url+"/category/tree",get_select);
    //提交用户信息
    $(".release").click(function(){
        var headImage=$(".userimg-look").attr("data-src"),
            realName=$(".username").val(),
            userName=$(".user_realname").val(),
            sex=$("#sex").val(),
            province=$("#city-picker").val().split(" ")[0],
            birthdayDate=$("#datetime-picker").val(),
            companyName=$("#mine-compney-name").val(),
            position=$("#mine-duty").val(),
            trade=$("#componey-name").val();
        console.log(headImage);
        if(province=="北京"||province=="上海"||province=="天津"||province=="重庆"){
           var address=$("#city-picker").val().split(" ")[2];
        }else{
            var address=$("#city-picker").val().split(" ")[1];
        }
        if(sex=="男"){
            sex=1;
        }else if(sex=="女"){
            sex=2;
        }
        function edit_user_msg(data){
            console.log(data);
            if(data.code==1){
                alert(data.des);
                window.location.href="index-mine.html"
            }else{
                alert(data.des);
            }
        }
        ajax(http_url.url+"/user/editUser",{
            "headImage":headImage,
            "realName":realName,
            "userName":userName,
            "sex":sex,
            "province":province,
            "trade":trade,
            "address":address,
            "companyName":companyName,
            "birthdayDate":birthdayDate,
            "position":position
        },edit_user_msg)
    });
    //性别
    $("#sex").select({
        items: ["男", "女"],
        onClose:function(){
            // alert(11)
        }
    });
    //所在地
    $("#city-picker").cityPicker({
        // title: "请选择收货地址"
    });
    // //出生日期
    // $("#datetime-picker").datetimePicker();
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
            $(".userimg-look").attr("src",e.target.result);
            $(".userimg-look").attr("data-src",e.target.result.split(",")[1]);
            $(".img-sel-model").hide();
        };
    });
    $(".mine-user-img-sel-btn2").change(function () {
        var file = $('.mine-user-img-sel-btn2').get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            //console.log(e.target.result);
            $(".userimg-look").attr("src",e.target.result);
            $(".userimg-look").attr("data-src",e.target.result.split(",")[1]);
            $(".img-sel-model").hide();
        };
    });
});
// //修改昵称和姓名
// $(".name-edit").click(function(){
//     var msg=$(this).find(".nc_name").html(),type=$(this).attr("data-type");
//     window.location.href=encodeURI(encodeURI("mine-name-edit.html?type="+type+"&&msg="+msg));
// })