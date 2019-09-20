$(function(){
    function list(){
        ajax(http_url.url+"/officialmsg/applylist/share",{
            "maxId": count_end,
            "sinceId":count_start
        },function(data){
            var datas=data.data,html='';
            if(datas&&datas!=""){
                if(datas.length<10){
                    $(".office-list-more").hide();
                }
                for(var i=0,len=datas.length;i<len;i++){
                    var change_v=datas[i];
                    html+=`
                    <tr>
                        <td>${change_v.name||''}</td>
                        <td>${change_v.phone||''}</td>
                        <td>${change_v.unit_name}</td>
                        <td>${change_v.attest_type==1?'税务局官方账号':'行业协会官方账号'}</td>
                        <td>${change_v.principal}</td>
                        <td>${change_v.card_id}</td>
                        <td>${change_v.tel_phone}</td>
                        <td>${format(change_v.create_time)}</td>
                    </tr>
                `
                }
                $("tbody").append(html);
            }
        })
    }
    list();
    //加载更多点击
    $(".office-list-more").click(function(){
        num+=1;
        count_start=((num-1)*10)+1;
        count_end=num*10;
        list();
    })
});