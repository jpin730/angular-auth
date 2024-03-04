import { Component, Input, inject } from '@angular/core'
import { DialogService } from '../../services/dialog.service'

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  private readonly dialog = inject(DialogService)

  @Input() message?: string
  @Input() warn?: boolean
  @Input() onConfirm?: () => void

  close(confirm: boolean): void {
    if (confirm && this.onConfirm) {
      this.onConfirm()
    }

    this.dialog.close()
  }
}
