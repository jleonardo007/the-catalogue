import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import useSearch from "./hooks";
import { toggleSideBar } from "./handlers";
import genres from "../../Helpers/movie-genres";
import "./styles.css";

function FeaturesBar({ fetchByCategory, searchMovies, filterMovies, sortMovies }) {
  const [toggle, setToggle] = useState(false);
  const { searchInput, inputChange, search } = useSearch();

  return (
    <nav className="features-bar">
      <ul className={`features-bar__features-list ${toggle && "sidebar"}`}>
        {toggle && (
          <button className="close-sidebar-btn" onClick={() => toggleSideBar(setToggle)}>
            X
          </button>
        )}
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (toggle) setToggle(false);
            fetchByCategory("trending");
          }}
        >
          Trending
        </li>
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (toggle) setToggle(false);
            fetchByCategory("popular");
          }}
        >
          Popular
        </li>
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (toggle) setToggle(false);
            fetchByCategory();
          }}
        >
          Now playing
        </li>
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (toggle) setToggle(false);
            fetchByCategory("upcoming");
          }}
        >
          Upcoming
        </li>
        <li className="features-bar__item">
          <Link to="/lists/favorites">Your Lists</Link>
        </li>
        <li className="features-bar__item">
          <select
            name="filter"
            onChange={(e) => {
              if (toggle) setToggle(false);

              if (e.target.value === "0") {
                filterMovies(parseInt(e.target.value));
                e.target.value = e.target.value = "Genre";
              } else filterMovies(parseInt(e.target.value));
            }}
          >
            <option hidden defaultValue>
              Genre
            </option>
            <option value="0" style={{ color: "tomato" }}>
              Clear filter
            </option>
            {genres.map((genre, index) => {
              return (
                <option key={index} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </li>
        <li className="features-bar__item">
          <select
            name="sort"
            onChange={(e) => {
              sortMovies(e.target.value);
              if (toggle) setToggle(false);
              if (e.target.value === "clear") e.target.value = e.target.value = "Sort";
            }}
          >
            <option hidden defaultValue>
              Sort
            </option>
            <option value="clear" style={{ color: "tomato" }}>
              Clear Sort
            </option>
            <option value="year">Release year</option>
            <option value="popularity">Popularity</option>
            <option value="voted">Most voted</option>
          </select>
        </li>
      </ul>
      <div className={`features-bar__search ${toggle ? "features-bar__search--hide" : ""}`}>
        <div className="toggle-sidebar" onClick={() => toggleSideBar(setToggle)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <input
          type="text"
          placeholder="Search a movie"
          value={searchInput}
          onChange={(e) => {
            inputChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") search(searchMovies);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            search(searchMovies);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </nav>
  );
}

export default FeaturesBar;
