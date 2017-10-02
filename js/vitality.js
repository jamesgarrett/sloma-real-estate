/*!
 * 
 * Custom Scripts for Real Estate Extended
 *
 */


// Load WOW.js on non-touch devices
$(document).ready(function() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        /* The viewport is less than, or equal to, 700 pixels wide */
            // mobile
    } else {
        /* The viewport is greater than 700 pixels wide */
            //desktop               
            // Initialize WOW.js
            wow = new WOW({
                offset: 50
            })
        wow.init();
    }
});

window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});

(function($) {
    "use strict"; // Start of use strict

    // Collapse the navbar when page is scrolled
    $(window).scroll(function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('*').scrollspy({
        target: '#mainNav',
        offset: 68
    });

    // Smooth Scrolling: Smooth scrolls to an ID on the current page
    // To use this feature, add a link on your page that links to an ID, and add the .page-scroll class to the link itself. See the docs for more details.
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('*').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 68)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Closes responsive menu when a link is clicked
    $('.navbar-collapse>ul>li>a, .navbar-brand').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $( 'button.navbar-toggler' ).click(function() {
      $('.navbar-collapse').toggleClass('collapse');
      $('.navbar-toggler').toggleClass('clicked');
    });


    // Activates floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Owl Carousel Settings
    $(".team-carousel").owlCarousel({
        items: 3,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });

    $(".testimonials-carousel, .mockup-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: true,
        autoHeight: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        transitionStyle: "backSlide"
    });


})(jQuery); // End of use strict

// iframes.js
// browser compatibility: get method for event 
// addEventListener(FF, Webkit, Opera, IE9+) and attachEvent(IE5-8)
var myEventMethod = 
    window.addEventListener ? "addEventListener" : "attachEvent";
// create event listener
var myEventListener = window[myEventMethod];
// browser compatibility: attach event uses onmessage
var myEventMessage = 
    myEventMethod == "attachEvent" ? "onmessage" : "message";
// register callback function on incoming message
myEventListener(myEventMessage, function (e) {
    // we will get a string (better browser support) and validate
    // if it is an int - set the height of the iframe #my-iframe-id
    if (e.data === parseInt(e.data)) 
        document.getElementById('iFrame1').height = e.data + "px";
}, false);


var frames = window.frames;

