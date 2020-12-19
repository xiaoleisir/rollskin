define([], function() {
    return {
        init: function() {
            let $form = $('#form1');
            let $tel = $('[name=tel]');
            let $password = $('[name=password]');
            let $span = $('#form1 span');
            $passflag = true;
            $telflag = true;
            $tel.on('focus', function() {
                $span.eq(0).html('请输入11位正确的手机号码').css('color', '#333');
            });
            $tel.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $span.eq(0).html('√').css('color', 'green');
                        $telflag = true;
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.106/dashboard/rollskin/php/reg.php',
                            data: {
                                tel: $tel.val()
                            }
                        }).done(function(data) {
                            if (!data) {
                                $span.eq(0).html('√').css('color', 'green');
                            } else {
                                $span.eq(0).html('该用户名已存在').css('color', 'red');
                            }
                        });
                    } else {
                        $span.eq(0).html('手机号码格式有误').css('color', 'red');
                        $telflag = false;
                    }
                } else {
                    $span.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
            });







            $password.on('focus', function() {
                $span.eq(1).html('请输入6位以上位数字加字母').css('color', '#333');
            });
            $password.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                    if ($reg.test($value)) {
                        $span.eq(1).html('√').css('color', 'green');
                        $passflag = true;
                    } else {
                        $span.eq(1).html('密码格式有误').css('color', 'red');
                        $passflag = false;
                    }
                } else {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }
            });
            $form.on('submit', function() {

                if ($tel.val() === '') {
                    $span.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }

                if (!$telflag || !$passflag) {
                    return false;
                }
            });
        }
    }
});