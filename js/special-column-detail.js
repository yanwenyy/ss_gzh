$(function(){
   var type=getUrlParms("type"),msg=decodeURIComponent(decodeURIComponent(getUrlParms("msg")));
   $(".special-column-detail-title").html(msg);
   function get_list(data){
       //console.log(data);
       var list=data.data,html="";
       for(var i=0,len=list.length;i<len;i++){
           var change_v=list[i];
           var content="",
               creatdate=format(change_v.date);
           //用户等级
           var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
           if(change_v.content.length>40){
               content=change_v.content.substr(0,40)+"...";
           }else{
               content=change_v.content;
           }
           var if_buy="",cwatch_buy='';
           if(change_v.status=="1"){
               if_buy="已围观";
               cwatch_buy="cwatch_buy";
           }else{
               if_buy="围观"
           }
           var realName=get_name(list[i]);
           var look_img="";
           if(change_v.isAnon!=0){
               look_img="look-hp-image";
           }
           html+=`
                <div class="box-sizing one_wg"  data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <img src="../img/icon-index-hot.png" alt="">
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${change_v.uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
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
       for(var i=0,len=list.length;i<len;i++){
           var change_v=list[i];
           var content="",
               creatdate=format(change_v.date);
           //用户等级
           var score_img=get_score(change_v.integralScore,change_v.aision,change_v.vip);
           if(change_v.content.length>40){
               content=change_v.content.substr(0,40)+"...";
           }else{
               content=change_v.content;
           }
           var if_buy="",cwatch_buy='';
           if(change_v.status=="1"){
               if_buy="已围观";
               cwatch_buy="cwatch_buy";
           }else{
               if_buy="围观"
           }
           var realName=get_name(list[i]);
           var look_img="";
           if(change_v.isAnon!=0){
               look_img="look-hp-image";
           }
           html+=`
                <div class="box-sizing one_wg"  data-id="${change_v.uuid}">
                    <div class="clist-head">
                        <img src="${headimage(change_v.headImage)}" alt="" onerror=src="../img/user.png" class="${look_img}" data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                        <div class="inline-block">
                            <div class="user-name">
                                ${realName||"匿名用户"}
                                <img src="../img/icon-index-hot.png" alt="">
                            </div>
                            <div class="user-grade">
                                <img src="${score_img}" alt="">
                            </div>
                        </div>
                        <div class="cwatch ${cwatch_buy}" data-id="${change_v.uuid}">${if_buy}</div>
                    </div>
                    <div class="clist-msg">
                       ${content}
                    </div>
                    <div class="clist-foot">
                        <div>${creatdate}</div>
                        <div>
                            <div class="inline-block">点赞 ${change_v.approveNum}</div>
                            <div class="inline-block">围观 ${change_v.lookNum}</div>
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