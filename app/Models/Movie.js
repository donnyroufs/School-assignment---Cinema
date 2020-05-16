"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Movie extends Model {
  // venues() {
  //   return this.belongsToMany("App/Models/Venue").pivotTable("movie_venue");
  // }
  static boot() {
    super.boot();
    this.addTrait("NoTimestamp");
  }

  venues() {
    return this.belongsToMany("App/Models/Venue").pivotTable("schedule_movies");
  }

  halls() {
    return this.belongsToMany("App/Models/Hall").pivotTable("schedule_movies");
  }
}

module.exports = Movie;
