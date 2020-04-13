/**
 * @file Forked from https://gist.github.com/shirazs/0c2e71347e3a256ff4b7f12766bb0700/
 * @author Shiraz <github:shirazs>
 * @description
 */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const getDayName = (date, locale = 'en') => {
  return date.toLocaleDateString(locale, {weekday: 'long'});
};

const getShortMonthName = month => {
  return MONTHS[month].substr(0, 3);
};

const getWeekdays = () => WEEKDAYS;

const getDaysInWeeksInMonth = (year, month) => {
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1);
  let startIndex = WEEKDAYS.findIndex(
    day => day === getDayName(firstDayOfMonth)
  );

  let dayCount = 1;
  const weeksInMonth = [];

  while (dayCount <= totalDaysInMonth) {
    const week = new Array(7).fill(null);

    for (; startIndex < 7; startIndex++) {
      week[startIndex] = dayCount;
      dayCount++;
      if (dayCount > totalDaysInMonth) break;
    }
    startIndex = 0;
    weeksInMonth.push(week);
  }

  return weeksInMonth;
};

export {getShortMonthName, getWeekdays, getDaysInWeeksInMonth};
