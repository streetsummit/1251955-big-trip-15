import InfoView from '../view/trip-info.js';
import SortView from '../view/trip-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import EventPresenter from './event.js';
import { render, RenderPosition } from '../utils/render.js';
import { sortByDate, sortByPrice, sortByDuration } from '../utils/task-utils.js';
import { SortType } from '../utils/constants.js';

export default class EventBoard {
  constructor(boardContainer, infoContainer, eventsModel) {
    this._boardContainer = boardContainer;
    this._infoContainer = infoContainer;
    this._eventsModel = eventsModel;
    this._noEventComponent = new NoEventView();
    this._infoComponent = new InfoView();
    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView();
    this._eventPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderEventBoard();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._eventsModel.getEvents().slice().sort(sortByDate);
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortByDuration);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortByPrice);
    }
    return this._eventsModel.getEvents();
  }

  _handleEventChange(updatedEvent) {
    // здесь будем вызывать обновление модели
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEventList();
    this._renderEvents(this._getEvents());
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange,this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _renderEventList() {
    render(this._boardContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEventBoard() {
    if (!this._getEvents().length) {
      this._renderNoEvents();
      return;
    }
    this._renderInfo();
    this._renderSort();
    this._renderEventList();
    this._renderEvents(this._getEvents());
  }
}
