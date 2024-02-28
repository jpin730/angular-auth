import { Component, HostListener, computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { PATH } from '../../constants/path.constant'
import { AuthService } from '../../services/auth.service'
import { ExpandMoreSvgComponent } from '../../svgs/expand-more-svg/expand-more-svg.component'

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [ExpandMoreSvgComponent],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  private hostClicked = false

  @HostListener('click')
  hostClick(): void {
    this.hostClicked = true
  }

  @HostListener('document:click', ['$event'])
  documentClick(): void {
    if (this.open && !this.hostClicked) {
      this.open = false
    }
    this.hostClicked = false
  }

  user = computed(() => this.authService.currentUser())
  open = false

  logout(): void {
    this.authService.logout()
    this.router.navigate([`/${PATH.LOGIN}`])
  }

  toggleDropdown(): void {
    this.open = !this.open
  }
}
