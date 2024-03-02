import { Injectable, Type, computed, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _component = signal<Type<unknown> | null>(null)

  component = computed(() => this._component())

  open(component: Type<unknown>): void {
    this._component.set(component)
  }

  close(): void {
    this._component.set(null)
  }
}
