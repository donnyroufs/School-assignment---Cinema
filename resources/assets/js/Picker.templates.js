import { createElement } from "chetsbull";
import { formatDate } from "./helpers";

const date = ({ scheduleId: id, date }) => {
  const _date = createElement({
    element: "option",
    className: "input__option",
    id,
    content: date ? formatDate(new Date(date)) : "Select a date",
  });
  _date.value = date;
  return _date;
};

const hall = ({ hallName, scheduleId: id }) => {
  const _hall = createElement({
    element: "option",
    className: "input__option",
    id,
    content: hallName ? hallName : "Select a hall",
  });

  _hall.value = id;

  return _hall;
};

const seat = (state) => {
  const _seat = createElement({
    element: "div",
    className: "picker__seat",
  });
  return _seat;
};

export default {
  date,
  hall,
  seat,
};
