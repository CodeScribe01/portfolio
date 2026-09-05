import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Nanu Banshival — Software Engineer',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'work',
    title: 'Work — Nanu Banshival',
    loadComponent: () => import('./pages/work/work.component').then((m) => m.WorkComponent),
  },
  {
    path: 'about',
    title: 'About — Nanu Banshival',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    title: 'Contact — Nanu Banshival',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  { path: '**', redirectTo: '' },
];
