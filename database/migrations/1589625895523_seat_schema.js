"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SeatSchema extends Schema {
  up() {
    this.create("seats", (table) => {
      table.increments();
      table.integer("number");
    });
  }

  down() {
    this.drop("seats");
  }
}

module.exports = SeatSchema;
