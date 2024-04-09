import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'Front-IA',
    loadComponent: () => import('./home/Home.component'),
  }
];
