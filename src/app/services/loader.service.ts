import { Injectable, computed, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _loading = signal(false)

  loading = computed(() => this._loading())

  show(): void {
    this._loading.set(true)
  }

  hide(): void {
    this._loading.set(false)
  }
}
