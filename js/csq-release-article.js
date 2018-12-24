$(function(){
    //复制按钮点击
    $(".clone_pc_url").click(function(){
        var text = document.getElementById("text").innerText;
        var input = document.getElementById("clone_model");
        input.value = text; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
        alert("复制成功");
    });
    //文章标签
    function get_art_label(data){
        
        //console.log(data);
        var categories=data.categories,html="";
        for(var i=0;i<categories.length;i++){
            var consultant_goodat_act;
            if(i==0){
                consultant_goodat_act="consultant-goodat-act";
            }else{
                consultant_goodat_act="";
            }
            html+=`
                <div class="inline-block ${consultant_goodat_act}" data-id="${categories[i].uuid}">${categories[i].name}</div>
            `;
        }
        $(".consultant-list-sel").html(html);
    }
    ajax_nodata(http_url.url+"/article/category",get_art_label);
    //标签列表点击
    $("body").on("click",".consultant-list-sel>div",function(){
        $(".consultant-list-sel>div").removeClass("consultant-goodat-act");
        $(this).addClass("consultant-goodat-act");
    })
    //发送按钮点击
    $(".release").click(function(){
        var title=$(".art_write_title>input").val(),
            content=$(".art_write_text").val(),
            categoryId=$(".consultant-goodat-act").attr("data-id");
        function release_art(data){
            
            //console.log(data);
            if(data.code==1&&data.des=="发布成功"){
                alert(data.des);
                window.location.href="../html/index-csq.html";
            }
        }
        if(title!=""&&content!=""&&categoryId!=""){
            ajax(http_url.url+"/article/addArticle",{"title":title,"content":content,"categoryId":categoryId},release_art);
        }else{
            alert("请完善信息")
        }
    })
});