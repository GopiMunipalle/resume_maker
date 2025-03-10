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

export default ProtectedRoutes;
