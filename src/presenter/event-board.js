import InfoView from '../view/trip-info.js';
import SortView from '../view/trip-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import { render, RenderPosition } from '../utils/render.js';
import EventPresenter from './event.js';

export default class EventBoard {
  constructor(boardContainer, infoContainer) {
    this._boardContainer = boardContainer;
    this._infoContainer = infoContainer;
    this._noEventComponent = new NoEventView();
    this._infoComponent = new InfoView();
    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView();
    this._eventPresenter = new Map();
  }

  init(events) {
    this._events = events.slice();
    this._renderEventBoard();
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents() {
    this._events
      .slice()
      .forEach((el) => this._renderEvent(el));
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _renderEventList() {
    render(this._boardContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEventBoard() {
    if (!this._events.length) {
      this._renderNoEvents();
      return;
    }
    this._renderInfo();
    this._renderSort();
    this._renderEventList();
    this._renderEvents();
  }
}
