import { mockEvents } from './mocks/mock-event.js';
import { render, RenderPosition } from './utils/render.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import EventBoardPresenter from './presenter/event-board.js';
import EventsModel from './model/events-model.js';

const eventsModel = new EventsModel();
eventsModel.setEvents(mockEvents);

const siteHeaderContainer = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuContainer = siteHeaderContainer.querySelector('.trip-controls__navigation');
const infoContainer = siteHeaderContainer.querySelector('.trip-main');
const filtersContainer = siteHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = siteMainElement.querySelector('.trip-events');

const eventBoardPresenter = new EventBoardPresenter(eventsContainer, infoContainer, eventsModel);

render(siteMenuContainer, new MenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, new FilterView(), RenderPosition.BEFOREEND);

eventBoardPresenter.init();
