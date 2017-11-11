$(function () {
	// 获取呈现数据
	var getUserManageData = function () {
		$.ajax({
			type: 'get',
			url: '/user/queryUser',
			data: {
				page: pageNum || 1,
				pageSize: 10
			},
			success: function() {
				console.log(data);
			}
		})
	}

	// 页面载入完成调用ajax呈现数据
	getUserManageData();
})