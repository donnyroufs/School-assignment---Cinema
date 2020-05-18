"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// @HOME PAGE
Route.get("/", "MovieController.index");

// @MOVIE PAGE
Route.get("/movie", "MovieController.show");
Route.post("/movie", "MovieController.store");

// @ORDER PAGE
Route.group(() => {
  Route.get("/movie/order", "MovieController.order");
  Route.get("/api/venues/:id", "MovieController.getVenues");
  Route.get("/api/reservations/:id", "ReservationController.getById");
}).middleware(["auth"]);

Route.get("/order/tickets/", "ReservationController.index");
Route.post("/api/order", "ReservationController.orderTickets");

// @AUTHENTICATION
Route.group(() => {
  Route.get("/login", "UserController.index");
  Route.post("/login", "UserController.login").validator("LoginUser");

  Route.get("/register", "UserController.register");
  Route.post("/register", "UserController.create").validator("CreateUser");
}).middleware(["guest"]);

Route.get("/logout", "UserController.logout");

// Create a new movie
Route.group(() => {
  Route.get("/admin", "MovieController.create");
}).middleware("auth", "admin");

// Use ticket
Route.get("/useticket", "ReservationController.useTicket");
Route.post("/api/scan", "ReservationController.scan");
