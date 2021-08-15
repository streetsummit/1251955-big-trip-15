import InfoView from '../view/trip-info.js';
import SortView from '../view/trip-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import EventView from '../view/event.js';
import EditEventView from '../view/event-edit.js';


export default class EventBoard {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._noEventComponent = new NoEventView();
    this._infoComponent = new InfoView();
    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView();
  }

  init(events) {
    this._events = events.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
  }

  _renderInfo() {
    // Метод для рендеринга инфо о путешествии (маршрут, даты, стоимость)
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderEvent() {
    // Метод для рендеринга события
  }

  _renderEventList() {
    // Метод для рендеринга списка событий
  }

  _renderEventBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderEventBoard в main.js
  }
}
