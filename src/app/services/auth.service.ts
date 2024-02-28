import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Observable, catchError, finalize, map, tap, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { API_ENDPOINTS } from '../constants/api-endpoints.constant'
import { AUTH_STATUS } from '../constants/auth-status.constant'
import { LoginResponse } from '../interfaces/login-response.interface'
import { User } from '../interfaces/user.interface'
import { LoaderService } from './loader.service'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly loaderService = inject(LoaderService)
  private readonly notificationService = inject(NotificationService)

  private readonly baseUrl = environment.apiBaseUrl
  private readonly _currentUser = signal<User | null>(null)
  private readonly _authStatus = signal(AUTH_STATUS.CHECKING)

  currentUser = computed(() => this._currentUser())
  authStatus = computed(() => this._authStatus())

  login(email: string, password: string): Observable<true> {
    this.loaderService.show()
    this.notificationService.hide()
    const body = { email, password }
    return this.http
      .post<LoginResponse>(`${this.baseUrl}${API_ENDPOINTS.LOGIN}`, body)
      .pipe(
        tap(({ token, refresh, ...user }) => {
          this._authStatus.set(AUTH_STATUS.AUTHENTICATED)
          this._currentUser.set(user)
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
        }),
        finalize(() => {
          this.loaderService.hide()
        }),
        catchError((error) => {
          this._authStatus.set(AUTH_STATUS.NOT_AUTHENTICATED)
          this._currentUser.set(null)
          return this.errorHandler(error)
        }),
        map(() => true),
      )
  }

  refreshToken(): Observable<true> {
    const token = localStorage.getItem('token')
    const refresh = localStorage.getItem('refresh')

    if (!token || !refresh) {
      this._authStatus.set(AUTH_STATUS.NOT_AUTHENTICATED)
      this._currentUser.set(null)
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      return throwError(() => new Error())
    }

    this.loaderService.show()
    this.notificationService.hide()
    return this.http
      .get<LoginResponse>(`${this.baseUrl}${API_ENDPOINTS.REFRESH_TOKEN}`)
      .pipe(
        tap(({ token, refresh, ...user }) => {
          this._authStatus.set(AUTH_STATUS.AUTHENTICATED)
          this._currentUser.set(user)
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
        }),
        finalize(() => {
          this.loaderService.hide()
        }),
        catchError((error) => {
          this._authStatus.set(AUTH_STATUS.NOT_AUTHENTICATED)
          this._currentUser.set(null)
          localStorage.removeItem('token')
          localStorage.removeItem('refresh')
          return this.errorHandler(error)
        }),
        map(() => true),
      )
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    const message = error.error.message as string | string[] | undefined

    if (message) {
      this.notificationService.show(
        Array.isArray(message) ? message.join(', ') : message,
      )
    } else {
      this.notificationService.show(
        'An error occurred. Please try again later.',
      )
    }
    return throwError(() => new Error())
  }
}
