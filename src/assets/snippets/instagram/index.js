import './style.styl';


define(['jquery', 'slick-carousel'], ($) => {
    $('.instagram__list').each(function(){
        $(this).slick({
            mobileFirst: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: `<button type="button" class="slick-prev"><svg class="icon icon--carousel-prev" width="15" height="24"><use xlink:href="#carousel-prev" /></svg></button>`,
            nextArrow: `<button type="button" class="slick-next"><svg class="icon icon--carousel-next" width="15" height="24"><use xlink:href="#carousel-next" /></svg></button>`,
            responsive: [
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4   
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6
                    }
                }
            ]   
        });
    });
});