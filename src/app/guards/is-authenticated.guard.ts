import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, of } from 'rxjs'
import { AUTH_STATUS } from '../constants/auth-status.constant'
import { PATH } from '../constants/path.constant'
import { AuthService } from '../services/auth.service'

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.authStatus() === AUTH_STATUS.CHECKING) {
    return authService
      .refreshToken()
      .pipe(catchError(() => of(router.createUrlTree([`/${PATH.LOGIN}`]))))
  }

  return (
    authService.authStatus() === AUTH_STATUS.AUTHENTICATED ||
    router.createUrlTree([`/${PATH.LOGIN}`])
  )
}
