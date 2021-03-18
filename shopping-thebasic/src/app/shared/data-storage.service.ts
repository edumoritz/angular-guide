import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const firebase = 'https://course-recipe-book-2e1d7-default-rtdb.firebaseio.com/';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(firebase+'recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }
}
