$(function () {

  var categorySecond = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        var second_Template = template('second_template', data);

        $('tbody').html(second_Template);

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
            categorySecond(page);
          }
        });
      }
    })
  }

  categorySecond();


  $('#secondform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类名称不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var bv = $form.data('bootstrapValidator');

    var data = $form.serialize();

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data:data,
      success:function(data){
        console.log(data);
        if(data.success == true) {
          $('#second_modal').modal('hide')
        }
      }
    })
  });
})

  var initDropDown = function () {
    $('.dropdown').on('click', '.btn', function () {
      $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
          page: 1,
          pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          var html = '';
          $.each(data.rows, function (i, item) {
            // console.log(item.id)
            html += '<li><a data-id="' + item.id + '" href="javascript:;">' + item.categoryName + '</a></li>'
          });
          $('.dropdown-menu').html(html);
          
          $('.dropdown').on('click', 'a', function () {
            $('.dropdown-text').html($(this).html())
            $('#categoryId').val($(this).attr('data-id'));
          })
        }
      })
    })
  }

initDropDown();
  var fileup = function () {
    $('#secondupload').fileupload({
      url: '/category/addSecondCategoryPic', //上传地址
      dataType: 'json',
      done: function (e, data) { // 设置文件上传完毕事件的回调函数  
        $('#previewimg').attr('src', data.result.picAddr);
        $('#brandLogo').val(data.result.picAddr);
      }
    });
  }

  fileup();

