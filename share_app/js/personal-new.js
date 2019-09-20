$(function(){
    var phone=getUrlParms("phone");
    count_end=10;count_start=1;
    //滚动到顶部时tab栏固定
    var oTop = $(".personal-main-tab").offset().top;
    //获取导航栏的高度，此高度用于保证内容的平滑过渡
    var martop = $('.personal-main-tab').outerHeight();
    var sTop = 0;
    // //获取滚动距离
    $(window).scroll(function(){
        sTop = $(this).scrollTop();

        // 当导航栏到达屏幕顶端
        if (sTop >= oTop) {

            // 修改导航栏position属性，使之固定在屏幕顶端
            $(".personal-main-tab").addClass("personal-main-msg-fixed");

            // 修改内容的margin-top值，保证平滑过渡
            $(".personal-main-detail").css({ "margin-top": martop });
        } else {

            // 当导航栏脱离屏幕顶端时，回复原来的属性
            $(".personal-main-tab").removeClass("personal-main-msg-fixed");
            $(".personal-main-detail").css({ "margin-top": "0" });
        }
    });
    var users='';
    //用户信息
    ajax_nodata(http_url.url+"/share/home/"+phone+"/share",function(data){
        users=data.data;
        if(users.specialcolumns==0||users.specialcolumns==""||users.specialcolumns==null){
            $(".p-zl-title").hide();
        }
        if(users.lecturer==0){
            $(".p-sp-title").hide();
        }
        $(".new-p-ss-num").html("("+users.brushs+")");
        $(".new-p-xh-num").html("("+users.praise+")");
        $(".new-p-zl-num").html("("+users.specialcolumns+")");
        $(".new-p-wd-num").html("("+users.answers+")");
        $(".new-p-sp-num>span").html(users.classifys||0);
        if(data.self==1){
            $(".attention-person").hide();
            $(".edit-personal-msg").show();
            $(".personal-new-smw").hide();
            $(".personal-new-smw-money").show();
        }
        if(data.isAttention==1){
            $(".attention-person").html("取消关注").addClass("attention-person-already");
        }
        if(users.role==1){
            $(".user-p").removeClass("out");
            $(".expert-p").addClass("out");
            $(".new-p-dj>img").attr("src",get_score(users.integralScore,users.aision,users.vip));
        }else{
            $(".new-p-dj").html(users.levelName);
        }
        $(".personal-img-head").attr("src",headimage(users.headImage));
        $(".new-p-name").html(get_name(users));

        $(".new-p-counselorDuty").html(`
            <span class="inline-block new-p-js ${users.lecturer==1?'':'out'}"><img src="../img/fans-js.png" alt="">讲师</span><span class="inline-block new-p-zxs orange ${users.role==2?'':'out'}"><img src="../img/fans-zxs.png" alt="">${users.counselorDuty}</span>
        `);
        var province=users.address||'',companyName=users.companyName||'';
        $(".new-p-address").html(province+` <span class="gray-line inline-block ${province!=''&&companyName!=''?'':'out'}"></span> `+companyName);
        $(".new-p-gz").html(users.follow);
        $(".new-p-fs").html(users.fans);
        $(".new-p-cn").html(parseFloat(users.grScore).toFixed(1));
        $(".new-p-zx").html(parseFloat(users.adScore).toFixed(1));
        $(".personal-new-smw>div").html(parseFloat(users.consultMoney).toFixed(2)+"元 /次 ");
        $(".new-p-scly").html(users.adept);
        var experience=users.experience?(users.experience.length>45?users.experience.slice(0,45)+"...":users.experience):'TA有些低调...';
        $(".new-p-grjs").html(experience);
        $(".ss-num>span").html(users.brushNum);
    });
    ajax_nodata(http_url.url+"/share/home/brushvideo/"+phone+"/share",function(data){
        var html='',
            datas=data.data,
            i=0,len=datas.length;
        if(datas&&datas!=''){
            for(;i<len;i++){
                var change_v=datas[i];
                html+=`<div class="column-list-div inline-block ${change_v.checkStatus!=2?'':'out'}"  data-checkStatus="${change_v.checkStatus}" data-id="${change_v.id}" data-vid="${change_v.vid}">
                        <img src="${cover_src+change_v.image}" alt="">
                        <div class="box-sizing">
                            <div class="column-list-title">${change_v.title.length>18?change_v.title.slice(0,18)+"..":change_v.title}</div>
                            <div class="column-list-name">
                                <img src="${headimage(change_v.headImage)}" alt="">
                                <div class="inline-block">${get_name(change_v).length>8?get_name(change_v).slice(0,8)+"...":get_name(change_v)}</div>
                            </div>
                        </div>
                    </div>`
            }
            $(".p-ss").html(html);
        }else{
            $(".p-ss").html("暂时无相关数据");
        }
    })

    //刷刷号点击
    $(".ss-num").click(function(){
        var text = $(".ss-num>span").html();
        var input = document.getElementById("ss-num-copy");
        input.value = text; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        alert("已复制");
    })
});