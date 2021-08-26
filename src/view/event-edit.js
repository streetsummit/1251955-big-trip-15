import { TYPES } from '../utils/constants.js';
import { makeId } from '../utils/common.js';

import { getMockDestinations, getAvailableOffers } from '../mocks/mock-event.js';

import AbstractView from './abstract.js';

import dayjs from 'dayjs';

const createEventEditTypesTemplate = (currentType) => TYPES.map((type) => (`
  <div class="event__type-item">
    <input
      id="event-type-${type}-1"
      class="event__type-input  visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${currentType === type ? 'checked' : ''}
    >
    <label
      class="event__type-label event__type-label--${type}"
      for="event-type-${type}-1"
    >${type}</label>
  </div>
`)).join('\n');

const createDestinationSelectTemplate = (name) => (
  `<input
    class="event__input  event__input--destination"
    id="event-destination-1" type="text"
    name="event-destination"
    value="${name}"
    list="destination-list-1"
  >
  <datalist id="destination-list-1">
    ${getMockDestinations().map((element) => (`
      <option value="${element.name}"></option>
    `)).join('\n')}
  </datalist>`
);

const createOffersListTemplate = (availableOffers, currentOffers) => {
  let template = '';

  availableOffers.forEach((availableOffer) => {
    const id = makeId(6);
    template += `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}-1"
          type="checkbox"
          name="event-offer-${id}"
          data-title="${availableOffer.title}"
          ${currentOffers.some((currentOffer) => currentOffer.title === availableOffer.title) ? 'checked' : ''}
        >
        <label
          class="event__offer-label"
          for="event-offer-${id}-1"
        >
          <span class="event__offer-title">${availableOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${availableOffer.price}</span>
        </label>
      </div>`;
  });
  return template;
};

const createOffersTemplate = (availableOffers, currentOffers, hasAvailableOffers) => {
  if (hasAvailableOffers) {
    return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersListTemplate(availableOffers, currentOffers)}
      </div>
    </section>`;
  }
  return '';
};

const photosTemplate = (photos) => {
  if (photos.length) {
    return `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map((photo) => (`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)).join('\n')}
      </div>
    </div>`;
  }
  return '';
};

const createDestinationTemplate = (currentDestination) => {
  const { pictures, description } = currentDestination;
  if (description || pictures.length ) {
    return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${photosTemplate(pictures)}
    </section>`;
  }
  return '';
};

const BLANK_EVENT = {
  dateFrom: '2019-03-19T00:00:00.000Z',
  dateTo: '2019-03-19T00:00:00.000Z',
  type: 'flight',
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  price: '',
  offers: [],
};

const createEventEditTemplate = (data) => {
  const { dateFrom, dateTo, type, destination, price, offers, hasAvailableOffers } = data;

  const typesTemplate = createEventEditTypesTemplate(type);
  const destinationSelectTemplate = createDestinationSelectTemplate(destination.name);
  const availableOffers = getAvailableOffers(type);
  const offersTemplate = createOffersTemplate(availableOffers, offers, hasAvailableOffers);
  const destinationTemplate = createDestinationTemplate(destination);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          ${destinationSelectTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Close event</span>
        </button>
      </header>
      <section class="event__details">

        ${offersTemplate}

        ${destinationTemplate}
      </section>
    </form>
  </li>`;
};

export default class EditEvent extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EditEvent.parseEventToData(event);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._saveClickHandler = this._saveClickHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSaveClickHandler(this._callback.saveClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change',this._typeChangeHandler);

    if (this._data.hasAvailableOffers) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('change',this._offersChangeHandler);
    }

    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceInputHandler);
  }

  _offersChangeHandler(evt) {
    const checkedOffersElements = this.getElement()
      .querySelector('.event__available-offers')
      .querySelectorAll('input[type=checkbox]:checked');

    const checkedOffers = [];
    const availableOffers = getAvailableOffers(this._data.type);
    checkedOffersElements.forEach((element) => {
      const offerTitle = element.dataset.title;
      const checkedOffer = availableOffers.find((el) => el.title === offerTitle);
      checkedOffers.push(checkedOffer);
    });

    evt.preventDefault();
    this.updateData({
      offers: checkedOffers,
    }, true);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      hasAvailableOffers: Boolean(getAvailableOffers(evt.target.value).length),
      offers: [],
    });
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        hasAvailableOffers: Boolean(getAvailableOffers(event.type).length),
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    delete data.hasAvailableOffers;
    return data;
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick(EditEvent.parseDataToEvent(this._data));
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._saveClickHandler);
  }
}
