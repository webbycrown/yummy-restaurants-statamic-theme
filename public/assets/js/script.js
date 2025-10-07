$(document).ready(function() {

    var swiper = new Swiper(".hero-section .mySwiper", {
        slidesPerView: 1,
        keyboard: true,
        cssMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".hero-section .mySwiper2", {
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".hero-section .swiper-pagination",
            clickable: true
        },
        thumbs: {
            swiper: swiper,
        },
    });


    var swiper = new Swiper(".welcome-section .mySwiper", {
        slidesPerView: 1.5,
        spaceBetween: 15,
        loop: true,
        centeredSlides: true,
        slidesPerGroupSkip: 1,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 33,
            },
        },
    });


    $('#datepicker').datepicker().datepicker('setDate', 'today');
    $("#datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
    });


    $('.parallax-window').parallax();
    $('.parallax-video-popup-images').parallax();


    // $('.timepicker').timepicker({
    //     timeFormat: 'h:mm p',
    //     interval: 15,
    //     minTime: '7',
    //     maxTime: '6:00pm',
    //     defaultTime: '00',
    //     startTime: '7:00',
    //     dynamic: true,
    //     dropdown: true,
    //     scrollbar: true,
    //     showSecond: true,
    //     timeOnly: true,
    // });


    var swiper = new Swiper(".user-testimonial-section .mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    var swiper = new Swiper(".testimonial-slider .mySwiper", {
        spaceBetween: 0,
        slidesPerView: 1,
        mousewheel: true,
        keyboard: true,
        cssMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".testimonial-slider .mySwiper2", {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".testimonial-slider .swiper-button-next",
            prevEl: ".testimonial-slider .swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });


    jQuery(document).ready(($) => {
        $('.quantity').on('click', '.plus', function(e) {
            let $input = $(this).prev('input.qty');
            let val = parseInt($input.val());
            $input.val(val + 1).change();
        });

        $('.quantity').on('click', '.minus',
            function(e) {
                let $input = $(this).next('input.qty');
                var val = parseInt($input.val());
                if (val > 0) {
                    $input.val(val - 1).change();
                }
            });
    });


    $('.popup-vimeo, .popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    var $grid = $('.grid').isotope({
        layoutMode: 'fitRows'
    });
    $('.filter-button-group').on('click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });


    $('.slider-click-box a').click(function() {
        $('.portfolio-click').removeClass("active");
        $(this).addClass("active");
    });


    $('li.side-menu-check').click(function() {
        $('.side-menu-check ul.dropdown-menu').slideToggle();
        $(this).toggleClass("active");
    });


    $(".toggle-menu-button a").on("click", function() {
        $(".transparent, .menu.side-menu, .menu-close-botton, .perspective").addClass("active");
    });
    $(".menu-close-botton").on("click", function() {
        $(".transparent, .menu.side-menu, .menu-close-botton, .perspective").removeClass("active");
    });

    AOS.init({
        once: true,
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('header').addClass("manu-sticky");
        } else {
            $('header').removeClass("manu-sticky");
        }
    });


    $(".scroll").click(function(event) {
        $('.scroll').removeClass("active");
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top;
        $('html, body').animate({ scrollTop: target_top - 25 }, 0);
        $(this).addClass("active");
    });


    $('a.minus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('div').find('input');
        var value = parseInt($input.val());

        if (value > 1) {
            value = value - 1;
        } else {
            value = 0;
        }

        $input.val(value);

    });

    $('a.plus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('div').find('input');
        var value = parseInt($input.val());

        if (value < 100) {
            value = value + 1;
        } else {
            value = 100;
        }

        $input.val(value);
    });


    $('.popup-with-form').magnificPopup({

    });


});


//  checkout change addresss========>
$(document).ready(function() {

    $("#showlogin").click(function() {
        $("#checkout-login").slideToggle("slow");
    });


    $("#showcoupon").click(function() {
        $("#checkout_coupon").slideToggle("slow");
    });
});