import { createMenuTemplate } from './view/menu.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMenuElement, createMenuTemplate(), 'beforeend');
