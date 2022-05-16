// 点击 去注册账号的 链接
$("#link_reg").on("click", () => {
    $(".login-box").hide();
    $(".reg-box").show();
});

// 点击 去登陆 的链接
$("#link_login").on("click", () => {
    $(".login-box").show();
    $(".reg-box").hide();
});

// 自定义 layui 的 密码框 校验规则
// 从layui中获取form对象
let form = layui.form;

// 通过form.verify() 函数自定义校验规则
form.verify({
    // 自定义了一个叫做 pwd 校验规则
    // 输入一个非空格的6到12位的密码
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 自定义 确认密码 的 校验规则
    repwd: (value) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则return一个提示消息即可
        let pwd = $(".reg-box [name=password]").val();
        if (pwd !== value) {
            return "两次密码不一致！";
        }
    },
});

// 设置项目的请求根路径
// const baseUrl = `http://www.liulongbin.top:3007`;

// 设置 用户注册的提示信息
let layer = layui.layer;

// 监听注册表单的提交事件
$("#form_reg").on("submit", function (e) {
    e.preventDefault();
    const data = {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
    };
    $.post(`/api/reguser`, data, (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        // 注册成功后自动跳转到登录界面
        // 模拟点击事件
        $("#link_login").click();
    });
});

// 监听登录表单的提交事件
$("#form_login").on("submit", function (e) {
    e.preventDefault();
    // $.ajax的提交方式
    // let data = $(this).serialize();
    // console.log(data);
    // $.ajax({
    //     url:`${baseUrl}/api/login`,
    //     type:'post',
    //     data:data,
    //     success: (res) =>{
    //         if (res.status !== 0) return layer.msg(res.message);
    //         layer.msg(res.message);
    //         console.log(res.token);
    //         // 登录成功跳转首页
    //         location.href = '/index.html'
    //     }
    // });

    //  $.post 的提交方式
    const data = {
        username: $("#form_login [name=username]").val(),
        password: $("#form_login [name=password]").val(),
    };
    $.post(`/api/login`, data, (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        // 将登陆成功得到的token 字符串 保存到 localStorage 中
        localStorage.setItem('token',res.token);
        // console.log(res.token);
        // 登录成功跳转首页
        location.href = "/index.html";
    });
});
