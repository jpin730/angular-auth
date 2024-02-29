import { HttpErrorResponse } from '@angular/common/http'
import { Injectable, computed, signal } from '@angular/core'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _message = signal('')
  private readonly configuration = {
    duration: 3000,
  }
  private timeoutId = 0

  message = computed(() => this._message())

  show(message: string): void {
    this._message.set(message)

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      this._message.set('')
    }, this.configuration.duration) as unknown as number
  }

  hide(): void {
    this._message.set('')
    clearTimeout(this.timeoutId)
  }

  httpErrorHandler(error: HttpErrorResponse): Observable<never> {
    const message = error.error.message as string | string[] | undefined

    if (message) {
      this.show(Array.isArray(message) ? message.join(', ') : message)
    } else {
      this.show('An error occurred. Please try again later.')
    }
    return throwError(() => new Error())
  }
}
