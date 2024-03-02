import { NgComponentOutlet } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { DialogService } from '../../services/dialog.service'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  private readonly dialog = inject(DialogService)

  component = computed(() => this.dialog.component())
  open = computed(() => !!this.component())

  close(): void {
    this.dialog.close()
  }

  noClose(event: Event): void {
    event.stopPropagation()
  }
}
