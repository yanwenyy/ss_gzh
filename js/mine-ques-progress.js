$(function(){
    var questionUuid=getUrlParms("id");
   ajax(http_url.url+"/progressDetails/list",{
       "questionUuid":questionUuid,
       "businessType":"0"
   },function(data){
       var data=data.data,pro_line_html='',pro_msg_html='';
       for(var i=0;i<data.length;i++){
           var line_html='';
           if(i==0){
               line_html='<div class="pro-piont"><img src="../img/pro-piont-img-blue.png" alt=""></div>'
           }else{
               line_html=` <div class="pro-line-show"></div>
        <div class="pro-piont"><img src="../img/pro-piont-img-gray.png" alt=""></div>`;
           }
           pro_msg_html+=`
            <li class="box-sizing">
                <div>${data[i].behavior}</div>
                <div class="pro-msg-dates">${format(data[i].createdate)}</div>
            </li>
           `;
           pro_line_html+=line_html;
       }
       $('.progress-line').html(pro_line_html);
       $(".progress-msg>ul").html(pro_msg_html);
   })
});