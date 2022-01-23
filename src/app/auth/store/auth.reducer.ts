import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  // user: User | null;
  user?: User;
}

const initialState: State = {
  user: undefined,
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
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: undefined,
      };

    default:
      return state;
  }
}
