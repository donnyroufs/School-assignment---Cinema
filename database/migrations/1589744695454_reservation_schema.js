"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ReservationSchema extends Schema {
  up() {
    this.alter("reservations", (table) => {
      table.integer("ticket_number").notNullable().unique();
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
