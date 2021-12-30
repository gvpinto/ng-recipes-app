import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.mode';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Hamburger',
      'Declious Hamburger',
      'https://img.taste.com.au/dkEhBL4s/w643-h428-cfill-q90/taste/2016/11/hamburger-with-caramelised-pineapple-90338-1.jpeg',
      [new Ingredient('Meat', 1), new Ingredient('Bread', 3)]
    ),
    new Recipe(
      'Beef Stew',
      'Yummy Stew!',
      'https://img.taste.com.au/uEWtNSPx/w643-h428-cfill-q90/taste/2019/07/classic-beef-stew-151457-2.jpg',
      [new Ingredient('Chicken', 2), new Ingredient('Buns', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
