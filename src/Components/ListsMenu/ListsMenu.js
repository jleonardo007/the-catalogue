import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import "./ListsMenu.css";

function MenuList({ lists, listParent, movie, addMovie }) {
  /*
    The prop "listParent" means if <ListMenu/> is on <MoviesLists> (listParent=true) 
    or <Movie/> (listParent=false).

    **if listParent = true <ListMenu/> renders links to all lists saved on localStorage.

    **if listParent = false <ListMenu/> renders span tags, when one of them has been clicked
    the movie adds to a list.

    **When user creates a list, this is added to local storage (listParent = true), if listParent = false 
    list is created and a movie is added to this.

  */

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!localStorage.lists) {
      localStorage.setItem(
        "lists",
        JSON.stringify([
          {
            id: "favorites",
            name: "Favorites",
            listType: "default",
            movies: [],
          },
          {
            id: "view-later",
            name: "View later",
            listType: "default",
            movies: [],
          },
          { id: "viewed", name: "Viewed", listType: "default", movies: [] },
        ])
      );
    }
  }, []);

  const createUserList = () => {
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

  return (
    <div className="lists-menu">
      <FaListUl className="list-icon" />
      <ul className="lists-menu__lists">
        <li className="list-menu__item" style={{ color: "#e94560" }}>
          {listParent ? "Go to" : "Add to"}
        </li>
        {lists
          ? lists.map((list, index) => {
              return (
                <li className="list-menu__item" key={index}>
                  {listParent ? (
                    <Link to={`/lists/${list.id}`}>{list.name}</Link>
                  ) : (
                    <span
                      onClick={() => {
                        addMovie(list.id, list.name);
                      }}
                    >
                      {list.name}
                    </span>
                  )}
                </li>
              );
            })
          : null}

        <li className="list-menu__item">
          <input
            type="text"
            placeholder="Create a list"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) createUserList();
            }}
          />
        </li>
      </ul>
    </div>
  );
}

export default MenuList;
