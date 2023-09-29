import { Routes } from '@angular/router';
import { InventoryPage } from './inventory.page';

export const routes: Routes = [
  {
    path: '',
    component: InventoryPage,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../inventory/detail/detail.page').then((m) => m.DetailPage),
  },
  {
    path: '',
    redirectTo: '/tabs/store',
    pathMatch: 'full',
  },
];
