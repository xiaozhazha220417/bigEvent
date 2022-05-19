$(function () {
    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条数据
        cate_id: "", // 文章分类的id
        state: "", // 文章的发布状态
    };
    // 实例化 layui
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);

                // 使用模板引擎渲染页面的数据
                const htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);
                // 调用渲染分页的方法
                renderPage(res.total);
            },
        });
    }

    // 调用方法
    initTable();
    initCate();

    // 定义美化事件的过滤器
    template.defaults.imports.dateFormat = (dateStr) => {
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        let arr = [year, month, day, hours, minutes, seconds];
        arr = arr.map(function (val) {
            return val < 10 ? "0" + val : val;
        });
        return arr.slice(0, 3).join("/") + " " + arr.slice(3).join(":");
    };

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res);
                // 调用模板引擎渲染分类的可选项
                const htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                // console.log(htmlStr);
                // 通过 layui 重新渲染表单区域的 UI 结构
                form.render();
            },
        });
    }

    // 为筛选表单绑定 submit 事件
    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id;
        q.state = state;
        // 根据最新的筛选条件，重新渲染表格数据
        initTable();
    });

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: "pageBox", // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ["count", "limit", "prev", "page", "next", "skip"],
            limits: [2, 3, 5, 10], // 每页展示多少条
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // first如果通过点击页码的方式 first的值为undefined
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                // console.log(first);
                // console.log(obj.curr);
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr;
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit;
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                // initTable()
                if (!first) {
                    initTable();
                }
            },
        });
    }

    // 通过代理的形式，为删除按钮绑定点击事件处理程序
    $("tbody").on("click", ".btn-delete", function () {
        // 获取删除按钮的个数
        let len = $(".btn-delete").length;
        // console.log(len);
        // 获取到文章的 id
        const id = $(this).attr("data-id");
        // console.log(id);
        // 询问用户是否要删除数据
        layer.confirm(
            "确认删除?",
            { icon: 3, title: "提示" },
            function (index) {
                $.ajax({
                    method: "GET",
                    url: "/my/article/delete/" + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                        // 如果没有剩余的数据了,则让页码值 -1 之后,
                        // 再重新调用 initTable 方法
                        // 4
                        if (len === 1) {
                            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                            // 页码值最小必须是 1
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                        }
                        initTable();
                    },
                });
                layer.close(index);
            }
        );
    });
});
