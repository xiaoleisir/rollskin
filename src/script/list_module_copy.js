//分页的接口：http://10.31.161.32/JS2010/projectname/php/listdata.php
//前端获取总的页数：后端提供
//pagination.js分页的插件，支持AMD格式。
//列表页的思路
//第一步：渲染列表页的第一页，默认的数据。
//第二步：将分页页码传递给后端，后端返回对应页码的数据，重新渲染。上面的两步渲染过程是一样的，数据是有区别的。
//第三步：排序，获取对应的元素结构(li)里面的价格(数字),将li组成为一个数组,对数组里面的li元素进行排序
//第四步：采用冒泡排序，两两相互比较(价格),通过价格改变li的排序。
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