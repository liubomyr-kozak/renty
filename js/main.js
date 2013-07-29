$.fn.dropMenu = function(){

    var selectorArray = new Array();
    $('.btn_ul_wrap').each(function(){
        $(this).parent().mousemove(function(){
            $(this).addClass("hover");
        }).mouseout(function(){
                var text = $(this).text();
                $(this).removeClass("hover");
        });
        $(this).find('li').click(function(){
            var selector = $(this).text();
            if($(this).parents().children().hasClass('select_block_check')){
                $(this).toggleClass('check');
                var indexOf = selectorArray.indexOf(selector);
                if (indexOf === -1){
                    selectorArray.push(selector);
                }else{
                    selectorArray.splice(indexOf,1);
                }
                selectorArray.sort();
                 $('.select_block_check').text(selectorArray);

            }else{
                $(this).addClass('check').siblings().removeClass('check');
                $(this).parents().eq(2).find('.select_block').text(selector);

                var placementCheck = $(this).hasClass('check');

                if($(this).text() === 'Комнати'){
                    $('.btn_amt').fadeIn().removeClass('rl_dn');
                }else if($(this).text() === 'Квартиру'){
                    $('.btn_room_square').fadeIn().removeClass('rl_dn');
                }else{
                    $(this).hasClass(function(){
                        if("check"){
                            $('.btn_amt').removeClass('rl_dn')
                        }else{
                            $('.btn_amt').addClass('rl_dn')
                        }
                    });

                $('.btn_room_square').addClass('rl_dn');
                }
            }


        });

    });

    return $(this);
}

$(document).ready(function () {
    function clean_selectedValue(){
        if($(".selected-value").text() == "Выберите район ..."){
            $(".selected-value").removeClass("active_btn");
        }
    }
    $(document).click(function(){
        clean_selectedValue()
    });
    clean_selectedValue()
    $(".selected-value").click(function(){
        $(this).addClass("active_btn");
    });
    /*end selectedValue*/

    $('.js_btn_group').find('.btn').click(function () {
        $(this)
            .toggleClass('active_btn')
            .not('.check_box').not('.dropdown-toggle')
            .parent()
            .siblings()
            .find('.btn')
            .removeClass('active_btn');
    });
    $('.dropdown-toggle').click(function () {
        $(this).parent().find('.check_box_wrap').toggleClass('rl_db');
    });

                                                  /* ======= price ======= */
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
                                                 /* ======= price ======= END*/

                                           /* ======= background_header_img ======= */
    var bgImage = $('.background-image');
    function resizeImg() {
        var imgwidth = bgImage.width(),
            imgheight = bgImage.height(),
            winwidth =  $(".header_carousel").width(),
            winheight = $(".header_carousel").height(),
            widthratio = winwidth / imgwidth,
            heightratio = winheight / imgheight,
            widthdiff = heightratio * imgwidth,
            heightdiff = widthratio * imgheight;
        if(heightdiff>winheight) {
            bgImage.css({
                width: winwidth+'px',
                height: heightdiff+'px'
            });
        } else {
            bgImage.css({
                width: widthdiff+'px',
                height: winheight+'px'
            });
        }
        $(".background-image").show();
    }
    resizeImg();
    $(window).resize(function() {
        resizeImg();
    });
                                           /* ======= background_header_img END======= */


    $('.page_btn_action').each(function (i) {
        $(this).click(function(){
            $(this).siblings(i).addClass('rl_dn');
            $('.page_btn_home').removeClass('rl_dn');
            $('.page_btn_form').removeClass('rl_dn');
        });
    });
    $('.page_btn_home').click(function(){
        $(this).addClass('rl_dn');
        $('.page_btn_action').removeClass('rl_dn');
        $('.page_btn_form').addClass('rl_dn');
    });

    $('.drop_menu').dropMenu();

//    $('.btn_lease').click(function(){
//        var textBtn = $(this).text();
//        $('.btn_advert').addClass('dn');
//        $('.btn_amt').addClass('dn');
//        $('.btn_home').removeClass('dn');
//        $('.btn_action').removeClass('dn').find('.select_block').text(textBtn);
//        $('.btn_placement').removeClass('dn');
//        $('.btn_price').removeClass('dn');
//        $('.btn_room_filer').removeClass('dn');
//    });

    $('.btn_buy, .btn_lease').click(function(){
        var textBtn = $(this).text();
        $('.btn_advert').addClass('rl_dn');
        $('.btn_amt').addClass('rl_dn');
        $('.btn_home').removeClass('rl_dn');
        $('.btn_action').removeClass('rl_dn').find('.select_block').text(textBtn);
        $('.btn_placement').removeClass('rl_dn');
        $('.btn_price').removeClass('rl_dn');
        $('.btn_room_square').removeClass('rl_dn');
        $('.btn_search').removeClass('rl_dn');
    });

//
//    $('.btn_advert')
//    $('.btn_all_filter')

});
