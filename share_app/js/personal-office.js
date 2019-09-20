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
        $(".new-p-sptt-num").html("("+users.officials+")");
        $(".new-p-ss-num").html("("+users.brushs+")");
        $(".new-p-zl-num").html("("+users.specialcolumns+")");
        $(".new-p-sp-num>span").html(users.classifys||0);
        $(".new-p-xh-num").html("("+users.praise+")");
        if(data.self==1){
            $(".office-p-attention").addClass("out");
            $(".office-p-edit").removeClass("out");
            $(".office-xh").removeClass("out");
        }
        if(data.isAttention==1){
            $(".office-p-attention").html("取消关注").addClass("office-p-attention").removeClass("office-p-attention-add");
        }
        $(".personal-img-head").attr("src",headimage(users.headImage));
        $(".office-p-name").html(get_name(users));
        var province=users.address||'',companyName=users.companyName||'';
        $(".office-p-adress>div").html(users.officialAddress);
        $(".new-p-gz").html(users.fans);
        $(".new-p-fs").html(users.officials+users.brushs+users.classifys);
        //视频头条类型
        ajax_nodata(http_url.url+"/share/headtype/"+phone+"/share",function(data){
            var datas=data.data,html='';
            for(var i=0,len=datas.length;i<len;i++){
                var change_v=datas[i];
                html+=`
                    <div class="inline-block share-downloade ${i==0?'column-list-tab-act':''}" data-id="${change_v.id}">${change_v.name} </div>
                `
            }
            $(".list-tab-sptt").html(html);
        });
    });
});