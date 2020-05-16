"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HallSchema extends Schema {
  up() {
    this.create("halls", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.integer("seat_count").notNullable();
    });
  }

  down() {
    this.drop("halls");
  }
}

module.exports = HallSchema;
