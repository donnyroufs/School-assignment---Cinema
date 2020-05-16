"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ScheduleMovieSchema extends Schema {
  up() {
    this.create("schedule_movies", (table) => {
      table.increments();
      table.integer("movie_id");
      table.integer("venue_id");
      table.integer("hall_id");
      table.date("starts_at");
      table.unique(["movie_id", "venue_id", "hall_id", "starts_at"]);
    });
  }

  down() {
    this.drop("schedule_movies");
  }
}

module.exports = ScheduleMovieSchema;
