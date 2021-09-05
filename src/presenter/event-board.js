import InfoView from '../view/trip-info.js';
import SortView from '../view/trip-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import EventPresenter from './event.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { sortByDate, sortByPrice, sortByDuration } from '../utils/task-utils.js';
import { SortType, UpdateType, UserAction } from '../utils/constants.js';

export default class EventBoard {
  constructor(boardContainer, infoContainer, eventsModel) {
    this._boardContainer = boardContainer;
    this._infoContainer = infoContainer;
    this._eventsModel = eventsModel;
    this._noEventComponent = new NoEventView();
    this._infoComponent = null;
    this._sortComponent = null;
    this._eventListComponent = new EventListView();
    this._eventPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
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
    if (!this._getEvents().length) {
      this._renderNoEvents();
      return;
    }
    this._renderInfo();
    this._renderSort();
    this._renderEventList();
  }

  _clearEventBoard({resetSortType = false, resetInfo = false} = {}) {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    if (resetSortType) {
      remove(this._sortComponent);
      this._currentSortType = SortType.DAY;
    }
    remove(this._noEventComponent);
    if (resetInfo) {
      remove(this._infoComponent);
      this._infoComponent = null;
    }


  }
}
