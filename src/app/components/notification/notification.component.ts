import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'
import { CapitalizePipe } from '../../pipes/capitalize.pipe'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './notification.component.html',
  animations: [fadeAnimation()],
})
export class NotificationComponent {
  private readonly notificationService = inject(NotificationService)

  message$ = this.notificationService.message$

  hide(): void {
    this.notificationService.hide()
  }
}
