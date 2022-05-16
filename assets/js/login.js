// 点击 去注册账号的 链接
$('#link_reg').on('click',() =>{
    $('.login-box').hide();
    $('.reg-box').show();
})

// 点击 去登陆 的链接
$('#link_login').on('click',() =>{
    $('.login-box').show();
    $('.reg-box').hide();
})