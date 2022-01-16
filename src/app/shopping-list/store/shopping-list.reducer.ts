import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.mode';
import { ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Carrots', 4), new Ingredient('Tomotoes', 9)],
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action],
      };
      break;

    default:
      return state;
      break;
  }
}
