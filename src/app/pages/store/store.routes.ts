import { Routes } from '@angular/router';
import { StorePage } from './store.page';
export const routes: Routes = [
  {
    path: '',
    component: StorePage,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/detail.page').then((m) => m.DetailPage),
  }
];
