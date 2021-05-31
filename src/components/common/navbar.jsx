import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <Button className="navbar-brand">Socio</Button>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
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
