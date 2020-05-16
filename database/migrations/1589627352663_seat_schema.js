"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SeatSchema extends Schema {
  up() {
    this.table("seats", (table) => {
      this.drop("seats");
      // alter table
    });
  }

  down() {
    this.table("seats", (table) => {
      // reverse alternations
    });
  }
}

module.exports = SeatSchema;
