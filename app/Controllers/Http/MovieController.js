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
const Schedule = use("App/Models/ScheduleMovie");

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
    // @TODO: WHERE NOT OLDER THAN TODAY
    const movies = await Movie.query().with("venues").fetch();
    const venues = await Venue.all();

    return view.render("index", {
      movies: movies.toJSON(),
      venues: venues.toJSON(),
    });
  }

  async order({ request, response, view }) {
    const { id } = request.get();
    // const movie = await Movie.query()
    //   .with("venues")
    //   .with("halls")
    //   .where({ id })
    //   .first();

    // const movie = await Movie.query().with("venues").where({ id }).first();
    // await movie.load("halls");

    // const movie = await Schedule.query().where({ movie_id: id }).first();

    // await movie.load("movies");

    const movie = await Schedule.query()
      .with("movies.halls")
      .with("movies.venues")
      .where({ movie_id: id })
      .andWhere("starts_at", ">=", new Date())
      .fetch();

    return view.render("order", {
      data: movie.toJSON(),
      movie: movie.toJSON()[0].movies,
    });
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
  async create({ request, response, view }) {
    // Create the movie and insert into schedule_movie with static data(venue_id, hall_id, starts_at)

    return view.render("admin");
  }

  /**
   * Create/save a new movie.
   * POST movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { _csrf, ...body } = request.all();

    const movie = await Movie.create({
      ...body,
    });

    // Starts next week
    const day = new Date();
    const days = 7 - day.getDay() + 4;
    const starts_at = new Date(day.setDate(day.getDate() + days));

    // Generate random venue and hall
    const venue_id = Math.floor(Math.random() * 3 + 1);
    const hall_id = Math.floor(Math.random() * 2 + 1);

    await movie.venues().attach(venue_id, (row) => {
      row.hall_id = hall_id;
      row.starts_at = starts_at;
    });

    return response.redirect("back");
  }

  /**
   * Display a single movie.
   * GET movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ request, response, view }) {
    const { id } = request.get();
    const movie = await Movie.query().with("venues").where("id", id).first();

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
