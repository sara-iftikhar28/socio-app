import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand">Socio</a>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          {/* {!user && (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )} */}
          {user && (
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          )}
        </li>
      </ul>

      <span className="pull-right nav-item nav-link text-light" href="#">
        {user}
      </span>
    </nav>
  );
};

export default Navbar;
