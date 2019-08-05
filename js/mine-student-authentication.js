$(function(){
    var already=getUrlParms("already"),ifAgain=0;
    // if(already){
        ifAgain=1;
        ajax_nodata(http_url.url+"/student/collageStudentDetail",function(data){
            console.log(data);
            if(data.data.status==1){
                $(".release").show();
                $(".cxs-certificate-group").hide();
                $(".wrz").hide();
                if(data.data.failureTime>new Date().getTime()){
                    $(".rzcg").show();
                }
            }else if(data.data.status==2){
                $(".sub_msg").html("重新认证");
                $(".wrz").hide();
                $(".shsb").show();
            }else if(data.data.status==4){
                $(".release").show();
                $(".cxs-certificate-group").hide();
                $(".wrz").hide();
                $(".rzsb").show();
            }
            $(".xsz-time").html(format(data.data.failureTime).split(" ")[0]);
            $(".user_realname").val(data.data.userName);
            $(".school").val(data.data.school);
            $(".major").val(data.data.specialty);
            $(".education").val(data.data.presentEducation==1?"专科生":data.data.presentEducation==2?"本科生":data.data.presentEducation==3?"硕士生":'专科生').attr("data-values",data.data.presentEducation);
            $("#entrance-time").val(format(data.data.startTime).split(" ")[0]);
            $("#graduation-time").val(format(data.data.graduateTime).split(" ")[0]);
            if(data.data.stuCardFront&&data.data.stuCardFront!=''&&data.data.stuCardFront!=null){
                $("#id_front").attr("src",cert_src+data.data.stuCardFront).addClass("certificate-img-show");
                $("#id_front").next(".certificate-upload-div").hide();
                $("#id_front").next().next().next(".del-certificate-img2").show();
                $("#id_front").next().next().next().next(".up-btn").hide();
            }
            if(data.data.stuCardBack&&data.data.stuCardBack!=''&&data.data.stuCardBack!=null){
                $("#id_back").attr("src",cert_src+data.data.stuCardBack).addClass("certificate-img-show");
                $("#id_back").next(".certificate-upload-div").hide();
                $("#id_back").next().next().next(".del-certificate-img2").show();
                $("#id_back").next().next().next().next(".up-btn").hide();
            }
            if(data.data.status==1){
                $(".recertification").attr("disabled",true);//禁用按钮
                $(".recertification-close").hide();//删除照片按钮隐藏
            }
        })
    // }
    //时间插件
    var calendar = new datePicker();
    var calendar2 = new datePicker();
    calendar.init({
        'trigger': '#entrance-time', /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'1900-1-1',/*最小日期*/
        'maxDate':'2100-12-31',/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
            var theSelectData=calendar.value;
        },
        'onClose':function(){/*取消时触发事件*/
        }
    });
    calendar2.init({
        'trigger': '#graduation-time', /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'1900-1-1',/*最小日期*/
        'maxDate':'2100-12-31',/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
            var theSelectData=calendar.value;
        },
        'onClose':function(){/*取消时触发事件*/
        }
    });
    //学历
    $(".education").select({
        items: [
            {
                title: "专科生",
                value: "1"
            },
            {
                title: "本科生",
                value: "2"
            },
            {
                title: "硕士生",
                value: "3"
            },
            {
                title: "博士生",
                value: "4"
            }
        ],
        onClose:function(){
            // alert(11)
        }
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
            that.next().next("div").hide();
            if(code==1){//身份证
                that.parent().attr("data-src",e.target.result.split(",")[1]);
                if(that.hasClass("sfz_front")){
                    sessionStorage.setItem("sfz_front",e.target.result)
                }
                if(that.hasClass("sfz_back")){
                    sessionStorage.setItem("sfz_back",e.target.result)
                }
            }
        };
    });
    //删除身份证照片
    $(".del-certificate-img2").click(function(){
        $(this).parent().children("img:first-child").attr("src","").removeClass("certificate-img-show");
        $(this).hide();
        $(this).prev().prev("img").show();
        sfz_list.remove($(this).parent().children("img:first-child").attr("data-src"));
        $(this).parent().attr("data-src","");
        $(this).next("div").show();
    });
    //重新认证点击
    $(".release").click(function(){
        $(this).hide();
        $(".recertification").attr("disabled",false);//禁用按钮
        $(".recertification-close").show();//删除照片按钮出现
        $(".recertification-btn>div").html("重新认证")
        $(".recertification-btn").show();
    });
    //提交按钮点击
    $(".sub_msg").click(function(){
        var graduateTime=$("#graduation-time").val(),//预计毕业时间
            presentEducation=$(".education").attr("data-values"),//学历
            school=$(".school").val(),//学校
            specialty=$(".major").val(),//专业
            startTime=$("#entrance-time").val(),//入学时间
            stuCardBack=$("#id_back").attr("data-src"),//学生证/卡 的反面照片
            stuCardFront=$("#id_front").attr("data-src"),//学生证/卡 的正面照片
            userName=$(".user_realname").val(),//学生真实姓名
            ifAgain=ifAgain;//是否重新认证
        if(graduateTime==""||presentEducation==''||school==""||specialty==""||startTime==""||stuCardBack==""||stuCardFront==""||userName==""){
            alert("请完善信息")
        }else{
            ajax(http_url.url+"/student/applyCollageStudent",{
                "graduateTime": graduateTime,
                "ifAgain": ifAgain,
                "presentEducation": presentEducation,
                "school": school,
                "specialty": specialty,
                "startTime": startTime,
                "stuCardBack": stuCardBack,
                "stuCardFront": stuCardFront,
                "userName": userName
            },function(data){
                console.log(data);
                alert(data.des);
                if(data.code==1){
                    window.location.href="index-mine.html";
                }
            })
        }
    })
    //了解特权点击
    $(".know-tq").click(function(){
        window.location.href="student-privilege.html"
    })
});