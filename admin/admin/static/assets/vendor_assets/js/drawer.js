(function ($) {

    // Drawer Trigger
    const drawerTriggers = document.querySelectorAll('.drawer-trigger');
    const drawerBasic = document.querySelector('.drawer-basic-wrap');
    const overlay = document.querySelector('.overlay-dark');
    const draweClosebtns = document.querySelectorAll('.btdrawer-close');

    const drawerMultilevel = document.querySelector('.drawer-multiLevel');

    const areaDrawer = document.querySelector('.area-drawer');
    const areaOverlay = document.querySelector('.area-overlay');

    function openDrawer(e){
    e.preventDefault();
    if(this.dataset.drawer == 'basic'){
        drawerBasic.classList.remove('account');
        drawerBasic.classList.remove('profile');
        drawerBasic.classList.add('basic');
        drawerBasic.classList.add('show');
        overlay.classList.add('show');
    }else if(this.dataset.drawer == 'area'){
        areaDrawer.classList.add('show');
        areaOverlay.classList.add('show');
    }else if(this.dataset.drawer == 'account'){
        drawerBasic.classList.remove('basic');
        drawerBasic.classList.remove('profile');
        drawerBasic.classList.add('account');
        drawerBasic.classList.add('show');
        overlay.classList.add('show');
    }else if(this.dataset.drawer == 'profile'){
        drawerBasic.classList.remove('basic');
        drawerBasic.classList.remove('account');
        drawerBasic.classList.add('profile');
        drawerBasic.classList.add('show');
        overlay.classList.add('show');
    }
    }

    function hideDrawer(){
    drawerBasic.classList.remove('show');
    overlay.classList.remove('show');

    areaDrawer.classList.remove('show');
    areaOverlay.classList.remove('show');

    drawerMultilevel.classList.remove('show')
    }

    if(drawerTriggers){
    drawerTriggers.forEach(drawerTrigger => drawerTrigger.addEventListener('click',openDrawer));
    }
    if(overlay){
    overlay.addEventListener('click', hideDrawer);
    }
    if(draweClosebtns){
    draweClosebtns.forEach(draweClosebtn => draweClosebtn.addEventListener('click',hideDrawer));
    }
    if(areaOverlay){
    areaOverlay.addEventListener('click', hideDrawer);
    }

    // Drawer Placement
    let placementRadios = document.getElementsByName('radio-placement');

    function setPlacementRadio(){
    for (var i = 0; i < placementRadios.length; i++) {
    if (placementRadios[i].checked) {
        if(placementRadios[i].value == "top"){
        drawerBasic.classList.add('top');
        drawerBasic.classList.remove('right');
        drawerBasic.classList.remove('bottom');
        drawerBasic.classList.remove('left');
        }else if(placementRadios[i].value == "left"){
        drawerBasic.classList.add('left');
        drawerBasic.classList.remove('right');
        drawerBasic.classList.remove('bottom');
        drawerBasic.classList.remove('top');
        }else if(placementRadios[i].value == "bottom"){
        drawerBasic.classList.add('bottom');
        drawerBasic.classList.remove('right');
        drawerBasic.classList.remove('left');
        drawerBasic.classList.remove('top');
        }else if(placementRadios[i].value == "right"){
        drawerBasic.classList.add('right');
        drawerBasic.classList.remove('left');
        drawerBasic.classList.remove('bottom');
        drawerBasic.classList.remove('top');
        }

        break;
    }
    }
    }
    if(placementRadios){
    placementRadios.forEach(placementRadio => placementRadio.addEventListener('change',setPlacementRadio));
    }

    const multiTriggers = document.querySelectorAll('.drawer-multiTrigger');
    const overlayLevelTwo = document.querySelector('.overlay-dark-l2');

    function showMultiDrawer(){
    if(this.dataset.drawer == 'level-one'){
    drawerMultilevel.classList.add('level-one');
    drawerMultilevel.classList.add('show');
    drawerMultilevel.classList.remove('level-two');
    overlay.classList.add('show');
    }else if(this.dataset.drawer == 'level-two'){
    drawerMultilevel.classList.add('level-two');
    overlayLevelTwo.classList.add('show');
    drawerMultilevel.classList.add('show');
    }
    }

    function hideMultiLavel(){
    drawerMultilevel.classList.remove('level-two');
    overlayLevelTwo.classList.remove('show');
    }

    if(overlayLevelTwo){
    overlayLevelTwo.addEventListener('click', hideMultiLavel);
    }
    if(multiTriggers){
    multiTriggers.forEach(multiTrigger => multiTrigger.addEventListener('click',showMultiDrawer));
    }

})(jQuery);