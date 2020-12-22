$(document).ready(function () {
    console.log('jQuery is ready');


    var wow = new WOW(
        {
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0,          // distance to the element when triggering the animation (default is 0)
            mobile: true,       // trigger animations on mobile devices (default is true)
        }
    );
    wow.init();
});