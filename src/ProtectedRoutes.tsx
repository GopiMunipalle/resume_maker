<<<<<<< Updated upstream
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({
  allowedRoles,
  Component,
}: {
  allowedRoles: string[];
  Component: React.ElementType;
}) {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" />; // Redirect if the user doesn't have the required role
  }
=======
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({
  // allowedRoles,
  Component,
}: {
  allowedRoles: string[];
  Component: React.ComponentType;
}) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  return <Component />;
};
>>>>>>> Stashed changes

  return <Component />;
}
