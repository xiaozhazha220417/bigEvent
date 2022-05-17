// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // headers 就是请求头配置对象
        // headers:{
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            // 调用渲染用户头像的 函数 renderAvatar
            renderAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     // console.log("执行了 complete 回调函数");
        //     // console.log(res);
        //     // 在 complete 回调函数中，可以使用，res.responseJSON 拿到 服务器响应回来的数据
        //     if (
        //         res.responseJSON.status === 1 &&
        //         res.responseJSON.message === "身份认证失败！"
        //     ) {
        //         // 1、强制清空 token
        //         localStorage.removeItem("token");
        //         // 2、强制跳转到登录页面
        //         location.href = "/login.html";
        //     }
        // },
    });
}

// 渲染用户头像的 函数 renderAvatar
function renderAvatar(user) {
    // 1、获取用户的名称
    let name = user.nickname || user.username;
    // 2、设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 3、按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1、渲染用户图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 3.2、渲染用户文本头像
        $(".layui-nav-img").hide();
        let firstStr = name[0].toUpperCase();
        $(".text-avatar").html(firstStr).show();
    }
}

// 设置layui
let layer = layui.layer;

// 调用 getUserInfo 获取用户基本信息
getUserInfo();

// 用户退出登录事件 点击按钮，实现退出功能
$("#btnLogout").on("click", function () {
    // console.log('ok');
    layer.confirm("确认退出登录", { icon: 3, title: "提示" }, function (index) {
        // console.log('ok');
        // 1、清空本地存储中的token
        localStorage.removeItem("token");
        // 2、重新跳转到登录页面
        location.href = "/login.html";
        // 关闭 confirm 询问框
        layer.close(index);
    });
});
