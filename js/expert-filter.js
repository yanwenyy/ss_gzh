$(function(){
    //省市内容
    var html='<li class="pro_blue" data-msg="">全部</li>';
    for(var i=0,len=self_city.length;i<len;i++){
        var change_v=self_city[i];
        html+=`<li data-msg="${change_v.name}">${change_v.name}</li>`
    }
    $(".filter-city-city>ul").html(html);
   //一级筛选栏点击
   $(".filter-total li").click(function(){
       var that=$(this);
       $(".filter-total li").removeClass("total-li-act");
       $(this).addClass("total-li-act");
       $(".filter-city-area").addClass("out");
       var act=$(this).attr("data-act");
       if(act=="filter-city"){//省市
           $(".filter-city").removeClass("out");
           $(".filter-class").addClass("out");
       }else{
           function get_list(data){
               // console.log(data);
               var categorys=data.categorys,zt="",sz="",hy="",html='<li data-id="">全部</li>';
               for(var p=0,len_c=categorys.length;p<len_c;p++){
                   var change_v=categorys[p];
                   if(change_v.name=="专题"){
                       zt=change_v;
                   }else if(change_v.name=="税种"){
                       sz=change_v;
                   }else if(change_v.name=="行业"){
                       hy=change_v;
                   }
               }
               if(that.attr("data-type")==1){//专题
                   for(var i=0,len1=zt.children.length;i<len1;i++){
                       var change_v=zt.children[i];
                       html+=`
                        <li data-type="1" data-id="${change_v.uuid}">${change_v.name}</li>
                    `
                   }
               }else if(that.attr("data-type")==2){//税种
                   for(var i=0,len2=sz.children.length;i<len2;i++){
                       var change_v=sz.children[i];
                       html+=`
                        <li data-type="2" data-id="${change_v.uuid}">${change_v.name}</li>
                    `
                   }
               }else if(that.attr("data-type")==3){//行业
                   for(var i=0,len3=hy.children.length;i<len3;i++){
                       var change_v=hy.children[i];
                       html+=`
                        <li data-type="3" data-id="${change_v.uuid}">${change_v.name}</li>
                    `
                   }
               }
               $(".filter-class ul").html(html);
           }
           ajax_nodata(http_url.url+"/category/tree",get_list);
           $(".filter-city").addClass("out");
           $(".filter-class").removeClass("out");
       }
   });
    //省份点击
    $("body").on("click",".filter-city-city li",function(){
        $(".filter-city-area").removeClass("out");
        $(".filter-city-city li").removeClass("pro_blue");
        $(this).addClass("pro_blue");
        var html='<li class="city_blue" data-msg="">全部</li>';
        for(var i=0;i<self_city.length;i++){
            if($(this).html()==self_city[i].name){
                for(var k=0;k<self_city[i].sub.length;k++){
                    html+=`<li data-msg="${self_city[i].sub[k].name}">${self_city[i].sub[k].name}</li>`
                }
            }
        }
        $(".filter-city-area>ul").html(html);
    });
    //城市点击
    $("body").on("click",".filter-city-area li",function(){
        $(".filter-city-area li").removeClass("city_blue");
        $(this).addClass("city_blue");
    });
    var zt_id='',sz_id='',hy_id='';
    //专题,税种,行业点击
    $("body").on("click",".filter-class li",function(){
        var type=$(this).attr("data-type");
        $(".filter-class li").removeClass("blue");
        $(this).addClass("blue");
        if(type==1){//专题
            zt_id=$(this).attr("data-id");
        }else if(type==2){//税种
            sz_id=$(this).attr("data-id");
        }else if(type==3){//行业
            hy_id=$(this).attr("data-id");
        }
    });
    //重置按钮点击
    $(".filter-reset").click(function(){
        window.location.reload();
    });
    //提交按钮点击
    $(".filter-sub").click(function(){
        var province=$(".pro_blue").attr("data-msg")||"",
            city=$(".city_blue").attr("data-msg")||"",
            topicId=zt_id,
            taxId=sz_id,
            tradeId=hy_id;
        // console.log(province);
        // console.log(city);
        // console.log(topicId);
        // console.log(taxId);
        // console.log(tradeId);
        window.location.href="expert.html?province="+encodeURIComponent(encodeURIComponent(province))+
            "&&city="+encodeURIComponent(encodeURIComponent(city))+"&&topicId="+topicId+"&&taxId="+taxId+
            "&&tradeId="+tradeId;
    })
});