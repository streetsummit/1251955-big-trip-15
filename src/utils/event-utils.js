import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const sortByDate = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

export const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

export const sortByDuration = (eventA, eventB) => (dayjs(eventB.dateTo) - dayjs(eventB.dateFrom)) - (dayjs(eventA.dateTo) - dayjs(eventA.dateFrom));

export const getFullEventPrice = (event) => event.offers.reduce((sum, current) => sum + current.price, event.price);

export const getTripPrice = (events) => events.reduce(((sum, event) => sum + getFullEventPrice(event)), 0);

export const formatDuration = (diff) => {
  let days = dayjs.duration(diff).days();
  days = days < 10 ? `0${days}` : days;

  let hours = dayjs.duration(diff).hours();
  hours = hours < 10 ? `0${hours}` : hours;

  let minutes = dayjs.duration(diff).minutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};
