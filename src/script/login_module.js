define([], function() {
    return {
        init: function() {
            const $telphone = $('#telphone');
            const $password = $('#password');
            const $login = $('#login'); //登录按钮

            $login.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.106/dashboard/rollskin/php/login.php',
                    data: {
                        tel: $telphone.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    if (!data) { //登录失败
                        alert('用户名或者密码有误!');
                        $password.val(''); //密码清空
                    } else { //登录成功
                        location.href = 'index.html';
                        //存储用户名，方便首页获取。
                        localStorage.setItem('loginname', $tel.val());
                    }
                })
            });
        }
    }
})