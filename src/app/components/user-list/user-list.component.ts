import { Component, OnInit, computed, inject } from '@angular/core'
import { RolePipe } from '../../pipes/role.pipe'
import { DialogService } from '../../services/dialog.service'
import { UsersService } from '../../services/users.service'
import { UserEditorComponent } from '../user-editor/user-editor.component'
import { UserListDropdownComponent } from '../user-list-dropdown/user-list-dropdown.component'
import { UserStatusComponent } from '../user-status/user-status.component'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RolePipe, UserStatusComponent, UserListDropdownComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  private readonly usersService = inject(UsersService)
  private readonly dialog = inject(DialogService)

  users = computed(() => this.usersService.users())

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe()
  }

  openUserEditor(): void {
    this.dialog.open(UserEditorComponent)
  }
}
