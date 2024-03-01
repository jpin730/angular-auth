import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, catchError, finalize, tap, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { API_ENDPOINTS } from '../constants/api-endpoints.constant'
import { AUTH_STATUS } from '../constants/auth-status.constant'
import { PATH } from '../constants/path.constant'
import { LoginResponse } from '../interfaces/login-response.interface'
import { User } from '../interfaces/user.interface'
import { parseJwt } from '../utils/parse-jwt.util'
import { LoaderService } from './loader.service'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)
  private readonly loader = inject(LoaderService)
  private readonly notification = inject(NotificationService)

  private readonly baseUrl = environment.apiBaseUrl
  private readonly _currentUser = signal<User | null>(null)
  private readonly _authStatus = signal(AUTH_STATUS.CHECKING)

  private refreshTimeout: number | null = null

  currentUser = computed(() => this._currentUser())
  authStatus = computed(() => this._authStatus())

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password }
    return this.loginHandler(
      this.http.post<LoginResponse>(
        `${this.baseUrl}${API_ENDPOINTS.LOGIN}`,
        body,
      ),
    )
  }

  register(
    email: string,
    name: string,
    password: string,
  ): Observable<LoginResponse> {
    const body = { email, name, password }
    return this.loginHandler(
      this.http.post<LoginResponse>(
        `${this.baseUrl}${API_ENDPOINTS.REGISTER}`,
        body,
      ),
    )
  }

  refreshToken(): Observable<LoginResponse> {
    const refresh = localStorage.getItem('refresh')

    if (!refresh) {
      this.logout()
      return throwError(() => new Error())
    }

    const headers = new HttpHeaders({ refresh })

    return this.loginHandler(
      this.http.get<LoginResponse>(
        `${this.baseUrl}${API_ENDPOINTS.REFRESH_TOKEN}`,
        { headers },
      ),
    )
  }

  logout(): void {
    this._authStatus.set(AUTH_STATUS.NOT_AUTHENTICATED)
    this._currentUser.set(null)
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')

    this.cancelScheduledRefresh()
  }

  private authenticate({ token, refresh, ...user }: LoginResponse): void {
    this._authStatus.set(AUTH_STATUS.AUTHENTICATED)
    this._currentUser.set(user)
    localStorage.setItem('token', token)
    localStorage.setItem('refresh', refresh)

    this.scheduleRefresh(token)
  }

  private scheduleRefresh(token: string): void {
    const { exp } = parseJwt(token)
    this.refreshTimeout = setTimeout(
      () => {
        this.refreshToken().subscribe({
          error: () => {
            this.logout()
            this.router.navigate([`/${PATH.LOGIN}`])
          },
        })
      },
      exp * 1000 - Date.now(),
    ) as unknown as number
  }

  private cancelScheduledRefresh(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
      this.refreshTimeout = null
    }
  }

  private loginHandler(
    request: Observable<LoginResponse>,
  ): Observable<LoginResponse> {
    this.loader.show()
    this.notification.hide()
    return request.pipe(
      tap((res) => {
        this.authenticate(res)
      }),
      finalize(() => {
        this.loader.hide()
      }),
      catchError((error) => {
        this.logout()
        return this.notification.httpErrorHandler(error)
      }),
    )
  }
}
