import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, finalize } from 'rxjs'
import { environment } from '../../environments/environment'
import { LoginResponse } from '../interfaces/login-response.interface'
import { LoaderService } from './loader.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly loaderService = inject(LoaderService)

  private readonly baseUrl = environment.apiBaseUrl

  login(email: string, password: string): Observable<LoginResponse> {
    this.loaderService.show()
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        finalize(() => {
          this.loaderService.hide()
        }),
      )
  }
}
