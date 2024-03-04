import { Injectable, Type, computed, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _component = signal<Type<unknown> | null>(null)
  private _inputs = signal<Record<string, unknown> | undefined>(undefined)

  component = computed(() => this._component())
  inputs = computed(() => this._inputs())

  open(component: Type<unknown>, inputs?: Record<string, unknown>): void {
    this._inputs.set(inputs)
    this._component.set(component)
  }

  close(): void {
    this._component.set(null)
  }
}
