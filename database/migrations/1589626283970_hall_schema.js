"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HallSchema extends Schema {
  up() {
    this.alter("halls", (table) => {
      // alter table
      table
        .integer("venue_id")
        .unsigned()
        .references("id")
        .inTable("venues")
        .onDelete("cascade");
    });
  }

  down() {
    this.table("halls", (table) => {
      // reverse alternations
    });
  }
}

module.exports = HallSchema;
