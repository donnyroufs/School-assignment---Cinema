// import Controller from "../../../../../../chetsbull/dist/chetsbull.esm";

import Controller from "chetsbull";

const Movies = new Controller({
  scope: "#App",
  log: true,
  root: true,
});

if (!Movies.status) {
  const showAll = (movies) =>
    movies.forEach((movie) =>
      !movie.classList.contains("loader")
        ? movie.classList.remove("hide")
        : null
    );

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
      findMovie: ({ e, state }) => {
        showAll(state.movies);
        state.movies.forEach((movie) => {
          if (movie.classList.contains("loader")) return;
          const paragraph = movie.querySelector("p");
          const title = paragraph.innerHTML.toUpperCase();

          const _venue = paragraph.dataset["venue"];
          const parsedVenues = JSON.parse(_venue);

          const venues = parsedVenues.map((v) => v.id);

          setLoader(view.loader, true);
          if (!state.query) {
            setLoader(view.loader, false);
            if (!state.venue || state.venue === 0) return;
            setLoader(view.loader, false);
            return !venues.includes(state.venue)
              ? movie.classList.add("hide")
              : null;
          }
          if (
            (title.includes(state.query) && !state.venue) ||
            state.venue === 0
          ) {
            setLoader(view.loader, false);
            return venues.includes(state.venue)
              ? movie.classList.add("hide")
              : null;
          }

          if (!title.includes(state.query) || !venues.includes(state.venue)) {
            setLoader(view.loader, false);
            return movie.classList.add("hide");
          }
        });
      },
    };
  });
}

export default Movies;

function setLoader(view, loading) {
  if (loading) {
    view.style.display = "flex";
  } else {
    setTimeout(() => {
      view.style.display = "none";
    }, 500);
  }
}
