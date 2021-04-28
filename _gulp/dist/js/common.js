'use strict'

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  lang();
  mobileNav();
  section4slider();
  section7slider();
  downloadApp();
  categoryNav();
  scrollTo();
  articlesCarousel();

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() {
  var width = $(window).width();
  var mobile = $('.mobile-nav');
  var body = $('body');
  var html = $('html');
  var base = $('.base');

  if (width >= 768) {
    mobile.removeClass('is-transform');
    body.removeClass('is-fixed');
    html.removeClass('is-fixed');
    base.removeClass('is-transform');
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function lang(){
  var block = $('.header__lang');
  block.each(function(){
    var current = $(this).find('.header__lang-current span');
    current.text($(this).find('li.active span').text());

    $(this).on('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      var _this = $(this);
      if (_this.hasClass('is-active')) {
        _this.removeClass('is-active');
      } else {
        _this.addClass('is-active');
      }
    });
  });




  $(document).on('click', function(){
    block.removeClass('is-active');
  });
}

function mobileNav(){
  var mobile = $('.mobile-nav');
  var btn = $('.header__mobile');
  var body = $('body');
  var html = $('html');
  var base = $('.base');

  btn.on('click', function(e){
    e.stopPropagation();

    if (mobile.hasClass('is-transform')) {
      mobile.removeClass('is-transform');
      body.removeClass('is-fixed');
      html.removeClass('is-fixed');
      base.removeClass('is-transform');
    } else {
      mobile.addClass('is-transform');
      body.addClass('is-fixed');
      html.addClass('is-fixed');
      base.addClass('is-transform');
    }
  });

  mobile.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    mobile.removeClass('is-transform');
    body.removeClass('is-fixed');
    html.removeClass('is-fixed');
    base.removeClass('is-transform');
  })
}

function section4slider() {
  var slider = $('.section4__slider-wrapper');

  if (slider.length <= 0) return;

  slider.slick({
    fade: true,
    cssEase: 'linear',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  });
}

function section7slider() {
  var slider = $('.section7__slider-wrapper');

  if (slider.length <= 0) return;

  slider.slick({
    fade: true,
    cssEase: 'linear',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          adaptiveHeight: false
        }
      }
    ]
  });
}

function downloadApp(){
  var block = $('.download');
  var btn = block.find('.download__close');
  var btn2 = $('.section11__btn--app');

  btn.on('click', function(e){
    if (block.show()) {
      block.hide();
    }
  });

  btn2.on('click', function(e){
    if (block.hide()) {
      block.show();
    }
  });
}

(function(){
  // Call & init
  $(document).on('ready', function(){
    $('.section11__img').each(function(){
      var cur = $(this);
      // Adjust the slider
      var width = cur.width()+'px';
      cur.find('.section11__img-resize img').css('width', width);
      // Bind dragging events
      drags(cur.find('.section11__img-handle'), cur.find('.section11__img-resize'), cur);
    });
  });

  // Update sliders on resize.
  // Because we all do this: i.imgur.com/YkbaV.gif
  $(window).resize(function(){
    $('.section11__img').each(function(){
      var cur = $(this);
      var width = cur.width()+'px';
      cur.find('.section11__img-resize img').css('width', width);
    });
  });

  function drags(dragElement, resizeElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {

      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');

      // Check if it's a mouse or touch event and pass along the correct value
      var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

      // Get the initial position
      var dragWidth = dragElement.outerWidth(),
          posX = dragElement.offset().left + dragWidth - startX,
          containerOffset = container.offset().left,
          containerWidth = container.outerWidth();

      // Set limits
      var minLeft = containerOffset + 10;
      var maxLeft = containerOffset + containerWidth - dragWidth - 10;

      // Calculate the dragging distance on mousemove.
      dragElement.parents().on("mousemove touchmove", function(e) {

        // Check if it's a mouse or touch event and pass along the correct value
        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        var leftValue = moveX + posX - dragWidth;

        // Prevent going off limits
        if ( leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        // Translate the handle's left value to masked divs width.
        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

        // Set the new values for the slider and the handle.
        // Bind mouseup events to stop dragging.
        $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
          $(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });
        $('.resizable').css('width', widthValue);
      }).on('mouseup touchend touchcancel', function(){
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
  }
})();

function categoryNav(){
  $('.section11__head-body').slick({
    slidesToShow: 5,
    centerMode: true,
    infinite: true,
    dots: false,
    arrows: true,
    draggable: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          variableWidth: true,
          centerMode: false
        }
      }
    ]
  })
}

function scrollTo(){
  // Select all links with hashes
$('a[href*="#"].anchor')
  // Remove links that don't actually link to anything
  .not('[href="#"].anchor')
  .not('[href="#0"].anchor')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
      }
    }
  });
}

function articlesCarousel(){
  var slider = $('.section8__row--carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  })
}
