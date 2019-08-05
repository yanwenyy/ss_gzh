$(function(){
    var csq_id=getUrlParms("csq_id");
    //文章详情的title和content
    function get_csq_detail(data){
        console.log(data);
        if(data.code==1){
            var createData=format(data.createDate);
            $(".csq-detail-body-msg .csq-user-img").attr("src",headimage(data.headImage));
            $(".csq-detail-body-msg .user-name").html(`${data.realName||"" }
                                <div class="inline-block zxs-grade">
                                    <img src="../img/icon-expert icon.png" alt="">
                                    ${data.levelName||""}
                                </div>`);
            $(".csq-detail-body-msg .zx-detail-date").html(data.counselorDuty);
            $(".csq-detail-body-msg .rd-look-btn").html(data.categoryName);
            $(".csq-detail-body-msg .csq-footer-date").html(createData);
            $(".csq-detail-body-msg .clist-msg").html(data.title);
            var content=data.content.replace(/[\n\r]/g,'<br>');
            $(".csq-detail-body-msg .csq-tab--detail-msg").html(content);
        }else{
            alert(data.des);
        }

    }
    ajax(http_url.url+"/openShareDetails/share",{"uuid":csq_id,"shareType":"shareArticle"},get_csq_detail);
});