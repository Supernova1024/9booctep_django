/* eslint-disable */
(function ($) {
  jQuery(function ($) {
    // wait until the DOM is ready
    $("#datepicker,#datepicker2,#datepicker3,#datepicker4,#datepicker5,#datepicker6,#datepicker7").datepicker({
      dateFormat: "d MM yy",
      duration: "medium",
      changeMonth: true,
      changeYear: true,
      yearRange: "2021:2010",
    });
    $("#datepicker9").datepicker({
      dateFormat: 'yy-mm-dd',
      timeFormat: ' hh:ii:ss',
      showWeek: true
    });
    $("#datepicker8").datepicker({
      minDate: -20,
      maxDate: "+1M +10D"
    });
  });

  (from = $('input[name="date-range-from"]')
    .datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      onSelect: function () {
        $("#ui-datepicker-div").addClass("testX");
      },
    })
    .on("change", function () {
      to.datepicker("option", "minDate", getDate(this));
    })),
  (to = $('input[name="date-range-to"]')
    .datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
    })
    .on("change", function () {
      from.datepicker("option", "maxDate", getDate(this));
    }));

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }

  /* Replace all SVG images with inline SVG */
  $("img.svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = jQuery(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  /* feather icon */
  feather.replace();

  /* sidebar collapse  */
  const sidebarToggle = document.querySelector(".sidebar-toggle");

  function sidebarCollapse(e) {
    e.preventDefault();
    $('.overlay-dark-sidebar').toggleClass('show');
    document.querySelector(".sidebar").classList.toggle("collapsed");
    document.querySelector(".contents").classList.toggle("expanded");
  }
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", sidebarCollapse);
  }

  /* sidebar nav events */
  $(".sidebar_nav .has-child ul").hide();
  $(".sidebar_nav .has-child.open ul").show();
  $(".sidebar_nav .has-child >a").on("click", function (e) {
    e.preventDefault();
    $(this).parent().next("has-child").slideUp();
    $(this).parent().parent().children(".has-child").children("ul").slideUp();
    $(this).parent().parent().children(".has-child").removeClass("open");
    console.log($(this).next());
    if ($(this).next().is(":visible")) {
      $(this).parent().removeClass("open");
    } else {
      $(this).parent().addClass("open");
      $(this).next().slideDown();
    }
  });

  /* Header mobile view */
  $(window)
    .bind("resize", function () {
      var screenSize = window.innerWidth;
      if ($(this).width() <= 767.98) {
        $(".navbar-right__menu").appendTo(".mobile-author-actions");
        $(".search-form").appendTo(".mobile-search");
        $(".contents").addClass("expanded");
        $(".sidebar ").addClass("collapsed");
      }
    })
    .trigger("resize");

  $(window)
    .bind("resize", function () {
      var screenSize = window.innerWidth;
      if ($(this).width() > 767.98) {
        $(".atbd-mail-sidebar").addClass("show");
      }
    })
    .trigger("resize");
  $(window)
    .bind("resize", function () {
      var screenSize = window.innerWidth;
      if ($(this).width() <= 991) {
        $(".sidebar").addClass("collapsed");
        $(".sidebar-toggle").on("click", function () {
          $(".overlay-dark-sidebar").toggleClass("show");
        });
        $(".overlay-dark-sidebar").on("click", function () {
          console.log($(this));
          $(this).removeClass("show");
          $(".sidebar").addClass("collapsed");
        });
      }
    })
    .trigger("resize");

  /* Mobile Menu */
  $(window)
    .bind("resize", function () {
      var screenSize = window.innerWidth;
      if ($(this).width() <= 991.98) {
        $(".menu-horizontal").appendTo(".mobile-nav-wrapper");
      }
    })
    .trigger("resize");

  $(".btn-search").on("click", function () {
    $(this).toggleClass("search-active");
    $(".mobile-search").toggleClass("show");
    $(".mobile-author-actions").removeClass("show");
  });


  $(".kanban-items li").hover(function () {
    $(this).toggleClass("active");
  });

  $(".btn-author-action").on("click", function () {
    $(".mobile-author-actions").toggleClass("show");
    $(".mobile-search").removeClass("show");
    $(".btn-search").removeClass("search-active");
  });

  $(".menu-mob-trigger").on("click", function (e) {
    e.preventDefault();
    $(".mobile-nav-wrapper").toggleClass("show");
  });

  $(".nav-close").on("click", function (e) {
    e.preventDefault();
    $(".mobile-nav-wrapper").removeClass("show");
  });

  let getData = (optionValue, defaultValue) =>
    typeof optionValue === "undefined" ? defaultValue : optionValue;

  /* Slick Slider */
  $(".slick-slider").each(function () {
    $(this).slick({
      slidesToShow: getData($(this).data("slide-slick"), 1),
      slidesToScroll: getData($(this).data("slideScroll-slick"), 1),
      infinite: getData($(this).data("infinity-slick"), true),
      speed: 300,
      autoplay: getData($(this).data("autoplay-slick"), false),
      autoplaySpeed: getData($(this).data("autoplaySpeed-slick"), 5000),
      lazyLoad: getData($(this).data("lazyLoad-slick"), "ondemand"),
      centerMode: getData($(this).data("center-slick"), false),
      rtl: getData($(this).data("rtl-slick"), false),
      adaptiveHeight: getData($(this).data("adaptiveHeight-slick"), false),
      arrows: getData($(this).data("arrow-slick"), false),
      prevArrow: [
        "<span class='slick-prev'><i class='la la-angle-left'></i></span>",
      ],
      nextArrow: [
        "<span class='slick-next'><i class='la la-angle-right'></i></span>",
      ],
      dots: getData($(this).data("dots-slick"), false),
      fade: getData($(this).data("fade-slick"), false),
      responsive: getData($(this).data("responsive-slick"), {}),
    });
  });

  /* Refresh Slick Under Tab */
  $('a[data-toggle="tab"]').on("shown.bs.tab", function () {
    $(".slick-slider").slick("refresh");
  });

  /* Dropdown Event */
  $(".dropdown-clickEvent a").on("click", function (e) {
    e.preventDefault();
    const text = $(this).text();
    const notice = `
            <div class="atbd-notice">
                <span>${text} Clicked</span>
            </div>
        `;
    $(".atbd-message").prepend(notice);
    $(".atbd-message").toggleClass("show");

    setTimeout(function () {
      $(".atbd-message").empty();
      $(".atbd-message").removeClass("show");
    }, 3000);
  });

  /* Popup gallery */
  $(".ap-post-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });

  /* Video Popup */
  $(".popup-youtube").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /* Hover active */
  $(".friends-follow").on("click", function (e) {
    e.preventDefault();
    $button = $(this);
    if ($button.hasClass("following")) {
      //$.ajax(); Do Unfollow

      $button.removeClass("following");
      $button.removeClass("unfollow");
      $button.text("Follow");
    } else {
      // $.ajax(); Do Follow
      $button.html('<i class="la la-check"></i> following');
      $button.addClass("following");
    }
  });

  /* Profile Post Highlighting */
  const postForm = document.querySelector(".ap-post-form");
  const postInput = document.querySelector(".ap-post-form textarea");
  const overlayDark = document.createElement("div");
  overlayDark.classList.add("overlay-dark");

  function highlightForm(e) {
    e.preventDefault();
    document.body.appendChild(overlayDark);
    overlayDark.style.opacity = "1";
    overlayDark.style.visibility = "visible";
    document.body.style.position = "relative";
    setTimeout(function () {
      postForm.classList.add("highlighted");
    }, 300);
  }

  if (postForm && postInput) {
    postInput.addEventListener("click", highlightForm);
  }

  function highlightRemoveForm(e) {
    if (
      !e.target.closest(".ap-post-form") &&
      postForm.classList.contains("highlighted")
    ) {
      document.body.removeChild(overlayDark);
      overlayDark.style.opacity = "0";
      overlayDark.style.visibility = "hidden";
      document.body.removeAttribute("style");
      postForm.classList.remove("highlighted");
    }
  }
  if (postForm !== null) {
    document.body.addEventListener("click", highlightRemoveForm);
  }

  /* Select */
  $("#countryOption,#cityOption,#skillsOption,#exampleFormControlSelect1,#select-countryOption").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "Please Select",
    allowClear: true,
  });
  $("#event-category").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "Project Category",
    allowClear: true,
  });
  $("#category-member").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "Project Category",
    dropdownCssClass: "category-member",
    allowClear: true,
  });
  $("#cupon").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "Select Coupon",
    dropdownCssClass: "cupon",
    allowClear: true,
  });
  $("#month").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "MM",
    dropdownCssClass: "month",
    allowClear: true,
  });
  $("#year").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "yy",
    dropdownCssClass: "year",
    allowClear: true,
  });

  $('#clock').countdown('2021/10/10', function (event) {
    var $this = $(this).html(event.strftime('' +
      '<span class="number">%d<span class="text">days</span></span> ' +
      '<span class="number">%H<span class="text">hours</span></span> ' +
      '<span class="number">%M<span class="text">minutes</span></span> ' +
      '<span class="number">%S<span class="text">seconds</span></span> '));
  });

  /* Toggle class */
  $('#customSwitch1, input[name="intervaltype"]').on("click", function () {
    $(".monthly,#monthly").toggleClass("active");
    $(".yearly,#yearly").toggleClass("active");
  });

  /* Toggle Password visibility */
  $(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye-slash fa-eye");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  /* Tag closable */
  $(".tag-closable").on("click", function () {
    $(this).parent(".atbd-tag ").remove();
  });

  /* Gallery Filter */
  const options = {
    gridItemsSelector: ".filtr-item",
    gutterPixels: 25, // Items spacing in pixels
    spinner: {
      enabled: true,
    },
    layout: "sameSize",
  };
  if (document.querySelector(".filtr-container") !== null) {
    const filterizr = new Filterizr(".filtr-container", options);
  }
  const simpleFilters = document.querySelectorAll(".simplefilter li");
  Array.from(simpleFilters).forEach((node) =>
    node.addEventListener("click", function () {
      simpleFilters.forEach((filter) => filter.classList.remove("active"));
      node.classList.add("active");
    })
  );

  /* Tab Multiple Trigger */
  $("#ueberTab a").on("click", function (e) {
    otherTabs = $(this).attr("data-secondary").split(",");
    for (i = 0; i < otherTabs.length; i++) {
      nav = $('<ul class="nav d-none" id="tmpNav"></ul>');
      nav.append(
        '<li class="nav-item"><a href="#" data-toggle="tab" data-target="' +
        otherTabs[i] +
        '">nav</a></li>"'
      );
      nav.find("a").tab("show");
    }
  });

  /* Star Rating Basic */
  $(".rating-basic").starRating({
    emptyColor: "#C6D0DC",
    hoverColor: "#FA8B0C",
    ratedColor: "#FA8B0C",
    disableAfterRate: false,
    useFullStars: true,
    starSize: 12,
    strokeWidth: 6,
  });

  /* Star Rating Read Only */
  $(".rating-readOnly").starRating({
    emptyColor: "#C6D0DC",
    hoverColor: "#FA8B0C",
    ratedColor: "#FA8B0C",
    activeColor: "#FA8B0C",
    useGradient: false,
    initialRating: 2,
    readOnly: true,
    starSize: 12,
    strokeWidth: 6,
  });

  /* Star Rating Read Only */
  $(".rating-half-star").starRating({
    emptyColor: "#C6D0DC",
    hoverColor: "#FA8B0C",
    ratedColor: "#FA8B0C",
    activeColor: "#FA8B0C",
    initialRating: 2,
    starSize: 12,
    strokeWidth: 6,
  });

  /* Star Rating Read Only */
  $(".rater").starRating({
    emptyColor: "#C6D0DC",
    hoverColor: "#FA8B0C",
    ratedColor: "#FA8B0C",
    activeColor: "#FA8B0C",
    useFullStars: true,
    initialRating: 2,
    starSize: 12,
    strokeWidth: 6,
    disableAfterRate: false,
    onHover: function (currentIndex, currentRating, $el) {
      $(".rate-count").text(currentIndex);
    },
    onLeave: function (currentIndex, currentRating, $el) {
      $(".rate-count").text(currentRating);
    },
  });

  /* Countdown Activation */
  let $countDown = $("[data-countdown]");
  $countDown.each(function () {
    $(this).countdown($(this).data("countdown"), function (e) {
      $(this).html(
        "<ul>" +
        e.strftime(
          '<li><span class="statistics-countdown__time">%H</span>:</li><li><span class="statistics-countdown__time">%M</span>:</li><li><span class="statistics-countdown__time">%S</span></li>'
        ) +
        "</ul>"
      );
    });
  });

  /* Embedded Spin */
  $("#switch-spin").on("change", function () {
    if ($(this).is(":checked")) {
      $(".spin-embadded").addClass("spin-active");
    } else {
      $(".spin-embadded").removeClass("spin-active");
    }
  });

    $('.kb__select-wrapper select,.tagSelect-rtl select').select2({
    dir: "rtl",
    dropdownAutoWidth: true,	
    dropdownParent: $('.kb__select-wrapper .select2,.tagSelect-rtl .select2')
  });

  /* Uploads Basic */
  const imageUpload = document.querySelector(".upload-one");

  function uploadfile() {
    if (window.File && window.FileList && window.FileReader) {
      let files = event.target.files; //FileList object
      let uploadedList = $(".atbd-upload__file ul");

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.match("image")) continue;

        let fileReader = new FileReader();

        fileReader.addEventListener("load", function (event) {
          let targetFile = event.target;
          let fileName = `
                      <li>
                        <a href="#" class="file-name"><i class="las la-paperclip"></i> <span class="name-text">${file.name}<span></a>
                        <a href="#" class="btn-delete"><i class="la la-trash"></i></a>
                      </li>
                    `;

          uploadedList.append(fileName);
        });

        fileReader.readAsDataURL(file);
      }
    } else {
      console.log("Browser not support");
    }
  }

  if (imageUpload !== null) {
    imageUpload.addEventListener("change", uploadfile, false);
  }

  /* Time Picker */
  $("#time-picker,#time-picker2").wickedpicker();

  /* Slider Basic */
  let initialValue = 20;
  let sliderTooltip = function (event, ui) {
    var curValue = ui.value || initialValue;
    var target = ui.handle || $(".ui-slider-handle");
    var tooltip = `<span class="tooltip-text">${curValue}</span>`;

    $(target).html(tooltip);
  };

  /* Slider Controll */
  $("#switch-slider").on("change", function () {
    if ($(this).is(":checked")) {
      $(".slider-wrapper").addClass("disabled");
      $(".slider-basic , .slider-range").slider({
        disabled: "true",
      });
    } else {
      $(".slider-wrapper").removeClass("disabled");
      $(".slider-basic, .slider-range").slider({
        disabled: "false",
      });
    }
  });
  $(".slider-basic").slider({
    range: "min",
    min: 0,
    max: 50,
    value: initialValue,
    slide: sliderTooltip,
    create: sliderTooltip,
  });

  $(".slider-range").slider({
    range: true,
    min: 0,
    max: 50,
    values: [15, 30],
    slide: sliderTooltip,
    create: sliderTooltip,
  });

  /* Slider Controll */
  $("#switch-slider").on("change", function () {
    if ($(this).is(":checked")) {
      $(".slider-wrapper").addClass("disabled");
      $(".slider-basic , .slider-range").slider({
        disabled: "true",
      });
    } else {
      $(".slider-wrapper").removeClass("disabled");
      $(".slider-basic, .slider-range").slider({
        disabled: "false",
      });
    }
  });

  /* Drawer Trigger */
  const drawerTriggers = document.querySelectorAll(".drawer-trigger");
  const drawerBasic = document.querySelector(".drawer-basic-wrap");
  const overlay = document.querySelector(".overlay-dark");
  const draweClosebtns = document.querySelectorAll(".btdrawer-close");

  const drawerMultilevel = document.querySelector(".drawer-multiLevel");

  const areaDrawer = document.querySelector(".area-drawer");
  const areaOverlay = document.querySelector(".area-overlay");

  function openDrawer(e) {
    e.preventDefault();
    if (this.dataset.drawer == "basic") {
      drawerBasic.classList.remove("account");
      drawerBasic.classList.remove("profile");
      drawerBasic.classList.add("basic");
      drawerBasic.classList.add("show");
      overlay.classList.add("show");
    } else if (this.dataset.drawer == "area") {
      areaDrawer.classList.add("show");
      areaOverlay.classList.add("show");
    } else if (this.dataset.drawer == "account") {
      drawerBasic.classList.remove("basic");
      drawerBasic.classList.remove("profile");
      drawerBasic.classList.add("account");
      drawerBasic.classList.add("show");
      overlay.classList.add("show");
    } else if (this.dataset.drawer == "profile") {
      drawerBasic.classList.remove("basic");
      drawerBasic.classList.remove("account");
      drawerBasic.classList.add("profile");
      drawerBasic.classList.add("show");
      overlay.classList.add("show");
    }
  }

  function hideDrawer() {
    drawerBasic.classList.remove("show");
    overlay.classList.remove("show");

    areaDrawer.classList.remove("show");
    areaOverlay.classList.remove("show");

    drawerMultilevel.classList.remove("show");
  }

  if (drawerTriggers) {
    drawerTriggers.forEach((drawerTrigger) =>
      drawerTrigger.addEventListener("click", openDrawer)
    );
  }
  if (overlay) {
    overlay.addEventListener("click", hideDrawer);
  }
  if (draweClosebtns) {
    draweClosebtns.forEach((draweClosebtn) =>
      draweClosebtn.addEventListener("click", hideDrawer)
    );
  }
  if (areaOverlay) {
    areaOverlay.addEventListener("click", hideDrawer);
  }

  /* Drawer Placement */
  let placementRadios = document.getElementsByName("radio-placement");

  function setPlacementRadio() {
    for (var i = 0; i < placementRadios.length; i++) {
      if (placementRadios[i].checked) {
        if (placementRadios[i].value == "top") {
          drawerBasic.classList.add("top");
          drawerBasic.classList.remove("right");
          drawerBasic.classList.remove("bottom");
          drawerBasic.classList.remove("left");
        } else if (placementRadios[i].value == "left") {
          drawerBasic.classList.add("left");
          drawerBasic.classList.remove("right");
          drawerBasic.classList.remove("bottom");
          drawerBasic.classList.remove("top");
        } else if (placementRadios[i].value == "bottom") {
          drawerBasic.classList.add("bottom");
          drawerBasic.classList.remove("right");
          drawerBasic.classList.remove("left");
          drawerBasic.classList.remove("top");
        } else if (placementRadios[i].value == "right") {
          drawerBasic.classList.add("right");
          drawerBasic.classList.remove("left");
          drawerBasic.classList.remove("bottom");
          drawerBasic.classList.remove("top");
        }

        break;
      }
    }
  }
  if (placementRadios) {
    placementRadios.forEach((placementRadio) =>
      placementRadio.addEventListener("change", setPlacementRadio)
    );
  }

  const multiTriggers = document.querySelectorAll(".drawer-multiTrigger");
  const overlayLevelTwo = document.querySelector(".overlay-dark-l2");

  function showMultiDrawer() {
    if (this.dataset.drawer == "level-one") {
      drawerMultilevel.classList.add("level-one");
      drawerMultilevel.classList.add("show");
      drawerMultilevel.classList.remove("level-two");
      overlay.classList.add("show");
    } else if (this.dataset.drawer == "level-two") {
      drawerMultilevel.classList.add("level-two");
      overlayLevelTwo.classList.add("show");
      drawerMultilevel.classList.add("show");
    }
  }

  function hideMultiLavel() {
    drawerMultilevel.classList.remove("level-two");
    overlayLevelTwo.classList.remove("show");
  }

  if (overlayLevelTwo) {
    overlayLevelTwo.addEventListener("click", hideMultiLavel);
  }
  if (multiTriggers) {
    multiTriggers.forEach((multiTrigger) =>
      multiTrigger.addEventListener("click", showMultiDrawer)
    );
  }

  /* Upload Avatar */
  function avatarUpload() {
    let readURL = function (input) {
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          $(".avatrSrc").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };
    $(".upload-avatar-input").on("change", function () {
      readURL(this);
    });
  }

  $(".atbd-upload-avatar").on("click", function (e) {
    e.preventDefault();
    avatarUpload();
    $(".upload-avatar-input").click();
  });

  /* Collapsable Menu */
  function mobileMenu(dropDownTrigger, dropDown) {
    $(".menu-wrapper .menu-collapsable " + dropDown).slideUp();

    $(".menu-wrapper " + dropDownTrigger).on("click", function (e) {
      if ($(this).parent().hasClass("has-submenu")) {
        e.preventDefault();
      }
      $(this)
        .toggleClass("open")
        .siblings(dropDown)
        .slideToggle()
        .parent()
        .siblings(".sub-menu")
        .children(dropDown)
        .slideUp()
        .siblings(dropDownTrigger)
        .removeClass("open");
    });
  }

  mobileMenu(".menu-collapsable .atbd-menu__link", ".atbd-submenu");

  /* Select */
  $("#select-component").select2({
    minimumResultsForSearch: Infinity,
  });

  $("#select-search,.kb__select").select2({
    placeholder: "Search a person",
    dropdownCssClass: "category-member",
    allowClear: true,
  });
  $("#select-alerts2").select2({
    placeholder: "Alerts",
    dropdownCssClass: "alert2",
    allowClear: true,
  });
  $("#select-option2").select2({
    placeholder: "Select an option...",
    dropdownCssClass: "option2",
    allowClear: true,
  });

  $("#select-tag,#select-tag2").select2({
    placeholder: "Tags Mode",
    dropdownCssClass: "tag",
    tags: ["red", "green", "blue"],
    allowClear: true,
  });

  /* Mail Compose Rich-text*/
  $("#mail-message, #mail-reply-message").trumbowyg({
    btns: [
      ["formatting"],
      ["strong", "em"],
      ["superscript", "subscript"],
      ["link"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
      ["viewHTML"],
      ["unorderedList", "orderedList"],
    ],
  });
  /* Mail Compose Rich-text*/
  $("#mail-reply-message2,#mail-reply-message3").trumbowyg({
    btns: [
      ["formatting","strong", "em","superscript", "subscript","link"],
      ["unorderedList", "orderedList"],
    ],
  });

  $("#mail-to,#reply-to,#reply-to2").select2({
    placeholder: "",
    dropdownCssClass: "mail-to",
  });

  /* mailbar Toggle */
  $(".mailbar-toggle").on("click", function () {
    $(".atbd-mail-sidebar").toggleClass("show");
  });
  $(".mailbar-cross").on("click", function (e) {
    e.preventDefault();
    $(".atbd-mail-sidebar").removeClass("show");
  });

  /* Bookmarks Icon */
  $(".like-icon").click(function () {
    $(this).find(".icon").toggleClass("lar");
    $(this).find(".icon").toggleClass("las");
  });

  /* Follow button */
  $(".ap-button .follow").click(function () {
    $(this).find(".follow-icon").toggleClass("la-user-plus");
    $(this).find(".follow-icon").toggleClass("la-user-check");
    $(this).toggleClass("active");
  });

  /* Price Ranges */
  $(".price-slider").slider({
    range: true,
    min: 0,
    max: 3000,
    values: [0, 2000],
    slide: function (event, ui) {
      $(".price-value").text("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });
  $(".price-value").text(
    "$" +
    $(".price-slider").slider("values", 0) +
    " - $" +
    $(".price-slider").slider("values", 1)
  );

  /* Text Limit */
  $(".text-limit p span").text(function (index, currentText) {
    return currentText.substr(0, 34);
  });

  /* Carousel */
  $("#myCarouselArticle").carousel({
    interval: false,
  });

  $(document).on("click", ".qty-plus", function () {
    $(this)
      .prev()
      .val(+$(this).prev().val() + 1);
  });
  $(document).on("click", ".qty-minus", function () {
    if ($(this).next().val() > 0)
      $(this)
      .next()
      .val(+$(this).next().val() - 1);
  });

  $(".fc-listMonth-button").on("click", function () {
    console.log($(".fc-listMonth-button"));
    const lastChild = document.querySelectorAll(".fc-list-table");
    console.log(lastChild);
  });

  $(".open-popup-modal").each(function(i, e){
    $(e).on("click", function () {
      $(this).siblings(".popup-overlay").fadeIn('slow').addClass("active");
      $(this).siblings(".popup-overlay").children(".popup-content").fadeIn('slow').addClass("active");
      $("body").fadeIn('slow').addClass("is-open");
    });
  });

  //close the edit title modal
  $("body").on("click", function (e) {
    if(!e.target.closest('.open-popup-modal, .popup-content')){
      $(".popup-overlay, .popup-content").fadeIn('slow').removeClass("active");
      $("body").fadeIn('slow').removeClass("is-open");
    }
  });
  window.addEventListener('keydown', function(e){
    if((e.key=='Escape'||e.key=='Esc'||e.keyCode==27) && (e.target.nodeName=='BODY')){
      $(".popup-overlay, .popup-content").fadeIn('slow').removeClass("active");
      $("body").fadeIn('slow').removeClass("is-open");
    }
  }, true);

  /* Indeterminate */
  $('.bd-example-indeterminate [type="checkbox"]').prop("indeterminate", true);

  /* custom scrollbar */
  $(".sidebar").mCustomScrollbar({
    theme: "minimal-dark",
    setTop: -100,
    scrollInertia: 150,
  });
  /* sidebar scroll to active link on page load */
  const activeLink = document.querySelector('.sidebar_nav li a.active');
  if(activeLink !== null){
    const activeLinkOffset = activeLink.offsetTop;
    document.querySelector('.mCSB_container').style.top = activeLinkOffset+'px';
  }




  /* Active Composer */
  const btnCompose = document.querySelector(".btn-compose");
  const btnAddLabel = document.querySelector(".btn-add-label");
  const mailComposer = document.querySelector(".atbd-mailCompose");
  const lebelForm = document.querySelector(".add-lebel-from");
  const closeCompose = document.querySelector(".compose-close");
  const closelabel = document.querySelector(".label-close");

  function showBox(e) {
    e.preventDefault();
    if (this.dataset.trigger == "label") lebelForm.classList.add("show");
    else if (this.dataset.trigger == "compose")
      mailComposer.classList.add("show");

    if ($(e.target).hasClass("label-close")) lebelForm.classList.remove("show");
  }

  function removeBox(e) {
    e.preventDefault();
    if (this.dataset.trigger == "label") lebelForm.classList.remove("show");
    else if (this.dataset.trigger == "compose")
      mailComposer.classList.remove("show");
  }

  if (btnCompose !== null && closeCompose !== null) {
    btnCompose.addEventListener("click", showBox);
    btnAddLabel.addEventListener("click", showBox);
  }

  if (closeCompose !== null && closelabel !== null) {
    closeCompose.addEventListener("click", removeBox);
    closelabel.addEventListener("click", removeBox);
  }

  let start = moment().subtract(6, "days");
  let end = moment();
  $('input[name="date-ranger"]').daterangepicker({
    singleDatePicker: false,
    startDate: start,
    endDate: end,
    autoUpdateInput: false,
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  });

  /* Custom Input Number */
  function customQuantity() {
    jQuery(
      '<div class="pt_QuantityNav"><div class="pt_QuantityButton pt_QuantityUp"><i class="las la-angle-up"></i></div><div class="pt_QuantityButton pt_QuantityDown"><i class="las la-angle-down"></i></div></div>'
    ).insertAfter(".pt_Quantity input");
    jQuery(".pt_Quantity").each(function () {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find(".pt_QuantityUp"),
        btnDown = spinner.find(".pt_QuantityDown"),
        min = input.attr("min"),
        max = input.attr("max"),
        valOfAmout = input.val(),
        newVal = 0;

      btnUp.on("click", function () {
        var oldValue = parseFloat(input.val());

        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
      btnDown.on("click", function () {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
    });
  }
  customQuantity();

  $(".line").peity("line", {
    fill: false,
    height: 100,
    width: 400,
  });

  $(".area-line").peity("line", {
    height: 100,
    width: 400,
  });

  /* Active Tooltip */
  $('[data-toggle="tooltip"]').tooltip();

  /* Modal reload active */
  $(".createModal #new-member").modal("show");

  $(".breadcrumb-modal3 #add-contact").modal("show");

  /* Sidebar Change */
  const layoutChangeBtns = document.querySelectorAll("[data-layout]");

  function changeLayout(e) {
    e.preventDefault();
    if (this.dataset.layout === "light") {
      $('ul.l_sidebar li a,.l_sidebar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("layout-dark");
      $("body").addClass("layout-light");
    } else if (this.dataset.layout === "dark") {
      $('ul.l_sidebar li a,.l_sidebar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("layout-light");
      $("body").addClass("layout-dark");
    } else if (this.dataset.layout === "side") {
      $('ul.l_navbar li a,.l_navbar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("top-menu");
      $("body").addClass("side-menu");
    } else if (this.dataset.layout === "top") {
      $('ul.l_navbar li a,.l_navbar a').removeClass('active');
      $(this).addClass("active");
      $("body").removeClass("side-menu");
      $("body").addClass("top-menu");
    }
  }


  if (layoutChangeBtns) {
    layoutChangeBtns.forEach((layoutChangeBtn) =>
      layoutChangeBtn.addEventListener("click", changeLayout)
    );
    layoutChangeBtns.forEach((layoutChangeBtn) =>
      layoutChangeBtn.addEventListener("click", closeCustomizer)
    );
  }

  /* Customizer */
  const customizerBtn = document.querySelector(".customizer-trigger");
  const customizer = document.querySelector(".customizer-wrapper");
  const customizerClose = document.querySelector(".customizer-close");
  const customizerOverlay = document.querySelector(".customizer-overlay");

  function toggleCustomizer(e) {
    e.preventDefault();
    this.classList.toggle("show");
    customizer.classList.toggle("show");
    $('.customizer-overlay').addClass('show');
  }

  function closeCustomizer(e) {
    e.preventDefault();
    customizer.classList.remove("show");
    customizerBtn.classList.remove("show");
    customizerOverlay.classList.remove("show");
  }

  if (customizerBtn) {
    customizerBtn.addEventListener("click", toggleCustomizer);
  }

  if (customizerClose && customizerOverlay) {
    customizerClose.addEventListener("click", closeCustomizer);
    customizerOverlay.addEventListener("click", closeCustomizer);
  }

  $('.search-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.search-form-topMenu').toggleClass('show')
  })

  // Date Picker
  $(".date-picker__calendar").datepicker();


  //sales progress
  $(".sales-target__progress-bar").each(function () {
    var bar = $(this).find(".bar");
    var val = $(this).find("span");
    var per = parseInt(val.text(), 10);
    var $right = $('.right');
    var $back = $('.back');

    $({
      p: 0
    }).animate({
      p: per
    }, {
      duration: 3000,
      step: function (p) {
        bar.css({
          transform: "rotate(" + (45 + (p * 1.8)) + "deg)"
        });
        val.text(p | 0);
      }
    }).delay(200);

    if (per == 100) {
      $back.delay(2600).animate({
        'top': '18px'
      }, 200);
    }
    if (per == 0) {
      $('.left').css('background', 'gray');
    }
  });


  // Testimonial Slider1
  $('.testimonial-slider1').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 30,
    // centerPadding: '60px',
    centerPadding: 0,
    // Add FontAwesome Class
    prevArrow: '<div class="slider-arrow slider-prev las la-arrow-left"></div>',
    nextArrow: '<div class="slider-arrow slider-next las la-arrow-right"></div>',
    responsive: [{
        breakpoint: 1499,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.testimonial-slider2').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: '<div class="slider-arrow slider-prev las la-arrow-left"></div>',
    nextArrow: '<div class="slider-arrow slider-next las la-arrow-right"></div>',
    responsive: [{
        breakpoint: 1499,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.testimonial-slider3-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: true,
    asNavFor: '.testimonial-slider3-nav',
    arrows: false
  });
  $('.testimonial-slider3-nav').slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    asNavFor: '.testimonial-slider3-for',
    lazyLoad: 'progressive',
    // centerPadding: '30%',
    swipe: true,
    focusOnSelect: true,
    cssEase: 'linear',
    touchMove: true,
    arrows: false,
    responsive: [{
        breakpoint: 1499,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('.testimonial-slider4').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<div class="slider-arrow slider-prev las la-arrow-left"></div>',
    nextArrow: '<div class="slider-arrow slider-next las la-arrow-right"></div>',
  });


  function compareDates(startDate, endDate, format) {
    var temp, dateStart, dateEnd;
    try {
      dateStart = $.datepicker.parseDate(format, startDate);
      dateEnd = $.datepicker.parseDate(format, endDate);
      if (dateEnd < dateStart) {
        temp = startDate;
        startDate = endDate;
        endDate = temp;
      }
    } catch (ex) {}
    return { start: startDate, end: endDate };
  }

  $.fn.dateRangePicker = function (options) {
    options = $.extend({
      "changeMonth": false,
      "changeYear": false,
      "numberOfMonths": 2,
      "rangeSeparator": " - ",
      "useHiddenAltFields": false
    }, options || {});

    var myDateRangeTarget = $(this);
    var onSelect = options.onSelect || $.noop;
    var onClose = options.onClose || $.noop;
    var beforeShow = options.beforeShow || $.noop;
    var beforeShowDay = options.beforeShowDay;
    var lastDateRange;

    function storePreviousDateRange(dateText, dateFormat) {
      var start, end;
      dateText = dateText.split(options.rangeSeparator);
      if (dateText.length > 0) {
        start = $.datepicker.parseDate(dateFormat, dateText[0]);
        if (dateText.length > 1) {
          end = $.datepicker.parseDate(dateFormat, dateText[1]);
        }
        lastDateRange = {start: start, end: end};
      } else {
        lastDateRange = null;
      }
    }

    options.beforeShow = function(input, inst) {
      var dateFormat = myDateRangeTarget.datepicker("option", "dateFormat");
      storePreviousDateRange($(input).val(), dateFormat);
      beforeShow.apply(myDateRangeTarget, arguments);
    };

    options.beforeShowDay = function(date) {
      var out = [true, ""], extraOut;
      if (lastDateRange && lastDateRange.start <= date) {
        if (lastDateRange.end && date <= lastDateRange.end) {
          out[1] = "ui-datepicker-range";
        }
      }

      if (beforeShowDay) {
        extraOut = beforeShowDay.apply(myDateRangeTarget, arguments);
        out[0] = out[0] && extraOut[0];
        out[1] = out[1] + " " + extraOut[1];
        out[2] = extraOut[2];
      }
      return out;
    };

    options.onSelect = function(dateText, inst) {
      var textStart;
      if (!inst.rangeStart) {
        inst.inline = true;
        inst.rangeStart = dateText;
      } else {
        inst.inline = false;
        textStart = inst.rangeStart;
        if (textStart !== dateText) {
          var dateFormat = myDateRangeTarget.datepicker("option", "dateFormat");
          var dateRange = compareDates(textStart, dateText, dateFormat);
          myDateRangeTarget.val(dateRange.start + options.rangeSeparator + dateRange.end);
          inst.rangeStart = null;
          if (options.useHiddenAltFields){
            var myToField = myDateRangeTarget.attr("data-to-field");
            var myFromField = myDateRangeTarget.attr("data-from-field");
            $("#"+myFromField).val(dateRange.start);
            $("#"+myToField).val(dateRange.end);
          }
        }
      }
      onSelect.apply(myDateRangeTarget, arguments);
    };

    options.onClose = function(dateText, inst) {
      inst.rangeStart = null;
      inst.inline = false;
      onClose.apply(myDateRangeTarget, arguments);
    };

    return this.each(function() {
      if (myDateRangeTarget.is("input")) {
        myDateRangeTarget.datepicker(options);
      }
      myDateRangeTarget.wrap("<div class=\"dateRangeWrapper\"></div>");
    });
  };

  $(document).ready(function(){
    $("#txtDateRange").dateRangePicker({
      showOn: "focus",
      rangeSeparator: " - ",
      dateFormat: "dd/mm/yy",
      useHiddenAltFields: true,
      constrainInput: true
    });
  });



})(jQuery);