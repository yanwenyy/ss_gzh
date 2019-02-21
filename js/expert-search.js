$(function(){
    if($(".wg-search-input").val()!=""){
        console.log(222);
        ajax(http_url.url+"/counselor/coun/list",{"sinceId":count_start, "maxId":count_end,"content":$(".wg-search-input").val()},recommend_export);
        scroll_more(http_url.url+"/counselor/coun/list",{"sinceId":count_start, "maxId":count_end,"content":$(".wg-search-input").val()},recommend_export_more);
    }
    //专家列表
    function recommend_export(data){
        console.log(data);
        var export_list=data.data,html='';
        for(var i=0;i<export_list.length;i++){
            var counselorDuty=export_list[i].counselorDuty.split(" ");
            counselorDuty=counselorDuty.join(" | ");
            html+=`
                <div class="box-sizing" data-phone="${export_list[i].phoneNumber}">
                    <div class="expert-msg">
                        <img  data-phone="${export_list[i].phoneNumber}" src="${head_src+export_list[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block" style="width:73%">
                            <div>${export_list[i].userName||"匿名用户"}</div>
                            <div>${export_list[i].province||""}·${export_list[i].levelName}</div>
                            <div style="font-size: 2.6rem;color: rgba(102, 102, 102, 1);">${export_list[i].companyName||""}</div>
                            <div class="expert-msg-zgrz">
                                资格认证:
                                <img src="../img/icon-expert list-certificate.png" alt="">
                                <span>${counselorDuty}</span>
                            </div>
                            <div class="smw">
                                <img src="../img/expert list-top.png" alt="">
                                <div class="box-sizing">¥ ${export_list[i].consultMoney}/次</div>
                            </div>
                        </div>
                    </div>
                    <div class="expor-scly">
                        擅长领域：
                        <div class="inline-block">${export_list[i].adept}</div>
                    </div>
                </div>
            `;
        }
        $(".expert-list").html(html);
    }
    function recommend_export_more(data){
        var export_list=data.data,html='';
        if(export_list!=''){
            for(var i=0;i<export_list.length;i++){
                var counselorDuty=export_list[i].counselorDuty.split(" ");
                counselorDuty=counselorDuty.join(" | ");
                html+=`
                <div class="box-sizing" data-phone="${export_list[i].phoneNumber}">
                    <div class="expert-msg">
                        <img  data-phone="${export_list[i].phoneNumber}" src="${head_src+export_list[i].headImage}" alt="" onerror=src="../img/user.png">
                        <div class="inline-block" style="width:73%">
                            <div>${export_list[i].userName||"匿名用户"}</div>
                            <div>${export_list[i].province||""}·${export_list[i].levelName}</div>
                            <div style="font-size: 2.6rem;color: rgba(102, 102, 102, 1);">${export_list[i].companyName||""}</div>
                            <div class="expert-msg-zgrz">
                                资格认证:
                                <img src="../img/icon-expert list-certificate.png" alt="">
                                <span>${counselorDuty}</span>
                            </div>
                            <div class="smw">
                                <img src="../img/expert list-top.png" alt="">
                                <div class="box-sizing">¥ ${export_list[i].consultMoney}/次</div>
                            </div>
                        </div>
                    </div>
                    <div class="expor-scly">
                        擅长领域：
                        <div class="inline-block">${export_list[i].adept}</div>
                    </div>
                </div>
            `;
            }
            $(".expert-list").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    $(".release").click(function(){
        var msg=$(".wg-search-input").val();
        $(".expert-list").html("");
        if(msg==""){
            $(".expert-list").html("");
        }else{
            ajax(http_url.url+"/counselor/coun/list",{"sinceId":count_start, "maxId":count_end,"content":msg},recommend_export);
            scroll_more(http_url.url+"/counselor/coun/list",{"sinceId":count_start, "maxId":count_end,"content":msg},recommend_export_more);
        }
    });
    $("body").on("click",".expert-list>div",function(){
        var phone=$(this).attr("data-phone");
        window.location.href="expert-home-page.html?phone="+phone;
    })
});
