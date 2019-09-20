$(function(){
    var firmId = getQueryString('firmId'),
        inviteUserId = getQueryString('inviteUserId'),
        batchId=getQueryString("batchId");
    //获取图片验证码
    var timestamp=new Date().getTime();
    var sjstring = Math.random().toString(36).substr(2);
    var codemessages = hex_md5(sjstring+timestamp); //手机号+时间戳的MD5加密
    sessionStorage.setItem("codeinfos",codemessages);
    $('.imgsrc').show();
    $(".code-img-yz").hide();
    $('.imgsrc').attr("src",http_url.url+"/random/randCode/"+codemessages+"");
    //验证手机号
    $(".phones").on("blur",function(){
        var timestamp=new Date().getTime();
        var phonenum = $(".phones").val();
        if(phonenum == ''){
            alert("请输入手机号码");
            return false;
        }

        var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(!reg.test(phonenum) && phonenum != ''){
            alert("手机号码输入有误!");
            return false;
        }

        // var codemessages = hex_md5(phonenum+timestamp); //手机号+时间戳的MD5加密
        // sessionStorage.setItem("codeinfos",codemessages);
        //
        // $('.imgsrc').show();
        // $(".code-img-yz").hide();
        // $('.imgsrc').attr("src",http_url.url+"/random/randCode/"+codemessages+"");
        // $(".phones").attr("readonly","readonly");
    });

    $(".imgsrc").on('click',function(){
        var timestamp=new Date().getTime();
        var phonenum = $(".phones").val();

        var codemessages = hex_md5(phonenum+timestamp); //手机号+时间戳的MD5加密
        sessionStorage.setItem("codeinfos",codemessages);

        $(this).attr("src",http_url.url+"/random/randCode/"+codemessages+"");

    });
    //短信验证码倒计时
    var nums = 61,clock;
    function doLoop() {
        nums--;
        if(nums > 0){
            $(".getnums").html('重新发送('+nums+')');
        }else{
            clearInterval(clock); //清除js定时器
            $(".getnums").html("获取验证码").removeClass("send-code-btn-not");
            nums = 61; //重置时间
        }
    }
    //获取短信验证码
    $(".getnums").on("click",function(){
        var timestamp=new Date().getTime();
        var phonenum = $(".phones").val(),
            imgnum = $(".imgnums").val();
        var that=$(this);
        if(imgnum == ''){
            alert("请输入图形验证码");
            return false;
        }
        var codemss = hex_md5(phonenum+timestamp); //手机号+时间戳的MD5加密
        if($(this).hasClass("send-code-btn-not")){
            return false;
        }else{
            $.ajax({
                url:http_url.url+"api/sendSms",
                type:"post",
                dataType: "json",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=utf-8"
                },
                data:JSON.stringify({
                    "phoneNum":phonenum,
                    "codeType":"regist",
                    "imgCode":imgnum,
                    "codeMessage":sessionStorage.getItem("codeinfos")
                }),
                success:function(e){
                    console.log(e);
                    if(e.code == "1"){
                        alert("短信已发送");
                        console.log(e.smsMessageSid);
                        sessionStorage.setItem("messageid",e.smsMessageSid);
                        that.addClass("send-code-btn-not");
                        clock = setInterval(doLoop, 1000);
                    }else{
                        alert(e.des);
                    }
                },
                error:function(e){
                    console.log(e)
                }
            });
        }
    });
    //接受邀请
    $('.user-rig-next-btn').on("click",function(){
        //window.location.href="download-app.html"
        var phonenum = $(".phones").val(),
            imgnum = $(".imgnums").val(),
            numsinfos = $(".numsinfo").val();
        if(phonenum == '' || imgnum == '' || numsinfos == ''){
            alert("请完善信息");
            return false;
        }
        if(inviteUserId!=null){
            $.ajax({
                url:http_url.url+"/newRegist",
                type:"post",
                dataType: "json",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=utf-8"
                },
                data:JSON.stringify({
                    "phoneNumber":phonenum,
                    "code":numsinfos,
                    "smsMessageSid":sessionStorage.getItem("messageid"),
                    "inviterUserUuid":inviteUserId
                }),
                success:function(e){
                    console.log(e);
                    if(e.code == "1"){
                        window.location.href="../html/download-app.html?amount="+e.amount;
                    }else{
                        alert(e.des);
                    }
                },
                error:function(e){
                    console.log(e)
                }
            });
        }else if(batchId!=null){
            $.ajax({
                url:http_url.url+"/newRegist",
                type:"post",
                dataType: "json",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=utf-8"
                },
                data:JSON.stringify({
                    "phoneNumber":phonenum,
                    "code":numsinfos,
                    "smsMessageSid":sessionStorage.getItem("messageid"),
                    "batchId":batchId
                }),
                success:function(e){
                    console.log(e);
                    if(e.code == "1"){
                        window.location.href="../html/download-app.html?amount="+e.amount;
                    }else{
                        alert(e.des);
                    }
                },
                error:function(e){
                    console.log(e)
                }
            });
        }

    })
});