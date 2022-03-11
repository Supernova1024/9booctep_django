// document ready //



$(document).ready(function(){
  
    //toggle class function to move the sidebar box and change color//
    
      $(".js-sidebar-box").click(function(){
         $(".js-sidebar-box").toggleClass("js-move-right");
      });
  
    //show and hide functions, div shows by default//
    
      $(".button-show").click(function(){
        setTimeout(function(){ 
            $(".target-div").show();
         }, 3000)
      });
    
      $(".button-hide").click(function(){
        setTimeout(function(){ 
            $(".target-div").hide();
         }, 3000)
      });

  });