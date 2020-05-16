"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MovieSchema extends Schema {
  up() {
    this.create("movies", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("thumbnail").notNullable();
      table.text("description").notNullable();
      table.integer("price").notNullable();
      table.date("release_date");
      table.integer("duration");
    });
  }

  down() {
    this.drop("movies");
  }
}

module.exports = MovieSchema;
