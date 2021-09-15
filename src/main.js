import { mockEvents } from './mocks/mock-event.js';
import { render, RenderPosition, remove } from './utils/render.js';
import MenuView from './view/menu-view.js';
import StatisticsView from './view/statistics-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventBoardPresenter from './presenter/event-board-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import { MenuItem } from './utils/constants.js';

const eventsModel = new EventsModel();
eventsModel.setEvents(mockEvents);

const filterModel = new FilterModel();

const siteHeaderContainer = document.querySelector('.page-header');
const boardContainer = document.querySelector('.board-container');
const siteMenuContainer = siteHeaderContainer.querySelector('.trip-controls__navigation');
const infoContainer = siteHeaderContainer.querySelector('.trip-main');
const filtersContainer = siteHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const menuComponent = new MenuView();

render(siteMenuContainer, menuComponent, RenderPosition.BEFOREEND);

const eventBoardPresenter = new EventBoardPresenter(eventsContainer, infoContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, eventsModel);

let statisticsComponent = null;
const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      eventBoardPresenter.destroy();
      eventBoardPresenter.init();
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      eventBoardPresenter.destroy();
      render(boardContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

filterPresenter.init();
eventBoardPresenter.init();

const handleEditFormClose = () => {
  newEventButton.disabled = false;
};

newEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (statisticsComponent) {
    remove(statisticsComponent);
    eventBoardPresenter.init();
  }

  evt.target.disabled = true;
  eventBoardPresenter.createEvent(handleEditFormClose);
});
