//加载模块的ajax函数
function loadPage(page, container) {
	container = container || $('#main');
	var pageUrl = 'view/' + page + '.html';
	$.ajax({
		type: "get",
		url: pageUrl,
		success: function(data) {
			container.html(data); // 刷新dom结构
			loadJs(page); //加载对应dom的js
		}
	});
}

//图片未请求到之前执行的界面
function loadImgAnimate(parent) {
	$.ajax({
		url: "view/loadImganimate.html",
		async: true,
		success: function(data) {
			$(data).appendTo(parent);
		}
	});
}
//加载对应的js
function loadJs(page) {
	var jsUrl = 'js/' + page + '.js';
	if(page == 'build') return;

	$.ajax({
		url: jsUrl,
		dataType: 'script'
	});
}
//加载对应的模块
$(function() {
	//加载导航模块
	loadPage('nav', $('#header'));

})
//获得url参数
function getUrlParams() {
	var params = {};
	var url = window.location.href;

	var p = url.split("#");
	if(p.length == 2)
		p = p[1];
	else
		p = url;

	p = p.split("?");
	if(p.length < 2) {
		params.anchor = p[0];
		return params;
	}

	params.anchor = p[0];
	p = p[1].split("&");

	for(var i = 0; i < p.length; i++) {
		var kv = p[i].split("=");
		params[kv[0]] = kv[1];
	}
	return params;
}

//loadTopPage();
////首次加载方法
//function loadTopPage(){
//	if(!localStorage.count){
//		localStorage.count = 0;
//	}
//	localStorage.count++
//	
//	if(localStorage.count==1){
//		loadPage('home');
//	}else{
//		//加载首页内容
//		loadPage('hotSong');
//	}
//}