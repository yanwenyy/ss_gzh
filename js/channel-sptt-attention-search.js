$(function(){
    //搜索按钮点击
    $(".release").click(function(){
        var val=$(".channel-search-msg").val();
        if(val==""){
            alert("请输入搜索内容")
        }else{
            list(val);
            list_more(val);
        }
    });
    function list(val){
        count_end=10;count_start=1;
        ajax(http_url.url+"/attention/officialByLevelFans",{
            "maxId": count_end,
            "sinceId": count_start,
            "realName":val
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    var name_v=get_name(change_v);
                    if(name_v.length>25){
                        name_v=name_v.slice(0,25)+"...";
                    }
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                         <div class="inline-block fans-name-div look-hp-image"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                            <div class="inline-block fans-name">${name_v.replace(val,"<span class='red'>"+val+"</span>")}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans ${change_v.follow==1||change_v.follow==2?'attention-fans-already':''}" data-phone="${change_v.phoneNumber}"><img src="../img/hg.png" class="hg-fans ${change_v.follow==2?'':'out'}" alt="">${change_v.follow==1||change_v.follow==2?(change_v.follow==2?'互关':'已关注'):'+关注'}</div>
                    </li>
                `
                }
                $(".mine-fans-list").html(html);
            }
        })
    }
    function list_more(val){
        scroll_more(http_url.url+"/attention/officialByLevelFans",{
            "maxId": count_end,
            "sinceId": count_start,
            "realName":val
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    var name_v=get_name(change_v);
                    if(name_v.length>25){
                        name_v=name_v.slice(0,25)+"...";
                    }
                    html+=`
                    <li class="box-sizing">
                        <div class="inline-block c-sptt-head-div">
                            <img  class="look-hp-image" src="${headimage(change_v.headImage)}"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}" onerror=src="../img/user.png" alt="">
                            <img class="channel-sptt-userimg-rz" src="../img/office-p-rz.png" alt="">
                        </div>
                         <div class="inline-block fans-name-div look-hp-image"  data-role="${change_v.role}" data-phone="${change_v.phoneNumber}">
                            <div class="inline-block fans-name">${name_v.replace(val,"<span class='red'>"+val+"</span>")}</div>
                            <div class="fans-fans">
                            <span>${change_v.fansNumber}粉丝</span>
                            </div>
                        </div>
                        <div class="inline-block attention-fans ${change_v.follow==1||change_v.follow==2?'attention-fans-already':''}" data-phone="${change_v.phoneNumber}"><img src="../img/hg.png" class="hg-fans ${change_v.follow==2?'':'out'}" alt="">${change_v.follow==1||change_v.follow==2?(change_v.follow==2?'互关':'已关注'):'+关注'}</div>
                    </li>
                `
                }
                $(".mine-fans-list").append(html);
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