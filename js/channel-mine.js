$(function(){
    //编辑按钮点击
    $(".channel-mine-edit").click(function(){
        if($(this).html()=="编辑"){
            $(this).html("完成");
            $(".channel-mine-del").show();
            $(".channel-mine-add").show();
        }else{
            $(this).html("编辑");
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