import { HttpEvent, HttpInterceptorFn } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { API_ENDPOINTS } from '../constants/api-endpoints.constant'
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
      catchError(
        (): Observable<HttpEvent<unknown>> =>
          req.url.includes(API_ENDPOINTS.REFRESH_TOKEN)
            ? next(
                req.clone({
                  setHeaders: { Authorization: `Bearer ${refresh}` },
                }),
              )
            : throwError(() => new Error()),
      ),
    )
  }

  return next(req)
}
