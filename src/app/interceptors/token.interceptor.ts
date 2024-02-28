import { HttpInterceptorFn } from '@angular/common/http'
import { TOKEN_URLS } from '../constants/token-urls.contant'

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = req.headers.get('refresh') ?? localStorage.getItem('token')

  if (token && TOKEN_URLS.some((url) => req.url.includes(url))) {
    const headers = req.headers
      .set('Authorization', `Bearer ${token}`)
      .delete('refresh')
    return next(req.clone({ headers }))
  }

  return next(req)
}
