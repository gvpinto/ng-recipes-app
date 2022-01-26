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
  authError: null!,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null!,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null!,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: undefined,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null!,
      };
    default:
      return state;
  }
}
