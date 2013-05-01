$(document).ready(function () {
    $('.btn_group').find('.btn').click(function () {
        $(this)
            .toggleClass('active_btn')
            .not('.check_box').not('.dropdown-toggle')
            .parent()
            .siblings()
            .find('.btn')
            .removeClass('active_btn');
    });
    $('.dropdown-toggle').click(function () {
        $(this).parent().find('.check_box_wrap').toggleClass('displ_block');
    });

    $('.dropdown-menu > li > a').click(function () {
        var currency = $(this).text();
        var nbu = ['7.99', '10.48', 1, '0.28'];
        var number = $(this).parent().parent().find('a').index(this);
        var price_uk = $(this).parent().parent().siblings().find('.js__price').data('price_ap');
        $(this).parent().parent().siblings().find('.js__price').text((price_uk / nbu[number]).toFixed(2));
        $(this).parent().parent().siblings().find('.js__currency').text(currency);
    });

    $('.dropdown-menu a').click(function () {
        $(this).parents('.btn-group').find('.selected-value').html($(this).html());
    });

});