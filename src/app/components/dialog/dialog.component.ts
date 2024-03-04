import { NgComponentOutlet } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'
import { DialogService } from '../../services/dialog.service'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './dialog.component.html',
  animations: [fadeAnimation()],
})
export class DialogComponent {
  private readonly dialog = inject(DialogService)

  component = computed(() => this.dialog.component())
  inputs = computed(() => this.dialog.inputs())
  open = computed(() => !!this.component())

  close(): void {
    this.dialog.close()
  }
}
