define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            const $list = $('.list ul');
            let $array_default = []; 
            let $array = []; 
            $.ajax({
                url: 'http://10.31.161.106/dashboard/rollskin/php/listdata.php',
                dataType: 'json'
            }).done(function(datalist) {
                data = datalist.pagedata; 
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                <span>￥${value.price}</span>
                                <del>￥${value.used}</del>
                                <p>${value.title}</p>
                                
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });

                $('.list li').each(function(index, element) {
                    $array_default[index] = $(this); 
                    $array[index] = $(this); 
                });

                $('.page').pagination({
                    pageCount: datalist.pageno, 
                    prevContent: '上一页',
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent()); //获取当前的点击的页码。
                        $.ajax({
                            url: 'http://10.31.161.106/dashboard/rollskin/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata; 
                            let $strhtml = '';
                            $.each(data, function(index, value) {
                                $strhtml += `
                                        <li>
                                            <a href="detail.html?sid=${value.sid}">
                                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                                 <span>￥${value.price}</span>
                                                 <del>￥${value.used}</del>
                                                <p>${value.title}</p>
                                            </a>
                                        </li>
                                    `;
                            });
                            $list.html($strhtml);
                            $("img.lazy").lazyload({ effect: "fadeIn" });


                        });
                    }
                });



            });
        }
    }
});