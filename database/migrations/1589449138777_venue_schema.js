"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class VenueSchema extends Schema {
  up() {
    this.create("venues", (table) => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("venues");
  }
}

module.exports = VenueSchema;
