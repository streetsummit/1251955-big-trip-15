import { createElement } from '../utils.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const createEventDurationTemplate = (start, end) => {
  const eventDuration = dayjs(end) - dayjs(start);

  let days = dayjs.duration(eventDuration).days();
  days = days < 10 ? `0${days}` : days;
  let hours = dayjs.duration(eventDuration).hours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = dayjs.duration(eventDuration).minutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

const createEventOfferListTemplate = (offers) => (`
  <ul class="event__selected-offers">
    ${offers.map((offer) => (`
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `)).join('\n')}
  </ul>
`);

const createEventTemplate = (event) => {
  const {dateFrom, dateTo, type, destination, price, offers, isFavorite } = event;

  const durationTemplate = createEventDurationTemplate(dateFrom, dateTo);
  const offersTemplate = createEventOfferListTemplate(offers);
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn  event__favorite-btn--active'
    : 'event__favorite-btn';

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${durationTemplate}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${offersTemplate}
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Event {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
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
