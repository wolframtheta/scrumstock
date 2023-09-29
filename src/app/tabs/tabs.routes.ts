import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: ':idStore',
    component: TabsPage,
    children: [
      {
        path: 'inventory',
        loadChildren: () =>
          import('../pages/inventory/inventory.routes').then((m) => m.routes),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('../pages/sales/sales.routes').then((m) => m.routes),
      },
      {
        path: 'store',
        loadChildren: () =>
          import('../pages/store/store.routes').then((m) => m.routes),
      },
      {
        path: '',
        redirectTo: '/tabs/sales',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/store',
    pathMatch: 'full',
  },
];
