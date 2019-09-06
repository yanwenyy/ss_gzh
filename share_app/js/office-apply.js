$(function(){
    var from=getUrlParms("from"),userId=getUrlParms("userId");
    /*js 判断是安卓系统还是苹果系统*/
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(from=="app"){
        $(".contact-h5").hide();
        $(".contact-app").show();
        $(".contact-app").click(function(){
            window.android.getUserinfo("15568680068");//test安卓中定义好的方法,data字符串数据
        });
    }
    if(from=="wx"){
        $(".jsb_header").show();
        $(".bg-img1").addClass("margin-header");
    }if(from=="share"){
        $(".footer-img").show();
        $(".bg-img1").addClass("margin-header");
    }
    //身份证正则表达式
    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
   //获取图片验证码
    var timestamp=new Date().getTime();
    var sjstring = Math.random().toString(36).substr(2);
    var codemessages = hex_md5(sjstring+timestamp); //手机号+时间戳的MD5加密
    $(".code-img-yz").hide();
    $('.imgsrc').attr("src",http_url.url+"/random/randCode/"+codemessages+"");
    $(".imgsrc").on('click',function(){
        var timestamp=new Date().getTime();
        var phonenum = $(".phones").val()||Math.random().toString(36).substr(2);
        codemessages = hex_md5(phonenum+timestamp); //手机号+时间戳的MD5加密
        $(this).attr("src",http_url.url+"/random/randCode/"+codemessages+"");
    });
    //短信验证码
    var nums = 61,clock;
    function doLoop() {
        nums--;
        if(nums > 0){
            $(".office-send-code").html('重新发送('+nums+')');
        }else{
            clearInterval(clock); //清除js定时器
            $(".office-send-code").html("发送验证码").removeClass("send-code-btn-not");
            nums = 61; //重置时间
        }
    }
    //获取短信验证码
    $(".office-send-code").on("click",function(){
        var that=$(this);
        var phonenum = $(".office-phone").val(),
            imgnum = $(".office-imgcode").val();
        if(imgnum == ''){
            alert("请输入图形验证码");
            return false;
        }
        if(that.hasClass("send-code-btn-not")){
            return false;
        }else{
            $.ajax({
                url:http_url.url+"/api/sendSms",
                type:"post",
                dataType: "json",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=utf-8",
                    "version":"1"
                },
                data:JSON.stringify({
                    "phoneNum":phonenum,
                    "codeType":"signup",
                    "imgCode":imgnum,
                    "codeMessage":codemessages
                }),
                success:function(e){
                    console.log(e);
                    if(e.code == "1"){
                        alert("短信已发送");
                        // console.log(e.smsMessageSid);
                        sessionStorage.setItem("messageid",e.smsMessageSid);
                        that.addClass("send-code-btn-not");
                        clock = setInterval(doLoop, 1000);
                    }else{
                        alert(e.des);
                    }
                },
                error:function(e){
                    console.log(e);
                }
            });
        }
    });
    //提交用户信息
    $(".office-sub-btn").click(function(){
        var ok_msg=true,
            sfz=$(".sfz-office").val(),
            unit_name=$(".office-name").val(),
            attest_type=$(".office-class").val(),
            principal=$(".office-people").val(),
            card_id=$(".office-card").val(),
            tel_phone=$(".office-phone").val(),
            smsCode=$(".office-msgcode").val(),
            smsMessageSid=sessionStorage.getItem("messageid"),
            source="1";
        $(".regist-office-input").each(function(){
            if($(this).val()==''){
                alert($(this).attr("data-msg"));
                ok_msg=false;
                return false;
            }
        });
        if(ok_msg){
            if(idcardReg.test(sfz)){
                if($(".office-sub-must-known>input").is(":checked")){
                    ajax(http_url.url+"/officialmsg/apply/share",{
                        "attest_type": attest_type,
                        "card_id": card_id,
                        "principal": principal,
                        "smsCode": smsCode,
                        "smsMessageSid": smsMessageSid,
                        "source": "1",
                        "tel_phone": tel_phone,
                        "unit_name": unit_name,
                        "userId": userId
                        },function(data){
                            if(data.code==1){
                                alert("恭喜您，已成功提交申请，请耐心等待通知!");
                                if(from=="share"){
                                    window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.jieshuibao.jsb";
                                }else if(from=="wx"){
                                    location.reload();
                                }else if(from=="app"){
                                    window.android.goBack();
                                }
                            }else{
                                alert(data.des);
                            }
                    })
                }else{
                    alert("请勾选官方认证协议")
                }
            }else{
                alert("请输入正确的身份证号")
            }
        }
    })
});