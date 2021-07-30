import { createMenuTemplate } from './view/menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripFilterTemplate } from './view/filter.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createEventListTemplate } from './view/event-list.js';
import { createEventTemplate } from './view/event.js';
import { createNewEventFormTemplate } from './view/new-event-form.js';
import { createEditEventFormTemplate } from './view/edit-event-form.js';

const EVENTS_COUNT = 3;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const events = new Array(EVENTS_COUNT).fill(null).map(() => createEventTemplate());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMenuElement, createMenuTemplate(), 'beforeend');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(tripFilterElement, createTripFilterTemplate(), 'beforeend');
render(tripEventsElement, createTripSortTemplate(), 'beforeend');
render(tripEventsElement, createEventListTemplate(createEditEventFormTemplate(), ...events, createNewEventFormTemplate()), 'beforeend');
