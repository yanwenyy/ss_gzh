$(function(){
    $(".back2").click(function(){
        var list=$("#foo>div"),list_id=[];
        for(var i=0;i<list.length;i++){
            list_id.push(list[i].dataset.id);
        }
        ajax(http_url.url+"/classify/attention/classify",{ids:list_id},function(data){
            console.log(data);
            window.history.go(-1);
        });
    });
    //我的频道列表
    ajax_nodata(http_url.url+"/classify/attention/classifylist",function(data){
        // console.log(data);
        var gd_list=[],gm_list=[],pt_list=[];
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].recommend_type==2){
                gd_list.push(data.data[i])
            }else if(data.data[i].classifyVip==0){
                gm_list.push(data.data[i])
            }else{
                pt_list.push(data.data[i])
            }
        }
        var d_html='',m_html='',p_html='';
        for(var d=0;d<gd_list.length;d++){
            d_html+=`<div class="inline-block mine-pd-list channel-mine-tj ${gd_list[d].name.length>7?'mine-pd-list-two':''}"><span>${gd_list[d].name}</span></div>`;
        }
        for(var m=0;m<gm_list.length;m++){
            m_html+=`<div class="inline-block mine-pd-list channel-mine-buy ${gm_list[m].name.length>7?'mine-pd-list-two':''}"><span>${gm_list[m].name}</span></div>`;
        }
        for(var p=0;p<pt_list.length;p++){
            p_html+=`<div class="inline-block mine-pd-list mine-pt-pd ${pt_list[p].name.length>7?'mine-pd-list-two':''}" data-id="${pt_list[p].id}"><span>${pt_list[p].name}</span> <img data-id="${pt_list[p].id}" data-name="${pt_list[p].name}" src="../img/channel-mine-del.png" class="channel-mine-del" alt=""></div>`;
        }
        $(".mine-gd-pd").html(d_html).append(m_html);
        $("#foo").html(p_html);
    });
    //删除按钮点击
    $("body").on("click",".channel-mine-del",function(){
        var that=$(this);
        if(confirm("确定要删除吗")===true){
            ajax(http_url.url+"/classify/del/classify",{id:$(this).attr("data-id")},function(data){
                if(data.code==1){
                    that.parent().remove();
                    var html=` <div class="inline-block ${that.attr("data-name").length>7?'mine-pd-list-two':''}"  style="background: #fff;border:1px solid #E5E5E5" data-id="${that.attr("data-id")}">${that.attr("data-name")}  <img  data-id="${that.attr("data-id")}" data-name="${that.attr("data-name")}" src="../img/channel-mine-add.png" class="channel-mine-add" alt=""></div>`;
                    $(".channel-tj").append(html);
                    $(".channel-mine-add").show();
                }else{
                    alert(data.des);
                }
            })
        }
    });
    //添加按钮点击
    $("body").on("click",".channel-mine-add",function(){
        $(this).parent().remove();
        var html=` <div class="inline-block mine-pd-list ${$(this).attr("data-name").length>7?'mine-pd-list-two':''}" data-id="${$(this).attr("data-id")}">${$(this).attr("data-name")}  <img  data-id="${$(this).attr("data-id")}" data-name="${$(this).attr("data-name")}"  src="../img/channel-mine-del.png" class="channel-mine-del"  alt=""></div>`;
        $("#foo").append(html);
        $(".channel-mine-del").show();
    });
    //更多频道列表
    ajax_nodata(http_url.url+"/classify/more/classify",function(data){
        // console.log(data);
        var html='';
        for(var i=0;i<data.data.length;i++){
            html+=` <div class="inline-block ${data.data[i].name.length>7?'mine-pd-list-two':''}" style="background: #fff;border:1px solid #E5E5E5" data-id="${data.data[i].id}">${data.data[i].name}  <img  data-id="${data.data[i].id}" data-name="${data.data[i].name}"  src="../img/channel-mine-add.png" class="channel-mine-add" style="display: block" alt=""></div>`
        }
        $(".channel-tj").html(html);
    });
    //编辑按钮点击
    $(".channel-mine-edit").click(function(){
        if($(this).html()=="编辑"){
            var that=$(this);
            $(this).html("完成");
            $(".channel-mine-del").show();
            $(".channel-mine-add").show();
            //手机自带返回按钮点击
            if (window.history && window.history.pushState)
            { $(window).on('popstate', function() { var hashLocation = location.hash; var hashSplit = hashLocation.split("#!/");
                var hashName = hashSplit[1];
                if (hashName !== '') { var hash = window.location.hash; if (hash === '') {
                    that.html("编辑");
                    var list=$("#foo>div"),list_id=[];
                    for(var i=0;i<list.length;i++){
                        list_id.push(list[i].dataset.id);
                    }
                    ajax(http_url.url+"/classify/attention/classify",{ids:list_id},function(data){
                        console.log(data);
                        if(data.code==1){

                        }else{
                            alert(data.des);
                        }
                    });
                    $(".channel-mine-del").hide();
                    $(".channel-mine-add").hide();
                } } });
                window.history.pushState('forward', null, './#forward');
            }
        }else{
            $(this).html("编辑");
            var list=$("#foo>div"),list_id=[];
            for(var i=0;i<list.length;i++){
                list_id.push(list[i].dataset.id);
            }
            ajax(http_url.url+"/classify/attention/classify",{ids:list_id},function(data){
                console.log(data);
                if(data.code==1){

                }else{
                    alert(data.des);
                }
            });
            $(".channel-mine-del").hide();
            $(".channel-mine-add").hide();
        }
    });
    //拖放
    Sortable.create(document.getElementById('foo'), {
        animation: 150, //动画参数
        onAdd: function (evt){ //拖拽时候添加有新的节点的时候发生该事件
            //console.log('onAdd.foo:', [evt.item, evt.from]);
        },
        onUpdate: function (evt){ //拖拽更新节点位置发生该事件
            // console.log('onUpdate.foo:', [evt.item, evt.from]);
        },
        onRemove: function (evt){ //删除拖拽节点的时候促发该事件
            // console.log('onRemove.foo:', [evt.item, evt.from]);
        },
        onStart:function(evt){ //开始拖拽出发该函数
            console.log('onStart.foo:', [evt.item, evt.from]);
            var index = $(evt.item).parent().children().index($(evt.item));
            console.log(index);
        },
        onSort:function(evt){ //发生排序发生该事件
            // console.log('onSort.foo:', [evt.item, evt.from]);
        },
        onEnd: function(evt){ //拖拽完毕之后发生该事件
            console.log('onEnd.foo:', [evt.item, evt.from]);
            var index = $(evt.item).parent().children().index($(evt.item));
            console.log(index+1);
        }
    });
    //长按事件
    $(".channel-c-main-list>div").on({
        touchstart: function(e) {
            // 长按事件触发
            timeOutEvent = setTimeout(function() {
                timeOutEvent = 0;
                // alert('你长按了');
                $(".channel-mine-del").show();
                $(".channel-mine-add").show();
            }, 1000);
            //长按400毫秒
            // e.preventDefault();
        },
        touchmove: function() {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
        },
        touchend: function() {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0) {
                // 点击事件
                // location.href = '/a/live-rooms.html';
                // alert('你点击了');
            }
            return false;
        }
    })
});