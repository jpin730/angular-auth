import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly messageSubject = new BehaviorSubject<string>('')
  private readonly configuration = {
    duration: 3000,
  }
  private timeoutId = 0

  get message$(): Observable<string> {
    return this.messageSubject.asObservable()
  }

  constructor() {
    this.show('Test notification message')
  }

  show(message: string): void {
    this.messageSubject.next(message)

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      this.messageSubject.next('')
    }, this.configuration.duration) as unknown as number
  }

  hide(): void {
    this.messageSubject.next('')
    clearTimeout(this.timeoutId)
  }
}
