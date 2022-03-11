const msgButtons = document.querySelectorAll('.btn-message');
  let messageCount = 0;
  function createMessage(type,icon,loading,duration){
    let message = ``;
    console.log(icon);
    const messageShowcase = $('.message-wrapper');
    if(!loading){
      message = `
        <div class="atbd-pop-message message-${type} message-${messageCount}">
            <span class="atbd-pop-message__icon">
                <i class="la la-${icon}"></i>
            </span>
            <span class="atbd-pop-message__text"><p>This is a ${type} Message</p></span>
        </div>
      `;
    }else{
      message = `
        <div class="atbd-pop-message message-${type} message-${messageCount}">
            <span class="atbd-pop-message__icon">
                <i class="la la-loader"></i>
            </span>
            <span class="atbd-pop-message__text"><p>This is a ${type} Message</p></span>
        </div>
    `;
    }
    if(duration){
        message = `
        <div class="atbd-pop-message message-${type} message-${messageCount}">
            <span class="atbd-pop-message__icon">
                <i class="la la-${icon}"></i>
            </span>
            <span class="atbd-pop-message__text"><p>This is a prompt message for success, and it will disappear in 10 seconds</p></span>
        </div>
    `;
    }
    
    messageShowcase.append(message);
    messageCount++;
  }
  function showMessage(e){
    e.preventDefault();
    let duration = (optionValue, defaultValue) =>
      typeof optionValue === "undefined" ? defaultValue : optionValue;

    dureation = this.dataset.messageduration;
    
    let messageType = this.dataset.messagetype;
    let messageIcon = this.dataset.messageicon;
    let messageLoading = this.dataset.messageLoading;
    createMessage(messageType,messageIcon,messageLoading,this.dataset.duration);
    feather.replace();
    let thismessage = messageCount - 1;

    setTimeout(function(){
      $(document).find(".message-"+thismessage).remove();
    },duration(this.dataset.duration,3000));

  }

  if(msgButtons){
    msgButtons.forEach(messageButton => messageButton.addEventListener('click',showMessage));
  }