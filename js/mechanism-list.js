$(function(){
    var province=decodeURIComponent(decodeURIComponent(getUrlParms("province")||"")),
        city=decodeURIComponent(decodeURIComponent(getUrlParms("city")||""));
        // lng=getUrlParms("lng")||"",
        // lat=getUrlParms("lat")||"";
    var lng,lat;
    if(province=="全国"){
        province=""
    }
    if(sessionStorage.getItem("lng")&&sessionStorage.getItem("lat")){
      lng=sessionStorage.getItem("lng");
        lat=sessionStorage.getItem("lat");
        ajax(http_url.url+"/agency/findAgencysByParams",{
            "province":province,
            "city":city,
            "latitude":lat,
            "longitude":lng
        },get_msg);
        scroll_more(http_url.url+"/agency/findAgencysByParams",{
            "province":province,
            "city":city,
            "latitude":lat,
            "longitude":lng
        },get_msg_more);
    }else{
        var map = new AMap.Map('.iCenter');
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    lng=result.position.getLng();
                    lat=result.position.getLat();
                    ajax(http_url.url+"/agency/findAgencysByParams",{
                        "province":province,
                        "city":city,
                        "latitude":lat,
                        "longitude":lng
                    },get_msg);
                    scroll_more(http_url.url+"/agency/findAgencysByParams",{
                        "province":province,
                        "city":city,
                        "latitude":lat,
                        "longitude":lng
                    },get_msg_more);
                    sessionStorage.setItem("lng",result.position.getLng());
                    sessionStorage.setItem("lat",result.position.getLat());
                }else{
                    onError(result)
                }
            });
        });
        //解析定位错误信息
        function onError(data) {
            alert('失败原因排查信息:'+data.message);
        }
    }
    $(".city-name-m").html(city||province||"全国");
    function get_msg(data){
        console.log(data);
        var datas=data.datas,html='';
        for(var i=0;i<datas.length;i++){
            var company_img='';
            if(datas[i].type==2){
                company_img="../img/icon-map-list-red.png";
            }else if(datas[i].type==3){
                company_img="../img/icon-map-list-blue.png";
            }
            var distance="";
            if(datas[i].distance>1000){
                distance=parseFloat(datas[i].distance/1000).toFixed(1)+"k"
            }else{
                distance=datas[i].distance;
            }
            var look_num='';
            if(datas[i].views&&datas[i].views.length>4){
                look_num=parseFloat(datas[i].views/10000).toFixed(1)+"万";
            }else{
                look_num=datas[i].views||0;
            }
            html+=`
                <div class="map-marker-msg box-sizing" data-id="${datas[i].id}">
                    <div>
                        <img src="${cover_src+datas[i].videoCover}" data-id="${datas[i].id}" class="marker-msg-img jglb_click"  data-vid="${datas[i].videoId}" alt="">
                        <div class="inline-block marker-msg-main">
                            <div class="marker-msg-title jglb_click"  data-vid="${datas[i].videoId}" data-id="${datas[i].id}">${datas[i].name}</div>
                            <div class="marker-msg-distance jglb_click"  data-vid="${datas[i].videoId}" data-id="${datas[i].id}">
                                <div class="inline-block">
                                    <img src="${company_img}" alt="">
                                </div>
                                
                                <div class="distance-grounp jglb_click"  data-vid="${datas[i].videoId}"  data-id="${datas[i].id}">
                                      <div class="inline-block"><span>${look_num}</span>人浏览</div>
                                      <div class="inline-block">距您${distance}m</div>
                                </div>
                            </div>
                            <div class="marker-msg-phone">
                                <div class="inline-block lx-phone"><a  href="tel:${datas[i].contactNo}">${datas[i].contactNo}<img src="../img/mer-hzhb-phone.png" alt=""></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="marker-msg-footer">
                        <div class="inline-block jglb_click"  data-vid="${datas[i].videoId}"  data-id="${datas[i].id}">
                            <div class="inline-block" style=""><img src="../img/icon-map-bottom-position.png" alt=""></div>
                            <div class="inline-block" style="line-height: 3.3rem;width: 80%;vertical-align: middle">${datas[i].address}</div>
                        </div>
                        <div class="inline-block daohang" data-lat="${datas[i].latitude}" data-lng="${datas[i].longitude}">
                             <img src="../img/icon-map-leading2.png"  style="margin-top: -0.3rem"  alt="">
                             <span class="blue">导航</span>
                        </div>
                    </div>
                </div>
            `
        }
        $(".merhcanism-list-msg").html(html);
    }
    function get_msg_more(data){
        console.log(data);
        var datas=data.datas,html='';
        if(datas!=""){
            for(var i=0;i<datas.length;i++){
                var company_img='';
                if(datas[i].type==2){
                    company_img="../img/icon-map-list-red.png";
                }else if(datas[i].type==3){
                    company_img="../img/icon-map-list-blue.png";
                }
                var distance="";
                if(datas[i].distance>1000){
                    distance=parseFloat(datas[i].distance/1000).toFixed(1)+"k"
                }else{
                    distance=datas[i].distance;
                }
                var look_num='';
                if(datas[i].views&&datas[i].views.length>4){
                    look_num=parseFloat(datas[i].views/10000).toFixed(1)+"万";
                }else{
                    look_num=datas[i].views||0;
                }
                html+=`
                <div class="map-marker-msg box-sizing" data-id="${datas[i].id}">
                    <div>
                        <img src="${cover_src+datas[i].videoCover}" data-id="${datas[i].id}" class="marker-msg-img jglb_click"  data-vid="${datas[i].videoId}" alt="">
                        <div class="inline-block marker-msg-main">
                            <div class="marker-msg-title jglb_click"  data-vid="${datas[i].videoId}" data-id="${datas[i].id}">${datas[i].name}</div>
                            <div class="marker-msg-distance jglb_click"  data-vid="${datas[i].videoId}" data-id="${datas[i].id}">
                                <div class="inline-block">
                                    <img src="${company_img}" alt="">
                                </div>
                                
                                <div class="distance-grounp jglb_click"  data-vid="${datas[i].videoId}"  data-id="${datas[i].id}">
                                      <div class="inline-block"><span>${look_num}</span>人浏览</div>
                                      <div class="inline-block">距您${distance}m</div>
                                </div>
                            </div>
                            <div class="marker-msg-phone">
                                <div class="inline-block lx-phone"><a  href="tel:${datas[i].contactNo}">${datas[i].contactNo}<img src="../img/mer-hzhb-phone.png" alt=""></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="marker-msg-footer">
                        <div class="inline-block jglb_click"  data-vid="${datas[i].videoId}" data-id="${datas[i].id}">
                            <div class="inline-block" style=""><img src="../img/icon-map-bottom-position.png" alt=""></div>
                            <div class="inline-block" style="line-height: 3.3rem;width: 80%;vertical-align: middle">${datas[i].address}</div>
                        </div>
                        <div class="inline-block daohang" data-lat="${datas[i].latitude}" data-lng="${datas[i].longitude}">
                             <img src="../img/icon-map-leading2.png" style="margin-top: -0.3rem" alt="">
                             <span class="blue">导航</span>
                        </div>
                    </div>
                </div>
            `
            }
            $(".merhcanism-list-msg").append(html);
        }else{
            scroll_status=false;
            $(".msg-loading").hide();
        }
    }

    //机构列表点击
    $("body").on("click",".jglb_click",function(){
        var that=$(this);
        // function get_detail(data){
        //     console.log(data);
        //     window.location.href="merchanism-video.html?id="+that.attr("data-id")+"&&videoId="+data.obj.videoId;
        // }
        // ajax(http_url.url+"/agency/getAgencyById",{"id":$(this).attr("data-id")},get_detail);
        if($(this).attr("data-vid")&&$(this).attr("data-vid")!=""){
            window.location.href="merchanism-video.html?id="+$(this).attr("data-id")+"&&videoId="+$(this).attr("data-vid");
        }
    });
    //定位城市点击
    $("body").on("click",".city-name-m",function(){
        window.location.href="mechanism-city-list.html?source=mechanism-list.html";
    });
    //导航按钮点击
    $("body").on("click",".daohang",function(){
        window.location.href="navigation.html?lat="+$(this).attr("data-lat")+"&&lng="+$(this).attr("data-lng");
    });
    //导航栏地图按钮点击
    $(".toditu").click(function(){
        if(province==""){
            province="全国"
        }
        window.location.href="map.html?province="+encodeURIComponent(encodeURIComponent(province))+"&&city="+encodeURIComponent(encodeURIComponent(city));
    });
    $(".back").click(function(){
        window.location.href="index.html";
    });
    //搜索按钮点击
    $('.search-mer-input').bind('keydown',function(event){
        if(event.keyCode == "13") {
           if($(this).val()==""){
               ajax(http_url.url+"/agency/findAgencysByParams",{
                   "province":province,
                   "city":city,
                   "latitude":lat,
                   "longitude":lng
               },get_msg);
               scroll_more(http_url.url+"/agency/findAgencysByParams",{
                   "province":province,
                   "city":city,
                   "latitude":lat,
                   "longitude":lng
               },get_msg_more);
           }else{
               ajax(http_url.url+"/agency/findAgencysByParams",{
                   "latitude":lat,
                   "longitude":lng,
                   "name":$(this).val()
               },get_msg);
               scroll_more(http_url.url+"/agency/findAgencysByParams",{
                   "latitude":lat,
                   "longitude":lng,
                   "name":$(this).val()
               },get_msg_more);
           }
        }
    });
});

