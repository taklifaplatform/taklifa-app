import moment from 'moment';
import { DaysForLocaleProps, YearsForLocaleProps } from './types';

export function daysForLocale(params?: Pick<DaysForLocaleProps, 'localeName'>) {
  const { localeName = 'en' } = params || {};
  const format = new Intl.DateTimeFormat(localeName, { day: '2-digit' }).format;
  return Array.from(Array(31).keys()).map((day) => {
    return {
      id: format(new Date(Date.UTC(2021, 0, day + 1))),
      name: format(new Date(Date.UTC(2021, 0, day + 1))),
    };
  });
}

export function monthsForLocale(params?: DaysForLocaleProps) {
  const { localeName = 'en', format = 'MMMM' } = params || {};
  return moment.months().map((month, index) => {
    return {
      id: index + 1,
      name: moment().locale(localeName).month(index).format(format),
    };
  });
}

export function yearsForLocale(params?: YearsForLocaleProps) {
  const currentYear = new Date().getFullYear();
  const { startYear, duration = 100 } = params || {};
  const startWith = startYear || currentYear;
  return Array.from(Array(duration).keys()).map((day) => {
    return {
      id: startWith - day,
      name: `${startWith - day}`,
    };
  });
}
