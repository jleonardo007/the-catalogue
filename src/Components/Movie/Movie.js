import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Youtube from "react-youtube";
import API from "../../Services/api";
import "./Movie.css";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    (async () => {
      setMovie(await API.fetchMovie(id));
      setTrailer(await API.fetchMovieVideos(id));
      setSimilar(await API.fetchSimilarMovies(id));
    })();
  }, [id]);

  return movie ? (
    <div className="movie">
      <section className="movie__poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="movie__poster-image"
        />
      </section>

      <section className="movie__description">
        <h1 className="movie__title">{movie.original_title}</h1>
        <div className="movie__details">
          <p className="movie__overview">{movie.overview}</p>
          <ul className="movie__genres">
            {movie.genres.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })}
          </ul>
          <div className="youtube-container">
            <h2>Movie trailer</h2>
            {trailer ? (
              <Youtube
                videoId={trailer.id}
                id={trailer.id}
                className="movie__trailer"
              />
            ) : (
              "Fetching video trailer"
            )}
          </div>
          {similar ? (
            similar.length === 0 ? null : (
              <aside className="movie__similar-movies">
                <h3>Similar movies</h3>
                {similar.map((movie, index) => {
                  return (
                    <Link to={`/movie/${movie.id}`} key={index}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        title={movie.original_title}
                      />
                    </Link>
                  );
                })}
              </aside>
            )
          ) : (
            "fetching similar movies"
          )}
        </div>
      </section>
    </div>
  ) : (
    <div className="fetching-movie">Fetching movie</div>
  );
}

export default Movie;
