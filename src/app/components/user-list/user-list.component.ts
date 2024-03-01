import { AsyncPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RolePipe } from '../../pipes/role.pipe'
import { UsersService } from '../../services/users.service'
import { UserListDropdownComponent } from '../user-list-dropdown/user-list-dropdown.component'
import { UserStatusComponent } from '../user-status/user-status.component'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RolePipe,
    UserStatusComponent,
    UserListDropdownComponent,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  private readonly usersService = inject(UsersService)

  users$ = this.usersService.getAllUsers()
}
