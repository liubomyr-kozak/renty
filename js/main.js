$(document).ready (function(){
    $('.btn_group').find('.btn').click(function(){
        $(this)
            .toggleClass('active_btn')
            .not('.check_box').not('.dropdown-toggle')
            .parent()
            .siblings()
            .find('.btn')
            .removeClass('active_btn');
    });
    $('.dropdown-toggle').click(function(){
        $(this).parent().find('.check_box_wrap').toggleClass('displ_block');
    });

    $('.dropdown-menu > li > a').click(function(){
        var currency = $(this).text();
        var price = $('.js__price').text();//1500
        var nbu = ['7.99','10.48',1,'0.28'];
        var number = $('.dropdown-menu > li > a').index(this);
        var price_uk=$('.js__price').data('price_ap');
        $('.js__price').text((price_uk / nbu[number]).toFixed(2));
        $('.js__currency').text(currency);
    });
});