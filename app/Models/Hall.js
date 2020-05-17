"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Hall extends Model {
  venue() {
    return this.belongsTo("App/Models/Venue");
  }
}

module.exports = Hall;
