import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.mode';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients = [new Ingredient('Carrots', 4), new Ingredient('Tomotoes', 9)];

  constructor() {}

  ngOnInit(): void {}

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
