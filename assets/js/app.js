$(document).ready(function() {
  /**
   * Show navigation links on mobile using the menu icon
   */
  const menuIcon = $(".menu-icon"); // Navigation menu icon
  const navLinksMobile = $(".nav__links--mobile");

  menuIcon.click(function(e) {
    console.log(navLinksMobile);
    if (!navLinksMobile.hasClass("show")) {
      navLinksMobile.addClass("show");
      navLinksMobile.stop().slideDown();
    } else {
      navLinksMobile.removeClass("show");
      navLinksMobile.stop().slideUp();
    }
    e.preventDefault();
  });

  const dropDownItems = $(".nav__links .dropdown");
  dropDownItems.each(function() {
    const mainLink = $(this).find(">a");
    const dropElement = $(this).find("ul");
    $(this).hover(
      function() {
        dropElement.stop().slideDown();
      },
      function() {
        dropElement.stop().slideUp();
      },
    );

    mainLink.click(function(e) {
      console.log(dropElement);
      dropElement.stop().slideDown();
      e.preventDefault();
    });
  });

  // Send the history state one step back
  $(".back-btn").on("click", function() {
    history.go(-1);
  });

  // Scroll window to top
  $(".top-btn").on("click", function() {
    $(window).scrollTop(0);
  });

  // Landing page slider
  $(".js-slider").flexslider({
    animation: "slide",
    // controlNav: "thumbnails",
    controlsContainer: $(".slider__controls"),
  });

  // Carousel
  $(".js-carousel").flexslider({
    animation: "slide",
    controlNav: "thumbnails",
    // controlsContainer: $(".slider__controls"),
  });
});
