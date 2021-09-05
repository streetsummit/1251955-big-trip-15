import dayjs from 'dayjs';

export const sortByDate = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

export const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

export const sortByDuration = (eventA, eventB) => (dayjs(eventB.dateTo) - dayjs(eventB.dateFrom)) - (dayjs(eventA.dateTo) - dayjs(eventA.dateFrom));

export const getFullEventPrice = (event) => event.offers.reduce((sum, current) => sum + current.price, event.price);

export const getTripPrice = (events) => events.reduce(((sum, event) => sum + getFullEventPrice(event)), 0);

export const isDatePast = (date) => {
  const now = dayjs();
  dayjs(date) - now < 0;
};

export const isDateFuture = (date) => {
  const now = dayjs();
  dayjs(date) - now >= 0;
};
