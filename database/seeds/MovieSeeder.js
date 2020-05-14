"use strict";

/*
|--------------------------------------------------------------------------
| MovieSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");

class MovieSeeder {
  async run() {
    const movies = await Factory.model("App/Models/Movie").createMany(10);
    console.log(movies);
  }
}

module.exports = MovieSeeder;
