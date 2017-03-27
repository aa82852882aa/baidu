(function() {
	var pageId = getUrlParams();
	//请求歌曲
	function loadSong(id, callback) {
		var songUrl = 'http://musicapi.duapp.com/api.php?type=url&id=' + id;

		$.ajax({
			type: "get",
			url: songUrl,
			async: true,
			success: function(data) {
				if(data.code == 200) {
					callback(data.data[0]);
				}
			}
		});
	}

	//请求歌曲图片
	function loadPic(id, callback) {
		var songUrl = 'https://api.imjad.cn/cloudmusic/?type=playlist&id=' + id;
		$.ajax({
			type: "get",
			url: songUrl,
			async: true,
			success: function(data) {
				if(data.code == 200) {
					callback(data.playlist);
				}
			}
		});
	}

	//执行歌曲ajax请求
	loadSong(pageId.id, function(data) {
		playSong(data);
	})
		//执行界面ajax
	loadPic(pageId.id, function(data) {
		playImgTxt(data);
	})

	//设置歌曲
	function playSong(data) {
		var $audio = $('#play').find('audio');
		$audio.attr('src', data.url);
		var $allPlaySongList = $('#allPlaySongList');
		var $pause = $('#pause');
		var $playNext = $('#playNext');

		if($audio[0].play()) {
			$pause.find('img').attr('src', 'img/playbar_btn_pause.png');
		}

		//点击开始暂停按钮事件
		var on = true;
		$pause.click(function() {
			if(on) {
				$audio[0].pause();
				$(this).find('img').attr('src', 'img/playbar_btn_play.png');
				on = false;
			} else {
				$audio[0].play();
				$(this).find('img').attr('src', 'img/playbar_btn_pause.png');
				on = true
			}
		})

		//点击播放下一曲按钮
		var $playLi = $('#allSongList').find('a.list');
		var $playNext = $('#playNext');
		$playNext.click(function() {
			//执行一次列表的点击事件
			$playLi.eq(playSongIdNumber + 1).trigger('click');
			//更新url地址， 获取最新的歌曲
			window.location.href = changeUrl($playLi.eq(playSongIdNumber + 1).attr('href'));
		})
		
		//点击列表按钮，出现播放过的歌曲
		var $allPlaySongList=$('#allPlaySongList');
		var $playingSongList=$('#playingSongList');
		var $modle = $('#modle');
		
		$allPlaySongList.click(function(){
			
			$playingSongList.slideDown();
			$modle.show();
		})
		$modle.click(function(){
			$(this).toggle();
			$playingSongList.slideUp();
		})
		
		//生成播放列表
		
		var $playingSongList=$('#playingSongList')
		var playingSongListModuel=$('#playingSongListModuel').html();
		var $playingList=$('#playingList');
		$('#songNumber').html(oldPlayItems.length);
		
		for(let i=0;i<oldPlayItems.length; i++){
			var $playingSongListModuel=$(playingSongListModuel);
			$playingSongListModuel.find('a').html(oldPlayItems[i].name);
			$playingSongListModuel.appendTo($playingList);
		}
		
		//点击删除按钮，删除对应的播放列表
		
		var $close=$playingList.find('i.fa');
//		$playingList.on('click','i',function(){
//
//			oldPlayItems.splice($(this).index(),1);
//		})
		
		console.log($close.length)
		$close.click(function(){
			oldPlayItems.splice($(this),1);
		})
		
	}

	//	修改url地址
	function changeUrl(url){
		var oldUrl=window.location.href;
		var p=oldUrl.split("#");
		return p[0]+ url;
	}
	
	//设置界面图片内容
	function playImgTxt(data) {
		var footerInner = $('#footerInner');
		if(!data.creator.avatarUrl) {
			return
		}
		footerInner.find('div.pic').find('img').attr('src', data.creator.avatarUrl)
	}

})()