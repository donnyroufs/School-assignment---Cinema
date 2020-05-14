"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HallSchema extends Schema {
  up() {
    this.create("halls", (table) => {
      table.increments();
      table.string("name").notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("halls");
  }
}

module.exports = HallSchema;
