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
        var price = $(this).text();
        $('.val_price').text(price);
        $('.check_box_wrap').toggleClass('displ_block');
    });
});