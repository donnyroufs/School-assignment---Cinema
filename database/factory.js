"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint("App/Models/Movie", (faker) => {
  return {
    title: faker.sentence({ words: 4 }),
    thumbnail: faker.avatar({ fileExtension: "jpg" }),
    description: faker.paragraph({ sentences: 2 }),
    price: faker.integer({ min: 0, max: 15 }),
    release_date: faker.date(),
  };
});
