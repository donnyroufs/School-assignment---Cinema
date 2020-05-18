"use strict";

const Reservation = use("App/Models/Reservation");
const Database = use("Database");

class ReservationController {
  async index({ params, response, view }) {
    return view.render("tickets");
  }
  async getById({ params, response }) {
    const { id } = params;

    const data = await Database.raw(
      `
          select
              r.schedule_movie_id as schedule_id,
              halls.seat_count,
              halls.name,
              array_agg(r.seat_number::integer) as seats
          from reservations r
          inner join schedule_movies on r.schedule_movie_id = schedule_movies.id
          inner join halls on schedule_movies.hall_id = halls.id
          where r.schedule_movie_id = ?
          group by
              r.schedule_movie_id,
              schedule_movies.id,
              halls.id
    `,
      [id]
    );

    return response.send(data.rows[0]);
  }

  async orderTickets({ auth, params, request, response }) {
    const { schedule_id, seats, total_price, movie_title } = request.all();
    const arrSeats = seats.split(",");
    let tickets = [];
    await Database.transaction(async (trx) => {
      for (let seat of arrSeats) {
        const uniqueTicketNumber = (Date.now() * Math.random())
          .toString()
          .substring(0, 8);
        tickets.push(uniqueTicketNumber);
        await trx
          .insert({
            schedule_movie_id: schedule_id,
            seat_number: seat,
            ticket_number: uniqueTicketNumber,
            user_id: auth.user.id,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .into("reservations");
      }
    });

    return response.redirect(
      `/order/tickets?numbers=${JSON.stringify(
        tickets
      )}&movieTitle=${movie_title}`
    );
  }
  async useTicket({ request, response, view }) {
    return view.render("useticket");
  }

  async scan({ request, response, session }) {
    const { ticket } = request.all();
    try {
      const _ticket = await Reservation.findBy("ticket_number", ticket);
      if (_ticket && _ticket.scanned) {
        session.flash({ notFound: "Ticket has already been scanned." });
      } else if (_ticket && !_ticket.scanned) {
        _ticket.scanned = true;
        await _ticket.save();
        session.flash({ scanned: "Ticket has been scanned!" });
      } else if (!ticket) {
        session.flash({ notFound: "Input field is empty." });
      } else {
        session.flash({ notFound: "Could not find ticket." });
      }
    } catch (err) {
      session.flash({ notFound: "Something went wrong.." });
    }

    return response.redirect("back");
  }
}

module.exports = ReservationController;
