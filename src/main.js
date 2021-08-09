import { generateEvent } from './mocks/mock-event.js';
import { renderElement, RenderPosition } from './utils.js';
import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import FilterView from './view/filter.js';
import TripSortView from './view/trip-sort.js';
import EventListView from './view/event-list.js';
import EventView from './view/event.js';
import EditEventView from './view/event-edit.js';


const EVENTS_COUNT = 20;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const events = new Array(EVENTS_COUNT).fill(null).map(generateEvent);
const eventTemplates = events.slice(1).map((el) => new EventView(el).getTemplate());
const editEventTemplate = new EditEventView((events[0])).getTemplate();

renderElement(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new EventListView(editEventTemplate, ...eventTemplates).getElement(), RenderPosition.BEFOREEND);

console.log(events);
