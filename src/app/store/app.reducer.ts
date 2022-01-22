import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';

import { Action, ActionReducerMap } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
};
