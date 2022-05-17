let form = layui.form;
let layer = layui.layer;
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return "昵称长度必须在1-6个字符之间!";
        }
    },
});

// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            // 调用form.val() 快速为表单赋值
            form.val("formUserInfo", res.data);
        },
    });
}
// 调用函数
initUserInfo();

// 重置表单的数据
$("#btnReset").on("click", (e) => {
    e.preventDefault();
    // 调用函数
    initUserInfo();
});

// 监听表单的提交事件
$('.layui-form').submit(function(e){
    e.preventDefault();
    // 发起ajax请求
    $.ajax({
        type: "post",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            // console.log(res);
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息，
            // console.log(window.parent);
            window.parent.getUserInfo();
        }
    });
});
