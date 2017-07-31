$(document).ready(function(){

  //////////
  // Global variables
  //////////

  const _window = $(window);
  const _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }
  // isRetinaDisplay()

  var mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  if ( mobileDevice ){
    $('body').addClass('is-mobile')
  }

  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        // var offset = $(this).data('offset');
        var offset = 90;
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top - offset}, 1000);
        return false;
	});

  // hamburger
  $('.hamburger').on('click', function(){
      $(this).toggleClass('is-active')
      $('.mobile-menu').toggleClass('active');
      stopScroll();
  });

  // close on a click
  $('.mobile-menu__content a').on('click', function(){
    $('.hamburger').removeClass('is-active');
    $('.mobile-menu').removeClass('active');
    stopScroll();
  });

  function stopScroll(){
    if( $('.hamburger').is('.is-active') ){
      $('body').on('touchmove', function (e) {
        e.preventDefault();
      });
      $('body').on({'mousewheel': function(e) {
        if (e.target.id == 'el') return;
          e.preventDefault();
          e.stopPropagation();
        }
      })
    } else {
      $('body').unbind("mousewheel");
      $('body').off("touchmove");
    }
  }


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var breakPoint = $('.page__content > div:first-child').outerHeight() - headerHeight;

      if ( vScroll > headerHeight ){
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if ( vScroll > breakPoint ){
        header.addClass('header--fixed');
        $('.mobile-menu').addClass('mobile-menu--scrolled');
      } else {
        header.removeClass('header--fixed');
        $('.mobile-menu').removeClass('mobile-menu--scrolled');
      }
    });
  }

  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function(){
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__menu li').each(function(i,val){
    if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
      $(val).addClass('active');
    } else {
      $(val).removeClass('active')
    }
  });


  // header lang
  $('.header__lang__visible').on('click', function(){
    $('.header__lang__drop').toggleClass('active');
    setTimeout(function(){
      $('.header__lang__drop').toggleClass('reverseDelay')
    },500);
  });

  $('.header__lang__drop span').on('click', function(){
    var langText = $(this).text();
    $(this).closest('.header__lang').find('.header__lang__visible').text(langText);
    $(this).parent().removeClass('active')
  });

  //////////
  // SLIDERS
  //////////

  $('.benefits__slider').slick({
    autoplay: true,
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: false
  });

  $('.cases-formula__slider').slick({
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    fade: true
  });

  // slick team sliders
  var teamSliderOptionsFirst = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    fade: true,
    slidesToShow: 1,
    pauseOnHover: false,
    touchMove: false,
    draggable: false,
    swipe: false,
    vertical: false,
    adaptiveHeight: true
  }

  var teamSliderOptions = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    fade: true,
    slidesToShow: 1,
    touchMove: false,
    draggable: false,
    swipe: false,
    vertical: false,
    adaptiveHeight: true
  }

  $('.js-teamSlider').each(function(i,val){
    // check if this is first child
    if ( i == 0 ){
      $(val).slick(teamSliderOptionsFirst);
    } else {
      $(val).slick(teamSliderOptions);
    }
  });

  // emulate snake behaviour
  $('.js-teamSlider--1').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    // navigate second slider
    setTimeout(function(){
      $('.js-teamSlider--2').slick('slickNext')
    }, 500);
    // navigate thrird slider
    setTimeout(function(){
      $('.js-teamSlider--3').slick('slickNext')
    }, 500);
    // navigate thrird slider
    setTimeout(function(){
      $('.js-teamSlider--4').slick('slickNext')
    }, 500);

  });


  // CTA FORM
  var ctaFormTogglerText
  $('.cta__form__toggler').on('click', function(){
    $(this).closest('.cta__form').toggleClass('slide');

    if ( $(this).data('action') == 'to-contacts' ){
      ctaFormTogglerText = $(this).find('span').text();
      $(this).find('span').text( $(this).data('text') );
      $(this).data('action', 'to-form')
    } else {
      $(this).find('span').text( ctaFormTogglerText );
      $(this).data('action', 'to-contacts')
    }

  });

  // $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 ___"});
  $("input[type='tel']").keydown(function (e) {
     if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         (e.keyCode >= 35 && e.keyCode <= 40)) {
              return;
     }
     if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
         e.preventDefault();
     }
     if ( $(this).val().length > $(this).data('maxlength') ){
       e.preventDefault();
     }
   });

  // reveal scroll animations - wow
  var wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         false        // default
  });
  wow.init();

  // PARALLAX
  if (false == false){
    _window.scrolled(10, function() {
      // save wScroll once
      var wScroll = _window.scrollTop();

      // hero lines
      // this is different because first block on page
      if ( $('.hero__image').length > 0 ){
        if (wScroll <= $('.hero').height()) {
          $('.hero__image img').css(
            'transform', 'translate3d(0,-' + (wScroll / $('.hero__image').data('depth') ) + 'px,0)'
          );
        }
      }

      // each parrallaxLines
      $('.js-parallaxLines').each(function(i,val){
        var parentObj = $(val).parent().parent().parent();
        var blockOffset = parentObj.offset().top
        if ( (wScroll + _window.height()) > (blockOffset) && ( (blockOffset + parentObj.height()) > wScroll ) ) {
          $(val).find('img').css(
            'transform', 'translate3d(0,-' + ( (wScroll - blockOffset + parentObj.height()) / $(val).data('depth') ) + 'px,0)'
          );
        }
      })

      if ( $('.solutions__card__icon').length > 0 ){

        $('.solutions__card__icon .ico').each(function(i,val){
          $(val).css(
            'transform', 'rotate(' + (wScroll / $(val).data('depth') ) + 'deg)'
          );
        });

      }


    });
  }

});
