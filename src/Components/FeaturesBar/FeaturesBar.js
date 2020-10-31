import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsList } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import genres from "../../Helpers/movie-genres";
import "./FeaturesBar.css";

function FeaturesBar({ fetchByCategory, search, filter, sort }) {
  const [isActive, setActive] = useState(false);
  const [searchInput, setInput] = useState("");

  const handleSideBar = () => {
    setActive(!isActive);
  };

  const handleInput = (input) => {
    setInput(input);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      search(searchInput);
      setInput("");
    } else alert("Invalid Search");
  };

  return (
    <nav className="features-bar">
      <ul
        className={`features-bar__features-list ${
          isActive ? "features-bar__features-list--sidebar" : ""
        }`}
      >
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            fetchByCategory("trending");
          }}
        >
          Trending
        </li>
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            fetchByCategory("popular");
          }}
        >
          Popular
        </li>
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            fetchByCategory();
          }}
        >
          Now playing
        </li>
        <li
          className="features-bar__item"
          style={{ cursor: "pointer" }}
          onClick={() => {
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
              if (e.target.value === "0") {
                filter(parseInt(e.target.value));
                e.target.value = e.target.value = "Genre";
              } else filter(parseInt(e.target.value));
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
              sort(e.target.value);
              if (e.target.value === "clear")
                e.target.value = e.target.value = "Sort";
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
      <div className="toggle-sidebar" onClick={handleSideBar}>
        {isActive ? <FaWindowClose /> : <BsList />}
      </div>
      <div
        className={`features-bar__search ${
          isActive ? "features-bar__search--hide" : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search a movie"
          value={searchInput}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          type="submit"
          onClick={() => {
            handleSearch();
          }}
        >
          <BsSearch />
        </button>
      </div>
    </nav>
  );
}

export default FeaturesBar;
