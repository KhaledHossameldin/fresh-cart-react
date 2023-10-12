import React, { useContext } from "react";
import { authContext } from "../context/auth";
import { Link, NavLink } from "react-router-dom";
import { cartRoute, loginRoute, registerRoute } from "../constants//routes";
import { cartContext } from "../context/cart";

function NavbarActions() {
  const { token, logout } = useContext(authContext);
  const { itemsCount } = useContext(cartContext);
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
          <Link to={cartRoute}>
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
          </Link>
          {itemsCount > 0 ? (
            <span className="position-absolute top-0 lead-0 translate-middle badge rounded-pill bg-danger p-1">
              {itemsCount < 10 ? itemsCount : "9+"}
            </span>
          ) : (
            <></>
          )}
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
