import Controller from "chetsbull";
// import Controller from "../../../../../../chetsbull/dist/chetsbull.esm";
import Builders from "./Picker.builders";
import Templates from "./Picker.templates";
import _ from "lodash";
import { BASE_URL } from "./app";

const ENDPOINT = `http://localhost:3000/api/reservations/`;

const Picker = new Controller({
  scope: "#App",
  log: true,
  route: "/movie/order",
});

if (!Picker.status) {
  Picker.drink(({ view, state }) => {
    state.moviePrice = movie.price;

    view.dates.builder = Builders.date;
    view.dates.template = Templates.date;

    view.halls.builder = Builders.hall;
    view.halls.template = Templates.hall;

    view.availableSeats.builder = Builders.availableSeats;

    view.seats.builder = Builders.seat;
    view.seats.template = Templates.seat;

    view.selectedSeats.builder = Builders.selectedSeat;

    return {
      renderDates: ({ e, set }) => {
        const { value: selected } = e.target;
        // Reset all select elements on change
        set("dates", []);
        set("halls", []);
        view.status.style.display = "block";
        view.seats.classList = "picker__body picker__body--disabled";
        const data = schedule
          .filter((row) => row.venue_id === Number(selected))
          .map((row) => ({
            scheduleId: row.schedule_id,
            venueId: row.venue_id,
            date: row.starts_at,
            hallName: row.hall_name,
          }));

        const dates = _.uniqBy(data, "date");

        set("schedule", data);
        set("dates", dates);
      },
      renderHalls: ({ e, set }) => {
        view.status.style.display = "block";
        view.seats.classList = "picker__body picker__body--disabled";
        view.totalPrice.innerHTML = "€ 0,00";
        // resetView(view);
        set("halls", []);

        const halls = state.schedule.filter(
          (row) => row.date === e.target.value
        );
        set("halls", halls);
      },
      getAvailableSeats: ({ e, set }) => {
        const scheduleId = e.target.value;
        if (
          scheduleId == null ||
          scheduleId == "undefined" ||
          scheduleId <= 0
        ) {
          view.status.style.display = "block";
          view.seats.classList = "picker__body picker__body--disabled";
        } else {
          view.status.style.display = "none";
          view.seats.classList = "picker__body";
          // resetView(view);
          fetch(`${ENDPOINT}${scheduleId}`)
            .then((res) => res.json())
            .then((data) => {
              set("availableSeats", data.seat_count - data.seats.length);
              set("seats", data.seats);
              set("selectedSeats", 0);
              test(state, view);
            })
            .catch((err) => {
              set("seats", []);
              test(state, view);
              const result = schedule.find(
                (sched) => sched.schedule_id === Number(scheduleId)
              );

              if (result) {
                set("availableSeats", result.seat_count);
              } else {
                throw new Error(
                  "Couldn't get available seats for the current hall"
                );
              }
            });
        }
      },
      selectSeat: ({ e, set }) => {
        const classList = e.target.classList.value;
        const seatNumber = e.target.dataset.seat;

        // Clicked on seat
        if (
          seatNumber &&
          !view.seats.classList.value.includes("picker__body--disabled")
        ) {
          if (classList.includes("--reserved")) {
            return;
          } else if (classList.includes("--selected")) {
            set("selectedSeats", state.selectedSeats - 1);
            if (state.selectedSeats > 0) {
              view.orderBtn.classList.remove("button--disabled");
            } else {
              view.orderBtn.classList.add("button--disabled");
            }
            e.target.classList.remove("picker__seat--selected");
          } else {
            set("selectedSeats", state.selectedSeats + 1);
            if (state.selectedSeats > 0) {
              view.orderBtn.classList.remove("button--disabled");
            } else {
              view.orderBtn.classList.add("button--disabled");
            }
            e.target.classList.add("picker__seat--selected");
            set("order", getSelectedSeats(view));
          }
        }
      },
      buyTickets: ({ e }) => {
        if (e.target.classList.contains("button--disabled")) {
          return;
        }
        const _seats = getSelectedSeats(view).map((seat) => seat.dataset.seat);
        const data = {
          schedule_id: state.schedule[0].scheduleId,
          seats: _seats,
          total_price: _seats.length * state.moviePrice, // verify on server
        };

        view.formPrice.value = data.total_price;
        view.formSeats.value = data.seats;
        view.formSchedule.value = data.schedule_id;
        view.formTitle.value = movie.title;
        view.form.submit();
      },
    };
  });

  function getSelectedSeats(view) {
    const selectedSeats = Array.from(view.seats.children).filter((seat) => {
      return seat.classList.value === "picker__seat picker__seat--selected";
    });
    return selectedSeats;
  }

  function resetView(view) {
    Array.from(view.seats.children).forEach((seat) => {
      seat.classList.remove("picker__seat--selected");
      seat.classList.remove("picker__seat--reserved");
    });
  }

  // @TEMP FIX #2, builder doesn't get called after the first time.
  function test(state, view) {
    resetView(view);
    const seats = Array.from(view.seats.children);

    console.log(state.seats);
    state.seats.forEach((seat) =>
      seats[seat - 1].classList.add("picker__seat--reserved")
    );
  }
}

export default Picker;
