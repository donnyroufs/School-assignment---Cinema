// @TODO: Venue filtering (not sure with db)

import Controller from "chetsbull";

const Movies = new Controller({
  scope: "#App",
  log: true,
});

const showAll = (movies) =>
  movies.forEach((movie) => movie.classList.remove("hide"));

Movies.drink(({ view, state }) => {
  state.movies = Array.from(view.movies.children);

  return {
    setQuery: ({ e, set }) => {
      const _query = e.target.value;
      set("query", _query.toUpperCase());
    },
    setOption: ({ e, set }) => {
      set("venue", e.target.value);
    },
    findMovie: ({ state }) => {
      showAll(state.movies);
      if (!state.query) return;
      state.movies.forEach((movie) => {
        const paragraph = movie.querySelector("p");
        const title = paragraph.innerHTML.toUpperCase();
        // const venue = paragraph.dataset["venue"];
        if (!title.includes(state.query)) {
          movie.classList.toggle("hide");
        }
      });
    },
  };
});

export default Movies;
