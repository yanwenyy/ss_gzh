$(function(){
    if($(".wg-search-input").val()!=""){
        console.log(222);
        ajax(http_url.url+"/counselor/coun/list",{"sinceId":count_start, "maxId":count_end,"content":$(".wg-search-input").val()},recommend_export);
        scroll_more(http_url.url+"/counselor/coun/list",{"sinceId":count_start, "maxId":count_end,"content":$(".wg-search-input").val()},recommend_export_more);
    }
    //专家列表
    function recommend_export(data){
        // console.log(data);
        var export_list=data.data,html='';
        if(export_list==""){
            $(".expert-list").html("<span style='text-align: center;display:block' class='search-none'>暂无数据</span>");
        }else{
            for(var i=0,len=export_list.length;i<len;i++){
                var change_v=export_list[i];
                var counselorDuty=change_v.counselorDuty.split(" ");
                counselorDuty=counselorDuty.join(" | ");
                var a_html='';
                if(change_v.adept&&change_v.adept!=''&&change_v.adept!=null){
                    var adept=change_v.adept.split(" ");
                    for(var a=0,len=adept.length;a<len;a++){
                        var change_a=adept[a];
                        a_html+=`
                    <div class="inline-block">
                        ${change_a}  
                     </div>
                    `
                    }
                }
                html+=`<div class="box-sizing" data-phone="${change_v.phoneNumber}">
                        <div class="expert-msg">
                            <img  data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div><div class="inline-block office-e-name">${get_name(export_list[i])}</div> <div class="inline-block office-e-dj">${change_v.levelName}</div></div>
                                <div class="fans-zw">
                                    <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block"><img src="../img/fans-zxs.png" alt="">${change_v.counselorDuty}</div>
                                </div>
                                <div class="office-e-adress">${change_v.address||''}  <span class="gray-line inline-block ${change_v.address&&change_v.companyName?'':'out'}"></span>  ${change_v.companyName}</div>
                                <div class="office-e-good">
                                    ${a_html}
                                </div>
                                <div class="office-e-smw">
                                    <img src="../img/icon_expert_ask.png" alt="">
                                    <div class="inline-block">私密问 <span class="orange">(${parseFloat(change_v.consultMoney).toFixed(2)}/次)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }
            $(".expert-list").html(html);
        }

    }
    function recommend_export_more(data){
        var export_list=data.data,html='';
        if(export_list!=''){
            for(var i=0,len=export_list.length;i<len;i++){
                var change_v=export_list[i];
                var counselorDuty=change_v.counselorDuty.split(" ");
                counselorDuty=counselorDuty.join(" | ");
                var a_html='';
                if(change_v.adept&&change_v.adept!=''&&change_v.adept!=null){
                    var adept=change_v.adept.split(" ");
                    for(var a=0,len=adept.length;a<len;a++){
                        var change_a=adept[a];
                        a_html+=`
                    <div class="inline-block">
                        ${change_a}  
                     </div>
                    `
                    }
                }
                html+=`<div class="box-sizing" data-phone="${change_v.phoneNumber}">
                        <div class="expert-msg">
                            <img  data-phone="${change_v.phoneNumber}" src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png">
                            <div class="inline-block">
                                <div><div class="inline-block office-e-name">${get_name(export_list[i])}</div> <div class="inline-block office-e-dj">${change_v.levelName}</div></div>
                                <div class="fans-zw">
                                    <div class="inline-block ${change_v.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block"><img src="../img/fans-zxs.png" alt="">${change_v.counselorDuty}</div>
                                </div>
                                <div class="office-e-adress">${change_v.address||''}  <span class="gray-line inline-block ${change_v.address&&change_v.companyName?'':'out'}"></span>  ${change_v.companyName}</div>
                                <div class="office-e-good">
                                    ${a_html}
                                </div>
                                <div class="office-e-smw">
                                    <img src="../img/icon_expert_ask.png" alt="">
                                    <div class="inline-block">私密问 <span class="orange">(${parseFloat(change_v.consultMoney).toFixed(2)}/次)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
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
        window.location.href="personal-new.html?phone="+phone;
    })
});
