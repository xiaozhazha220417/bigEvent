# 项目准备

1. 准备素材
2. 创建网页（index.html 和 login.html）

# 登陆页面的书写

-   1、新建 login.css 和 login.js 文件
-   2、引入新建文件和依赖文件
-   3、书写 html 和 css 代码
    -   完成登陆表单框
    -   完成注册表单框
-   4、书写 js 代码
    -   完成点击文字 切换 登陆和注册
        -   对 dom 节点的显示和隐藏完成 切换的功能

# 表单预验证功能

-   使用 layui 插件库实现表单预验证功能
    -   ① 在表单的 input 中写入 `lay-verify="required"`
    -   ② 在文件底部导入 layui.all.js 文件
    -   ③ 使用自定义的 layui 的校验规则
        -   1、获取 `layui.form` 对象
        -   2、通过 `form.verify()` 方法 自定义 密码 校验规则 校验规则 key 为 pwd
        -   3、设置校验规则 在 页面的 input 添加校验规则 `lay-verify="required|pwd"`
        -   4、设置自定义 确认密码 校验规则 校验规则 key 为 repwd ，添加校验规则

# 完成注册功能

-   使用老师提供的接口完成注册
    -   ① 给注册表单 设置 id 值
    -   ② 获取注册表单 监控注册表单的提交事件 `$('#form_reg').on('submit',函数体)`
    -   ③ 获取事件对象，禁止注册表单默认提交事件 `e.preventDefault()`
    -   ④ 根据接口文档 发起 post 请求，完成注册
-   优化用户注册提示
    -   使用 `layui.layer.msg()` 方法，优化用户注册提示信息

# 完成登录功能

-   使用老师提供的接口完成登录
    -   ① 给登录表单 设置 id 值
    -   ② 获取登录表单 监控注册表单的提交事件 `$('#form_login').on('submit',函数体)`
    -   ③ 获取事件对象，禁止注册表单默认提交事件 `e.preventDefault()`
    -   ④ 根据接口文档 发起 post 请求，完成登录
    -   ⑤ 提示登录成功跳转到首页
    -   注意：
        -   ① 登录的用户都有token秘钥，来保证用户权限，把秘钥保存到 `localStorage.setItem('token',res.token);` 本地存储上面
-   优化代码
    - ① 优化接口链接 新建baseAPI.js 文件 生成全局接口的根路径
