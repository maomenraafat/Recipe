import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { RecipeDetailesComponent } from './features/pages/recipe-detailes/recipe-detailes.component';
import { NotfoundComponent } from './features/pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'category/:categoryName',
    component: HomeComponent,
    data: { renderMode: 'dynamic' },
  },
  {
    path: 'mealDetailes/:mealId',
    component: RecipeDetailesComponent,
    data: { renderMode: 'dynamic' },
  },
  { path: '**', component: NotfoundComponent },
];
