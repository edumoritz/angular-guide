import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]
    ),
    new Recipe(
      'Caramelizes Cream Eggs',
      'This is a super cream eggs',
      'https://images.food52.com/ReS3McDmd1aOHDJJdpWjABFvixw=/1200x1200/d4a10002-0bd0-441a-a0fd-9e2143748e0b--2019-0405_caramelized-cream-eggs-genius-recipes_3x2_ty-mecham_001.jpg',
      [
        new Ingredient('Egg', 4),
        new Ingredient('Cream', 1),
        new Ingredient('Caramel', 4),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
