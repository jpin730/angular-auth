import { HttpEvent, HttpInterceptorFn } from '@angular/common/http'
import { Observable, catchError } from 'rxjs'
import { TOKEN_URLS } from '../constants/token-urls.contant'

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  const refresh = localStorage.getItem('refresh')

  if (token && refresh && TOKEN_URLS.some((url) => req.url.includes(url))) {
    return next(
      req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }),
    ).pipe(
      catchError((): Observable<HttpEvent<unknown>> => {
        return next(
          req.clone({ setHeaders: { Authorization: `Bearer ${refresh}` } }),
        )
      }),
    )
  }
  return next(req)
}
