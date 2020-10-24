import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import "./ListsMenu.css";

function MenuList({ lists, listParent, addMovie }) {
  /*
    The prop "listParent" means if <ListMenu/> is on <MoviesLists> (listParent=true) 
    or <Movie/> (listParent=false)

    **if listParent = true <ListMenu/> renders links to all lists saved on localStorage.

    **if listParent = false <ListMenu/> renders span tags, when one of them been clicked
    the movie adds to a list. 

  */

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
                  {
                    listParent ? (
                      <Link to={`/lists/${list.id}`}>{list.name}</Link>
                    ) : (
                      <span
                        onClick={() => {
                          addMovie(list.id, list.name);
                        }}
                      >
                        {list.name}
                      </span>
                    )
                    /*handler que agregue la peli de Movie darle click a <span> */
                  }
                </li>
              );
            })
          : null}

        <li className="list-menu__item">
          <input type="text" placeholder="Create list" />
        </li>
      </ul>
    </div>
  );
}

export default MenuList;
