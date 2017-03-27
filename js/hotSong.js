function getTopSongList(limit, callback) {
	limit = limit || 6;
	//请求的url
	var xhrUrl = 'http://musicapi.duapp.com/api.php';

	//判断是否使用缓存
//	if(storageUse()) {
//		callback(JSON.parse(localStorage.data));
//	} else { //如果没有缓存，请求url，并缓存
		$.ajax({
			type: "get",
			url: xhrUrl + "?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=" + limit,
			//			url: 'api/topPlayList.json',
			async: true,
			success: function(data) {
				if(data.code == 200) {

					//缓存到本地存储
					localStorage.data = JSON.stringify(data.playlists);
					//缓存当前时间的毫秒
					localStorage.time = new Date().getTime();
					//利用回调，拿到请求的返回值
					callback(data.playlists);
				}
			}
		});
//	}
}

//判断是否使用缓存
function storageUse() {
	//如果缓存不存在，则返回false ，访问网络
	if(!localStorage.data) {
		return false
	};
	//如果缓存超时 则返回false ，访问网络
	if(new Date().getTime() - localStorage.time >= 10 * 60 * 1000) {
		return false
	}
	//	否则返回 true 访问缓存
	return true;
}

//图片未请求到之前执行的界面
loadImgAnimate($('#songItem'));

(function() {

	getTopSongList(6, function(data) {
		createSongList(data)
		$('#songItem').on('click','a.list',function(){
			loadPage('singlSongList', $('#god'));
		})
	})

	function createSongList(data) {
		//生成推荐歌单
		var $songItem = $('#songItem');
		var htmlItem = $('#songListItems').html();
		//得到数据重置容器的内容
		$songItem.html("");
		//循环生成数据
		for(let i = 0; i < data.length; i++) {
			
			var $htmlItem = $(htmlItem).appendTo($songItem);
			$htmlItem.attr('href', "#/singlSongList?id=" + data[i].id)
			$htmlItem.find('.pic img').attr('src', data[i].coverImgUrl);
			$htmlItem.find('.pic span').html(data[i].playCount);
			$htmlItem.find('.txt').html(data[i].name)
			$htmlItem.appendTo($songItem);
		}
	}

	//幻灯片
	var $slide = $('#slide');
	var $icon = $slide.find('div.icon');
	var $li = $slide.find('li');
	//动态生成btn
	for(let i = 0; i < $slide.find('li').length; i++) {
		$('<span>').appendTo($icon);
	}

	var liWidth = $li.width(); //获得每个li的宽度

	$(window).resize(function() {
		liWidth = $li.width() //浏览器窗口改变大小动态改变li的宽度值
	})

	//点击按钮运动
	var $span = $icon.find('span');
	$span.eq(0).addClass('ac');

	$span.click(function() {
		$li.css({
			'transform': 'translateX(' + ($(this).index() * -liWidth) + 'px)'
		})
		$(this).addClass('ac').siblings('span').removeClass('ac')
	})

	//生成推荐MV
	var $songMVList = $('#songMVList');

	var htmlMVItem = $('#songMVListItem').html();
	for(let i = 0; i < 4; i++) {
		$(htmlMVItem).appendTo($songMVList);
	}
})()