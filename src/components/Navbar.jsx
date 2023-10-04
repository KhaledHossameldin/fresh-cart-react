import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { emptyRoute } from "../data/constants/routes";
import { logo } from "../assets/images";
import NavbarActions from "./NavbarActions";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
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
        <div className="collapse navbar-collapse" id="navbar-routes">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <NavbarActions />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
