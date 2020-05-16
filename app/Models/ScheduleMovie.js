"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ScheduleMovie extends Model {
  movies() {
    return this.belongsTo("App/Models/Movie");
  }

  halls() {
    return this.belongsTo("App/Models/Hall");
  }
}

module.exports = ScheduleMovie;
