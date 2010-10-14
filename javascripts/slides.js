var Slides = (function() {

  var runLink, currentSlide;
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
    show(currentSlide + 1);
  }

  var previous = function() {
    show(currentSlide - 1);
  }

  var show = function(n) {
    currentSlide = n;
    $('.slide').hide();
    $('.slide:eq(' + currentSlide + ')').show();
  }

  return {
    init: function() {
      runLink = $('<a>Run slideshow</a>').addClass('run-slideshow').click(start);
      $('body')
        .append(runLink)
        .keydown(function(event) {
          if(!$('body').hasClass('slideshow')){ return true; }
          switch(event.keyCode) {
            case 39: next(); return false; // right
            case 37: previous(); return false; // left
            case 27: stop(); return false; // escape
            case 49: show(0); return false; // 1
            default: return true;
          }
        });

      runLink.trigger('click');
    }
  };
}());

$(document).ready(function() {
  Slides.init();
});
