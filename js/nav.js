(function() {
	//加载导航的默认模块
	loadPage('hotSong', $('#main'));

	var $nav = $('#nav');
	var $list = $nav.find('a.list');
	var $bgBar = $nav.find('span.bgBar');

	var listWidth = $list.width(); //获得每个nav的宽度
	$(window).resize(function() {
		listWidth = $list.width(); //动态获得每个nav的宽度
	})

	//nav的点击事件
	$list.click(function(e) {
		$bgBar.css({
			'transform': 'translateX(' + ($(this).index() * listWidth) + 'px)'
		})
		$(this).addClass('ac').siblings().removeClass('ac');

		var url = $(this).attr('href');

		Page(url);
	})
})()

//导航加载对应的模块
function Page(url) {

	if(!url) {
		return
	}

	var newUrl = url.slice(1, url.length);

	loadPage(newUrl);
}