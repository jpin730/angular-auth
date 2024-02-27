import { Routes } from '@angular/router'
import { ContainerComponent } from './components/container/container.component'
import { PATH } from './constants/path.constant'
import { isAuthenticatedGuard } from './guards/is-authenticated.guard'
import { isNotAuthenticatedGuard } from './guards/is-not-authenticated.guard'

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: PATH.HOME,
        loadComponent: () => import('./pages/home-page/home-page.component'),
        canActivate: [isAuthenticatedGuard],
      },
      {
        path: PATH.LOGIN,
        loadComponent: () => import('./pages/login-page/login-page.component'),
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: PATH.REGISTER,
        loadComponent: () =>
          import('./pages/register-page/register-page.component'),
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: '**',
        redirectTo: PATH.HOME,
      },
    ],
  },
]
