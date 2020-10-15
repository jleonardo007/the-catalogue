import React from "react";
import { Link } from "react-router-dom";
import genres from "../../Helpers/movie-genres";
import "./FeaturesBar.css";
import { BsSearch, BsList } from "react-icons/bs";

function FeaturesBar() {
  return (
    <nav className="features-bar">
      <ul className="features-bar__features-list">
        <li className="features-bar__item">Trending</li>
        <li className="features-bar__item">Popular</li>
        <li className="features-bar__item">Now playing</li>
        <li className="features-bar__item">Upcoming</li>
        <li className="features-bar__item">
          <Link to="/lists/">Your Lists</Link>
        </li>
        <li className="features-bar__item">
          <select name="filter">
            <option hidden defaultValue>
              Genre
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
          <select name="sort">
            <option hidden defaultValue>
              Sort
            </option>
            <option value="year">Release year</option>
            <option value="voted">Most voted</option>
            <option value="budget">Budget</option>
          </select>
        </li>
      </ul>
      <div className="toggle-bar">
        <BsList />
      </div>
      <div className="features-bar__search">
        <input type="text" placeholder="Search a movie" />
        <button type="submit">
          <BsSearch />
        </button>
      </div>
    </nav>
  );
}

export default FeaturesBar;
