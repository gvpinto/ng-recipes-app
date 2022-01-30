import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Recipe } from '../recipe-model';
import * as RecipeActions from './recipe-actions';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchREcipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-ps-recipe-app-default-rtdb.firebaseio.com/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
