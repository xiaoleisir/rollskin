define(['jcookie'], () => {
    return {
        init: function() {
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(','); 
                    let $arrnum = $.cookie('cookienum').split(',');
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]); 
                    });
                }
            }
            getcookietoarray();

            function rendergoods(sid, num) { 
                $.ajax({
                    url: 'http://10.31.161.106/dashboard/rollskin/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid === value.sid) {
                            let $clonebox = $('.goods-item:hidden').clone(true, true); 
                            $clonebox.find('.goods-pic img').attr('src', value.url);
                            $clonebox.find('.goods-pic img').attr('sid', value.sid);
                            $clonebox.find('.goods-d-info a').html(value.title);
                            $clonebox.find('.b-price strong').html(value.price);
                            $clonebox.find('.quantity-form input').val(num);
                            $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2)); 
                            $clonebox.css('display', 'block');
                            $('.item-list').append($clonebox);
                            calcprice(); 
                        }
                    });
                });
            }

            function calcprice() {
                let $sum = 0;
                let $count = 0; 
                $('.goods-item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart-checkbox input').prop('checked')) {
                        $sum += parseInt($(ele).find('.quantity-form input').val());
                        $count += parseFloat($(ele).find('.b-sum strong').html());
                    }
                });

                $('.amount-sum').find('em').html($sum);
                $('.totalprice').html($count.toFixed(2));
            }



            $('.allsel').on('click', function() {
                $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked')); 
                $('.allsel').prop('checked', $(this).prop('checked'));
                calcprice(); 
            });

            $('.cart-checkbox input').on('click', function() {
                if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice(); 
            });


            $('.quantity-add').on('click', function() {

                let $num = $(this).parents('.goods-item').find('.quantity-form input').val(); 
                $num++; 
                if ($num > 99) { 
                    $num = 99;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num);
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); 
                calcprice(); 
                addcookie($(this)); 
            });


            $('.quantity-down').on('click', function() {
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
                $num--; 
                if ($num <= 0) {
                    $num = 1;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num);
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); 
                calcprice(); 
                addcookie($(this));
            });

            $('.quantity-form input').on('input', function() {
                let $reg = /^\d+$/;
                let $value = $(this).val(); 
                if (!$reg.test($value)) { 
                    $(this).val(1);
                }
                if ($value > 99) {
                    $(this).val(99);
                }

                if ($value <= 0) {
                    $(this).val(1);
                }
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this)));
                calcprice(); 
                addcookie($(this)); 
            });


            function singlegoodsprice(obj) { 
                let $singleprice = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
                let $num = parseFloat(obj.parents('.goods-item').find('.quantity-form input').val());
                return ($singleprice * $num).toFixed(2); 
            }

            //将改变后的值存放cookie中 - 获取商品的sid,通过sid找到商品的数量。
            let $arrsid = [];
            let $arrnum = [];

            function cookietoarray() { 
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    $arrsid = $.cookie('cookiesid').split(','); 
                    $arrnum = $.cookie('cookienum').split(','); 
                }
            }

            function addcookie(obj) {
                cookietoarray() 
                let $sid = obj.parents('.goods-item').find('img').attr('sid'); 
                $arrnum[$.inArray($sid, $arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });

            }


            $('.b-action a').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.goods-item').remove();
                    calcprice(); 
                    delcookie($(this).parents('.goods-item').find('img').attr('sid'), $arrsid);

                    if ($arrsid.length === 0) {

                        $.cookie('cookiesid', $arrsid, { expires: -1, path: '/' });
                        $.cookie('cookienum', $arrnum, { expires: -1, path: '/' });
                    }
                }
            });
            $('.operation a').on('click', function() {
                cookietoarray(); 
                if (window.confirm('你确定要删除吗?')) {
                    $('.goods-item:visible').each(function() {
                        console.log($(this)); 
                        if ($(this).find(':checkbox').is(':checked')) { 
                            $(this).remove();
                            delcookie($(this).find('img').attr('sid'), $arrsid)
                        }
                    });
                    calcprice(); 
                }
            });

            function delcookie(sid, $arrsid) { 
                let $sidindex = -1; 
                $.each($arrsid, function(index, value) {
                    if (sid === value) {
                        $sidindex = index; 
                    }
                });


                $arrsid.splice($sidindex, 1);
                $arrnum.splice($sidindex, 1);


                $.cookie('cookiesid', $arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });
            }

        }
    }
});