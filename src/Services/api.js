export default {
  fetchNowPlayingMovies: async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=1`
    );
    const movies = await response.json();
    return movies.results;
  },

  fetchPopularMovies: async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=1`
    );
    const movies = await response.json();
    return movies.results;
  },

  fetchTrendingMovies: async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=af058d99e581a98b7f284b08a4b31810`
    );
    const movies = await response.json();
    return movies.results;
  },

  fetchUpcomingMovies: async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=1`
    );
    const movies = await response.json();
    return movies.results;
  },

  searchMovie: async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const search = await response.json();
    return search.results;
  },

  fetchMovie: async (movieID) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US`
    );
    const movie = await response.json();
    return movie;
  },

  fetchMovieVideos: async (movieID) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US`
    );
    const videos = await response.json();
    return videos.results.find((video) => video.type === "Trailer");
  },

  fetchSimilarMovies: async (movieID) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=1`
    );
    const similarMovies = await response.json();
    return similarMovies.results.slice(0, 10);
  },
};
