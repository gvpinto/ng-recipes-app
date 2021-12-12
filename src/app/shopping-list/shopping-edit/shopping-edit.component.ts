import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.mode';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  ingredients: { name: string; amount: string }[] = [];
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  @ViewChild('amountInput') amountInputRef?: ElementRef;
  @Output() ingredientAdded = new EventEmitter<{
    name: string;
    amount: number;
  }>();
  constructor() {}

  ngOnInit(): void {}

  onAddItem(): void {
    const newIngredient = new Ingredient(
      this.nameInputRef?.nativeElement.value,
      this.amountInputRef?.nativeElement.value
    );
    this.ingredientAdded.emit(newIngredient);
  }
}
