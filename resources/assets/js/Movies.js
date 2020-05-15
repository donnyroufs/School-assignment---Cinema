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
      set("venue", Number(e.target.value));
    },
    findMovie: ({ state }) => {
      showAll(state.movies);
      state.movies.forEach((movie) => {
        const paragraph = movie.querySelector("p");
        const title = paragraph.innerHTML.toUpperCase();

        // const allVenues = Boolean(!state.venue || state.value === 0);
        const _venue = paragraph.dataset["venue"];
        const parsedVenues = JSON.parse(_venue);

        const venues = parsedVenues.map((v) => v.id);

        if (!state.query) {
          if (!state.venue || state.venue === 0) return;
          return !venues.includes(state.venue)
            ? movie.classList.add("hide")
            : null;
        }
        if (
          (title.includes(state.query) && !state.venue) ||
          state.venue === 3
        ) {
          return;
        }

        if (!title.includes(state.query) || !venues.includes(state.venue)) {
          return movie.classList.add("hide");
        }
      });
    },
  };
});

export default Movies;
