$(function(){
   var type=getUrlParms("type"),msg=decodeURIComponent(decodeURIComponent(getUrlParms("msg")));
   $(".special-column-detail-title").html(msg);
   function get_list(data){
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
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <img src="../img/icon-index-hot.png" alt="">
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${list[i].uuid}">${if_buy}</div>
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
       $(".wacth-search-list").html(html)
   }
   function get_list_more(data){
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
                        <img src="${head_src+list[i].headImage}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${list[i].role}" data-phone="${list[i].phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <img src="../img/icon-index-hot.png" alt="">
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${list[i].uuid}">${if_buy}</div>
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
        $(".wacth-search-list").append(html);
    }
   ajax(http_url.url+"/onlook/serarch",{"sinceId":count_start,
       "maxId":count_end,
       "content":"",
       "type":type,
       "typeContent":msg},get_list);
   scroll_more(http_url.url+"/onlook/serarch",{"sinceId":count_start,
       "maxId":count_end,
       "content":"",
       "type":type,
       "typeContent":msg},get_list_more);
    //1元围观
    $("body").on("click",".one_wg",function(){
        var cwatch_id=$(this).attr("data-id");
        //微信授权
        function cwatch_jurisdiction(data){
            console.log(data);
            if(data.isBuy==1){//未购买
                window.location.href="../html/cwatch.html?cwatch_id="+cwatch_id;
            }else if(data.isBuy==0){//已围观
                window.location.href="../html/watch-anwser.html?cwatch_id="+cwatch_id;
            }
        }
        ajax_nodata(http_url.url+"/onlook/wx/onlookAuthorized?uuid="+cwatch_id,cwatch_jurisdiction);
    });
    //搜索按钮点击
    $(".search").click(function(){
        window.location.href="watch-search.html?type="+type+"&&msg="+encodeURIComponent(encodeURIComponent(msg));
    })
});