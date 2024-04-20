import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Front-IA',
    loadComponent: () => import('./home/Home.component'),
    pathMatch: 'full'
  },
];
