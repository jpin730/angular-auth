import { Routes } from '@angular/router'
import { PATH } from './constants/path.constant'

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: PATH.HOME,
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  {
    path: PATH.LOGIN,
    loadComponent: () => import('./pages/login-page/login-page.component'),
  },
  {
    path: PATH.REGISTER,
    loadComponent: () =>
      import('./pages/register-page/register-page.component'),
  },
  {
    path: '**',
    redirectTo: PATH.HOME,
  },
]
