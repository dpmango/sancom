'use strict';

$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
      var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
      return mq && mq.matches || window.devicePixelRatio > 1;
    }
  }
  // isRetinaDisplay()

  var mobileDevice = isMobile();
  // detect mobile devices
  function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    // var offset = $(this).data('offset');
    var offset = 90;
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top - offset }, 1000);
    return false;
  });

  // hamburger
  $('.hamburger').on('click', function () {
    $(this).toggleClass('is-active');
    $('.mobile-menu').toggleClass('active');
  });

  // close on a click
  $('.mobile-menu__content a').on('click', function () {
    $('.hamburger').removeClass('is-active');
    $('.mobile-menu').removeClass('active');
  });

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ($('.header-static').length == 0) {
    _window.scrolled(10, function () {
      // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.hero').outerHeight() - headerHeight;

      if (vScroll > headerHeight) {
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if (vScroll > heroHeight) {
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function () {
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__menu li').each(function (i, val) {
    if ($(val).find('a').attr('href') == window.location.pathname.split('/').pop()) {
      $(val).addClass('active');
    } else {
      $(val).removeClass('active');
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
  var ctaFormTogglerText;
  $('.cta__form__toggler').on('click', function () {
    $(this).closest('.cta__form').toggleClass('slide');

    if ($(this).data('action') == 'to-contacts') {
      ctaFormTogglerText = $(this).find('span').text();
      $(this).find('span').text($(this).data('text'));
      $(this).data('action', 'to-form');
    } else {
      $(this).find('span').text(ctaFormTogglerText);
      $(this).data('action', 'to-contacts');
    }
  });

  $("input[type='tel']").mask("+7 (000) 000-0000", { placeholder: "+7 (___) ___-____" });

  // reveal scroll animations - wow
  var wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: false, // default
    live: false // default
  });
  wow.init();

  // PARALLAX
  if (mobileDevice == false) {
    _window.scrolled(10, function () {
      var wScroll = _window.scrollTop();
      var depth = $('.hero__image').data('depth');
      var HeroContainerHeight = $('.hero').height();

      if (wScroll <= HeroContainerHeight) {
        $('.hero__image img').css('transform', 'translate3d(0,-' + wScroll / depth + 'px,0)');
      }

      if (wScroll >= $('.services__image').offset().top - _window.height()) {
        $('.services__image img').css('transform', 'translate3d(0,-' + (wScroll - $('.services__image').offset().top) + 'px,0)');
      }
    });
  }
});