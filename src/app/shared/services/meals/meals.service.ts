import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}
  getMeals(): Observable<any> {
    return this._httpClient.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
  }
  getMealsByCategories(categoryName: string): Observable<any> {
    return this._httpClient.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
  }
  getMealDetails(mealId: string): Observable<any> {
    return this._httpClient.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
  }
}
