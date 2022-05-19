// 获取文章的列表
function initArticleCateList() {
    // 提交请求
    $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            // 调用模板字符串
            const htmlStr = template("tpl-table", res.data);
            // 渲染页面
            $("tbody").html(htmlStr);
        },
    });
}

let layer = layui.layer;
let form = layui.form;
// 弹出层的索引值，用来关闭弹出层
let indexAdd = null;
let indexEdit = null;

// 调用函数
initArticleCateList();

// 为添加类别按钮绑定点击事件
$("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $("#dialog-add").html(),
    });
});

// 通过代理的形式，为form-add 表单绑定 sbumit 提交事件
$("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            layer.msg(res.message);
            // 提交成功，重新渲染页面
            initArticleCateList();
            // 根据索引值，关闭弹出层
            layer.close(indexAdd);
        },
    });
});

// 通过代理的形式，为form-add 表单绑定 sbumit 提交事件
$("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            layer.msg(res.message);
            // 提交成功，重新渲染页面
            initArticleCateList();
            // 根据索引值，关闭弹出层
            layer.close(indexEdit);
        },
    });
});

// 通过代理的形式，为 btn-edit 按钮绑定点击事件
$("tbody").on("click", ".btn-edit", function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "修改文章分类",
        content: $("#dialog-edit").html(),
    });

    // 获取当前点击条 数据的id
    const id = $(this).attr("data-id");
    // console.log(id);
    // 发起请求
    $.ajax({
        method: "get",
        url: "/my/article/cates/" + id,
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            // 初始化页面数据 通过 layui.form.val() 方法
            form.val("form-edit", res.data);
        },
    });
});


// 通过代理的形式，为 btn-delete 按钮绑定点击事件
$("tbody").on("click", ".btn-delete", function () {
    // 获取当前点击条 数据的id
    const id = $(this).attr("data-id");
    // console.log(id);
    // 提示用户是否要删除
    layer.confirm("确认删除？", { icon: 3, title: "提示" }, function (index) {
        // 发起请求
        $.ajax({
            method: "get",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);
                layer.msg(res.message);
                // 关闭提示框
                layer.close(index);
                // 重新渲染页面
                initArticleCateList();
            },
        });
    });
});
