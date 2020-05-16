"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ReservationSchema extends Schema {
  up() {
    this.create("reservations", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table
        .integer("schedule_movie_id")
        .unsigned()
        .references("id")
        .inTable("schedule_movies")
        .onDelete("cascade");
      table.integer("seat_number");
      table.unique(["schedule_movie_id", "seat_number"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("reservations");
  }
}

module.exports = ReservationSchema;
