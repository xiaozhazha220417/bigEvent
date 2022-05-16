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
        - 对dom节点的显示和隐藏完成 切换的功能   

# 表单预验证功能
  - 使用layui插件库实现表单预验证功能 
    - ① 在表单的input中写入 `lay-verify="required"` 
    - ② 在文件底部导入layui.all.js文件
    - ③ 使用自定义的 layui 的校验规则 
      - 1、获取 `layui.form` 对象 
      - 2、通过 `form.verify()` 方法 自定义 密码 校验规则 校验规则key为pwd
      - 3、设置校验规则 在 页面的input 添加校验规则  `lay-verify="required|pwd"`
      - 4、设置自定义 确认密码 校验规则 校验规则key 为 repwd ，添加校验规则

# 完成注册功能

