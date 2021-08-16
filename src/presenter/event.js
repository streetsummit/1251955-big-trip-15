import EventView from '../view/event.js';
import EditEventView from '../view/event-edit.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';


export default class Event {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventComponent = null;
    this._editEventComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleShowFormButtonClick = this._handleShowFormButtonClick.bind(this);
    this._handleHideFormButtonClick = this._handleHideFormButtonClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new EventView(event);
    this._editEventComponent = new EditEventView(event);

    this._eventComponent.setEditClickHandler(this._handleShowFormButtonClick);
    this._editEventComponent.setEditClickHandler(this._handleHideFormButtonClick);
    this._editEventComponent.setSaveClickHandler(this._handleSaveClick);
    render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._editEventComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._editEventComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleShowFormButtonClick() {
    this._replaceCardToForm();
  }

  _handleHideFormButtonClick() {
    this._replaceFormToCard();
  }

  _handleSaveClick() {
    this._replaceFormToCard();
  }
}
