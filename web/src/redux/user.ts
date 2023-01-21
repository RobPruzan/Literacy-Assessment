import { number } from 'zod';

export type User = {
  id: number;
  name: string;
  is_admin?: boolean;
};

export interface UserState {
  user: User | null;
}

export const DEFAULT_USER_STATE: UserState = {
  user: {
    id: 1,
    name: 'RobPruzan',
    is_admin: true,
  },
};

export enum UserActions {
  Login = 'user/Login',
  Signup = 'user/Signup',
  Logout = 'user/Logout',
}

interface LoginAction {
  type: UserActions.Login;
  payload: { name: string; id: number };
}

// TODO implement auth & proper signup

export const UserReducer = (
  state: UserState = DEFAULT_USER_STATE,
  action: LoginAction
) => {
  switch (action.type) {
    case UserActions.Login:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
        },
      };
    default:
      return state;
  }
};
