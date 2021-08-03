import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "../MovieCard";
import ListsMenu from "../ListsMenu";
import "./styles.css";

function MoviesLists() {
  const { listName } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const listStorage = JSON.parse(localStorage.lists);

    setList(listStorage.find((list) => list.id === listName));
  }, [listName]);

  const deleteList = () => {
    const listStorage = JSON.parse(localStorage.lists);

    if (list.listType === "default") {
      listStorage.forEach((listItem, index, storage) => {
        if (listItem.id === list.id) storage[index].movies = [];
      });
    } else {
      listStorage.forEach((listItem, index, storage) => {
        if (listItem.id === list.id) storage.splice(index, 1);
      });
    }

    localStorage.setItem("lists", JSON.stringify(listStorage));
  };

  const deleteMovie = (movieId, listId) => {
    const listStorage = JSON.parse(localStorage.lists);

    list.movies.forEach((movie, index, movies) => {
      if (movie.id === movieId) movies.splice(index, 1);
    });

    listStorage.forEach((listItem, index, storage) => {
      if (listItem.id === listId) storage[index] = { ...list };
    });

    localStorage.setItem("lists", JSON.stringify(listStorage));
    setList({ ...list });
  };

  return (
    <div className="movies-list">
      <div className="movies-list__header">
        <h1 className="movies-list__title">{list ? list.name : null}</h1>
        <Link to="/home">
          <FontAwesomeIcon icon={faHome} title="Go Home" className="movie-list__icons" />
        </Link>
        <ListsMenu
          className="movie-list__icons"
          lists={JSON.parse(localStorage.lists)}
          listParent={true}
        />
        <Link to={"/lists/favorites"}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="movie-list__icons"
            title={"Delete this list"}
            onClick={() => {
              deleteList();
            }}
          />
        </Link>
      </div>

      <section className="movies-list__movies">
        {list
          ? list.movies.map((movie, index) => {
              return (
                <MovieCard movie={movie} key={index}>
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    className="movies-list__delete-icon"
                    title={"delete movie"}
                    onClick={() => {
                      deleteMovie(movie.id, list.id);
                    }}
                  />
                </MovieCard>
              );
            })
          : null}
      </section>
    </div>
  );
}

export default MoviesLists;
