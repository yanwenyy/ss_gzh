$(function(){
    var phones = getQueryString('phone'),
        firmId = getQueryString('firmId'),
        inviteUserId = getQueryString('inviteUserId');
    console.log(phones+'--'+firmId+'--'+inviteUserId)

    //确定
    $(".user-rig-next-btn").on("click",function(){
        window.location.href="download-app.html"
        // var names = $('.name').val(),
        //     pwds = hex_md5($('.pwd').val()),
        //     confirmpwds = hex_md5($('.confirmpwd').val());
        // if(pwds == '' || confirmpwds == ''){
        //     alert("请完善信息");
        //     return false;
        // }
        // if(pwds != confirmpwds){
        //     alert("密码输入不一致");
        //     return false;
        // }
        // $.ajax({
        //     url:hostName.url+"bsb/h5share/register",
        //     type:"post",
        //     dataType: "json",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json;charset=utf-8"
        //     },
        //     data:JSON.stringify({
        //         "phone":phones,
        //         "pwd":pwds,
        //         "firmId":firmId,
        //         "inviteUserId":inviteUserId,
        //         "name":names
        //     }),
        //     success:function(e){
        //         console.log(e)
        //         if(e.code == "1"){
        //             //$(".mark").show();
        //             window.location.href="download-app.html"
        //         }else{
        //             alert(e.des);
        //         }
        //     },
        //     error:function(e){
        //         console.log(e)
        //     }
        // });
    });
});