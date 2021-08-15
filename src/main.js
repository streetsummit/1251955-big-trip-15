import { getMockEvents } from './mocks/mock-event.js';
import { render, RenderPosition, replace } from './utils/render.js';
import { isEscEvent } from './utils/common.js';
import MenuView from './view/menu.js';
// import InfoView from './view/trip-info.js';
import FilterView from './view/filter.js';
import SortView from './view/trip-sort.js';
import EventListView from './view/event-list.js';
import EventView from './view/event.js';
import EditEventView from './view/event-edit.js';
import NoEventView from './view/no-event.js';

const siteHeaderContainer = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuContainer = siteHeaderContainer.querySelector('.trip-controls__navigation');
// const infoContainer = siteHeaderContainer.querySelector('.trip-main');
const filtersContainer = siteHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = siteMainElement.querySelector('.trip-events');

const events = getMockEvents();

render(siteMenuContainer, new MenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, new FilterView(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();

const renderEventBoard = (container, data) => {
  if (!data.length) {
    render(container, new NoEventView(), RenderPosition.BEFOREEND);
    return;
  }
  // render(infoContainer, new InfoView(), RenderPosition.AFTERBEGIN);
  render(container, new SortView(), RenderPosition.BEFOREEND);
  render(container, eventListComponent, RenderPosition.BEFOREEND);
};

renderEventBoard(eventsContainer, events);

// Одновременно может быть открыта только одна форма создания/редактирования
const renderEvent = (list, item) => {
  const eventComponent = new EventView(item);
  const editEventComponent = new EditEventView(item);
  const replaceFormToCard = () => {
    replace(eventComponent, editEventComponent);
  };

  const replaceCardToForm = () => {
    replace(editEventComponent, eventComponent);
  };

  const onEditFormEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEditFormEscKeydown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEditFormEscKeydown);
  });

  editEventComponent.setEditClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEditFormEscKeydown);
  });

  editEventComponent.setSaveClickHandler(() => {
    // Сохранить изменения
    replaceFormToCard();
    document.removeEventListener('keydown', onEditFormEscKeydown);
  });

  render(list, eventComponent, RenderPosition.BEFOREEND);
};

for (let i = 0; i < events.length; i++) {
  renderEvent(eventListComponent, events[i]);
}

