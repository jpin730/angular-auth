import { TitleCasePipe } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { PATH } from '../../constants/path.constant'
import { FirstWordPipe } from '../../pipes/first-word.pipe'
import { AuthService } from '../../services/auth.service'
import { ExpandMoreSvgComponent } from '../../svgs/expand-more-svg/expand-more-svg.component'
import { DropdownComponent } from '../dropdown/dropdown.component'

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [
    DropdownComponent,
    ExpandMoreSvgComponent,
    FirstWordPipe,
    TitleCasePipe,
  ],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  user = computed(() => this.authService.currentUser())

  logout(): void {
    this.authService.logout()
    this.router.navigate([`/${PATH.LOGIN}`])
  }
}
