import { Link } from "react-router-dom";
import "./styles.css";
import Image from "../../resources/popcorn.png";

function MovieCard({ movie, children }) {
  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div
          className="movie-card__image"
          title={movie.original_title}
          style={{
            backgroundImage: `url(${
              movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : Image
            })`,
          }}
        />

        <div className="movie-card__title">{movie.original_title}</div>
      </Link>
      {children}
    </article>
  );
}

export default MovieCard;
