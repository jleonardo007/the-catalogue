import { useState, useEffect } from "react";
import { deleteList, deleteMovie } from "./handlers";

export default function useMoviesLists(listName) {
  const [list, setList] = useState(null);

  useEffect(() => {
    const listStorage = JSON.parse(localStorage.lists);

    setList(listStorage.find((list) => list.id === listName));
  }, [listName]);

  return {
    list,
    deleteList: (list) => deleteList(list),
    deleteMovie: (movieId, listId) => deleteMovie(movieId, listId, list, setList),
  };
}
