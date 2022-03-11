"use strict";

/*! signup.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Signup Process JS
========================================================================== */

$(document).ready(function () {
  "use strict";
  
   $('.progress-wrap .dot').on('click', function () {
    var $this = $(this);
    var stepValue = $this.attr('data-step');
    $this.closest('.progress-wrap').find('.bar').css('width', stepValue + '%');
    $this.siblings('.dot').removeClass('is-current');
    $this.addClass('is-active is-current');
    $this.prevAll('.dot').addClass('is-active');
    $this.nextAll('.dot').removeClass('is-active');
    $('.process-panel-wrap').removeClass('is-active');
    $('.step-title').removeClass('is-active');

    if (stepValue == '0') {
      $('#signup-panel-1, #step-title-1').addClass('is-active');
    } else if (stepValue == '1') {
      $('#signup-panel-2, #step-title-2').addClass('is-active');
    } else if (stepValue == '2') {
      $('#signup-panel-3, #step-title-3').addClass('is-active');
    } else if (stepValue == '3') {
      $('#signup-panel-4, #step-title-4').addClass('is-active');
    } else if (stepValue == '4') {
      $('#signup-panel-5, #step-title-5').addClass('is-active');
    } else if (stepValue == '5') {
      $('#signup-panel-6, #step-title-6').addClass('is-active');
    } else if (stepValue == '6') {
      $('#signup-panel-7, #step-title-7').addClass('is-active');
    } else if (stepValue == '7') {
      $('#signup-panel-8, #step-title-8').addClass('is-active');
    } else if (stepValue == '8') {
      $('#signup-panel-9, #step-title-9').addClass('is-active');
    } else if (stepValue == '9') {
      $('#signup-panel-10, #step-title-10').addClass('is-active');
    } else if (stepValue == '10') {
      $('#signup-panel-11, #step-title-11').addClass('is-active');
    } else if (stepValue == '11') {
      $('#signup-panel-12, #step-title-12').addClass('is-active');
    } else if (stepValue == '12') {
      $('#signup-panel-13, #step-title-13').addClass('is-active');
    } else if (stepValue == '13') {
      $('#signup-panel-14, #step-title-14').addClass('is-active');
    } else if (stepValue == '14') {
      $('#signup-panel-15, #step-title-15').addClass('is-active');
    } else if (stepValue == '15') {
      $('#signup-panel-16, #step-title-16').addClass('is-active');
    } else if (stepValue == '16') {
      $('#signup-panel-17, #step-title-17').addClass('is-active');
    } else if (stepValue == '17') {
      $('#signup-panel-18, #step-title-18').addClass('is-active');
    } else if (stepValue == '18') {
      $('#signup-panel-19, #step-title-19').addClass('is-active');
    } else if (stepValue == '19') {
      $('#signup-panel-20, #step-title-20').addClass('is-active');
    } else if (stepValue == '20') {
      $('#signup-panel-21, #step-title-21').addClass('is-active');
    } else if (stepValue == '21') {
      $('#signup-panel-22, #step-title-22').addClass('is-active');
    } else if (stepValue == '22') {
      $('#signup-panel-23, #step-title-23').addClass('is-active');
    } else if (stepValue == '23') {
      $('#signup-panel-24, #step-title-24').addClass('is-active');
    } else if (stepValue == '24') {
      $('#signup-panel-25, #step-title-25').addClass('is-active');
    } else if (stepValue == '25') {
      $('#signup-panel-26, #step-title-26').addClass('is-active');
    } else if (stepValue == '26') {
      $('#signup-panel-27, #step-title-27').addClass('is-active');
    } else if (stepValue == '27') {
      $('#signup-panel-28, #step-title-28').addClass('is-active');
    } else if (stepValue == '28') {
      $('#signup-panel-29, #step-title-29').addClass('is-active');
    } else if (stepValue == '29') {
      $('#signup-panel-30, #step-title-30').addClass('is-active');
    } else if (stepValue == '30') {
      $('#signup-panel-31, #step-title-31').addClass('is-active');
    } else if (stepValue == '31') {
      $('#signup-panel-32, #step-title-32').addClass('is-active');
    } else if (stepValue == '32') {
      $('#signup-panel-33, #step-title-33').addClass('is-active');
    } else if (stepValue == '33') {
      $('#signup-panel-34, #step-title-34').addClass('is-active');
    } else if (stepValue == '34') {
      $('#signup-panel-35, #step-title-35').addClass('is-active');
    } else if (stepValue == '35') {
      $('#signup-panel-36, #step-title-36').addClass('is-active');
    } else if (stepValue == '36') {
      $('#signup-panel-37, #step-title-37').addClass('is-active');
    } else if (stepValue == '37') {
      $('#signup-panel-38, #step-title-38').addClass('is-active');
    } else if (stepValue == '38') {
      $('#signup-panel-39, #step-title-39').addClass('is-active');
    } else if (stepValue == '39') {
      $('#signup-panel-40, #step-title-40').addClass('is-active');
    } else if (stepValue == '40') {
      $('#signup-panel-41, #step-title-41').addClass('is-active');
    } else if (stepValue == '41') {
      $('#signup-panel-42, #step-title-42').addClass('is-active');
    } else if (stepValue == '42') {
      $('#signup-panel-43, #step-title-43').addClass('is-active');
    } else if (stepValue == '43') {
      $('#signup-panel-44, #step-title-44').addClass('is-active');
    } else if (stepValue == '44') {
      $('#signup-panel-45, #step-title-45').addClass('is-active');
    } else if (stepValue == '45') {
      $('#signup-panel-46, #step-title-46').addClass('is-active');
    } else if (stepValue == '46') {
      $('#signup-panel-47, #step-title-47').addClass('is-active');
    } else if (stepValue == '47') {
      $('#signup-panel-48, #step-title-48').addClass('is-active');
    } else if (stepValue == '48') {
      $('#signup-panel-49, #step-title-49').addClass('is-active');
    } else if (stepValue == '49') {
      $('#signup-panel-50, #step-title-50').addClass('is-active');
    } else if (stepValue == '50') {
      $('#signup-panel-51, #step-title-51').addClass('is-active');
    } else if (stepValue == '51') {
      $('#signup-panel-52, #step-title-52').addClass('is-active');
    } else if (stepValue == '52') {
      $('#signup-panel-53, #step-title-53').addClass('is-active');
    } else if (stepValue == '53') {
      $('#signup-panel-54, #step-title-54').addClass('is-active');
    } else if (stepValue == '54') {
      $('#signup-panel-55, #step-title-55').addClass('is-active');
    } else if (stepValue == '55') {
      $('#signup-panel-56, #step-title-56').addClass('is-active');
    } else if (stepValue == '56') {
      $('#signup-panel-57, #step-title-57').addClass('is-active');
    } else if (stepValue == '57') {
      $('#signup-panel-58, #step-title-58').addClass('is-active');
    } else if (stepValue == '58') {
      $('#signup-panel-59, #step-title-59').addClass('is-active');
    } else if (stepValue == '59') {
      $('#signup-panel-60, #step-title-60').addClass('is-active');
    } else if (stepValue == '60') {
      $('#signup-panel-61, #step-title-61').addClass('is-active');
    } else if (stepValue == '61') {
      $('#signup-panel-62, #step-title-62').addClass('is-active');
    } else if (stepValue == '62') {
      $('#signup-panel-63, #step-title-63').addClass('is-active');
    } else if (stepValue == '63') {
      $('#signup-panel-64, #step-title-64').addClass('is-active');
    } else if (stepValue == '64') {
      $('#signup-panel-65, #step-title-65').addClass('is-active');
    } else if (stepValue == '65') {
      $('#signup-panel-66, #step-title-66').addClass('is-active');
    } else if (stepValue == '66') {
      $('#signup-panel-67, #step-title-67').addClass('is-active');
    } else if (stepValue == '67') {
      $('#signup-panel-68, #step-title-68').addClass('is-active');
    } else if (stepValue == '68') {
      $('#signup-panel-69, #step-title-69').addClass('is-active');
    } else if (stepValue == '69') {
      $('#signup-panel-70, #step-title-70').addClass('is-active');
    } else if (stepValue == '70') {
      $('#signup-panel-71, #step-title-71').addClass('is-active');
    } else if (stepValue == '71') {
      $('#signup-panel-72, #step-title-72').addClass('is-active');
    } else if (stepValue == '72') {
      $('#signup-panel-73, #step-title-73').addClass('is-active');
    } else if (stepValue == '73') {
      $('#signup-panel-74, #step-title-74').addClass('is-active');
    } else if (stepValue == '100') {
      $('#signup-panel-75, #step-title-75').addClass('is-active');
    } 
  });
  
  $('.process-button').bind('click', function () {
    var $this = $(this);
    var targetStepDot = $this.attr('data-step');
    $this.addClass('is-loading');
    setTimeout(function () {
      $this.removeClass('is-loading');
      $('#' + targetStepDot).trigger('click');
    }, 800); 
  });
 });