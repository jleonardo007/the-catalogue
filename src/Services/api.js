const api = {
  fetchNowPlayingMovies: async (pageNumber = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=${pageNumber}`
    );
    const { results } = await response.json();
    return results;
  },

  fetchPopularMovies: async (pageNumber = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=${pageNumber}`
    );

    const { results } = await response.json();
    return results;
  },

  fetchTrendingMovies: async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=af058d99e581a98b7f284b08a4b31810`
    );

    const { results } = await response.json();
    return results;
  },

  fetchUpcomingMovies: async (pageNumber = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=${pageNumber}`
    );

    const { results } = await response.json();
    return results;
  },

  searchMovie: async (query, pageNumber = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
    );

    const { results } = await response.json();
    return results;
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

export default api;
