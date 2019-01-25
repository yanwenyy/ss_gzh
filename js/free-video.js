$(function(){
    var id=getUrlParms("id");
    var sp_time=0;
    // //视频点击
    // $("body").on("click",".ccH5PlayBtn",function(){
    //     // var timer=setInterval(function(){
    //     //     sp_time++;
    //     //     console.log(sp_time);
    //     //     if(sp_time==30){
    //     //         clearInterval(timer);
    //     //     }
    //     // },1000);
    //     // FullScreen();
    // });
    //进入全屏
    function FullScreen() {
        var ele = document.documentElement;
        if (ele .requestFullscreen) {
            ele .requestFullscreen();
        } else if (ele .mozRequestFullScreen) {
            ele .mozRequestFullScreen();
        } else if (ele .webkitRequestFullScreen) {
            ele .webkitRequestFullScreen();
        }
    }
    //退出全屏
    function exitFullscreen() {
        var de = doreplaybtncument;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
});