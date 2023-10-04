import React from "react";
import { Link, NavLink } from "react-router-dom";
import { empty, login, register } from "../data/constants/routes";
import { logo } from "../assets/images";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to={empty}>
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-routes"
          aria-controls="navbar-routes"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-routes">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={register} className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={login} className="nav-link">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
