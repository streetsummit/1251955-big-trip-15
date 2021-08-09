import { getMockEvents } from './mocks/mock-event.js';
import { render, RenderPosition, isEscEvent } from './utils.js';
import MenuView from './view/menu.js';
// import TripInfoView from './view/trip-info.js';
import FilterView from './view/filter.js';
import TripSortView from './view/trip-sort.js';
import EventListView from './view/event-list.js';
import EventView from './view/event.js';
import EditEventView from './view/event-edit.js';
import NoEventView from './view/no-event.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
// const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const events = getMockEvents();

render(siteMenuElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(tripFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();

const renderEventBoard = (data) => {
  if (!data.length) {
    render(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  // render(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);
};

renderEventBoard(events);

// Одновременно может быть открыта только одна форма создания/редактирования
const renderEvent = (list, item) => {
  const eventElement = new EventView(item).getElement();
  const editEventElement = new EditEventView(item).getElement();
  const openEditFormElement = eventElement.querySelector('.event__rollup-btn');
  const closeEditFormElement = editEventElement.querySelector('.event__rollup-btn');
  const editFormElement = editEventElement.querySelector('form');

  const replaceFormToCard = () => {
    list.replaceChild(eventElement, editEventElement);
    document.removeEventListener('keydown', onEditFormEscKeydown);
  };

  const replaceCardToForm = () => {
    list.replaceChild(editEventElement, eventElement);
    document.addEventListener('keydown', onEditFormEscKeydown);
  };

  function onEditFormEscKeydown (evt) {
    if (isEscEvent(evt)) {
      replaceFormToCard();
    }
  }

  openEditFormElement.addEventListener('click', () => replaceCardToForm());
  closeEditFormElement.addEventListener('click', () => replaceFormToCard());
  editFormElement.addEventListener('submit', () => {
    // Сохранить изменения
    replaceFormToCard();
  });

  render(list, eventElement, RenderPosition.BEFOREEND);
};

for (let i = 0; i < events.length; i++) {
  renderEvent(eventListComponent.getElement(), events[i]);
}

