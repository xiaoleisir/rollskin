define(['jcookie'], () => {
    return {
        init: function() {
            //1.通过地址栏获取列表页面传入的sid。
            let $sid = location.search.substring(1).split('=')[1];

            if (!$sid) { //列表页面没有传入sid，默认为1
                $sid = 1;
            }

            //2.将sid传给后端，后端根据对应的sid返回不同的数据。
            $.ajax({
                url: 'http://10.31.161.106/dashboard/rollskin/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                //获取数据，将数据放入对应的结构中。
                $('#smallpic').attr('src', data.url);
                $('.deal_wrap h1').html(data.title);
                $('.js-oprice').html(data.used);
                $('.loadpcp').html(data.price);
                $('#bpic').attr('src', data.url);

                //渲染放大镜下面的小图
                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '<ul>';
                const $list = $('#list');
                $.each($picurl, function(index, value) {
                    $strhtml += `<li><img src="${value}"/></li>`;
                });
                $strhtml += '<ul>';
                $list.html($strhtml);
            });
            //小图切换 - 小图是渲染出来的，找不到li。
            $('#list').on('click', 'li', function() { //事件委托,ul元素没有高度不可见，委托#list
                let imgurl = $(this).find('img').attr('src'); //获取当前图片的地址
                $('#smallpic').attr('src', imgurl);
                $('#bpic').attr('src', imgurl);
            });






            let arrsid = [];
            let arrnum = [];

            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }
            $('.p-btn').on('click', function() {
                getcookietoarray();
                if ($.inArray($sid, arrsid) === -1) {

                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 6, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 6, path: '/' });
                } else {

                    let $index = $.inArray($sid, arrsid);

                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 6, path: '/' });
                }
            });
        }
    }
});