import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe-model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe-actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    // private dataStorageService: DataStorageService,
    // private recipeService: RecipeService
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  // Has to return an observable
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }

    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          // Cannot not return this as dispatching doesn't return an Observable which is require by the resolver
          this.store.dispatch(new RecipeActions.FetchRecipes());
          //Only interested in the even once hence use take(1) which automatically unsubscribes
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
