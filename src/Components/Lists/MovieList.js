import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import { FaHome } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import "./MovieLists.css";
import movies from "../../Helpers/static-data";

function Lists() {
  return (
    <div className="movies-list">
      <div className="movies-list__header">
        <h1 className="movies-list__title">
          Nombre de lista
          {
            //Agreagr los iconos de lista
          }
        </h1>
        <Link to="/home">
          <FaHome className="movie-list__icons" />
        </Link>
        <BsListUl className="movie-list__icons" />
      </div>

      <section className="movies-list__movies">
        {movies.map((movie, index) => {
          return <MovieCard movie={movie} key={index} />;
        })}
      </section>
    </div>
  );
}

export default Lists;
