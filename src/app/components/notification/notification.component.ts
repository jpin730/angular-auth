import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  private readonly notificationService = inject(NotificationService)

  message$ = this.notificationService.message$

  hide(): void {
    this.notificationService.hide()
  }
}
