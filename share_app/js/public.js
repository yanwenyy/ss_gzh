var hostName = {
    formal_url:"https://api.jieshuibao.com/",//正式
    test_url:"http://test.jieshuibao.com/jsb_webserver/",//测试
    url:"https://api.jieshuibao.com/"
};

//正式  https://bsb.jieshuibao.com/
//测试  http://test.jieshuibao.com/jsb_bsb/

//获取地址栏参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//转换时间戳
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}
//转换时间
function timesChange(url){	
	var datas= new Date(parseInt(url)).toLocaleString().replace(/:\d{1,2}$/,' ');
	var reg = /[\u4e00-\u9fa5]/g,
		a = datas.replace(reg,"-"),
		arr = a.split("--")[0];
		return arr;
}
//转换时间戳
function changetimes(url){
	var localDate = new Date(url);
	return localDate.getUTCFullYear() +
		'-' + ('0' + (localDate.getMonth() + 1)).slice(-2) +
		'-' + ('0' + localDate.getDate()).slice(-2) +
		' ' + ('0' + localDate.getHours()).slice(-2) +
		':' + ('0' + localDate.getMinutes()).slice(-2) +
		':' + ('0' + localDate.getSeconds()).slice(-2)
}