import { useState, useEffect } from "react";
import API from "../../Services/api";

export default function useMovie(movieId) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    (async () => {
      setMovie(await API.fetchMovie(movieId));
      setTrailer(await API.fetchMovieVideos(movieId));
      setSimilar(await API.fetchSimilarMovies(movieId));
    })();

    return function cleanUp() {
      setMovie(null);
      setTrailer(null);
      setSimilar(null);
    };
  }, [movieId]);

  return {
    movie,
    trailer,
    similar,
  };
}
