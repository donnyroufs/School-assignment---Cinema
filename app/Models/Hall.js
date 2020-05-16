"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Hall extends Model {
  venue() {
    return this.belongsTo("App/Models/Venue");
  }

  schedule() {
    return this.hasMany("App/Model/ScheduleMovie");
  }
}

module.exports = Hall;
