! function($) {
    const $lunbo = $('.lunbo_main');
    const $piclist = $('.lunbo ul li');
    const $btnlist = $('.round a');
    const $left = $('#left');
    const $right = $('#right');
    let $num = 0;
    let $timer1 = null;
    let $timer2 = null;

    $btnlist.on('mouseover', function() {
        $num = $(this).index();
        $timer1 = setTimeout(function() {
            tabswitch()
        }, 300);
    });
    $btnlist.on('mouseout', function() {
        clearTimeout($timer1);
    });
    $right.on('click', function() {
        $num++;
        if ($num > $btnlist.length - 1) {
            $num = 0;
        }

        tabswitch()
    });

    $left.on('click', function() {
        $num--;
        if ($num < 0) {
            $num = $btnlist.length - 1;
        }

        tabswitch()
    });

    function tabswitch() {
        $btnlist.eq($num).addClass('active').siblings().removeClass('active');
        $piclist.eq($num).stop(true).animate({
            opacity: 1
        }).siblings().stop(true).animate({
            opacity: 0
        });
    }
    $timer2 = setInterval(function() {
        $right.click();
    }, 1000);

    $lunbo.hover(function() {
        clearInterval($timer2);
    }, function() {
        $timer2 = setInterval(function() {
            $right.click();
        }, 1000);
    });
}(jQuery);