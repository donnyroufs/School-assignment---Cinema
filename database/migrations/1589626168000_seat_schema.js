"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SeatSchema extends Schema {
  up() {
    this.alter("seats", (table) => {
      table
        .integer("hall_id")
        .unsigned()
        .references("id")
        .inTable("halls")
        .onDelete("cascade");
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
