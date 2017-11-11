// 全局监听，当页面中某一个ajax请求发起的时候，让进度条开始
$(window).ajaxStart(function () {
	NProgress.start();
})

$(window).ajaxComplete(function () {
	NProgress.done();
})


//=================== 实现页面功能 ===================
// 点击上侧菜单按钮，侧边栏隐藏
 $('[data-menu]').on('click', function () {
 	$('.lt_aside').toggle();
 	$('.lt_section').toggleClass('menu');
 })

