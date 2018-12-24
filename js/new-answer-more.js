$(function(){
    function new_watch(data){
        //console.log(data);
        var list=data.data,html="";
        for(var i=0;i<list.length;i++){
            var content="",
                creatdate=format(list[i].date);
            //用户等级
            var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
            if(list[i].content.length>40){
                content=list[i].content.substr(0,40)+"...";
            }else{
                content=list[i].content;
            }
            var if_buy="",cwatch_buy='';
            if(list[i].status=="1"){
                if_buy="已围观";
                cwatch_buy="cwatch_buy";
            }else{
                if_buy="1元 围观"
            }
            var realName=get_name(list[i]);
            var look_img="";
            if(list[i].isAnon!=0){
                look_img="look-hp-image";
            }
            html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png"  class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}"  data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        $(".new-list-msg").html(html)
    }
    function new_watch_more(data){
        //console.log(data);
        var list=data.data,html="";
        if(list!=""){
            for(var i=0;i<list.length;i++){
                var content="",
                    creatdate=format(list[i].date);
                //用户等级
                var score_img=get_score(list[i].integralScore,list[i].aision,list[i].vip);
                if(list[i].content.length>40){
                    content=list[i].content.substr(0,40)+"...";
                }else{
                    content=list[i].content;
                }
                var if_buy="",cwatch_buy='';
                if(list[i].status=="1"){
                    if_buy="已围观";
                    cwatch_buy="cwatch_buy";
                }else{
                    if_buy="1元 围观"
                }
                var realName=get_name(list[i]);
                var look_img="";
                if(list[i].isAnon!=0){
                    look_img="look-hp-image";
                }
                html+=`
                <div class="box-sizing one_wg"  data-id="${list[i].uuid}">
                    <div class="clist-head">
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png"  class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}"  data-id="${list[i].uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${list[i].approveNum}</div>
                            <div class="inline-block">围观 ${list[i].lookNum}</div>
                        </div>
                    </div>
                </div>
            `;
            }
            $(".msg-loading").hide();
            $(".new-list-msg").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }
    ajax(http_url.url+"/onlook/look/list",{"sinceId":count_start, "maxId":count_end, "type":"new"},new_watch);
    scroll_more(http_url.url+"/onlook/look/list",{"sinceId":count_start, "maxId":count_end, "type":"new"},new_watch_more)
});