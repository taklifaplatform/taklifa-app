import { DaysForLocaleProps, YearsForLocaleProps } from "./types";

export function daysForLocale(params?: Pick<DaysForLocaleProps, "localeName">) {
  const { localeName = "en" } = params || {};
  const format = new Intl.DateTimeFormat(localeName, { day: "2-digit" }).format;
  return Array.from(Array(31).keys()).map((day) => {
    return {
      id: format(new Date(Date.UTC(2021, 0, day + 1))),
      name: format(new Date(Date.UTC(2021, 0, day + 1))),
    };
  });
}

export function monthsForLocale(params?: DaysForLocaleProps) {
  const { localeName = "en", month = "short" } = params || {};
  const format = new Intl.DateTimeFormat(localeName, { month }).format;
  const formatDigits =
    new Intl.DateTimeFormat(localeName, { month: "2-digit" }).format;
  return Array.from(Array(12).keys()).map((month) => {
    return {
      id: formatDigits(new Date(Date.UTC(2021, month, 1))),
      name: format(new Date(Date.UTC(2021, month, 1))),
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
