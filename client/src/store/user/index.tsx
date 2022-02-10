import { AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { axiosInstance } from "../../utils/axios";
import { loginUser, logoutUser } from "./actions";
import { IUser } from "./index.d";
import { userReducer } from "./reducer";
import { initialUserState } from "./state";

export const UserContext = createContext({
  state: initialUserState,
  actions: {
    loginUser: (payload: IUser) => {},
    logoutUser: () => {},
  },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_USERS_URL}/auth/user`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        dispatch({
          type: "login_user",
          payload: { username: response.data.username },
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = {
    loginUser: (payload: IUser) => dispatch(loginUser(payload)),
    logoutUser: () => dispatch(logoutUser()),
  };

  const userContextValues = {
    state,
    actions,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const { state, actions } = useContext(UserContext);

  return { state, actions };
};
