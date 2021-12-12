import { Recipe } from './recipe-model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.cookingclassy.com/wp-content/uploads/2021/10/beef-stew-30.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply another test',
      'https://www.cookingclassy.com/wp-content/uploads/2021/10/beef-stew-30.jpg'
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
