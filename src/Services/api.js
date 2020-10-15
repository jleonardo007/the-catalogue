export default {
  fetchNowPlayingMovies: async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=af058d99e581a98b7f284b08a4b31810&language=en-US&page=1`
    );
    const movies = await response.json();
    return movies.results;
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
