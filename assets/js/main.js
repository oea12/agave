/*
Theme Name: Cany
Description: Coming Soon Template
Author: Erilisdesign
Theme URI: https://themes.erilisdesign.com/html/cany/
Author URI: https://themeforest.net/user/erilisdesign
Version: 3.0
License: https://themeforest.net/licenses/standard
*/

(function($) {
	"use strict";

	// Vars
	var $body = $('body'),
		$nav = $('#navigation'),
		$navToggle = $('#navigation-toggle'),
		$preloader = $('#preloader'),
		preloaderDelay = 1200,
		preloaderFadeOutTime = 500,
		target;
	
	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}

	// [1. Preloader]
	function ed_preloader() {
		$preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
	}

	// [2. Animations]
	function ed_animations() {

		$('.animated').each(function() {
			var $element = $(this);
			new Waypoint({
				element: $element,
				handler: function(direction) {
					var $element = this.element,
						animation = $element.attr('data-animation'),
						animationDelay = parseInt($element.attr('data-animation-delay'), 10);
					if ( !$element.hasClass('visible') ) {
						if ( animationDelay ) {
							setTimeout(function(){
								$element.addClass(animation + ' visible');
							}, animationDelay);
						} else {
							$element.addClass(animation + ' visible');
						}
					}
					this.destroy();
				},
				offset: '100%'
			});
		});

	}

	// [3. Backgrounds]
	function ed_backgrounds() {

		// Image
		var $bgImage = $('.bg-image-holder');
		if($bgImage.length) {
			$bgImage.each(function(){
				var src = $(this).children('img').attr('src');
				var $self = $(this);

				$self.css('background-image','url('+src+')').children('img').hide();

				$self.imagesLoaded({
					background: true
				}, function(instance, image) {
					$self.addClass('loaded');
				});
			});
		}

		// Slideshow
		if ($body.hasClass('slideshow-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-4.jpg' }
				]
			});
		}

		// Slideshow - ZoomOut
		if ($body.hasClass('slideshow-zoom-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 7000,
				transition: 'zoomOut',
				transitionDuration: 4000,
				slides: [
					{ src: 'demo/images/image-4.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-15.jpg' }
				]
			});
		}

		// Slideshow with Video
		if ($body.hasClass('slideshow-video-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/video/marine.jpg',
						video: {
							src: [
								'demo/video/marine.mp4',
								'demo/video/marine.webm',
								'demo/video/marine.ogv'
							],
							loop: false,
							mute: true
						}
					},
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' }
				]
			});
		}

		// Kenburns
		if ($body.hasClass('kenburns-background')) {

			var kenburnsDisplayBackdrops = false;
			var kenburnsBackgrounds = [
				{ src: 'demo/images/image-15.jpg', valign: 'top' },
				{ src: 'demo/images/image-14.jpg', valign: 'top' },
				{ src: 'demo/images/image-17.jpg', valign: 'top' }
			];

			$body.vegas({
				preload: true,
				transition: 'swirlLeft2',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: kenburnsBackgrounds,
				walk: function (nb) {
					if (kenburnsDisplayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation = 'kenburns';
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						$body
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});
		}

		// Youtube Video
		if ($('#youtube-background').length > 0) {
			var videos = [
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:true, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
		}

		// Youtube Multiple Videos
		if ($('#youtube-multiple-background').length > 0) {

			var videos = [
				{videoURL: "CG20eBusRg0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true},
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);

		}

		// Video Background
		if($body.hasClass('mobile')) {
			$('.video-wrapper').css('display', 'none');
		}

		// Granim
		$('[data-gradient-bg]').each(function(index,element){
			var granimParent = $(this),
				granimID = 'granim-'+index+'',
				colours = granimParent.attr('data-gradient-bg'),
				colours = colours.replace(' ',''),
				colours = colours.replace(/'/g, '"')
				colours = JSON.parse( colours );

			// Add canvas
			granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

			var granimInstance = new Granim({
				element: '#'+granimID,
				name: 'basic-gradient',
				direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
				opacity: [1, 1],
				isPausedWhenNotInView: true,
				states : {
					"default-state": {
						gradients: colours
					}
				}
			});
		});

	}

	// [4. Navigation]
	function ed_navigation() {
		$('a.move-to').off('click');
		$navToggle.off('click');

		$('.tooltip-nav [data-toggle="tooltip"]').tooltip({ boundary: 'window' });

		$('a.move-to').on('click', function(e){
			e.preventDefault();

			var el = $(this),
				target = el.attr('href');

			if( el.parent('li').hasClass('active') ){
				return true;
			} else {
				if( 992 >= getWindowWidth() ){
					$.smoothScroll({
						offset: 0,
						easing: 'swing',
						speed: 800,
						scrollTarget: target,
						preventDefault: false
					});
				} else {
					$('.site-nav li').removeClass('active');
					$('.tooltip-nav li').removeClass('active');
					$('.page-slide').removeClass('show');
					setTimeout(function() {
						$('.page-slide').removeClass('active');
						$('.site-nav').find('[href="'+ target +'"]').parent('li').addClass('active');
						$('.tooltip-nav').find('[href="'+ target +'"]').parent('li').addClass('active');
						$(target).addClass('active');
						$(window).scrollTop(0);
					}, 300);
					setTimeout(function() {
						$(target).addClass('show');
						if( getWindowWidth() >= 992 ){
							if( $('.nicescroll-rails').length > 0 ){
								$('html').getNiceScroll().resize();
							}
						}
					}, 400);
				}
			}
		});

		if( 992 >= getWindowWidth() ){
			$navToggle.on('click', function(e) {
				e.preventDefault();
				if(!$(this).hasClass('open')){
					$nav.slideDown(500);
					$(this).addClass('open');
				} else {
					$nav.slideUp(500);
					$(this).removeClass('open');
				}

				if( getWindowWidth() >= 992 ){
					if( $('html').find('.nicescroll-rails') ){
						$('html').getNiceScroll().resize();
					}
				}
			});
		} else {
			$('.tooltip-nav a.move-to[href="#home"]').trigger('click');
			$navToggle.removeClass('open');
			$nav.css('display', '');
		}

	}

	// [5. NiceScroll]
	function ed_niceScroll() {
		if( getWindowWidth() >= 992 ){
			if( $('.nicescroll-rails').length > 0 ){
				$('html').getNiceScroll().resize();
			} else {
				$('html').niceScroll({
					cursorcolor: '#fff',
					cursoropacitymin: '0',
					cursoropacitymax: '1',
					cursorwidth: '3px',
					zindex: 10000,
					horizrailenabled: false,
					enablekeyboard: false,
				});
			}
		} else {
			if( $('html').find('.nicescroll-rails') ){
				$('html').getNiceScroll().remove();
			}
		}
	}

	// [6. FlexSlider]
	function ed_flexslider() {

		$('.flexslider').flexslider({
			animation: "fade",
			animationLoop: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			controlNav: false,
			directionNav: false,
			keyboard: false,
			start: function(slider){
				$('body').removeClass('loading');
			}
		});

	}

	// [7. Countdown]
	function ed_countdown() {
		var countdown = $('.countdown[data-countdown]');

		if (countdown.length > 0) {
			countdown.each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="countdown-container row"><div class="countdown-item col-6 col-sm"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-item col-6 col-sm"><div class="number">%H</div><span>Hours</span></div><div class="countdown-item col-6 col-sm"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-item col-6 col-sm"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}
	}

	// [8. Mailchimp]
	function ed_mailchimp() {
		var subscribeForm = $('.subscribe-form');
		if( subscribeForm.length < 1 ){ return true; }

		subscribeForm.each( function(){
			var el = $(this),
				elResult = el.find('.subscribe-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						resetForm: true,
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// [9. Contact Form]
	function ed_contactForm() {
		var contactForm = $('.contact-form');
		if( contactForm.length < 1 ){ return true; }

		contactForm.each( function(){
			var el = $(this),
				elResult = el.find('.contact-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// Global events
	jQuery(document).ready(function($) {
		ed_animations();
		ed_backgrounds();
		ed_navigation();
		ed_niceScroll();
		ed_flexslider();
		ed_countdown();
		ed_mailchimp();
		ed_contactForm();
	});

	$(window).on('load', function() {
		ed_preloader();
	});

	$(window).on('resize', function() {
		ed_navigation();
		ed_niceScroll();
	});

})(jQuery);