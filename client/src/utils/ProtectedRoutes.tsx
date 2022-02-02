import { Outlet } from "react-router-dom";
import { Login } from "../components/Login";
import { useUserContext } from "../store/user";

export const ProtectedRoutes = () => {
  const {
    state: { isAuthenticated },
  } = useUserContext();
  return isAuthenticated ? <Outlet /> : <Login />;
};
