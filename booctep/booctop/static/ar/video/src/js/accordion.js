const accordionComponent = () => ({
  _onShow (e) {
    if ($(e.target).hasClass('accordion__menu')) {
      $(e.target).closest('.accordion__item').addClass('open')
    }
  },
  _onHide (e) {
    if ($(e.target).hasClass('accordion__menu')) {
      $(e.target).closest('.accordion__item').removeClass('open')
    }
  },
  init () {
    $(this.element).on('show.bs.collapse', this._onShow)
    $(this.element).on('hide.bs.collapse', this._onHide)
  },
  destroy () {
    $(this.element).off('show.bs.collapse', this._onShow)
    $(this.element).off('hide.bs.collapse', this._onHide)
  }
})

domFactory.handler.register('accordion', accordionComponent)