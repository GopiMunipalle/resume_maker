import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = (props: any) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoutes;
