import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../../store/modal";
import { useUserContext } from "../../../store/user";

export const useNavbarLogic = () => {
  const navigate = useNavigate();
  const {
    actions: { logoutUser },
  } = useUserContext();
  const {
    actions: { openModal },
  } = useModalContext();

  const handleLogout = () => {
    AuthService.logout()
      .then(() => {
        logoutUser();
        navigate("/login");
      })
      .catch((e) =>
        openModal({ message: "Something went wrong, try again later" })
      );
  };

  return { handleLogout };
};
