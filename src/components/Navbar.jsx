import React from "react";
import { Link } from "react-router-dom";
import { emptyRoute } from "../data/constants/routes";
import { logo } from "../assets/images";
import NavbarActions from "./NavbarActions";
import NavbarRoutes from "./NavbarRoutes";

function Navbar() {
  return (
    // TODO: add fixed-top
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container justify-content-between">
        <Link to={emptyRoute}>
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
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbar-routes"
        >
          <span></span>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
            <NavbarRoutes />
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
            <NavbarActions />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
