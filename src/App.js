import "./App.css";
import { useState } from "react";
import DayMonthDatepicker from "./DayMonthDatepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDate, getMonth, getYear } from "date-fns";

function sumNumber(number) {
  const n = String(number)
    .split("")
    .reduce((acc, value) => acc + Number(value), 0);
  if (n < 10) {
    return n;
  }

  return sumNumber(n);
}

function calculate(dob, date) {
  if (dob === undefined) {
    return { yearNumber: "", monthNumber: "", dayNumber: "" };
  }
  const dobDay = sumNumber(getDate(dob));
  const dobMonth = sumNumber(getMonth(dob) + 1);
  const year = sumNumber(getYear(date));

  const month = sumNumber(getMonth(date) + 1);
  const day = sumNumber(getDate(date));

  const yearNumber = sumNumber(dobDay + dobMonth + year);
  const monthNumber = sumNumber(yearNumber + month);
  const dayNumber = sumNumber(monthNumber + day);

  return { yearNumber, monthNumber, dayNumber };
}

function App() {
  const [dob, setDob] = useState();
  const [date, setDate] = useState(new Date());

  const numbers = calculate(dob, date);
  return (
    <div className="main">
      <header>Планирование по нумерологии</header>
      <div>
        <div className="container__calc">
          <div className="calc_dob">
            <label htmlFor="dob">День рождения:</label>
            <DayMonthDatepicker value={dob} onChange={setDob} />
          </div>

          <div className="date">
            <label htmlFor="date">Расчет на дату:</label>
            <DatePicker
              name="date"
              dateFormat={"dd-MM-yyyy"}
              selected={date}
              onChange={(d) => {
                if (d instanceof Date) {
                  setDate(d);
                }
              }}
            />
          </div>
          <div className="calculations">
            {numbers.yearNumber === "" && (
              <p className="error">Выберете дату рождения</p>
            )}
            <p className="number">Число года: {numbers.yearNumber}</p>
            <p className="number">Число месяца: {numbers.monthNumber}</p>
            <p className="number">Число дня: {numbers.dayNumber}</p>
          </div>
        </div>
      </div>
      <footer>
        <a className="link" href="https://drevs.me/tvp">
          2-Х месячное наставничество Владимира Древса
        </a>
        <a
          className="link"
          href="https://www.youtube.com/channel/UCtkGIcCp__7XGcSlzEOkbuA"
        >
          Youtube канал Владимира Древса
        </a>
      </footer>
    </div>
  );
}

export default App;
