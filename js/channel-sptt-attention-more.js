$(function(){
    //搜索按钮点击
    $(".find-btn").click(function(){
        window.location.href="channel-sptt-attention-search.html";
    });
    recommend(1,5);
    list();
    list_more();
    //推荐加载更多点击
    $(".sptt-more").click(function(){
        // var num=$(this).attr("data-num");
        // if(num==1){
        //     console.log(num);
        //     $(this).attr("data-num","6");
        // }else{
        //     console.log(num);
        //     $(this).attr("data-num","1");
        // }
        recommend(6,10);
        $(this).hide();
    });
    //推荐列表
    function recommend(start,end){
        ajax(http_url.url+"/attention/officialByRecommendNumber",{
            "follow": "0",
            "maxId": end,
            "sinceId": start
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div class="inline-block fans-name-div">
                            <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans" data-phone="${change_v.phoneNumber}">+关注</div>
                    </li>
                `
                }
                $(".mine-fans-list-rc").append(html);
            }
        })
    }
    //全部列表
    function list(){
        count_end=10;count_start=1;
        ajax(http_url.url+"/attention/officialByLevelFans",{
            "maxId": count_end,
            "sinceId": count_start
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div class="inline-block fans-name-div">
                            <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans" data-phone="${change_v.phoneNumber}">+关注</div>
                    </li>
                `
                }
                $(".mine-fans-list-all").html(html);
            }
        })
    }
    function list_more(){
        scroll_more(http_url.url+"/attention/officialByLevelFans",{
            "maxId": count_end,
            "sinceId": count_end
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div class="inline-block fans-name-div">
                            <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans" data-phone="${change_v.phoneNumber}">+关注</div>
                    </li>
                `
                }
                $(".mine-fans-list-all").append(html);
            }else{
                scroll_status=false;
            }
        })
    }
    //关注按钮点击
    $("body").on("click",".attention-fans",function(data){
        var that=$(this),phoneNum=that.attr("data-phone");
        if(that.html().indexOf("+关注")!=-1){
            ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
                alert(data.des);
                that.addClass("attention-fans-already").html("已关注");
            });
        }
    })
});