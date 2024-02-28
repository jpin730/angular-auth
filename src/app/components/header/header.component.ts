import { NgOptimizedImage } from '@angular/common'
import { Component } from '@angular/core'
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, UserDropdownComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
