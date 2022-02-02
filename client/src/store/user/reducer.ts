import { UserActions, IUserState } from "./index.d";

export const userReducer = (
  state: IUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case "login_user":
      const user = action.payload;

      return {
        ...state,
        user,
        isAuthenticated: true,
      };
    case "logout_user":
      return { ...state, user: null, isAuthenticated: false };
  }
};
