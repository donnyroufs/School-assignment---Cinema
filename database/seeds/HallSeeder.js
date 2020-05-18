"use strict";

/*
|--------------------------------------------------------------------------
| HallSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Database = use("Database");

class HallSeeder {
  static async run() {
    await Database.table("halls").insert([
      { id: 1, name: "west", seat_count: 96, venue_id: 1 },
      { id: 2, name: "east", seat_count: 96, venue_id: 1 },
      { id: 3, name: "west", seat_count: 96, venue_id: 2 },
      { id: 4, name: "east", seat_count: 96, venue_id: 2 },
      { id: 5, name: "west", seat_count: 96, venue_id: 3 },
      { id: 6, name: "east", seat_count: 96, venue_id: 3 },
    ]);
  }
}

module.exports = HallSeeder;
