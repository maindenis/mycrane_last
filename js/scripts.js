function getHeaderParams() {
  if($(document).scrollTop() > 10) {
    $(".fixed_header").addClass("scroll");
  } else {
    $(".fixed_header").removeClass("scroll");
  }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).on("load", function() {
      getHeaderParams();
});

$(window).resize(function() {
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getHeaderParams();
});

$(document).scroll(function() {
  getHeaderParams();
});

$(document).ready(function() {

    if( $(".slider").length > 0 ) {
        $(".slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            // autoplay: true,
            // autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            prevArrow: $("#left_btn"),
            nextArrow: $("#right_btn")
        });
    }

    // -------------

    $("input, textarea").on("change", function() {
      if (!$(this).is(":focus")) {
        parent = $(this).closest(".quiz_input_wrapp_2");
        placeholder = parent.find(".placeholder");
        if($(this).val() != "") {          
          placeholder.css({
            "display" : "none"
          });
        } else {
          placeholder.css({
            "display" : "block"
          });
        }
      }
    });

    $("input, textarea").on("change", function() {
      if (!$(this).is(":focus")) {
        parent = $(this).closest(".popup_input_wrapp");
        placeholder = parent.find(".placeholder_2");
        if($(this).val() != "") {          
          placeholder.css({
            "display" : "none"
          });
        } else {
          placeholder.css({
            "display" : "block"
          });
        }
      }
    });

    // --------------

    if($("[type='tel']").length > 0) {
        $("[type='tel']").inputmask({"mask": "+7 (999) 999-99-99"});
    }

    // --------------

    $(".nextQuiz").on("click", function(e) {
      e.preventDefault();
      parentWrapp = $(this).closest(".quiz_tabs_wrapp");
      countQuizTabs = parentWrapp.find(".quiz_tab").length;
      barPercent = 100 / countQuizTabs;
      parent = parentWrapp.find(".quiz_tab.active");
      activeIndex = parseInt(parent.attr("data-index"));
      nextActiveIndex = activeIndex + 1;
      $(".quiz_steps_bar").css({
        "width" : nextActiveIndex*barPercent + "%"
      });
      parent.removeClass("active");
      parentWrapp.find("[data-index = '"+nextActiveIndex+"']").addClass("active");
      $("#step_num").text(nextActiveIndex);
      if(nextActiveIndex == countQuizTabs) {
        $(".nextQuiz").addClass("hidden");
      }
      if(activeIndex + 1 < countQuizTabs) {
        $(".nextQuiz").removeClass("hidden");
      }
      if(nextActiveIndex > 1) {
        $(".prevQuiz").removeClass("hidden");
      }
    });

    $(".prevQuiz").on("click", function(e) {
      e.preventDefault();
      parentWrapp = $(this).closest(".quiz_tabs_wrapp");
      parent = parentWrapp.find(".quiz_tab.active");      
      activeIndex = parseInt(parent.attr("data-index"));
      nextActiveIndex = activeIndex - 1;
      countQuizTabs = parentWrapp.find(".quiz_tab").length;
      barPercent = 100 / countQuizTabs;
      $(".quiz_steps_bar").css({
        "width" : nextActiveIndex*barPercent + "%"
      });
      parentWrapp.find(".quiz_tab").removeClass("active");
      parentWrapp.find("[data-index = '"+nextActiveIndex+"']").addClass("active");
      $("#step_num").text(nextActiveIndex);
      if(nextActiveIndex <= 1) {
        $(".prevQuiz").addClass("hidden");
      } 
      if(nextActiveIndex > 1) {
        $(".prevQuiz").removeClass("hidden");        
      }
      if(nextActiveIndex < countQuizTabs) {
        $(".nextQuiz").removeClass("hidden");
      } else {
        $(".nextQuiz").addClass("hidden");
      }
    });

    // -------------------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      topCoord = $(document).scrollTop();
      $("body").addClass("fixed");
      $("body").css({
          "top" :  -1 * topCoord + "px",
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".close, .popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");
      $("[data-popup]").fadeOut(300);
      $(".popup_bg").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").removeClass("fixed");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").attr("style", "");      
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");    
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // ---------------------

    $(".respmenubtn").click(function(e) {
        e.preventDefault();
        if( $("#resp_nav").is(":hidden") ) {
            $(".fixed_header").addClass("active");
            $("#resp_nav").fadeIn(300);
            $(this).addClass("active");
            div = document.createElement('div');
            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.visibility = 'hidden';
            document.body.appendChild(div);
            scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
            topCoord = $(document).scrollTop();
            $("body").addClass("fixed");
            $("body").css({
                "top" :  -1 * topCoord + "px",
                "padding-right" : scrollWidth + "px"
            });
        } else {
            $("#resp_nav").fadeOut(300);
            $(this).removeClass("active");
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");
            $(".fixed_header").removeClass("active");
        }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 1024) {
            $("#resp_nav").fadeOut(300);
            $(".respmenubtn").removeClass("active");
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");
            $(".fixed_header").removeClass("active");
        }
    });

    $(".close_menu").click(function(e) {
      e.preventDefault();
      $("#resp_nav").fadeOut(300);
      $(".respmenubtn").removeClass("active");
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");
      $(".fixed_header").removeClass("active");
    });

    $(".main_nav li > .sub_btn").on("click", function(e) {
      e.preventDefault();
      if(bodyWidth <= 1024) {
        parent = $(this).closest("li");
        subMenu = parent.children(".sub_menu");
        if(subMenu.is(":hidden")) {
          subMenu.slideDown(300);
          parent.addClass("active");
        } else {
          subMenu.slideUp(300);
          parent.removeClass("active");
        }
      }
    });

    // --------------

    Fancybox.bind('[data-fancybox]');

    // --------------

    if( $(".op_slider").length > 0 ) {
      $(".op_slider").not(".slick-initialized").slick({
        dots: false,
        arrows: true,
        // autoplay: true,
        // autoplaySpeed: 4000,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: $(".prev_arrow"),
        nextArrow: $(".next_arrow")
      });
    }

    // ---------------

    if( $(".cards_slider").length > 0 ) {
      $(".cards_slider").not(".slick-initialized").slick({
          dots: false,
          arrows: true,
          // autoplay: true,
          // autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 4,
          slidesToScroll: 2,
          variableWidth: true,
          prevArrow: $(".cr_sl_prev"),
          nextArrow: $(".cr_sl_next")
      });
    }

    // --------------

    $(".dr_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dr_parent");
      sl = parent.find(".dr_content");
      if(sl.is(":hidden")) {
        parent.addClass("active");
        sl.slideDown(300);
      } else {               
        sl.slideUp(300);
        parent.removeClass("active");
      }
    });

    // --------------

    if( $(".testimonial_slider").length > 0 ) {
      $(".testimonial_slider").not(".slick-initialized").slick({
          dots: false,
          arrows: true,
          // autoplay: true,
          // autoplaySpeed: 4000,
          speed: 1200,
          slidesToShow: 4,
          slidesToScroll: 2,
          variableWidth: true,
          prevArrow: $(".test_sl_prev"),
          nextArrow: $(".test_sl_next")
      });
    }

});

  function initMap() {
    var mapZoom = parseFloat($("#map").attr("data-zoom"));
    var lat = parseFloat($("#map").attr("data-lat"));
    var long = parseFloat($("#map").attr("data-long"));
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: mapZoom,
      center: { lat: lat, lng: long },
      mapTypeControl: false,
    });
    new google.maps.Marker({
      position: { lat: lat, lng: long },
      map,
      title: "My Crane",
      icon: 'img/map_pin.svg'
    });
  }

  window.initMap = initMap;
