$(document).ready(function() {
  var servicesHeader = $(".services-block-grid__header");
  var servicesDropdown = $(".services-block-grid-sub");

  servicesHeader.click(function(e) {
    if (servicesDropdown.hasClass("hide-for-small-only")) {
      servicesDropdown
        .removeClass("hide-for-small-only")
        .hide(3)
        .slideDown();
    } else {
      servicesDropdown.slideUp(300, function() {
        servicesDropdown.addClass("hide-for-small-only");
      });
    }
  });

  // Nav menu dropdown
  var navLinks = $(".nav-links");
  var menuDropdown = $(".nav-links .dropdown");

  menuDropdown.click(function(e) {
    var dropDownElement = $(this).find("ul");

    if (!$(this).hasClass(".open")) {
      dropDownElement.stop().slideDown();
      $(this).addClass(".open");
    } else {
      $(this).removeClass(".open");
      dropDownElement.stop().slideUp();
    }
  });

  menuDropdown.find("> a").click(function(e) {
    e.preventDefault();
  });
  menuDropdown.hover(
    function() {
      var dropDownElement = $(this).find("ul");
      dropDownElement.stop().slideDown();
    },
    function() {
      var dropDownElement = $(this).find("ul");
      dropDownElement.stop().slideUp();
    },
  );

  // Show menu on mobile devices
  var menuIcon = $("nav .icon-menu");
  menuIcon.click(function(e) {
    if (navLinks.hasClass("show")) {
      navLinks.slideUp(function() {
        navLinks.removeClass("show");
      });
    } else {
      navLinks.addClass("show").hide();
      navLinks.stop().slideDown();
    }
  });
});
