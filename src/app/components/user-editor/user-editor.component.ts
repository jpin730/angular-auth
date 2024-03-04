import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { DialogService } from '../../services/dialog.service'
import { UsersService } from '../../services/users.service'
import { ControlErrorsComponent } from '../control-errors/control-errors.component'

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './user-editor.component.html',
})
export class UserEditorComponent {
  private readonly dialog = inject(DialogService)
  private readonly fb = inject(FormBuilder)
  private readonly usersService = inject(UsersService)

  registerForm = this.fb.nonNullable.group({
    email: ['user@email.com', [Validators.required, Validators.email]],
    name: ['Jane Smith', [Validators.required, Validators.minLength(4)]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  close(): void {
    this.dialog.close()
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return
    }

    const { email, name, password } = this.registerForm.getRawValue()

    this.usersService.createUser(email, name, password).subscribe(() => {
      this.dialog.close()
    })
  }
}
