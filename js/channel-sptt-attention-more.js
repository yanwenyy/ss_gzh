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
        // recommend(6,10);
        $(".mine-fans-list-rc").css("max-height","none");
        $(this).hide();
    });
    //推荐列表
    function recommend(start,end){
        ajax(http_url.url+"/attention/officialByRecommendNumber",{
            "follow": "0",
            "maxId": 10,
            "sinceId": 1
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                if(datas.length<=5){
                    $(".sptt-more").hide();
                }
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                        <div class="inline-block fans-name-div look-hp-image"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                            <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans ${change_v.follow==1||change_v.follow==2?'attention-fans-already':''}" data-phone="${change_v.phoneNumber}"><img src="../img/hg.png" class="hg-fans ${change_v.follow==2?'':'out'}" alt="">${change_v.follow==1||change_v.follow==2?(change_v.follow==2?'互关':'已关注'):'+关注'}</div>
                    </li>
                `
                }
                $(".mine-fans-list-rc").append(html);
            }else{
                $(".mine-fans-recommend").hide();
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
                         <div class="inline-block fans-name-div look-hp-image"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                            <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                       <div class="inline-block attention-fans ${change_v.follow==1||change_v.follow==2?'attention-fans-already':''}" data-phone="${change_v.phoneNumber}"><img src="../img/hg.png" class="hg-fans ${change_v.follow==2?'':'out'}" alt="">${change_v.follow==1||change_v.follow==2?(change_v.follow==2?'互关':'已关注'):'+关注'}</div>
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
                         <div class="inline-block fans-name-div look-hp-image"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                            <div class="inline-block fans-name">${get_name(change_v).length>25?get_name(change_v).slice(0,25)+"...":get_name(change_v)}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans ${change_v.follow==1||change_v.follow==2?'attention-fans-already':''}" data-phone="${change_v.phoneNumber}"><img src="../img/hg.png" class="hg-fans ${change_v.follow==2?'':'out'}" alt="">${change_v.follow==1||change_v.follow==2?(change_v.follow==2?'互关':'已关注'):'+关注'}</div>
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
                if(data.code==1){
                    that.addClass("attention-fans-already").html("已关注");
                }
            });
        }
    })
});