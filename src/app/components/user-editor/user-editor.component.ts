import { Component, Input, OnInit, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ROLE, USER_ROLES } from '../../constants/role.constant'
import { TrimOnBlurDirective } from '../../directives/trim-on-blur.directive'
import { User } from '../../interfaces/user.interface'
import { RolePipe } from '../../pipes/role.pipe'
import { DialogService } from '../../services/dialog.service'
import { UsersService } from '../../services/users.service'
import { ControlErrorsComponent } from '../control-errors/control-errors.component'
import { UserStatusComponent } from '../user-status/user-status.component'

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [
    ControlErrorsComponent,
    ReactiveFormsModule,
    RolePipe,
    TrimOnBlurDirective,
    UserStatusComponent,
  ],
  templateUrl: './user-editor.component.html',
})
export class UserEditorComponent implements OnInit {
  private readonly dialog = inject(DialogService)
  private readonly fb = inject(FormBuilder)
  private readonly usersService = inject(UsersService)

  @Input() user?: User

  USER_ROLES = USER_ROLES

  editMode = false

  userForm = this.fb.nonNullable.group({
    email: ['user@email.com', [Validators.required, Validators.email]],
    name: ['Jane Smith', [Validators.required, Validators.minLength(4)]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    isActive: [true],
    role: [ROLE.USER],
  })

  ngOnInit(): void {
    this.editMode = !!this.user

    if (this.user) {
      this.userForm.patchValue(this.user)
      this.userForm.markAsPristine()
    }
  }

  close(): void {
    this.dialog.close()
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
      return
    }

    if (this.editMode) {
      const user = {
        ...this.userForm.getRawValue(),
        _id: this.user?._id as string,
      }

      this.usersService.updateUser(user).subscribe(() => {
        this.dialog.close()
      })

      return
    }

    const { email, name, password } = this.userForm.getRawValue()

    this.usersService.createUser(email, name, password).subscribe(() => {
      this.dialog.close()
    })
  }
}
