var Slides = (function() {

  var runLink, currentSlide, currentElement;
  var highlightSelector = 'ins, mark, .annotation';

  var start = function() {
    $('.slide, .notes').hide();
    runLink.hide();
    $('body').addClass('slideshow');
    show(0);
  };

  var stop = function() {
    $('body').removeClass('slideshow');
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
    currentSlide = slideNo;
    currentElement = elNo;
    $('.slide').hide();
    var slide = $('.slide:eq(' + currentSlide + ')');
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
      } else {
        el
          .addClass('future')
          .find('.title').remove();
      }
    });
  }

  return {
    init: function() {
      runLink = $('<a>Run slideshow</a>').addClass('run-slideshow').click(start);
      $('body')
        .append(runLink)
        .keydown(function(event) {
          switch(event.keyCode) {
            case 49: start(); return false; // 1
          }
          if(!$('body').hasClass('slideshow')){ return true; }
          switch(event.keyCode) {
            case 39: next(); return false; // right
            case 37: previous(); return false; // left
            case 27: stop(); return false; // escape
            default: return true;
          }
        });
    }
  };
}());

$(document).ready(function() {
  Slides.init();
});
