
$(document).ready(function() {
    //Elements Appear from top
    $('.item_top').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                top: "0px"
            }, 1000);
        });
    });
    //Elements Appear from bottom
    $('.item_bottom').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                bottom: "0px"
            }, 1000);
        });
    });
    //Elements Appear from left
    $('.item_left').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                left: "0px"
            }, 1000);
        });
    });
    //Elements Appear from right
    $('.item_right').each(function() {
        $(this).appear(function() {
            $(this).delay(200).animate({
                opacity: 1,
                right: "0px"
            }, 1000);
        });
    });
    //Elements Appear in fadeIn effect
    $('.item_fade_in').each(function() {
        $(this).appear(function() {
            $(this).delay(250).animate({
                opacity: 1,
                right: "0px"
            }, 1500);
        });
    });
    processLine.init();


    /*===================================================================================*/
    /*  PROFOLIO                                                                         */
    /*===================================================================================*/
    var portfolio = portfolio || {},
        $portfolioItems = $('#portfolio-items'),
        $filtrable = $('#portfolio-filter');
    /*===================================================================================*/
    /*  PROFOLIO INIT FULL WIDTH                                                         */
    /*===================================================================================*/
    portfolio.fullWidth = function() {
        $(window).load(function() {
            $portfolioItems.isotope({
                animationEngine: 'best-available',
                animationOptions: {
                    duration: 250,
                    easing: 'easeInOutSine',
                    queue: false
                }
            });
        });
        $filtrable.find('a').click(function(e) {
            var currentOption = $(this).data('cat');
            $filtrable.find('a').removeClass('active');
            $(this).addClass('active');
            if (currentOption !== '*') {
                currentOption = '.' + currentOption;
            }
            $portfolioItems.isotope({
                filter: currentOption
            });
            return false;
        });
    }; 
    
    
    
    /*===================================================================================*/
    /*  PROFOLIO INIT AJAX                                                               */
    /*===================================================================================*/
    portfolio.ajax = function() {
        function portfolioInit() {
            var newHash = "",
                $mainContent = $("#portfolio-ajax"),
                $pageWrap = $("#portfolio-wrap"),
                root = '#!projects/',
                rootLength = root.length,
                url;
           
            //binding keypress function
            $("#portfolio-wrap").bind("keydown", function(e) {
                if (e.keyCode == 37) {
                    $('.single-portfolio').remove();
                    window.location.hash = $("#portfolio-items .current").next().find('a').attr("href");
                    return false;
                } else if (e.keyCode == 39) {
                    $('.single-portfolio').remove();
                    window.location.hash = $("#portfolio-items .current").prev().find('a').attr("href");
                    return false;
                } else if (e.keyCode == 27) {
                    $('#portfolio-wrap').fadeOut('100', function() {
                        $('.single-portfolio').remove();
                    });
                    history.pushState('', document.title, window.location.pathname);
                    window.location.hash = '#_';
                    return false;
                }
            });
            
            $(window).bind('hashchange', function() {
                newHash = window.location.hash;
                if (newHash.substr(0, rootLength) == root) {
                    if ($pageWrap.is(':hidden')) {
                        $pageWrap.slideDown('3000', function() {});
                    }
                    $pageWrap.niceScroll({
                        cursorcolor: "#666",
                        cursorwidth: 6,
                        cursorborder: 0,
                        cursorborderradius: 0
                    });
                    
                    $pageWrap.append('<div id="preloader"></div>');
                    $mainContent.load(url + " .single-portfolio", function(xhr, statusText, request) {
                        if (statusText == "success") {
                            setTimeout(function() {
                                $(".slider_container").flexslider({
                                    directionNav: true,
                                    controlNav: false
                                });
                                $('.single-portfolio .media-container').fitVids();
                                $pageWrap.find('#preloader').remove();
                            }, 300);
                        }
                        if (statusText == "error") {
                            $mainContent.html('<div class="row pad-top pad-bottom"><div class="col-md-12 pad-top pad-bottom"><div class="alert-message error"><p>The Content cannot be loaded.</p></div></div></div>');
                            $pageWrap.find('#preloader').remove();
                        }
                        closeProject();
                        nextProject();
                        prevProject();
                    });
                   
                } else if (newHash == '') {
                    $('#portfolio-wrap').fadeOut('100', function() {
                        $('.single-portfolio').remove();
                    });
                }
            });
            $(window).trigger('hashchange');
        }

        if ($portfolioItems.length) {
            portfolioInit();
        }
    };


    portfolio.fullWidth();
    portfolio.ajax();
    $(function() {
        $('.chart').appear(function() {
            $('.chart').easyPieChart({
                easing: 'easeOutBounce',
                barColor: "#000000",
                size: "150",
                lineWidth: 15,
                animate: 2000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        });
    });
    $('.skillBar li').each(function() {
        $(this).appear(function() {
            $(this).animate({
                opacity: 1,
                left: "0px"
            }, 2000);
            var b = $(this).find("span").attr("data-width");
            $(this).find("span").animate({
                width: b + "%"
            }, 2200, "easeOutBounce")
        })
    });
    
    
    
    
    
    // Contact Form Request
    $(".validate").validate();
    var form = $('#contactform');
    var submit = $('#contactForm_submit');
    var alertx = $('.form-respond');
    // form submit event
    $(document).on('submit', '#contactform', function(e) {
        e.preventDefault(); // prevent default form submit
        // sending ajax request through jQuery
        $.ajax({
            url: 'sendemail.php',
            type: 'POST',
            dataType: 'html',
            data: form.serialize(),
            beforeSend: function() {
                alertx.fadeOut();
                submit.html('Sending....'); // change submit button text
            },
            success: function(data) {
                form.fadeOut(300);
                alertx.html(data).fadeIn(1000); // fade in response data     
                setTimeout(function() {
                    alertx.html(data).fadeOut(300);
                    $('#name, #email, #message').val('')
                    form.fadeIn(1800);
                }, 4000);
            },
            error: function(e) {
                console.log(e)
            }
        });
    });
    
    
    

    
    
    
    
    // Minify the Nav Bar
    jQuery(document).scroll(function() {
        var position = jQuery(document).scrollTop();
        var headerHeight = jQuery('#home').outerHeight();
        if (jQuery('#home').length > 0) {
            var headerTop = jQuery('#home').offset().top;
        }
        if (position >= headerHeight - 100) {
            jQuery('.navbar').addClass('minified');
        } else {
            jQuery('.navbar').removeClass('minified');
        }
        if (position > headerTop + 40) {
            jQuery('.navbar-transparent').addClass('darken');
        } else {
            jQuery('.navbar-transparent').removeClass('darken');
        }
        // Show "Back to Top" button
        if (position >= headerHeight - 100) {
            jQuery('.scrolltotop').addClass('show-to-top');
        } else {
            jQuery('.scrolltotop').removeClass('show-to-top');
        }
    });
    //Back To Top
    $(window).scroll(function() {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200);
        } else {
            $("#back-top").fadeOut(200);
        }
    });
    $('#back-top').click(function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
    });
});







