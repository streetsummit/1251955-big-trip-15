import { renderTemplate, renderElement, RenderPosition } from './utils.js';
import MenuView from './view/menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripFilterTemplate } from './view/filter.js';
import TripSortView from './view/trip-sort.js';
import { createEventListTemplate } from './view/event-list.js';
import { createEventTemplate } from './view/event.js';
import { createEventEditTemplate } from './view/event-edit.js';
import { generateEvent } from './mocks/mock-event.js';

const EVENTS_COUNT = 20;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const events = new Array(EVENTS_COUNT).fill(null).map(generateEvent);
const eventElements = events.slice(1).map(createEventTemplate);

renderElement(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(tripMainElement, createTripInfoTemplate(), 'afterbegin');
renderTemplate(tripFilterElement, createTripFilterTemplate(), 'beforeend');
renderElement(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createEventListTemplate(createEventEditTemplate(events[0]), ...eventElements), 'beforeend');

console.log(events);
