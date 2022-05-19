$(function () {
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);
                // layer.msg(res.message);
                // 调用模板引擎渲染分类的可选项
                const htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                // 通过 layui 重新渲染表单区域的 UI 结构
                form.render();
            },
        });
    }

    let form = layui.form;
    let layer = layui.layer;

    // 调用初始化文章分类的方法
    initCate();

    // 初始化富文本编辑器
    initEditor();

    // 1. 初始化图片裁剪器
    let $image = $("#image");

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: ".img-preview",
    };

    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 为选择封面按钮绑定点击事件
    $("#btnChooseImage").on("click", function () {
        $("#file").click();
    });

    // 为隐藏的文件选择框绑定 change 事件
    $("#file").on("change", function (e) {
        // console.log(e);
        // 获取用户选择的文件
        let fileList = e.target.files;
        // 判断用户是否选择了文件
        if (fileList.length === 0) return layer.msg("请选择照片！");

        // 1、拿到用户选择的文件
        let file = fileList[0];
        // 2、将文件，转化为路径
        let imgUrl = URL.createObjectURL(file);
        // 3、重新初始化裁剪区域
        // cropper("destroy") 销毁旧的裁剪区域
        // attr("src", imgUrl) 重新设置图片路径
        // cropper(options) 重新初始化裁剪区域
        $image.cropper("destroy").attr("src", imgUrl).cropper(options);
    });

    // 完成发布文章
    // 1、准备数据
    // 2、发起请求

    // ! 1、准备数据
    // title 文章标题
    // cate_id 所属分类 Id
    // content 文章内容
    // cover_img 文章封面
    // state 状态，可选值为：已发布、草稿

    // 定义文章的发布状态
    // 因为数据 state 的 值是可以确定的 ，所以先准备 state 的数据
    let article_state = "已发布";
    // 为存为草稿按钮，绑定点击事件处理程序
    $("#btnSave2").on("click", function () {
        article_state = "草稿";
    });

    // 准备 表单的数据 通过 forData 获取 表单提交的数据，处理数据
    // 为表单绑定 submit 提交事件
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        // ! 1、 基于 form 表单 ，快速创建一个ForData 对象
        const fd = new FormData($(this)[0]);
        // ! 2、将文章的发布状态，存到fd中
        fd.append("state", article_state);

        // ! 3、将封面裁剪过后的图片，输出为一个文本对象
        $image
            .cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280,
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // ! 4、将文件对象，存储到 fd 中
                fd.append("cover_img", blob);

                // console.log(fd);
                // fd.forEach((val, key) => {
                //     console.log(val, key); // key 可以获取 title  title content
                // });
                // ! 5、发起 ajax 数据 请求
                // 调用发布文章的方法
                publishArticle(fd);
            });
    });

    // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: fd,
            // 注意：如果向服务器提交的是 fordata 格式 的数据，
            // 必须添加以下两个 配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 发布文章成功后，跳转到文章列表页面
                location.href = "/article/article_list.html";
            },
        });
    }
});