//Navigation Scrolling
$(function() {
    $('.nav li a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});
//Scroll nav Scrolling
$(function() {
    $('a.scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});
//REVOLUTION SLIDER
$(document).ready(function() {
    if(jQuery('.tp-banner').length){
    jQuery('.tp-banner').show().revolution({
        dottedOverlay: "twoxtwo",
        delay: 16000,
        startwidth: 1170,
        startheight: 700,
        hideThumbs: 200,

        navigationType: "none",

        touchenabled: "on",
        onHoverStop: "on",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        keyboardNavigation: "off",

        navigationHAlign: "center",
        navigationVAlign: "bottom",
        navigationHOffset: 0,
        navigationVOffset: 20,


        shadow: 0,
        fullWidth: "off",
        fullScreen: "on",

        spinner: "spinner4",

        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: "off",

        autoHeight: "off",
        forceFullWidth: "off",

        hideThumbsOnMobile: "off",
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: "off",
        hideArrowsOnMobile: "off",
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0,
        fullScreenOffsetContainer: ".header"
    });
    }
}); //ready
//Parallax
$(window).bind('load', function() {
    if (!onMobile)
        parallaxInit();
});

function parallaxInit() {
    $('#clients').parallax("50%", 0.3); /*add as necessary*/
}
var onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    onMobile = true;
}



    //Process Bar 
var processLine = {
    el: ".process-node",
    init: function() {
        processLine.bind();
    },
    bind: function() {
        $(window).scroll(function() {
            processLine.check();
        });
    },
    check: function() {
        $(processLine.el).each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 200) {
                $(this).closest("li").addClass("active").find(".line").addClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).closest("li").removeClass("active").find(".line").removeClass("active");
            }
        });
    }
}



//logo hover animation
function MM_swapImgRestore() {
  var i,x,a=document.MM_sr; 
  for(i=0; a && i<a.length && (x=a[i]) && x.oSrc; i++) 
  x.src=x.oSrc;
}
function MM_findObj(n, d) { 
  var p,i,x;  
  if(!d) d=document; 
  if((p=n.indexOf("?")) > 0 && parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; 
    n=n.substring(0,p);
    }
  if(!(x=d[n]) && d.all) 
  x=d.all[n]; 
  for (i=0; !x && i<d.forms.length; i++){ 
  x=d.forms[i][n];
  }
  for(i=0; !x && d.layers && i<d.layers.length; i++){ 
  x=MM_findObj(n,d.layers[i].document);
  }
  if(!x && d.getElementById){ 
  x=d.getElementById(n); 
  return x;
  }
}
function MM_swapImage() { 
  var i,j=0,x,a=MM_swapImage.arguments; 
  document.MM_sr=new Array; 
  for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){
   document.MM_sr[j++]=x; 
   if(!x.oSrc) x.oSrc=x.src; 
   x.src=a[i+2];
   }
}

//for name, email and message check
function check(fr) {
	var email = fr.Email.value;
	var message = fr.Message.value;
	var name = fr.Name.value;
	if (name.length == 0) {
		document.getElementById('Names').innerText="Name can not be empty.";
		return false;
	}
	var at = email.indexOf("@");
	var dot = email.lastIndexOf(".");
	if (at < 1 || dot < -1 || dot <= at) {
		document.getElementById('Emails').innerText="Email is wrong.";
		return false;
	}
	if (message.length <= 10) {
		document.getElementById('Messages').innerText="message should longer than 10 characters.";
		return false;
	}
}
