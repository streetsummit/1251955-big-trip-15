import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { UserAction, UpdateType } from '../utils/constants.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class Event {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editEventComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleShowFormButtonClick = this._handleShowFormButtonClick.bind(this);
    this._handleHideFormButtonClick = this._handleHideFormButtonClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEditEventComponent = this._editEventComponent;

    this._eventComponent = new EventView(event);
    this._editEventComponent = new EditEventView(event);

    this._eventComponent.setEditClickHandler(this._handleShowFormButtonClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editEventComponent.setEditClickHandler(this._handleHideFormButtonClick);
    this._editEventComponent.setSaveClickHandler(this._handleSaveClick);
    this._editEventComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editEventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._editEventComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._editEventComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._editEventComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._editEventComponent.setStartPicker();
    this._editEventComponent.setEndPicker();
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._editEventComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleShowFormButtonClick() {
    this._replaceCardToForm();
  }

  _handleHideFormButtonClick() {
    this._editEventComponent.reset(this._event);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite,
        },
      ),
    );
  }

  _handleSaveClick(event) {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MAJOR,
      event,
    );
    this._replaceFormToCard();
  }

  _handleDeleteClick(event) {
    this._changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MAJOR,
      event,
    );
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }
}
