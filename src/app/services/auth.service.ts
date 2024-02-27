import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, catchError, finalize, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { LoginResponse } from '../interfaces/login-response.interface'
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

  login(email: string, password: string): Observable<LoginResponse> {
    this.loaderService.show()
    this.notificationService.hide()
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        finalize(() => {
          this.loaderService.hide()
        }),
        catchError((error) => this.errorHandler(error)),
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

    const err = new Error()
    return throwError(() => err)
  }
}
