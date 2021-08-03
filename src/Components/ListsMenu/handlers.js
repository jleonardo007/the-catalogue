const createUserList = (listParent, movie, input, setInput) => {
  const listStorage = JSON.parse(localStorage.lists);
  const list = listStorage.find((list) => list.name === input);
  let userList = {};

  if (list) {
    alert(`"${input}" already exits`);
  } else {
    userList = {
      id: input.replace(/ /g, "-"),
      listType: "user list",
      name: input,
      movies: listParent ? [] : [].concat(movie),
    };

    listStorage.push(userList);
    localStorage.setItem("lists", JSON.stringify(listStorage));
  }

  setInput("");
};

export default createUserList;
