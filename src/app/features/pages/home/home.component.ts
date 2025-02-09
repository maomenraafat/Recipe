import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { Meal } from '../../../shared/interfaces/meal';
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';
import { SidebarButtonComponent } from '../../../shared/components/sidebar-button/sidebar-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    SidebarButtonComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  categories!: Category[];
  meals!: Meal[];
  // categoryName: string = '';
  selectedCategory: string | null = null;
  meald!: string;

  // text(name: string): void {
  //   console.log(name);
  // }

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _mealsService = inject(MealsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getCategories();
    // this.getMeals();
    this.route.paramMap.subscribe((params) => {
      const categoryName = params.get('categoryName');
      if (!categoryName) {
        this.getMeals();
      }
      if (categoryName) {
        this.getMealsByCategories(categoryName);
      }
    });
  }

  slidertoggle() {}

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (category) => {
        // console.log(category.categories);
        this.categories = category.categories;
      },
      error: (err) => {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
  }

  getMeals() {
    // this.selectedCategory = null;
    this._mealsService.getMeals().subscribe({
      next: (meal) => {
        // console.log(meal.meals);
        this.meals = meal.meals;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  getMealsByCategories(categoryName: string) {
    // this.selectedCategory = categoryName;
    this._mealsService.getMealsByCategories(categoryName).subscribe({
      next: (meal) => {
        console.log(meal);
        this.meals = meal.meals;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.getMealsByCategories(this.selectedCategory);
    }
  }
}
