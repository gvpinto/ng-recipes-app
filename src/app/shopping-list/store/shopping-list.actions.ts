import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.mode';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
  // Never should be changed from outside. Enforced by TypeScript
  //   readonly type = ADD_INGREDIENT;
  type = ADD_INGREDIENT;
  //   payload?: Ingredient;
  //   constructor(public payload?: Ingredient) {}
  constructor(public payload?: any) {}
}
export class AddIngredients implements Action {
  // Never should be changed from outside. Enforced by TypeScript
  //   readonly type = ADD_INGREDIENTS;
  type = ADD_INGREDIENTS;
  //   payload?: Ingredient[];
  //   constructor(public payload?: Ingredient[]) {}
  constructor(public payload?: any) {}
}

export type ShoppingListActionTypes = AddIngredient | AddIngredients;
