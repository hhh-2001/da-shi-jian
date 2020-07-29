//  学校内部地址 :  http://192.168.50.200:3007
$(function () {
    // 点击去注册的事件
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    // 点击去登录的事件
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    // 自定义校验规则
    layui.form.verify({
        // 数组第一项是匹配的正则,第二项是不满足正则的时候报错信息
        pwd: [/^\S{6,12}$/, '密码不能有空格,并且是6到12位'],
        // value用户输入的值
        repwd: function (value) {
            // 密码的值获取
            if ($(".reg-box [name=password]").val() !== value) {
                return '两次密码不一致!';
            }
        }
    })


    // 解构赋值语法
    // var obj = {
    //     name: 'zs',
    //     age: 20
    // }
    // var name = obj.name;
    // var age = obj.age;
    // var { name, age } = obj;
    // var layer = layui.layer;
    var { layer } = layui;  //解构赋值
    //监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        var smt = {
            username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val()
        };
        //阻止默认提交行为
        e.preventDefault();
        $.post('/api/reguser', smt, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功请登录');
            // 模拟点击行为
            $("#link_login").click();
        })
    })

    //监听登录表单的事件
    $("#form_login").submit(function (e) {
        //1. 阻止表单默认提交行为
        e.preventDefault();
        //2. 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                /* 
                    1. 我们去买票的地方,是直接可以访问,不需要买票.买完之后就会给我们票
                    2. 我们就要及时存起来, 下次去看电影初始一下就可以了
                    我们第一次登陆/login的时候,如果用户名和密码下对了,就返回一个token,我们把token存在本地数据当中, 下次访问其他需要token请求,我们就出示token就行
                */
                // 将登陆成功得到的token字符串, 保存到本地数据
                localStorage.setItem('token', res.token);
                console.log(res.token);

                // location.href = '/index.html'
            }
        })
    })
}) 