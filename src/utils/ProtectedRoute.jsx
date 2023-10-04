import React, { useContext } from "react";
import { authContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import { loginRoute } from "../data/constants/routes";

function ProtectedRoute({ children }) {
  const { token } = useContext(authContext);
  if (!token) {
    return <Navigate to={loginRoute} />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
