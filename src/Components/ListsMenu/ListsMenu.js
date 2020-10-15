import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

function MenuList() {
  return (
    <div className="lists-menu">
      <button className="lists-menu__menu-btn">
        <BsThreeDotsVertical />
      </button>
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
      </ul>
      <div className="list-menu__create-list">
        <input type="text" placeholder="Create list" />
      </div>
    </div>
  );
}

export default MenuList;
