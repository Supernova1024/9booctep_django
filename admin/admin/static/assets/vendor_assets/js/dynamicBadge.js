(function ($) {

    $('.btn').on('click', function(e){
        
        let oldCount = $(this).parent().parent().find('.badge').text();
        let newCount = 0;
        if($(this).hasClass('btn-inc')){
            newCount = parseFloat(oldCount) + 1;
            $(this).parent().parent().find('.badge').css("display","inline-flex");
        }else if($(this).hasClass('btn-dec')){

            // Preventing To allow Negative value 
            if(oldCount > 0){
               newCount = parseFloat(oldCount) - 1; 
                if(newCount == 0){
                    $(this).parent().parent().find('.badge').css("display","none");
                }
                
            }else{
                newCount = 0;
                
            }
            
        }
        
        $(this).parent().parent().find('.badge').text(newCount);
    });

    $("#switch-dynamic-badge").on('click', function(e){

        if($(this).is(':checked')){
            $(this).parent().parent().find('.badge-dot-wrap').css("display","inline-flex");
        }else{
            $(this).parent().parent().find('.badge-dot-wrap').css("display","none");
        }

    });

})(jQuery);