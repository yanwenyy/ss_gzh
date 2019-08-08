$(function(){
    var channel_search_history=[];
    if(localStorage.getItem("channel_search_history")){
        channel_search_history=JSON.parse(localStorage.getItem("channel_search_history"));
        $(".channel-search-history").removeClass("out");
        if(channel_search_history!=''){
            var html='';
            for(var i=0;i<channel_search_history.length;i++){
                html+=`
                <li>
                    <div class="inline-block c-s-h-msg">
                        ${channel_search_history[i]}
                    </div>
                    <div class="inline-block c-s-h-del" data-val="${channel_search_history[i]}">x</div>
                </li>
            `;
            }
            $(".channel-search-history-ul").html(html);
        }
    };
    //清除每条所搜历史
    $("body").on("click",".c-s-h-del",function(){
        channel_search_history.remove($(this).attr("data-val"));
        $(this).parent().remove();
        localStorage.setItem("channel_search_history",JSON.stringify(channel_search_history));
    });
    //清除所有搜索历史
    $("body").on("click",".remove-history",function(){
        localStorage.removeItem("channel_search_history");
        $(".channel-search-history").addClass("out");
    });
    //搜索按钮点击
    $(".release").click(function(){
        $(".channel-search-history").addClass("out");
        var msg=$(".channel-search-msg").val();
        if(msg!=''){
            channel_search_history.push(msg);
            localStorage.setItem("channel_search_history",JSON.stringify(channel_search_history));
        }
    });
});