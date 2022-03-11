(function ($) {

    $(".atbd-accordion").on("click",".atbd-collapse-item__header", function (e) {
        e.stopPropagation();
        $(this).next().collapse('show');
        $(this).parent().parent().find(".atbd-collapse-item__body").not($(this).next()).collapse('hide');
    });

    $(".atbd-collapse").on("click",".atbd-collapse-item__header", function (e) {
        $(this).toggleClass("active")
    });


})(jQuery);