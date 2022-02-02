import { IUser, UserActions } from "./index.d";

export const loginUser = (user: IUser): UserActions => ({
  type: "login_user",
  payload: user,
});

export const logoutUser = (): UserActions => ({
  type: "logout_user",
});
