"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MovieVenueSchema extends Schema {
  up() {
    this.create("movie_venue", (table) => {
      table.increments();
      table
        .integer("venue_id")
        .unsigned()
        .references("id")
        .inTable("venues")
        .onDelete("cascade");
      table
        .integer("movie_id")
        .unsigned()
        .references("id")
        .inTable("movies")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("movie_venue");
  }
}

module.exports = MovieVenueSchema;
