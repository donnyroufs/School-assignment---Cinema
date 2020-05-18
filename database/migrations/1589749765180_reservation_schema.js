"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ReservationSchema extends Schema {
  up() {
    this.alter("reservations", (table) => {
      table.boolean("scanned").default("false");
      // alter table
    });
  }

  down() {
    this.table("reservations", (table) => {
      // reverse alternations
    });
  }
}

module.exports = ReservationSchema;
