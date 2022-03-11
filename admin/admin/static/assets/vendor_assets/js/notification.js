const toastButtons = document.querySelectorAll('.btn-toast');
  let toastCount = 0;
  function createToast(type,icon,close){
    let toast = ``;
    
    console.log(icon)
    const notificationShocase = $('.notification-wrapper');
    if(type == "default"){
      toast = `
      <div class="atbd-notification-box notification-${type} notification-${toastCount}">
        <div class="atbd-notification-box__content">
            <div class="atbd-notification-box__text">
                <h6>Notification Title</h6>
                <p>
                    This is the content of the notification. This is the content of the notification. This is the content of the notification.
                </p>
            </div>
        </div>
        <a href="#" class="atbd-notification-box__close" data-toast="close">
            <span data-feather="x"></span>
        </a>
      </div>
      `;
    }else if(type !== "default"){
      toast = `
      <div class="atbd-notification-box notification-${type} notification-${toastCount}">
        <div class="atbd-notification-box__content media">
            <div class="atbd-notification-box__icon">
                <span data-feather="${icon}"></span>
            </div>
            <div class="atbd-notification-box__text media-body">
                <h6>Notification Title</h6>
                <p>
                    This is the content of the notification. This is the content of the notification. This is the content of the notification.
                </p>
            </div>
        </div>
        <a href="#" class="atbd-notification-box__close" data-toast="close">
            <span data-feather="x"></span>
        </a>
    </div>
    `;
    }

    if(close){
        toast =`
        <div class="atbd-notification-box notification-${type} notification-${toastCount}">
            <div class="atbd-notification-box__content">
                <div class="atbd-notification-box__text">
                    <h6>Notification Title</h6>
                    <p>
                        This is the content of the notification. This is the content of the notification. This is the content of the notification.
                    </p>
                </div>
                <div class="atbd-notification-box__action d-flex justify-content-end">
                    <button href="#" class="btn btn-xs btn-info custom-close" data-toast="close">confirm</button>
                </div>
            </div>
            <a href="#" class="atbd-notification-box__close" data-toast="close">
                <span data-feather="x"></span>
            </a>
        </div>
        `
    }
    
    notificationShocase.append(toast);
    toastCount++;
  }
  function showNotification(e){
    e.preventDefault();
    
    let duration = (optionValue, defaultValue) =>
      typeof optionValue === "undefined" ? defaultValue : optionValue;

    dureation = this.dataset.toastduration;
    
    let toastType = this.dataset.toasttype;
    let toastIcon = this.dataset.toasticon;
    let customClose = this.dataset.customclose;
    createToast(toastType,toastIcon,customClose);
    feather.replace();
    let thisToast = toastCount - 1;

    $('*[data-toast]').on('click',function(){
        $(this).parent('.atbd-notification-box').remove();
    })

    setTimeout(function(){
      $(document).find(".notification-"+thisToast).remove();
    },duration(this.dataset.duration,3000));

  }

  toastButtons.forEach(toastButton => toastButton.addEventListener('click',showNotification));

//   Notification Placements

const placementSelect = document.getElementById('noti-placement')
const notificationWrapper = document.querySelector('.notification-wrapper');
if(placementSelect){
    placementSelect.onchange = function(){
        let selectElement = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
        var selectValue = selectElement.value || selectElement.options[selectElement.selectedIndex].value;
        switch (selectValue) {
            case "tl":  
                notificationWrapper.classList.add('top-left');
                notificationWrapper.classList.remove('top-right');
                notificationWrapper.classList.remove('bottom-left');
                notificationWrapper.classList.remove('bottom-right');
                break;
            
            case "tr": 
                notificationWrapper.classList.remove('top-right');
                notificationWrapper.classList.add('top-right');
                notificationWrapper.classList.remove('bottom-left');
                notificationWrapper.classList.remove('bottom-right');
                break;
            
            case "bl": 
                notificationWrapper.classList.remove('bottom-left');
                notificationWrapper.classList.remove('top-right');
                notificationWrapper.classList.add('bottom-left');
                notificationWrapper.classList.remove('bottom-right');
                break;
    
            case "br": 
                notificationWrapper.classList.remove('bottom-right');
                notificationWrapper.classList.remove('top-right');
                notificationWrapper.classList.remove('bottom-left');
                notificationWrapper.classList.add('bottom-right');
                break;
            
            default: break;
        }
    }
}
