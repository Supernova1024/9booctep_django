const playerComponent = () => ({
  listeners: [
    'button.play(click)'
  ],

  get button () {
    return this.element.querySelector('.player__content')
  },

  play (e) {
    e.preventDefault()
    this.element.querySelector('.player__embed').classList.remove('d-none')
    this.element.querySelector('.player__embed iframe').src += "&autoplay=1"
  }
})

domFactory.handler.register('player', playerComponent)