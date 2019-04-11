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
    //视频事件监控
//     function on_cc_h5player_init() {
//         var oVideo = document.getElementsByTagName('video')[0];
//         var num=0,num_staus=true;
//         oVideo.addEventListener('play', function() {
//             var timer=setInterval(function(){
//                 //视频播放计时
//                 if(oVideo.paused){
//
//                 }else{
//                     num++;
//                     if(num>10){
//                         if(confirm("您可以点击确定跳过视频围观此问题,也可以选择取消继续观看此视频后围观问题")==true){
//                             clearInterval(timer);
//                             ajax(http_url.url+"/onlook/look/buy",{
//                                 "uuid":id,
//                                 "payType":"watchVideo",
//                                 "money":1,
//                                 "source":"1"
//                             },function(data){
//                                 if(data.code==1){
//                                     window.location.href="../html/watch-anwser.html?newuser=yes&&cwatch_id="+id;
//                                 }else{
//                                     alert(data.des);
//                                 }
//                             })
//                         }else{
//                             clearInterval(timer);
//                         }
//
//                     }
//                 }
//             },1000);
//         });
//         oVideo.addEventListener('pause', function() {
//
//         });
//         oVideo.addEventListener('ended', function() {
//             alert('播放结束');
//             ajax(http_url.url+"/onlook/look/buy",{
//                 "uuid":id,
//                 "payType":"watchVideo",
//                 "money":1,
//                 "source":"1"
//             },function(data){
//                 if(data.code==1){
//                     window.location.href="../html/watch-anwser.html?newuser=yes&&cwatch_id="+id;
//                 }else{
//                     alert(data.des);
//                 }
//             })
//         });
// // 			oVideo.addEventListener('seeked', function() {
// // 				alert('拖拽');
// // 			})
//         function oVideo (){
//         }
//     }
});