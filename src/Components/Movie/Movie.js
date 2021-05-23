import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Youtube from "react-youtube";
import { FaHome } from "react-icons/fa";
import API from "../../Services/api";
import ListsMenu from "../ListsMenu/ListsMenu";
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

    return function cleanUp() {
      setMovie(null);
      setTrailer(null);
      setSimilar(null);
    };
  }, [id]);

  const addMovieToList = (listId, listName) => {
    const storage = JSON.parse(localStorage.lists);
    const list = storage.find((list) => list.id === listId);
    const id = movie.id;

    if (list.movies.some((movie) => movie.id === id)) {
      alert(`"${movie.original_title}" was added to "${listName}"`);
    } else {
      list.movies.push(movie);
      localStorage.setItem("lists", JSON.stringify(storage));

      alert(`"${movie.original_title}" added to "${listName}"`);
    }
  };

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
        <Link to="/home">
          <FaHome className="movie-list__icons" />
        </Link>
        <ListsMenu
          listParent={false}
          lists={JSON.parse(localStorage.lists)}
          movie={movie}
          addMovie={addMovieToList}
        />

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
              <Youtube videoId={`${trailer.key}`} id={trailer.id} className="movie__trailer" />
            ) : (
              "Fetching video trailer"
            )}
          </div>
        </div>
      </section>
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
  ) : (
    <div className="fetching-movie">Fetching movie</div>
  );
}

export default Movie;
