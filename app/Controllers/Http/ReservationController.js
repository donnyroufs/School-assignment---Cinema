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

    console.log(tickets);
    // return response.redirect("/");
    return response.redirect(
      `/order/tickets?numbers=${JSON.stringify(
        tickets
      )}&movieTitle=${movie_title}`
    );
  }
}

module.exports = ReservationController;
