import { Component } from '@angular/core'
import { MoreVertSvgComponent } from '../../svgs/more-vert-svg/more-vert-svg.component'
import { DropdownComponent } from '../dropdown/dropdown.component'

@Component({
  selector: 'app-user-list-dropdown',
  standalone: true,
  imports: [DropdownComponent, MoreVertSvgComponent],
  templateUrl: './user-list-dropdown.component.html',
})
export class UserListDropdownComponent {}
