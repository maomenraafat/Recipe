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
  mealDetails!: Meal | null;
  ingredients: Array<{ ingredient: string; measure: string }> = [];
  mealId!: string;
  error!: boolean;
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
  // getSpecificMeal(mealId: string) {
  //   this._mealsService.getMealDetails(mealId).subscribe({
  //     next: (data) => {
  //       if (data.meals.length > 0) {
  //         console.log(data.meals);
  //         this.mealDetails = data.meals[0];
  //         this.extractIngredients();
  //         console.log(this.mealDetails);
  //       } else if (data.meals === 'Invalid ID') {
  //         console.log('hi');
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('complete');
  //     },
  //   });
  // }
  getSpecificMeal(mealId: string) {
    this._mealsService.getMealDetails(mealId).subscribe({
      next: (data) => {
        if (data.meals && data.meals.length > 0) {
          this.mealDetails = data.meals[0];
          this.extractIngredients();
          this.error = false;
        } else {
          this.mealDetails = null;
          this.error = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.error = true;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  extractIngredients() {
    if (this.mealDetails) {
      this.ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = this.mealDetails[`strIngredient${i}` as keyof Meal];
        const measure = this.mealDetails[`strMeasure${i}` as keyof Meal];
        if (ingredient && ingredient.trim()) {
          this.ingredients.push({ ingredient, measure });
        }
      }
      // console.log(this.ingredients);
    } else {
      this.ingredients = [];
    }
  }
}
