import React, { useContext } from "react";
import { authContext } from "../context/auth";
import { NavLink } from "react-router-dom";
import {
  brandsRoute,
  cartRoute,
  categoriesRoute,
  emptyRoute,
  ordersRoute,
  wishlistRoute,
} from "../constants//routes";

function NavbarRoutes() {
  const { token } = useContext(authContext);
  if (!token) {
    return <></>;
  }
  return (
    <>
      <li className="nav-item">
        <NavLink to={emptyRoute} className="nav-link">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={cartRoute} className="nav-link">
          Cart
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={wishlistRoute} className="nav-link">
          Wishlist
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={categoriesRoute} className="nav-link">
          Categories
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={brandsRoute} className="nav-link">
          Brands
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={ordersRoute} className="nav-link">
          Orders
        </NavLink>
      </li>
    </>
  );
}

export default NavbarRoutes;
