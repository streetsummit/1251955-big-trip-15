import { generateEvent } from './mocks/mock-event.js';
import { render, RenderPosition } from './utils.js';
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
const renderEvent = (list, item) => {
  const eventElement = new EventView(item).getElement();
  render(list, eventElement, RenderPosition.BEFOREEND);

};
render(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(tripFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();
render(tripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderEvent(eventListComponent.getElement(), events[i]);
}

