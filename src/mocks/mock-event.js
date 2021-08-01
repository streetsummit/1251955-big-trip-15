import { getRandomInteger } from '../utils.js';

const generateEvent = () => ({
  dateFrom: '2019-03-19T11:20',
  dateTo: '2019-03-19T13:00',
  type: 'Taxi',
  destination: 'Chamonix',
  price: getRandomInteger(0, 250),
  offers: [],
  isFavorite: Boolean(getRandomInteger(0, 1)),
});

export { generateEvent };
