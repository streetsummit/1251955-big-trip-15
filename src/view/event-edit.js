import { TYPES, makeId } from '../utils.js';
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

// Проблемы нейминга
const createOffersTemplate = (data, currentOffers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${data.map((it) => {
    const id = makeId(6);

    return (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}-1"
          type="checkbox"
          name="event-offer-${id}"
          ${currentOffers.some((element) => element.title === it.title) ? 'checked' : ''}
        >
        <label
          class="event__offer-label"
          for="event-offer-${id}-1"
        >
          <span class="event__offer-title">${it.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${it.price}</span>
        </label>
      </div>`
    );
  }).join('\n')}
    </div>
  </section>`
);

const createDestinationTemplate = (currentDestination) => {
  const {pictures = []} = currentDestination;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures.map((picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)).join('\n')}
      </div>
    </div>
  </section>`
  );
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

const createEventEditTemplate = (event) => {
  const { dateFrom, dateTo, type, destination, price, offers } = event;
  const { description, name, pictures } = destination;

  const typesTemplate = createEventEditTypesTemplate(type);
  const destinationSelectTemplate = createDestinationSelectTemplate(name);
  const availableOffers = getAvailableOffers(type);
  const offersTemplate = createOffersTemplate(availableOffers, offers);
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
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${ availableOffers.length ? offersTemplate : ''}

        ${description || pictures.length ? destinationTemplate : ''}
      </section>
    </form>
  </li>`;
};

export default class EditEvent extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }
}
