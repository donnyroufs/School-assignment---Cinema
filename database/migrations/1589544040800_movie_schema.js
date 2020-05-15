"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MovieSchema extends Schema {
  up() {
    this.alter("movies", (table) => {
      table.text("description").alter();
      // alter table
    });
  }

  down() {
    this.alter("movies", (table) => {
      // reverse alternations
    });
  }
}

module.exports = MovieSchema;
