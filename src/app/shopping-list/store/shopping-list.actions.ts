import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.mode';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  // Never should be changed from outside. Enforced by TypeScript
  //   readonly type = ADD_INGREDIENT;
  type = ADD_INGREDIENT;
  payload?: Ingredient;
}
