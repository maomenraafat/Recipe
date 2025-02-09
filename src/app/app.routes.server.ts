import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'category/:categoryName',
    renderMode: RenderMode.Client,
  },
  {
    path: 'mealDetailes/:mealId',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
