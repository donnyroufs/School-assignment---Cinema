"use strict";

/*
|--------------------------------------------------------------------------
| VenueSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");

class VenueSeeder {
  static async run() {
    await Database.table("venues").insert([
      { id: 1, name: "Maastricht" },
      { id: 2, name: "Heerlen" },
      { id: 3, name: "Sittard" },
    ]);
  }
}

module.exports = VenueSeeder;
