"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// const InvalidAccessException = use("App/Exceptions/InvalidAccessException");

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    const user = await auth.getUser();

    if (!user.admin) {
      return response.redirect("/");
    }
    // call next to advance the request
    await next();
  }
}

module.exports = Admin;
