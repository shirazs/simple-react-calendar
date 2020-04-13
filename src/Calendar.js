import React, {useState, useCallback} from 'react';
import {
  getWeekdays,
  getShortMonthName,
  getDaysInWeeksInMonth,
} from './getDaysInWeeksInMonth';

/* Styles */
const dayStyle = {
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'block',
  fontSize: 14,
  height: 30,
  lineHeight: '30px',
  width: 30,
  transition: 'background-color .2s ease-out',
};

const selectedDayStyle = {
  color: 'white',
  backgroundColor: '#000',
};

const selectedTodayStyle = {
  color: 'white',
  backgroundColor: '#ff3b30',
};

const todayStyle = {
  color: '#ff3b30',
};

const gotoToday = {
  color: '#ff3b30',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: 14,
  paddingTop: '1rem',
  paddingBottom: '1rem',
};

const today = new Date();

const initialState = {
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDate(),
};

const Calendar = ({debug = false}) => {
  const [selectedDate, setDate] = useState({
    ...initialState,
  });

  const previousMonth = () => {
    setDate(({year, month}) => ({
      year: month > 0 ? year : year - 1,
      month: month > 0 ? month - 1 : 11,
      day: month === today.getMonth() ? today.getDate() : 1,
    }));
  };

  const nextMonth = () => {
    setDate(({year, month}) => ({
      year: month === 11 ? year + 1 : year,
      month: month === 11 ? 0 : month + 1,
      day: month === today.getMonth() ? today.getDate() : 1,
    }));
  };

  const selectDay = ({target}) => {
    const {day, month, year} = target.dataset;

    setDate({
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });
  };

  const setToday = () => {
    selectDay.call(null, {
      target: {
        dataset: {
          ...initialState,
        },
      },
    });
  };

  return (
    <table
      role="grid"
      style={{
        backgroundColor: '#fefcfc',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        width: 400,
        margin: 'auto',
      }}>
      <caption
        style={{
          color: 'rgb(255, 59, 48)',
          padding: '1rem 1.5rem 1.35rem',
          fontWeight: 'bold',
          userSelect: 'none',
        }}>
        <span
          onClick={previousMonth}
          style={{
            display: 'inline-block',
            float: 'left',
            cursor: 'pointer',
          }}>
          ❮
        </span>
        <span>{`${getShortMonthName(selectedDate.month)} ${
          selectedDate.year
        }`}</span>
        <span
          onClick={nextMonth}
          style={{
            display: 'inline-block',
            float: 'right',
            cursor: 'pointer',
          }}>
          ❯
        </span>
      </caption>

      <thead
        style={{
          borderBottom: '1px solid #e1e1e1',
        }}>
        <tr>
          {getWeekdays().map((d, i) => {
            const isWeekend = i > 4;
            const weekendStyle = {
              color: '#a4a4a4',
            };

            return (
              <th
                key={d}
                scope="col"
                role="columnheader"
                aria-label={d}
                style={{
                  fontSize: 10,
                  paddingBottom: 5,
                  ...(isWeekend ? weekendStyle : {}),
                }}>
                {d.charAt(0)}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {getDaysInWeeksInMonth(selectedDate.year, selectedDate.month).map(
          (w, i) => (
            <tr
              key={`week_${i}`}
              style={{
                borderBottom: '1px solid #e1e1e1',
              }}>
              {w.map((d, i) => {
                const date = new Date();
                const isToday =
                  d === date.getDate() &&
                  selectedDate.month === date.getMonth();
                const isSelectedDay = d === selectedDate.day;
                const isWeekend = i > 4;
                const weekendStyle = {
                  color: '#a4a4a4',
                };

                return (
                  <td
                    key={`day_${i}`}
                    style={{
                      padding: '.5rem 1rem 2rem',
                      position: 'relative',
                    }}>
                    <span
                      onClick={selectDay}
                      data-day={d}
                      data-month={selectedDate.month}
                      data-year={selectedDate.year}
                      style={{
                        ...dayStyle,
                        ...(isWeekend ? weekendStyle : {}),
                        ...(isToday && isSelectedDay
                          ? selectedTodayStyle
                          : isSelectedDay
                          ? selectedDayStyle
                          : isToday && !isSelectedDay
                          ? todayStyle
                          : null),
                      }}>
                      {!!d && d}
                    </span>
                  </td>
                );
              })}
            </tr>
          )
        )}
      </tbody>

      <tfoot>
        <tr>
          <td style={gotoToday} onClick={setToday}>
            Today
          </td>
        </tr>

        {debug && (
          <tr>
            <td>
              <pre>
                {JSON.stringify(
                  getDaysInWeeksInMonth(selectedDate.year, selectedDate.month),
                  null,
                  8
                )}
                {console.log(
                  getDaysInWeeksInMonth(selectedDate.year, selectedDate.month),
                  null,
                  8
                )}
              </pre>
            </td>
          </tr>
        )}
      </tfoot>
    </table>
  );
};

export {Calendar};
