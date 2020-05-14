"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Movie extends Model {
  venues() {
    return this.belongsToMany("App/Models/Venue").pivotTable("movie_venue");
  }
}

module.exports = Movie;
