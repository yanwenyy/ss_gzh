$(function(){
    //返回按钮点击
    $(".back").click(function(){
        window.location.href="index.html";
    });
    var i_province=decodeURIComponent(decodeURIComponent(getUrlParms("province")||"")),i_city=decodeURIComponent(decodeURIComponent(getUrlParms("city")||""));
    var map;
    if(i_province!=""&&i_province!=null){
        $(".city-msg").html(i_city||i_province);
        function get_center(data){
            console.log(data);
            if(data.datas&&data.datas!=[]&&data.datas!=""){
                map = new AMap.Map('container', {
                    resizeEnable: true,
                    zoom:13,
                    viewMode:'3D',//使用3D视图
                    center: [data.datas[0].longitude, data.datas[0].latitude]//中心点坐标
                });
                AMap.plugin('AMap.ToolBar',function(){//异步加载插件
                    var toolbar = new AMap.ToolBar();
                    map.addControl(toolbar);
                });
                AMap.event.addListener(map, "click", function(e) {
                    $(".map-marker-msg").hide();
                });
                $(".map_msg_hidden").attr("data-province",i_province).attr("data-city",i_city).attr("data-lng",data.datas[0].longitude).attr("data-lat",data.datas[0].latitude);
                var marker = new AMap.Marker({
                    position:new AMap.LngLat(data.datas[0].longitude,data.datas[0].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    icon: "../img/icon-map-show.png", // 添加 Icon 图标 URL
                    zoom: 13
                });
                var marker_data=data.datas;
                var markerList=[];
                try{
                    for(var i=0;i<marker_data.length;i++){
                        var iocn='',marker_msg=marker_data[i],type_msg='',flag_color='';
                        if(marker_data[i].type=="3"){
                            iocn="../img/flag-blue.png";
                            type_msg="战略合作伙伴";
                            flag_color="blue"
                        }else if(marker_data[i].type=="2"){
                            iocn="../img/flag-red.png";
                            type_msg="授权服务商";
                            flag_color="red"
                        }else{
                            iocn="../img/icon-map-show.png";
                            // type_msg="普通机构";
                        }
                        var content=`<div style=""><div style="min-width:20rem;width:auto;font-size: 2.4rem">${marker_data[i].name}</div><div style="font-size: 2rem" class="${flag_color}">${type_msg}</div><img src="${iocn}"></div>`;
                        var marker = new AMap.Marker({
                            position:new AMap.LngLat(marker_data[i].longitude,marker_data[i].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                            icon: iocn, // 添加 Icon 图标 URL
                            title: marker_data[i].name+" "+type_msg,
                            content:content,
                            zoom: 13
                        });
                        marker_click(marker,markerList,marker_data);
                        markerList.push(marker);
                        map.add(marker);
                    }

                    map.setFitView();

                    // console.log(markerList);
                    // map.add(markerList);
                    //alert(markerList);

                }catch(e){
                    alert(e)
                }
                map.add(marker);
            }else{
                map = new AMap.Map('container', {
                    resizeEnable: true,
                    zoom:13,
                    viewMode:'3D',//使用3D视图
                });
                AMap.plugin('AMap.ToolBar',function(){//异步加载插件
                    var toolbar = new AMap.ToolBar();
                    map.addControl(toolbar);
                });
            }
            //定位城市点击
            $("body").on("click",".city-msg",function(){
                window.location.href="mechanism-city-list.html?source=map.html";
            });

        }
        if(i_province=="全国"){
            ajax(http_url.url+"/agency/findAgencysByParams",{
                "type":"1",
                "latitude":sessionStorage.getItem("lat"),
                "longitude":sessionStorage.getItem("lng"),
            },get_center)
        }else{
            ajax(http_url.url+"/agency/findAgencysByParams",{
                "province":i_province,
                "city":i_city,
                "type":"1",
                "latitude":sessionStorage.getItem("lat"),
                "longitude":sessionStorage.getItem("lng"),
            },get_center)
        }
    }else{
        map= new AMap.Map('container', {
            resizeEnable: true,
            zoom:13,
            viewMode:'3D',//使用3D视图
            // center: [116.397428, 39.90923]//中心点坐标
        });
        AMap.event.addListener(map, "click", function(e) {
            $(".map-marker-msg").hide();
        });
        AMap.plugin('AMap.ToolBar',function(){//异步加载插件
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar);
        });
    }
    // AMap.event.addListener(map, "click", function(e) {
    //     $(".map-marker-msg").hide();
    // });

    function showCityInfo() {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    //console.log(result);
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    //alert('您当前所在城市：'+cityinfo);
                    if(i_province==""){
                        $(".city-msg").html(cityinfo);
                    }else{
                        $(".city-msg").html(i_province);
                    }
                    //地图显示当前城市
                    // map.setBounds(citybounds);
                }
            } else {
                alert(result.info)
            }
        });
    }
     // showCityInfo();
    var geolocation;
    function get_geolocation(){
        AMap.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                showButton:false,
                panToLocation:true,
                showMarker:true,
                // circleOptions:{"fillOpacity":0,"strokeOpacity":0},
                showCircle:true,
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    onComplete(result)
                }else{
                    onError(result)
                }
            });
        });
        //解析定位结果
        function onComplete(data) {
            console.log(data);
            // alert(data.addressComponent);
            var province=data.addressComponent.province,city=data.addressComponent.city;
            // if(i_province==""){
            //     province=data.addressComponent.province;
            //     // $(".city-msg").html(province);
            // }else{
            //     province=i_province;
            //     // $(".city-msg").html(province);
            // }
            $(".city-msg").html(data.addressComponent.province);
            // if(i_city==""){
            //     city=data.addressComponent.city;
            // }else{
            //     city=i_city;
            // }
            var lng=data.position.getLng(),
                lat=data.position.getLat();
                sessionStorage.setItem("lng",lng);
                sessionStorage.setItem("lat",lat);
                $(".map_msg_hidden").attr("data-province",province).attr("data-city",city).attr("data-lng",lng).attr("data-lat",lat);
            $.ajax({
                type:"POST",
                url:http_url.url+"/agency/findAgencysByParams",
                dataType: "json",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=utf-8",
                    "cookieId":sessionStorage.getItem("cookieId")
                },
                data:JSON.stringify({
                    "province":province,
                    "city":city,
                    "latitude":lat,
                    "longitude":lng,
                    "type":"1"
                }),
                success:function(data){
                    console.log(data);
                    var marker_data=data.datas;
                    var markerList=[];
                    try{
                        for(var i=0;i<marker_data.length;i++){
                            var iocn='',marker_msg=marker_data[i],type_msg='',flag_color='';
                            if(marker_data[i].type=="3"){
                                iocn="../img/flag-blue.png";
                                type_msg="战略合作伙伴";
                                flag_color="blue"
                            }else if(marker_data[i].type=="2"){
                                iocn="../img/flag-red.png";
                                type_msg="授权服务商";
                                flag_color="red"
                            }else{
                                iocn="../img/icon-map-show.png";
                                // type_msg="普通机构";
                            }
                            var content=`<div style=""><div style="min-width:20rem;width:auto;font-size: 2.4rem">${marker_data[i].name}</div><div style="font-size: 2rem" class="${flag_color}">${type_msg}</div><img src="${iocn}"></div>`;
                            var marker = new AMap.Marker({
                                position:new AMap.LngLat(marker_data[i].longitude,marker_data[i].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                icon: iocn, // 添加 Icon 图标 URL
                                title: marker_data[i].name+" "+type_msg,
                                content:content,
                                zoom: 13
                            });
                            marker_click(marker,markerList,marker_data);
                            markerList.push(marker);
                            map.add(marker);
                        }
                        // map.add(markerList);
                        //alert(markerList);

                    }catch(e){
                        alert(e)
                    }

                },
                error:function(){
                    console.log("程序出错,请重试");
                }
            });
        }
        //解析定位错误信息
        function onError(data) {
            console.log(data);
            // alert('失败原因排查信息:'+data.message);
        }
    }
    var zoom;
    //级别改变的时候
    function zoom_change(markerList){
        if(zoom<13){
            for(var i=0;i<markerList.length;i++){
                var content=`<img src="${markerList[i].C.icon}">`;
                markerList[i].setContent(content);
            }
        }else{
            for(var i=0;i<markerList.length;i++){
                var flag_color='';
                if(markerList[i].C.icon=="../img/flag-blue.png"){
                    flag_color='blue';
                }else{
                    flag_color='red';
                }
                var content=`<div style=""><div style="min-width:20rem;width:auto;font-size: 2.4rem">${markerList[i].C.title.split(" ")[0]}</div><div style="font-size: 2rem" class="${flag_color}">${markerList[i].C.title.split(" ")[1]}</div><img src="${markerList[i].C.icon}"></div>`;
                markerList[i].setContent(content);
            }
        }
    }
    function marker_click(marker,markerList,marker_data){
        var marker_i='';
        map.remove(marker_i);
        AMap.event.addListener(map, "zoomend", function(e) {
           zoom= map.getZoom();
            zoom_change(markerList);
        });
        AMap.event.addListener(map, "touchmove", function(e) {
            zoom_change(markerList);
            $(".map-marker-msg").hide();
        });
        AMap.event.addListener(map, "mapmove", function(e) {
            zoom_change(markerList);
            $(".map-marker-msg").hide();
        });
        AMap.event.addListener(map, "click", function(e) {
            zoom_change(markerList);
            $(".map-marker-msg").hide();
        });
        AMap.event.addListener(marker, "touchstart", function(e) {
            zoom_change(markerList);
            // console.log(this);
            if(this.C.icon!="../img/icon-map-show.png"){
                var flag_click='',flag_color='';
                if(this.C.icon=="../img/flag-blue.png"){
                    flag_click='../img/flag-blue-click.png';
                    flag_color="blue"
                }else{
                    flag_click='../img/flag-red-click.png';
                    flag_color="red"
                }
                var content=`<div style="min-width:20rem;width:auto;font-size: 2.4rem">${marker.C.title.split(" ")[0]}</div><div style="font-size: 2rem" class="${flag_color}">${marker.C.title.split(" ")[1]}</div><img src="${flag_click}">`;
                marker.setContent(content);
                for(var k=0;k<marker_data.length;k++){
                    if(e.target.C.title.split(" ")[0]==marker_data[k].name){
                        var company_img='',company_name='';
                        if(marker_data[k].type==2){
                            company_img="../img/icon-map-list-red.png";
                            company_name="授权服务商";
                        }else if(marker_data[k].type==3){
                            company_img="../img/icon-map-list-blue.png";
                            company_name="合作伙伴";
                        }
                        var distance="";
                        if(marker_data[k].distance>1000){
                            distance=parseFloat(marker_data[k].distance/1000).toFixed(1)+"k"
                        }else{
                            distance=marker_data[k].distance;
                        }
                        var look_num='';
                        if(marker_data[k].views&&marker_data[k].views.length>4){
                            look_num=parseFloat(marker_data[k].views/10000).toFixed(1)+"万";
                        }else{
                            look_num=marker_data[k].views||0;
                        }
                        var picture=marker_data[k].picture.split(",");
                        var html=`
                                        <div data-id="${marker_data[k].id}" data-vid="${marker_data[k].videoId}">
                                            <img src="${marker_data[k].videoCover?cover_src+marker_data[k].videoCover:cover_src+picture[0]}"  data-id="${marker_data[k].id}" data-vid="${marker_data[k].videoId}" class="marker-msg-img2 jglb_click" alt="">
                                            <div class="inline-block marker-msg-main">
                                                <div class="marker-msg-title jglb_click"  data-id="${marker_data[k].id}"  data-vid="${marker_data[k].videoId}">${marker_data[k].name}</div>
                                                <div class="marker-msg-distance jglb_click"  data-id="${marker_data[k].id}"  data-vid="${marker_data[k].videoId}">
                                                    <div class="inline-block">
                                                        <img class="jgxz" src="${company_img}" alt="">
                                                    </div>
                                                    <div class="distance-grounp">
                                                        <div class="inline-block"><span>${look_num}</span>人浏览</div>
                                                        <div class="inline-block">距您${distance}m</div>
                                                    </div>
                                                </div>
                                                <div class="marker-msg-phone2">
                                                    <div class="inline-block">${marker_data[k].contactNo}</div>
                                                    <a href="tel:${marker_data[k].contactNo}"><img src="../img/mer-hzhb-phone.png" alt=""></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="marker-msg-footer">
                                            <div class="inline-block jglb_click"  data-id="${marker_data[k].id}"  data-vid="${marker_data[k].videoId}">
                                                <div class="inline-block" style="vertical-align: middle"><img src="../img/icon-map-bottom-position.png" alt=""></div>
                                                <div class="inline-block footer_adress" style="line-height: 2.1rem;width: 80%;vertical-align: middle">${marker_data[k].address}</div>
                                            </div>
                                            <div class="inline-block daohang">
                                                <img style="width:3.5rem;height:1.2rem" src="../img/icon-map-leading2.png" alt="">
                                                <!--<span class="blue">导航</span>-->
                                            </div>
                                    </div>
                                    `;
                        $(".map-marker-msg").html(html).show();
                        //导航按钮点击
                        $(".daohang").click(function(){
                            marker.markOnAMAP({
                                position:marker.getPosition()
                            });
                        })
                    }
                }
            }else{
                $(".map-marker-msg").hide();
            }
        });
    }
    get_geolocation();
    //定位按钮点击
    $(".city-geolaction").click(function(){
        map.remove(geolocation);
        get_geolocation();
    });
    //机构列表点击
    $(".release").click(function(){
        if($(".map_msg_hidden").attr("data-province")==""||$(".map_msg_hidden").attr("data-province")==null){
            alert("定位中,请稍后点击")
        }else{
            window.location.href="mechanism-list.html?province="+encodeURIComponent(encodeURIComponent($(".map_msg_hidden").attr("data-province")))+"&&city="+encodeURIComponent(encodeURIComponent($(".map_msg_hidden").attr("data-city")))+"&&lng="+$(".map_msg_hidden").attr("data-lng")+"&&lat="+$(".map_msg_hidden").attr("data-lat");
        }
    });
    //定位城市点击
    $("body").on("click",".city-msg",function(){
        window.location.href="mechanism-city-list.html?source=map.html";
    });
    //机构弹框点击
    $("body").on("click",".jglb_click",function(){
        window.location.href="office-detail.html?id="+$(this).attr("data-id");
        // if($(this).attr("data-vid")&&$(this).attr("data-vid")!=""){
        //     window.location.href="merchanism-video.html?id="+$(this).attr("data-id")+"&&videoId="+$(this).attr("data-vid");
        // }
    })
});