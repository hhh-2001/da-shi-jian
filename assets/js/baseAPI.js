// 每次电泳$.get(), $.post(), $.ajax 的时候会先调用ajaxPrefilter这个函数, 在这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options);
    // 在发起真正的ajax请求之前, 同一拼接请求的根路径
    options.url = 'http://192.168.50.200:3007' + options.url
    console.log(options.url);

})