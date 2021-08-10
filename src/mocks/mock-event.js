import { TYPES, getRandomInteger, getRandomArrayElement, getRandomLengthArray } from '../utils.js';
import dayjs from 'dayjs';

const MAX_PICTURES_COUNT = 5;
const MAX_EVENT_PRICE = 250;
const MAX_MINUTES_GAP = 2 * 24 * 60;
const MIN_EVENT_DURATION = 10;
const MAX_DESCRIPTION_LENGTH = 5;
const MAX_OPTIONS_COUNT = 5;
const EVENTS_COUNT = 20;

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

const OPTIONS = [
  {
    title: 'Order Uber',
    price: 20,
  },
  {
    title: 'Add luggage',
    price: 50,
  },
  {
    title: 'Rent a car',
    price: 200,
  },
  {
    title: 'Add breakfast',
    price: 50,
  },
  {
    title: 'Book tickets',
    price: 40,
  },
  {
    title: 'Switch to comfort',
    price: 80,
  },
  {
    title: 'Lunch in city',
    price: 30,
  },
];

const getDate = (from, gap) => dayjs(from).add(gap, 'minute');

const getMockDestinations = () => CITIES.map((name) => ({
  description: getRandomLengthArray(SENTENCES, 0, MAX_DESCRIPTION_LENGTH).join(' '),
  name,
  pictures: new Array(getRandomInteger(0, MAX_PICTURES_COUNT)).fill(null).map(() => ({
    src: `http://picsum.photos/300/200?r=${Math.random()}`,
    description: getRandomArrayElement(SENTENCES),
  })),
}));

const getMockOffers = () => TYPES.map((type) => ({
  type,
  offers: getRandomLengthArray(OPTIONS, 0, MAX_OPTIONS_COUNT),
}));

const getAvailableOffers = (eventType) => (getMockOffers().find((el) => el.type === eventType)).offers;

const getMockEvent = () => {
  const dateFrom = getDate(dayjs(), getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP));
  const dateTo = getDate(dateFrom, getRandomInteger(MIN_EVENT_DURATION, MAX_MINUTES_GAP));
  const type = getRandomArrayElement(TYPES);
  const destination = getRandomArrayElement(getMockDestinations());
  const offers = getRandomLengthArray(getAvailableOffers(type));

  return {
    dateFrom: dateFrom.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    dateTo: dateTo.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    type,
    destination,
    price: getRandomInteger(0, MAX_EVENT_PRICE),
    offers,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

const getMockEvents = () => new Array(EVENTS_COUNT)
  .fill(null)
  .map(getMockEvent)
  .sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));

export { getMockEvents, getMockDestinations, getAvailableOffers };
