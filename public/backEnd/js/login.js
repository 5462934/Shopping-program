$(function () {

	// 进行表单验证 bootstrap-validator
	$('#login-form').bootstrapValidator({
		feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        //多个重复
        username: {
            // 定义每个验证规则
            validators: {
							notEmpty: {
								message: '用户名不能为空'
							},
							stringLength: {
								min: 4,
								max: 16,
								message: '用户名长度在1到16位之间'
							},
							callback: {
								message: '用户名不存在'
							}
        	  }
				},
				password: {
					validators: {
						notEmpty: {
							message: '密码不能为空'
						},
						stringLength: {
							min: 6,
							max: 16,
							message: '密码长度在1到16位之间'
						},
						different: {
							field: 'username',
							message: '密码不能和用户名相同'
						},
						callback: {
							message: '密码错误'
						}
					}
				}
		}
  });

}).on('success.form.bv', function (e) {
	e.preventDefault();

	var $form = $(e.target);
	
	var bv = $form.data('bootstrapValidator');

	// 使用ajax提交表单数据
	$.ajax({
		type: 'post',
		url: '/employee/employeeLogin',
		data: $form.serialize(),
		dataType: 'json',
		success: function (data) {
			// console.log(data);
			if (data.success == true) {
				location.href = './index.html';
			} else if (data.error == 1001) {
				// 密码错误
				$('#login-form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback' )
			} else if (data.error == 1000) {
				// 用户名错误
				$('#login-form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback' )
			}
		}
	})
})