//删除上传图片操作
$('.show_UpDiv').on({
    mouseover: function () {
        $('.del_UpImg').css('display', 'block');
    },
    mouseout: function () {
        $('.del_UpImg').css('display', 'none');
    }
});