$(function(){
    var id=getUrlParms("id"),sz_lizt=[];
    //回答者信息
    function get_ques(data){
        
        console.log(data);
        var questionUserOwnMsg=data.question;
        //用户等级
        var score_img=get_score(questionUserOwnMsg.integralScore,questionUserOwnMsg.aision,questionUserOwnMsg.vip);
        var realName=get_name(questionUserOwnMsg),img_src="";
        if(questionUserOwnMsg.isAnon!=0){
            img_src=headimage(questionUserOwnMsg.headImage);
        }
        console.log(img_src);
        $(".look-hp-image").attr("src",img_src).attr("data-phone",questionUserOwnMsg.phoneNumber).attr("data-role",questionUserOwnMsg.role);
        $(".user-name").html(`
             <div class="user-name">
                        ${realName||""}
                        <div class="user-grade inline-block zx-detail-grade">
                            <img src="${score_img}" alt="">
                        </div>
             </div>
        `);
        $(".zx-detail-date").html(format(questionUserOwnMsg.date));
        $(".clist-msg").html(questionUserOwnMsg.content);
        $(".zx-detail-city").html(`
             <div class="inline-block"><img src="../img/label.png" alt="">
                ${questionUserOwnMsg.area||""} ${questionUserOwnMsg.quTrade||""}
             </div>
            
        `);
        var imgs=questionUserOwnMsg.images,html="";
        if(imgs!=null){
            for(var i=0;i<imgs.length;i++){
                html+=`
                   <img src="${question_src+imgs[i]}" alt="">
                `;
            }
        }
        $(".zx-detail-img").html(html);
    }
    ajax(http_url.url+"/answer/isAnswer",{"questionUuid":id},get_ques);
    //税种,专题列表
    function get_sz(data){
        
        console.log(data);
        var industry_html='';
        var categorys=data.categorys,
            industry=categorys[2].children,list=[],list_item={};
        for(var j=0;j<categorys[1].children.length;j++){
            var act="";
            // if(j==0){
            //     act="tax-category-act";
            // }else{
            //     act="";
            // }
            industry_html+=`
                <div class="inline-block ${act}" data-id="${categorys[1].children[j].uuid}">${categorys[1].children[j].name}</div>
            `
        }
        $(".sz_sel").html(industry_html);
       // sz_lizt.push($(".tax-category-act").html());
        $(".sz_list").val(sz_lizt);
        for(var i=0;i<industry.length;i++){
            list_item={title:industry[i].name,value:industry[i].uuid};
            list.push(list_item);
        }
        //企业名称
        $("#hy").select({
            items: list,
            onClose:function(){
                // alert(11)
            }
        });
    }
    ajax_nodata(http_url.url+"/category/tree",get_sz);
    //税种点击
    $("body").on("click",".sz_sel>div",function(){
        if( $(this).hasClass("tax-category-act")){
            $(this).removeClass("tax-category-act");
            sz_lizt.remove($(this).html());
        }else{
            $(this).addClass("tax-category-act");
            sz_lizt.push($(this).html());
        }
        $(".sz_list").val(sz_lizt);
    });
    //提交答案点击
    $(".release").click(function(){
        var questionUuid=id,
            answerContent=$("#answer-textarea").val(),
            taxId= $(".sz_list").val(),
            topicId=$("#hy").val();
        console.log(taxId);
        //提交答案
        function sub_answer(data){
            
            console.log(data);
            if(data.code==1){
                alert(data.des);
                window.location.href="../html/quick-answer.html"
            }else{
                alert(data.des);
            }
        }
        if(answerContent==""){
            alert("您还未作答,请输入您的答案")
        }else  if(topicId==""){
            alert("请选择所属专题")
        }else  if(taxId==""){
            alert("请选择所属税种")
        }else{
            ajax(http_url.url+"/answer/openQuestion",{
                "questionUuid":questionUuid,
                "answerContent":answerContent,
                "taxId":taxId,
                "topicId":topicId
            },sub_answer);
        }
    })
});