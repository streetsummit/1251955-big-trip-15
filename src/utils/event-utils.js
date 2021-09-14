import dayjs from 'dayjs';
const MIN_IN_DAY = 1440;
const MIN_IN_HOUR = 60;

export const sortByDate = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

export const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

export const sortByDuration = (eventA, eventB) => (dayjs(eventB.dateTo) - dayjs(eventB.dateFrom)) - (dayjs(eventA.dateTo) - dayjs(eventA.dateFrom));

export const getFullEventPrice = (event) => event.offers.reduce((sum, current) => sum + current.price, event.price);

export const getTripPrice = (events) => events.reduce(((sum, event) => sum + getFullEventPrice(event)), 0);

export const formatDuration = (duration) => {

  let days = Math.floor(duration / MIN_IN_DAY);
  let hours = Math.floor((duration - (days * MIN_IN_DAY)) / MIN_IN_HOUR);
  let minutes = duration - (days * MIN_IN_DAY) - (hours * MIN_IN_HOUR);

  days = days < 10 ? `0${days}` : days;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};
