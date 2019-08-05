$(function(){
    list();
    //推荐好友列表
    function list(val,type){
        ajax(http_url.url+"/attention/allFriend",{
            "maxId": count_end,
            "sinceId": count_start,
            "phone":type==3?val:'',
            "realName":type==2?val:'',
            "userName":type==1?val:''
        },function(data){
            console.log(data);
            var html='';
            for(var i=0;i<data.data.length;i++){
                html+=`<li class="box-sizing">
                            <img  data-phone="${data.data[i].phoneNumber}" class="look-hp-image" src="${headimage(data.data[i].headImage)}"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${data.data[i].phoneNumber}" class="inline-block look-hp-image">
                                <div class="inline-block fans-name">${get_name(data.data[i])}</div>
                                <div class="inline-block fans-dj-msg ${data.data[i].role==2?'':'out'}">${data.data[i].levelName}</div>
                                <div class="inline-block fans-dj ${data.data[i].role==1?'':'out'}"><img src="${get_score(data.data[i].integralScore,data.data[i].aision,data.data[i].vip)}" alt=""></div>
                                <div class="fans-fans">
                                    <span>${data.data[i].fansNumber} 粉丝</span>
                                    <span>${data.data[i].brushNumber} 刷刷</span>
                                </div>
                                <div class="fans-zw">
                                    <div class="inline-block ${data.data[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block ${data.data[i].counselorDuty!=null&&data.data[i].role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ data.data[i].counselorDuty}</div>
                                </div>
                            </div>
                            <div class="inline-block attention-fans"  data-phone="${data.data[i].phoneNumber}">+关注</div>
                        </li>
                `
            }
            $(".mine-fans-recommend>ul").html(html);
        })
    }
    function list_more(data){
        var html='';
        if(data.data&&data.data!=''){
            for(var i=0;i<data.data.length;i++){
                html+=`<li class="box-sizing">
                            <img  data-phone="${data.data[i].phoneNumber}" src="${headimage(data.data[i].headImage)}" class="look-hp-image"  alt="" onerror=src="../img/user.png">
                            <div  data-phone="${data.data[i].phoneNumber}" class="inline-block look-hp-image">
                                <div class="inline-block fans-name">${get_name(data.data[i])}</div>
                                <div class="inline-block fans-dj-msg ${data.data[i].role==2?'':'out'}">${data.data[i].levelName}</div>
                                <div class="inline-block fans-dj ${data.data[i].role==1?'':'out'}"><img src="${get_score(data.data[i].integralScore,data.data[i].aision,data.data[i].vip)}" alt=""></div>
                                 <div class="fans-fans">
                                    <span>${data.data[i].fansNumber} 粉丝</span>
                                    <span>${data.data[i].brushNumber} 刷刷</span>
                                </div>
                                <div class="fans-zw">
                                    <div class="inline-block ${data.data[i].lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</div>
                                    <div class="inline-block ${data.data[i].counselorDuty!=null&&data.data[i].role==2? '':'out'}"><img src="../img/fans-zxs.png" alt="">${ data.data[i].counselorDuty}</div>
                                </div>
                            </div>
                            <div class="inline-block attention-fans"  data-phone="${data.data[i].phoneNumber}">+关注</div>
                        </li>
                `
            }
            $(".mine-fans-recommend>ul").append(html);
        }else{
            scroll_status=false;
        }
    }
    scroll_more(http_url.url+"/attention/allFriend",{
        "maxId": count_end,
        "sinceId": count_start
    },list_more);
    //搜索选择框变化
    $(".fans-search>select").on("change",function(){
        var type=$(this).val();
        if(type==1){
            $(".fans-search>input").attr("placeholder","请输入好友真实姓名")
        }else if(type==2){
            $(".fans-search>input").attr("placeholder","请输入好友昵称")
        }else if(type==3){
            $(".fans-search>input").attr("placeholder","请输入好友手机号")
        }
    });
    //清空搜索框
    $(".fans-search>img").click(function(){
        $(".fans-search>input").val('')
    });
    //搜索框
    $(".fans-search>input").on('keypress',function(e) {
        var keycode = e.keyCode;
        var val = $(this).val(),type=$(".fans-search>select").val();
        if(keycode=='13') {
            e.preventDefault();
            if(val==''){
                alert("请输入搜索内容")
            }else{
                //请求搜索接口  
                count_start=1;count_end=10;num=1;
                list(val,type);
                scroll_more(http_url.url+"/attention/allFriend",{
                    "maxId": count_end,
                    "sinceId": count_start,
                    "phone":type==3?val:'',
                    "realName":type==2?val:'',
                    "userName":type==1?val:''
                },list_more);
            }
        }
    });
    //关注按钮点击
    $("body").on("click",".attention-fans",function(){
        var that=$(this),phoneNum=that.attr("data-phone");
        ajax(http_url.url+"/attention/user",{"phoneNum":phoneNum, "isAttention":1},function(data){
            alert(data.des);
            if(data.code==1){
                that.addClass("each-attention").html("已关注");
            }
        })
    });
});