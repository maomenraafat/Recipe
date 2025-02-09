import { Component, inject, input, OnInit } from '@angular/core';
import { Meal } from '../../../shared/interfaces/meal';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';
import { SidebarButtonComponent } from '../../../shared/components/sidebar-button/sidebar-button.component';

@Component({
  selector: 'app-recipe-detailes',
  imports: [RouterLink, SidebarButtonComponent],
  templateUrl: './recipe-detailes.component.html',
  styleUrl: './recipe-detailes.component.scss',
})
export class RecipeDetailesComponent implements OnInit {
  mealDetails!: Meal;
  ingredients: Array<{ ingredient: string; measure: string }> = [];
  mealId!: string;
  private readonly _mealsService = inject(MealsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const mealId = params.get('mealId');
      if (mealId) {
        this.getSpecificMeal(mealId);
      }
    });
  }
  getSpecificMeal(mealId: string) {
    this._mealsService.getMealDetails(mealId).subscribe({
      next: (data) => {
        console.log(data.meals);
        this.mealDetails = data.meals[0];
        this.extractIngredients();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  extractIngredients() {
    this.ingredients = []; // Clear previous data
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.mealDetails[`strIngredient${i}` as keyof Meal];
      const measure = this.mealDetails[`strMeasure${i}` as keyof Meal];
      if (ingredient && ingredient.trim()) {
        this.ingredients.push({ ingredient, measure });
      }
    }
    console.log(this.ingredients); // Debugging output
  }
}
