import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import MovieCard from "../MovieCard/MovieCard";
import ListsMenu from "../ListsMenu/ListsMenu";
import "./MoviesLists.css";

function MoviesLists() {
  const { listName } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const listStorage = JSON.parse(localStorage.lists);

    setList(listStorage.find((list) => list.id === listName));
  }, [listName]);

  return (
    <div className="movies-list">
      <div className="movies-list__header">
        <h1 className="movies-list__title">{list ? list.name : null}</h1>
        <Link to="/home">
          <FaHome className="movie-list__icons" />
        </Link>
        <ListsMenu
          className="movie-list__icons"
          lists={JSON.parse(localStorage.lists)}
          listParent={true}
        />
      </div>

      <section className="movies-list__movies">
        {list
          ? list.movies.map((movie, index) => {
              return <MovieCard movie={movie} key={index} />;
            })
          : null}
      </section>
    </div>
  );
}

export default MoviesLists;
