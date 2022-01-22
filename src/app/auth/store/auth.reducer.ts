import { User } from '../user.model';

export interface State {
  user?: User;
}

const initialState: State = {
  user: undefined,
};

export function authReducer(state = initialState, action: any) {
  return state;
}
