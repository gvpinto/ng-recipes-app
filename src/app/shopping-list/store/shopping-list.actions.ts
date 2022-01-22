import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.mode';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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
  constructor(public payload?: any) {}
}
export class StopEdit implements Action {
  type = STOP_EDIT;
  constructor(public payload?: any) {}
}

export type ShoppingListActionTypes =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
