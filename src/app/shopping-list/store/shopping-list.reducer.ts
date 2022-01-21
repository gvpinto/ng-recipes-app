import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.mode';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Carrots', 4), new Ingredient('Tomotoes', 9)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload!],
      };
    //   break;
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload!],
      };
    //   break;
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updateIngredient = state.ingredients[action.payload!.index];
      const newIngredient = {
        ...updateIngredient,
        ...action.payload!.ingredient,
      };
      const newIngredients = [...state.ingredients];
      newIngredients[action.payload!.index] = newIngredient;

      return {
        ...state,
        ingredients: newIngredients,
      };
    //   break;
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload!;
        }),
      };

    default:
      return state;
    //   break;
  }
}
