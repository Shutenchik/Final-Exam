$(function () {
    $('.jcarousel').jcarousel({
            animation: 'slow',
            wrap: 'circular'
        })
    .jcarouselAutoscroll({
        interval: 6000,
        target: '+=1',
        autostart: true
    });

    $('.jcarousel-control-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-control-next').jcarouselControl({
        target: '+=1'
    });

    $('.grid').masonry({
        // options
        itemSelector: '.grid__item',
        columnWidth: 300
    });


    retinajs($('img'));

});
