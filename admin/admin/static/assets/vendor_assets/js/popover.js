(function ($) {
    const popover = `
    <div class="popover">
        <div class="popover-content">
            <div class="popover-title">
                <i class="las la-exclamation-circle color-warning"></i>
                <span class="title-text">Are you sure delete this task ?</span>
            </div>
            <div class="popover-action d-flex justify-content-end">
                <a href="#" class="btn btn-xs btn-light btn-outlined">No</a>
                <a href="#" class="btn btn-xs btn-info">Yes</a>
            </div>
        </div>
    </div>
    `
    $('.btn-popover').popover({
        trigger: 'click',
        template: popover,
        html: true,
        // trigger: 'focus',
        container: 'body'
    });

    $('.btn-placement').popover({
        trigger: 'click',
        template: popover,
        html: true,
        trigger: 'focus',
        container: '.popover-placement'
    });
    
    const placementBtns = document.querySelectorAll('.btn-placement');
    const placementBlock = document.querySelector('.popover-placement');
    function setPosition(){
        let position = this.dataset.indicate;
        if(this.dataset.indicate == "left"){
            placementBlock.classList.add('left');
            placementBlock.classList.remove('right');
            placementBlock.classList.remove('top');
            placementBlock.classList.remove('bottom');
        }else if(this.dataset.indicate == "right"){
            placementBlock.classList.add('right');
            placementBlock.classList.remove('left');
            placementBlock.classList.remove('top');
            placementBlock.classList.remove('bottom');
        }else if(this.dataset.indicate == "top"){
            placementBlock.classList.add('top');
            placementBlock.classList.remove('left');
            placementBlock.classList.remove('right');
            placementBlock.classList.remove('bottom');
        }else if(this.dataset.indicate == "bottom"){
            placementBlock.classList.add('bottom');
            placementBlock.classList.remove('left');
            placementBlock.classList.remove('top');
            placementBlock.classList.remove('right');
        }else{
            placementBlock.classList.remove('bottom');
            placementBlock.classList.remove('left');
            placementBlock.classList.remove('top');
            placementBlock.classList.remove('right');
        }
    }

    placementBtns.forEach(placementBtn => placementBtn.addEventListener('click',setPosition));
    

})(jQuery);