import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.mode';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-model';

@Injectable()
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.cookingclassy.com/wp-content/uploads/2021/10/beef-stew-30.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Bread', 3)]
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply another test',
      'https://www.cookingclassy.com/wp-content/uploads/2021/10/beef-stew-30.jpg',
      [new Ingredient('Chicken', 2), new Ingredient('Buns', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
