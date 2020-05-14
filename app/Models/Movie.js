"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Movie extends Model {
  Venues() {
    return this.belongsToMany("App/Models/Venue");
  }
}

module.exports = Movie;
