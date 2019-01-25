$(function(){
    var id=getUrlParms("id");
    var sp_time=0;
    //视频点击
    $("body").on("click",".ccH5PlayBtn",function(){
        var timer=setInterval(function(){
            sp_time++;
            console.log(sp_time);
            if(sp_time==15){
                clearInterval(timer);
                function num(data){
                    console.log(data)
                }
                ajax(http_url.url+"/agency/increaseBrowsingTimes",{"id":id},num);
            }
        },1000);
    });
    //播放按钮点击
    $("body").on("click",".ccH5TogglePause",function(){
        // alert(111)
    });
    //暂停按钮点击
    $("body").on("click",".ccH5TogglePlay",function(){
        // alert(222)
    })
});