(function ($) {
    
    // Contrtolled Checkbox Component

    let checked = true;
    let disabled = false;

    $('.btn-checkToggle').on('click', function(e){
        
        $(this).parent().parent().find('.checkbox').prop("checked", !checked);

        checked = !checked;

        if(!checked){
            $(this).text("check")
        }else{
            $(this).text("Unchecke")
        }
        
    });

    $('.btn-activeToggle').on('click', function(e){

        $(this).parent().parent().find('.custom-checkbox').toggleClass('disabled');
        disabled = !disabled;

        if(!disabled){
            $(this).text("Disable")
        }else{
            $(this).text("Enable")
        }
        
    });

    // Check ALl Component

    let clicked = false;

    $('.check-all label').on('click', function(e){

        $('.checkbox-group-wrapper').find('.checkbox').prop("checked", !clicked);
        
        clicked = !clicked;
        
    });

})(jQuery);