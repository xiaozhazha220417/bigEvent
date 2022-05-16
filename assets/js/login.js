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
        let pwd = $('.reg-box [name=password]').val();
        if(pwd !== value){
            return '两次密码不一致！'
        }
    },
});
