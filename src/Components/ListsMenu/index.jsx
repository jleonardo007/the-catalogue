import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import createUserList from "./handlers.js";
import "./styles.css";

function MenuList({ lists, listParent, movie, addMovieToList }) {
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

  return (
    <div className="lists-menu">
      <FontAwesomeIcon icon={faListUl} className="movie-list__icons" />
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
                        addMovieToList(movie, list.id, list.name);
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
              if (e.key === "Enter" && input.trim())
                createUserList(listParent, movie, input, setInput);
            }}
          />
        </li>
      </ul>
    </div>
  );
}

export default MenuList;
