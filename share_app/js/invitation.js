var firmId = getQueryString('firmId'),
    firmName = getQueryString('firmName'),
    inviteUserName = getQueryString('inviteUserName'),
    inviteUserId = getQueryString('inviteUserId');
$('.firname').html(firmName+"办税宝在线平台");
$('.comnames').html(inviteUserName);
$('.accept-invitation-btn').on("click",function(){
    //window.location.href=encodeURI("acceptinvite.html?firmId="+firmId+"&inviteUserId="+inviteUserId+"");
    window.location.href="user-register.html";
});