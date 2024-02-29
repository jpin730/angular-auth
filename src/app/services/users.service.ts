import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, catchError, finalize } from 'rxjs'
import { environment } from '../../environments/environment'
import { API_ENDPOINTS } from '../constants/api-endpoints.constant'
import { User } from '../interfaces/user.interface'
import { LoaderService } from './loader.service'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient)
  private loader = inject(LoaderService)
  private notification = inject(NotificationService)

  private readonly baseUrl = `${environment.apiBaseUrl}${API_ENDPOINTS.USERS}`

  getAllUsers(): Observable<User[]> {
    this.loader.show()
    this.notification.hide()
    return this.http.get<User[]>(`${this.baseUrl}`).pipe(
      finalize(() => {
        this.loader.hide()
      }),
      catchError((error) => this.notification.httpErrorHandler(error)),
    )
  }
}
