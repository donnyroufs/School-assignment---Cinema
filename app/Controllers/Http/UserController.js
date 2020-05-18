"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use("App/Models/User");

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return view.render("login");
  }

  async register({ view }) {
    return view.render("register");
  }

  /**
   * Render a form to be used for creating a new movie.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, auth, session }) {
    const { username, password } = request.all();

    const user = await User.create({
      username: username.toLowerCase(),
      password,
    });

    session.flash({
      loggedIn: `Welcome to Cinema, ${username}`,
    });
    await auth.login(user);
    return response.redirect("/");
  }

  async login({ request, auth, response, session }) {
    const { username, password } = request.all();
    try {
      const a = await auth.attempt(username.toLowerCase(), password);
      session.flash({ loggedIn: `You have logged in as ${username}` });
      return response.redirect("/");
    } catch (err) {
      session.flash({ loginError: "Username or password is not correct." });
      return response.redirect("back");
    }
  }

  async logout({ response, auth, session }) {
    await auth.logout();
    session.flash({ loggedOut: `You have been logged out` });
    return response.redirect("/");
  }
  /**
   * Create/save a new movie.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single movie.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing movie.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update movie details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a movie with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UserController;
