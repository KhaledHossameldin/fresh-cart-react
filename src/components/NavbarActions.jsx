import React, { useContext } from "react";
import { authContext } from "../context/auth";
import { NavLink } from "react-router-dom";
import { loginRoute, registerRoute } from "../data/constants/routes";

function NavbarActions() {
  const { token, logout } = useContext(authContext);
  if (!token) {
    return (
      <>
        <li className="nav-item">
          <NavLink to={registerRoute} className="nav-link">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={loginRoute} className="nav-link">
            Login
          </NavLink>
        </li>
      </>
    );
  }
  return (
    <>
      <li className="nav-item me-3 cursor-pointer">
        <div className="position-relative">
          <i className="fa-solid fa-cart-shopping fa-lg"></i>
          <span className="position-absolute top-0 lead-0 translate-middle badge rounded-pill bg-danger p-1">
            9+
          </span>
        </div>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={() => logout()}>
          Logout
        </button>
      </li>
    </>
  );
}

export default NavbarActions;
