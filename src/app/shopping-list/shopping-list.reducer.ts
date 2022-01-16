import { Ingredient } from '../shared/ingredient.mode';

const initialState = {
  ingredients: [new Ingredient('Carrots', 4), new Ingredient('Tomotoes', 9)],
};

export function shoppingListReducer(state = initialState, action: any) {}
