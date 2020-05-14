"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Seat extends Model {
  Hall() {
    return this.belongsTo("App/Models/Hall");
  }
}

module.exports = Seat;
