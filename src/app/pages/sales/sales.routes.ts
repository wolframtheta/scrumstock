import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sales.page').then((m) => m.SalesPage),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then((m) => m.CheckoutPage),
  }
];
