let box = $(".box");
$(window).on("scroll", function() {
    let $scrolltop = $(window).scrollTop();
    if ($scrolltop >= 780) {
        box.stop(true).animate({
            top: 0
        })
    } else {
        box.stop(true).animate({
            top: -60
        })
    }
})