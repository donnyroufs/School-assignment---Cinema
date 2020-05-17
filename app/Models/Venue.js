"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Venue extends Model {
  halls() {
    return this.hasMany("App/Models/Hall");
  }

  movies() {
    return this.belongsToMany("App/Models/Movie")
      .pivotTable("schedule_movies")
      .withPivot(["starts_at"]);
  }
}

module.exports = Venue;
