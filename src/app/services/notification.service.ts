import { Injectable, computed, signal } from '@angular/core'

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
}
