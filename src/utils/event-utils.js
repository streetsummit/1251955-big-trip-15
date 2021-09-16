import dayjs from 'dayjs';
const MIN_IN_DAY = 1440;
const MIN_IN_HOUR = 60;

export const getDuration = (end, start) => dayjs(end).diff(dayjs(start), 'm');

export const sortByDate = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

export const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

export const sortByDuration = (eventA, eventB) => getDuration(eventB.dateTo, eventB.dateFrom) - getDuration(eventA.dateTo, eventA.dateFrom);

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

export const getCountByType = (events, type) => events.filter((event) => event.type === type).length;

export const getSumByType = (events, type) => {
  const filteredEvents = events.filter((event) => event.type === type);
  const totalSum = filteredEvents.reduce((acc, event) => acc + event.price, 0);
  return totalSum;
};

export const getDurationByType = (events, type) => {
  const filteredEvents = events.filter((event) => event.type === type);
  const totalDuration = filteredEvents.reduce((acc, event) => acc + (getDuration(event.dateTo, event.dateFrom)), 0);
  return totalDuration;
};
