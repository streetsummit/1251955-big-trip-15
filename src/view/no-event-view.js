import AbstractView from './abstract-view.js';
import { FilterType } from '../utils/constants.js' ;

const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createNoEventTemplate = (filterType) => {
  const noEventTextValue = NoEventsTextType[filterType];
  return `<p class="trip-events__msg">
    ${noEventTextValue}
    </p>`;
};

export default class NoEvent extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoEventTemplate(this._data);
  }
}
