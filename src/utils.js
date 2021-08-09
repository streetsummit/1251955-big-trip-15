export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const getRandomLengthArray = (array, min = 0, max = array.length) => {
  const dataArray = array.slice();
  const randomLengthArray = [];
  const randomLength = getRandomInteger(min, max);
  for (let i = 0; i < randomLength; i++) {
    const position = getRandomInteger(0, dataArray.length - 1);
    const element = dataArray.splice(position, 1)[0];
    randomLengthArray.push(element);
  }
  return randomLengthArray;
};

export const makeId= (idLength) => {
  let id = '';
  for (let i = 0; i < idLength; i++) {
    id += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
  }
  return id;
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
