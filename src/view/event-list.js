import { createElement } from '../utils.js';
const createEventListTemplate = (events) => (
  `<ul class="trip-events__list">
    ${events.map((event) => `<li class="trip-events__item">${event}</li>`).join('\n')}
  </ul>`
);

export default class EventList {
  constructor(...events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return createEventListTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
