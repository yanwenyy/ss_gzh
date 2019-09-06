$(function(){
    $(".back2").click(function(){
        var list=$("#foo>div"),list_id=[];
        for(var i=0,len=list.length;i<len;i++){
            var change_v=list[i];
            list_id.push(change_v.dataset.id);
        }
        if(list_id!=''){
            ajax(http_url.url+"/classify/attention/classify",{ids:list_id},function(data){
                console.log(data);
                window.history.go(-1);
            });
        }else{
            window.history.go(-1);
        }
    });
    //我的频道列表
    ajax_nodata(http_url.url+"/classify/attention/classifylist",function(data){
        // console.log(data);
        var gd_list=[],gm_list=[],pt_list=[],mine_list=data.data;
        for(var i=0,len=mine_list.length;i<len;i++){
            var change_v=mine_list[i];
            if(change_v.recommend_type==2){
                gd_list.push(change_v)
            }else if(change_v.classifyVip==0){
                gm_list.push(change_v)
            }else{
                pt_list.push(change_v)
            }
        }
        var d_html='',m_html='',p_html='';
        for(var d=0,len1=gd_list.length;d<len1;d++){
            var d_change=gd_list[d];
            d_html+=`<div class="inline-block mine-pd-list channel-mine-tj ${d_change.name.length>7?'mine-pd-list-two':''}"><span>${d_change.name}</span></div>`;
        }
        for(var m=0,len2=gm_list.length;m<len2;m++){
            var m_change=gm_list[m];
            m_html+=`<div class="inline-block mine-pd-list channel-mine-buy ${m_change.name.length>7?'mine-pd-list-two':''}"><span>${m_change.name}</span></div>`;
        }
        for(var p=0,len3=pt_list.length;p<len3;p++){
            var p_change=pt_list[p];
            p_html+=`<div class="inline-block mine-pd-list mine-pt-pd ${p_change.name.length>7?'mine-pd-list-two':''}" data-id="${p_change.id}"><span>${p_change.name}</span> <img data-id="${p_change.id}" data-name="${p_change.name}" src="../img/channel-mine-del.png" class="channel-mine-del" alt=""></div>`;
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
                    if(list_id!=''){
                        ajax(http_url.url+"/classify/attention/classify",{ids:list_id},function(data){
                            console.log(data);
                            if(data.code==1){

                            }else{
                                alert(data.des);
                            }
                        });
                    }

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
            if(list_id!=''){
                ajax(http_url.url+"/classify/attention/classify",{ids:list_id},function(data){
                    console.log(data);
                    if(data.code==1){

                    }else{
                        alert(data.des);
                    }
                });
            }
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