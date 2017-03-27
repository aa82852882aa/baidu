(function() {

	//ajax请求数据内容
	function getSongList(limit, offsetNum, callback) {
		offsetNum = offsetNum || 0;
		limit = limit || 6;
		//请求的地址
		var songUrl = 'http://musicapi.duapp.com/api.php';

		$.ajax({
			type: "get",
			url: songUrl + '?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=' + offsetNum + '&limit=' + limit,
			async: true,
			success: function(data) {
				if(data.code == 200) {
					//缓存json数据
					localStorage.data = JSON.stringify(data.playlists)
						//缓存当前时间
					localStorage.time = new Date().getTime();
					//利用回调，拿到请求的返回值
					callback(data.playlists);
				}
			}
		});
	}
	//图片未请求到之前执行的界面
	loadImgAnimate($('#songListItemsParent'));

	//持续加载图片的动画函数
	function loadMoreImg() {
		$.ajax({
			url: "view/loadMoreImg.html",
			success: function(data) {
				$(data).appendTo($('#songListItemsParent'));
			}
		});
	}
	
	loadMoreImg();

	var count = 8; //每次加载的数量
	var offset = 0 //加载数量的偏移值
	getSongList(count, offset, function(data) {
		
		createSongList(data);
		
		//点击图片跳转到对应的歌单链接
		$('#songListItemsParent').on('click', 'a.list', function() {
			loadPage('singlSongList', $('#god'));
		})

	})

	//数据请求成功后对dom进行循环操作
	function createSongList(data) {
		var htmlSong = $('#songListItems').html();
		var $songListItemsParent = $('#songListItemsParent');
		$('#loadImg').hide(); //初始化加载图片
		for(let i = 0; i < data.length; i++) {
			var $htmlSong = $(htmlSong);
			$htmlSong.attr('href', "#/singlSongList?id=" + data[i].id);
			$htmlSong.find('.pic img').attr('src', data[i].coverImgUrl);
			$htmlSong.find('.pic span').html(data[i].playCount);
			$htmlSong.find('.txt').html(data[i].name);
			$htmlSong.appendTo($songListItemsParent);
		}
	}

	//页面滚动加载更多图片
	$(window).scroll(function() {
		var documentHeight = $('#main').height(); //获得文档的高度 
		var viewportHeight = $(window).height() - 186; //获得窗口的高度
		var documentScorllHeight = $(window).scrollTop(); //获得滚动的高度

		//如果滚动条的高度加上视口的高度大于等于文档的高度，继续发起ajax请求，持续加载图片
		if(documentScorllHeight + viewportHeight >= documentHeight) {
			//加载图片动画显示
			$('#loadMoreImg').show();
			
			offset += count; //偏移值加等 加载数量
			//发起ajax请求
			getSongList(count, offset, function(data) {
				createSongList(data);
			})
		} else {
			
			//加载图片动画隐藏
			$('#loadMoreImg').hide();
		}
	})

})()