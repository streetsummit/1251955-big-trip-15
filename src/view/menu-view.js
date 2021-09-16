import AbstractView from './abstract-view.js';
import { MenuItem } from '../utils/constants.js';

const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a
      class="trip-tabs__btn trip-tabs__btn--active"
      href="#"
      data-menu-item="${MenuItem.TABLE}"
    >${MenuItem.TABLE}</a>
    <a
      class="trip-tabs__btn"
      href="#"
      data-menu-item="${MenuItem.STATS}"
      >${MenuItem.STATS}</a>
  </nav>`
);

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();

    if (!evt.target.classList.contains('trip-tabs__btn--active')) {
      this._callback.menuClick(evt.target.dataset.menuItem);
    }

    this.getElement()
      .querySelectorAll('.trip-tabs__btn')
      .forEach((item) => {
        item.classList.remove('trip-tabs__btn--active');
      });

    if (evt.target.classList.contains('trip-tabs__btn')) {
      evt.target.classList.add('trip-tabs__btn--active');
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
