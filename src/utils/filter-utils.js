import { FilterType } from './constants.js';
import { isDatePast, isDateFuture } from './event-utils.js';

export const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => isDateFuture(task.dateFrom)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => isDatePast(task.dateTo)),
};
