import { Component, inject } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'
import { CapitalizePipe } from '../../pipes/capitalize.pipe'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './notification.component.html',
  animations: [fadeAnimation()],
})
export class NotificationComponent {
  private readonly notification = inject(NotificationService)

  message = this.notification.message

  hide(): void {
    this.notification.hide()
  }
}
