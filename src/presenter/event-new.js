import EditEventView from '../view/event-edit.js';
import { makeId, isEscEvent } from '../utils/common.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/constants.js';

export default class EventNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._editEventComponent = null;

    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._editEventComponent !== null) {
      return;
    }

    this._editEventComponent = new EditEventView();
    this._editEventComponent.setSaveClickHandler(this._handleSaveClick);
    this._editEventComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._editEventComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._editEventComponent === null) {
      return;
    }

    remove(this._editEventComponent);
    this._editEventComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleSaveClick(event) {
    this._changeData(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      Object.assign({id: makeId(6)}, event),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
