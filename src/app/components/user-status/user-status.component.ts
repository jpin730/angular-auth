import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-user-status',
  standalone: true,
  templateUrl: './user-status.component.html',
})
export class UserStatusComponent {
  @Input({ required: true })
  isActive = false
}
