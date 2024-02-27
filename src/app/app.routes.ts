import { Routes } from '@angular/router'
import { ContainerComponent } from './components/container/container.component'
import { PATH } from './constants/path.constant'

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
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
    ],
  },
]
