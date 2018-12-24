$(function(){
    var videoId=getUrlParms("videoId"),phone=getUrlParms("phone");
    function get_video(data){
        console.log(data)
    }
    function showData (data) {
                   console.info("调用showData");

                 var result = JSON.stringify(data);
                 console.log(result)
    }
    $.ajax({
        type:"GET",
        url:"http://spark.bokecc.com/api/video/v3",
        data:{"videoid":"5B154675C175D5DE9C33DC5901307461","userid":"A0123BC413D6FBAE",
            "format":"json"},
        success:function(data){
            console.log(data);
        },
        error:function(){
            alert("程序出错,请重试!")
        }
    });
    // ajax("http://spark.bokecc.com/api/video/v4",{"videoid":videoId,"userid":18701497496,"format":"json"},get_video)
});