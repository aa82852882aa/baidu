var playSongIdNumber = 0;
var oldPlayItems = [];
(function() {
	//创建aja请求歌单数据
	function createSongList(id, callback) {
		$.ajax({
			type: "get",
			url: "https://api.imjad.cn/cloudmusic/?type=playlist&id=" + id,
			async: true,
			success: function(data) {

				callback(data.playlist);
			}
		});
	}

	var songIdList = getUrlParams();

	//图片未请求到之前执行的界面
	loadImgAnimate($('#singlSong'));

	//调用请求文件并在回调函数中处理数据
	createSongList(songIdList.id, function(data) {
		//隐藏加载图片
		$('#loadImg').remove();

		//生成歌曲头部
		var songTitle = $('#songTitle').html();
		var $songDesc = $('#songDesc');
		var $songTitle = $(songTitle);

		$songTitle.find('.songHeadImg').attr('src', data.creator.avatarUrl);
		$songTitle.find($('.songDesc')).find('h3').html(data.name);
		$songTitle.find('.author').find('img').attr('src', data.creator.avatarUrl);
		$songTitle.find('.author').find('span').html(data.creator.nickname);
		$songTitle.find('div.blar').find('img').attr('src', data.creator.avatarUrl)

		$songDesc.html($songTitle);

		//循环输出歌单
		var $allSong = $('#allSong');
		var allSongitems = $('#allSongitems').html();
		var html = "";
		for(let i = 0; i < data.tracks.length; i++) {
			var $songListHtml = $(allSongitems);
			$songListHtml.find('.list').attr('href', '#footer?id=' + data.tracks[i].id).attr('data-id', data.tracks[i].id)
			$songListHtml.find('.listNum').html(i + 1);
			$songListHtml.find('.songName').html(data.tracks[i].name);
			$songListHtml.find('.name').html(data.tracks[i].ar[0].name);
			html += $songListHtml.html();
			$allSong.html(html)
		}
		//		$('#singlSong').hide();
		//每个歌曲链接的点击事件
		var $li = $('#allSongList').find('a.list');
		$li.click(function() {
			$(this).addClass('ac').siblings().removeClass('ac');
			loadPage('footer', $('#footer'));
			playSongIdNumber = $(this).index();

			//创建一个歌曲信息的对象
			var oldSong = {};
			oldSong.id = $(this).attr('data-id');
			oldSong.name = $(this).find('.songName').html();
			
//			console.log(oldSong);
			
			//判断数组中是否存在点击的歌曲
			if(oldPlayItems.length==0) {
				oldPlayItems.push(oldSong)
			}else{
				for(var i = 0; i < oldPlayItems.length; i++) {
					if(oldPlayItems[i].id == $(this).attr('data-id')) {
						console.log(111);
						return;
					} else {
						console.log(222);
						oldPlayItems.push(oldSong);
					}
				}
			}
			//			$(oldPlayItems).each(function(){
			//				if($(this).id == _this.attr('data-id')){
			//					return
			//				}else{
			//					oldPlayItems.push(oldSong);
			//				}
			//			})

		})

		var $backToIndex = $('#backToIndex');
		$backToIndex.click(function() {
			//			$('#god').html("");
			$('#singlSong').hide();
			var $header = $('<header id="header">').appendTo($('#god'));
			var $section = $('<section class="main" id="main">').appendTo($('#god'));
			loadPage('nav', $header);
			loadPage('hotSong', $section);
		})

	});

})()