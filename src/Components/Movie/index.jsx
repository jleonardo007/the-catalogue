import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Youtube from "react-youtube";
import ListsMenu from "../ListsMenu";
import useMovie from "./hooks";
import addMovieToList from "./handlers";
import "./styles.css";

function Movie() {
  const { id } = useParams();
  const { movie, trailer, similar } = useMovie(id);

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
          <FontAwesomeIcon icon={faHome} className="movie-list__icons" />
        </Link>
        <ListsMenu
          listParent={false}
          lists={JSON.parse(localStorage.lists)}
          movie={movie}
          addMovieToList={addMovieToList}
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
