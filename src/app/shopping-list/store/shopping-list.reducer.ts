import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.mode';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Carrots', 4), new Ingredient('Tomotoes', 9)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload!],
      };
    //   break;

    default:
      return state;
    //   break;
  }
}
