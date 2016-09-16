var Slides = (function() {

  var runLink, currentSlide, currentElement;
  var highlightSelector = 'ins, mark, .annotation, ol.reveal li, ul.reveal li, ol.diagram li > code, ol.diagram li > span';

  var start = function() {
    runLink.hide();
    $('.slide, .notes').hide();
    $('body').addClass('slideshow');
    currentSlide = -1;
    show(0);
  };

  var stop = function() {
    $('body').removeClass('slideshow');
    $(highlightSelector)
      .removeClass('past present future')
      .find('.title').remove();
    $('.slide').removeAttr('style');
    runLink.show();
    $('.slide, .notes').show();
  }

  var next = function() {
    var elNo, slideNo, elementCount;

    elementCount = $('.slide:eq(' + currentSlide + ')').find(highlightSelector).length;
    if(currentElement < elementCount - 1) {
      slideNo = currentSlide;
      elNo = currentElement + 1;
    } else {
      slideNo = currentSlide + 1;
      elNo = -1;
    }

    show(slideNo, elNo);
  }

  var previous = function() {
    var elNo, slideNo, elementCount;

    elementCount = $('.slide:eq(' + currentSlide + ')').find(highlightSelector).length;
    if(elementCount > 0 && currentElement > -1 || currentElement > 0) {
      slideNo = currentSlide;
      elNo = currentElement - 1;
    } else {
      slideNo = currentSlide - 1;
      elNo = $('.slide:eq(' + (currentSlide - 1) + ')').find(highlightSelector).length - 1;
    }

    show(slideNo, elNo);
  }

  var show = function(slideNo, elNo) {
    var slide = $('.slide:eq(' + slideNo + ')');

    $('body').toggleClass('dark', slide.hasClass('dark'));

    if (slide.hasClass('svg')) {
      var svg = slide.find('svg, img[src$=svg]')[0];
      if (svg) {
        svg.setAttribute('width', $(window).width());
        svg.setAttribute('height', $(window).height());
      }
    }

    if(slideNo !== currentSlide) {
      slide.css({'padding-top': 0});
      $('body').scrollTop(0);
      var heightDiff = $(window).height() - slide.innerHeight();
      slide.css({'padding-top': (heightDiff / 2) + 'px'});
    }

    $('.slide').remove(slide).hide();
    slide.show();

    slide.find(highlightSelector).removeClass('past present future').each(function(i) {
      var el = $(this);
      if(i < elNo) {
        el
          .addClass('past')
          .find('.title').remove();
      } else if(i === elNo) {
        el.addClass('present');
        var title = el.attr('title');
        if(title) {
          el.append( $('<span/>').addClass('title').text(title) );
        }

        var visibleMin = $('body').scrollTop(),
            visibleMax = visibleMin + $(window).height(),
            elTop = el.offset().top,
            elBottom = elTop + el.height();

        if (elTop < visibleMin) {
          $('body').animate({
            scrollTop: visibleMin - $(window).height()
          }, 250);
        } else if (elBottom > visibleMax) {
          $('body').animate({
            scrollTop: visibleMin + $(window).height()
          }, 250);
        }
      } else {
        el
          .addClass('future')
          .find('.title').remove();
      }
    });

    currentSlide = slideNo;
    currentElement = elNo;
  }

  return {
    init: function() {
      runLink = $('<a>Run slideshow</a>').addClass('run-slideshow').click(start);
      $('body')
        .append(runLink)
        .keydown(function(event) {
          switch(event.keyCode) {
            case 49: // 1
              start();
              return false;
          }
          if(!$('body').hasClass('slideshow')){ return true; }
          switch(event.keyCode) {
            case 39: // right
            case 40: // down
            case 32: // space
              next();
              return false;
            case 37: // left
            case 38: // up
              previous();
              return false;
            case 27: // escape
              stop();
              return false;
            default:
              return true;
          }
        });
    }
  };
}());

$(document).ready(function() {
  Slides.init();
});
