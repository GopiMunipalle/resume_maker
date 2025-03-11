import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRoutesProps {
  allowedRoles: string[];
  Component: React.ElementType;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  // allowedRoles,
  Component,
}) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoutes;
