"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with movies
 */

const fakeImage = `https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`;
const Movie = use("App/Models/Movie");
const Venue = use("App/Models/Venue");
class MovieController {
  /**
   * Show a list of all movies.
   * GET movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const movies = await Movie.query().with("venues").fetch();
    const venues = await Venue.all();

    // const movie = await Movie.create({
    //   title: "Life is strange, sometimes.",
    //   thumbnail: fakeImage,
    //   description:
    //     "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    //   price: 14,
    //   release_date: new Date(),
    // });

    // const venue_id = 1;
    // await movie.venues().attach(venue_id);
    return view.render("index", {
      movies: movies.toJSON(),
      venues: venues.toJSON(),
    });
  }

  async order({ request, response, view }) {
    return view.render("order");
  }
  /**
   * Render a form to be used for creating a new movie.
   * GET movies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new movie.
   * POST movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single movie.
   * GET movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const movie = await Movie.query()
      .with("venues")
      .where("id", params.id)
      .first();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = movie.toJSON().release_date;

    return view.render("movie", {
      movie: movie.toJSON(),
      date: date.toLocaleDateString("en-EN", options),
    });
  }

  /**
   * Render a form to update an existing movie.
   * GET movies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update movie details.
   * PUT or PATCH movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a movie with id.
   * DELETE movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = MovieController;
