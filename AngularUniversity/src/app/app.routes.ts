import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Angular University - Início',
  },
  {
    path: 'resultados',
    loadComponent: () =>
      import('./features/results/results.component').then(
        (m) => m.ResultsComponent
      ),
    title: 'Angular University - Resultados',
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./features/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
    title: 'Angular University - Favoritos',
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./features/about/about.component').then(
        (m) => m.AboutComponent
      ),
    title: 'Angular University - Sobre',
  },
  { path: '**', redirectTo: '' },
];
