// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);

// 为上传按钮绑定点击事件
$("#btnChooseImage").on("click", function () {
    $("#file").click();
});

let layer = layui.layer;

// 为文件选择框绑定 change 事件
$("#file").on("change", function (e) {
    // console.log(e);
    // 获取用户选择的文件
    let fileList = e.target.files;
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

// 为确定按钮，绑定事件
$("#btnUpload").on("click", function () {
    // 1、要拿到用户裁剪之后的头像
    let dataUrl = $image
        .cropper("getCroppedCanvas", {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100,
            // 将 Canvas 画布上的内容，转换为 base64 格式的字符串
        })
        .toDataURL("image/png");
    // 2、调用接口，把用户头像上传到服务器
    $.ajax({
        type: "post",
        url: "/my/update/avatar",
        data: {
            avatar: dataUrl,
        },
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res);
            // 更换图片成功后，重新渲染页面
            window.parent.getUserInfo();
        },
    });
});
