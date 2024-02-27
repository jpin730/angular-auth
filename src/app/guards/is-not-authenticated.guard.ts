import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map, of } from 'rxjs'
import { AUTH_STATUS } from '../constants/auth-status.constant'
import { PATH } from '../constants/path.constant'
import { AuthService } from '../services/auth.service'

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.authStatus() === AUTH_STATUS.CHECKING) {
    return authService.refreshToken().pipe(
      map(() => router.createUrlTree([`/${PATH.HOME}`])),
      catchError(() => of(true)),
    )
  }

  return (
    authService.authStatus() === AUTH_STATUS.NOT_AUTHENTICATED ||
    router.createUrlTree([`/${PATH.HOME}`])
  )
}
