import { Component, Input, inject } from '@angular/core'
import { User } from '../../interfaces/user.interface'
import { DialogService } from '../../services/dialog.service'
import { UsersService } from '../../services/users.service'
import { MoreVertSvgComponent } from '../../svgs/more-vert-svg/more-vert-svg.component'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'
import { DropdownComponent } from '../dropdown/dropdown.component'
import { UserEditorComponent } from '../user-editor/user-editor.component'

@Component({
  selector: 'app-user-list-dropdown',
  standalone: true,
  imports: [DropdownComponent, MoreVertSvgComponent],
  templateUrl: './user-list-dropdown.component.html',
})
export class UserListDropdownComponent {
  private readonly usersService = inject(UsersService)
  private readonly dialog = inject(DialogService)

  @Input({ required: true }) user!: User

  onUpdate(): void {
    this.dialog.open(UserEditorComponent, { user: this.user })
  }

  onDelete(): void {
    this.dialog.open(ConfirmDialogComponent, {
      warn: true,
      message: `Are you sure you want to delete user "${this.user.name}" (${this.user.email})?`,
      onConfirm: () => this.usersService.deleteUser(this.user._id).subscribe(),
    })
  }
}
