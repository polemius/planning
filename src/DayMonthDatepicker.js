import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { getMonth } from "date-fns";
registerLocale("ru", ru);

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const DOB_FORMAT = "dd MMMM";

const DayMonthDatepicker = (props) => {
  return (
    <DatePicker
      dateFormat={DOB_FORMAT}
      selected={props.value}
      placeholderText="День рождения"
      popperPlacement="right"
      renderCustomHeader={({
        date,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => {
        return (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        );
      }}
      locale="ru"
      name="dob"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "0px, 0px",
        },
      }}
      onChange={(date) => {
        if (date instanceof Date) {
          props.onChange(date);
        }
      }}
    />
  );
};

export default DayMonthDatepicker;
