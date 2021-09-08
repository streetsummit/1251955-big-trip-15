import dayjs from 'dayjs';
import { FilterType } from './constants.js';

const isDatePast = (date) => dayjs(date).isBefore(dayjs());
const isDateFuture = (date) => dayjs().isBefore(dayjs(date));

const isEventPast = (event) => isDatePast(event.dateTo);
const isEventFuture = (event) => isDateFuture(event.dateFrom);
const isEventCurrent = (event) => isDatePast(event.dateFrom) && isDateFuture(event.dateTo);

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event) || isEventCurrent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event) || isEventCurrent(event)),
};
