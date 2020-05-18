import { render } from "chetsbull";

const date = ({ state, view, template }) => {
  // @Temp fix #1
  view.availableSeats.innerHTML = 0;
  view.dates.innerHTML = "";
  const _ = template({ id: "0" });
  view.dates.append(_);
  // @Temp fix #2 - insert before or after
  render(view.dates, state, template, false);
};

const hall = ({ state, view, template }) => {
  view.halls.innerHTML = "";
  const _ = template({ id: "0" });
  view.halls.append(_);
  render(view.halls, state, template, false);
};

const availableSeats = ({ state, view, template }) => {
  view.availableSeats.innerHTML = state;
};

const seat = ({ state, view, template }) => {
  const seats = Array.from(view.seats.children);
  view.seats.classList = state
    ? "picker__body"
    : "picker__body picker__body--disabled";

  state.forEach((seat) =>
    seats[seat - 1].classList.add("picker__seat--reserved")
  );
};

const selectedSeat = ({ state, view, rootState }) => {
  const { moviePrice } = rootState;
  view.totalPrice.innerHTML = `€ ${(moviePrice * state).toFixed(2)}`;
  view.selectedSeats.innerHTML = state;
};

export default {
  date,
  hall,
  availableSeats,
  seat,
  selectedSeat,
};
