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


  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top - 90}, 1000);
        return false;
	});

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.hero').outerHeight() - headerHeight;

      if ( vScroll > headerHeight ){
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if ( vScroll > heroHeight ){
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
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

  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});

});
