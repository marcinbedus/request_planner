export interface IUser {
  username: string;
}

export type UserActions =
  | { type: "login_user"; payload: IUser }
  | { type: "logout_user" };

export interface IUserState {
  user: IUser | null;
  isAuthenticated: boolean;
}
