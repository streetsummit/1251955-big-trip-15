import { getRandomInteger, getRandomArrayElement, getRandomLengthArray } from '../utils.js';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'London'];

const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateDestination = () => ({
  description: getRandomLengthArray(SENTENCES, 1, 5),
  name: getRandomArrayElement(CITIES),
  pictures: new Array(getRandomInteger(1, 5)).fill(null).map(() => ({
    src: `http://picsum.photos/300/200?r=${Math.random()}`,
    description: getRandomArrayElement(SENTENCES),
  })),
});

const generateEvent = () => ({
  dateFrom: '2019-03-19T11:20',
  dateTo: '2019-03-19T13:00',
  type: getRandomArrayElement(TYPES),
  destination: generateDestination(),
  price: getRandomInteger(0, 250),
  offers: [],
  isFavorite: Boolean(getRandomInteger(0, 1)),
});

export { generateEvent };
