import React from "react";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import "./ListsMenu.css";

function MenuList() {
  return (
    <div className="lists-menu">
      <FaListUl className="list-icon" />
      <ul className="lists-menu__lists">
        <li className="list-menu__item">
          <Link to={`/list/favorites`}>Favorites</Link>
        </li>
        <li className="list-menu__item">
          <Link to={`/list/later`}>View later</Link>
        </li>
        <li className="list-menu__item">
          <Link to={`/list/viewed`}>Viewed</Link>
        </li>
        {/* Agregar codigo para listas de usuario*/}
        <li className="list-menu__item">
          <input type="text" placeholder="Create list" />
        </li>
      </ul>
    </div>
  );
}

export default MenuList;
