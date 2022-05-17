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
        -   ① 登录的用户都有 token 秘钥，来保证用户权限，把秘钥保存到 `localStorage.setItem('token',res.token);` 本地存储上面
-   优化代码
    -   ① 优化接口链接 新建 baseAPI.js 文件 生成全局接口的根路径

# 首页页面的书写

-   ① 复制 layui 库的结构布局代码，完成首页的基本布局
    -   ① 修改 结构布局
    -   ② 引入样式文件 layui.css 和 layui.all.js
-   ② 完成侧边栏的基本布局
    -   ① 给 侧边栏 加属性 `lay-shrink="all"` 完成当前展开列表项，其他列表项不展开
    -   ② 删除不需要的结构布局
-   ③ 完成字体图标引入
    -   ① 引入 字体图标库文件 iconfont.css 和 layui.css
    -   ② 完成 字体图标 插入 修改样式
-   ④ 完成内容主体区域
    -   ① 使用 `iframe` 标签 通过 `a 标签里面的 target 属性 进行连接 iframe 标签中的 name 属性` 就可以完成页面内的跳转
-   ⑤ 完成用户头像 自定义修改 和 默认样式头像 的布局
    -   ① 书写 js 完成 显示用户头像
-   ⑥ 完成用户名 匹配
    -   ① 书写 js 完成 用户名匹配

# 完成用户退出功能

-   ① 绑定退出按钮点击事件
-   ② 通过 layui 库 `confirm()` 方法实现退出登录提示信息
-   ③ 在 layui 库 `confirm()` 方法的回调函数中 清除本地存储，重新跳转到 登录页面

# 完成非法用户拦截

-   通过 Ajax 请求的回调函数 `complete` 完成 拦截非法用户
    -   `complete` 发起 Ajax 请求不管成功和失败都会调用 complete 回调函数，检测服务器返回的信息判断用户是否合法，不合法就强制退出

# 完成个人中心 基本信息 的功能

-   ① 新建文件 user_info.html user_info.css user_info.js
-   ② 书写 基本页面布局
-   ③ 完成修改用户基本信息功能
    -   ① 通过 layui 监测表单的提交信息
    -   ② 初始化用户信息 发起 get 的请求，渲染页面
    -   ③ 重置按钮功能 表示再一次 发起 get 请求，渲染页面
    -   ④ 提交修改按钮功能 表示 发起 post 请求，把表单的数据提交给服务器修改用户基本信息
    -   ⑤ 根据响应回来的数据，重新渲染页面信息,调用父页面的方法 `window.parent.getUserInfo();`

# 完成重置密码功能

-   ① 新建文件 user_pwd.html user_pwd.css user_pwd.js
-   ② 书写 基本页面布局
-   ③ 完成 重置密码 功能
    -   ① 通过 layui 监测表单的提交信息
    -   ② 提交 重置密码 请求 完成重置密码

# 完成更换头像功能

-   ① 新建文件 user_avatar.html user_avatar.css user_avatar.js
-   ② 书写 基本页面布局
-   ③ 完成 更换头像 功能
    -   ① 通过 插件`cropper`完成图片裁切
    -   ② 给页面结构 增加 提交文件的 input 并且隐藏 `<input type="file" id="file" accept="image/png,image/jpeg" />`
    -   ③ 为上传按钮绑定点击事件 --- 弹出选择图片的 功能框
    -   ④ 为文件选择框绑定 change 事件 --- 当用户提交了图片后 修改 页面裁切区域的图片
    -   ⑤ 为确定按钮，绑定事件 --- 头像上传服务器 ，重新渲染页面