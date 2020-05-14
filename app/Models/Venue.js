"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Venue extends Model {
  halls() {
    return this.hasMany("App/Models/Hall");
  }
}

module.exports = Venue;
