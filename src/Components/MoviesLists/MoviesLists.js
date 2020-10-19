import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import MovieCard from "../MovieCard/MovieCard";
import ListsMenu from "../ListsMenu/ListsMenu";
import "./MoviesLists.css";
import movies from "../../Helpers/static-data";

function MoviesLists() {
  return (
    <div className="movies-list">
      <div className="movies-list__header">
        <h1 className="movies-list__title">Nombre de lista</h1>
        <Link to="/home">
          <FaHome className="movie-list__icons" />
        </Link>
        <ListsMenu className="movie-list__icons" />
      </div>

      <section className="movies-list__movies">
        {movies.map((movie, index) => {
          return <MovieCard movie={movie} key={index} />;
        })}
      </section>
    </div>
  );
}

export default MoviesLists;
