import { Component, computed, inject } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { ExpandMoreSvgComponent } from '../../svgs/expand-more-svg/expand-more-svg.component'
import { DropdownComponent } from '../dropdown/dropdown.component'

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [ExpandMoreSvgComponent, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  private readonly authService = inject(AuthService)

  user = computed(() => this.authService.currentUser())

  logout(): void {
    this.authService.logout()
  }
}
