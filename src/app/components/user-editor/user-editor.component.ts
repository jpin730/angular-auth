import { Component, inject } from '@angular/core'
import { DialogService } from '../../services/dialog.service'

@Component({
  selector: 'app-user-editor',
  standalone: true,
  templateUrl: './user-editor.component.html',
})
export class UserEditorComponent {
  private readonly dialog = inject(DialogService)

  close(): void {
    this.dialog.close()
  }
}
