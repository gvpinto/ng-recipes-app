import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.mode';
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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
export class UpdateIngredient implements Action {
  // Never should be changed from outside. Enforced by TypeScript
  //   readonly type = UPDATE_INGREDIENT;
  type = UPDATE_INGREDIENT;
  //   constructor(public payload?: Ingredient) {}
  constructor(public payload?: any) {}
}
export class DeleteIngredient implements Action {
  // Never should be changed from outside. Enforced by TypeScript
  //   readonly type = UPDATE_INGREDIENT;
  type = DELETE_INGREDIENT;
  //   constructor(public payload?: index: number) {}
  constructor(public payload?: any) {}
}
export class StartEdit implements Action {
  type = START_EDIT;
  //constructor(public payload?: number) {}
  constructor(public payload?: number) {}
}
export class StopEdit implements Action {
  type = STOP_EDIT;
  constructor(public payload?: any) {}
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
