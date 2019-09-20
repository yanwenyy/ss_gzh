$(function(){
    var bg=localStorage.getItem("bg")||1,
        share_url='',
        role=getUrlParms("role");
    $(".mine-card-body").addClass("mine-card-bg"+bg);
    //用户所有信息
    ajax_nodata(http_url.url+"/user/message",function(data){
        var msg=data;
        var html=`
            <div class="mine-card-head">
                 <img src="${headimage(msg.headImage)}" onerror=src="../img/user.png" alt="">
                 <div class="inline-block mine-card-name">
                            ${get_name(msg)}
                 </div>
                 <div class="inline-block mine-card-dj ${msg.role==2?'':'out'}">${msg.levelName}</div>
                <div class="mine-card-rz">
                        <div class="inline-block mine-card-rz-color${bg} ${msg.lecturer==1?'':'out'}">
                            <img src="../img/mine-card-rz${bg}.png" alt="">
                            讲师
                        </div>
                        <div class="inline-block mine-card-rz-color${bg} ${msg.role==2?'':'out'}">
                            <img src="../img/mine-card-rz${bg}.png" alt="">
                            税务师、律师
                        </div>
                        <div class="inline-block ${msg.role==3?'':'out'}">
                            <img src="../img/office-p-rz.png" alt="">
                            官方认证
                        </div>
                </div>
            </div>
            <div class="mine-card-agdress">
                <span>${msg.province}</span>
                <span class="inline-block mine-card-agdress-line ${msg.position&&msg.role!=3?'':'out'}"></span>
                <span class="${msg.role!=3?'':'out'}">${msg.position}</span>
            </div>
            <div class="mine-card-company">${msg.companyName}</div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-p.png" alt="">
                ${msg.cardPhone||msg.phone}
            </div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-m.png" alt="">
               ${msg.email||"未填写"}
            </div>
            <div class="mine-card-msg-li">
                <img src="../img/mine-card-a.png" alt="">
                ${msg.officeAddress||"未填写"}
            </div>
        `;
        $(".mine-card-main-msg").html(html);
        if(msg.brushNum){
            $(".mine-card-code-ss>span").html(msg.brushNum)
        }else{
            $(".mine-card-code-ss>span").hide();
        }
    });
    share_url=role!=3?"jsb_weixin/share_app/html/personal-new.html":"jsb_weixin/share_app/html/personal-official.html";
    //二维码
    var qrcode = new QRCode('qrcode', {
        text: 'your content',
        width: 256,
        height: 256,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
    qrcode.clear();
    qrcode.makeCode(total_share_url.url+share_url);
    var qrcode2= new QRCode('qrcode2', {
        text: 'your content',
        width: 256,
        height: 256,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
    qrcode2.clear();
    qrcode2.makeCode(total_share_url.url+share_url);
    //保存到相册
    $(".save-album").click(function(){
        html2canvas($(".mine-card-body-copy"),{ // $(".myImg")是你要复制生成canvas的区域，可以自己选
            onrendered:function(canvas){
                dataURL =canvas.toDataURL("image/png");
                // $("body").append(canvas);
                $(".img-model").show();
                $(".img-show").attr("src",dataURL);
                //下载图片
                // $('#down_button').attr( 'href' ,  dataURL ) ;
                // $('#down_button').attr( 'download' , 'myjobdeer.png' ) ;
            },
            // width:100%,
            // height:400
        })
    });
    //编辑名片
    $(".edit-mine-card").click(function(){
        window.location.href="mine-card-edit.html"
    });
});