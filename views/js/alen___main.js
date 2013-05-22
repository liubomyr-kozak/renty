var stash = {
	iframe : '<iframe src="" width="566" height="315" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
	addInputFile : function (e) {
		var _this = e.target;
		var p = $(_this).closest('.files-wrp');
		var html = $('.bufer', p).html();
		$('.ffs', p).append(html);
		return false;
	},
	changeFileVal : function (_this) {
		var p = $(_this).closest('.itm');
		$('.val', p).html($(_this).val());
	},
	serverValidationForm : function (e) {
		var _this = e.target;
		var o = {};
		$('input[type="text"], textarea', _this).each(function(index, element) {
			if ($(this).attr('data-validate') != 'false') {
				o[$(this).attr('name')] = $(this).val();
			}
		});
		$.ajax({
			url : $(_this).attr('data-validate'),
			type: 'POST',
			dataType:'json',
			data : o,
			error: function(data) {
				console.log('Не верный формат json, ключи и строковые значения должны быть заключены в двойные ковычки.')
			}
		}).done(function (data) {
			if (data.fields.length) {
				$('[name]',this).removeClass('err');
				for (var i in data.fields) {
					$('[name="'+data.fields[i].name+'"]', _this).addClass('err');
					$('[name="'+data.fields[i].name+'"]', _this).val(data.fields[i].value)
				};
			} else {
				$(_this).addClass('allok');
				$(_this).submit();
			}
		});
		if (!$(e.target).hasClass('allok')) {
			return false;
		}
	}
};
$(function () {
	$(window).load(function () {
		$('.shadow-box').height($('#body').height() - $('footer').height());
	});
	if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
		$('form.search input[type="text"]').css({top : 1});
	}
	$('nav .dd, .hint').append('<i class="corner" />');
	
	$('[data-replace-val]').each(function(index, element) {
		$(this).data('defval', $(this).val());
	});
	$('[data-replace-val]').on('focus', function () {
		if ($(this).val() == $(this).data('defval')) 
			$(this).val('');
	});
	$('[data-replace-val]').on('blur', function () {
		if ($(this).val() == '')
			$(this).val($(this).data('defval'));
	});
	
	
	if ($('.human').length) {
		$('.human area').hover(
			function () {
				$('.human .elements '+$(this).attr('data-element')).stop(true, true).fadeIn();
			},
			function () {
				$('.human .elements '+$(this).attr('data-element')).stop(true, true).fadeOut();
			}
		);
		$(document).tooltip({
			items: ".human area",
			position : {
				my : "center bottom",
				at : "center top",
				using: function( position, feedback ) {
					var from = $(feedback.target.element.attr('data-element'));
					$(this).css( {left : from.offset().left -22, top : from.offset().top - $(this).outerHeight()} );
					$('<div></div>').appendTo(this);
				},
				collision: "fit none"
			},
			content : function () {
				var text = '<div class="hint direction-right" style="padding:10px 23px;"><div class="txt">'+$($(this).attr('data-element')).attr('data-text')+'</div><i class="corner" /></div>' || '</div>';
				return text;
			}
		});
	};
	if ($('.fade-slider').length) {
		$('.fade-slider').each(function(index, element) {
			var active = '';
			var _this = $(this);
			$(this).data('autorotate',[]);
			$(this).data('act', {
				gotoSlide : function (e) {
					var fs = $(e.target).closest('.fade-slider');
					var slide = $(e.target).data('target');
					if (!fs.data('anim') && !$(e.target).hasClass('active')) {
						fs.data('anim', true);
						slide.addClass('pre-active');
						$('.slide.active', fs).fadeOut('slow', function () {
							fs.data('anim', false);
							$(this).removeClass('active');
							slide.removeClass('pre-active').addClass('active');
							$('.slide', fs).removeAttr('style');
						});
						$('.nav-slides .bull', fs).removeClass('active');
						$(e.target).addClass('active');
					}
				}
			})
			$('.slide', this).each(function(index, element) {
				active = $(this).hasClass('active') ? ' active' : '';
				var bull = $('<i class="bull'+active+'" />');
				var fs = $(this).closest('.fade-slider');
				bull.data('target', $(this));
				bull.on('click', fs.data('act').gotoSlide);
				fs.data('autorotate').push(bull);
				$('.nav-slides', fs).append(bull);
				if ($(this).height() > fs.height())
					fs.height($(this).height());
			});
			$(this).data('autoInit', function () {
				var arr = _this.data('autorotate');
				var count = 0;
				var st = setInterval(function () {
					if (count < arr.length-1) {
						count++;
					} else {
						count = 0;
					};
					_this.data('act').gotoSlide({target : arr[count]});
				}, 5000);
				_this.data('sti', st);
			});
			$(this).hover(
				function () {
					clearInterval(_this.data('sti'));
				},
				function () {
					_this.data('autoInit')();
				}
			);
			$(this).data('autoInit')();
		});
	};
// GALLERY
	$('.gallery').each(function (i) {
		var gal = new pcglib.rotator(
							 $(this).attr('data-controll-prev') ? $($(this).attr('data-controll-prev')) : $('.pre', this),
							 $(this).attr('data-controll-next') ? $($(this).attr('data-controll-next')) : $('.nxt', this),
							 $('.world', this),
							 $('.gallItem', this),
							 1000,
							 $(this).hasClass('vertical') ? true : false,
							 true,
							 $(this).hasClass('auto') ? {every : stash.rotateSpeed || 5000, to : '-='} : false);
		var gg = $(this);
		$(this).data('gal', gal);
		$(this).data('galId', i);
		for (var i = 0; i < $('.world', this).data('iteratorLength'); i++) {
			var ii = i+1;
			var jj = $(this).data('galId')+'-'+i;
			$('.pager', this).append('<a href="#" class="item bullet" id="iii'+jj+'">&nbsp;</a>');
		};
		$('.world', this).bind('slide', function (e,e1){
			if ($('.pager .active', gg).attr('id')) {
				var a = $('.pager .active', gg).attr('id').replace(/iii\d{1}\-/ig, '');
				$('.pager > a', gg).removeClass('active');
				a = new Number(a);
				switch (e1) {
					case '+=' :
						a--;
						if (a == $('.pager > a', gg).length) {
							$('.pager > a:first-child', gg).addClass('active');
						} else if (a < 0) {
							$('.pager > a:last-child', gg).addClass('active');
						} else {
							$('.pager > a#iii'+gg.data('galId')+'-'+a, gg).addClass('active');
						};
					break;
					case '-=' :
						a++;
						if (a == $('.pager > a', gg).length) {
							$('.pager > a:first-child', gg).addClass('active');
						} else if (a == 0) {
							$('.pager > a:last-child', gg).addClass('active');
						} else {
							$('.pager > a#iii'+gg.data('galId')+'-'+a, gg).addClass('active');
						};
					break;
				};
			};
	
		});
		$('.pager a', this).eq(0).addClass('active');
		$('.pager a', this).click(function () {
			if ($('.pager .active', gg).attr('id')) {
				var a = $(this).attr('id').replace(/iii\d{1}\-/ig, '');
				a = new Number(a);
				var b = $('.pager .active', gg).attr('id').replace(/iii\d{1}\-/ig, '');
				b = new Number(b);
				var l = $('.pager a', gg).length -1;
				var _this = $(this);
				$('.pager a', gg).removeClass('active');
				$(this).addClass('active');
				if (a < b) {
					gg.data('gal').callCicleRotatorProcessBull('+=', Math.abs(a - b));
				} else {
					gg.data('gal').callCicleRotatorProcessBull('-=', Math.abs(b - a));
				};
			};
			return false;
		});
	});
	if ($('#clinic-video-galery').length) {
		$('#clinic-video-galery .gallItem a').click(function () {
			var url = $('#clinic-video-galery').attr('data-url');
			var _this = $(this);
			$.ajax({
				url : url,
				type: 'POST',
				dataType:'json',
				data : {action: 'get_video', id : _this.attr('data-id')},
				error: function(data) {
					console.log('Не верный формат json, ключи и строковые значения должны быть заключены в двойные ковычки.')
				}
			}).done(function (data) {
				var html = new EJS({ext : '.html', url : '/ejs-templates/video-popup.html'}).render({data : data});
				$.fancybox(html);
				$('#videogal').on('click', '.gallItem a', function () {
					$('#pp-video-wrpr').html($(stash.iframe).attr('src', $(this).attr('data-code'))[0]);
					return false;
				});
			});
			return false;
		});
	};
	$('#orderTreatment, #feedback, #askQuestion, #bottomOrder').click(function () {
		var data = $(this).attr('data-err') ? $.parseJSON($(this).attr('data-err')) : null;
		var html = new EJS({ext : '.html', url : '/ejs-templates/order.html'}).render({data : data});
		$.fancybox(html);
		return false;
	});
	$('body').on('click', '.add-inp', stash.addInputFile);
	$( "#tabs" ).tabs({
		activate: function( event, ui ) {
			$('.shadow-box').height($('#body').height() - $('footer').height());
		}
	});
	 $( "#accordion" ).accordion({
		 active : false,
		 collapsible: true,
		 activate : function () {
			$('.jsp').jScrollPane({
				showArrows : true,
				verticalDragMinHeight : 47,
				verticalDragMaxHeight : 47
			}); 
		 }
	});
	$('.branches-list .itm').append('<i class="ll" /><i class="rl" />');
	$('#services-content-tabs .itm').each(function(index, element) {
		var cls = !index ? 'pos0 act' : 'pos'+index;
		$('#services-content-container').append('<i class="tmp '+cls+'" />');
	});
	$('#services-content-tabs .itm').click(function () {
		$('#services-content-container .tmp').removeClass('act');
		$('#services-content-container .pos'+$(this).index()).addClass('act');
		$('#services-content-tabs .itm').removeClass('active');
		$(this).addClass('active');
		$('#services-content-container section').removeClass('active');
		$('#services-content-container section[data-source="'+$(this).attr('data-target')+'"]').addClass('active');
	});
	
	$('fieldset.checkbox').each(function(index, element) {
		if ( $('input', this).attr('checked') ) $('span', this).addClass('active'); 
	});
	$('fieldset.checkbox input').change(function () {
		var p = $(this).closest('fieldset.checkbox');
		if ($(this).prop('checked')) {
			$('span', p).addClass('active');
		} else {
			$('span', p).removeClass('active');
		}
	});
// form - decor
	$('.form .decor').each(function () {
		switch ($(this).attr('type')) {
			case 'checkbox' :
				$(this).parents('.fcwrp').addClass('decorCheckboxWrpr');
				$(this).wrap('<div class="decorCheckbox" />');
			break;
			case 'radio' :
				$(this).parents('.fcwrp').addClass('decorRadioWrpr');
				$(this).wrap('<div class="decorRadio" />');
			break;
			case 'text' :
				$(this).data('defVal', $(this).val());
			break;
		};
		if ($(this).attr('checked')) {
			$(this).parents('.fcwrp').addClass('checkedTrue');
		};
		if ($(this).attr('disabled')) {
			$(this).parents('.fcwrp').addClass('disabledTrue');
		};
	});
	$('.form textarea.decor').each(function () {
		$(this).data('defVal', $(this).val());
	});
	$('.form select.decor').each(function () {
		var o = '';
		$('option', this).each(function () {
			o += '<a href="'+$(this).val()+'">'+$(this).html()+'</a>'
		});
		var s = '<div class="decorSelect"><a href="#" class="ttl"><span>'+$('option:selected',this).html()+'</span></a><div class="iopts" style="display: none;">'+o+'</div><input type="hidden" name="'+$(this).attr('name')+'" value="'+$(this).val()+'"></div>';
		var _this = $(this).replaceWith(s);									
	});
	$('.decorSelect .ttl').click(function () {
		var par = $(this).parent();
		$('.decorSelect').removeClass('decorSelectActive');
		$(this).parents('.decorSelect').addClass('decorSelectActive');
		if ($('.iopts:hidden', par).length) {
			$('.decorSelect .iopts').hide();
			$('.iopts', par).show();
			$('.iopts', par).jScrollPane({
				showArrows : true,
				verticalDragMinHeight : 47,
				verticalDragMaxHeight : 47
			}); 
		} else {
			$('.decorSelect .iopts').hide();
		};
		return false;
	});
	$('.decorSelect').on('click', '.iopts a', function () {
		$(this).parents('.iopts').hide();
		$('.ttl span', $(this).parents('.decorSelect')).text($(this).text());
		$('input', $(this).parents('.decorSelect')).val($(this).attr('href'));
		$('input', $(this).parents('.decorSelect')).trigger('change');
		return false;
	});
	$('body').click(function (e) {
		if (!$(e.target).parents('.decorSelect').length) {
			$('.decorSelect .iopts').hide();
		};
		$('#dis_suggest_list').hide();
	});
	$('.form .decorCheckboxWrpr input').change(function () {
		if ($(this).prop('checked')) {
			$(this).parents('.fcwrp').addClass('checkedTrue');
		} else {
			$(this).parents('.fcwrp').removeClass('checkedTrue');
		};
	});
	$('.form .decorRadioWrpr input').change(function () {
		var n = $(this).attr('name');
		var f = $(this).parents('.form');
		$('input[name="'+n+'"]', f).each(function () {
			$(this).prop('checked') ? $(this).parents('.fcwrp').addClass('checkedTrue') : $(this).parents('.fcwrp').removeClass('checkedTrue');
		});
	});
	$('.inputFileWrpr input[type="file"]').change(function () {
		$(this).parents('.inputFileWrpr').find('input[type="text"]').val($(this).val()); 
	});
	$('.greyMenu .level-2').click(function () {
		$(this).parents('li').find('ul').toggle();
		return false;
	});
/* Автосабмит формы при изменении критериев поиска ======== начало */
	$('input[data-autocomplete]').each(function(index, element) {
		$(this).autocomplete({
			source : $(this)
						.attr('data-autocomplete')
								.split('|'),
			select : function (e, ui) {
				if ($(e.target).attr('data-autosubmit')) {
					$(e.target).closest('form').submit()
				}
			}
		});
	});
	$('.srch-submit-on-changhe').on('change', 'input', function () {
		$(this).closest('form').submit();
	});
/* Автосабмит формы при изменении критериев поиска ======== конец */

	$('.left_scr').jScrollPane({
		showArrows : true,
		verticalDragMinHeight : 47,
		verticalDragMaxHeight : 47
	});

	$('#dis_suggest').keyup(function () {
		var _this = $(this);
		//if (_this.val().length < 3) return false;
		var url = _this.attr('data-url');
		$.ajax({
			url : url,
			type: 'POST',
			dataType:'json',
			data : {action: 'dis_suggest', keyword : _this.val()},
			error: function(data) {
				console.log('Не верный формат json, ключи и строковые значения должны быть заключены в двойные ковычки.')
			}
		}).done(function (data) {
			var html = new EJS({ext : '.html', url : '/ejs-templates/dis-suggest.html'}).render({data : data});
			$('#dis_suggest_list').html(html);
			$('#dis_suggest_list').show();
			/*
			$('#dis_suggest_list').jScrollPane({
				showArrows : true,
				verticalDragMinHeight : 47,
				verticalDragMaxHeight : 47
			});
			*/
		});
		return false;
	});

});















