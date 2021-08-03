export const deleteList = (list) => {
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

export const deleteMovie = (movieId, listId, list, setList) => {
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
