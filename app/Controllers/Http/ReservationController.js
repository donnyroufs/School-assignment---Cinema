"use strict";

const Reservation = use("App/Models/Reservation");
const Database = use("Database");

class ReservationController {
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
    const { schedule_id, seats, total_price } = request.all();
    console.log(seats);
    const arrSeats = seats.split(",");
    await Database.transaction(async (trx) => {
      for (let seat of arrSeats) {
        await trx
          .insert({
            schedule_movie_id: schedule_id,
            seat_number: seat,
            user_id: auth.user.id,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .into("reservations");
      }
    });
    // return response.redirect("/");
    return response.route("/", { price: total_price });
  }
}

module.exports = ReservationController;
