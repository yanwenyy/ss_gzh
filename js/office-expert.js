$(function(){
    var id=getUrlParms("id"),province=decodeURIComponent(decodeURIComponent(getUrlParms("province"))),name=decodeURIComponent(decodeURIComponent(getUrlParms("name")));
    ajax(http_url.url+"/agency/agencyConselorsById",{"id":id},function(data){
        console.log(data);
        var html='',agencyCounselors=data.data.agencyCounselors;
        for(var i=0;i<agencyCounselors.length;i++){
            var a_html='';
            if(agencyCounselors[i].adept&&agencyCounselors[i].adept!=''&&agencyCounselors[i].adept!=null){
                var adept=agencyCounselors[i].adept.split(" ");
                for(var a=0;a<adept.length;a++){
                    a_html+=`
                    <div class="inline-block">
                        ${adept[a]}  
                     </div>
                    `
                }
            }
            html+=`<div class="box-sizing"  data-phone="${agencyCounselors[i].phoneNumber}">
                        <div class="expert-msg">
                            <img src="${headimage(agencyCounselors[i].headImage)}"  onerror=src="../img/user.png"  alt="">
                            <div class="inline-block">
                                <div><div class="inline-block office-e-name">${get_name(agencyCounselors[i])}</div> <div class="inline-block office-e-dj">${agencyCounselors[i].levelName}</div></div>
                                <div class="fans-zw">
                                    <div class="inline-block ${agencyCounselors[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block"><img src="../img/fans-zxs.png" alt="">${agencyCounselors[i].counselorDuty}</div>
                                </div>
                                <div class="office-e-adress">${province} ${name}</div>
                                <div class="office-e-good">
                                    ${a_html}
                                </div>
                                <div class="office-e-smw">
                                    <img src="../img/icon_expert_ask.png" alt="">
                                    <div class="inline-block">私密问 <span class="orange">(${parseFloat(agencyCounselors[i].consultMoney).toFixed(2)}/次)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
        $(".expert-list").html(html);
    });
    //专家列表点击
    $("body").on("click",".expert-list>div",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="personal-new.html?phone="+phone;
    });
});