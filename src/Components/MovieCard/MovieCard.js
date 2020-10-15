import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.original_title}
        title={movie.original_title}
        className="movie-card__image"
      />
      <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
    </article>
  );
}

export default MovieCard;
