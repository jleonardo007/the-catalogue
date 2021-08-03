import API from "../../Services/api";

export const fetchMoviesByCategory = async (category, movieState, setMovieState) => {
  const { genreID } = movieState;
  let results = null;

  if (genreID !== 0)
    setMovieState((prevState) => {
      return {
        ...prevState,
        genreID: 0,
      };
    });

  switch (category) {
    case "trending":
      results = await API.fetchTrendingMovies();
      setMovieState((prevState) => {
        return {
          ...prevState,
          title: "Trending Movies",
          movies: results,
        };
      });
      break;

    case "popular":
      results = await API.fetchPopularMovies();
      setMovieState((prevState) => {
        return {
          ...prevState,
          title: "Popular Movies",
          movies: results,
        };
      });
      break;

    case "upcoming":
      results = await API.fetchUpcomingMovies();
      setMovieState((prevState) => {
        return {
          ...prevState,
          title: "Upcoming",
          movies: results,
        };
      });
      break;

    default:
      results = await API.fetchNowPlayingMovies();
      setMovieState((prevState) => {
        return {
          ...prevState,
          title: "Now Playing",
          movies: results,
        };
      });
      break;
  }
};

export const searchMovies = (query, setMovieState) => {
  setMovieState((prevState) => {
    return {
      ...prevState,
      query,
    };
  });
};

export const filterMovies = (movieId, setMovieState) => {
  if (movieId === 0) {
    setMovieState((prevState) => {
      return {
        ...prevState,
        genreID: 0,
        title: "Now Playing",
        movies: null,
      };
    });
  } else
    setMovieState((prevState) => {
      return {
        ...prevState,
        genreID: movieId,
      };
    });
};

export const sortMovies = (sortBy, setMovieState) => {
  setMovieState((prevState) => {
    return {
      ...prevState,
      sortBy,
    };
  });
};
