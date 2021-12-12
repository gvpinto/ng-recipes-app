import { Ingredient } from '../shared/ingredient.mode';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Carrots', 4),
    new Ingredient('Tomotoes', 9),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
