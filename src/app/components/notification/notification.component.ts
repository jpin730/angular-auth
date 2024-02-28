import { Component, inject } from '@angular/core'
import { fadeAnimation } from '../../animations/fade.animation'
import { CapitalizePipe } from '../../pipes/capitalize.pipe'
import { NotificationService } from '../../services/notification.service'
import { CloseSvgComponent } from '../../svgs/close-svg/close-svg.component'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CapitalizePipe, CloseSvgComponent],
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
