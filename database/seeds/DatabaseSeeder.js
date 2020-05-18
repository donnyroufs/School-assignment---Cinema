"use strict";

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const HallSeeder = require("./HallSeeder");
const VenueSeeder = require("./VenueSeeder");

class DatabaseSeeder {
  async run() {
    await VenueSeeder.run();
    await HallSeeder.run();
  }
}

module.exports = DatabaseSeeder;
