$(function () {
  var categoryFirst = function (pageNum)  {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      dateType: 'json',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      success: function (data) {
        console.log(data)
        var firstResult = template('firstTemplate', data)

        $('tbody').html(firstResult);

        $('.pagination').bootstrapPaginator({
          /*当前使用的是3版本的bootstrap*/
          bootstrapMajorVersion: 3,
          /*配置的字体大小是小号*/
          size: 'small',
          /*当前页*/
          currentPage: data.page,
          /*一共多少页*/
          // 总页数=数据的总数/每页显示多少条数据
          totalPages: Math.ceil(data.total / data.size),
          /*点击页面事件*/
          onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            categoryFirst(page);
          }
        });
      }
    })
  }
  categoryFirst();


  // 添加分类校验

  $('#first-form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
  });

  $('#first-modal').on('click', '#save', function () {
    var formData = $('#first-form').serialize();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: formData,
      dataType: 'json',
      success: function (data) {
        if(data.success == true) {
          $('#first-modal').modal('hide');
          categoryFirst();
        }
      }
    })
  })
})