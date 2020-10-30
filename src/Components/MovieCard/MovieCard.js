import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import Image from "../../resources/popcorn.png";

function MovieCard({ movie, children }) {
  return (
    <article className="movie-card">
      <div className="movie-card__image">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : Image
          }
          alt={movie.original_title}
          title={movie.original_title}
        />
      </div>
      <div className="movie-card__title">
        <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
        {children}
      </div>
    </article>
  );
}

export default MovieCard;
