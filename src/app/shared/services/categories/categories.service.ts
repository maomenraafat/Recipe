import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);

  constructor() {}

  getCategories(): Observable<any> {
    return this._httpClient.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
  }
}
