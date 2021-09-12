import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { sortByDate, sortByPrice, sortByDuration } from '../utils/event-utils.js';
import { filter } from '../utils/filter-utils.js';
import { SortType, UpdateType, UserAction, FilterType } from '../utils/constants.js';

export default class EventBoard {
  constructor(boardContainer, infoContainer, eventsModel, filterModel) {
    this._boardContainer = boardContainer;
    this._infoContainer = infoContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._eventPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;

    this._noEventComponent = null;
    this._infoComponent = null;
    this._sortComponent = null;

    this._eventListComponent = new EventListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventListComponent, this._handleViewAction);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderEventBoard();
  }

  destroy() {
    this._clearEventBoard({resetSortType: true});

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init();
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[this._filterType](events);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredEvents.sort(sortByDate);
      case SortType.TIME:
        return filtredEvents.sort(sortByDuration);
      case SortType.PRICE:
        return filtredEvents.sort(sortByPrice);
    }
    return filtredEvents;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (при добавлении точки в избранное)
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearEventBoard({resetSortType: true});
        this._renderEventBoard();
        // - обновить список без изменения инфо, сбросить сортировку (при филльтрации)
        break;
      case UpdateType.MAJOR:
        this._clearEventBoard({resetInfo: true});
        this._renderEventBoard();
        // - обновить список и инфо, не сбрасывать сортировку (при добавлении/удалении/изменении)
        break;
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearEventBoard();
    this._renderEventBoard();
  }

  _renderNoEvents() {
    this._noEventComponent = new NoEventView(this._filterType);
    render(this._boardContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    if (this._infoComponent === null) {
      this._infoComponent = new InfoView(this._getEvents());
    }

    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent === null) {
      this._sortComponent = new SortView();
    }

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEventList() {
    render(this._boardContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderEventBoard() {
    if (this._eventsModel.getEvents().length) {
      this._renderInfo();
    }

    if (!this._getEvents().length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }

  _clearEventBoard({resetSortType = false, resetInfo = false} = {}) {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    if (!this._getEvents().length) {
      resetSortType = true;
    }

    if (resetSortType) {
      remove(this._sortComponent);
      this._currentSortType = SortType.DAY;
    }

    if (this._noEventComponent) {
      remove(this._noEventComponent);
    }

    if (resetInfo) {
      remove(this._infoComponent);
      this._infoComponent = null;
    }

    remove(this._eventListComponent);
  }
}
