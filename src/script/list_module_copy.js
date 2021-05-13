define(['jlazyload'], function() {
    return {
        init: function() {
            const $list = $('.list ul');
            //1.渲染列表页面
            $.ajax({
                url: 'http://10.31.161.106/dashboard/rollskin/php/listdata.php',
                dataType: 'json'
            }).done(function(datalist) {
                data = datalist.pagedata; //获取接口里面数据
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                <p>${value.title}</p>
                                <span>￥${value.price}</span>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
        }
    }
});