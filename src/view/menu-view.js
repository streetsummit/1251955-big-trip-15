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

    this.setMenuItem(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-item="${menuItem}"]`);

    this.getElement()
      .querySelectorAll('.trip-tabs__btn')
      .forEach((btn) => {
        btn.classList.remove('trip-tabs__btn--active');
      });

    item.classList.add('trip-tabs__btn--active');
  }
}
