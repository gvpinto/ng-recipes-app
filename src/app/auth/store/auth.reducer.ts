import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  // user: User | null;
  user?: User;
  authError?: string;
  loading: boolean;
}

const initialState: State = {
  user: undefined,
  authError: undefined,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: undefined,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: undefined,
        loading: true,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: undefined,
        authError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
